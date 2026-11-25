import { bi, type Bi } from "./cv-data.ts"

// Source records used by server-side projections.
export type ExperienceEntry = {
  id: string
  company: string
  role: Bi
  period: Bi
  location: Bi
  employmentType: Bi
  summary?: Bi
  points: Bi[]
  projectIds: string[]
}

export const experience: ExperienceEntry[] = [
  {
    id: "sigma",
    company: "PT Sigma Cipta Caraka (Telkomsigma)",
    role: bi("Junior Programmer", "Junior Programmer"),
    period: bi("Nov 2024 – Okt 2026", "Nov 2024 – Oct 2026"),
    location: bi(
      "Yogyakarta, Indonesia (On-site)",
      "Yogyakarta, Indonesia (On-site)"
    ),
    employmentType: bi("Kontrak", "Contract"),
    summary: bi(
      "Berkontribusi dalam 10 inisiatif pengembangan dan pemeliharaan aplikasi web enterprise bagi klien B2B dan unit internal Telkom Group menggunakan Next.js, React, Angular 18, Vue, dan Blazor. Berkolaborasi dalam tim Agile/Scrum lintas fungsi untuk menerjemahkan kebutuhan bisnis menjadi arsitektur frontend modular, mengintegrasikan API, serta memperkuat keamanan web sisi klien.",
      "Contributed to 10 enterprise web development and maintenance initiatives for B2B clients and internal Telkom Group teams, using Next.js, React, Angular 18, Vue, and Blazor. Collaborated in cross-functional Agile/Scrum teams to translate business requirements into modular architecture, integrate APIs, and harden client-side web security."
    ),
    points: [
      bi(
        "IMAPS BPJS Kesehatan: Mengembangkan antarmuka manajemen siklus hidup aset tetap BPJS Kesehatan menggunakan Angular 18, TypeScript, dan Ant Design (NG-ZORRO) untuk digitalisasi inventarisasi dan akuntabilitas aset nasional; mengimplementasikan modul daftar aset, alur persetujuan bertingkat (approval asset multi-tab), usulan penghapusan, dan manajemen pengguna; serta mengintegrasikan REST API bertipe data terdefinisi dan proteksi header anti-clickjacking.",
        "IMAPS BPJS Kesehatan: Developed frontend interfaces for the BPJS Kesehatan fixed asset lifecycle management application using Angular 18, TypeScript, and Ant Design (NG-ZORRO) to digitize nationwide asset inventory and audit accountability; implemented asset directories, multi-stage approval workflows (multi-tab approvals), disposal proposals, and user management; integrated type-safe REST APIs and anti-clickjacking security headers."
      ),
      bi(
        "CART (Continuous Automated Red Teaming): Memelihara dan menyempurnakan antarmuka manajemen kerentanan dan intelijen ancaman siber (CART) untuk pemantauan postur keamanan aset digital korporat menggunakan Nuxt 3, Vue.js, TypeScript, dan Tailwind CSS; mengimplementasikan modul konfigurasi paket pengujian (packages), manajemen domain klien, serta modal template pemindaian; mengintegrasikan formulir validasi skema (Vee-Validate + Yup) dengan REST API dan manajemen state Pinia.",
        "CART (Continuous Automated Red Teaming): Maintained and enhanced vulnerability management and cyber threat intelligence interfaces to monitor corporate attack surfaces using Nuxt 3, Vue.js, TypeScript, and Tailwind CSS; implemented security testing package configuration modules (packages), client domain management, and scan template modals; integrated schema-validated forms (Vee-Validate + Yup) with REST APIs and Pinia."
      ),
      bi(
        "Info Tender (LPSE & SiRUP): Mengembangkan antarmuka aplikasi web intelijen pasar pengadaan barang dan jasa pemerintah menggunakan React 18, TypeScript, Vite, Tailwind CSS, dan Radix UI; mengimplementasikan dasbor analitik lelang (Recharts), katalog lelang LPSE dan rencana pengadaan SiRUP (TanStack Table), fitur komparasi data tender berdampingan, modul konfigurasi parameter scraping (kata kunci KBLI), serta pelacak durasi interaksi pengguna (dwell tracker) terintegrasi perutean.",
        "Info Tender (LPSE & SiRUP): Developed government procurement market intelligence web application interfaces using React 18, TypeScript, Vite, Tailwind CSS, and Radix UI; implemented procurement analytics dashboards (Recharts), LPSE tender and SiRUP planning catalogs (TanStack Table), side-by-side tender comparisons, scraping parameter configuration modules (KBLI keywords), and route-integrated user dwell tracking."
      ),
      bi(
        "MONARA (Monitoring Natal-Tahun Baru dan Ramadan): Mengembangkan antarmuka pemantauan operasional tiket layanan TI Service Desk siaga hari raya menggunakan Next.js (App Router), React 19, TypeScript, dan Tailwind CSS; mengimplementasikan dasbor tiket dengan pembaruan otomatis berkala (polling 30 detik), grafik analitik Recharts, master data shift kerja serta sekitar 40 unit penyedia layanan, formulir unggah bukti penanganan, dan validasi pergantian jadwal petugas.",
        "MONARA (Christmas, New Year & Ramadan Monitoring): Developed IT service ticket monitoring web interfaces for holiday operations using Next.js (App Router), React 19, TypeScript, and Tailwind CSS; implemented ticket monitoring dashboards with automated polling (30-second intervals), Recharts analytics, shift schedules and master data for approximately 40 service-provider units, resolution evidence upload forms, and shift handover validation."
      ),
      bi(
        "Alisa 2.0 (Smart Contracting): Mengembangkan modul Smart Contracting dan Host Shell dengan arsitektur micro-frontend (Module Federation) pada sisi frontend untuk sistem manajemen kontrak enterprise Infomedia Nusantara menggunakan Vite, React 19, Ant Design 5, dan Tailwind CSS; mengimplementasikan alur peninjauan pesanan legal, konfigurasi tahapan kontrak, form builder berbasis seret-dan-lepas (drag-and-drop), pratinjau dokumen PDF sisi klien (@react-pdf/renderer), dan perutean terfederasi (TanStack Router).",
        "Alisa 2.0 (Smart Contracting): Developed Smart Contracting and Host Shell within a micro-frontend architecture (Module Federation) on the frontend for Infomedia Nusantara's enterprise contract management system using Vite, React 19, Ant Design 5, and Tailwind CSS; implemented legal order review workflows, contract stage configurations, drag-and-drop form builders, client-side PDF document previews (@react-pdf/renderer), and federated routing (TanStack Router)."
      ),
      bi(
        "IS-WARE (Proof of Concept – PT KBI): Mengembangkan purwarupa aplikasi web sistem manajemen resi gudang terintegrasi dalam sprint 2 minggu untuk proposal teknis klien PT Kliring Berjangka Indonesia (Grup Danareksa) menggunakan Next.js (App Router), React 19, TypeScript, dan Tailwind CSS; mengimplementasikan alur penerbitan resi gudang (Warehouse Receipt), integrasi dokumen asuransi dan LPK, rekam jejak audit, serta RBAC 5 peran hingga proposal meraih peringkat #1 pada evaluasi teknis.",
        "IS-WARE (Proof of Concept – PT KBI): Developed an integrated warehouse receipt management system prototype in a 2-week sprint for PT Kliring Berjangka Indonesia (Danareksa Group) using Next.js (App Router), React 19, TypeScript, and Tailwind CSS; implemented warehouse receipt issuance workflows, insurance and LPK inspection document integrations, audit trails, and 5-role RBAC, helping the proposal achieve rank #1 in client technical evaluation."
      ),
      bi(
        "Caterine (Change Management): Memelihara antarmuka modul Change Management pada platform ITSM enterprise Telkomsigma menggunakan Vue 3, TypeScript, Vite, dan Pinia dalam penanganan tiket bug dan Change Request (CR); mengimplementasikan alur persetujuan CAB (penambahan, pendelegasian ulang, dan penghapusan peninjau), matriks 35 dokumen justifikasi perubahan wajib, modul pembagian tugas teknis, serta validasi hak akses koordinator perubahan.",
        "Caterine (Change Management): Maintained Change Management module interfaces for Telkomsigma's enterprise ITSM platform using Vue 3, TypeScript, Vite, and Pinia, resolving bug-fix tickets and Change Request (CR) tasks; implemented CAB approval workflows (assign, re-assign, and remove approvers), a 35-item mandatory justification document matrix, technical task assignments, and change coordinator access validation."
      ),
      bi(
        "Whistleblowing System (WBS Internal): Mengembangkan antarmuka aplikasi web Whistleblowing System internal (ISO 37002) menggunakan Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, dan TanStack Query; mengimplementasikan dasbor analitik eksekutif dengan grafik Recharts, tabel penelaahan kasus multi-tahap, registrasi pengaduan multi-kanal, formulir kuesioner kustom, serta lapisan keamanan unggah berkas berbasis magic bytes dan integrasi pemindaian virus ClamAV.",
        "Whistleblowing System (Internal WBS): Developed internal Whistleblowing System web interfaces (ISO 37002) using Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, and TanStack Query; implemented executive analytics dashboards with Recharts, multi-stage case assessment data tables, multi-channel intake, custom questionnaires, and file upload security via binary magic bytes with ClamAV antivirus integration."
      ),
      bi(
        "PIS MARS (Pertamina International Shipping): Mengembangkan dan memelihara portal web enterprise dan CMS PT Pertamina International Shipping menggunakan C#, .NET 8.0, ASP.NET Core, dan Blazor Server dalam arsitektur microservices; menstandardisasi pewarisan kelas dasar pustaka antarmuka Oktaf.UI lintas ratusan berkas komponen Razor, memperbaiki deserialisasi null pada editor CMS, merancang navigasi bertingkat StickyMenu, serta mengintegrasikan Mock Authentication Middleware pada 6 microservice backend.",
        "PIS MARS (Pertamina International Shipping): Developed and maintained enterprise web portal and CMS interfaces for PT Pertamina International Shipping using C#, .NET 8.0, ASP.NET Core, and Blazor Server within a microservices architecture; standardized Oktaf.UI base component inheritance across hundreds of Razor components, resolved null deserialization in CMS editors, designed StickyMenu navigation, and integrated Mock Authentication Middleware across 6 backend microservices."
      ),
      bi(
        "Pemeliharaan Aplikasi Web Enterprise & Portal Operasional: Mengembangkan pembaruan antarmuka dan mengimplementasikan perbaikan keamanan frontend pada 2 aplikasi web enterprise menggunakan Vue.js, Nuxt, TypeScript, dan Tailwind CSS; mengimplementasikan composable sanitasi data (useSanitize, useSvgSanitizer) dan Content Security Policy (CSP) untuk mitigasi XSS, sanitasi URL pengalihan login pencegah Open Redirect, serta pelindung SSR di lingkungan Node 22.",
        "Enterprise Web Applications Maintenance & Operations Portal: Developed frontend updates and implemented frontend security remediations across 2 enterprise web applications using Vue.js, Nuxt, TypeScript, and Tailwind CSS; implemented data sanitization composables (useSanitize, useSvgSanitizer) and Content Security Policy (CSP) headers for XSS mitigation, login redirect sanitization preventing Open Redirects, and Node 22 SSR compatibility guards."
      ),
    ],
    projectIds: [
      "imaps",
      "cart",
      "info-tender",
      "monara",
      "alisa",
      "is-ware",
      "caterine-cm",
      "wbs",
      "pis-mars",
      "cis",
    ],
  },
  {
    id: "tumbuhin",
    company: "Tumbuhin Digital",
    role: bi("Frontend Engineer", "Frontend Engineer"),
    period: bi("Mei 2026 – Jun 2026", "May 2026 – Jun 2026"),
    location: bi(
      "Yogyakarta, Indonesia (Remote)",
      "Yogyakarta, Indonesia (Remote)"
    ),
    employmentType: bi("Paruh Waktu", "Part-Time"),
    points: [
      bi(
        "Merancang arsitektur state keranjang belanja e-commerce pesanan partai besar menggunakan Next.js 16 (App Router), TypeScript, Zustand, dan TanStack Query v5; menerapkan pembaruan antarmuka optimistis dengan pemulihan state otomatis saat terjadi gangguan jaringan.",
        "Designed shopping cart state architecture for a bulk-order e-commerce platform using Next.js 16 (App Router), TypeScript, Zustand, and TanStack Query v5; implemented optimistic UI updates with automatic state rollback on network failures."
      ),
      bi(
        "Mengembangkan alur split-payment dan panel pemenuhan pesanan per item dengan pencegahan duplikasi resi pengiriman, serta memelihara sanitasi input sisi klien (isomorphic-dompurify) untuk mitigasi risiko XSS.",
        "Developed split-payment workflows and an item-level order fulfillment panel that prevented duplicate shipment-tracking entries, maintaining client-side input sanitization (isomorphic-dompurify) for XSS risk mitigation."
      ),
    ],
    projectIds: ["bulk-orders"],
  },
  {
    id: "telkom",
    company: "Telkom Indonesia",
    role: bi("Developer", "Developer"),
    period: bi("Jan 2023 – Des 2023", "Jan 2023 – Dec 2023"),
    location: bi("Jakarta, Indonesia (Remote)", "Jakarta, Indonesia (Remote)"),
    employmentType: bi("Magang", "Internship"),
    points: [
      bi(
        "Mengembangkan purwarupa aplikasi web analitik operasional telekomunikasi Netmonk Analytics menggunakan React, Tailwind CSS, Redux Toolkit, dan RTK Query untuk memantau progres pemenuhan pesanan di 7 divisi regional (TREG) dan 40+ wilayah telekomunikasi (Witel); merancang arsitektur keamanan akses dasbor Metabase tertanam menggunakan token JWT bertanda tangan kriptografis (dipertahankan sebagai skripsi sarjana di UGM).",
        "Developed the Netmonk Analytics operational analytics web prototype using React, Tailwind CSS, Redux Toolkit, and RTK Query to monitor order fulfillment across 7 regional divisions (TREG) and 40+ branch offices (Witel); designed secure access architecture for embedded Metabase dashboards using cryptographically signed JWTs (defended as undergraduate thesis at UGM)."
      ),
      bi(
        "Mengintegrasikan sistem autentikasi dual-token dengan penanganan silent refresh pada RTK Query, mengimplementasikan kontrol akses berbasis peran (RBAC), serta memelihara antarmuka modul monitoring Netmonk HI.",
        "Integrated dual-token authentication with silent refresh handling via RTK Query, implemented role-based access control (RBAC), and maintained frontend interfaces for the Netmonk HI monitoring module."
      ),
    ],
    projectIds: ["netmonk"],
  },
]

export type ProjectEntry = {
  id: string
  publicRef?: string
  name: string
  period: Bi
  company: Bi
  shortDescription: Bi
  description: Bi
  role: Bi
  tech: string[]
  bullets?: Bi[]
  link?: string
}

export const projects: ProjectEntry[] = [
  {
    id: "hiblow-fleet",
    name: "HiBlow Fleet",
    period: bi("Sep 2026 – Okt 2026", "Sep 2026 – Oct 2026"),
    company: bi(
      "Proyek Pribadi (Bisnis Keluarga)",
      "Personal Project (Family Business)"
    ),
    shortDescription: bi(
      "Aplikasi untuk mengelola perjalanan dan keuangan armada truk semen curah.",
      "An app for managing trips and finances for a bulk cement trucking fleet."
    ),
    description: bi(
      "Aplikasi web full-stack untuk mengelola operasional dan keuangan armada truk semen curah milik bisnis keluarga. Sistem ini menggantikan pencatatan manual dengan pengelolaan ritase, referensi tarif untuk 296 rute pabrik, perhitungan PPh 23 (1,2%), pembagian keuntungan investor, dan dasbor analitik berbasis Recharts.",
      "A full-stack web application for managing the operations and finances of a family-owned bulk cement trucking business. It replaces manual records with trip tracking, a rate catalog for 296 factory routes, PPh 23 tax calculations (1.2%), investor profit sharing, and Recharts analytics dashboards."
    ),
    role: bi(
      "Saya merancang dan membangun aplikasi full-stack ini untuk bisnis keluarga, dari logika keuangan dan basis data hingga dasbor operasional.",
      "I designed and built this full-stack app for my family’s business, from the financial logic and database to the operations dashboards."
    ),
    bullets: [
      bi(
        "Merancang arsitektur aplikasi manajemen armada full-stack menggunakan Next.js 16 dan React 19 dengan React Server Components (RSC) dan Next.js Server Actions yang divalidasi menggunakan Zod.",
        "Designed the full-stack fleet management architecture using Next.js 16 and React 19, with React Server Components (RSC) and Zod-validated Next.js Server Actions."
      ),
      bi(
        "Membangun Pure Domain Engine untuk mengotomatiskan perhitungan tarif angkutan di 296 rute pabrik semen, pemotongan PPh 23 (1,2%), dan pembagian keuntungan investor; seluruh 297 pengujian otomatis Vitest berhasil dilalui.",
        "Built a financial Pure Domain Engine to automate freight rates across 296 cement factory routes, PPh 23 deductions (1.2%), and investor profit sharing; all 297 automated Vitest tests passed."
      ),
      bi(
        "Merancang skema basis data PostgreSQL dengan Drizzle ORM dan kontrol akses berbasis peran (RBAC) menggunakan Better-Auth untuk memisahkan akses pengelola dan investor.",
        "Designed PostgreSQL database schemas with Drizzle ORM and implemented role-based access control (RBAC) using Better-Auth to separate administrative and investor access."
      ),
      bi(
        "Mengembangkan dasbor keuangan dan pemantauan armada dengan Recharts untuk menampilkan tren pendapatan dan pengeluaran bulanan, serta pengingat masa berlaku uji KIR dan STNK.",
        "Built financial and fleet monitoring dashboards with Recharts to visualize monthly revenue and expenses, along with KIR vehicle inspection and STNK registration renewal reminders."
      ),
      bi(
        "Menambahkan fitur ekspor laporan transaksi dalam format Excel (.xlsx) dan CSV untuk mendukung audit pembukuan dan rekonsiliasi bank.",
        "Added transaction report exports in Excel (.xlsx) and CSV formats to support accounting audits and bank reconciliation."
      ),
    ],
    tech: [
      "Next.js 16 (App Router)",
      "React 19 (RSC, Server Actions)",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "PostgreSQL",
      "Drizzle ORM",
      "Better-Auth",
      "Recharts",
      "TanStack Table",
      "Vitest",
      "Zod",
    ],
    link: "https://github.com/hadidwirsty/hiblow-fleet",
  },
  {
    id: "is-ware",
    name: "IS-WARE (Proof of Concept – PT KBI)",
    period: bi("Jul 2025 – Agu 2025", "Jul 2025 – Aug 2025"),
    company: bi(
      "PT Sigma Cipta Caraka (Klien: PT KBI – Grup Danareksa)",
      "PT Sigma Cipta Caraka (Client: PT KBI – Danareksa Group)"
    ),
    shortDescription: bi(
      "Purwarupa untuk menerbitkan dan mengelola resi gudang.",
      "A prototype for issuing and managing warehouse receipts."
    ),
    description: bi(
      "Purwarupa sistem manajemen resi gudang terintegrasi yang diselesaikan dalam sprint 2 minggu untuk proposal teknis PT Kliring Berjangka Indonesia (Grup Danareksa). Mencakup penerbitan resi, integrasi dokumen asuransi dan LPK, rekam jejak audit, serta kontrol akses untuk 5 peran pengguna.",
      "An integrated warehouse receipt management prototype delivered in a 2-week sprint for a technical proposal to PT Kliring Berjangka Indonesia (Danareksa Group). Features include receipt issuance, insurance and inspection agency (LPK) document integration, audit trails, and access controls for 5 user roles."
    ),
    role: bi(
      "Saya mengembangkan arsitektur purwarupa dan alur penerbitan resi gudang untuk proposal teknis klien.",
      "I developed the prototype architecture and warehouse receipt issuance workflow for the client’s technical proposal."
    ),
    bullets: [
      bi(
        "Mengembangkan antarmuka penerbitan resi gudang dalam sprint 2 minggu, termasuk formulir registrasi bertahap, perhitungan bobot komoditas, dan alur persetujuan dokumen.",
        "Developed warehouse receipt issuance interfaces in a 2-week sprint, including multi-step registration forms, commodity weight calculations, and document approval workflows."
      ),
      bi(
        "Mengembangkan fitur rekam jejak audit (audit trail) untuk mencatat perubahan status resi dari pembuatan draf hingga verifikasi akhir.",
        "Built audit trail tracking to record warehouse receipt status changes from initial draft to final verification."
      ),
      bi(
        "Mengembangkan modul data master untuk gudang, jenis komoditas, perusahaan asuransi, dan Lembaga Pemeriksa Kesesuaian (LPK), lengkap dengan fitur pencarian dan unduh lampiran.",
        "Built master data modules for warehouses, commodity types, insurance companies, and inspection agencies (LPK), with search and attachment download features."
      ),
      bi(
        "Merancang tata letak aplikasi dan navigasi responsif berbasis Next.js App Router, Tailwind CSS v4, dan Radix UI (shadcn/ui).",
        "Designed responsive application layouts and navigation components using Next.js App Router, Tailwind CSS v4, and Radix UI (shadcn/ui)."
      ),
      bi(
        "Mengintegrasikan REST API menggunakan TanStack Query dan Zustand serta menerapkan kontrol akses berbasis 5 peran pengguna; kontribusi ini mendukung proposal yang meraih peringkat pertama dalam evaluasi teknis klien.",
        "Integrated REST APIs using TanStack Query and Zustand and maintained access control for 5 user roles, contributing to the proposal's first-place ranking in the client's technical evaluation."
      ),
    ],
    tech: [
      "Next.js (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Radix UI",
      "TanStack Query",
      "TanStack Table",
      "Zustand",
      "React Hook Form",
      "Zod",
    ],
  },
  {
    id: "alisa",
    name: "Alisa 2.0 (Smart Contracting)",
    period: bi("Apr 2025 – Jul 2025", "Apr 2025 – Jul 2025"),
    company: bi(
      "PT Sigma Cipta Caraka (Klien: Infomedia Nusantara)",
      "PT Sigma Cipta Caraka (Client: Infomedia Nusantara)"
    ),
    shortDescription: bi(
      "Sistem untuk meninjau, mengelola, dan mengonfigurasi kontrak.",
      "A system for reviewing, managing, and configuring contracts."
    ),
    description: bi(
      "Sistem manajemen konten (CMS) untuk Infomedia Nusantara yang dibangun dengan arsitektur microservices dan micro-frontend berbasis Module Federation.",
      "A content management system (CMS) for Infomedia Nusantara, built using a microservices architecture and a Module Federation-based micro-frontend."
    ),
    role: bi(
      "Saya mengembangkan modul Smart Contracting dan merancang Host Shell yang menghubungkan modul micro-frontend.",
      "I built Smart Contracting features and designed the Host Shell that connects the micro-frontends."
    ),
    bullets: [
      bi(
        "Mengembangkan antarmuka Smart Contracting untuk peninjauan pesanan legal, pemantauan kontrak aktif, dan validasi dokumen.",
        "Built Smart Contracting interfaces for legal order reviews, active contract tracking, and document validation."
      ),
      bi(
        "Mengimplementasikan modul konfigurasi kontrak (Configurations) mencakup pengelolaan tipe kontrak, tahapan (stages), alur kerja (workflows), dan template klausul.",
        "Implemented contract configuration modules (Configurations) covering contract types, lifecycle stages, workflows, and clause templates."
      ),
      bi(
        "Merancang antarmuka pembuat formulir dengan fitur seret dan lepas (drag and drop) serta pratinjau PDF di sisi klien menggunakan @react-pdf/renderer.",
        "Designed a drag-and-drop form builder and client-side PDF previews using @react-pdf/renderer."
      ),
      bi(
        "Merancang kerangka Host Shell berbasis arsitektur micro-frontend (Module Federation) menggunakan Vite, React 19, Ant Design 5, dan TanStack Router untuk routing lintas micro-frontend.",
        "Designed the micro-frontend Host Shell architecture (Module Federation) using Vite, React 19, Ant Design 5, and TanStack Router for federated navigation."
      ),
      bi(
        "Mengintegrasikan REST API dengan TanStack Query dan Zustand serta memelihara konsistensi state dan penanganan error respons API.",
        "Integrated REST APIs with TanStack Query and Zustand while maintaining state consistency and API error handling."
      ),
    ],
    tech: [
      "React 19",
      "Vite",
      "Ant Design 5",
      "Module Federation",
      "TanStack Router",
      "TanStack Query",
      "@react-pdf/renderer",
      "Tailwind CSS",
      "Zustand",
    ],
  },
  {
    id: "wbs",
    name: "Whistleblowing System (WBS)",
    period: bi("Des 2025 – Agu 2026", "Dec 2025 – Aug 2026"),
    company: bi(
      "PT Sigma Cipta Caraka (Tim Pengelola WBS Telkomsigma)",
      "PT Sigma Cipta Caraka (WBS Management Team)"
    ),
    shortDescription: bi(
      "Sistem internal untuk mencatat dan menelaah laporan dugaan pelanggaran.",
      "An internal system for logging and reviewing reports of suspected misconduct."
    ),
    description: bi(
      "Aplikasi Whistleblowing System (WBS) internal bagi Tim Pengelola WBS Telkomsigma untuk menangani laporan dugaan pelanggaran etika dan tata kelola perusahaan sesuai prinsip ISO 37002. Fitur utamanya meliputi dasbor analitik, penelaahan kasus bertahap, registrasi laporan dari berbagai kanal, dan pengunggahan bukti secara aman.",
      "An internal Whistleblowing System (WBS) for Telkomsigma's WBS Management Team to handle reports of suspected ethics and corporate governance violations in line with ISO 37002. Key features include analytics dashboards, multi-stage case reviews, multi-channel report registration, and secure evidence uploads."
    ),
    role: bi(
      "Saya mengembangkan antarmuka pelaporan dan penelaahan kasus serta merancang validasi keamanan untuk unggahan bukti.",
      "I developed the reporting and case review interfaces and designed security checks for evidence uploads."
    ),
    bullets: [
      bi(
        "Mengembangkan dasbor analitik pengaduan WBS menggunakan Recharts untuk menampilkan rasio kasus terbukti (concern ratio), distribusi status, klasifikasi identitas pelapor, dan kanal pelaporan.",
        "Built WBS analytics dashboards with Recharts to show substantiated case ratios (concern ratio), case status distributions, reporter identity categories, and reporting channel breakdowns."
      ),
      bi(
        "Mengimplementasikan manajemen data pengaduan dan alur penelaahan multi-tahap (validasi-verifikasi, pemeriksaan, dan pelaporan publik) dengan tabel TanStack Table, panel samping interaktif, dan sinkronisasi data antar tab terpusat.",
        "Implemented complaint data management and multi-stage case assessment workflows (validation-verification, inspection, and public reporting) with TanStack Table, interactive side panels, and centralized multi-tab data synchronization."
      ),
      bi(
        "Mengembangkan formulir pencatatan pengaduan dari berbagai kanal, termasuk surat, telepon, dan tatap muka, beserta informasi kejadian dan lampiran bukti pendukung.",
        "Built complaint registration forms for reports received by letter, phone, or in person, including incident details and supporting evidence attachments."
      ),
      bi(
        "Merancang validasi unggahan bukti dengan memeriksa tanda tangan biner (magic bytes) pada 4.096 byte pertama untuk mendeteksi ketidaksesuaian jenis berkas, serta mengintegrasikan pemindaian antivirus ClamAV di sisi server.",
        "Designed evidence upload validation by inspecting binary file signatures (magic bytes) within the first 4,096 bytes to detect file type mismatches, and integrated server-side ClamAV antivirus scanning."
      ),
      bi(
        "Mengintegrasikan dukungan multibahasa dengan i18next dan modul konfigurasi kuesioner, termasuk pengelompokan pertanyaan dan validasi isian wajib, serta mengelola kontrol akses berbasis peran (RBAC).",
        "Integrated multilingual support with i18next and configurable questionnaires, including question grouping and required-field validation, while maintaining role-based access control (RBAC)."
      ),
    ],
    tech: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "TanStack Query",
      "TanStack Table",
      "Recharts",
      "React Hook Form",
      "Zod",
      "Zustand",
      "i18next",
    ],
  },
  {
    id: "monara",
    name: "MONARA (Monitoring Natal-Tahun Baru dan Ramadan)",
    period: bi("Feb 2025 – Des 2025", "Feb 2025 – Dec 2025"),
    company: bi(
      "PT Sigma Cipta Caraka (Tim Service Desk & Operasional Layanan TI)",
      "PT Sigma Cipta Caraka (Service Desk & IT Operations Team)"
    ),
    shortDescription: bi(
      "Dasbor pemantauan tiket layanan TI selama Ramadan, Natal, dan Tahun Baru.",
      "A dashboard for tracking IT service tickets during Ramadan, Christmas, and New Year."
    ),
    description: bi(
      "Aplikasi web terpusat untuk memantau tiket layanan TI selama periode sibuk Ramadan serta Natal dan Tahun Baru. Tim Service Desk dan Operasional Layanan dapat mengikuti status tiket melalui pembaruan data berkala.",
      "A centralized web application for monitoring IT service tickets during the busy Ramadan and Christmas–New Year periods. Service Desk and Operations teams can track ticket status with regularly refreshed data."
    ),
    role: bi(
      "Saya mengembangkan arsitektur frontend, dasbor status tiket, dan antarmuka untuk pencatatan kendala serta pengelolaan data operasional.",
      "I developed the frontend architecture, ticket status dashboards, and interfaces for issue reporting and operational data management."
    ),
    bullets: [
      bi(
        "Mengembangkan dasbor pemantauan tiket dengan pembaruan data otomatis setiap 30 detik dan visualisasi menggunakan Recharts.",
        "Built ticket monitoring dashboards with automatic data refresh every 30 seconds and Recharts visualizations."
      ),
      bi(
        "Mengembangkan formulir pencatatan kendala layanan dengan fitur unggah berkas bukti penanganan menggunakan multipart/form-data.",
        "Built service issue reporting forms with support for uploading resolution evidence using multipart/form-data."
      ),
      bi(
        "Membangun modul data master untuk kategori tiket, sekitar 40 unit penyedia layanan, dan jadwal shift, serta dialog riwayat penanganan tiket.",
        "Built master data for approximately 40 service-provider units, as well as modules for ticket categories, shift schedules, and ticket resolution history."
      ),
      bi(
        "Membangun validasi jadwal shift berdasarkan waktu lokal agar status petugas yang sedang bertugas ditampilkan secara akurat.",
        "Built shift schedule validation using local time to accurately identify on-duty staff."
      ),
      bi(
        "Mengintegrasikan REST API dengan TanStack Query dan Zustand serta mengelola kontrol akses berbasis peran (RBAC).",
        "Integrated REST APIs with TanStack Query and Zustand while maintaining role-based access control (RBAC)."
      ),
    ],
    tech: [
      "Next.js (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "TanStack Query",
      "TanStack Table",
      "Zustand",
      "Recharts",
      "React Hook Form",
      "Zod",
    ],
  },
  {
    id: "info-tender",
    name: "Info Tender (LPSE & SiRUP)",
    period: bi("Mei 2025 – Agu 2026", "May 2025 – Aug 2026"),
    company: bi(
      "PT Sigma Cipta Caraka (Tim Sales Support & Presales)",
      "PT Sigma Cipta Caraka (Sales Support & Presales Team)"
    ),
    shortDescription: bi(
      "Aplikasi untuk mencari dan membandingkan tender pemerintah dari LPSE dan SiRUP.",
      "An app for finding and comparing government tenders from LPSE and SiRUP."
    ),
    description: bi(
      "Aplikasi web intelijen pengadaan pemerintah yang mengolah informasi dari portal LPSE dan SiRUP. Membantu tim Sales Support dan Presales menemukan peluang tender TI, membandingkan rencana pengadaan dengan tender aktif, serta mengelola konfigurasi pengambilan data otomatis (scraping).",
      "A government procurement intelligence application that aggregates data from LPSE and SiRUP. It helps Sales Support and Presales teams identify IT tender opportunities, compare procurement plans with active tenders, and manage automated data collection (scraping)."
    ),
    role: bi(
      "Saya membangun antarmuka untuk pencarian, analisis, dan perbandingan tender, serta konfigurasi pengambilan data otomatis.",
      "I built interfaces for searching, analyzing, and comparing tenders, as well as settings for automated data collection."
    ),
    bullets: [
      bi(
        "Mengembangkan katalog tender LPSE dan rencana pengadaan SiRUP dengan filter pencarian terstruktur dan tabel interaktif menggunakan TanStack Table.",
        "Built LPSE tender and SiRUP procurement plan catalogs with structured search filters and interactive tables using TanStack Table."
      ),
      bi(
        "Membuat dasbor analitik untuk memvisualisasikan pagu anggaran dan jumlah tender pemerintah menggunakan Recharts.",
        "Built Recharts dashboards to visualize government procurement budgets and tender counts."
      ),
      bi(
        "Mengimplementasikan fitur komparasi tender berdampingan (side-by-side) antara paket rencana SiRUP dan lelang LPSE untuk validasi kode RUP.",
        "Implemented side-by-side tender comparison tools between SiRUP procurement plans and LPSE tenders for RUP code verification."
      ),
      bi(
        "Merancang modul konfigurasi sistem untuk kata kunci KBLI yang digunakan dalam scraping serta fitur pelacakan durasi interaksi pengguna (Dwell Tracker).",
        "Designed system settings for KBLI keyword-based scraping and a user interaction duration tracker (Dwell Tracker)."
      ),
      bi(
        "Mengintegrasikan REST API dengan TanStack Query dan Zustand serta mengelola kontrol akses berbasis peran (RBAC).",
        "Integrated REST APIs with TanStack Query and Zustand while maintaining role-based access control (RBAC)."
      ),
    ],
    tech: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "TanStack Query",
      "TanStack Table",
      "Zustand",
      "Recharts",
      "React Hook Form",
      "Zod",
    ],
  },
  {
    id: "imaps",
    name: "IMAPS (BPJS Kesehatan)",
    period: bi("Nov 2024 – Jan 2025", "Nov 2024 – Jan 2025"),
    company: bi(
      "PT Sigma Cipta Caraka (Klien: BPJS Kesehatan)",
      "PT Sigma Cipta Caraka (Client: BPJS Kesehatan)"
    ),
    shortDescription: bi(
      "Aplikasi manajemen aset tetap untuk BPJS Kesehatan.",
      "A fixed asset management app for BPJS Kesehatan."
    ),
    description: bi(
      "Integrated Management Asset and Procurement System — aplikasi manajemen aset untuk BPJS Kesehatan.",
      "Integrated Management Asset and Procurement System — an enterprise asset management application for BPJS Kesehatan."
    ),
    role: bi(
      "Saya mengembangkan antarmuka inventaris, persetujuan aset, dan manajemen pengguna menggunakan Angular 18 dan NG-ZORRO.",
      "I built interfaces for asset inventory, asset approvals, and user management using Angular 18 and NG-ZORRO."
    ),
    bullets: [
      bi(
        "Mengembangkan antarmuka modul persetujuan bertingkat (Approval Asset) dengan navigasi beberapa tab untuk usulan aset baru, perubahan nilai, mutasi, dan penghapusan.",
        "Developed multi-stage fixed asset approval modules with multi-tab navigation supporting new asset entries, value adjustments, transfers, and disposal proposals."
      ),
      bi(
        "Mengembangkan direktori inventaris aset tetap dengan tabel data padat, paginasi di sisi server, dan format mata uang rupiah.",
        "Built a fixed asset inventory directory with dense data tables, server-side pagination, and Indonesian rupiah currency formatting."
      ),
      bi(
        "Mengembangkan formulir usulan penghapusan aset, termasuk fitur pengelompokan data dan peninjauan akhir.",
        "Built asset disposal proposal forms, including data grouping and final review workflows."
      ),
      bi(
        "Mengimplementasikan modul manajemen pengguna (User Management) dan peran dengan kontrol akses berbasis peran (RBAC).",
        "Implemented user and role management modules with role-based access control (RBAC)."
      ),
      bi(
        "Mengintegrasikan REST API dengan tipe data yang terdefinisi dan mengonfigurasi header keamanan anti-clickjacking (X-Frame-Options: SAMEORIGIN).",
        "Integrated type-safe REST APIs and configured anti-clickjacking security headers (X-Frame-Options: SAMEORIGIN)."
      ),
    ],
    tech: [
      "Angular 18",
      "NG-ZORRO",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
      "RxJS",
    ],
  },
  {
    id: "cis",
    publicRef: "enterprise-web-maintenance-operations",
    name: "Enterprise Web Applications Maintenance & Operations Portal",
    period: bi("Mar 2026 – Sep 2026", "Mar 2026 – Sep 2026"),
    company: bi(
      "PT Sigma Cipta Caraka (Divisi Corporate Information System)",
      "PT Sigma Cipta Caraka (Corporate Information System Division)"
    ),
    shortDescription: bi(
      "Pemeliharaan antarmuka dan keamanan dua aplikasi web perusahaan.",
      "Frontend and security maintenance for two enterprise web applications."
    ),
    description: bi(
      "Pemeliharaan dan peningkatan keamanan frontend pada 2 aplikasi web enterprise dalam layanan terkelola (managed services). Pekerjaan mencakup perbaikan temuan pemindaian kerentanan (XSS, CSP, dan Open Redirect), kompatibilitas SSR dengan Node.js 22, serta perbaikan alur transaksi pengadaan.",
      "Frontend maintenance and security improvements across 2 enterprise web applications under a managed services arrangement. Work included remediation of vulnerability scan findings (XSS, CSP, and Open Redirect), Node.js 22 SSR compatibility fixes, and procurement workflow improvements."
    ),
    role: bi(
      "Saya memelihara antarmuka, memperbaiki alur pengadaan, dan menangani temuan keamanan frontend pada dua aplikasi web.",
      "I maintained the interfaces, fixed procurement workflows, and addressed frontend security findings across two web applications."
    ),
    bullets: [
      bi(
        "Mengembangkan composable sanitasi data (useSanitize dan useSvgSanitizer) untuk membersihkan input teks, parameter URL, dan markup SVG kode QR guna menutup celah Cross-Site Scripting (XSS) pada dokumen pengadaan.",
        "Built data sanitization composables (useSanitize and useSvgSanitizer) for text inputs, URL parameters, and QR code SVG markup to address Cross-Site Scripting (XSS) vulnerabilities in procurement documents."
      ),
      bi(
        "Mengimplementasikan proteksi Content Security Policy (CSP) dan sanitasi pengalihan URL pada alur login portal kemitraan guna mencegah serangan injeksi skrip dan celah Open Redirect.",
        "Implemented Content Security Policy (CSP) protections and URL redirect sanitization on partner portal login flows to prevent script injection and Open Redirect exploits."
      ),
      bi(
        "Membangun pelindung kompatibilitas Server-Side Rendering (SSR), termasuk mock aman untuk objek peramban (localStorage) dan pembungkus ClientOnly, guna mencegah kegagalan hidrasi di lingkungan Node.js 22.",
        "Built Server-Side Rendering (SSR) compatibility guards, including safe browser API mocks (localStorage) and ClientOnly wrappers, to prevent hydration failures in Node.js 22 environments."
      ),
      bi(
        "Memperbaiki penguraian ID Purchase Order (PO) dari parameter URL untuk mencegah data transaksi satu formulir menimpa formulir lainnya.",
        "Fixed Purchase Order (PO) ID parsing from URL parameters to prevent transaction data from one procurement form from overwriting another."
      ),
      bi(
        "Menyeragamkan konfigurasi klien REST API publik (BASE_URL_PUBLIC) serta memperbaiki paginasi dan filter pencarian pada tabel transaksi pengadaan.",
        "Standardized public REST API client configuration (BASE_URL_PUBLIC) and improved pagination and search filters in procurement transaction tables."
      ),
    ],
    tech: [
      "Vue.js",
      "Nuxt 2",
      "Nuxt 3",
      "TypeScript",
      "Tailwind CSS",
      "Pinia",
      "Content Security Policy",
      "Node 22 SSR",
      "REST API",
    ],
  },
  {
    id: "pis-mars",
    name: "PIS MARS (Pertamina International Shipping)",
    period: bi("Mei 2026 – Jun 2026", "May 2026 – Jun 2026"),
    company: bi(
      "PT Sigma Cipta Caraka (Klien: PT Pertamina International Shipping)",
      "PT Sigma Cipta Caraka (Client: PT Pertamina International Shipping)"
    ),
    shortDescription: bi(
      "Portal dan sistem manajemen konten untuk Pertamina International Shipping.",
      "A web portal and content management system for Pertamina International Shipping."
    ),
    description: bi(
      "Portal web dan sistem manajemen konten (CMS) untuk PT Pertamina International Shipping, dikembangkan dengan C#/.NET 8 dan Blazor Server dalam arsitektur microservices. Fitur meliputi publikasi berita perusahaan, pengelolaan arsip dokumen, formulir interaktif, dan integrasi Single Sign-On.",
      "An enterprise portal and content management system (CMS) for PT Pertamina International Shipping, built with C#/.NET 8 and Blazor Server in a microservices architecture. Features include corporate news publishing, document archives, interactive forms, and Single Sign-On integration."
    ),
    role: bi(
      "Saya mengembangkan dan memelihara antarmuka portal dan CMS, menstandarkan pustaka komponen, serta memelihara konfigurasi kontainer Docker.",
      "I developed and maintained the portal and CMS interfaces, standardized the component library, and maintained Docker container configuration."
    ),
    bullets: [
      bi(
        "Menstandarkan pustaka komponen UI Blazor Oktaf.UI pada 384 berkas Razor, meliputi pewarisan kelas dasar, metode siklus hidup komponen (OnParametersSetAsync), dan keamanan tipe referensi nullable.",
        "Standardized the Oktaf.UI Blazor component library across 384 Razor files, including base class inheritance, component lifecycle handling (OnParametersSetAsync), and nullable reference type safety."
      ),
      bi(
        "Memperbaiki modul Form Builder dan editor CMS dengan menangani deserialisasi parameter null secara aman, mengatasi kegagalan serialisasi komponen, dan meningkatkan respons antarmuka penyuntingan konten.",
        "Improved the Form Builder and CMS editor by safely handling null parameter deserialization, resolving component serialization crashes, and improving content editing responsiveness."
      ),
      bi(
        "Merancang komponen formulir dan navigasi bertingkat (StickyMenu) dengan indikator langkah, pemisah arah navigasi, serta jarak antarelemen input yang konsisten (InputTextArea, LOV, FbDatePicker, UploadFile).",
        "Designed structured forms and multi-level navigation (StickyMenu) with step indicators, breadcrumb separators, and consistent input spacing (InputTextArea, LOV, FbDatePicker, UploadFile)."
      ),
      bi(
        "Mengintegrasikan Mock Authentication Middleware ke 6 layanan backend ASP.NET Core untuk menyimulasikan sesi login dan hak akses administratif (Admin BUSOL/Admin APP) di lingkungan pengembangan lokal tanpa bergantung pada server SSO eksternal.",
        "Integrated Mock Authentication Middleware into 6 ASP.NET Core backend microservices to simulate logged-in sessions and administrative permissions (Admin BUSOL/Admin APP) in local development without depending on an external SSO server."
      ),
      bi(
        "Memelihara konfigurasi Docker untuk beberapa layanan dan integrasi API microservices, termasuk healthcheck melalui alamat loopback serta sinkronisasi variabel lingkungan basis data lokal.",
        "Maintained multi-service Docker configurations and microservice API integration, including loopback-based health checks and local database environment variable synchronization."
      ),
    ],
    tech: [
      ".NET 8",
      "C#",
      "Blazor Server",
      "ASP.NET Core",
      "Oktaf.UI",
      "Blazorise",
      "Tailwind CSS",
      "SignalR",
      "OpenID Connect",
      "Docker",
      "Microservices",
    ],
  },
  {
    id: "caterine-cm",
    name: "Caterine (Change Management)",
    period: bi("Agu 2025 – Apr 2026", "Aug 2025 – Apr 2026"),
    company: bi(
      "PT Sigma Cipta Caraka (Tim ITSM Platform)",
      "PT Sigma Cipta Caraka (ITSM Platform Team)"
    ),
    shortDescription: bi(
      "Aplikasi untuk mengelola dan meninjau permintaan perubahan layanan TI.",
      "An app for managing and reviewing IT service change requests."
    ),
    description: bi(
      "Aplikasi IT Service Management (ITSM) berbasis web untuk pengelolaan layanan TI perusahaan sesuai praktik ITIL. Fitur mencakup permintaan perubahan sistem, peninjauan oleh Change Advisory Board (CAB), dan verifikasi dokumen terkait risiko.",
      "An enterprise IT Service Management (ITSM) application supporting ITIL-aligned operations, including change requests, Change Advisory Board (CAB) reviews, and risk documentation checks."
    ),
    role: bi(
      "Saya memelihara modul Change Management dan mengembangkan alur persetujuan serta validasi dokumen.",
      "I maintained the Change Management module and built approval and document validation workflows."
    ),
    bullets: [
      bi(
        "Memelihara dan mengembangkan modul persetujuan Change Advisory Board (CAB) untuk manajemen perubahan TI, mencakup dialog penambahan peninjau, delegasi ulang (re-assign), dan penghapusan hak persetujuan pada tiket Change Request (CR).",
        "Maintained and developed Change Advisory Board (CAB) approval modules for IT change management, including dialogs to assign, re-assign, and revoke approver permissions on Change Request (CR) tasks."
      ),
      bi(
        "Mengembangkan matriks 35 dokumen justifikasi wajib dengan validasi berkas dalam berbagai format hingga 15 MB, pratinjau dokumen, dan penanganan unggahan sementara.",
        "Built a matrix of 35 required justification documents, with validation for multiple file formats up to 15 MB, document previews, and temporary upload handling."
      ),
      bi(
        "Memelihara modul manajemen tugas perubahan dan filter pencarian tiket lanjutan dengan state filter yang tetap tersimpan.",
        "Maintained change task management modules and advanced ticket search filters with persistent filter settings."
      ),
      bi(
        "Merancang validasi hak akses dan alur kerja untuk peran Change Coordinator sesuai tata kelola ITIL.",
        "Designed access validation and workflows for the Change Coordinator role in line with ITIL governance practices."
      ),
      bi(
        "Mengintegrasikan REST API dengan manajemen state Pinia serta memelihara konsistensi sinkronisasi draf perubahan lokal (applyLocalPendingChanges).",
        "Integrated REST APIs with Pinia state management and ensured local pending change synchronization workflows (applyLocalPendingChanges)."
      ),
    ],
    tech: [
      "Vue 3 (Composition API)",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Pinia",
      "Vee-Validate",
      "Yup",
      "Headless UI",
      "REST API",
    ],
  },
  {
    id: "cart",
    name: "CART (Continuous Automated Red Teaming)",
    period: bi("Jan 2025 – Feb 2025", "Jan 2025 – Feb 2025"),
    company: bi(
      "PT Sigma Cipta Caraka (Tim Cyber Security)",
      "PT Sigma Cipta Caraka (Cyber Security Team)"
    ),
    shortDescription: bi(
      "Aplikasi untuk memantau aset digital dan tindak lanjut temuan keamanan siber.",
      "An app for monitoring digital assets and tracking how security findings are addressed."
    ),
    description: bi(
      "Aplikasi web untuk Continuous Automated Red Teaming dan Attack Surface Management yang membantu memantau kerentanan aset digital perusahaan, kebocoran kredensial, dan alur remediasi keamanan siber.",
      "A Continuous Automated Red Teaming and Attack Surface Management web application for monitoring corporate digital asset vulnerabilities, credential leaks, and cybersecurity remediation workflows."
    ),
    role: bi(
      "Saya memelihara antarmuka konfigurasi audit dan pengelolaan domain klien serta menyeragamkan tampilan.",
      "I maintained the audit configuration and client domain interfaces and standardized their visual design."
    ),
    bullets: [
      bi(
        "Memelihara dan menyempurnakan antarmuka modul Packages (CRUD paket audit pemindaian, kuota, periode, dan profil konfigurasi).",
        "Maintained and enhanced Packages module interfaces (security scan package management, quotas, periods, and configuration profiles)."
      ),
      bi(
        "Mengimplementasikan formulir dengan validasi skema menggunakan Vee-Validate dan Yup dengan manajemen state Pinia.",
        "Implemented schema-validated forms using Vee-Validate and Yup backed by Pinia state management."
      ),
      bi(
        "Merancang komponen dialog penambahan dan pengeditan domain klien serta formulir filter penelusuran aset digital.",
        "Designed client domain creation and editing dialogs and digital asset search filter forms."
      ),
      bi(
        "Menjaga konsistensi sistem desain melalui standardisasi palet warna Tailwind CSS dan tata letak responsif.",
        "Maintained a consistent design system by standardizing Tailwind CSS color palettes and responsive layouts."
      ),
    ],
    tech: [
      "Nuxt 3",
      "Vue.js",
      "TypeScript",
      "Tailwind CSS",
      "Headless UI",
      "Pinia",
      "Vee-Validate",
      "Yup",
    ],
  },
  {
    id: "bulk-orders",
    name: "E-Commerce Bulk Orders Website",
    period: bi("Mei 2026 – Jun 2026", "May 2026 – Jun 2026"),
    company: bi("Tumbuhin Digital", "Tumbuhin Digital"),
    shortDescription: bi(
      "Situs e-commerce untuk pemesanan besar, pembayaran bertahap, dan pengiriman.",
      "An e-commerce site for bulk orders, split payments, and shipment tracking."
    ),
    description: bi(
      "Situs e-commerce untuk pembelian dalam jumlah besar (bulk orders) dengan fitur pembayaran bertahap (split payment), pemenuhan pesanan per item, sinkronisasi filter dengan parameter URL, dan dasbor analitik penjualan berbasis Recharts.",
      "A bulk-order e-commerce website featuring split payments, item-level order fulfillment, URL-synchronized filters, and sales analytics dashboards powered by Recharts."
    ),
    role: bi(
      "Saya mengembangkan pengelolaan keranjang belanja, alur pemesanan dan pembayaran, serta panel pemenuhan pesanan per item.",
      "I developed shopping cart state management, checkout and payment workflows, and the item-level fulfillment panel."
    ),
    bullets: [
      bi(
        "Merancang pengelolaan state keranjang belanja dengan optimistic updates menggunakan Next.js 16 (App Router), Zustand, dan TanStack Query v5, termasuk rollback otomatis saat terjadi gangguan jaringan.",
        "Designed shopping cart state management with optimistic updates using Next.js 16 (App Router), Zustand, and TanStack Query v5, including automatic rollback on network failures."
      ),
      bi(
        "Mengembangkan alur pembayaran bertahap (split payment) dan dialog konfirmasi pelunasan tahap kedua, dengan pemisahan yang jelas antara barang yang sudah dan belum dilunasi.",
        "Developed split-payment workflows and second-installment confirmation dialogs, clearly separating paid and unpaid items."
      ),
      bi(
        "Mengembangkan panel pemenuhan pesanan per item yang membatasi jumlah sesuai rentang yang valid dan mencegah duplikasi entri resi pengiriman.",
        "Built an item-level fulfillment panel, validated quantity ranges, and prevented duplicate shipment-tracking entries."
      ),
      bi(
        "Mengembangkan katalog produk responsif dengan filter yang tersinkron dengan parameter URL, serta dialog detail laporan penjualan menggunakan Embla Carousel.",
        "Built a responsive product catalog with URL-synchronized filters and an Embla Carousel-based sales report detail dialog."
      ),
      bi(
        "Melakukan refactoring untuk meningkatkan keterbacaan dan pemeliharaan kode, serta menerapkan sanitasi input sisi klien menggunakan isomorphic-dompurify guna mengurangi risiko Cross-Site Scripting (XSS).",
        "Refactored code to improve readability and maintainability, and implemented client-side input sanitization with isomorphic-dompurify to reduce Cross-Site Scripting (XSS) risks."
      ),
    ],
    tech: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "TanStack Query v5",
      "Zustand",
      "shadcn/ui (@base-ui/react)",
      "Embla Carousel",
      "Recharts",
      "TanStack Table",
      "isomorphic-dompurify",
      "Zod",
      "React Hook Form",
    ],
  },
  {
    id: "netmonk",
    name: "Netmonk Analytics",
    period: bi("Jan 2023 – Des 2023", "Jan 2023 – Dec 2023"),
    company: bi(
      "PT Telkom Indonesia – Netmonk",
      "PT Telkom Indonesia – Netmonk"
    ),
    shortDescription: bi(
      "Purwarupa dasbor analitik untuk memantau pesanan layanan telekomunikasi.",
      "An analytics dashboard prototype for tracking telecommunications service orders."
    ),
    description: bi(
      "Purwarupa aplikasi analitik operasional untuk ekosistem Netmonk (PT Telkom Indonesia), dengan pemantauan pesanan layanan regional (NCX dan Scone), dasbor Metabase tertanam yang diamankan dengan JWT, serta autentikasi dual-token.",
      "An operational analytics prototype for PT Telkom Indonesia's Netmonk ecosystem, featuring regional service order tracking (NCX and Scone), JWT-secured embedded Metabase dashboards, and dual-token authentication."
    ),
    role: bi(
      "Saya mengembangkan purwarupa antarmuka pemantauan pesanan dan merancang pengamanan akses ke dasbor Metabase tertanam.",
      "I built the order monitoring prototype and designed secure access for its embedded Metabase dashboards."
    ),
    bullets: [
      bi(
        "Mengembangkan antarmuka pemantauan pesanan regional (NCX dan Scone) menggunakan React, Tailwind CSS, dan Netmonk Design System untuk 7 divisi regional (TREG) dan lebih dari 40 Witel di Indonesia.",
        "Built regional service order tracking interfaces (NCX and Scone) with React, Tailwind CSS, and the Netmonk Design System for 7 regional divisions (TREG) and more than 40 Witel across Indonesia."
      ),
      bi(
        "Merancang arsitektur keamanan akses dasbor Metabase tertanam menggunakan token JWT bertanda tangan kriptografis dengan masa aktif 10 menit guna mengamankan visualisasi analitik operasional (dipertahankan sebagai skripsi sarjana di UGM).",
        "Designed access security architectures for embedded Metabase dashboards leveraging cryptographic JWT signing with a 10-minute validity period to protect operational analytics (defended as undergraduate thesis at UGM)."
      ),
      bi(
        "Mengimplementasikan sistem autentikasi dual-token dan mekanisme silent refresh menggunakan RTK Query untuk menangani penyegaran access token di latar belakang secara transparan tanpa mengganggu alur kerja pengguna.",
        "Implemented dual-token authentication and silent refresh mechanisms utilizing RTK Query to execute background access token renewals without interrupting user workflows."
      ),
      bi(
        "Mengintegrasikan frontend dengan REST API Express.js dan basis data MongoDB (Mongoose), termasuk penerapan kontrol akses berbasis peran (RBAC) bertingkat.",
        "Integrated the frontend with Express.js REST APIs and MongoDB (Mongoose), including multi-level role-based access control (RBAC)."
      ),
      bi(
        "Memelihara keandalan repositori pada pembaruan pascamagang (2026) melalui modernisasi build toolchain ke Vite 6 dan remediasi kerentanan dependensi.",
        "Maintained repository reliability during post-internship maintenance (2026) by modernizing build toolchains to Vite 6 and remediating dependency vulnerabilities."
      ),
    ],
    tech: [
      "React",
      "Redux Toolkit",
      "RTK Query",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Metabase BI",
      "JSON Web Token (JWT)",
      "Docker",
    ],
  },
]
