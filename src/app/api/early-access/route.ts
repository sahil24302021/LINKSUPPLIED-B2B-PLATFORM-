import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEarlyAccessConfirmation, type SendConfirmationResult } from "@/lib/email";
import crypto from "crypto";

const MAX_BODY_BYTES = 64 * 1024; // 64 KB limit
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const ALLOWED_ROLES = ["buyer", "manufacturer", "supplier", "consultant"] as const;

/**
 * Creates a privacy-compliant, one-way truncated hash from client IP for abuse detection.
 * Raw IP is never persisted.
 */
function hashClientIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT || "linksupplied_privacy_salt";
  return crypto.createHash("sha256").update(ip + salt).digest("hex").slice(0, 16);
}

/**
 * Normalizes phone numbers for duplicate detection:
 * - strips whitespace, hyphens, parentheses, and dots
 * - preserves leading '+' if present
 */
function normalizePhone(phone: string | null | undefined): string | null {
  if (!phone || typeof phone !== "string") return null;
  const cleaned = phone.replace(/[\s\-().]/g, "").trim();
  return cleaned.length >= 7 ? cleaned : null;
}

/**
 * Robustly checks if two phone numbers match, handling formatting and country-code variations.
 */
function arePhonesEqual(phone1: string | null | undefined, phone2: string | null | undefined): boolean {
  const n1 = normalizePhone(phone1);
  const n2 = normalizePhone(phone2);
  if (!n1 || !n2) return false;

  // Direct normalized match (e.g. "+919876543210" === "+919876543210")
  if (n1 === n2) return true;

  // Strip leading '+' (e.g. "+919876543210" vs "919876543210")
  const noPlus1 = n1.replace(/^\+/, "");
  const noPlus2 = n2.replace(/^\+/, "");
  if (noPlus1 === noPlus2) return true;

  // If one has country code (e.g. +91 9876543210) and one doesn't (98765-43210),
  // compare significant national digits (min 10 digits)
  const digits1 = n1.replace(/\D/g, "");
  const digits2 = n2.replace(/\D/g, "");
  if (digits1.length >= 10 && digits2.length >= 10) {
    if (digits1 === digits2) return true;
    if (digits1.length === 10 && digits2.endsWith(digits1)) return true;
    if (digits2.length === 10 && digits1.endsWith(digits2)) return true;
  }

  return false;
}

/**
 * Generates an Early Access reference ID (e.g. EA-2026-4821)
 * Safely handles collisions with retry loop and fallback suffix.
 */
async function generateCollisionSafeReferenceId(): Promise<string> {
  const currentYear = new Date().getFullYear();

  // Try standard 4-digit format up to 5 times
  for (let attempt = 0; attempt < 5; attempt++) {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const candidate = `EA-${currentYear}-${randomDigits}`;

    const existing = await prisma.earlyAccessLead.findUnique({
      where: { referenceId: candidate },
      select: { id: true },
    });

    if (!existing) {
      return candidate;
    }
  }

  // Guaranteed unique fallback if 4-digit space has collisions
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const suffix = crypto.randomBytes(2).toString("hex").toUpperCase();
  return `EA-${currentYear}-${randomDigits}-${suffix}`;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Request size limit check
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, message: "Request payload too large." },
        { status: 413 }
      );
    }

    // 2. Parse JSON body
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON format." },
        { status: 400 }
      );
    }

    // 3. Extract and normalize fields
    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const rawEmail = typeof body.workEmail === "string" ? body.workEmail.trim() : "";
    const workEmail = rawEmail.toLowerCase();
    const phone = typeof body.phone === "string" ? body.phone.trim() : null;
    const designation = typeof body.designation === "string" ? body.designation.trim() : null;
    const companyName = typeof body.companyName === "string" ? body.companyName.trim() : "";
    const website = typeof body.website === "string" ? body.website.trim() : null;
    const industry = typeof body.industry === "string" ? body.industry.trim() : null;
    const location = typeof body.location === "string" ? body.location.trim() : null;
    const companySize = typeof body.companySize === "string" ? body.companySize.trim() : null;
    const role = typeof body.role === "string" ? body.role.trim() : "";

    const buyerCommodities = typeof body.buyerCommodities === "string" ? body.buyerCommodities.trim() : null;
    const buyerCurrentMethod = typeof body.buyerCurrentMethod === "string" ? body.buyerCurrentMethod.trim() : null;
    const buyerVolume = typeof body.buyerVolume === "string" ? body.buyerVolume.trim() : null;
    const buyerBiggestProblem = typeof body.buyerBiggestProblem === "string" ? body.buyerBiggestProblem.trim() : null;

    const supplierProducts = typeof body.supplierProducts === "string" ? body.supplierProducts.trim() : null;
    const supplierProcesses = typeof body.supplierProcesses === "string" ? body.supplierProcesses.trim() : null;
    const supplierMaterials = typeof body.supplierMaterials === "string" ? body.supplierMaterials.trim() : null;
    const supplierCapacity = typeof body.supplierCapacity === "string" ? body.supplierCapacity.trim() : null;
    const supplierCertifications = typeof body.supplierCertifications === "string" ? body.supplierCertifications.trim() : null;

    const platformIntent = typeof body.platformIntent === "string" ? body.platformIntent.trim() : "";
    const source = typeof body.source === "string" && body.source.trim() ? body.source.trim() : "early-access-page";

    // 4. Validate required fields
    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { success: false, message: "Please provide your full name." },
        { status: 400 }
      );
    }

    if (!workEmail || !EMAIL_REGEX.test(workEmail)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid corporate email address." },
        { status: 400 }
      );
    }

    if (!companyName || companyName.length < 2) {
      return NextResponse.json(
        { success: false, message: "Please provide your company name." },
        { status: 400 }
      );
    }

    if (!role || !ALLOWED_ROLES.includes(role as (typeof ALLOWED_ROLES)[number])) {
      return NextResponse.json(
        { success: false, message: "Please select an operational role." },
        { status: 400 }
      );
    }

    if (!platformIntent || platformIntent.length < 5) {
      return NextResponse.json(
        { success: false, message: "Please share how LINKSUPPLIED can help your organization." },
        { status: 400 }
      );
    }

    // 5. Metadata (Privacy-compliant)
    const rawIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      null;
    const ipHash = hashClientIp(rawIp);
    const userAgent = req.headers.get("user-agent")?.slice(0, 255) || null;

    // 6. PERMANENT Duplicate Mitigation (Check existing lead across the entire table by workEmail OR phone)
    let existingLead: { id: string; referenceId: string; fullName: string } | null =
      await prisma.earlyAccessLead.findFirst({
        where: { workEmail },
        select: { id: true, referenceId: true, fullName: true },
        orderBy: { createdAt: "desc" },
      });

    // If not matched by email, check by phone if submitted phone is provided
    if (!existingLead && phone) {
      const normalizedSubmitted = normalizePhone(phone);
      if (normalizedSubmitted) {
        const candidatesWithPhone = await prisma.earlyAccessLead.findMany({
          where: { phone: { not: null } },
          select: { id: true, referenceId: true, phone: true, fullName: true },
          orderBy: { createdAt: "desc" },
        });

        for (const candidate of candidatesWithPhone) {
          if (arePhonesEqual(candidate.phone, phone)) {
            existingLead = {
              id: candidate.id,
              referenceId: candidate.referenceId,
              fullName: candidate.fullName,
            };
            break;
          }
        }
      }
    }

    if (existingLead) {
      return NextResponse.json(
        {
          success: true,
          isExisting: true,
          referenceId: existingLead.referenceId,
          message: "You're already on the priority list.",
        },
        { status: 200 }
      );
    }

    // 7. Generate collision-safe reference ID
    const referenceId = await generateCollisionSafeReferenceId();

    // 8. STEP 1 OF SUBMISSION ORDER: Save to Database FIRST
    let lead;
    try {
      lead = await prisma.earlyAccessLead.create({
        data: {
          referenceId,
          fullName,
          workEmail,
          phone,
          designation,
          companyName,
          website,
          industry,
          location,
          companySize,
          role,
          buyerCommodities,
          buyerCurrentMethod,
          buyerVolume,
          buyerBiggestProblem,
          supplierProducts,
          supplierProcesses,
          supplierMaterials,
          supplierCapacity,
          supplierCertifications,
          platformIntent,
          source,
          ipHash,
          userAgent,
          emailSent: false,
        },
      });
    } catch (dbError: unknown) {
      // If a rare collision occurred on unique constraint, retry once with randomized suffix
      const isUniqueConstraint =
        typeof dbError === "object" &&
        dbError !== null &&
        "code" in dbError &&
        (dbError as { code: string }).code === "P2002";

      if (isUniqueConstraint) {
        const fallbackRef = `EA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
        lead = await prisma.earlyAccessLead.create({
          data: {
            referenceId: fallbackRef,
            fullName,
            workEmail,
            phone,
            designation,
            companyName,
            website,
            industry,
            location,
            companySize,
            role,
            buyerCommodities,
            buyerCurrentMethod,
            buyerVolume,
            buyerBiggestProblem,
            supplierProducts,
            supplierProcesses,
            supplierMaterials,
            supplierCapacity,
            supplierCertifications,
            platformIntent,
            source,
            ipHash,
            userAgent,
            emailSent: false,
          },
        });
      } else {
        console.error("[EarlyAccess API] Database save failed:", dbError);
        return NextResponse.json(
          {
            success: false,
            message: "Unable to save your application at this time. Please try again.",
          },
          { status: 500 }
        );
      }
    }

    // 9. STEP 2 OF SUBMISSION ORDER: Send confirmation email
    // (Only runs if database insertion was 100% successful)
    let emailResult: SendConfirmationResult = { success: false };
    try {
      emailResult = await sendEarlyAccessConfirmation({
        to: lead.workEmail,
        name: lead.fullName,
        referenceId: lead.referenceId,
      });

      // Update lead record with email status
      await prisma.earlyAccessLead.update({
        where: { id: lead.id },
        data: {
          emailSent: emailResult.success,
          emailError: emailResult.error || null,
        },
      });
    } catch (emailErr: unknown) {
      const errMsg = emailErr instanceof Error ? emailErr.message : "Email error";
      console.error("[EarlyAccess API] Email dispatch exception:", errMsg);
      // Safe update: lead is NOT deleted
      await prisma.earlyAccessLead.update({
        where: { id: lead.id },
        data: {
          emailSent: false,
          emailError: errMsg,
        },
      }).catch(() => {});
    }

    // 10. Return success response to frontend
    return NextResponse.json(
      {
        success: true,
        isExisting: false,
        referenceId: lead.referenceId,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("[EarlyAccess API] Unexpected server error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
