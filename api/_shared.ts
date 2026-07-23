import { Resend } from "resend";

export const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });

export async function verifyTurnstile(token: string | undefined, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function sendNotification({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | undefined;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !to) {
    throw new Error("Email service is not configured.");
  }

  const resend = new Resend(key);
  await resend.emails.send({
    from: "IhsanCloud <noreply@ihsancloud.id>",
    to,
    replyTo,
    subject,
    html,
  });
}

export const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export const rowsToHtml = (rows: Array<[string, unknown]>) =>
  `<table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif">` +
  rows
    .map(
      ([label, value]) =>
        `<tr><th style="text-align:left;vertical-align:top;padding:8px;border-bottom:1px solid #ddd">${escapeHtml(label)}</th><td style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(value)}</td></tr>`,
    )
    .join("") +
  `</table>`;
