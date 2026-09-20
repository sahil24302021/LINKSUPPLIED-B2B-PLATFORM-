import { Resend } from "resend";

export interface SendConfirmationParams {
  to: string;
  name: string;
  referenceId?: string;
}

export interface SendConfirmationResult {
  success: boolean;
  messageId?: string;
  error?: string;
  skipped?: boolean;
  provider?: "gmail" | "resend";
}

/**
 * Builds the responsive HTML card email matching LINKSUPPLIED branding.
 * - Light gray background (#f8fafc)
 * - White centered card with subtle border & shadow
 * - LINKSUPPLIED copper branding (#c26138)
 * - Clear application reference ID
 */
export function buildConfirmationHtml(name: string, referenceId?: string): string {
  const displayName = name?.trim() || "there";
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're on the LINKSUPPLIED Early Access list</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 24px;">
  <div style="max-width: 540px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
    <div style="margin-bottom: 24px;">
      <span style="font-family: monospace; font-size: 11px; font-weight: bold; letter-spacing: 0.1em; color: #c26138; text-transform: uppercase;">LINKSUPPLIED</span>
    </div>

    <p style="font-size: 15px; margin-top: 0; margin-bottom: 16px;">Hi ${displayName},</p>
    <p style="font-size: 15px; margin-bottom: 16px;">Thanks for joining LINKSUPPLIED Early Access.</p>
    <p style="font-size: 15px; margin-bottom: 16px;">We've received your details and will keep you updated as we open access to the platform.</p>
    <p style="font-size: 15px; margin-bottom: 24px;">We'll be in touch soon.</p>

    ${
      referenceId
        ? `<div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9; font-family: monospace; font-size: 11px; color: #94a3b8;">Application Ref: <span style="font-weight: 600; color: #1e293b;">${referenceId}</span></div>`
        : ""
    }

    <p style="font-size: 14px; color: #475569; margin-top: 20px; margin-bottom: 0;">— Team LINKSUPPLIED</p>
  </div>
</body>
</html>`;
}

/**
 * Builds the plain-text fallback content.
 */
export function buildConfirmationText(name: string, referenceId?: string): string {
  const displayName = name?.trim() || "there";
  return `Hi ${displayName},

Thanks for joining LINKSUPPLIED Early Access.

We've received your details and will keep you updated as we open access to the platform.

We'll be in touch soon.

Application Reference:
${referenceId || "N/A"}

— Team LINKSUPPLIED
`;
}

/**
 * Sends confirmation email via Google Apps Script Web App (from linksupplied@gmail.com).
 * Uses an 8-second safety timeout and safely handles HTTP and JSON errors.
 */
async function sendViaGoogleAppsScript({
  to,
  name,
  referenceId,
  scriptUrl,
}: SendConfirmationParams & { scriptUrl: string }): Promise<SendConfirmationResult> {
  const subject = "You're on the LINKSUPPLIED Early Access list";
  const htmlBody = buildConfirmationHtml(name, referenceId);
  const textBody = buildConfirmationText(name, referenceId);

  const payload = {
    to,
    subject,
    htmlBody,
    textBody,
    name,
    referenceId: referenceId || "",
  };

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
      signal: AbortSignal.timeout(8000), // 8-second safety timeout
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "Unknown HTTP error");
      console.error(
        `[EarlyAccess Email] Google Apps Script HTTP ${res.status}:`,
        errText.slice(0, 200)
      );
      return {
        success: false,
        error: `Google Apps Script HTTP ${res.status}: ${errText.slice(0, 100)}`,
        provider: "gmail",
      };
    }

    let data: Record<string, unknown> = {};
    try {
      data = await res.json();
    } catch {
      // If Apps Script returns non-JSON or plain text
    }

    if (data.status === "error" || data.success === false) {
      const errMsg =
        typeof data.message === "string"
          ? data.message
          : "Google Apps Script reported an error";
      console.error(`[EarlyAccess Email] Google Apps Script error:`, errMsg);
      return {
        success: false,
        error: errMsg,
        provider: "gmail",
      };
    }

    console.log(
      `[EarlyAccess Email] Confirmation successfully sent via Gmail (Google Apps Script) to ${to}`
    );
    return {
      success: true,
      messageId: typeof data.id === "string" ? data.id : "apps-script-dispatched",
      provider: "gmail",
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Apps Script delivery exception";
    console.error(
      `[EarlyAccess Email] Google Apps Script delivery exception:`,
      message
    );
    return {
      success: false,
      error: message,
      provider: "gmail",
    };
  }
}

/**
 * Sends confirmation email via Resend (fallback or standalone provider).
 */
async function sendViaResend({
  to,
  name,
  referenceId,
  apiKey,
}: SendConfirmationParams & { apiKey: string }): Promise<SendConfirmationResult> {
  const from =
    process.env.EARLY_ACCESS_FROM_EMAIL?.trim() ||
    "LINKSUPPLIED <hello@linksupplied.com>";

  const subject = "You're on the LINKSUPPLIED Early Access list";
  const html = buildConfirmationHtml(name, referenceId);
  const plainText = buildConfirmationText(name, referenceId);

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      text: plainText,
      html,
    });

    if (error) {
      console.error(
        `[EarlyAccess Email] Resend delivery error for ${to}:`,
        error.message
      );
      return {
        success: false,
        error: error.message,
        provider: "resend",
      };
    }

    console.log(
      `[EarlyAccess Email] Confirmation successfully sent via Resend to ${to} (ID: ${data?.id})`
    );
    return {
      success: true,
      messageId: data?.id,
      provider: "resend",
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown email dispatch error";
    console.error(
      `[EarlyAccess Email] Unexpected error sending to ${to} via Resend:`,
      message
    );
    return {
      success: false,
      error: message,
      provider: "resend",
    };
  }
}

/**
 * Master dispatcher for Early Access confirmation emails:
 * 1. If GMAIL_APP_SCRIPT_URL is configured:
 *    - Sends via Google Apps Script Web App (from linksupplied@gmail.com).
 *    - If Google Apps Script fails, falls back to Resend automatically.
 * 2. If GMAIL_APP_SCRIPT_URL is not configured:
 *    - Dispatches directly via Resend.
 * 3. If neither provider is configured:
 *    - Logs safely and returns skipped=true without failing registration.
 */
export async function sendEarlyAccessConfirmation({
  to,
  name,
  referenceId,
}: SendConfirmationParams): Promise<SendConfirmationResult> {
  const appsScriptUrl = process.env.GMAIL_APP_SCRIPT_URL?.trim();

  // 1. Primary: Google Apps Script Web App (Gmail)
  if (appsScriptUrl) {
    console.log(
      `[EarlyAccess Email] Attempting confirmation dispatch via Gmail (Google Apps Script) to ${to}...`
    );
    const gmailResult = await sendViaGoogleAppsScript({
      to,
      name,
      referenceId,
      scriptUrl: appsScriptUrl,
    });

    if (gmailResult.success) {
      return gmailResult;
    }

    console.warn(
      `[EarlyAccess Email] Gmail Apps Script failed (${gmailResult.error}). Falling back to Resend...`
    );
  }

  // 2. Fallback / Default: Resend
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (resendApiKey) {
    return sendViaResend({
      to,
      name,
      referenceId,
      apiKey: resendApiKey,
    });
  }

  // 3. Neither provider configured
  console.warn(
    `[EarlyAccess Email] No active email provider configured (GMAIL_APP_SCRIPT_URL or RESEND_API_KEY). Acknowledging lead ${to} (ref: ${referenceId || "N/A"}) without live email dispatch.`
  );
  return {
    success: false,
    skipped: true,
    error: appsScriptUrl
      ? "Google Apps Script failed and RESEND_API_KEY is not configured for fallback."
      : "Neither GMAIL_APP_SCRIPT_URL nor RESEND_API_KEY is configured.",
  };
}
