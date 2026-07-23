import { z } from "zod";
import { json, rowsToHtml, sendNotification, verifyTurnstile } from "./_shared";

export const config = { runtime: "edge" };

const schema = z.object({
  institutionName: z.string().trim().min(2).max(160),
  institutionType: z.string().trim().min(2).max(100),
  city: z.string().trim().min(2).max(120),
  contactName: z.string().trim().min(2).max(120),
  role: z.string().trim().min(2).max(100),
  email: z.email().max(180),
  whatsapp: z.string().trim().min(8).max(30),
  beneficiaries: z.string().trim().max(12).optional().default(""),
  staff: z.string().trim().max(12).optional().default(""),
  currentSystem: z.string().trim().max(500).optional().default(""),
  primaryNeed: z.string().trim().min(10).max(3000),
  service: z.string().trim().max(60).optional().default("mandiri"),
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
      to: process.env.REGISTRATION_EMAIL,
      replyTo: data.email,
      subject: `Pengajuan lembaga — ${data.institutionName}`,
      html: `<h1>Pengajuan lembaga baru</h1>${rowsToHtml([
        ["Nama lembaga", data.institutionName],
        ["Jenis", data.institutionType],
        ["Kota / kabupaten", data.city],
        ["Penanggung jawab", data.contactName],
        ["Jabatan", data.role],
        ["Email", data.email],
        ["WhatsApp", data.whatsapp],
        ["Peserta didik / jamaah", data.beneficiaries],
        ["Pengajar / pengurus", data.staff],
        ["Sistem saat ini", data.currentSystem],
        ["Kebutuhan utama", data.primaryNeed],
        ["Model layanan", data.service],
      ])}`,
    });

    return json({ message: "Terima kasih. Pengajuan lembaga sudah kami terima dan akan ditinjau." });
  } catch {
    return json({ message: "Layanan pengajuan belum tersedia. Silakan coba lagi nanti." }, 503);
  }
}
