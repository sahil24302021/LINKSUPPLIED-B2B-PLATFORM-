import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEarlyAccessConfirmation, type SendConfirmationResult } from "@/lib/email";

const MAX_BODY_BYTES = 64 * 1024;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const ALLOWED_ROLES = ["buyer", "manufacturer", "both", "supplier", "consultant"] as const;
type AllowedRole = (typeof ALLOWED_ROLES)[number];

function cleanString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\x00-\x1F\x7F]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function nullableString(value: unknown, maxLength: number): string | null {
  const normalized = cleanString(value, maxLength);
  return normalized || null;
}

function hashClientIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT || "linksupplied_privacy_salt";
  return crypto.createHash("sha256").update(ip + salt).digest("hex").slice(0, 16);
}

function normalizePhone(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const cleaned = phone.replace(/[\s\-().]/g, "").trim();
  return cleaned.length >= 7 ? cleaned : null;
}

function arePhonesEqual(phone1: string | null | undefined, phone2: string | null | undefined): boolean {
  const n1 = normalizePhone(phone1);
  const n2 = normalizePhone(phone2);
  if (!n1 || !n2) return false;
  if (n1 === n2 || n1.replace(/^\+/, "") === n2.replace(/^\+/, "")) return true;
  const digits1 = n1.replace(/\D/g, "");
  const digits2 = n2.replace(/\D/g, "");
  return digits1.length >= 10 && digits2.length >= 10 && ((digits1.length === 10 && digits2.endsWith(digits1)) || (digits2.length === 10 && digits1.endsWith(digits2)));
}

function validatePhone(phone: string): string | null {
  const match = phone.match(/^(\+\d{1,4})\s+(.+)$/);
  if (!match) return "Please enter a valid WhatsApp number.";
  const [, dialCode, nationalNumber] = match;
  const digits = nationalNumber.replace(/\D/g, "");
  if (dialCode === "+91") return /^[6-9]\d{9}$/.test(digits) ? null : "Please enter a valid 10-digit WhatsApp number.";
  return digits.length >= 6 && digits.length <= 14 ? null : "Please enter a WhatsApp number with 6 to 14 digits.";
}

function generatedIntent(role: AllowedRole, supplierProducts: string | null, supplierProcesses: string | null, buyerCommodities: string | null): string {
  const details = role === "buyer" ? buyerCommodities : [supplierProducts, supplierProcesses].filter(Boolean).join(", ");
  return `Early access signup (${role}): ${details || "business details provided"}`.slice(0, 500);
}

async function generateCollisionSafeReferenceId(): Promise<string> {
  const year = new Date().getFullYear();
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const candidate = `EA-${year}-${Math.floor(1000 + Math.random() * 9000)}`;
    const existing = await prisma.earlyAccessLead.findUnique({ where: { referenceId: candidate }, select: { id: true } });
    if (!existing) return candidate;
  }
  return `EA-${year}-${Math.floor(1000 + Math.random() * 9000)}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
}

export async function POST(req: NextRequest) {
  try {
    const contentLength = req.headers.get("content-length");
    if (contentLength && Number.parseInt(contentLength, 10) > MAX_BODY_BYTES) return NextResponse.json({ success: false, message: "Request payload too large." }, { status: 413 });

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, message: "Invalid form data." }, { status: 400 });
    }

    if (cleanString(body.company_url, 200)) {
      return NextResponse.json({ success: true, isExisting: false, referenceId: "EA-RECEIVED" });
    }

    const fullName = cleanString(body.fullName, 80);
    const workEmail = cleanString(body.workEmail, 254).toLowerCase();
    const phone = cleanString(body.phone, 32);
    const companyName = cleanString(body.companyName, 100);
    const location = cleanString(body.location, 80);
    const role = cleanString(body.role, 20) as AllowedRole;
    const supplierProducts = nullableString(body.supplierProducts, 150);
    const supplierProcesses = nullableString(body.supplierProcesses, 500);
    const buyerCommodities = nullableString(body.buyerCommodities, 150);
    // This legacy column records supplier customer-finding methods for manufacturers,
    // and supplier-finding methods for buyers.
    const buyerCurrentMethod = nullableString(body.buyerCurrentMethod, 500);
    const buyerBiggestProblem = nullableString(body.buyerBiggestProblem, 500);
    const source = nullableString(body.source, 100) || "early-access-page";

    if (fullName.length < 2) return NextResponse.json({ success: false, message: "Please enter your name." }, { status: 400 });
    if (!EMAIL_REGEX.test(workEmail)) return NextResponse.json({ success: false, message: "Please enter a valid email address." }, { status: 400 });
    if (companyName.length < 2) return NextResponse.json({ success: false, message: "Please enter your company name." }, { status: 400 });
    if (location.length < 2) return NextResponse.json({ success: false, message: "Please enter your city and state." }, { status: 400 });
    const phoneError = validatePhone(phone);
    if (phoneError) return NextResponse.json({ success: false, message: phoneError }, { status: 400 });
    if (!ALLOWED_ROLES.includes(role)) return NextResponse.json({ success: false, message: "Please choose what best describes you." }, { status: 400 });

    const isSupplier = role === "manufacturer" || role === "both" || role === "supplier";
    const isBuyer = role === "buyer";
    if (isSupplier && !supplierProducts) return NextResponse.json({ success: false, message: "Please tell us what you make or supply." }, { status: 400 });
    if (isSupplier && !supplierProcesses) return NextResponse.json({ success: false, message: "Please choose at least one process." }, { status: 400 });
    if (isBuyer && !buyerCommodities) return NextResponse.json({ success: false, message: "Please tell us what you need to source." }, { status: 400 });
    if (isBuyer && !buyerCurrentMethod) return NextResponse.json({ success: false, message: "Please choose how you find suppliers today." }, { status: 400 });

    const rawIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || null;
    const ipHash = hashClientIp(rawIp);
    const userAgent = req.headers.get("user-agent")?.slice(0, 255) || null;
    let existingLead = await prisma.earlyAccessLead.findFirst({ where: { workEmail }, select: { id: true, referenceId: true, fullName: true }, orderBy: { createdAt: "desc" } });

    if (!existingLead && normalizePhone(phone)) {
      const phoneCandidates = await prisma.earlyAccessLead.findMany({ where: { phone: { not: null } }, select: { id: true, referenceId: true, fullName: true, phone: true }, orderBy: { createdAt: "desc" } });
      existingLead = phoneCandidates.find((candidate) => arePhonesEqual(candidate.phone, phone)) || null;
    }
    if (existingLead) return NextResponse.json({ success: true, isExisting: true, referenceId: existingLead.referenceId });

    if (ipHash) {
      const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const recentAttempts = await prisma.earlyAccessLead.count({ where: { ipHash, createdAt: { gte: hourAgo } } });
      if (recentAttempts >= 10) return NextResponse.json({ success: false, message: "Too many attempts. Please try again later." }, { status: 429 });
    }

    const createData = {
      fullName, workEmail, phone, companyName, location, role, buyerCommodities, buyerCurrentMethod, buyerBiggestProblem, supplierProducts, supplierProcesses,
      designation: null, website: null, industry: null, companySize: null, buyerVolume: null, supplierMaterials: null, supplierCapacity: null, supplierCertifications: null,
      platformIntent: generatedIntent(role, supplierProducts, supplierProcesses, buyerCommodities), source, ipHash, userAgent, emailSent: false,
    };
    let lead;
    try {
      lead = await prisma.earlyAccessLead.create({ data: { ...createData, referenceId: await generateCollisionSafeReferenceId() } });
    } catch (dbError: unknown) {
      if (typeof dbError === "object" && dbError !== null && "code" in dbError && (dbError as { code?: string }).code === "P2002") {
        lead = await prisma.earlyAccessLead.create({ data: { ...createData, referenceId: `EA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}-${crypto.randomBytes(2).toString("hex").toUpperCase()}` } });
      } else {
        console.error("[EarlyAccess API] Database save failed:", dbError);
        return NextResponse.json({ success: false, message: "Unable to save your request right now. Please try again." }, { status: 500 });
      }
    }

    let emailResult: SendConfirmationResult = { success: false };
    try {
      emailResult = await sendEarlyAccessConfirmation({ to: lead.workEmail, name: lead.fullName, referenceId: lead.referenceId, role: lead.role, companyName: lead.companyName, supplierProducts: lead.supplierProducts, supplierProcesses: lead.supplierProcesses, buyerCommodities: lead.buyerCommodities });
      await prisma.earlyAccessLead.update({ where: { id: lead.id }, data: { emailSent: emailResult.success, emailError: emailResult.error || null } });
    } catch (emailError: unknown) {
      const message = emailError instanceof Error ? emailError.message : "Email error";
      console.error("[EarlyAccess API] Email dispatch exception:", message);
      await prisma.earlyAccessLead.update({ where: { id: lead.id }, data: { emailSent: false, emailError: message } }).catch(() => {});
    }

    return NextResponse.json({ success: true, isExisting: false, referenceId: lead.referenceId });
  } catch (error: unknown) {
    console.error("[EarlyAccess API] Unexpected server error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
