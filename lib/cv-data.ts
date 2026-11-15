import type { Lang } from "@/lib/language-context"

export type Bi = Record<Lang, string>

function bi(id: string, en: string): Bi {
  return { id, en }
}

export const profile = {
  name: "Muhammad Hadid Wiransetyo",
  initials: "MHW",
  photo: "/images/profile.jpg",
  avatar: "/images/pixel-art-avatar-chibi-suit-portrait.png",
  cvFile: bi(
    "/cv/Muhammad-Hadid-Wiransetyo-CV-2026-ID.pdf",
    "/cv/Muhammad-Hadid-Wiransetyo-CV-2026.pdf"
  ),
  location: bi("Semarang, Indonesia", "Semarang, Indonesia"),
  role: bi("Frontend Engineer", "Frontend Engineer"),
  tagline: bi(
    "Membangun antarmuka web yang rapi, cepat, dan mudah dipelihara.",
    "Building clean, fast, and maintainable web interfaces."
  ),
  summary: bi(
    "Frontend Engineer lulusan Ilmu Komputer Universitas Gadjah Mada (S.Kom., IPK 3,74/4,00) dengan pengalaman profesional selama 2 tahun dalam mengembangkan dan meningkatkan keamanan 10 aplikasi web enterprise di PT Sigma Cipta Caraka (Telkomsigma), serta produk digital lainnya. Menguasai TypeScript, React 18/19, Next.js (App Router dan React Server Components), Tailwind CSS v4, dan TanStack Query. Berpengalaman membangun antarmuka modular, menulis pengujian otomatis dengan Vitest, dan meningkatkan keamanan frontend melalui mitigasi XSS, penerapan CSP, serta validasi tanda tangan biner berkas (magic bytes). Terbiasa berkolaborasi dengan enam peran lintas fungsi dalam tim Agile/Scrum. Mengutamakan kualitas kode, performa, dan kemudahan pemeliharaan aplikasi.",
    "Frontend Engineer with a Bachelor's degree in Computer Science from Universitas Gadjah Mada (GPA 3.74/4.00) and 2 years of professional experience developing and securing 10 enterprise web applications at PT Sigma Cipta Caraka (Telkomsigma), alongside other digital products. Skilled in TypeScript, React 18/19, Next.js (App Router and React Server Components), Tailwind CSS v4, and TanStack Query. Experienced in building modular interfaces, writing automated tests with Vitest, and strengthening frontend security through XSS mitigation, CSP implementation, and binary file signature (magic bytes) validation. Collaborated with colleagues in six cross-functional roles in Agile/Scrum teams, with a focus on code quality, performance, and maintainability."
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
  instagram: {
    label: "@hadidwirsty",
    href: "https://www.instagram.com/hadidwirsty/",
  },
  threads: {
    label: "@hadidwirsty",
    href: "https://www.threads.com/@hadidwirsty",
  },
  strava: {
    label: "hadidwirsty",
    href: "https://www.strava.com/athletes/hadidwirsty",
  },
  youtube: {
    label: "Hadid Wirsty",
    href: "https://www.youtube.com/@hadidwirsty",
  },
  metrics: [
    {
      value: "2+",
      label: bi("Tahun Pengalaman", "Years of Experience"),
      description: bi(
        "Frontend & Aplikasi Enterprise",
        "Frontend & Enterprise Web"
      ),
    },
    {
      value: "10+",
      label: bi("Aplikasi Web Enterprise", "Enterprise Web Apps"),
      description: bi(
        "Telkomsigma & Produk Digital",
        "Telkomsigma & Digital Products"
      ),
    },
    {
      value: "3,74",
      subvalue: "/ 4,00",
      label: bi("IPK Ilmu Komputer UGM", "UGM Computer Science GPA"),
      description: bi(
        "Sarjana Ilmu Komputer (S.Kom.)",
        "B.Sc. in Computer Science"
      ),
    },
    {
      value: "100%",
      label: bi("Tingkat Kelulusan Tes", "Automated Test Pass Rate"),
      description: bi(
        "297 Pengujian Vitest & Audit Dokumen",
        "297 Vitest Tests & Document Audit"
      ),
    },
  ],
}

export const nav = {
  home: bi("Beranda", "Home"),
  about: bi("Tentang", "About"),
  experience: bi("Pengalaman", "Experience"),
  projects: bi("Proyek", "Projects"),
  skills: bi("Keahlian", "Skills"),
  education: bi("Pendidikan", "Education"),
  certifications: bi("Sertifikasi", "Certifications"),
  achievements: bi("Prestasi & Organisasi", "Achievements & Organizations"),
  contact: bi("Kontak", "Contact"),
}

export const ui = {
  downloadCv: bi("Unduh CV", "Download CV"),
  contactMe: bi("Hubungi Saya", "Contact Me"),
  contactPrompt: bi(
    "Tertarik berkolaborasi atau memiliki peluang yang relevan? Mari berdiskusi.",
    "Interested in collaborating or discussing an opportunity? Let's connect."
  ),
  present: bi("Sekarang", "Present"),
  keyProjects: bi("Proyek Terkait", "Related Projects"),
  showAllCerts: bi("Tampilkan Semua Sertifikasi", "Show All Certifications"),
  showLessCerts: bi("Tampilkan Lebih Sedikit", "Show Less"),
  viewProject: bi("Lihat Detail", "View Details"),
  role: bi("Peran", "Role"),
  techStack: bi("Teknologi", "Tech Stack"),
  organization: bi("Organisasi", "Organizations"),
  volunteering: bi("Kegiatan Sukarela", "Volunteering"),
  gpa: bi("IPK", "GPA"),
  score: bi("Skor", "Score"),
  thesis: bi("Skripsi", "Thesis"),
  footerNote: bi(
    "Dibangun dengan Next.js, Tailwind CSS, dan shadcn/ui.",
    "Built with Next.js, Tailwind CSS, and shadcn/ui."
  ),
  availableFor: bi(
    "Terbuka untuk peluang karier baru sebagai Frontend Engineer.",
    "Open to new opportunities as a Frontend Engineer."
  ),
  openToWork: bi("Terbuka untuk Peluang Kerja", "Open to Work"),
  openToWorkShort: bi("Siap Bekerja", "Open to Work"),
  copyEmail: bi("Salin Email", "Copy Email"),
  copied: bi("Email Disalin!", "Copied!"),
  greeting: bi("Halo 👋", "Hi 👋"),
  backToTop: bi("Kembali ke Atas", "Back to Top"),
  contactSubcopy: bi(
    "Siap membantu membangun aplikasi web enterprise yang cepat, aman, dan mudah dikembangkan.",
    "Ready to help build fast, secure, and scalable enterprise web applications."
  ),
  contactSheetTitle: bi("Lembar Kontak 01", "Contact Sheet 01"),
  sheetNumber: bi("Lembar 1/1", "Sheet 1/1"),
  dragStickerHint: bi("Coba geser stikernya", "Try dragging the stickers"),
  shuffle: bi("Acak", "Shuffle"),
  tidyUp: bi("Rapikan", "Tidy up"),
  madeInSemarang: bi("Dibuat di Semarang", "Made in Semarang"),
  stickerAreaLabel: bi(
    "Stiker kontak yang bisa digeser",
    "Draggable contact stickers"
  ),
  sayHi: bi("Halo!", "Say hi!"),
  tickerStrip: bi(
    "AYO TERHUBUNG · TERBUKA UNTUK PELUANG KERJA · SEMARANG ·",
    "LET'S CONNECT · OPEN TO WORK · SEMARANG ·"
  ),
  navigation: bi("Navigasi", "Navigation"),
  connect: bi("Mari Terhubung", "Connect"),
  basedIn: bi("Berdomisili di", "Based in"),
  collaboration: bi("Kolaborasi", "Collaboration"),
  letsBuildTogether: bi(
    "Yuk, bangun sesuatu bersama.",
    "Let's build something together."
  ),
  stickerPopovers: {
    email: bi("Kirim email ke saya", "Send me an email"),
    github: bi(
      "Lihat profil dan repositori GitHub",
      "View my GitHub profile and repositories"
    ),
    linkedin: bi("Terhubung di LinkedIn", "Connect on LinkedIn"),
    instagram: bi("Ikuti saya di Instagram", "Follow me on Instagram"),
    threads: bi("Ikuti saya di Threads", "Follow me on Threads"),
    website: bi(
      "Kunjungi hadidwirsty.vercel.app",
      "Visit hadidwirsty.vercel.app"
    ),
    cv: bi("Unduh CV (PDF)", "Download CV (PDF)"),
    avatar: bi("Avatar piksel Hadidwirsty", "Hadidwirsty's pixel avatar"),
    "open-to-work": bi(
      "Terbuka untuk peluang kerja baru",
      "Open to new opportunities"
    ),
    strava: bi("Aktivitas lari di Strava", "Strava running activities"),
    youtube: bi("Saluran YouTube", "YouTube channel"),
    react: bi(
      "Ekosistem React dan UI modular",
      "React ecosystem and modular UI"
    ),
    nextjs: bi(
      "Next.js App Router & Server Actions",
      "Next.js App Router & Server Actions"
    ),
    typescript: bi(
      "TypeScript dengan pemeriksaan tipe yang ketat",
      "TypeScript with strict type checking"
    ),
    "tailwind-css": bi(
      "Styling berbasis utilitas dengan Tailwind CSS",
      "Utility-first styling with Tailwind CSS"
    ),
  },
}

export const subpages = {
  about: {
    title: bi("Tentang", "About"),
    description: bi(
      "Frontend Engineer yang berfokus pada TypeScript, React, Next.js, dan pengembangan aplikasi web enterprise berperforma tinggi.",
      "Frontend Engineer specializing in TypeScript, React, Next.js, and high-performance enterprise web applications."
    ),
  },
  contact: {
    title: bi("Kontak", "Contact"),
    description: bi(
      "Terbuka untuk peluang baru di bidang pengembangan perangkat lunak. Hubungi saya melalui email atau terhubung lewat LinkedIn dan GitHub.",
      "Open to new software engineering opportunities. Reach out by email or connect with me on LinkedIn and GitHub."
    ),
  },
  portfolio: {
    title: bi("Portofolio", "Portfolio"),
    description: bi(
      "Jelajahi 10 aplikasi web enterprise yang saya kerjakan, mulai dari manajemen aset dan layanan TI hingga keamanan siber, pengadaan, dan produk digital.",
      "Explore 10 enterprise web applications I've worked on, spanning asset and IT service management, cybersecurity, procurement, and digital products."
    ),
  },
  stack: {
    title: bi("Keahlian", "Tech Stack"),
    description: bi(
      "Enam bidang keahlian utama yang mencakup TypeScript, React, Next.js, sistem styling, pengujian, dan keamanan aplikasi web.",
      "Six core areas of expertise spanning TypeScript, React, Next.js, styling systems, testing, and web application security."
    ),
  },
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
    role: bi("Junior Programmer", "Junior Programmer"),
    period: bi("Nov 2024 – Okt 2026", "Nov 2024 – Oct 2026"),
    location: bi(
      "Yogyakarta, Indonesia (On-site)",
      "Yogyakarta, Indonesia (On-site)"
    ),
    employmentType: bi("Kontrak", "Contract"),
    summary: bi(
      "Mengembangkan dan memelihara antarmuka serta meningkatkan keamanan frontend pada 10 aplikasi web enterprise untuk klien B2B dan kebutuhan internal Telkom Group menggunakan Next.js, React, Angular, Vue/Nuxt, dan Blazor. Bekerja dalam tim Agile/Scrum bersama Scrum Master dan Business Analyst untuk memahami kebutuhan pengguna; menerjemahkan spesifikasi System Analyst dan rancangan UI/UX menjadi komponen modular; mengintegrasikan REST API bersama Backend Engineer; serta berkolaborasi dengan tim QA dalam pengujian fungsional dan perbaikan bug hingga aplikasi siap dirilis.",
      "Developed and maintained frontend interfaces and improved security across 10 enterprise web applications for B2B clients and internal Telkom Group teams using Next.js, React, Angular, Vue/Nuxt, and Blazor. Worked in Agile/Scrum teams with Scrum Masters and Business Analysts to refine user requirements; translated System Analyst specifications and UI/UX designs into modular components; collaborated with Backend Engineers on REST API integration; and partnered with QA teams on functional testing and bug fixes ahead of production releases."
    ),
    points: [
      bi(
        "IMAPS BPJS Kesehatan: Mengembangkan antarmuka aplikasi web manajemen siklus hidup aset tetap BPJS Kesehatan menggunakan Angular 18, TypeScript, dan Ant Design (NG-ZORRO) untuk digitalisasi inventarisasi dan akuntabilitas aset kantor cabang nasional; mengimplementasikan modul daftar aset, alur persetujuan bertingkat (approval asset multi-tab), modul usulan penghapusan, dan manajemen pengguna; serta mengintegrasikan REST API dengan tipe data yang terdefinisi dan konfigurasi keamanan header anti-clickjacking.",
        "IMAPS BPJS Kesehatan: Developed the frontend for the BPJS Kesehatan enterprise fixed asset lifecycle management application using Angular 18, TypeScript, and Ant Design (NG-ZORRO) to digitize inventory and audit accountability across nationwide branch offices; implemented the asset directory, multi-stage approval modules (multi-tab asset approvals), asset disposal proposal flows, and user management; integrated type-safe REST API integrations and configured anti-clickjacking security headers."
      ),
      bi(
        "CART (Continuous Automated Red Teaming): Memelihara dan menyempurnakan antarmuka aplikasi web manajemen kerentanan dan intelijen ancaman siber (CART) untuk pemantauan postur keamanan aset digital korporat menggunakan Nuxt 3, Vue.js, TypeScript, dan Tailwind CSS; mengimplementasikan modul konfigurasi paket pengujian keamanan (packages), manajemen domain klien, serta dialog template pemindaian; mengintegrasikan formulir dengan validasi skema (Vee-Validate + Yup) dengan REST API dan manajemen state Pinia; serta memelihara konsistensi sistem desain antarmuka.",
        "CART (Continuous Automated Red Teaming): Maintained and enhanced frontend interfaces for the CART vulnerability management and cyber threat intelligence web application to monitor corporate attack surfaces using Nuxt 3, Vue.js, TypeScript, and Tailwind CSS; implemented security testing package configuration modules (packages), client domain management, and scan template modals; integrated schema-validated forms (Vee-Validate + Yup) with REST APIs and Pinia state management; maintained design system consistency across application layouts."
      ),
      bi(
        "Info Tender (LPSE & SiRUP): Mengembangkan antarmuka aplikasi web intelijen pasar pengadaan barang dan jasa pemerintah untuk tim Sales Support menggunakan React 18, TypeScript, Vite, Tailwind CSS, dan Radix UI; mengimplementasikan dasbor analitik lelang (Recharts), katalog tender LPSE dan rencana pengadaan SiRUP (TanStack Table), fitur perbandingan data tender berdampingan, serta modul konfigurasi parameter scraping (kata kunci KBLI); merancang sistem pelacakan durasi interaksi pengguna (dwell tracker) terintegrasi perutean aplikasi; mengintegrasikan REST API dengan TanStack Query dan Zustand; serta mengelola kontrol akses berbasis peran (RBAC).",
        "Info Tender (LPSE & SiRUP): Developed the frontend for the government procurement market intelligence web application supporting the Sales Support team using React 18, TypeScript, Vite, Tailwind CSS, and Radix UI; implemented procurement analytics dashboards (Recharts), LPSE tenders and SiRUP planning catalogs (TanStack Table), side-by-side data comparison tools, and scraping parameter configuration modules (KBLI keywords); designed an automated route-integrated user session dwell-tracker; integrated REST APIs with TanStack Query and Zustand; maintained role-based access control (RBAC)."
      ),
      bi(
        "MONARA (Monitoring Natal-Tahun Baru dan Ramadan): Mengembangkan antarmuka aplikasi web pemantauan operasional tiket layanan TI untuk tim Service Desk menggunakan Next.js (App Router), React 19, TypeScript, Tailwind CSS, dan Radix UI; mengimplementasikan dasbor pemantauan status tiket dengan pembaruan data otomatis berkala (polling interval 30 detik), grafik analitik Recharts, modul master data shift kerja dan sekitar 40 unit penyedia layanan, serta formulir pengunggahan bukti penanganan; merancang alur validasi pergantian jam kerja petugas (shift schedule); mengintegrasikan REST API dengan TanStack Query dan Zustand; serta mengelola kontrol akses berbasis peran (RBAC).",
        "MONARA (Christmas, New Year & Ramadan Monitoring): Developed the frontend for the IT service ticket operations monitoring web application supporting the Service Desk team using Next.js (App Router), React 19, TypeScript, Tailwind CSS, and Radix UI; implemented ticket status monitoring dashboards with automated polling updates (30-second intervals), Recharts analytics, work shift and about 40 service-provider units master data modules, and resolution evidence upload forms; designed shift schedule validation workflows; integrated REST APIs with TanStack Query and Zustand; maintained role-based access control (RBAC)."
      ),
      bi(
        "Alisa 2.0 (Smart Contracting): Mengembangkan antarmuka modul Smart Contracting dan Host Shell micro-frontend untuk sistem manajemen kontrak enterprise Infomedia Nusantara menggunakan Vite, React 19, Ant Design 5, Tailwind CSS, dan Module Federation; mengimplementasikan alur peninjauan pesanan legal, modul konfigurasi tipe dan tahapan kontrak, serta pratinjau dokumen PDF sisi klien (@react-pdf/renderer); merancang antarmuka penyusunan formulir berbasis seret-dan-lepas (drag-and-drop); mengintegrasikan REST API dengan TanStack Query dan Zustand; serta memelihara konsistensi routing lintas micro-frontend (TanStack Router).",
        "Alisa 2.0 (Smart Contracting): Developed the Smart Contracting module and micro-frontend Host Shell for Infomedia Nusantara's enterprise contract management system using Vite, React 19, Ant Design 5, Tailwind CSS, and Module Federation; implemented legal order review workflows, contract type and stage configuration modules, and client-side PDF document previews (@react-pdf/renderer); designed drag-and-drop form builder interfaces; integrated REST APIs with TanStack Query and Zustand; maintained federated routing consistency (TanStack Router)."
      ),
      bi(
        "IS-WARE (Proof of Concept – PT KBI): Mengembangkan purwarupa aplikasi web sistem manajemen resi gudang terintegrasi dalam sprint 2 minggu untuk proposal teknis klien PT Kliring Berjangka Indonesia (Grup Danareksa) menggunakan Next.js (App Router), React 19, TypeScript, dan Tailwind CSS; mengimplementasikan modul penerbitan resi gudang (Warehouse Receipt), integrasi dokumen asuransi dan Lembaga Pemeriksa Kesesuaian (LPK), alur pelacakan riwayat (audit trail), serta data master komoditas dan gudang; mengintegrasikan REST API dengan TanStack Query dan Zustand; serta mengelola kontrol akses berbasis peran (RBAC 5 peran) hingga proposal meraih peringkat #1 pada evaluasi teknis.",
        "IS-WARE (Proof of Concept – PT KBI): Developed an integrated warehouse receipt management system web prototype in a 2-week sprint for the technical proposal to PT Kliring Berjangka Indonesia (Danareksa Group) using Next.js (App Router), React 19, TypeScript, and Tailwind CSS; implemented warehouse receipt issuance workflows, insurance and inspection agency (LPK) document integrations, audit trail tracking, and commodity/warehouse master data; integrated REST APIs with TanStack Query and Zustand; maintained role-based access control (5 user roles), helping the technical proposal achieve rank #1 in client evaluation."
      ),
      bi(
        "Caterine (Change Management): Memelihara antarmuka modul Change Management pada platform enterprise IT Service Management (ITSM) Telkomsigma menggunakan Vue 3 (Composition API), TypeScript, Vite, Tailwind CSS, dan Pinia dalam skema penanganan tiket perbaikan bug dan Change Request (CR); mengimplementasikan alur persetujuan Change Advisory Board (CAB: penambahan, delegasi ulang, dan penghapusan peninjau), matriks 35 dokumen justifikasi wajib perubahan, serta modul manajemen tugas teknis (task assignment); merancang validasi hak akses berbasis peran koordinator perubahan; mengintegrasikan REST API dengan penanganan status draf lokal; serta memelihara pengujian unit dan alur kerja verifikasi perubahan.",
        "Caterine (Change Management): Maintained Change Management module interfaces for Telkomsigma's enterprise IT Service Management (ITSM) platform using Vue 3 (Composition API), TypeScript, Vite, Tailwind CSS, and Pinia, resolving bug-fix tickets and Change Request (CR) tasks; implemented Change Advisory Board (CAB) approval workflows (assign, re-assign, and remove approvers), a 35-item mandatory justification document matrix, and technical task assignment modules; designed role-based access validation for change coordinators; integrated REST APIs with local pending state management; maintained unit testing and change verification workflows."
      ),
      bi(
        "Whistleblowing System (WBS Internal): Mengembangkan antarmuka aplikasi web Whistleblowing System internal bagi Tim Pengelola WBS Telkomsigma untuk penanganan dugaan pelanggaran etik dan tata kelola perusahaan (ISO 37002) menggunakan Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, dan TanStack Query; mengimplementasikan dasbor analitik eksekutif dengan grafik Recharts, tabel data penelaahan kasus multi-tahap (validasi-verifikasi dan pemeriksaan), serta formulir registrasi pengaduan multi-kanal (surat, telepon, dan email); merancang lapisan keamanan pengunggahan berkas bukti berbasis inspeksi tanda tangan biner (magic bytes) dan integrasi pemindaian virus ClamAV; mengintegrasikan dukungan multi-bahasa (i18next) dan manajemen formulir kuesioner; serta mengelola kontrol akses berbasis peran (RBAC).",
        "Whistleblowing System (Internal WBS): Developed internal Whistleblowing System web application interfaces for Telkomsigma's WBS Management Team to handle corporate ethics and governance violation cases (ISO 37002) using Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, and TanStack Query; implemented executive analytics dashboards with Recharts, multi-stage case assessment data tables (validation-verification and inspection), and multi-channel report registration forms (letter, phone, and email); designed evidence file upload security layers based on binary file signature inspection (magic bytes) and ClamAV antivirus scanning integration; integrated multilingual support (i18next) and configurable questionnaire management modules; maintained role-based access control (RBAC)."
      ),
      bi(
        "PIS MARS (Pertamina International Shipping): Mengembangkan dan memelihara antarmuka portal web enterprise serta sistem manajemen konten (CMS) PT Pertamina International Shipping menggunakan C#, .NET 8.0, ASP.NET Core, dan Blazor Server (Interactive Server Mode) dalam arsitektur microservices; menstandardisasi pewarisan kelas dasar dan siklus hidup komponen pada pustaka antarmuka Oktaf.UI lintas 384 berkas komponen Razor; mengimplementasikan penanganan deserialisasi nilai null dan peningkatan stabilitas pada modul Form Builder serta editor CMS; merancang antarmuka navigasi bertingkat (StickyMenu) dengan indikator tahapan; mengintegrasikan Mock Authentication Middleware pada 6 microservice backend untuk simulasi otorisasi peran (RBAC) di lingkungan pengembangan lokal; serta memelihara konfigurasi konfigurasi kontainer Docker.",
        "PIS MARS (Pertamina International Shipping): Developed and maintained enterprise web portal interfaces and content management systems (CMS) for PT Pertamina International Shipping using C#, .NET 8.0, ASP.NET Core, and Blazor Server (Interactive Server Mode) within a microservices architecture; standardized base component inheritance and lifecycle execution across the Oktaf.UI Razor component library across 384 Razor component files; implemented null deserialization safeguards and stability enhancements on the Form Builder and CMS editor; designed multi-level navigation interfaces (StickyMenu) with step progress indicators; integrated Mock Authentication Middleware across 6 backend microservices to simulate role-based authorization (RBAC) in local environments; maintained Docker containerization configurations."
      ),
      bi(
        "Pemeliharaan Aplikasi Web Enterprise & Portal Operasional: Mengembangkan pembaruan antarmuka, memperbaiki bug, dan mengimplementasikan perbaikan keamanan frontend pada 2 aplikasi web enterprise menggunakan Vue.js, Nuxt.js, TypeScript, dan Tailwind CSS; mengimplementasikan composable sanitasi data (useSanitize, useSvgSanitizer) dan Content Security Policy (CSP) untuk penguatan terhadap Cross-Site Scripting (XSS); merancang sanitasi URL pengalihan login guna mencegah celah Open Redirect; memasang pelindung kompatibilitas Server-Side Rendering (SSR guards) untuk stabilitas di lingkungan Node 22; serta menguji dan memperbaiki logika penguraian ID Purchase Order dan integrasi REST API publik.",
        "Enterprise Web Applications Maintenance & Operations Portal: Developed frontend updates, resolved bug-fix tickets, and implemented frontend security remediations across 2 enterprise web applications using Vue.js, Nuxt.js, TypeScript, and Tailwind CSS; implemented data sanitization composables (useSanitize, useSvgSanitizer) and Content Security Policy (CSP) headers to harden against Cross-Site Scripting (XSS); designed login redirect URL sanitization to prevent Open Redirect vulnerabilities; implemented Server-Side Rendering (SSR) compatibility guards ensuring stability in Node 22 environments; tested and fixed Purchase Order ID parsing logic and public REST API integrations."
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
        "Merancang dan mengembangkan pengelolaan state keranjang belanja untuk situs e-commerce pesanan partai besar menggunakan Next.js 16 (App Router), TypeScript, Zustand, dan TanStack Query v5. Menerapkan pembaruan antarmuka optimistis dengan pemulihan state otomatis ketika terjadi gangguan jaringan, serta menguji alur transaksi pemesanan dalam jumlah besar.",
        "Designed and implemented shopping cart state management for a bulk-order e-commerce website using Next.js 16 (App Router), TypeScript, Zustand, and TanStack Query v5. Added optimistic UI updates with automatic state rollback on network failures and tested bulk-order checkout flows."
      ),
      bi(
        "Mengembangkan alur pembayaran bertahap (split payment) dan panel pemenuhan pesanan per item, termasuk pencegahan duplikasi kartu resi pengiriman. Memelihara sanitasi input sisi klien menggunakan isomorphic-dompurify untuk mengurangi risiko XSS.",
        "Developed split-payment workflows and an item-level order fulfillment panel, including duplicate shipment tracking card prevention. Maintained client-side input sanitization with isomorphic-dompurify to reduce XSS risks."
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
        "Mengembangkan purwarupa aplikasi web analitik operasional telekomunikasi Netmonk Analytics menggunakan React, Tailwind CSS, Redux Toolkit, dan RTK Query untuk memantau progres pemenuhan pesanan di 7 divisi regional (TREG) dan lebih dari 40 wilayah telekomunikasi (Witel). Merancang mekanisme keamanan akses dasbor Metabase yang disematkan dengan token JWT bertanda tangan kriptografis. Pengembangan ini menjadi bagian dari skripsi sarjana di UGM (IPK 3,74/4,00).",
        "Developed the Netmonk Analytics web prototype using React, Tailwind CSS, Redux Toolkit, and RTK Query to monitor telecommunications order fulfillment across 7 regional divisions (TREG) and more than 40 telecommunications areas (Witel). Designed secure access to embedded Metabase dashboards using cryptographically signed JWTs. The work formed part of an undergraduate thesis at UGM (GPA 3.74/4.00)."
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
      "Aplikasi web full-stack untuk mengelola operasional dan keuangan armada truk semen curah milik bisnis keluarga. Sistem ini menggantikan pencatatan manual dengan pengelolaan ritase, referensi tarif untuk 296 rute pabrik, perhitungan PPh 23 (1,2%), pembagian keuntungan investor, dan dasbor analitik berbasis Recharts.",
      "A full-stack web application for managing the operations and finances of a family-owned bulk cement trucking business. It replaces manual records with trip tracking, a rate catalog for 296 factory routes, PPh 23 tax calculations (1.2%), investor profit sharing, and Recharts analytics dashboards."
    ),
    role: bi(
      "Merancang dan mengembangkan aplikasi web full-stack manajemen operasional dan keuangan armada truk semen curah menggunakan Next.js 16 (App Router berbasis Server Components dan Server Actions), React 19, TypeScript, Tailwind CSS v4, dan Drizzle ORM (PostgreSQL); mengimplementasikan kalkulasi otomatis tarif angkutan lintas 296 rute pabrik semen nasional, pemotongan pajak PPh 23 (1,2%), rekapitulasi beban armada, serta modul penutupan buku bagi hasil investor; merancang modul Pure Domain Engine yang divalidasi oleh 297 pengujian otomatis Vitest (100% lulus); mengintegrasikan autentikasi Better-Auth dengan kontrol akses berbasis peran (RBAC); serta memelihara dasbor analitik visual Recharts.",
      "Designed and developed a full-stack operations and financial management web application for a bulk cement truck fleet using Next.js 16 (App Router leveraging Server Components and Server Actions), React 19, TypeScript, Tailwind CSS v4, and Drizzle ORM (PostgreSQL); implemented automated freight tariff calculations across 296 national cement factory routes, PPh 23 tax deductions (1.2%), fleet expense tracking, and monthly investor profit-sharing workflows; designed a Pure Domain Engine validated by 297 automated Vitest tests (100% pass); integrated Better-Auth authentication with role-based access control (RBAC); maintained interactive Recharts analytics dashboards."
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
    description: bi(
      "Purwarupa sistem manajemen resi gudang terintegrasi yang diselesaikan dalam sprint 2 minggu untuk proposal teknis PT Kliring Berjangka Indonesia (Grup Danareksa). Mencakup penerbitan resi, integrasi dokumen asuransi dan LPK, rekam jejak audit, serta kontrol akses untuk 5 peran pengguna.",
      "An integrated warehouse receipt management prototype delivered in a 2-week sprint for a technical proposal to PT Kliring Berjangka Indonesia (Danareksa Group). Features include receipt issuance, insurance and inspection agency (LPK) document integration, audit trails, and access controls for 5 user roles."
    ),
    role: bi(
      "Mengembangkan arsitektur purwarupa dan modul penerbitan resi gudang dalam sprint 2 minggu menggunakan Next.js (App Router), React 19, TypeScript, dan Tailwind CSS. Mengimplementasikan rekam jejak audit, integrasi dokumen asuransi dan LPK, serta data master gudang. Kontribusi ini mendukung proposal yang meraih peringkat pertama dalam evaluasi teknis klien.",
      "Developed the prototype architecture and warehouse receipt issuance modules in a 2-week sprint using Next.js (App Router), React 19, TypeScript, and Tailwind CSS. Implemented audit trails, insurance and LPK document integration, and warehouse master data. This work contributed to a proposal that ranked first in the client's technical evaluation."
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
    description: bi(
      "Sistem manajemen konten (CMS) untuk Infomedia Nusantara yang dibangun dengan arsitektur microservices dan micro-frontend berbasis Module Federation.",
      "A content management system (CMS) for Infomedia Nusantara, built using a microservices architecture and a Module Federation-based micro-frontend."
    ),
    role: bi(
      "Mengembangkan modul Smart Contracting untuk pengelolaan kontrak, peninjauan pesanan legal, dan konfigurasi kontrak, sekaligus merancang Host Shell micro-frontend berbasis Module Federation menggunakan Vite, React 19, Ant Design 5, dan TanStack Router.",
      "Developed Smart Contracting features for contract management, legal order reviews, and contract configuration, and designed a Module Federation-based micro-frontend Host Shell using Vite, React 19, Ant Design 5, and TanStack Router."
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
    company: bi("PT Sigma Cipta Caraka", "PT Sigma Cipta Caraka"),
    description: bi(
      "Aplikasi Whistleblowing System (WBS) internal bagi Tim Pengelola WBS Telkomsigma untuk menangani laporan dugaan pelanggaran etika dan tata kelola perusahaan sesuai prinsip ISO 37002. Fitur utamanya meliputi dasbor analitik, penelaahan kasus bertahap, registrasi laporan dari berbagai kanal, dan pengunggahan bukti secara aman.",
      "An internal Whistleblowing System (WBS) for Telkomsigma's WBS Management Team to handle reports of suspected ethics and corporate governance violations in line with ISO 37002. Key features include analytics dashboards, multi-stage case reviews, multi-channel report registration, and secure evidence uploads."
    ),
    role: bi(
      "Mengembangkan antarmuka aplikasi web Whistleblowing System internal bagi Tim Pengelola WBS Telkomsigma untuk penanganan dugaan pelanggaran etik dan tata kelola perusahaan (ISO 37002) menggunakan Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, dan TanStack Query; mengimplementasikan dasbor analitik eksekutif dengan grafik Recharts, tabel data penelaahan kasus multi-tahap (validasi-verifikasi dan pemeriksaan), serta formulir registrasi pengaduan multi-kanal (surat, telepon, dan email); merancang lapisan keamanan pengunggahan berkas bukti berbasis inspeksi tanda tangan biner (magic bytes) dan integrasi pemindaian virus ClamAV; mengintegrasikan dukungan multi-bahasa (i18next) dan manajemen formulir kuesioner; serta mengelola kontrol akses berbasis peran (RBAC).",
      "Developed internal Whistleblowing System web application interfaces for Telkomsigma's WBS Management Team to handle corporate ethics and governance violation cases (ISO 37002) using Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, and TanStack Query; implemented executive analytics dashboards with Recharts, multi-stage case assessment data tables (validation-verification and inspection), and multi-channel report registration forms (letter, phone, and email); designed evidence file upload security layers based on binary file signature inspection (magic bytes) and ClamAV antivirus scanning integration; integrated multilingual support (i18next) and configurable questionnaire management modules; maintained role-based access control (RBAC)."
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
    company: bi("PT Sigma Cipta Caraka", "PT Sigma Cipta Caraka"),
    description: bi(
      "Aplikasi web terpusat untuk memantau tiket layanan TI selama periode sibuk Ramadan serta Natal dan Tahun Baru. Digunakan oleh tim Service Desk dan Operasional Layanan untuk memantau sekitar 40 unit penyedia layanan melalui pembaruan data otomatis berkala.",
      "A centralized web application for monitoring IT service tickets during the busy Ramadan and Christmas–New Year periods. It supports Service Desk and Operations teams across approximately 40 service provider units, with regularly refreshed data."
    ),
    role: bi(
      "Mengembangkan arsitektur frontend dan dasbor status tiket menggunakan Next.js (App Router), React 19, TypeScript, dan Tailwind CSS. Menerapkan pembaruan data otomatis setiap 30 detik, visualisasi Recharts, formulir unggah bukti penanganan tiket, dan modul data master jadwal kerja.",
      "Developed the frontend architecture and ticket monitoring dashboards using Next.js (App Router), React 19, TypeScript, and Tailwind CSS. Implemented automatic data polling every 30 seconds, Recharts visualizations, ticket resolution evidence uploads, and shift schedule master data modules."
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
        "Membangun modul data master operasional untuk kategori tiket, penyedia layanan, dan jadwal shift, beserta dialog detail riwayat penanganan.",
        "Built operational master data modules for ticket categories, service providers, and shift schedules, along with dialogs for viewing ticket resolution histories."
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
    company: bi("PT Sigma Cipta Caraka", "PT Sigma Cipta Caraka"),
    description: bi(
      "Aplikasi web intelijen pengadaan pemerintah yang mengolah informasi dari portal LPSE dan SiRUP. Membantu tim Sales Support dan Presales menemukan peluang tender TI, membandingkan rencana pengadaan dengan tender aktif, serta mengelola konfigurasi pengambilan data otomatis (scraping).",
      "A government procurement intelligence application that aggregates data from LPSE and SiRUP. It helps Sales Support and Presales teams identify IT tender opportunities, compare procurement plans with active tenders, and manage automated data collection (scraping)."
    ),
    role: bi(
      "Mengembangkan katalog rencana pengadaan SiRUP, dasbor analitik tender, fitur perbandingan tender berdampingan, pelacak durasi interaksi pengguna (dwell tracker), dan konfigurasi kata kunci KBLI untuk scraping menggunakan React 18, TypeScript, Vite, Tailwind CSS, TanStack Query, dan Zustand.",
      "Developed the SiRUP procurement catalog, tender analytics dashboards, side-by-side tender comparisons, user interaction duration tracking (dwell tracker), and KBLI keyword settings for scraping using React 18, TypeScript, Vite, Tailwind CSS, TanStack Query, and Zustand."
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
    description: bi(
      "Integrated Management Asset and Procurement System — aplikasi manajemen aset untuk BPJS Kesehatan.",
      "Integrated Management Asset and Procurement System — an enterprise asset management application for BPJS Kesehatan."
    ),
    role: bi(
      "Mengembangkan modul persetujuan aset bertingkat dengan navigasi beberapa tab, direktori aset tetap, usulan penghapusan aset, dan manajemen pengguna menggunakan Angular 18 dan Ant Design (NG-ZORRO). Mengintegrasikan REST API dengan TypeScript dan mengonfigurasi header keamanan untuk mencegah clickjacking.",
      "Developed multi-step asset approval workflows, a fixed asset directory, asset disposal proposals, and user management using Angular 18 and Ant Design (NG-ZORRO). Integrated type-safe REST APIs and configured anti-clickjacking security headers."
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
      "Ant Design (NG-ZORRO)",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
    ],
  },
  {
    id: "cis",
    name: "Enterprise Web Applications Maintenance & Operations Portal",
    period: bi("Mar 2026 – Sep 2026", "Mar 2026 – Sep 2026"),
    company: bi("PT Sigma Cipta Caraka", "PT Sigma Cipta Caraka"),
    description: bi(
      "Pemeliharaan dan peningkatan keamanan frontend pada 2 aplikasi web enterprise dalam layanan terkelola (managed services). Pekerjaan mencakup perbaikan temuan pemindaian kerentanan (XSS, CSP, dan Open Redirect), kompatibilitas SSR dengan Node.js 22, serta perbaikan alur transaksi pengadaan.",
      "Frontend maintenance and security improvements across 2 enterprise web applications under a managed services arrangement. Work included remediation of vulnerability scan findings (XSS, CSP, and Open Redirect), Node.js 22 SSR compatibility fixes, and procurement workflow improvements."
    ),
    role: bi(
      "Mengembangkan pembaruan antarmuka, memperbaiki bug, dan mengimplementasikan perbaikan keamanan frontend pada 2 aplikasi web enterprise menggunakan Vue.js, Nuxt.js, TypeScript, dan Tailwind CSS; mengimplementasikan composable sanitasi data (useSanitize, useSvgSanitizer) dan Content Security Policy (CSP) untuk penguatan terhadap Cross-Site Scripting (XSS); merancang sanitasi URL pengalihan login guna mencegah celah Open Redirect; memasang pelindung kompatibilitas Server-Side Rendering (SSR guards) untuk stabilitas di lingkungan Node 22; serta menguji dan memperbaiki logika penguraian ID Purchase Order dan integrasi REST API publik.",
      "Developed frontend updates, resolved bug-fix tickets, and implemented frontend security remediations across 2 enterprise web applications using Vue.js, Nuxt.js, TypeScript, and Tailwind CSS; implemented data sanitization composables (useSanitize, useSvgSanitizer) and Content Security Policy (CSP) headers to harden against Cross-Site Scripting (XSS); designed login redirect URL sanitization to prevent Open Redirect vulnerabilities; implemented Server-Side Rendering (SSR) compatibility guards ensuring stability in Node 22 environments; tested and fixed Purchase Order ID parsing logic and public REST API integrations."
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
    description: bi(
      "Portal web dan sistem manajemen konten (CMS) untuk PT Pertamina International Shipping, dikembangkan dengan C#/.NET 8 dan Blazor Server dalam arsitektur microservices. Fitur meliputi publikasi berita perusahaan, pengelolaan arsip dokumen, formulir interaktif, dan integrasi Single Sign-On.",
      "An enterprise portal and content management system (CMS) for PT Pertamina International Shipping, built with C#/.NET 8 and Blazor Server in a microservices architecture. Features include corporate news publishing, document archives, interactive forms, and Single Sign-On integration."
    ),
    role: bi(
      "Mengembangkan dan memelihara antarmuka portal web enterprise serta sistem manajemen konten (CMS) PT Pertamina International Shipping menggunakan C#, .NET 8.0, ASP.NET Core, dan Blazor Server (Interactive Server Mode) dalam arsitektur microservices; menstandardisasi pewarisan kelas dasar dan siklus hidup komponen pada pustaka antarmuka Oktaf.UI lintas ratusan berkas komponen Razor; mengimplementasikan penanganan deserialisasi nilai null dan peningkatan stabilitas pada modul Form Builder serta editor CMS; merancang antarmuka navigasi bertingkat (StickyMenu) dengan indikator tahapan; mengintegrasikan Mock Authentication Middleware pada 6 microservice backend untuk simulasi otorisasi peran (RBAC) di lingkungan pengembangan lokal; serta memelihara konfigurasi konfigurasi kontainer Docker.",
      "Developed and maintained enterprise web portal interfaces and content management systems (CMS) for PT Pertamina International Shipping using C#, .NET 8.0, ASP.NET Core, and Blazor Server (Interactive Server Mode) within a microservices architecture; standardized base component inheritance and lifecycle execution across the Oktaf.UI Razor component library across hundreds of component files; implemented null deserialization safeguards and stability enhancements on the Form Builder and CMS editor; designed multi-level navigation interfaces (StickyMenu) with step progress indicators; integrated Mock Authentication Middleware across 6 backend microservices to simulate role-based authorization (RBAC) in local environments; maintained Docker containerization configurations."
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
    company: bi("PT Sigma Cipta Caraka", "PT Sigma Cipta Caraka"),
    description: bi(
      "Aplikasi IT Service Management (ITSM) berbasis web untuk pengelolaan layanan TI perusahaan sesuai praktik ITIL. Fitur mencakup permintaan perubahan sistem, peninjauan oleh Change Advisory Board (CAB), dan verifikasi dokumen terkait risiko.",
      "An enterprise IT Service Management (ITSM) application supporting ITIL-aligned operations, including change requests, Change Advisory Board (CAB) reviews, and risk documentation checks."
    ),
    role: bi(
      "Memelihara modul Change Management pada platform ITSM menggunakan Vue 3 (Composition API), TypeScript, Vite, Tailwind CSS, dan Pinia. Menangani tiket bug dan Change Request (CR), membangun alur persetujuan CAB (penetapan dan penugasan ulang peninjau), matriks 35 dokumen justifikasi wajib, serta kontrol akses koordinator perubahan.",
      "Maintained the Change Management module of an enterprise ITSM platform using Vue 3 (Composition API), TypeScript, Vite, Tailwind CSS, and Pinia. Resolved bug tickets and Change Requests (CRs), implemented CAB approval workflows (assigning and reassigning reviewers), a matrix of 35 required justification documents, and change coordinator access controls."
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
    description: bi(
      "Aplikasi web untuk Continuous Automated Red Teaming dan Attack Surface Management yang membantu memantau kerentanan aset digital perusahaan, kebocoran kredensial, dan alur remediasi keamanan siber.",
      "A Continuous Automated Red Teaming and Attack Surface Management web application for monitoring corporate digital asset vulnerabilities, credential leaks, and cybersecurity remediation workflows."
    ),
    role: bi(
      "Memelihara dan menyempurnakan modul konfigurasi paket layanan audit keamanan siber (Packages), dialog pengelolaan domain klien, serta konsistensi tata letak dan palet warna sistem desain menggunakan Nuxt 3, Vue.js, Pinia, dan Vee-Validate/Yup.",
      "Maintained and improved cybersecurity audit package configuration (Packages), client domain management dialogs, and design system consistency using Nuxt 3, Vue.js, Pinia, and Vee-Validate/Yup."
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
    description: bi(
      "Situs e-commerce untuk pembelian dalam jumlah besar (bulk orders) dengan fitur pembayaran bertahap (split payment), pemenuhan pesanan per item, sinkronisasi filter dengan parameter URL, dan dasbor analitik penjualan berbasis Recharts.",
      "A bulk-order e-commerce website featuring split payments, item-level order fulfillment, URL-synchronized filters, and sales analytics dashboards powered by Recharts."
    ),
    role: bi(
      "Merancang dan mengimplementasikan manajemen state keranjang belanja pada situs web e-commerce pemesanan partai besar (bulk orders) menggunakan Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Zustand, dan TanStack Query; mengintegrasikan pembaruan antarmuka optimistik (optimistic UI updates) dengan pemulihan otomatis saat gangguan jaringan; mengembangkan alur pemesanan multi-tahap dan konfirmasi pelunasan bertahap (split payment); mengimplementasikan panel pemenuhan pesanan per item (item-level fulfillment) dengan pencegahan duplikasi kartu resi pengiriman; serta memelihara sanitasi input sisi klien (isomorphic-dompurify) dan visualisasi analitik Recharts.",
      "Designed and implemented cart state management for a commercial bulk-orders e-commerce website using Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Zustand, and TanStack Query; integrated optimistic UI updates with automated state rollback on network disruptions; developed multi-step checkout workflows and split payment settlement confirmations; implemented a granular item-level order fulfillment panel featuring duplicate shipment tracking card prevention; and maintained client-side input sanitization (isomorphic-dompurify) alongside Recharts analytics visualizations."
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
        "Mengimplementasikan panel pemenuhan pesanan per item (item-level fulfillment) dengan validasi pembatasan angka (clamping) dan algoritma deduplikasi kartu nomor resi pengiriman (airway bill de-duplication).",
        "Implemented a granular item-level order fulfillment panel with manual quantity input clamping and duplicate shipment tracking card prevention algorithms."
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
    company: bi("PT Telkom Indonesia", "PT Telkom Indonesia"),
    description: bi(
      "Purwarupa aplikasi analitik operasional untuk ekosistem Netmonk (PT Telkom Indonesia), dengan pemantauan pesanan layanan regional (NCX dan Scone), dasbor Metabase tertanam yang diamankan dengan JWT, serta autentikasi dual-token.",
      "An operational analytics prototype for PT Telkom Indonesia's Netmonk ecosystem, featuring regional service order tracking (NCX and Scone), JWT-secured embedded Metabase dashboards, and dual-token authentication."
    ),
    role: bi(
      "Mengembangkan purwarupa aplikasi web analitik dan operasional telekomunikasi untuk ekosistem Netmonk (PT Telkom Indonesia) menggunakan React, Vite, Tailwind CSS, Redux Toolkit, Node.js (Express), dan MongoDB; mengimplementasikan pelacakan siklus pesanan layanan telekomunikasi regional (NCX dan Scone) lintas 7 divisi regional (TREG) dan 40+ kantor wilayah telekomunikasi (Witel); merancang arsitektur keamanan akses dasbor Metabase tertanam menggunakan token JWT bertanda tangan kriptografis dengan masa kedaluwarsa 10 menit (dipertahankan sebagai skripsi sarjana di UGM dengan IPK 3,74/4,00); mengintegrasikan sistem autentikasi dual-token dengan rotasi token penyegar dan penanganan silent refresh pada RTK Query; serta memelihara kualitas basis kode melalui modernisasi toolchain ke Vite 6 dan remediasi 101 kerentanan dependensi.",
      "Developed a telecommunication operational analytics web prototype for the Netmonk ecosystem (PT Telkom Indonesia) using React, Vite, Tailwind CSS, Redux Toolkit, Node.js (Express), and MongoDB; implemented regional service order tracking workflows (NCX and Scone) across 7 regional divisions (TREG) and 40+ branch offices (Witel); designed access security architectures for embedded Metabase dashboards leveraging cryptographic JWT signing with 10-minute expiration windows (defended as undergraduate thesis at UGM, GPA 3.74/4.00); integrated dual-token authentication featuring refresh token rotation and silent re-authentication via RTK Query; and maintained codebase reliability through Vite 6 toolchain modernization and remediation of 101 nested dependency vulnerabilities."
    ),
    bullets: [
      bi(
        "Mengembangkan antarmuka pemantauan pesanan regional (NCX dan Scone) menggunakan React, Tailwind CSS, dan Netmonk Design System untuk 7 divisi regional (TREG) dan lebih dari 40 Witel di Indonesia.",
        "Built regional service order tracking interfaces (NCX and Scone) with React, Tailwind CSS, and the Netmonk Design System for 7 regional divisions (TREG) and more than 40 Witel across Indonesia."
      ),
      bi(
        "Merancang arsitektur keamanan akses dasbor Metabase tertanam menggunakan token JWT bertanda tangan kriptografis dengan masa aktif 10 menit guna mengamankan visualisasi analitik operasional (dipertahankan sebagai skripsi sarjana di UGM, IPK 3,74/4,00).",
        "Designed access security architectures for embedded Metabase dashboards leveraging cryptographic JWT signing with a 10-minute validity period to protect operational analytics (defended as undergraduate thesis at UGM, GPA 3.74/4.00)."
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
        "Memelihara keandalan repositori melalui modernisasi toolchain ke Vite 6 dan menyelesaikan 101 peringatan kerentanan dependensi bersarang hingga mencapai status nol kerentanan risiko tinggi.",
        "Maintained repository security by modernizing build toolchains to Vite 6 and remediating 101 nested dependency vulnerabilities to achieve no remaining high-risk vulnerabilities."
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
    title: bi("Bahasa Pemrograman & Framework", "Core Languages & Frameworks"),
    items: [
      "TypeScript",
      "JavaScript (ES6+)",
      "React (19/18)",
      "Next.js (App Router, RSC)",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: bi("Antarmuka & Styling", "UI & Styling"),
    items: [
      "Tailwind CSS (v3 & v4)",
      "shadcn/ui",
      "Ant Design 5",
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
    title: bi("Pengujian & Keamanan Web", "Testing & Web Security"),
    items: [
      "Vitest",
      "Jest",
      "React Testing Library",
      "DOM Sanitization (XSS Hardening)",
      "HTTP CSP Headers",
      "Magic Bytes Binary Validation",
    ],
  },
  {
    title: bi("Pengembangan Lintas Framework", "Cross-Framework Development"),
    items: [
      "Angular (17, RxJS)",
      "Vue.js / Nuxt 3 (Pinia)",
      "Blazor Server (C# / .NET 8)",
    ],
  },
  {
    title: bi("Alat & Ekosistem", "Tools & Ecosystem"),
    items: [
      "Git",
      "GitLab",
      "GitHub",
      "Bitbucket",
      "Vite",
      "Webpack",
      "Postman",
      "RESTful API Integration",
      "AWS Cloud (S3/EC2 Basics)",
      "AI-Assisted Development",
    ],
  },
]

export type EducationEntry = {
  id: string
  institution: string
  degree: Bi
  period: string
  score: Bi
  extra?: Bi
}

export const education: EducationEntry[] = [
  {
    id: "ugm",
    institution: "Universitas Gadjah Mada (UGM)",
    degree: bi(
      "Sarjana Ilmu Komputer (S.Kom.)",
      "Bachelor's Degree in Computer Science (S.Kom.)"
    ),
    period: "2020 – 2024",
    score: bi("3,74 / 4,00", "3.74 / 4.00"),
    extra: bi(
      "Skripsi: Keamanan Akses Embed Dashboard Metabase dengan JSON Web Token (JWT) pada Purwarupa Web Analytics Netmonk.",
      "Thesis: Securing Access to Embed Metabase Dashboards With JSON Web Token (JWT) in Netmonk's Prototype Web Analytics."
    ),
  },
  {
    id: "sman1-smg",
    institution: "SMA Negeri 1 Semarang",
    degree: bi("Jurusan IPA", "Science Track (IPA)"),
    period: "2017 – 2020",
    score: bi("92,27 / 100", "92.27 / 100"),
  },
]

export type CertificationEntry = {
  name: string
  issuer: string
  period: Bi | string
}

export const certifications: CertificationEntry[] = [
  {
    name: "Menjadi React Web Developer Expert",
    issuer: "Dicoding Indonesia",
    period: bi("Okt 2024 – Okt 2027", "Oct 2024 – Oct 2027"),
  },
  {
    name: "Belajar Tools Front-End Web Intermediate",
    issuer: "Dicoding Indonesia",
    period: bi("Okt 2024 – Okt 2027", "Oct 2024 – Oct 2027"),
  },
  {
    name: "Belajar Fundamental Front-End Web Development",
    issuer: "Dicoding Indonesia",
    period: bi("Sep 2024 – Sep 2027", "Sep 2024 – Sep 2027"),
  },
  {
    name: "Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)",
    issuer: "Dicoding Indonesia",
    period: bi("Sep 2024 – Sep 2027", "Sep 2024 – Sep 2027"),
  },
  {
    name: "Agile Foundations",
    issuer: "LinkedIn Learning",
    period: bi("Jul 2025", "Jul 2025"),
  },
  {
    name: "React Essential Training",
    issuer: "LinkedIn Learning",
    period: "Jul 2025",
  },
  {
    name: "Belajar Back-End Pemula dengan JavaScript",
    issuer: "Dicoding Indonesia",
    period: bi("Okt 2024 – Okt 2027", "Oct 2024 – Oct 2027"),
  },
  {
    name: "Belajar Fundamental Aplikasi Web dengan React",
    issuer: "Dicoding Indonesia",
    period: bi("Agu 2024 – Agu 2027", "Aug 2024 – Aug 2027"),
  },
  {
    name: "Belajar Membuat Aplikasi Web dengan React",
    issuer: "Dicoding Indonesia",
    period: bi("Agu 2024 – Agu 2027", "Aug 2024 – Aug 2027"),
  },
  {
    name: "Belajar Dasar Structured Query Language (SQL)",
    issuer: "Dicoding Indonesia",
    period: bi("Jan 2025 – Jan 2028", "Jan 2025 – Jan 2028"),
  },
  {
    name: "Belajar Dasar Data Science",
    issuer: "Dicoding Indonesia",
    period: bi("Jan 2025 – Jan 2028", "Jan 2025 – Jan 2028"),
  },
  {
    name: "Memulai Pemrograman dengan Python",
    issuer: "Dicoding Indonesia",
    period: bi("Jan 2025 – Jan 2028", "Jan 2025 – Jan 2028"),
  },
  {
    name: "Belajar Pemrograman Prosedural dengan Python",
    issuer: "Dicoding Indonesia",
    period: bi("Jan 2024 – Jan 2027", "Jan 2024 – Jan 2027"),
  },
  {
    name: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    period: bi("Agu 2024 – Agu 2027", "Aug 2024 – Aug 2027"),
  },
  {
    name: "Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Indonesia",
    period: bi("Agu 2024 – Agu 2027", "Aug 2024 – Aug 2027"),
  },
  {
    name: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    period: bi("Agu 2024 – Agu 2027", "Aug 2024 – Aug 2027"),
  },
  {
    name: "Belajar Dasar Manajemen Proyek",
    issuer: "Dicoding Indonesia",
    period: bi("Jan 2024 – Jan 2027", "Jan 2024 – Jan 2027"),
  },
  {
    name: "Academic English Proficiency Test (AcEPT) – Skor 218",
    issuer: "Pusat Bahasa FIB, Universitas Gadjah Mada",
    period: bi("Agu 2024 – Berlaku Seumur Hidup", "Aug 2024 – No Expiration"),
  },
  {
    name: "EF SET English Certification",
    issuer: "English First",
    period: "Aug 2024",
  },
  {
    name: "Magang Generasi Bertalenta BUMN (MAGENTA) – Skor 87.9",
    issuer: "FHCI BUMN",
    period: bi("Feb 2024 – Berlaku Seumur Hidup", "Feb 2024 – No Expiration"),
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
      "Kepala Divisi Minat dan Bakat",
      "Head of Interests and Talents Division"
    ),
    period: "Feb 2022 – Feb 2023",
  },
  {
    org: "Google Developer Student Clubs UGM (GDSC)",
    role: bi("Anggota Divisi Hacker", "Hacker Division Member"),
    period: "Nov 2021 – Nov 2022",
  },
  {
    org: "Himpunan Mahasiswa Ilmu Komputer UGM (HIMAKOM)",
    role: bi(
      "Staf Divisi Minat dan Bakat",
      "Interests and Talents Division Staff"
    ),
    period: "Feb 2021 – Feb 2022",
  },
  {
    org: "Jogja Information and Technology Session (JOINTS) UGM",
    role: bi("Staf Divisi Acara", "Events Division Staff"),
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

export interface TechStackItem {
  name: string
  src: string
}

export const FRONTEND_STACK: TechStackItem[] = [
  { name: "Next.js", src: "/images/pixel-art-sticker/nextjs-icon-sticker.png" },
  { name: "React", src: "/images/pixel-art-sticker/react-icon-sticker.png" },
  {
    name: "TypeScript",
    src: "/images/pixel-art-sticker/typescript-icon-sticker.png",
  },
  {
    name: "JavaScript",
    src: "/images/pixel-art-sticker/javascript-icon-sticker.png",
  },
  {
    name: "Tailwind CSS",
    src: "/images/pixel-art-sticker/tailwind-css-icon-sticker.png",
  },
  { name: "Vue.js", src: "/images/pixel-art-sticker/vuejs-icon-sticker.png" },
  { name: "Nuxt", src: "/images/pixel-art-sticker/nuxt-icon-sticker.png" },
  {
    name: "Angular",
    src: "/images/pixel-art-sticker/angular-icon-sticker.png",
  },
  { name: "HTML5", src: "/images/pixel-art-sticker/html-icon-sticker.png" },
  { name: "CSS3", src: "/images/pixel-art-sticker/css-icon-sticker.png" },
  { name: "Git", src: "/images/pixel-art-sticker/git-icon-sticker.png" },
  { name: "Vite", src: "/images/pixel-art-sticker/vite-icon-sticker.png" },
  { name: "Node.js", src: "/images/pixel-art-sticker/nodejs-icon-sticker.png" },
]
