import { z } from "zod";
import { json, rowsToHtml, sendNotification, verifyTurnstile } from "./_shared";

export const config = { runtime: "edge" };

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(180),
  whatsapp: z.string().trim().max(30).optional().default(""),
  donorType: z.string().trim().min(2).max(60),
  amount: z.string().trim().min(1).max(30),
  frequency: z.string().trim().min(2).max(30),
  program: z.string().trim().min(2).max(120),
  anonymous: z.string().optional().default("false"),
  receiveReports: z.string().optional().default("false"),
  privacyAccepted: z.literal("true"),
  website: z.string().max(0).optional().default(""),
  "cf-turnstile-response": z.string().optional(),
});

export default async function handler(request: Request) {
  if (request.method !== "POST") return json({ message: "Metode tidak diizinkan." }, 405);

  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return json({ message: "Periksa kembali data yang wajib diisi." }, 400);

    const data = parsed.data;
    const validHuman = await verifyTurnstile(
      data["cf-turnstile-response"],
      request.headers.get("x-forwarded-for"),
    );
    if (!validHuman) return json({ message: "Verifikasi keamanan belum berhasil." }, 400);

    await sendNotification({
      to: process.env.DONATION_EMAIL,
      replyTo: data.email,
      subject: `Minat donatur — ${data.name}`,
      html: `<h1>Minat donatur baru</h1>${rowsToHtml([
        ["Nama", data.name],
        ["Email", data.email],
        ["WhatsApp", data.whatsapp],
        ["Jenis donatur", data.donorType],
        ["Nominal", data.amount],
        ["Frekuensi", data.frequency],
        ["Program", data.program],
        ["Anonim", data.anonymous === "true" ? "Ya" : "Tidak"],
        ["Menerima laporan", data.receiveReports === "true" ? "Ya" : "Tidak"],
      ])}`,
    });

    return json({ message: "Terima kasih. Minat dukungan Anda sudah kami terima." });
  } catch {
    return json({ message: "Layanan donasi belum tersedia. Silakan coba lagi nanti." }, 503);
  }
}
