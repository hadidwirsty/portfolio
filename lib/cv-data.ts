import type { Lang } from "@/lib/language-context"

export type Bi = Record<Lang, string>

function bi(id: string, en: string): Bi {
  return { id, en }
}

export const profile = {
  name: "Muhammad Hadid Wiransetyo",
  initials: "MHW",
  photo: "/images/profile.jpg",
  cvFile: "/cv/Muhammad-Hadid-Wiransetyo-CV-2026.pdf",
  location: bi("Yogyakarta, Indonesia", "Yogyakarta, Indonesia"),
  role: bi("Frontend Web Developer", "Frontend Web Developer"),
  tagline: bi(
    "Membangun antarmuka web yang rapi, cepat, dan tahan lama.",
    "Building web interfaces that are clean, fast, and built to last."
  ),
  summary: bi(
    "Lulusan Ilmu Komputer Universitas Gadjah Mada dengan pengalaman ±1 tahun 8 bulan sebagai Junior Programmer (Front End Web Developer) di PT Sigma Cipta Caraka (Telkomsigma), serta 1 tahun magang sebagai developer di PT Telkom Indonesia. Terbiasa mengembangkan custom application untuk klien korporasi dan instansi pemerintah menggunakan React, Next.js, Vue, dan Angular, dalam lingkungan kerja Agile Scrum.",
    "Computer Science graduate from Universitas Gadjah Mada with roughly 1 year 8 months of experience as a Junior Programmer (Front End Web Developer) at PT Sigma Cipta Caraka (Telkomsigma), plus a 1-year developer internship at PT Telkom Indonesia. Experienced in building custom applications for corporate and government clients using React, Next.js, Vue, and Angular within an Agile Scrum environment."
  ),
  email: "m.hadid.2001@gmail.com",
  phoneDisplay: "+62 823-4058-2914",
  phoneHref: "+6282340582914",
  linkedin: {
    label: "linkedin.com/in/hadidwirsty",
    href: "https://linkedin.com/in/hadidwirsty",
  },
  instagram: {
    label: "@hadidwirsty",
    href: "https://instagram.com/hadidwirsty",
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
    "Terbuka untuk peluang baru sebagai Frontend / Full-stack Developer.",
    "Open to new opportunities as a Frontend / Full-stack Developer."
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
      "Junior Programmer – Front End Web Developer",
      "Junior Programmer – Front End Web Developer"
    ),
    period: bi("November 2024 – Sekarang", "November 2024 – Present"),
    location: bi(
      "Yogyakarta, Indonesia (On-site)",
      "Yogyakarta, Indonesia (On-site)"
    ),
    employmentType: bi("Kontrak (PWT)", "Contract (Fixed-term)"),
    points: [
      bi(
        "Bertanggung jawab atas pengembangan dan pemeliharaan end-to-end lebih dari 9 proyek aplikasi kustom untuk klien korporasi dan instansi pemerintah.",
        "Responsible for end-to-end development and maintenance of 9+ custom application projects for corporate and government clients."
      ),
      bi(
        "Mengimplementasikan antarmuka pengguna, integrasi API, testing, hingga deployment sesuai kebutuhan proyek.",
        "Implemented user interfaces, API integrations, testing, and deployment based on project requirements."
      ),
      bi(
        "Berkolaborasi dalam lingkungan kerja Agile Scrum melalui daily stand-up dan sprint review untuk memastikan pengiriman produk yang konsisten.",
        "Collaborated in an Agile Scrum environment through daily stand-ups and sprint reviews to ensure consistent product delivery."
      ),
      bi(
        "Menguasai berbagai teknologi frontend modern: Next.js, React, Vue, Angular, Nuxt, Tailwind CSS, Shadcn UI, Ant Design, TanStack Query, dan Zustand.",
        "Worked across modern frontend stacks: Next.js, React, Vue, Angular, Nuxt, Tailwind CSS, Shadcn UI, Ant Design, TanStack Query, and Zustand."
      ),
    ],
    projectIds: [
      "pis-mars",
      "wbs",
      "caterine-cm",
      "is-ware",
      "alisa",
      "monara",
      "cart",
      "info-tender",
      "imaps",
    ],
  },
  {
    id: "telkom",
    company: "PT Telkom Indonesia",
    role: bi(
      "Developer Internship – Front End Web Developer",
      "Developer Internship – Front End Web Developer"
    ),
    period: bi("Januari 2023 – Desember 2023", "January 2023 – December 2023"),
    location: bi("Jakarta, Indonesia (Remote)", "Jakarta, Indonesia (Remote)"),
    employmentType: bi("Magang", "Internship"),
    points: [
      bi(
        "Mengembangkan dan memelihara antarmuka aplikasi internal Netmonk HI, produk pemantau jaringan Telkom Indonesia.",
        "Developed and maintained the internal Netmonk HI application, Telkom Indonesia's network monitoring product."
      ),
      bi(
        "Membangun Netmonk Analytics sebagai proyek akhir magang untuk memantau progres order fulfillment dan meng-embed dashboard analitik dari Metabase.",
        "Built Netmonk Analytics as the internship capstone project to track order fulfillment progress and embed analytics dashboards from Metabase."
      ),
      bi(
        "Berkolaborasi dengan tim Data & Solution untuk menerjemahkan analisis data kompleks menjadi visualisasi komponen yang intuitif.",
        "Collaborated with the Data & Solution team to translate complex data analysis into intuitive component visualizations."
      ),
    ],
    projectIds: ["netmonk"],
  },
]

export type ProjectEntry = {
  id: string
  name: string
  period: Bi
  company: string
  description: Bi
  role: Bi
  tech: string[]
}

export const projects: ProjectEntry[] = [
  {
    id: "pis-mars",
    name: "PIS MARS",
    period: bi("April 2026 – Juni 2026", "April 2026 – June 2026"),
    company: "PT Sigma Cipta Caraka",
    description: bi(
      "Reengineering aplikasi enterprise untuk pengelolaan arsip, alur kerja, dokumen, dan pelaporan operasional marine di lingkungan Pertamina International Shipping.",
      "Reengineered an enterprise application for archive management, workflow, documents, and marine operational reporting for Pertamina International Shipping."
    ),
    role: bi(
      "Mengembangkan alur kerja & tampilan, memperbaiki bug, serta meningkatkan stabilitas dan keandalan sistem.",
      "Developed workflow and UI, fixed bugs, and improved system stability and reliability."
    ),
    tech: [
      ".NET 8",
      "C#",
      "Blazor",
      "REST API",
      "SQL Server",
      "RabbitMQ",
      "Docker",
      "Microservices",
    ],
  },
  {
    id: "wbs",
    name: "Whistleblowing System (WBS)",
    period: bi("Desember 2025 – Juni 2026", "December 2025 – June 2026"),
    company: "PT Sigma Cipta Caraka",
    description: bi(
      "Aplikasi web untuk mekanisme pelaporan dugaan pelanggaran hukum, etika, atau kebijakan perusahaan secara internal.",
      "A web application providing an internal reporting mechanism for suspected legal, ethical, or policy violations."
    ),
    role: bi(
      "Mengimplementasikan UI internal web dan mengintegrasikan API untuk keseluruhan jalannya aplikasi.",
      "Implemented the internal web UI and integrated APIs across the whole application."
    ),
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "TanStack",
      "Zustand",
      "i18next",
    ],
  },
  {
    id: "caterine-cm",
    name: "Caterine – Module CM",
    period: bi("Agustus 2025 – Desember 2025", "August 2025 – December 2025"),
    company: "PT Sigma Cipta Caraka",
    description: bi(
      "Aplikasi web untuk manajemen layanan TI (IT Service Management).",
      "A web application for IT Service Management."
    ),
    role: bi(
      "Mengembangkan dan memelihara halaman aplikasi pada modul Change Management, termasuk change request (CR).",
      "Developed and maintained application pages for the Change Management module, including change requests (CR)."
    ),
    tech: ["Vue.js", "Vite", "Tailwind CSS", "Pinia", "REST API"],
  },
  {
    id: "is-ware",
    name: "Is-Ware",
    period: bi("Juli 2025 – Agustus 2025", "July 2025 – August 2025"),
    company: "PT Sigma Cipta Caraka",
    description: bi(
      "Aplikasi web untuk manajemen sistem Resi Gudang, proof of concept untuk PT Kliring Berjangka Indonesia (KBI) – Holding Danareksa.",
      "A warehouse receipt management system, developed as a proof of concept for PT Kliring Berjangka Indonesia (KBI) – Holding Danareksa."
    ),
    role: bi(
      "Menginisiasi struktur proyek, mengimplementasikan tata letak dan komponen UI, serta mengintegrasikan UI dengan API.",
      "Initiated the project structure, implemented UI layout and components, and integrated the UI with APIs."
    ),
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "TanStack",
      "Zustand",
    ],
  },
  {
    id: "alisa",
    name: "Alisa 2.0",
    period: bi("April 2025 – Juli 2025", "April 2025 – July 2025"),
    company: "PT Sigma Cipta Caraka",
    description: bi(
      "Aplikasi web Content Management System (CMS) untuk kebutuhan Infomedia Nusantara dengan arsitektur modular microservices.",
      "A Content Management System (CMS) web application for Infomedia Nusantara, built on a modular microservices architecture."
    ),
    role: bi(
      "Menginisiasi struktur proyek, membangun tata letak & komponen UI, dan mengintegrasikan UI dengan API untuk fitur smart contract dan data master.",
      "Initiated the project structure, built UI layout and components, and integrated the UI with APIs for smart contract and master-data features."
    ),
    tech: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Ant Design",
      "TanStack",
      "Zustand",
    ],
  },
  {
    id: "monara",
    name: "MONARA",
    period: bi("Februari 2025 – Maret 2025", "February 2025 – March 2025"),
    company: "PT Sigma Cipta Caraka",
    description: bi(
      "Aplikasi web untuk memantau tiket (ticketing monitoring) di posko siaga Ramadhan, Natal, dan Tahun Baru.",
      "A web application for ticket monitoring at Ramadan, Christmas, and New Year command posts."
    ),
    role: bi(
      "Membangun UI layout & komponen, serta mengintegrasikan API untuk fitur otentikasi, dashboard, dan data master.",
      "Built UI layouts and components, and integrated APIs for authentication, dashboard, and master-data features."
    ),
    tech: ["Next.js", "Tailwind CSS", "Shadcn UI", "TanStack", "Zustand"],
  },
  {
    id: "cart",
    name: "CART",
    period: bi("Januari 2025 – Februari 2025", "January 2025 – February 2025"),
    company: "PT Sigma Cipta Caraka",
    description: bi(
      "Continuous Automated Red Teaming — aplikasi web untuk manajemen kerentanan sistem (vulnerability management) dan ancaman siber.",
      "Continuous Automated Red Teaming — a web application for system vulnerability management and cyber threat intelligence."
    ),
    role: bi(
      "Mengimplementasikan UI navigasi menu serta mengembangkan dan memelihara modul aplikasi sesuai kebutuhan sistem.",
      "Implemented menu navigation UI and developed/maintained application modules per system requirements."
    ),
    tech: ["Nuxt", "Vue", "Tailwind CSS", "Headless UI", "Pinia"],
  },
  {
    id: "info-tender",
    name: "Info Tender Jesica (LPSE)",
    period: bi("Desember 2024 – Januari 2025", "December 2024 – January 2025"),
    company: "PT Sigma Cipta Caraka",
    description: bi(
      "Aplikasi web untuk melakukan scraping situs LPSE guna mendapatkan informasi tender secara otomatis.",
      "A web application that scrapes the LPSE tender site to automatically surface tender information."
    ),
    role: bi(
      "Mengimplementasikan tampilan UI dan mengonsumsi API untuk menampilkan informasi tender, serta memelihara fitur terkait.",
      "Implemented the UI and consumed APIs to display tender information, and maintained related features."
    ),
    tech: ["React", "Vite", "Tailwind CSS", "Shadcn UI", "TanStack", "Zustand"],
  },
  {
    id: "imaps",
    name: "IMAPS",
    period: bi("November 2024 – Januari 2025", "November 2024 – January 2025"),
    company: "PT Sigma Cipta Caraka",
    description: bi(
      "Integrated Management Asset and Procurement System — aplikasi manajemen aset untuk instansi pemerintah (BPJS Kesehatan).",
      "Integrated Management Asset and Procurement System — an asset management application for a government institution (BPJS Kesehatan)."
    ),
    role: bi(
      "Mengimplementasikan antarmuka daftar menu aset dan integrasi API, serta memelihara halaman manajemen aset.",
      "Implemented the asset menu list UI and API integration, and maintained asset management pages."
    ),
    tech: ["Angular", "Tailwind CSS", "Ant Design", "REST API"],
  },
  {
    id: "netmonk",
    name: "Netmonk Analytics",
    period: bi("Januari 2023 – Desember 2023", "January 2023 – December 2023"),
    company: "PT Telkom Indonesia",
    description: bi(
      "Dasbor analitik terintegrasi dengan Metabase untuk memantau progres pemenuhan pesanan (order fulfillment), termasuk versi chatbot prediktif (MONA). Kini digunakan oleh tim internal Netmonk dan Telkom (TREG & WITEL).",
      "An analytics dashboard integrated with Metabase to monitor order-fulfillment progress, including a predictive chatbot version (MONA). Now used internally by Netmonk and Telkom teams (TREG & WITEL)."
    ),
    role: bi(
      "Membangun struktur awal proyek dan mengintegrasikan API untuk menampilkan data analitik pada dasbor.",
      "Built the initial project structure and integrated APIs to display analytics data on the dashboard."
    ),
    tech: ["React.js", "Tailwind CSS", "FastAPI", "PostgreSQL", "REST API"],
  },
]

export type SkillGroup = {
  title: Bi
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: bi("Frontend", "Frontend"),
    items: [
      "TypeScript",
      "JavaScript",
      "HTML & CSS",
      "React",
      "Next.js",
      "Vue.js",
      "Nuxt",
      "Angular",
      "Tailwind CSS",
      "Shadcn UI",
      "Ant Design",
      "TanStack Query",
      "Zustand",
    ],
  },
  {
    title: bi("Backend & API", "Backend & API"),
    items: ["Node.js", "Express.js", "Python", "FastAPI", "RESTful API"],
  },
  {
    title: bi("Database", "Database"),
    items: ["PostgreSQL", "MongoDB", "Firebase", "SQL Server"],
  },
  {
    title: bi("Tools & Platform", "Tools & Platform"),
    items: [
      "Git",
      "GitLab",
      "GitHub",
      "Bitbucket",
      "Docker",
      "Postman",
      "DBeaver",
    ],
  },
  {
    title: bi("Soft Skills", "Soft Skills"),
    items: [
      "Manajemen waktu",
      "Berpikir analitis",
      "Kolaborasi tim",
      "Kepemimpinan",
      "Pembelajaran berkelanjutan",
      "Adaptif",
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
    institution: "Universitas Gadjah Mada",
    degree: bi("S1 Ilmu Komputer", "Bachelor of Computer Science"),
    period: "2020 – 2024",
    score: "3.74 / 4.00",
    extra: bi(
      "Skripsi: Keamanan Akses Embed Dashboard Metabase dengan JSON Web Token pada Purwarupa Web Analytics Netmonk.",
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
