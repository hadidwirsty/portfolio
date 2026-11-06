import type { Lang } from "@/lib/language-context"

export type Bi = Record<Lang, string>

function bi(id: string, en: string): Bi {
  return { id, en }
}

export const profile = {
  name: "Muhammad Hadid Wiransetyo",
  initials: "MHW",
  photo: "/images/profile.jpg",
  cvFile: bi(
    "/cv/Muhammad-Hadid-Wiransetyo-CV-2026-ID.pdf",
    "/cv/Muhammad-Hadid-Wiransetyo-CV-2026.pdf"
  ),
  location: bi("Semarang, Indonesia", "Semarang, Indonesia"),
  role: bi("Frontend Engineer", "Frontend Engineer"),
  tagline: bi(
    "Membangun antarmuka web yang rapi, cepat, dan tahan lama.",
    "Building web interfaces that are clean, fast, and built to last."
  ),
  summary: bi(
    "Frontend Engineer (S.Kom. Ilmu Komputer UGM, IPK 3,74/4,00) dengan pengalaman 2 tahun mengembangkan antarmuka aplikasi web enterprise dan web tools menggunakan TypeScript, React, dan Next.js (App Router). Terbiasa merancang komponen antarmuka modular, mengintegrasikan REST API, mengelola state asinkron (TanStack Query, Zustand), serta memelihara stabilitas aplikasi lintas kerangka kerja (Next.js, Angular, Vue/Nuxt). Berorientasi pada kerapian kode, kejelasan komunikasi tim, dan siap berkontribusi langsung pada pengembangan produk web modern.",
    "Frontend Engineer (B.S. in Computer Science from UGM, GPA 3.74/4.00) with 2 years of professional experience developing responsive enterprise web applications and tools using TypeScript, React, and Next.js (App Router). Experienced in designing modular UI components, integrating RESTful APIs, managing asynchronous state (TanStack Query, Zustand), and maintaining cross-framework web applications (Next.js, Angular, Vue/Nuxt). Dedicated to writing clean code, collaborating effectively in cross-functional teams, and ready to deliver immediate value."
  ),
  email: "m.hadid.2001@gmail.com",
  linkedin: {
    label: "linkedin.com/in/hadidwirsty",
    href: "https://linkedin.com/in/hadidwirsty",
  },
  github: {
    label: "github.com/hadidwirsty",
    href: "https://github.com/hadidwirsty",
  },
  website: {
    label: "hadidwirsty.vercel.app",
    href: "https://hadidwirsty.vercel.app",
  },
}

export const nav = {
  about: bi("Tentang", "About"),
  experience: bi("Pengalaman", "Experience"),
  projects: bi("Proyek", "Projects"),
  skills: bi("Keahlian", "Skills"),
  education: bi("Pendidikan", "Education"),
  certifications: bi("Sertifikasi", "Certifications"),
  achievements: bi("Prestasi & Organisasi", "Achievements & Organization"),
  contact: bi("Kontak", "Contact"),
}

export const ui = {
  downloadCv: bi("Unduh CV", "Download CV"),
  contactMe: bi("Hubungi Saya", "Contact Me"),
  contactPrompt: bi(
    "Tertarik berkolaborasi atau punya peluang yang relevan? Mari mengobrol.",
    "Interested in collaborating or have a relevant opportunity? Let's talk."
  ),
  present: bi("Sekarang", "Present"),
  keyProjects: bi("Proyek terkait", "Related projects"),
  showAllCerts: bi("Tampilkan semua sertifikasi", "Show all certifications"),
  showLessCerts: bi("Tampilkan lebih sedikit", "Show less"),
  viewProject: bi("Lihat detail", "View details"),
  role: bi("Peran", "Role"),
  techStack: bi("Teknologi", "Tech stack"),
  organization: bi("Organisasi", "Organization"),
  volunteering: bi("Kegiatan Sosial", "Volunteering"),
  gpa: bi("IPK", "GPA"),
  score: bi("Skor", "Score"),
  thesis: bi("Skripsi", "Thesis"),
  footerNote: bi(
    "Dibangun dengan Next.js, Tailwind CSS, dan shadcn/ui.",
    "Built with Next.js, Tailwind CSS, and shadcn/ui."
  ),
  availableFor: bi(
    "Terbuka untuk peluang baru sebagai Frontend Engineer.",
    "Open to new opportunities as a Frontend Engineer."
  ),
}

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
    role: bi(
      "Junior Programmer",
      "Junior Programmer"
    ),
    period: bi("Nov 2024 – Okt 2026", "Nov 2024 – Oct 2026"),
    location: bi(
      "Yogyakarta, Indonesia (On-site)",
      "Yogyakarta, Indonesia (On-site)"
    ),
    employmentType: bi(
      "Kontrak",
      "Contract"
    ),
    summary: bi(
      "Mengembangkan dan memelihara antarmuka serta keamanan sisi frontend lintas 10 aplikasi web enterprise (B2B dan internal Telkom Group) menggunakan Next.js, React, Angular, Vue/Nuxt, dan Blazor. Menjalankan siklus kerja harian Agile/Scrum bersama Scrum Master (SM) dan Business Analyst (BA) untuk membedah kebutuhan pengguna, menerjemahkan rancangan teknis System Analyst dan UI/UX Designer menjadi kode modular, mengintegrasikan kontrak API bersama Backend Engineer, serta mengawal pengujian fungsional dan remediasi bug bersama Quality Assurance (QA) hingga siap rilis produksi.",
      "Developed and maintained frontend interfaces and security across 10 enterprise web applications (B2B and internal Telkom Group) using Next.js, React, Angular, Vue/Nuxt, and Blazor. Executed daily Agile/Scrum cycles alongside Scrum Masters (SM) and Business Analysts (BA) to refine user requirements, translated System Analyst specifications and UI/UX Designer mockups into modular code, integrated API contracts with Backend Engineers, and collaborated with Quality Assurance (QA) on functional testing and bug remediation for production releases."
    ),
    points: [
      bi(
        "IMAPS BPJS Kesehatan: Mengembangkan antarmuka aplikasi web manajemen siklus hidup aset tetap BPJS Kesehatan menggunakan Angular 18, TypeScript, dan Ant Design (NG-ZORRO) untuk digitalisasi inventarisasi dan akuntabilitas aset kantor cabang nasional; mengimplementasikan modul daftar aset, alur persetujuan bertingkat (approval asset multi-tab), modul usulan penghapusan, dan manajemen pengguna; serta mengintegrasikan REST API bertipe ketat dan konfigurasi keamanan header anti-clickjacking.",
        "IMAPS BPJS Kesehatan: Developed the frontend for the BPJS Kesehatan enterprise fixed asset lifecycle management application using Angular 18, TypeScript, and Ant Design (NG-ZORRO) to digitize inventory and audit accountability across nationwide branch offices; implemented the asset directory, multi-workflow approval modules (multi-tab asset approvals), deletion proposal flows, and user management; integrated strict-typed REST APIs and configured anti-clickjacking security headers."
      ),
      bi(
        "CART (Continuous Automated Red Teaming): Memelihara dan menyempurnakan antarmuka aplikasi web manajemen kerentanan dan intelijen ancaman siber (CART) untuk pemantauan postur keamanan aset digital korporat menggunakan Nuxt 3, Vue.js, TypeScript, dan Tailwind CSS; mengimplementasikan modul konfigurasi paket pengujian keamanan (packages), manajemen domain klien, serta modal template pemindaian; mengintegrasikan formulir tervalidasi skema (Vee-Validate + Yup) dengan REST API dan manajemen state Pinia; serta memelihara konsistensi sistem desain antarmuka.",
        "CART (Continuous Automated Red Teaming): Maintained and enhanced frontend interfaces for the CART vulnerability management and cyber threat intelligence web application to monitor corporate attack surfaces using Nuxt 3, Vue.js, TypeScript, and Tailwind CSS; implemented security testing package configuration modules (packages), client domain management, and scan template modals; integrated schema-validated forms (Vee-Validate + Yup) with REST APIs and Pinia state management; maintained design system consistency across application layouts."
      ),
      bi(
        "Info Tender (LPSE & SiRUP): Mengembangkan antarmuka aplikasi web intelijen pasar pengadaan barang dan jasa pemerintah untuk tim Sales Support menggunakan React 18, TypeScript, Vite, Tailwind CSS, dan Radix UI; mengimplementasikan dasbor analitik lelang (Recharts), katalog tender LPSE dan rencana pengadaan SiRUP (TanStack Table), fitur komparasi data tender berdampingan, serta modul konfigurasi parameter scraping (kata kunci KBLI); merancang sistem pelacakan durasi interaksi pengguna (dwell tracker) terintegrasi perutean aplikasi; mengintegrasikan REST API dengan TanStack Query dan Zustand; serta memelihara kontrol akses berbasis peran (RBAC).",
        "Info Tender (LPSE & SiRUP): Developed the frontend for the government procurement market intelligence web application supporting the Sales Support team using React 18, TypeScript, Vite, Tailwind CSS, and Radix UI; implemented procurement analytics dashboards (Recharts), LPSE tenders and SiRUP planning catalogs (TanStack Table), side-by-side data comparison tools, and scraping parameter configuration modules (KBLI keywords); designed an automated route-integrated user session dwell-tracker; integrated REST APIs with TanStack Query and Zustand; maintained role-based access control (RBAC)."
      ),
      bi(
        "MONARA (Monitoring Natal-Tahun Baru dan Ramadan): Mengembangkan antarmuka aplikasi web pemantauan operasional tiket layanan TI untuk tim Service Desk menggunakan Next.js (App Router), React 19, TypeScript, Tailwind CSS, dan Radix UI; mengimplementasikan dasbor pemantauan status tiket dengan pembaruan data otomatis berkala (polling interval 30 detik), grafik analitik Recharts, modul master data shift kerja dan penyedia layanan, serta formulir pengunggahan bukti penanganan; merancang alur validasi pergantian jam kerja petugas (shift schedule); mengintegrasikan REST API dengan TanStack Query dan Zustand; serta memelihara kontrol akses berbasis peran (RBAC).",
        "MONARA (Christmas, New Year & Ramadan Monitoring): Developed the frontend for the IT service ticket operations monitoring web application supporting the Service Desk team using Next.js (App Router), React 19, TypeScript, Tailwind CSS, and Radix UI; implemented ticket status monitoring dashboards with automated polling updates (30-second intervals), Recharts analytics, work shift and service provider master data modules, and handling evidence upload forms; designed duty shift schedule validation workflows; integrated REST APIs with TanStack Query and Zustand; maintained role-based access control (RBAC)."
      ),
      bi(
        "Alisa 2.0 (Smart Contracting): Mengembangkan antarmuka modul Smart Contracting dan Host Shell micro-frontend untuk sistem manajemen kontrak enterprise Infomedia Nusantara menggunakan Vite, React 19, Ant Design 5, Tailwind CSS, dan Module Federation; mengimplementasikan alur peninjauan pesanan legal, modul konfigurasi tipe dan tahapan kontrak, serta pratinjau dokumen PDF sisi klien (@react-pdf/renderer); merancang antarmuka penyusunan formulir berbasis seret-dan-lepas (drag-and-drop); mengintegrasikan REST API dengan TanStack Query dan Zustand; serta memelihara konsistensi perutean terfederasi (TanStack Router).",
        "Alisa 2.0 (Smart Contracting): Developed the Smart Contracting module and micro-frontend Host Shell for Infomedia Nusantara's enterprise contract management system using Vite, React 19, Ant Design 5, Tailwind CSS, and Module Federation; implemented legal order review workflows, contract type and stage configuration modules, and client-side PDF document previews (@react-pdf/renderer); designed drag-and-drop form builder interfaces; integrated REST APIs with TanStack Query and Zustand; maintained federated routing consistency (TanStack Router)."
      ),
      bi(
        "IS-WARE (Proof of Concept – PT KBI): Mengembangkan purwarupa aplikasi web sistem manajemen resi gudang terintegrasi dalam sprint 2 minggu untuk proposal teknis klien PT Kliring Berjangka Indonesia (Grup Danareksa) menggunakan Next.js (App Router), React 19, TypeScript, dan Tailwind CSS; mengimplementasikan modul penerbitan resi gudang (Warehouse Receipt), integrasi dokumen asuransi dan Lembaga Pemeriksa Kesesuaian (LPK), alur pelacakan riwayat (audit trail), serta data master komoditas dan gudang; mengintegrasikan REST API dengan TanStack Query dan Zustand; serta memelihara kontrol akses berbasis peran (RBAC 5 peran) hingga proposal meraih peringkat #1 pada evaluasi teknis.",
        "IS-WARE (Proof of Concept – PT KBI): Developed an integrated warehouse receipt management system web prototype in a 2-week sprint for the technical proposal to PT Kliring Berjangka Indonesia (Danareksa Group) using Next.js (App Router), React 19, TypeScript, and Tailwind CSS; implemented warehouse receipt issuance workflows, insurance and inspection agency (LPK) document integrations, audit trail tracking, and commodity/warehouse master data; integrated REST APIs with TanStack Query and Zustand; maintained role-based access control (5 user roles), helping the technical proposal achieve rank #1 in client evaluation."
      ),
      bi(
        "Caterine (Change Management): Memelihara antarmuka modul Change Management pada platform enterprise IT Service Management (ITSM) Telkomsigma menggunakan Vue 3 (Composition API), TypeScript, Vite, Tailwind CSS, dan Pinia dalam skema penanganan tiket perbaikan bug dan Change Request (CR); mengimplementasikan alur persetujuan Change Advisory Board (CAB: penambahan, delegasi ulang, dan penghapusan peninjau), matriks 35 dokumen justifikasi wajib perubahan, serta modul manajemen tugas teknis (task assignment); merancang validasi hak akses berbasis peran koordinator perubahan; mengintegrasikan REST API dengan penanganan status draf lokal; serta memelihara pengujian unit dan alur kerja verifikasi perubahan.",
        "Caterine (Change Management): Maintained Change Management module interfaces for Telkomsigma's enterprise IT Service Management (ITSM) platform using Vue 3 (Composition API), TypeScript, Vite, Tailwind CSS, and Pinia, resolving bug-fix tickets and Change Request (CR) tasks; implemented Change Advisory Board (CAB) approval workflows (assign, re-assign, and remove approvers), a 35-item mandatory justification document matrix, and technical task assignment modules; designed role-based access validation for change coordinators; integrated REST APIs with local pending state management; maintained unit testing and change verification workflows."
      ),
      bi(
        "Whistleblowing System (WBS Internal): Mengembangkan antarmuka aplikasi web Whistleblowing System internal bagi Tim Pengelola WBS Telkomsigma untuk penanganan dugaan pelanggaran etik dan tata kelola perusahaan (ISO 37002) menggunakan Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, dan TanStack Query; mengimplementasikan dasbor analitik eksekutif dengan grafik Recharts, tabel data penelaahan kasus multi-tahap (validasi-verifikasi dan pemeriksaan), serta formulir registrasi pengaduan multi-kanal (surat, telepon, dan email); merancang lapisan keamanan pengunggahan berkas bukti berbasis inspeksi tanda tangan biner (magic bytes) dan integrasi pemindaian virus ClamAV; mengintegrasikan dukungan multi-bahasa (i18next) dan manajemen formulir kuesioner; serta memelihara kontrol akses berbasis peran (RBAC).",
        "Whistleblowing System (Internal WBS): Developed internal Whistleblowing System web application interfaces for Telkomsigma's WBS Management Team to handle corporate ethics and governance violation cases (ISO 37002) using Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, and TanStack Query; implemented executive analytics dashboards with Recharts, multi-stage case assessment data tables (validation-verification and inspection), and multi-channel report registration forms (letter, phone, and email); designed evidence file upload security layers based on binary file signature inspection (magic bytes) and ClamAV antivirus scanning integration; integrated multilingual support (i18next) and configurable questionnaire management modules; maintained role-based access control (RBAC)."
      ),
      bi(
        "PIS MARS (Pertamina International Shipping): Mengembangkan dan memelihara antarmuka portal web enterprise serta sistem manajemen konten (CMS) PT Pertamina International Shipping menggunakan C#, .NET 8.0, ASP.NET Core, dan Blazor Server (Interactive Server Mode) dalam arsitektur microservices; menstandarisasi pewarisan kelas dasar dan siklus hidup komponen pada pustaka antarmuka Oktaf.UI lintas ratusan berkas komponen Razor; mengimplementasikan penanganan deserialisasi nilai null dan peningkatan stabilitas pada modul Form Builder serta editor CMS; merancang antarmuka navigasi bertingkat (StickyMenu) dengan indikator tahapan; mengintegrasikan Mock Authentication Middleware pada 6 microservice backend untuk simulasi otorisasi peran (RBAC) di lingkungan lokal; serta memelihara konfigurasi kontainerisasi Docker.",
        "PIS MARS (Pertamina International Shipping): Developed and maintained enterprise web portal interfaces and content management systems (CMS) for PT Pertamina International Shipping using C#, .NET 8.0, ASP.NET Core, and Blazor Server (Interactive Server Mode) within a microservices architecture; standardized base component inheritance and lifecycle execution across the Oktaf.UI Razor component library across hundreds of component files; implemented null deserialization safeguards and stability enhancements on the Form Builder and CMS editor; designed multi-level navigation interfaces (StickyMenu) with step progress indicators; integrated Mock Authentication Middleware across 6 backend microservices to simulate role-based authorization (RBAC) in local environments; maintained Docker containerization configurations."
      ),
      bi(
        "Managed Services and Operations (MSO) CIS: Mengembangkan pembaruan antarmuka, menyelesaikan tiket gangguan (bug fix), dan mengimplementasikan perbaikan keamanan sisi frontend pada 2 aplikasi enterprise Corporate Information System (CIS: LSM dan Patricia) menggunakan Vue.js, Nuxt.js, TypeScript, dan Tailwind CSS; mengimplementasikan composable sanitasi data (useSanitize, useSvgSanitizer) dan Content Security Policy (CSP) untuk penguatan terhadap Cross-Site Scripting (XSS); merancang sanitasi URL pengalihan login guna mencegah celah Open Redirect; memasang pelindung kompatibilitas Server-Side Rendering (SSR guards) untuk stabilitas di lingkungan Node 22; serta menguji dan memperbaiki logika penguraian ID Purchase Order dan integrasi REST API publik.",
        "Managed Services and Operations (MSO) CIS: Developed frontend updates, resolved bug-fix tickets, and implemented frontend security remediations across 2 enterprise Corporate Information System (CIS) applications (LSM and Patricia) using Vue.js, Nuxt.js, TypeScript, and Tailwind CSS; implemented data sanitization composables (useSanitize, useSvgSanitizer) and Content Security Policy (CSP) headers to harden against Cross-Site Scripting (XSS); designed login redirect URL sanitization to prevent Open Redirect vulnerabilities; implemented Server-Side Rendering (SSR) compatibility guards ensuring stability in Node 22 environments; tested and fixed Purchase Order ID parsing logic and public REST API integrations."
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
    role: bi(
      "Frontend Engineer",
      "Frontend Engineer"
    ),
    period: bi("Mei 2026 – Jun 2026", "May 2026 – Jun 2026"),
    location: bi(
      "Yogyakarta, Indonesia (Remote)",
      "Yogyakarta, Indonesia (Remote)"
    ),
    employmentType: bi("Freelance", "Freelance"),
    points: [
      bi(
        "Merancang dan mengimplementasikan manajemen state keranjang belanja pada situs web E-Commerce Bulk Orders menggunakan Next.js 16 (App Router), TypeScript, Zustand, dan TanStack Query v5; mengintegrasikan pembaruan antarmuka optimistik (optimistic UI updates) dengan pemulihan otomatis saat gangguan jaringan, serta menguji alur transaksi pemesanan partai besar.",
        "Designed and implemented cart state management for an E-Commerce Bulk Orders Website using Next.js 16 (App Router), TypeScript, Zustand, and TanStack Query v5; integrated optimistic UI updates with automated state rollback on network disruptions, and tested bulk-ordering transaction workflows."
      ),
      bi(
        "Mengembangkan alur transaksi pembayaran bertahap (split payment), mengimplementasikan panel pemenuhan pesanan berbutir halus (item-level fulfillment) dengan deduplikasi kartu resi pengiriman, serta memelihara sanitasi input sisi klien menggunakan isomorphic-dompurify guna mencegah celah keamanan XSS.",
        "Developed split payment transaction workflows, implemented a granular item-level order fulfillment panel featuring airway bill card de-duplication, and maintained client-side input sanitization using isomorphic-dompurify to prevent XSS security vulnerabilities."
      ),
    ],
    projectIds: ["bulk-orders"],
  },
  {
    id: "telkom",
    company: "Telkom Indonesia",
    role: bi(
      "Developer",
      "Developer"
    ),
    period: bi("Jan 2023 – Des 2023", "Jan 2023 – Dec 2023"),
    location: bi("Jakarta, Indonesia (Remote)", "Jakarta, Indonesia (Remote)"),
    employmentType: bi("Magang", "Internship"),
    points: [
      bi(
        "Mengembangkan purwarupa aplikasi web analitik dan operasional telekomunikasi Netmonk Analytics menggunakan React, Tailwind CSS, Redux Toolkit, dan RTK Query untuk memantau progres pemenuhan pesanan lintas 7 divisi regional (TREG) dan 40+ kantor wilayah telekomunikasi (Witel); merancang arsitektur keamanan akses dasbor Metabase tertanam berbasis tanda tangan kriptografis token JWT (dipertahankan sebagai skripsi sarjana di UGM dengan IPK 3,74/4,00).",
        "Developed the Netmonk Analytics telecommunication operational analytics web prototype using React, Tailwind CSS, Redux Toolkit, and RTK Query to track order fulfillment progress across 7 regional divisions (TREG) and 40+ branch offices (Witel); designed access security architectures for embedded Metabase dashboards leveraging cryptographic JWT signing (defended as undergraduate thesis at UGM, GPA 3.74/4.00)."
      ),
      bi(
        "Mengintegrasikan sistem autentikasi dual-token dengan penanganan silent refresh pada RTK Query; mengimplementasikan kontrol akses berbasis peran (RBAC); memelihara antarmuka Netmonk HI; serta memodernisasi toolchain frontend ke Vite 6 dengan remediasi 101 kerentanan dependensi.",
        "Integrated dual-token authentication with silent refresh handling via RTK Query; implemented role-based access control (RBAC); maintained the Netmonk HI interface; and modernized frontend toolchains to Vite 6 alongside remediating 101 nested dependency vulnerabilities."
      ),
    ],
    projectIds: ["netmonk"],
  },
]

export type ProjectEntry = {
  id: string
  name: string
  period: Bi
  company: Bi
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
    description: bi(
      "Aplikasi web full-stack manajemen operasional dan keuangan armada truk semen curah untuk bisnis keluarga, mendigitalisasi pencatatan manual menjadi sistem terpusat dengan pencatatan ritase, acuan 296 rute tarif pabrik, akuntansi pajak PPh 23 (1,2%), bagi hasil investor, dan dasbor analitik Recharts.",
      "Full-stack operations and financial management web application for a bulk cement truck fleet family business, digitizing manual spreadsheets into a centralized system featuring trip dispatch logging, 296 cement factory rate catalogs, PPh 23 tax accounting (1.2%), investor profit-sharing, and Recharts analytics dashboards."
    ),
    role: bi(
      "Merancang dan mengembangkan aplikasi web full-stack manajemen operasional dan keuangan armada truk semen curah menggunakan Next.js 16 (App Router berbasis Server Components dan Server Actions), React 19, TypeScript, Tailwind CSS v4, dan Drizzle ORM (PostgreSQL); mengimplementasikan kalkulasi otomatis tarif angkutan lintas 296 rute pabrik semen nasional, pemotongan pajak PPh 23 (1,2%), rekapitulasi beban armada, serta modul penutupan buku bagi hasil investor; merancang modul Pure Domain Engine yang divalidasi oleh 297 pengujian otomatis Vitest (100% lulus); mengintegrasikan autentikasi Better-Auth dengan kontrol akses berbasis peran (RBAC); serta memelihara dasbor analitik visual Recharts.",
      "Designed and developed a full-stack operations and financial management web application for a bulk cement truck fleet using Next.js 16 (App Router leveraging Server Components and Server Actions), React 19, TypeScript, Tailwind CSS v4, and Drizzle ORM (PostgreSQL); implemented automated freight tariff calculations across 296 national cement factory routes, PPh 23 tax deductions (1.2%), fleet expense tracking, and monthly investor profit-sharing workflows; designed a Pure Domain Engine validated by 297 automated Vitest tests (100% pass); integrated Better-Auth authentication with role-based access control (RBAC); maintained interactive Recharts analytics dashboards."
    ),
    bullets: [
      bi(
        "Merancang arsitektur aplikasi web full-stack armada menggunakan Next.js 16 dan React 19 berbasis 100% React Server Components (RSC) serta Next.js Server Actions tervalidasi skema Zod.",
        "Designed full-stack fleet web application architectures in Next.js 16 and React 19 utilizing 100% React Server Components (RSC) and Zod-validated Next.js Server Actions."
      ),
      bi(
        "Mengembangkan modul Pure Domain Engine finansial untuk mengotomatiskan kalkulasi tarif angkutan lintas 296 rute pabrik semen, pemotongan PPh 23 (1,2%), dan dividen investor, divalidasi oleh 297 pengujian otomatis Vitest (100% lulus).",
        "Developed a financial Pure Domain Engine automating freight tariff calculations across 296 cement factory routes, PPh 23 tax deductions (1.2%), and investor dividends, validated by 297 automated Vitest tests (100% pass)."
      ),
      bi(
        "Merancang skema basis data relasional PostgreSQL dan kontrol akses peran (RBAC) menggunakan Drizzle ORM dan Better-Auth untuk memisahkan hak akses administratif pengelola dan portal investor.",
        "Designed PostgreSQL relational database schemas and role-based access control (RBAC) using Drizzle ORM and Better-Auth to isolate administrative operations from investor portals."
      ),
      bi(
        "Mengembangkan dasbor analitik keuangan dan pemantauan armada menggunakan grafik Recharts untuk memvisualisasikan tren pendapatan vs pengeluaran bulanan dan pengingat masa berlaku uji KIR/STNK.",
        "Developed financial analytics dashboards and fleet maintenance trackers using Recharts to visualize monthly revenue vs expense trends and inspection due-date alerts."
      ),
      bi(
        "Mengintegrasikan fitur ekspor laporan transaksi terstandar ke dalam format Excel (.xlsx) dan CSV untuk kebutuhan audit pembukuan dan rekonsiliasi perbankan.",
        "Integrated standardized multi-format transaction report exports (Excel .xlsx and CSV) to facilitate accounting audits and bank reconciliations."
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
    description: bi(
      "Purwarupa aplikasi web sistem manajemen resi gudang terintegrasi yang dibangun dalam sprint 2 minggu untuk proposal teknis klien PT Kliring Berjangka Indonesia (Grup Danareksa), mencakup penerbitan resi, integrasi dokumen asuransi dan LPK, riwayat audit trail, serta kontrol akses berbasis 5 peran.",
      "Integrated warehouse receipt management system web prototype delivered in a 2-week sprint for PT Kliring Berjangka Indonesia (Danareksa Group) technical proposal, featuring receipt issuance, insurance and inspection document integrations, audit trails, and 5-role access control."
    ),
    role: bi(
      "Mengembangkan arsitektur purwarupa web dan modul penerbitan resi gudang terintegrasi dalam sprint 2 minggu menggunakan Next.js (App Router), React 19, TypeScript, dan Tailwind CSS; mengimplementasikan alur pelacakan audit trail, integrasi dokumen asuransi dan LPK, serta data master pergudangan hingga proposal menduduki peringkat #1 pada evaluasi teknis klien.",
      "Developed web prototype architecture and integrated warehouse receipt issuance modules in a 2-week sprint using Next.js (App Router), React 19, TypeScript, and Tailwind CSS; implemented audit trail tracking, insurance/inspection document integrations, and warehouse master data, helping the proposal achieve rank #1 in client technical evaluation."
    ),
    bullets: [
      bi(
        "Mengembangkan antarmuka penerbitan resi gudang (Warehouse Receipt) dalam sprint 2 minggu, mencakup formulir registrasi multi-tahap, kalkulasi bobot komoditas, dan alur persetujuan dokumen.",
        "Developed warehouse receipt issuance interfaces in a 2-week sprint, including multi-step registration forms, commodity weight calculations, and document approval workflows."
      ),
      bi(
        "Mengimplementasikan alur pelacakan riwayat aktivitas (Audit Trail) untuk mencatat rekam jejak status resi secara terperinci dari pembuatan draf awal hingga verifikasi akhir.",
        "Implemented detailed audit trail tracking modules to record lifecycle status changes from draft creation to final approval."
      ),
      bi(
        "Mengembangkan modul data master operasional (gudang, jenis komoditas, perusahaan asuransi, dan lembaga pemeriksa kesesuaian / LPK) dengan fitur pencarian dan pengunduhan dokumen lampiran.",
        "Developed operational master data modules (warehouses, commodity types, insurance companies, and inspection agencies / LPK) with search filters and multi-file document downloads."
      ),
      bi(
        "Merancang sistem tata letak aplikasi dan navigasi responsif berbasis Next.js App Router, Tailwind CSS v4, dan Radix UI (shadcn/ui).",
        "Designed responsive application layouts and navigation components using Next.js App Router, Tailwind CSS v4, and Radix UI (shadcn/ui)."
      ),
      bi(
        "Mengintegrasikan REST API dengan TanStack Query dan Zustand serta memelihara kontrol akses berbasis peran (RBAC 5 peran) hingga proposal teknis meraih peringkat #1 evaluasi klien.",
        "Integrated REST APIs with TanStack Query and Zustand while maintaining role-based access control (5 user roles), helping the technical proposal secure rank #1 in client evaluation."
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
    description: bi(
      "Aplikasi web Content Management System (CMS) berarsitektur modular microservices dengan arsitektur micro-frontend (Module Federation) pada sisi frontend untuk Infomedia Nusantara.",
      "Content Management System (CMS) on a modular microservices architecture with a micro-frontend architecture (Module Federation) on the frontend for Infomedia Nusantara."
    ),
    role: bi(
      "Mengembangkan modul Smart Contracting (manajemen kontrak, alur peninjauan pesanan legal, dan konfigurasi kontrak) serta merancang struktur Host Shell micro-frontend (Module Federation) menggunakan Vite, React 19, Ant Design 5, dan TanStack Router.",
      "Developed the Smart Contracting module (contract workflows, legal order reviews, and contract configuration) and designed the micro-frontend Host Shell (Module Federation) structure using Vite, React 19, Ant Design 5, and TanStack Router."
    ),
    bullets: [
      bi(
        "Mengembangkan antarmuka modul Smart Contracting untuk alur peninjauan pesanan legal (legal orders), pemantauan status kontrak aktif, dan validasi dokumen.",
        "Developed Smart Contracting module interfaces for legal order reviews, active contract monitoring, and document validation workflows."
      ),
      bi(
        "Mengimplementasikan modul konfigurasi kontrak (Configurations) mencakup pengelolaan tipe kontrak, tahapan (stages), alur kerja (workflows), dan template klausul.",
        "Implemented contract configuration modules (Configurations) covering contract types, lifecycle stages, workflows, and clause templates."
      ),
      bi(
        "Merancang antarmuka penyusunan formulir seret-dan-lepas (drag-and-drop form builder) serta pratinjau dokumen PDF sisi klien berbasis @react-pdf/renderer.",
        "Designed drag-and-drop form builder interfaces and client-side PDF document previews using @react-pdf/renderer."
      ),
      bi(
        "Merancang kerangka Host Shell berbasis arsitektur micro-frontend (Module Federation) menggunakan Vite, React 19, Ant Design 5, dan TanStack Router untuk perutean terfederasi.",
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
    company: bi("PT Sigma Cipta Caraka", "PT Sigma Cipta Caraka"),
    description: bi(
      "Aplikasi web internal Whistleblowing System (WBS) bagi Tim Pengelola WBS Telkomsigma untuk penanganan dugaan pelanggaran etik dan kepatuhan tata kelola perusahaan (ISO 37002), mencakup dasbor analitik eksekutif, penelaahan laporan multi-tahap, registrasi kasus multi-kanal, dan keamanan unggah berkas bukti.",
      "Internal Whistleblowing System (WBS) web application for Telkomsigma's WBS Management Team to handle corporate ethics and governance violation cases (ISO 37002), featuring executive analytics dashboards, multi-stage case assessments, multi-channel report registration, and secure evidence file uploads."
    ),
    role: bi(
      "Mengembangkan antarmuka aplikasi web Whistleblowing System internal bagi Tim Pengelola WBS Telkomsigma untuk penanganan dugaan pelanggaran etik dan tata kelola perusahaan (ISO 37002) menggunakan Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, dan TanStack Query; mengimplementasikan dasbor analitik eksekutif dengan grafik Recharts, tabel data penelaahan kasus multi-tahap (validasi-verifikasi dan pemeriksaan), serta formulir registrasi pengaduan multi-kanal (surat, telepon, dan email); merancang lapisan keamanan pengunggahan berkas bukti berbasis inspeksi tanda tangan biner (magic bytes) dan integrasi pemindaian virus ClamAV; mengintegrasikan dukungan multi-bahasa (i18next) dan manajemen formulir kuesioner; serta memelihara kontrol akses berbasis peran (RBAC).",
      "Developed internal Whistleblowing System web application interfaces for Telkomsigma's WBS Management Team to handle corporate ethics and governance violation cases (ISO 37002) using Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, and TanStack Query; implemented executive analytics dashboards with Recharts, multi-stage case assessment data tables (validation-verification and inspection), and multi-channel report registration forms (letter, phone, and email); designed evidence file upload security layers based on binary file signature inspection (magic bytes) and ClamAV antivirus scanning integration; integrated multilingual support (i18next) and configurable questionnaire management modules; maintained role-based access control (RBAC)."
    ),
    bullets: [
      bi(
        "Mengembangkan dasbor analitik eksekutif pengaduan WBS menggunakan grafik Recharts untuk memvisualisasikan rasio kasus terbukti (concern ratio), sebaran status, klasifikasi identitas pelapor, dan proporsi kanal pelaporan.",
        "Developed executive WBS complaint analytics dashboards using Recharts to visualize substantiated case ratios (concern ratio), status distributions, reporter identity classifications, and reporting channel breakdowns."
      ),
      bi(
        "Mengimplementasikan manajemen data pengaduan dan alur penelaahan multi-tahap (validasi-verifikasi, pemeriksaan, dan pelaporan publik) dengan tabel TanStack Table, panel samping interaktif, dan sinkronisasi data antar tab terpusat.",
        "Implemented complaint data management and multi-stage case assessment workflows (validation-verification, inspection, and public reporting) with TanStack Table, interactive side panels, and centralized multi-tab data synchronization."
      ),
      bi(
        "Mengembangkan formulir registrasi pengaduan multi-saluran bagi tim pengelola untuk mencatat laporan yang masuk dari kanal luring (surat, telepon, tatap muka) lengkap dengan metadata kejadian dan lampiran bukti pendukung.",
        "Developed multi-channel complaint registration forms for the management team to record incoming offline reports (letter, phone, face-to-face) complete with case metadata and supporting evidence attachments."
      ),
      bi(
        "Merancang lapisan keamanan pengunggahan berkas bukti dengan inspeksi tanda tangan biner (magic bytes) pada 4.096 byte awal untuk mencegah manipulasi ekstensi dan berkas berbahaya, terintegrasi pemindai antivirus ClamAV di sisi server.",
        "Designed evidence file upload security layers utilizing binary file signature inspection (magic bytes) on the initial 4,096 bytes to prevent extension spoofing and malicious files, integrated with server-side ClamAV antivirus scanning."
      ),
      bi(
        "Mengintegrasikan dukungan multi-bahasa (i18next) dan modul konfigurasi kuesioner dengan pengelompokan pertanyaan, validasi field wajib, serta memelihara kontrol akses berbasis peran (RBAC).",
        "Integrated multilingual support (i18next) and configurable questionnaire modules with question grouping, mandatory field validation, and role-based access control (RBAC) maintenance."
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
    company: bi("PT Sigma Cipta Caraka", "PT Sigma Cipta Caraka"),
    description: bi(
      "Aplikasi web pemantauan operasional tiket layanan TI terpusat untuk tim Service Desk dan Operasional Layanan selama periode puncak Ramadan dan Natal-Tahun Baru, mencakup sekitar 40 unit penyedia layanan dengan pembaruan data berkala otomatis.",
      "Centralized IT service operations ticket monitoring web application supporting Service Desk and Operations teams during Ramadan and Christmas-New Year peak periods, covering about 40 service provider units with automated polling updates."
    ),
    role: bi(
      "Mengembangkan arsitektur antarmuka dan dasbor pemantauan status tiket menggunakan Next.js (App Router), React 19, TypeScript, dan Tailwind CSS; mengimplementasikan pembaruan data otomatis berkala (polling interval 30 detik), visualisasi grafik Recharts, formulir pengunggahan bukti penanganan tiket, serta modul master data shift kerja.",
      "Developed frontend architecture and ticket status monitoring dashboards using Next.js (App Router), React 19, TypeScript, and Tailwind CSS; implemented automated background polling updates (30-second intervals), Recharts visualizations, handling evidence upload forms, and work shift master data modules."
    ),
    bullets: [
      bi(
        "Mengembangkan dasbor pemantauan status tiket operasional dengan pembaruan data otomatis berkala (polling latar belakang per 30 detik) dan visualisasi grafik Recharts.",
        "Developed operational ticket status monitoring dashboards with automated background polling updates (30-second intervals) and Recharts data visualizations."
      ),
      bi(
        "Mengimplementasikan formulir pencatatan tiket kendala layanan lengkap dengan fitur pengunggahan berkas bukti penanganan (multipart/form-data).",
        "Implemented service issue logging forms featuring handling evidence file upload workflows (multipart/form-data)."
      ),
      bi(
        "Merancang dan membangun modul master data operasional (kategori tiket, penyedia layanan, dan sesi shift kerja) beserta modal detail riwayat log penanganan.",
        "Designed and built operational master data modules (ticket categories, service providers, and work shift sessions) along with issue chronology log modals."
      ),
      bi(
        "Merancang alur validasi jam kerja petugas (shift duty schedule) berbasis pengecekan waktu lokal untuk memastikan akurasi status penugasan.",
        "Designed duty shift schedule validation workflows based on local time verification to ensure accurate on-duty staffing assignment."
      ),
      bi(
        "Mengintegrasikan REST API dengan TanStack Query dan Zustand serta memelihara kontrol akses berbasis peran (RBAC).",
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
    company: bi("PT Sigma Cipta Caraka", "PT Sigma Cipta Caraka"),
    description: bi(
      "Aplikasi web intelijen pasar pengadaan barang dan jasa pemerintah dari portal LPSE dan SiRUP untuk membantu tim Sales Support dan Presales memantau peluang lelang TI pemerintah, membandingkan rencana belanja instansi dengan lelang aktif, serta mengelola otomatisasi scraping.",
      "Web application for government procurement market intelligence across LPSE and SiRUP portals, assisting Sales Support and Presales teams in discovering government IT tender opportunities, comparing procurement plans against active tenders, and managing automated scraping configurations."
    ),
    role: bi(
      "Mengembangkan dan merancang modul katalog rencana pengadaan SiRUP, dasbor visualisasi analitik tender, modul komparasi data lelang berdampingan, sistem pelacakan durasi interaksi pengguna (dwell tracker), serta modul konfigurasi parameter scraping kata kunci KBLI menggunakan React 18, TypeScript, Vite, Tailwind CSS, TanStack Query, dan Zustand.",
      "Developed and designed the SiRUP procurement planning catalog, tender analytics dashboards, side-by-side tender comparison modules, user session dwell tracking systems, and KBLI keyword scraping parameter configuration modules using React 18, TypeScript, Vite, Tailwind CSS, TanStack Query, and Zustand."
    ),
    bullets: [
      bi(
        "Mengembangkan antarmuka katalog lelang LPSE dan rencana pengadaan SiRUP dengan filter pencarian terstruktur dan tabel data interaktif TanStack Table.",
        "Developed LPSE tender and SiRUP procurement planning catalogs with structured search filters and interactive TanStack Table data views."
      ),
      bi(
        "Mengimplementasikan dasbor analitik visualisasi pagu anggaran dan kuantitas tender pemerintah berbasis grafik Recharts.",
        "Implemented government procurement budget and tender quantity visualization dashboards using Recharts."
      ),
      bi(
        "Mengimplementasikan fitur komparasi tender berdampingan (side-by-side) antara paket rencana SiRUP dan lelang LPSE untuk validasi kode RUP.",
        "Implemented side-by-side tender comparison tools between SiRUP procurement plans and LPSE tenders for RUP code verification."
      ),
      bi(
        "Merancang modul konfigurasi sistem (System Config) untuk parameter scraping kata kunci KBLI dan pelacak durasi interaksi pengguna (Dwell Tracker).",
        "Designed system configuration modules (System Config) for KBLI keyword scraping parameters and automated user session dwell trackers."
      ),
      bi(
        "Mengintegrasikan REST API dengan TanStack Query dan Zustand serta memelihara kontrol akses berbasis peran (RBAC).",
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
    description: bi(
      "Integrated Management Asset and Procurement System — aplikasi manajemen aset enterprise untuk BPJS Kesehatan.",
      "Integrated Management Asset and Procurement System — an enterprise asset management application for BPJS Kesehatan."
    ),
    role: bi(
      "Mengembangkan antarmuka modul persetujuan bertingkat (approval asset multi-tab), direktori aset tetap, modul usulan penghapusan, dan manajemen pengguna menggunakan Angular 18 dan Ant Design (NG-ZORRO); mengintegrasikan REST API bertipe ketat dan konfigurasi keamanan header anti-clickjacking.",
      "Developed multi-workflow approval modules (multi-tab asset approvals), the fixed asset directory, deletion proposal flows, and user management using Angular 18 and Ant Design (NG-ZORRO); integrated strict-typed REST APIs and configured anti-clickjacking security headers."
    ),
    bullets: [
      bi(
        "Mengembangkan antarmuka modul persetujuan bertingkat (Approval Asset) dengan navigasi multi-tab untuk usulan aset baru, perubahan nilai, mutasi, dan penghapusan.",
        "Developed multi-workflow fixed asset approval modules with multi-tab navigation supporting new asset entries, value adjustments, transfers, and disposal proposals."
      ),
      bi(
        "Mengimplementasikan direktori inventarisasi aset tetap dengan tabel data berdensitas tinggi, paginasi server-side, dan pemformatan mata uang Rupiah.",
        "Implemented the enterprise fixed asset inventory directory featuring high-density data tables, server-side pagination, and Rupiah currency formatting."
      ),
      bi(
        "Mengembangkan formulir usulan penghapusan aset mencakup pengelompokan (grouping) dan antarmuka penelaahan finalisasi aset tetap.",
        "Developed asset disposal proposal workflows including grouping interfaces and final review validation."
      ),
      bi(
        "Mengimplementasikan modul manajemen pengguna (User Management) dan peran dengan kontrol akses berbasis peran (RBAC).",
        "Implemented user and role management modules with role-based access control (RBAC)."
      ),
      bi(
        "Mengintegrasikan REST API bertipe ketat dan mengonfigurasi header keamanan SSR anti-clickjacking (X-Frame-Options: SAMEORIGIN).",
        "Integrated strict-typed REST APIs and configured SSR anti-clickjacking security headers (X-Frame-Options: SAMEORIGIN)."
      ),
    ],
    tech: [
      "Angular 18",
      "Ant Design (NG-ZORRO)",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
    ],
  },
  {
    id: "cis",
    name: "Enterprise Web Applications Maintenance (CIS Managed Services)",
    period: bi("Mar 2026 – Sep 2026", "Mar 2026 – Sep 2026"),
    company: bi("PT Sigma Cipta Caraka", "PT Sigma Cipta Caraka"),
    description: bi(
      "Pemeliharaan dan penguatan keamanan antarmuka pada 2 aplikasi enterprise Corporate Information System (CIS: LSM dan Patricia) dalam skema managed services, mencakup remediasi temuan vulnerability scan, kompatibilitas SSR Node 22, dan perbaikan alur transaksi pengadaan.",
      "Frontend maintenance and security hardening across 2 enterprise Corporate Information System (CIS: LSM and Patricia) web applications under managed services, covering vulnerability scan remediations, Node 22 SSR compatibility, and procurement transaction workflow fixes."
    ),
    role: bi(
      "Mengembangkan pembaruan antarmuka, menyelesaikan tiket gangguan (bug fix), dan mengimplementasikan perbaikan keamanan sisi frontend pada 2 aplikasi enterprise Corporate Information System (CIS: LSM dan Patricia) menggunakan Vue.js, Nuxt.js, TypeScript, dan Tailwind CSS; mengimplementasikan composable sanitasi data (useSanitize, useSvgSanitizer) dan Content Security Policy (CSP) untuk penguatan terhadap Cross-Site Scripting (XSS); merancang sanitasi URL pengalihan login guna mencegah celah Open Redirect; memasang pelindung kompatibilitas Server-Side Rendering (SSR guards) untuk stabilitas di lingkungan Node 22; serta menguji dan memperbaiki logika penguraian ID Purchase Order dan integrasi REST API publik.",
      "Developed frontend updates, resolved bug-fix tickets, and implemented frontend security remediations across 2 enterprise Corporate Information System (CIS) applications (LSM and Patricia) using Vue.js, Nuxt.js, TypeScript, and Tailwind CSS; implemented data sanitization composables (useSanitize, useSvgSanitizer) and Content Security Policy (CSP) headers to harden against Cross-Site Scripting (XSS); designed login redirect URL sanitization to prevent Open Redirect vulnerabilities; implemented Server-Side Rendering (SSR) compatibility guards ensuring stability in Node 22 environments; tested and fixed Purchase Order ID parsing logic and public REST API integrations."
    ),
    bullets: [
      bi(
        "Mengembangkan modul composable sanitasi data (useSanitize & useSvgSanitizer) untuk membersihkan input string, parameter URL, dan markup SVG kode QR, menutup celah Cross-Site Scripting (XSS) pada dokumen pengadaan.",
        "Developed data sanitization composables (useSanitize & useSvgSanitizer) to filter input strings, URL parameters, and QR code SVG markups, remediating Cross-Site Scripting (XSS) vulnerabilities across procurement documents."
      ),
      bi(
        "Mengimplementasikan proteksi Content Security Policy (CSP) dan sanitasi pengalihan URL pada alur login portal kemitraan (Patricia) guna mencegah serangan injeksi skrip dan celah Open Redirect.",
        "Implemented Content Security Policy (CSP) protections and URL redirect sanitization on partner portal login flows (Patricia) to prevent script injection and Open Redirect exploits."
      ),
      bi(
        "Merancang pelindung kompatibilitas Server-Side Rendering (SSR guards) dengan mock aman objek peramban (localStorage) dan pembungkus <ClientOnly> untuk mencegah kegagalan hidrasi pada runtime Node 22.",
        "Designed Server-Side Rendering (SSR) compatibility guards with safe browser object mocks (localStorage) and ClientOnly wrappers, preventing hydration crashes on Node 22 runtime environments."
      ),
      bi(
        "Menguji dan memperbaiki integritas penguraian ID Purchase Order (PO) pada parameter URL peramban untuk mencegah penimpaan payload data transaksi antar formulir pengadaan.",
        "Tested and resolved Purchase Order (PO) ID parsing vulnerabilities within browser URL parameters to eliminate transaction payload overwrites across procurement forms."
      ),
      bi(
        "Memelihara penyeragaman konfigurasi client REST API publik (BASE_URL_PUBLIC) serta menata ulang logika paginasi dan filter pencarian pada tabel data transaksi pengadaan.",
        "Maintained public REST API client configuration uniformity (BASE_URL_PUBLIC) while restructuring table query pagination and search filters across logistics transaction modules."
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
    description: bi(
      "Aplikasi web portal enterprise dan sistem manajemen konten (CMS) PT Pertamina International Shipping berbasis C#/.NET 8 dan Blazor Server dalam arsitektur microservices, mencakup publikasi warta korporat, manajemen dokumen arsip, formulir interaktif, dan integrasi Single Sign-On.",
      "Enterprise web portal and content management system (CMS) for PT Pertamina International Shipping built with C#/.NET 8 and Blazor Server within a microservices architecture, featuring corporate news publishing, archive document management, interactive forms, and Single Sign-On integration."
    ),
    role: bi(
      "Mengembangkan dan memelihara antarmuka portal web enterprise serta sistem manajemen konten (CMS) PT Pertamina International Shipping menggunakan C#, .NET 8.0, ASP.NET Core, dan Blazor Server (Interactive Server Mode) dalam arsitektur microservices; menstandarisasi pewarisan kelas dasar dan siklus hidup komponen pada pustaka antarmuka Oktaf.UI lintas ratusan berkas komponen Razor; mengimplementasikan penanganan deserialisasi nilai null dan peningkatan stabilitas pada modul Form Builder serta editor CMS; merancang antarmuka navigasi bertingkat (StickyMenu) dengan indikator tahapan; mengintegrasikan Mock Authentication Middleware pada 6 microservice backend untuk simulasi otorisasi peran (RBAC) di lingkungan lokal; serta memelihara konfigurasi kontainerisasi Docker.",
      "Developed and maintained enterprise web portal interfaces and content management systems (CMS) for PT Pertamina International Shipping using C#, .NET 8.0, ASP.NET Core, and Blazor Server (Interactive Server Mode) within a microservices architecture; standardized base component inheritance and lifecycle execution across the Oktaf.UI Razor component library across hundreds of component files; implemented null deserialization safeguards and stability enhancements on the Form Builder and CMS editor; designed multi-level navigation interfaces (StickyMenu) with step progress indicators; integrated Mock Authentication Middleware across 6 backend microservices to simulate role-based authorization (RBAC) in local environments; maintained Docker containerization configurations."
    ),
    bullets: [
      bi(
        "Mengembangkan dan menstandarisasi pustaka komponen antarmuka Blazor enterprise (Oktaf.UI) mencakup perbaikan pewarisan kelas dasar, metode siklus hidup komponen (OnParametersSetAsync), dan penerapan tipe data referensi null-aman (nullable reference types) pada 384 berkas komponen Razor.",
        "Developed and standardized enterprise Blazor UI component libraries (Oktaf.UI), enforcing uniform base component inheritance, lifecycle execution (OnParametersSetAsync), and nullable reference type safety across 384 Razor component files."
      ),
      bi(
        "Mengimplementasikan dan menyempurnakan modul Form Builder serta editor CMS dengan menangani deserialisasi parameter bernilai null secara aman, mengeliminasi crash serialisasi komponen, serta mempercepat responsivitas antarmuka penyusunan konten.",
        "Implemented and enhanced the Form Builder and CMS editor by resolving null parameter deserialization issues, eliminating serialization crashes, and boosting content authoring interface responsiveness."
      ),
      bi(
        "Merancang antarmuka formulir terstruktur dan komponen navigasi berjenjang (StickyMenu) dengan indikator tahapan alur (step indicators), pemisah panah navigasi, serta penataan spasi input form (InputTextArea, LOV, FbDatePicker, UploadFile).",
        "Designed structured form interfaces and multi-level navigation components (StickyMenu) featuring step progress indicators, directional breadcrumb arrows, and unified layout spacing for form inputs (InputTextArea, LOV, FbDatePicker, UploadFile)."
      ),
      bi(
        "Mengintegrasikan modul Mock Authentication Middleware pada 6 microservice backend ASP.NET Core untuk mensimulasikan sesi pengguna dan hak akses peran administratif (Admin BUSOL / Admin APP) di lingkungan pengembangan lokal tanpa ketergantungan server SSO eksternal.",
        "Integrated Mock Authentication Middleware across 6 ASP.NET Core backend microservices to simulate authenticated sessions and administrative role claims (Admin BUSOL / Admin APP) in local development without external SSO dependencies."
      ),
      bi(
        "Memelihara kontainerisasi multi-layanan Docker dan integrasi API microservices, mencakup konfigurasi uji kesehatan (healthcheck) berbasis alamat loopback dan sinkronisasi variabel lingkungan basis data lokal.",
        "Maintained multi-service Docker containerization and microservices API integration, including loopback-based container healthcheck configurations and local database environment parameter synchronization."
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
    company: bi("PT Sigma Cipta Caraka", "PT Sigma Cipta Caraka"),
    description: bi(
      "Aplikasi web IT Service Management (ITSM) untuk pengelolaan operasional layanan enterprise berbasis standar ITIL, mencakup manajemen permohonan perubahan sistem, dewan peninjau CAB, dan verifikasi dokumen pemenuhan risiko.",
      "Enterprise IT Service Management (ITSM) web application for ITIL-compliant service operations, featuring change request management, Change Advisory Board reviews, and risk compliance document verifications."
    ),
    role: bi(
      "Memelihara modul Change Management pada platform enterprise ITSM menggunakan Vue 3 (Composition API), TypeScript, Vite, Tailwind CSS, dan Pinia dalam penanganan tiket perbaikan bug dan Change Request (CR); mengimplementasikan alur persetujuan CAB (modal penambahan dan delegasi ulang peninjau), matriks 35 dokumen justifikasi wajib, serta kontrol akses peran koordinator tugas perubahan.",
      "Maintained Change Management modules for the enterprise ITSM platform using Vue 3 (Composition API), TypeScript, Vite, Tailwind CSS, and Pinia, resolving bug-fix tickets and Change Request (CR) tasks; implemented CAB approval workflows (approver assignment and re-assignment modals), a 35-item mandatory justification matrix, and coordinator role access control."
    ),
    bullets: [
      bi(
        "Memelihara dan mengembangkan modul persetujuan Change Advisory Board (CAB) untuk manajemen perubahan TI, mencakup modal penambahan peninjau, delegasi ulang (re-assign), dan penghapusan hak persetujuan pada tiket Change Request (CR).",
        "Maintained and developed Change Advisory Board (CAB) approval modules for IT change management, including modal dialogs to assign, re-assign, and revoke approver permissions on Change Request (CR) tasks."
      ),
      bi(
        "Mengimplementasikan matriks dokumen justifikasi wajib perubahan dengan validasi berkas multi-format hingga 15MB, pratinjau dokumen, dan penanganan unggahan berkas sementara.",
        "Implemented a 35-item mandatory justification document matrix with multi-format file validation up to 15MB, document previews, and temporary file upload handling."
      ),
      bi(
        "Memelihara modul manajemen tugas perubahan (Task Management) dan filter pencarian tiket perubahan tingkat lanjut dengan penyimpanan state filter persisten.",
        "Maintained technical change task management modules and advanced ticket search filters with persistent filter state management."
      ),
      bi(
        "Merancang validasi hak akses dan alur kerja berbasis peran koordinator perubahan (Change Coordinator) untuk memastikan kepatuhan tata kelola standar ITIL.",
        "Designed role-based access validation and workflows for change coordinators to enforce ITIL governance compliance."
      ),
      bi(
        "Mengintegrasikan REST API dengan manajemen state Pinia serta memelihara konsistensi sinkronisasi draf perubahan lokal (applyLocalPendingChanges).",
        "Integrated REST APIs with Pinia state management while maintaining local pending change synchronization workflows (applyLocalPendingChanges)."
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
    description: bi(
      "Aplikasi web Continuous Automated Red Teaming & Attack Surface Management untuk manajemen kerentanan aset digital korporat, pemantauan kebocoran kredensial, dan otomatisasi alur remediasi keamanan siber.",
      "Continuous Automated Red Teaming & Attack Surface Management web application for corporate asset vulnerability tracking, credential leak detection, and cybersecurity remediation workflows."
    ),
    role: bi(
      "Memelihara dan mengembangkan modul konfigurasi paket layanan audit siber (Packages), modal manajemen domain klien, serta memelihara standarisasi tata letak dan palet warna sistem desain menggunakan Nuxt 3, Vue.js, Pinia, dan Vee-Validate/Yup.",
      "Maintained and enhanced cybersecurity audit package configuration modules (Packages), client domain management modals, and maintained design system layout and color palette standardization using Nuxt 3, Vue.js, Pinia, and Vee-Validate/Yup."
    ),
    bullets: [
      bi(
        "Memelihara dan menyempurnakan antarmuka modul Packages (CRUD paket audit pemindaian, kuota, periode, dan profil konfigurasi).",
        "Maintained and enhanced Packages module interfaces (audit scan CRUD, quotas, periods, and configuration profiles)."
      ),
      bi(
        "Mengimplementasikan formulir tervalidasi skema menggunakan Vee-Validate dan Yup dengan manajemen state Pinia.",
        "Implemented schema-validated forms using Vee-Validate and Yup backed by Pinia state management."
      ),
      bi(
        "Merancang komponen modal penambahan dan pengeditan domain klien serta formulir filter penelusuran aset digital.",
        "Designed client domain add/edit modals and digital asset search filter forms."
      ),
      bi(
        "Memelihara konsistensi sistem desain antarmuka dengan standardisasi palet warna Tailwind CSS dan tata letak responsif.",
        "Maintained design system consistency by standardizing Tailwind CSS color palettes and responsive layouts."
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
    description: bi(
      "Situs web e-commerce pemesanan partai besar (bulk orders) dengan manajemen alur transaksi bertahap (split payment), panel pemenuhan pesanan berbutir halus (item-level fulfillment), sinkronisasi filter parameter URL, dan dasbor analitik penjualan berbasis Recharts.",
      "Commercial bulk-orders e-commerce website featuring split payment transaction workflows, a granular item-level order fulfillment panel, URL parameter filter synchronization, and Recharts sales analytics dashboards."
    ),
    role: bi(
      "Merancang dan mengimplementasikan manajemen state keranjang belanja pada situs web e-commerce pemesanan partai besar (bulk orders) menggunakan Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Zustand, dan TanStack Query; mengintegrasikan pembaruan antarmuka optimistik (optimistic UI updates) dengan pemulihan otomatis saat gangguan jaringan; mengembangkan alur pemesanan multi-tahap dan konfirmasi pelunasan bertahap (split payment); mengimplementasikan panel pemenuhan pesanan berbutir halus (item-level fulfillment) dengan deduplikasi kartu resi pengiriman; serta memelihara sanitasi input sisi klien (isomorphic-dompurify) dan visualisasi analitik Recharts.",
      "Designed and implemented cart state management for a commercial bulk-orders e-commerce website using Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Zustand, and TanStack Query; integrated optimistic UI updates with automated state rollback on network disruptions; developed multi-step checkout workflows and split payment settlement confirmations; implemented a granular item-level order fulfillment panel featuring airway bill card de-duplication; and maintained client-side input sanitization (isomorphic-dompurify) alongside Recharts analytics visualizations."
    ),
    bullets: [
      bi(
        "Merancang manajemen state keranjang belanja optimistik menggunakan kombinasi Next.js 16 (App Router), Zustand, dan TanStack Query v5 dengan mekanisme pemulihan otomatis (rollback) saat terjadi gangguan jaringan.",
        "Designed optimistic cart state management using Next.js 16 (App Router), Zustand, and TanStack Query v5 with automated state rollback upon network disruptions."
      ),
      bi(
        "Mengembangkan alur transaksi pembayaran bertahap (split payment) dan modal konfirmasi pelunasan tahap kedua dengan pemisahan visual daftar barang lunas dan belum lunas.",
        "Developed multi-step split payment workflows and second-payment settlement confirmation modals featuring clear separation of paid and unpaid line items."
      ),
      bi(
        "Mengimplementasikan panel pemenuhan pesanan berbutir halus (item-level fulfillment) dengan validasi pembatasan angka (clamping) dan algoritma deduplikasi kartu nomor resi pengiriman (airway bill de-duplication).",
        "Implemented a granular item-level order fulfillment panel with manual quantity input clamping and airway bill card de-duplication algorithms."
      ),
      bi(
        "Mengintegrasikan antarmuka katalog produk responsif dengan sinkronisasi filter parameter URL peramban serta modal rincian laporan penjualan berbasis Embla Carousel.",
        "Integrated a responsive product catalog interface with browser URL query parameter synchronization and an Embla Carousel sales report detail modal."
      ),
      bi(
        "Memelihara kebersihan arsitektur kode (clean code refactoring) serta memasang sanitasi keamanan input sisi klien menggunakan isomorphic-dompurify guna memitigasi risiko Cross-Site Scripting (XSS).",
        "Maintained clean code architectural standards and implemented client-side input sanitization using isomorphic-dompurify to mitigate Cross-Site Scripting (XSS) risks."
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
    company: bi("PT Telkom Indonesia", "PT Telkom Indonesia"),
    description: bi(
      "Purwarupa aplikasi web analitik dan operasional telekomunikasi untuk ekosistem Netmonk (PT Telkom Indonesia) dengan pelacakan pemenuhan pesanan regional (NCX & Scone), visualisasi dasbor Metabase tertanam berkeamanan token JWT, dan autentikasi dual-token.",
      "Telecommunication operational analytics web prototype for the Netmonk ecosystem (PT Telkom Indonesia) featuring regional service order tracking (NCX & Scone), JWT-secured embedded Metabase dashboards, and dual-token authentication."
    ),
    role: bi(
      "Mengembangkan purwarupa aplikasi web analitik dan operasional telekomunikasi untuk ekosistem Netmonk (PT Telkom Indonesia) menggunakan React, Vite, Tailwind CSS, Redux Toolkit, Node.js (Express), dan MongoDB; mengimplementasikan pelacakan siklus pesanan layanan telekomunikasi regional (NCX dan Scone) lintas 7 divisi regional (TREG) dan 40+ kantor wilayah telekomunikasi (Witel); merancang arsitektur keamanan akses dasbor Metabase tertanam berbasis tanda tangan kriptografis token JWT dengan masa kedaluwarsa 10 menit (dipertahankan sebagai skripsi sarjana di UGM dengan IPK 3,74/4,00); mengintegrasikan sistem autentikasi dual-token dengan rotasi token penyegar dan penanganan silent refresh pada RTK Query; serta memelihara kualitas basis kode melalui modernisasi toolchain ke Vite 6 dan remediasi 101 kerentanan dependensi.",
      "Developed a telecommunication operational analytics web prototype for the Netmonk ecosystem (PT Telkom Indonesia) using React, Vite, Tailwind CSS, Redux Toolkit, Node.js (Express), and MongoDB; implemented regional service order tracking workflows (NCX and Scone) across 7 regional divisions (TREG) and 40+ branch offices (Witel); designed access security architectures for embedded Metabase dashboards leveraging cryptographic JWT signing with 10-minute expiration windows (defended as undergraduate thesis at UGM, GPA 3.74/4.00); integrated dual-token authentication featuring refresh token rotation and silent re-authentication via RTK Query; and maintained codebase reliability through Vite 6 toolchain modernization and remediation of 101 nested dependency vulnerabilities."
    ),
    bullets: [
      bi(
        "Mengembangkan antarmuka pemantauan pesanan telekomunikasi regional (NCX dan Scone) menggunakan React, Tailwind CSS, dan Netmonk Design System lintas 7 divisi regional (TREG) dan 40+ kantor Witel se-Indonesia.",
        "Developed regional telecommunication service order tracking interfaces (NCX and Scone) using React, Tailwind CSS, and Netmonk Design System across 7 regional divisions (TREG) and 40+ nationwide branch offices (Witel)."
      ),
      bi(
        "Merancang arsitektur keamanan akses dasbor Metabase tertanam berbasis tanda tangan kriptografis token JWT dengan masa aktif 10 menit guna mengamankan visualisasi analitik operasional (dipertahankan sebagai skripsi sarjana di UGM, IPK 3,74/4,00).",
        "Designed access security architectures for embedded Metabase dashboards leveraging cryptographic JWT signing with 10-minute validity to protect operational analytics (defended as undergraduate thesis at UGM, GPA 3.74/4.00)."
      ),
      bi(
        "Mengimplementasikan sistem autentikasi dual-token dan mekanisme silent refresh menggunakan RTK Query untuk menangani penyegaran access token di latar belakang secara transparan tanpa mengganggu alur kerja pengguna.",
        "Implemented dual-token authentication and silent refresh mechanisms utilizing RTK Query to execute background access token renewals without interrupting user workflows."
      ),
      bi(
        "Mengintegrasikan antarmuka frontend dengan layanan REST API Express.js dan basis data MongoDB (Mongoose) yang dilengkapi kontrol akses berbasis peran (RBAC) bertingkat.",
        "Integrated frontend interfaces with Express.js REST APIs and MongoDB (Mongoose) databases featuring granular multi-tiered role-based access control (RBAC)."
      ),
      bi(
        "Memelihara keandalan repositori melalui modernisasi toolchain ke Vite 6 dan menyelesaikan 101 peringatan kerentanan dependensi bersarang hingga mencapai status nol kerentanan risiko tinggi.",
        "Maintained repository security by modernizing build toolchains to Vite 6 and remediating 101 nested dependency vulnerabilities to achieve a zero high-risk vulnerability posture."
      ),
    ],
    tech: [
      "React",
      "Vite",
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

export type SkillGroup = {
  title: Bi
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: bi("Bahasa & Kerangka Kerja Utama", "Core Languages & Frameworks"),
    items: [
      "TypeScript",
      "JavaScript (ES6+)",
      "React",
      "Next.js (App Router)",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: bi("Antarmuka & Penataan Gaya", "UI & Styling"),
    items: [
      "Tailwind CSS (v3 & v4)",
      "shadcn/ui",
      "Ant Design",
      "Radix UI",
      "Base UI",
      "Responsive Web Design",
    ],
  },
  {
    title: bi("Manajemen State & Data", "State & Data Management"),
    items: [
      "TanStack Query (React Query)",
      "Zustand",
      "Redux",
      "React Hook Form",
      "Zod",
      "TanStack Table",
      "Recharts",
    ],
  },
  {
    title: bi("Keterampilan Kerja Pendukung", "Working Proficiency"),
    items: ["Angular", "Vue.js", "Nuxt", "Blazor (C#/.NET)"],
  },
  {
    title: bi("Alat & Ekosistem", "Tools & Ecosystem"),
    items: [
      "Git",
      "GitLab",
      "GitHub",
      "Bitbucket",
      "Vite",
      "Postman",
      "RESTful API Integration",
      "AI-Assisted Development (Antigravity)",
    ],
  },
]

export type EducationEntry = {
  id: string
  institution: string
  degree: Bi
  period: string
  score: string
  extra?: Bi
}

export const education: EducationEntry[] = [
  {
    id: "ugm",
    institution: "Universitas Gadjah Mada (UGM)",
    degree: bi(
      "Sarjana Ilmu Komputer (S.Kom.)",
      "Bachelor of Computer Science (S.Kom.)"
    ),
    period: "2020 – 2024",
    score: "3.74 / 4.00",
    extra: bi(
      "Skripsi: Keamanan Akses Dashboard Metabase Tertanam (Embedded) menggunakan JSON Web Token pada Purwarupa Web Analytics Netmonk.",
      "Thesis: Access Security for Embedded Metabase Dashboards using JSON Web Token on the Netmonk Web Analytics Prototype."
    ),
  },
  {
    id: "sman1-smg",
    institution: "SMA Negeri 1 Semarang",
    degree: bi("Jurusan IPA", "Science Track (IPA)"),
    period: "2017 – 2020",
    score: "92.27 / 100",
  },
]

export type CertificationEntry = {
  name: string
  issuer: string
  period: Bi | string
}

export const certifications: CertificationEntry[] = [
  {
    name: "Become a React Web Developer Expert",
    issuer: "Dicoding Indonesia",
    period: "Oct 2024 – Oct 2027",
  },
  {
    name: "Learn Intermediate Web Front-End Tools",
    issuer: "Dicoding Indonesia",
    period: "Oct 2024 – Oct 2027",
  },
  {
    name: "React Essential Training",
    issuer: "LinkedIn Learning",
    period: "Jul 2025",
  },
  {
    name: "Beginner Back-End Learning with JavaScript",
    issuer: "Dicoding Indonesia",
    period: "Oct 2024 – Oct 2027",
  },
  {
    name: "Learn Web Application Fundamentals with React",
    issuer: "Dicoding Indonesia",
    period: "Aug 2024 – Aug 2027",
  },
  {
    name: "Learn to Build Web Apps with React",
    issuer: "Dicoding Indonesia",
    period: "Aug 2024 – Aug 2027",
  },
  {
    name: "Cloud Practitioner Essentials (AWS Cloud Basics)",
    issuer: "Dicoding Indonesia",
    period: "Sep 2024 – Sep 2027",
  },
  {
    name: "Learn the Fundamentals of Front-End Web Development",
    issuer: "Dicoding Indonesia",
    period: "Sep 2024 – Sep 2027",
  },
  {
    name: "Learn the Basics of SQL",
    issuer: "Dicoding Indonesia",
    period: "Jan 2025 – Jan 2028",
  },
  {
    name: "Learn Data Science Basics",
    issuer: "Dicoding Indonesia",
    period: "Jan 2025 – Jan 2028",
  },
  {
    name: "Getting Started with Python Programming",
    issuer: "Dicoding Indonesia",
    period: "Jan 2025 – Jan 2028",
  },
  {
    name: "Learn Procedural Programming with Python",
    issuer: "Dicoding Indonesia",
    period: "Jan 2024 – Jan 2027",
  },
  {
    name: "Learn JavaScript Programming Basics",
    issuer: "Dicoding Indonesia",
    period: "Aug 2024 – Aug 2027",
  },
  {
    name: "Learn to Create a Web Front-End for Beginners",
    issuer: "Dicoding Indonesia",
    period: "Aug 2024 – Aug 2027",
  },
  {
    name: "Learn Web Programming Basics",
    issuer: "Dicoding Indonesia",
    period: "Aug 2024 – Aug 2027",
  },
  {
    name: "Learn Project Management Basics",
    issuer: "Dicoding Indonesia",
    period: "Jan 2024 – Jan 2027",
  },
  {
    name: "Academic English Proficiency Test (AcEPT) – Skor 218",
    issuer: "Pusat Bahasa FIB, Universitas Gadjah Mada",
    period: bi("Agu 2024 – Seumur hidup", "Aug 2024 – Lifetime"),
  },
  {
    name: "EF SET English Certification",
    issuer: "English First",
    period: "Aug 2024",
  },
  {
    name: "Magang Generasi Bertalenta BUMN (MAGENTA) – Skor 87.9",
    issuer: "FHCI BUMN",
    period: bi("Feb 2024 – Seumur hidup", "Feb 2024 – Lifetime"),
  },
]

export type AchievementEntry = {
  title: Bi
  issuer: string
  period: string
}

export const achievements: AchievementEntry[] = [
  {
    title: bi(
      "Juara 3, Kategori Analisis Data – DEXA-DIKE Innovation Award 2022",
      "3rd Place, Data Analysis Category – DEXA-DIKE Innovation Award 2022"
    ),
    issuer: "DIKE (Lab RPDL) & Dexa Group",
    period: "Oct 2022",
  },
  {
    title: bi(
      "Finalis Hackathon – HackGov UGM 2021",
      "Hackathon Finalist – HackGov UGM 2021"
    ),
    issuer: "HackGov UGM",
    period: "Aug 2021",
  },
]

export type OrganizationEntry = {
  org: string
  role: Bi
  period: string
}

export const organizations: OrganizationEntry[] = [
  {
    org: "Himpunan Mahasiswa Ilmu Komputer UGM (HIMAKOM)",
    role: bi(
      "Kepala Divisi Minat & Bakat",
      "Head of Interest & Talent Division"
    ),
    period: "Feb 2022 – Feb 2023",
  },
  {
    org: "Google Developer Student Clubs UGM (GDSC)",
    role: bi("Anggota Hacker", "Member of Hacker"),
    period: "Nov 2021 – Nov 2022",
  },
  {
    org: "Himpunan Mahasiswa Ilmu Komputer UGM (HIMAKOM)",
    role: bi(
      "Staf Divisi Minat & Bakat",
      "Staff of Interest & Talent Division"
    ),
    period: "Feb 2021 – Feb 2022",
  },
  {
    org: "Jogja Information and Technology Session (JOINTS) UGM",
    role: bi("Staf Divisi Acara", "Staff of Event Division"),
    period: "Nov 2020 – Apr 2021",
  },
]

export const volunteering: OrganizationEntry[] = [
  {
    org: "KKN-PPM UGM Periode II",
    role: bi("Mahasiswa Peserta", "Student Participant"),
    period: "Jun 2023 – Aug 2023",
  },
  {
    org: "PPSMB UGM",
    role: bi("Peserta", "Participant"),
    period: "Sep 2020",
  },
]
