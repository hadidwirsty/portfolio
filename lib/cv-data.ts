import type { Lang } from "@/lib/language-context"

export type Bi = Record<Lang, string>

export function bi(id: string, en: string): Bi {
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
    "Frontend Engineer lulusan Ilmu Komputer UGM (IPK 3,74/4,00) dengan 2 tahun pengalaman profesional mengembangkan aplikasi web enterprise di Telkomsigma, serta 1 tahun pengalaman magang di Telkom Indonesia. Berfokus pada TypeScript, React, dan Next.js, dengan penerapan antarmuka modular, pengujian frontend komprehensif, serta praktik keamanan web sisi klien yang andal.",
    "Frontend Engineer and UGM Computer Science graduate (GPA 3.74/4.00) with 2 years of professional experience developing enterprise web applications at Telkomsigma, plus a 1-year software development internship at Telkom Indonesia. Specializing in TypeScript, React, and Next.js, with a strong focus on modular architecture, comprehensive frontend testing, and client-side web security."
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
  contactPrompt: bi("Mari berdiskusi.", "Let’s connect."),
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
    "Saya terbuka untuk peluang kerja sebagai Frontend Engineer dan kolaborasi proyek. Anda bisa menghubungi saya lewat email.",
    "I’m open to frontend engineering roles and project collaborations. Email is the best way to reach me."
  ),
  contactSheetTitle: bi("Lembar Kontak 01", "Contact Sheet 01"),
  sheetNumber: bi("Lembar 1/1", "Sheet 1/1"),
  dragStickerHint: bi("Coba geser stikernya", "Try dragging the stickers"),
  stickerBoardModes: {
    pile: bi("Tumpukan", "Pile"),
    tidy: bi("Kisi", "Grid"),
    custom: bi("Susunan Bebas", "Custom"),
  },
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
  pauseTicker: bi("Jeda teks berjalan", "Pause scrolling text"),
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
      "Jelajahi 13 proyek web dari pengalaman magang, pekerjaan profesional, dan inisiatif pribadi saya.",
      "Explore 13 web projects I worked on during my internship, in professional roles, and independently."
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
      "Angular (18, RxJS)",
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
