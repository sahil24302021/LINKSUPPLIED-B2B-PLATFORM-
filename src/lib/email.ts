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
}

/**
 * Sends a transactional confirmation email to the applicant via Resend.
 *
 * Subject: You're on the LINKSUPPLIED Early Access list
 *
 * If RESEND_API_KEY is not configured, logs safely and returns skipped=true
 * without failing the overall early-access registration.
 */
export async function sendEarlyAccessConfirmation({
  to,
  name,
  referenceId,
}: SendConfirmationParams): Promise<SendConfirmationResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    console.warn(
      `[EarlyAccess Email] RESEND_API_KEY is not set. Acknowledging lead ${to} (ref: ${referenceId || "N/A"}) without live email dispatch.`
    );
    return {
      success: false,
      skipped: true,
      error: "RESEND_API_KEY environment variable is not configured.",
    };
  }

  const from =
    process.env.EARLY_ACCESS_FROM_EMAIL?.trim() ||
    "LINKSUPPLIED <hello@linksupplied.com>";

  const displayName = name?.trim() || "there";

  const plainText = `Hi ${displayName},

Thanks for joining LINKSUPPLIED Early Access.

We've received your details and will keep you updated as we open access to the platform.

We'll be in touch soon.

— Team LINKSUPPLIED
`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
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

    <p style="font-size: 14px; color: #475569; margin-bottom: 0;">— Team LINKSUPPLIED</p>
    ${
      referenceId
        ? `<div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9; font-family: monospace; font-size: 11px; color: #94a3b8;">Application Ref: ${referenceId}</div>`
        : ""
    }
  </div>
</body>
</html>`;

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject: "You're on the LINKSUPPLIED Early Access list",
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
      };
    }

    console.log(
      `[EarlyAccess Email] Confirmation successfully sent to ${to} (ID: ${data?.id})`
    );
    return {
      success: true,
      messageId: data?.id,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown email dispatch error";
    console.error(`[EarlyAccess Email] Unexpected error sending to ${to}:`, message);
    return {
      success: false,
      error: message,
    };
  }
}
