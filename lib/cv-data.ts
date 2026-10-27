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
  location: bi("Yogyakarta, Indonesia", "Yogyakarta, Indonesia"),
  role: bi("Frontend Engineer", "Frontend Engineer"),
  tagline: bi(
    "Membangun antarmuka web yang rapi, cepat, dan tahan lama.",
    "Building web interfaces that are clean, fast, and built to last."
  ),
  summary: bi(
    "Frontend Engineer dengan pengalaman profesional 2 tahun dalam membangun aplikasi web enterprise, dasbor analitik, dan frontend e-commerce B2B menggunakan TypeScript, React, dan Next.js. Membangun antarmuka untuk BPJS Kesehatan dan sistem internal Telkomsigma serta, saat magang di Telkom Indonesia, frontend analitik dengan dasbor Metabase tertanam, disertai riset keamanan akses embed berbasis JWT.",
    "Frontend Engineer with 2 years of professional experience building enterprise web applications, analytics dashboards, and a B2B e-commerce frontend with TypeScript, React, and Next.js. Built UI for BPJS Kesehatan and internal Telkomsigma systems and, during a Telkom Indonesia internship, an analytics frontend with embedded Metabase dashboards, alongside research on JWT-based embed access security."
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
  points: Bi[]
  projectIds: string[]
}

export const experience: ExperienceEntry[] = [
  {
    id: "sigma",
    company: "PT Sigma Cipta Caraka (Telkomsigma)",
    role: bi(
      "Junior Programmer – Frontend Engineer",
      "Junior Programmer – Frontend Engineer"
    ),
    period: bi("Nov 2024 – Okt 2026", "Nov 2024 – Oct 2026"),
    location: bi(
      "Yogyakarta, Indonesia (On-site)",
      "Yogyakarta, Indonesia (On-site)"
    ),
    employmentType: bi(
      "Perjanjian Kerja Waktu Tertentu (PKWT)",
      "Fixed-term Contract (PKWT)"
    ),
    points: [
      bi(
        "Mengerjakan frontend pada 10 aplikasi dan layanan web enterprise dan internal dalam tim Agile Scrum, menggunakan React, Next.js, Angular, Vue.js, Nuxt, dan Blazor (.NET).",
        "Delivered frontend work across 10 enterprise and internal web applications and services in an Agile Scrum team, using React, Next.js, Angular, Vue.js, Nuxt, and Blazor (.NET)."
      ),
      bi(
        "Mengimplementasikan modul antarmuka Daftar Aset dan Manajemen Pengguna untuk sistem IMAPS (BPJS Kesehatan) menggunakan Angular 18, pustaka UI Ant Design (NG-ZORRO), dan REST API, serta memegang kepemilikan atas standardisasi komponen, tata letak responsif, dan pengamanan antarmuka di seluruh modul.",
        "Implemented asset listing and user management modules for IMAPS (BPJS Kesehatan) using Angular 18, Ant Design (NG-ZORRO), and REST APIs, taking ownership of responsive layouts, UI component consistency, and security hardening across all modules."
      ),
      bi(
        "Membangun modul Smart Contracting (manajemen kontrak, penyusunan formulir drag-and-drop, pratinjau & pembuatan dokumen PDF) serta menyiapkan scaffolding awal Host Shell berbasis arsitektur micro-frontend (Module Federation) pada sisi frontend menggunakan Vite, React 19, dan Ant Design 5 untuk Alisa 2.0 (Infomedia Nusantara), serta memandu alur kerja teknis kepada dua rekan tim junior.",
        "Built the Smart Contracting module (contract workflows, drag-and-drop form builders, client-side PDF document generation) and set up the initial Host Shell scaffolding on a micro-frontend architecture (Module Federation) on the frontend using Vite, React 19, and Ant Design 5 for Alisa 2.0 (Infomedia Nusantara), while sharing workflows with two junior teammates."
      ),
      bi(
        "Membangun frontend Whistleblowing System (WBS) internal menggunakan Next.js App Router, TypeScript, komponen UI shadcn/ui, TanStack Query, dan Zustand: dasbor analitik pengaduan, manajemen data kasus dengan detail multi-tab dan pencatatan laporan manual, pengaturan formulir kuesioner, kontrol akses berbasis peran (RBAC), serta lokalisasi multi-bahasa i18next.",
        "Built the frontend of the internal Whistleblowing System (WBS) using Next.js App Router, TypeScript, shadcn/ui, TanStack Query, and Zustand: analytics dashboard, case management with multi-tab details and manual report intake, configurable questionnaires, role-based access control (RBAC), and i18next multilingual support."
      ),
      bi(
        "Mengembangkan MONARA 2.0 (Monitoring Natal Tahun Baru dan Ramadhan) dengan Next.js App Router, TypeScript, komponen UI shadcn/ui, dan Zustand: dasbor pemantauan tiket yang diperbarui setiap 30 detik, pencatatan operasional per shift, manajemen data master dan pengguna, serta akses berbasis JWT dan peran untuk tim Service Desk dan Operation, mencakup sekitar 40 unit penyedia layanan selama periode pemantauan Ramadhan, Natal, dan Tahun Baru.",
        "Developed MONARA 2.0 (Christmas, New Year & Ramadan Monitoring) on Next.js App Router, TypeScript, shadcn/ui, and Zustand: an auto-refreshing ticket dashboard polling every 30 seconds, shift-based operations logging, master data management, and role-based access for Service Desk and Operations teams, covering about 40 service-provider units during Ramadan, Christmas, and New Year monitoring periods."
      ),
      bi(
        "Membangun frontend Info Tender (React 18, Vite, TypeScript, komponen UI shadcn/ui, TanStack Query, Zustand), aplikasi pemantauan pengadaan pemerintah: dasbor analitik LPSE dan SIRUP, pemantauan tender dan rencana pengadaan dengan filter dan ekspor Excel, tampilan komparasi paket SIRUP–LPSE dengan skor kecocokan, serta layar konfigurasi scraper dan log aktivitas pengguna di atas data yang dikumpulkan backend scraper dua kali sehari.",
        "Built the frontend for Info Tender (React 18, Vite, TypeScript, shadcn/ui, TanStack Query, Zustand), a government procurement monitoring app: LPSE and SIRUP analytics dashboards, tender monitoring with Excel export, a SIRUP-to-LPSE comparison view with match-confidence scoring, and scraper configuration screens for data collected twice daily by the backend scraper."
      ),
    ],
    projectIds: [
      "is-ware",
      "alisa",
      "wbs",
      "monara",
      "info-tender",
      "imaps",
      "cis",
      "pis-mars",
      "caterine-cm",
      "cart",
    ],
  },
  {
    id: "tumbuhin",
    company: "Tumbuhin Digital",
    role: bi(
      "Frontend Engineer (Freelance, Paruh Waktu)",
      "Frontend Engineer (Freelance, Part-time)"
    ),
    period: bi("Mei 2026 – Jun 2026", "May 2026 – Jun 2026"),
    location: bi("Remote", "Remote"),
    employmentType: bi("Freelance", "Freelance"),
    points: [
      bi(
        "Membangun frontend aplikasi web e-commerce bulk orders (B2B) menggunakan Next.js 16 (App Router), React 19, TypeScript, dan Tailwind CSS v4, menerapkan arsitektur client-server modern dan efisiensi perenderan antarmuka.",
        "Built the frontend for a B2B bulk-order e-commerce web application using Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4, implementing a modern client-server architecture and efficient interface rendering."
      ),
      bi(
        "Mengembangkan alur transaksi multi-langkah (multi-step order intake flows), pengelolaan state keranjang terpusat dengan TanStack Query & Zustand, autentikasi sesi pengguna, serta integrasi gerbang pembayaran (checkout payment gateway) pihak ketiga.",
        "Developed complex multi-step ordering flows, centralized cart state management using TanStack Query and Zustand, secure session-based authentication, and third-party payment gateway integration."
      ),
    ],
    projectIds: [],
  },
  {
    id: "telkom",
    company: "PT Telkom Indonesia",
    role: bi(
      "Developer Intern – Frontend Engineer",
      "Developer Intern – Frontend Engineer"
    ),
    period: bi("Jan 2023 – Des 2023", "Jan 2023 – Dec 2023"),
    location: bi("Jakarta, Indonesia (Remote)", "Jakarta, Indonesia (Remote)"),
    employmentType: bi("Magang", "Internship"),
    points: [
      bi(
        "Membangun frontend Netmonk Analytics menggunakan React, Tailwind CSS, dan Redux sebagai proyek akhir magang, menyajikan dasbor analitik pemenuhan pesanan (order fulfillment) untuk 7 regional (TREG) dan 40+ kantor cabang (WITEL).",
        "Built the frontend for Netmonk Analytics using React, Tailwind CSS, and Redux as an internship capstone project, providing order fulfillment analytics across 7 regional divisions (TREG) and 40+ branch offices (WITEL)."
      ),
      bi(
        "Mengintegrasikan dasbor analitik Metabase tertanam (embedded) dan meneliti keamanan akses berbasis token JWT (menjadi topik utama skripsi sarjana).",
        "Integrated embedded Metabase analytics dashboards and researched JWT-based embed access security (the foundation of undergraduate thesis)."
      ),
      bi(
        "Turut memelihara antarmuka Netmonk HI (React, Tailwind CSS) dan berkolaborasi dengan tim Data & Solution untuk menerjemahkan data metrik kompleks menjadi visualisasi dasbor yang intuitif.",
        "Supported maintenance of the Netmonk HI interface (React, Tailwind CSS) and collaborated with data teams to translate complex metrics into intuitive dashboard visualizations."
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
    period: bi("2026", "2026"),
    company: bi("Proyek Pribadi", "Personal Project"),
    description: bi(
      "Aplikasi web full-stack manajemen operasional dan keuangan untuk usaha armada semen curah swasta, menggantikan pencatatan spreadsheet manual menjadi sistem terpusat. Dilengkapi pencatatan ritase, pelacakan biaya, kalkulasi bagi hasil, perbandingan skema perpajakan, serta dasbor interaktif Recharts untuk omset ritase, biaya operasional (solar, sangu supir), dan margin.",
      "Full-stack operations and finance application for a private bulk cement fleet business, replacing a manual spreadsheet with a centralized system. Features trip logging, expense tracking, profit-sharing calculation, tax-scheme comparison, and an interactive Recharts dashboard for trip revenue, operating expenses (fuel, driver allowance), and margins."
    ),
    role: bi(
      "Membangun aplikasi web full-stack dengan Next.js App Router (Server Components dan Server Actions), PostgreSQL via Drizzle ORM, dan Better-Auth, dengan akses berbasis peran yang memisahkan administrator dari tampilan investor yang dibatasi pada laporan bagi hasil.",
      "Built with Next.js App Router (Server Components and Server Actions), PostgreSQL via Drizzle ORM, and Better-Auth, with role-based access separating administrators from an investor view limited to profit-sharing reports."
    ),
    tech: [
      "Next.js (App Router, React Server Components, Server Actions)",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "PostgreSQL (Drizzle ORM)",
      "Better-Auth",
      "Recharts",
      "@tanstack/react-table",
      "Zustand",
    ],
    link: "https://github.com/hadidwirsty/hiblow-fleet",
  },
  {
    id: "is-ware",
    name: "IS-WARE (Proof of Concept)",
    period: bi("2025", "2025"),
    company: bi(
      "PT Sigma Cipta Caraka (Klien: PT KBI – Grup Danareksa)",
      "PT Sigma Cipta Caraka (Client: PT KBI – Danareksa Group)"
    ),
    description: bi(
      "Mengembangkan purwarupa (proof of concept) sistem manajemen resi gudang dalam sprint 2 minggu di Telkomsigma dengan RBAC 5 peran, autentikasi, audit trail alur setiap resi dari pembuatan hingga persetujuan, serta data master gudang (gudang, jenis komoditas, perusahaan pemeriksa).",
      "Developed a warehouse-receipt management proof-of-concept in a 2-week sprint at Telkomsigma with 5-role RBAC, authentication, an audit trail covering each receipt's workflow from creation to approval, and warehouse master data (warehouses, commodity types, inspection companies)."
    ),
    role: bi(
      "Turut mendukung proposal teknis Telkomsigma dengan antarmuka responsif; proposal menduduki peringkat #1 pada evaluasi teknis klien.",
      "Contributed a responsive UI to the proposal that ranked #1 in the client's technical evaluation."
    ),
    bullets: [
      bi(
        "Purwarupa sistem manajemen resi gudang terintegrasi dalam sprint 2 minggu dengan autentikasi dan RBAC 5 peran.",
        "Warehouse receipt management proof-of-concept delivered in a 2-week sprint with authentication and 5-role RBAC."
      ),
      bi(
        "Pencatatan alur audit trail setiap resi dari pembuatan hingga persetujuan dan pengelolaan data master gudang komoditas.",
        "Audit trail tracking from creation to approval, plus commodity and warehouse master data management."
      ),
      bi(
        "Mendukung proposal teknis Telkomsigma hingga meraih peringkat #1 pada evaluasi teknis klien (PT KBI – Danareksa).",
        "Supported Telkomsigma technical proposal to achieve rank #1 in the client technical evaluation (PT KBI – Danareksa)."
      ),
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "Zustand",
    ],
  },
  {
    id: "alisa",
    name: "Alisa 2.0",
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
      "Membangun modul Smart Contracting (manajemen kontrak, penyusunan formulir drag-and-drop, pratinjau & pembuatan dokumen PDF) serta menyiapkan scaffolding awal Host Shell micro-frontend (Module Federation) menggunakan Vite, React 19, dan Ant Design 5, serta memandu rekan tim junior.",
      "Built the Smart Contracting module (contract workflows, drag-and-drop form builders, client-side PDF document generation) and set up the micro-frontend (Module Federation) Host Shell scaffolding using Vite, React 19, and Ant Design 5, while sharing workflows with junior teammates."
    ),
    bullets: [
      bi(
        "Modul Smart Contracting untuk manajemen kontrak dan penandatanganan dokumen elektronik.",
        "Smart Contracting module for contract management and electronic document workflows."
      ),
      bi(
        "Penyusunan formulir berbasis drag-and-drop (@dnd-kit) dan pembuatan dokumen PDF sisi klien (@react-pdf/renderer).",
        "Drag-and-drop form builder (@dnd-kit) and client-side PDF document generation (@react-pdf/renderer)."
      ),
      bi(
        "Scaffolding Host Shell berbasis arsitektur micro-frontend (Module Federation) dengan Vite, React 19, dan Ant Design 5.",
        "Host Shell scaffolding on a micro-frontend architecture (Module Federation) with Vite, React 19, and Ant Design 5."
      ),
    ],
    tech: [
      "React 19",
      "Vite",
      "Ant Design 5",
      "Module Federation",
      "@dnd-kit",
      "@react-pdf/renderer",
      "Tailwind CSS",
      "Zustand",
    ],
  },
  {
    id: "wbs",
    name: "Whistleblowing System (WBS)",
    period: bi("Des 2025 – Jun 2026", "Dec 2025 – Jun 2026"),
    company: bi("PT Sigma Cipta Caraka", "PT Sigma Cipta Caraka"),
    description: bi(
      "Aplikasi web Whistleblowing System (WBS: internal app only) untuk manajemen data pengaduan, formulir input laporan tim pengelola, dashboard analitik, pengaturan, dan kontrol akses berbasis peran, dengan dukungan multi-bahasa (i18next).",
      "Internal Whistleblowing System (WBS: internal app only) web application featuring complaint-data management, management-team report-entry forms, analytics dashboard, settings, and role-based access control, with multilingual support (i18next)."
    ),
    role: bi(
      "Membangun UI dan integrasi API untuk Whistleblowing System (WBS) internal menggunakan Next.js: manajemen data pengaduan dan formulir input laporan bagi tim pengelola WBS untuk mencatat laporan dari email, telepon, dan surat, serta dashboard, pengaturan, dan pemeliharaan pengguna, dengan dukungan multi-bahasa (i18next).",
      "Built the UI and API integration for the internal Whistleblowing System (WBS) on Next.js: complaint-data management and report-entry forms for the WBS management team to record reports received via email, phone, and letter, plus dashboard, settings, and user maintenance, with multilingual support (i18next)."
    ),
    bullets: [
      bi(
        "Dasbor analitik pengaduan berdasarkan status, saluran pelaporan, tipe identitas pelapor, dan jenis pelanggaran.",
        "Complaint analytics dashboard by status, reporting channel, reporter identity type, and complaint type."
      ),
      bi(
        "Manajemen data pengaduan dengan pencarian, filter, dan tampilan detail multi-tab.",
        "Complaint data management with search, filters, and a multi-tab detail view."
      ),
      bi(
        "Entri laporan manual bagi tim pengelola serta pengaturan jenis pelanggaran, formulir kuesioner pelapor, dan konten FAQ (dukungan multi-bahasa i18next).",
        "Manual report entry for the management team, plus settings for complaint types, configurable questionnaires, and FAQ content with multilingual support (i18next)."
      ),
      bi(
        "Manajemen pengguna dan peran dengan kontrol akses berbasis peran (role-based access).",
        "User and role management with role-based access control."
      ),
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "Zustand",
      "i18next",
    ],
  },
  {
    id: "monara",
    name: "MONARA (Monitoring Natal Tahun Baru dan Ramadhan)",
    period: bi("Feb 2025 – Mar 2025", "Feb 2025 – Mar 2025"),
    company: bi("PT Sigma Cipta Caraka", "PT Sigma Cipta Caraka"),
    description: bi(
      "Aplikasi web MONARA 2.0 (Monitoring Natal Tahun Baru dan Ramadhan) untuk pemantauan tiket dengan pembaruan otomatis (sekitar setiap 30 detik), autentikasi, data master, dan manajemen pengguna, mencakup sekitar 40 unit penyedia layanan untuk tim Service Desk dan Operation selama periode pemantauan Ramadhan, Natal, dan Tahun Baru.",
      "MONARA 2.0 (Christmas, New Year & Ramadan Monitoring) web application for ticket monitoring with auto-refreshing dashboards (about every 30 seconds), authentication, master data, and user management, covering about 40 service-provider units for the Service Desk and Operation team during Ramadan, Christmas, and New Year monitoring periods."
    ),
    role: bi(
      "Mengembangkan MONARA 2.0 (Monitoring Natal Tahun Baru dan Ramadhan) menggunakan Next.js: autentikasi, dasbor pemantauan tiket dengan pembaruan otomatis (sekitar setiap 30 detik), data master, dan manajemen pengguna untuk tim Service Desk dan Operation, mencakup sekitar 40 unit penyedia layanan selama periode pemantauan Ramadhan, Natal, dan Tahun Baru.",
      "Developed MONARA 2.0 (Christmas, New Year & Ramadan Monitoring) using Next.js: authentication, auto-refreshing ticket-monitoring dashboards (about every 30 seconds), master data, and user management for the Service Desk and Operation team, covering about 40 service-provider units during Ramadan, Christmas, and New Year monitoring periods."
    ),
    bullets: [
      bi(
        "Dasbor pemantauan tiket dengan pembaruan otomatis (polling latar belakang setiap 30 detik) dan fitur ekspor Excel.",
        "Ticket monitoring dashboard with background polling every 30 seconds and Excel export."
      ),
      bi(
        "Pencatatan dan pelaporan log operasional berbasis pergantian shift kerja.",
        "Shift-based operational logging and reporting."
      ),
      bi(
        "Manajemen data master CRUD untuk kategori tiket, shift kerja, dan penyedia layanan.",
        "Master data CRUD management for ticket categories, work shifts, and service providers."
      ),
      bi(
        "Manajemen pengguna (duty manager, daftar pengguna, kontak) dengan autentikasi JWT dan kontrol akses berbasis peran.",
        "User management (duty manager, user list, contact list) with JWT authentication and role-based access control."
      ),
    ],
    tech: ["Next.js", "Tailwind CSS", "shadcn/ui", "TanStack Query", "Zustand"],
  },
  {
    id: "info-tender",
    name: "Info Tender",
    period: bi("Des 2024 – Jan 2025", "Dec 2024 – Jan 2025"),
    company: bi("PT Sigma Cipta Caraka", "PT Sigma Cipta Caraka"),
    description: bi(
      "Aplikasi frontend web pemantauan pengadaan pemerintah: dasbor analitik LPSE dan SIRUP, pemantauan tender dan rencana pengadaan dengan filter dan ekspor Excel, tampilan komparasi data SIRUP-ke-LPSE dengan skor kesesuaian, layar konfigurasi scraper, dan log aktivitas pengguna; data dikumpulkan oleh backend scraper dua kali sehari dari LPSE dan SIRUP.",
      "Frontend web application for government procurement monitoring: LPSE and SIRUP analytics dashboards, tender and procurement-plan monitoring with filters and Excel export, a SIRUP-to-LPSE data comparison view with match-confidence scoring, scraper configuration screens, and user activity logs; data is collected by the backend scraper twice daily from LPSE and SIRUP."
    ),
    role: bi(
      "Membangun dasbor analitik LPSE dan SIRUP, tampilan komparasi data dengan skor kesesuaian, layar konfigurasi scraper, log aktivitas pengguna, serta pengaturan notifikasi menggunakan React 18, Vite, TypeScript, TanStack Query, dan Zustand.",
      "Built LPSE and SIRUP analytics dashboards, data comparison views with match-confidence scoring, scraper configuration screens, user activity logs, and notification settings using React 18, Vite, TypeScript, TanStack Query, and Zustand."
    ),
    bullets: [
      bi(
        "Dasbor analitik LPSE dan SIRUP, serta daftar pemantauan tender dengan filter, modal detail, dan ekspor Excel.",
        "LPSE and SIRUP analytics dashboards, plus tender monitoring lists with filters, detail modal, and Excel export."
      ),
      bi(
        "Pemantauan rencana pengadaan SIRUP dan tampilan komparasi data LPSE-vs-SIRUP dengan skor kesesuaian (confidence score).",
        "SIRUP procurement plan monitoring and LPSE-vs-SIRUP comparison view with match-confidence scoring."
      ),
      bi(
        "Pengaturan parameter scraping dan penyesuaian tata letak kolom notifikasi secara drag-and-drop.",
        "Scraping parameter settings and drag-and-drop notification column layout customization."
      ),
      bi(
        "Manajemen pengguna, log aktivitas sistem, dan autentikasi JWT terintegrasi Microsoft SSO dengan kontrol akses berbasis peran.",
        "User management, system activity logs, and JWT authentication with Microsoft SSO and role-based access."
      ),
    ],
    tech: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "Zustand",
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
      "Mengimplementasikan modul daftar aset dan manajemen pengguna untuk sistem IMAPS menggunakan Angular 18, pustaka UI Ant Design (NG-ZORRO), dan REST API, serta memegang kepemilikan atas standardisasi komponen, tata letak responsif, dan pengamanan antarmuka di seluruh modul.",
      "Implemented asset listing and user management modules for IMAPS using Angular 18, Ant Design (NG-ZORRO), and REST APIs, taking ownership of responsive layouts, UI component consistency, and security hardening across all modules."
    ),
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
    name: "CIS Managed Services",
    period: bi("2025 – 2026", "2025 – 2026"),
    company: bi("PT Sigma Cipta Caraka", "PT Sigma Cipta Caraka"),
    description: bi(
      "Aplikasi enterprise Corporate Information System (CIS) dalam skema pemeliharaan managed services.",
      "Enterprise Corporate Information System (CIS) applications under managed services maintenance."
    ),
    role: bi(
      "Menyelesaikan tiket perbaikan bug frontend dan menindaklanjuti temuan keamanan sisi frontend pada 2 aplikasi Corporate Information System (CIS).",
      "Resolved frontend bug-fix tickets and remediated frontend-related security findings across 2 Corporate Information System (CIS) applications."
    ),
    tech: ["Vue.js", "Nuxt", "TypeScript", "Tailwind CSS", "Pinia", "REST API"],
  },
  {
    id: "pis-mars",
    name: "PIS MARS",
    period: bi("Apr 2026 – Jun 2026", "Apr 2026 – June 2026"),
    company: bi(
      "PT Sigma Cipta Caraka (Klien: Pertamina International Shipping)",
      "PT Sigma Cipta Caraka (Client: Pertamina International Shipping)"
    ),
    description: bi(
      "Aplikasi enterprise Management of Requirements SH IML (MARS) untuk Pertamina International Shipping (PIS), dibangun dengan Blazor/.NET 8.",
      "Enterprise Management of Requirements SH IML (MARS) application for Pertamina International Shipping (PIS), built with Blazor/.NET 8."
    ),
    role: bi(
      "Menyempurnakan antarmuka dan alur kerja serta memperbaiki bug pada sistem enterprise Blazor/.NET 8 yang sudah berjalan.",
      "Improved UI and workflows and fixed bugs on an existing Blazor/.NET 8 enterprise system."
    ),
    tech: [".NET 8", "C#", "Blazor", "REST API", "Microservices"],
  },
  {
    id: "caterine-cm",
    name: "Caterine (Change Management)",
    period: bi("Agu 2025 – Des 2025", "Aug 2025 – Dec 2025"),
    company: bi("PT Sigma Cipta Caraka", "PT Sigma Cipta Caraka"),
    description: bi(
      "Aplikasi web IT Service Management (ITSM) untuk pengelolaan operasional layanan enterprise.",
      "IT Service Management (ITSM) web application for enterprise service operations."
    ),
    role: bi(
      "Mengembangkan modul Change Management dan menangani change request (CR) antarmuka menggunakan Vue.js dan Pinia.",
      "Developed Change Management UI modules and handled change requests (CR) using Vue.js and Pinia."
    ),
    tech: ["Vue.js", "Vite", "Tailwind CSS", "Pinia", "REST API"],
  },
  {
    id: "cart",
    name: "CART",
    period: bi("Jan 2025 – Feb 2025", "Jan 2025 – Feb 2025"),
    company: bi("PT Sigma Cipta Caraka", "PT Sigma Cipta Caraka"),
    description: bi(
      "Continuous Automated Red Teaming — aplikasi web untuk manajemen kerentanan sistem dan intelijen ancaman siber.",
      "Continuous Automated Red Teaming — a web application for system vulnerability management and cyber threat intelligence."
    ),
    role: bi(
      "Mengimplementasikan navigasi menu dan modul antarmuka intelijen ancaman siber menggunakan Nuxt dan Headless UI.",
      "Implemented cybersecurity threat intelligence and vulnerability management menu navigation using Nuxt and Headless UI."
    ),
    tech: ["Nuxt", "Vue.js", "Tailwind CSS", "Headless UI", "Pinia"],
  },
  {
    id: "netmonk",
    name: "Netmonk Analytics",
    period: bi("Jan 2023 – Des 2023", "Jan 2023 – Dec 2023"),
    company: bi("PT Telkom Indonesia", "PT Telkom Indonesia"),
    description: bi(
      "Dasbor analitik pemenuhan pesanan (order fulfillment) untuk 7 regional (TREG) dan 40+ kantor cabang (WITEL), terintegrasi dengan dasbor Metabase tertanam dan keamanan akses JWT.",
      "Order fulfillment analytics dashboard across 7 regional divisions (TREG) and 40+ branch offices (WITEL), with embedded Metabase dashboards and JWT access security."
    ),
    role: bi(
      "Membangun frontend Netmonk Analytics menggunakan React, Tailwind CSS, dan Redux sebagai proyek akhir magang; turut memelihara antarmuka Netmonk HI.",
      "Built the frontend for Netmonk Analytics using React, Tailwind CSS, and Redux as an internship capstone project; supported maintenance of Netmonk HI interface."
    ),
    tech: ["React", "Tailwind CSS", "Redux", "Metabase", "JWT", "REST API"],
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
