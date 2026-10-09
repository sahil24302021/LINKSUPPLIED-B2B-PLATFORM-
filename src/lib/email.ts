import { Resend } from "resend";
import { RESPONSE_WINDOW } from "@/types/waitlist";

/* Deliverability still requires owner action: verify the sending domain in Resend,
 * publish SPF and DKIM, then add an aligned DMARC policy before sending from it.
 * Code cannot guarantee inbox placement, especially when using a Gmail sender. */

export interface SendConfirmationParams {
  to: string;
  name: string;
  referenceId?: string;
  role?: string;
  companyName?: string;
  supplierProducts?: string | null;
  supplierProcesses?: string | null;
  buyerCommodities?: string | null;
}

export interface SendConfirmationResult {
  success: boolean;
  messageId?: string;
  error?: string;
  skipped?: boolean;
  provider?: "gmail" | "resend";
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;" })[character] || character);
}

function displayName(value: string): string {
  const trimmed = value.trim();
  return /^[A-Z]+$/.test(trimmed) && trimmed.length > 3 ? trimmed.toLowerCase().replace(/\b\p{L}/gu, (letter) => letter.toUpperCase()) : trimmed || "there";
}

function receivedSummary(params: SendConfirmationParams): string {
  if (params.role === "buyer") return params.buyerCommodities ? `Sourcing need: ${params.buyerCommodities}` : "Buyer early access request";
  const supplierDetails = [params.supplierProducts, params.supplierProcesses].filter(Boolean).join(", ");
  return supplierDetails ? `Products and processes: ${supplierDetails}` : "Early access request";
}

export function buildConfirmationHtml(params: SendConfirmationParams): string {
  const renderedName = escapeHtml(displayName(params.name));
  const companyName = escapeHtml(params.companyName?.trim() || "your company");
  const summary = escapeHtml(receivedSummary(params));
  const reference = escapeHtml(params.referenceId || "N/A");
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>LINKSUPPLIED Early Access</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#1e293b;background-color:#f8fafc;margin:0;padding:24px;">
  <div style="max-width:540px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:28px;">
    <p style="font-family:monospace;font-size:11px;font-weight:700;letter-spacing:.1em;color:#c26138;margin:0 0 20px;">LINKSUPPLIED</p>
    <p style="font-size:15px;margin:0 0 16px;">Hi ${renderedName},</p>
    <p style="font-size:15px;margin:0 0 16px;">Thank you for joining LINKSUPPLIED Early Access. We received the details for ${companyName}.</p>
    <p style="font-size:15px;margin:0 0 8px;">We received:</p>
    <p style="font-size:15px;margin:0 0 16px;color:#475569;">${summary}</p>
    <p style="font-size:15px;margin:0 0 20px;">We will contact you on WhatsApp within ${RESPONSE_WINDOW}.</p>
    <p style="border-top:1px solid #e2e8f0;padding-top:16px;margin:0;font-family:monospace;font-size:12px;color:#475569;">Reference: <strong style="color:#1e293b;">${reference}</strong></p>
    <p style="font-size:14px;color:#475569;margin:20px 0 0;">Team LINKSUPPLIED</p>
  </div>
</body></html>`;
}

export function buildConfirmationText(params: SendConfirmationParams): string {
  const name = displayName(params.name);
  return `Hi ${name},

Thank you for joining LINKSUPPLIED Early Access. We received the details for ${params.companyName?.trim() || "your company"}.

We received: ${receivedSummary(params)}

We will contact you on WhatsApp within ${RESPONSE_WINDOW}.

Reference: ${params.referenceId || "N/A"}

Team LINKSUPPLIED`;
}

async function sendViaGoogleAppsScript(params: SendConfirmationParams & { scriptUrl: string }): Promise<SendConfirmationResult> {
  const subject = `We received your LINKSUPPLIED request (${params.referenceId || "reference pending"})`;
  const payload = { to: params.to, subject, htmlBody: buildConfirmationHtml(params), textBody: buildConfirmationText(params), name: params.name, referenceId: params.referenceId || "" };
  try {
    const response = await fetch(params.scriptUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), redirect: "follow", signal: AbortSignal.timeout(8000) });
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown HTTP error");
      console.error(`[EarlyAccess Email] Google Apps Script HTTP ${response.status}:`, errorText.slice(0, 200));
      return { success: false, error: `Google Apps Script HTTP ${response.status}: ${errorText.slice(0, 100)}`, provider: "gmail" };
    }
    let data: Record<string, unknown> = {};
    try { data = await response.json(); } catch { /* Apps Script can return plain text. */ }
    if (data.status === "error" || data.success === false) {
      const error = typeof data.message === "string" ? data.message : "Google Apps Script reported an error";
      console.error("[EarlyAccess Email] Google Apps Script error:", error);
      return { success: false, error, provider: "gmail" };
    }
    console.log(`[EarlyAccess Email] Confirmation successfully sent via Gmail (Google Apps Script) to ${params.to}`);
    return { success: true, messageId: typeof data.id === "string" ? data.id : "apps-script-dispatched", provider: "gmail" };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Apps Script delivery exception";
    console.error("[EarlyAccess Email] Google Apps Script delivery exception:", message);
    return { success: false, error: message, provider: "gmail" };
  }
}

async function sendViaResend(params: SendConfirmationParams & { apiKey: string }): Promise<SendConfirmationResult> {
  const from = process.env.EARLY_ACCESS_FROM_EMAIL?.trim() || "LINKSUPPLIED <hello@linksupplied.com>";
  try {
    const resend = new Resend(params.apiKey);
    const subject = `We received your LINKSUPPLIED request (${params.referenceId || "reference pending"})`;
    const replyTo = process.env.EARLY_ACCESS_REPLY_TO?.trim() || process.env.EARLY_ACCESS_FROM_EMAIL?.trim();
    const { data, error } = await resend.emails.send({ from, to: [params.to], subject, text: buildConfirmationText(params), html: buildConfirmationHtml(params), replyTo });
    if (error) {
      console.error(`[EarlyAccess Email] Resend delivery error for ${params.to}:`, error.message);
      return { success: false, error: error.message, provider: "resend" };
    }
    console.log(`[EarlyAccess Email] Confirmation successfully sent via Resend to ${params.to} (ID: ${data?.id})`);
    return { success: true, messageId: data?.id, provider: "resend" };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown email dispatch error";
    console.error(`[EarlyAccess Email] Unexpected error sending to ${params.to} via Resend:`, message);
    return { success: false, error: message, provider: "resend" };
  }
}

export async function sendEarlyAccessConfirmation(params: SendConfirmationParams): Promise<SendConfirmationResult> {
  const appsScriptUrl = process.env.GMAIL_APP_SCRIPT_URL?.trim();
  if (appsScriptUrl) {
    console.log(`[EarlyAccess Email] Attempting confirmation dispatch via Gmail (Google Apps Script) to ${params.to}...`);
    const gmailResult = await sendViaGoogleAppsScript({ ...params, scriptUrl: appsScriptUrl });
    if (gmailResult.success) return gmailResult;
    console.warn(`[EarlyAccess Email] Gmail Apps Script failed (${gmailResult.error}). Falling back to Resend...`);
  }
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (resendApiKey) return sendViaResend({ ...params, apiKey: resendApiKey });
  console.warn(`[EarlyAccess Email] No active email provider configured (GMAIL_APP_SCRIPT_URL or RESEND_API_KEY). Acknowledging lead ${params.to} (ref: ${params.referenceId || "N/A"}) without live email dispatch.`);
  return { success: false, skipped: true, error: appsScriptUrl ? "Google Apps Script failed and RESEND_API_KEY is not configured for fallback." : "Neither GMAIL_APP_SCRIPT_URL nor RESEND_API_KEY is configured." };
}
