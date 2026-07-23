export const products = [
  {
    id: "school",
    name: "Ihsan School",
    label: "Sekolah",
    description: "Untuk sekolah dan lembaga pendidikan formal.",
    features: ["Penerimaan siswa", "Data siswa & orang tua", "Kelas & jadwal", "Absensi", "Jurnal pembelajaran", "Penilaian & rapor", "Portal orang tua", "Pembayaran"],
  },
  {
    id: "mahad",
    name: "Ihsan Ma’had",
    label: "Ma’had",
    description: "Untuk ma’had, pesantren, dan pendidikan berasrama.",
    features: ["Penerimaan santri", "Kelompok & musyrif", "Tahsin & hafalan", "Murajaah", "Catatan adab", "Asrama & izin", "Pelanggaran", "Laporan wali"],
  },
  {
    id: "tpq",
    name: "Ihsan TPQ",
    label: "TPQ",
    description: "Untuk TPQ, rumah Qur’an, dan halaqah.",
    features: ["Data santri", "Kelas", "Kehadiran", "Capaian bacaan", "Hafalan", "Catatan pengajar", "Pembayaran", "Laporan orang tua"],
  },
  {
    id: "masjid",
    name: "Ihsan Masjid",
    label: "Masjid",
    description: "Untuk masjid, DKM, dan komunitas jamaah.",
    features: ["Data jamaah", "Agenda kajian", "Imam & khatib", "Relawan", "Keuangan", "Program sosial", "Inventaris", "Komunikasi jamaah"],
  },
  {
    id: "foundation",
    name: "Ihsan Foundation",
    label: "Yayasan",
    description: "Untuk yayasan dan lembaga dakwah.",
    features: ["Program kerja", "SDM", "Surat & dokumen", "Rapat", "Anggaran", "Donatur", "Aset", "Dashboard pimpinan"],
  },
];

export const faqs = [
  {
    q: "Apakah IhsanCloud benar-benar gratis?",
    a: "Fitur inti perangkat lunak tersedia gratis bagi lembaga yang memenuhi ketentuan program. Implementasi, migrasi data, pelatihan, kustomisasi, integrasi, dan dukungan khusus dapat dikenakan biaya.",
  },
  {
    q: "Mengapa IhsanCloud membutuhkan donasi?",
    a: "Walaupun perangkat lunaknya gratis, layanan tetap membutuhkan server, database, penyimpanan, keamanan, pemeliharaan, pengembangan, pelatihan, dan dukungan pengguna.",
  },
  {
    q: "Apakah donasi wajib bagi lembaga pengguna?",
    a: "Tidak. Donasi adalah dukungan sukarela. Lembaga dapat memakai fitur inti sesuai ketentuan program tanpa wajib menjadi donatur.",
  },
  {
    q: "Apakah data antar-lembaga terpisah?",
    a: "Ya. Setiap lembaga memiliki ruang kerja dan hak akses masing-masing sesuai arsitektur multi-tenant.",
  },
  {
    q: "Apakah tersedia pelatihan?",
    a: "Tersedia panduan mandiri, pelatihan operator, dan program pendampingan sesuai kebutuhan lembaga.",
  },
  {
    q: "Apakah lembaga dapat meminta fitur khusus?",
    a: "Kebutuhan dapat diajukan untuk dipertimbangkan dalam roadmap atau dikembangkan melalui layanan profesional.",
  },
  {
    q: "Apakah donatur menerima laporan?",
    a: "Laporan penggunaan donasi dan perkembangan layanan akan disampaikan secara berkala.",
  },
];

export const roadmap = [
  {
    status: "Tersedia",
    tone: "available",
    items: ["Manajemen tenant", "Pengguna & peran", "Data siswa atau santri", "Kelas", "Absensi", "Pengumuman", "Portal pengguna"],
  },
  {
    status: "Sedang dikembangkan",
    tone: "development",
    items: ["Jurnal pembelajaran", "Penilaian", "Laporan perkembangan", "Manajemen jamaah", "Keuangan", "Donatur", "Inventaris"],
  },
  {
    status: "Direncanakan",
    tone: "planned",
    items: ["Integrasi WhatsApp", "Aplikasi mobile", "Analitik pimpinan", "Integrasi pembayaran", "Marketplace modul", "Integrasi antar-lembaga"],
  },
];

export const serviceModels = [
  {
    name: "Mandiri",
    description: "Untuk lembaga yang siap melakukan implementasi sendiri.",
    items: ["Akses fitur inti", "Panduan & template import", "Pembaruan sistem", "Dukungan komunitas"],
    cta: "Ajukan Akses Gratis",
    href: "/daftar",
  },
  {
    name: "Pendampingan",
    description: "Untuk lembaga yang membutuhkan bantuan saat memulai.",
    items: ["Konfigurasi", "Migrasi data", "Pelatihan", "Konsultasi alur kerja"],
    cta: "Minta Pendampingan",
    href: "/daftar?layanan=pendampingan",
  },
  {
    name: "Institusi",
    description: "Untuk lembaga dengan kebutuhan yang lebih kompleks.",
    items: ["Modul khusus", "Integrasi & domain khusus", "Pendampingan berkala", "Dukungan prioritas"],
    cta: "Diskusikan Kebutuhan",
    href: "/daftar?layanan=institusi",
  },
];
