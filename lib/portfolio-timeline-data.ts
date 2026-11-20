import type { Bi } from "./cv-data.ts"

const bi = (id: string, en: string): Bi => ({ id, en })

export interface TimelineMilestone {
  id: string
  year: string
  period: Bi
  badge: Bi
  title: Bi
  institution: Bi
  summary: Bi
  highlights: Bi[]
  labelPosition: "top" | "bottom"
}

export interface TimelineNodePosition {
  index: number
  id: string
  year: string
  x: number
  y: number
  labelPosition: "top" | "bottom"
}

export interface TimelineWaveGeometry {
  width: number
  height: number
  nodes: TimelineNodePosition[]
  fullPath: string
  activePath: string
}

export const timelineMilestones: readonly TimelineMilestone[] = [
  {
    id: "ugm-cs",
    year: "2020",
    period: bi("2020 – 2024", "2020 – 2024"),
    badge: bi("Akademik & Fondasi", "Academic Foundations"),
    title: bi(
      "Sarjana Ilmu Komputer di Universitas Gadjah Mada",
      "Bachelor of Computer Science at Universitas Gadjah Mada"
    ),
    institution: bi(
      "Universitas Gadjah Mada (UGM)",
      "Universitas Gadjah Mada (UGM)"
    ),
    summary: bi(
      "Lulus dengan predikat Sangat Memuaskan (IPK 3,74/4,00). Menyelesaikan skripsi riset tentang pengamanan akses embed dashboard Metabase dengan enkripsi kriptografis JSON Web Token (JWT) pada purwarupa analitik Netmonk.",
      "Graduated with honors (GPA 3.74/4.00). Completed undergraduate thesis on securing embedded Metabase dashboards using cryptographically signed JSON Web Tokens (JWT) for Netmonk Analytics."
    ),
    highlights: [
      bi("IPK 3,74 / 4,00 (S.Kom.)", "GPA 3.74 / 4.00 (B.Sc. in CS)"),
      bi(
        "Skripsi: Keamanan Akses Embed Dashboard Metabase dengan JSON Web Token (JWT) pada Purwarupa Web Analytics Netmonk",
        "Thesis: Securing Access to Embed Metabase Dashboards With JSON Web Token (JWT) in Netmonk's Prototype Web Analytics"
      ),
      bi(
        "Algoritma, Struktur Data, Rekayasa Perangkat Lunak, & Jaringan Komputer",
        "Algorithms, Data Structures, Software Engineering, & Networks"
      ),
    ],
    labelPosition: "bottom",
  },
  {
    id: "telkom-intern",
    year: "2023",
    period: bi("Jan 2023 – Des 2023", "Jan 2023 – Dec 2023"),
    badge: bi("Pengalaman Industri", "First Industry Experience"),
    title: bi(
      "Developer Intern — Netmonk Analytics",
      "Developer Intern — Netmonk Analytics"
    ),
    institution: bi("Telkom Indonesia", "Telkom Indonesia"),
    summary: bi(
      "Mengembangkan purwarupa aplikasi web analitik operasional telekomunikasi Netmonk Analytics menggunakan React, Tailwind CSS, Redux Toolkit, dan RTK Query untuk memantau progres pemenuhan pesanan di 7 divisi regional (TREG) dan lebih dari 40 wilayah telekomunikasi (Witel).",
      "Developed the Netmonk Analytics web prototype using React, Tailwind CSS, Redux Toolkit, and RTK Query to monitor telecommunications order fulfillment across 7 regional divisions (TREG) and 40+ telecom areas (Witel)."
    ),
    highlights: [
      bi(
        "Pemantauan order fulfillment di 7 TREG & 40+ Witel",
        "Order fulfillment monitoring across 7 TREG & 40+ Witel"
      ),
      bi(
        "Autentikasi dual-token & silent refresh via RTK Query",
        "Dual-token authentication & silent refresh via RTK Query"
      ),
      bi(
        "Arsitektur keamanan akses dasbor Metabase tertanam via token JWT",
        "Secure access architecture for embedded Metabase dashboards via JWT"
      ),
    ],
    labelPosition: "bottom",
  },
  {
    id: "dicoding-cert",
    year: "2024",
    period: bi("Sep 2024 – Okt 2027", "Sep 2024 – Oct 2027"),
    badge: bi("Sertifikasi Keahlian", "Professional Mastery"),
    title: bi(
      "Sertifikasi React Web Developer Expert",
      "React Web Developer Expert Certification"
    ),
    institution: bi("Dicoding Indonesia", "Dicoding Indonesia"),
    summary: bi(
      "Menyelesaikan kurikulum profesional tingkat mahir yang mencakup arsitektur state terdistribusi, automasi pengujian (unit, integration, dan E2E), modularitas komponen, serta pengoptimalan performa dan aksesibilitas aplikasi web modern.",
      "Completed an advanced professional curriculum covering distributed state architecture, automated testing (unit, integration, and E2E), component modularity, performance optimization, and modern web accessibility."
    ),
    highlights: [
      bi(
        "Sertifikat: Menjadi React Web Developer Expert (Okt 2024 – Okt 2027)",
        "Cert: Menjadi React Web Developer Expert (Oct 2024 – Oct 2027)"
      ),
      bi(
        "Sertifikat: Belajar Tools Front-End Web Intermediate",
        "Cert: Belajar Tools Front-End Web Intermediate"
      ),
      bi(
        "Sertifikat: Belajar Fundamental Front-End Web Development",
        "Cert: Belajar Fundamental Front-End Web Development"
      ),
    ],
    labelPosition: "bottom",
  },
  {
    id: "telkomsigma-enterprise",
    year: "2025",
    period: bi("Nov 2024 – Okt 2026", "Nov 2024 – Oct 2026"),
    badge: bi("Rekayasa Enterprise", "Enterprise Engineering"),
    title: bi(
      "Junior Programmer — 10 Inisiatif Web Enterprise",
      "Junior Programmer — 10 Enterprise Web Initiatives"
    ),
    institution: bi(
      "PT Sigma Cipta Caraka (Telkomsigma)",
      "PT Sigma Cipta Caraka (Telkomsigma)"
    ),
    summary: bi(
      "Berkontribusi dalam 10 inisiatif web enterprise bagi klien B2B dan Telkom Group yang mencakup pengembangan baru, modul fitur, purwarupa sistem (PoC), serta pemeliharaan aplikasi menggunakan Next.js, React, Angular 18, Vue, dan Blazor.",
      "Contributed to 10 enterprise web initiatives for B2B clients and Telkom Group spanning new development, feature modules, proof of concept (PoC), and application maintenance using Next.js, React, Angular 18, Vue, and Blazor."
    ),
    highlights: [
      bi(
        "IMAPS BPJS Kesehatan (Angular 18 & Ant Design) siklus hidup aset tetap",
        "IMAPS BPJS Kesehatan (Angular 18 & Ant Design) fixed asset lifecycle"
      ),
      bi(
        "IS-WARE Danareksa Group (Next.js 19) proposal teknis peringkat #1",
        "IS-WARE Danareksa Group (Next.js 19) technical proposal rank #1"
      ),
      bi(
        "WBS Telkomsigma (ISO 37002, deteksi magic bytes & ClamAV)",
        "WBS Telkomsigma (ISO 37002, magic bytes detection & ClamAV)"
      ),
    ],
    labelPosition: "top",
  },
  {
    id: "hiblow-fullstack",
    year: "2026",
    period: bi("Mei 2026 – Okt 2026", "May 2026 – Oct 2026"),
    badge: bi("Produk Mandiri", "Independent Full-Stack"),
    title: bi(
      "Full-Stack & Pure Domain Engine — HiBlow Fleet",
      "Full-Stack & Pure Domain Engine — HiBlow Fleet"
    ),
    institution: bi(
      "Proyek Pribadi / Bisnis Keluarga & Tumbuhin",
      "Personal Project / Family Business & Tumbuhin"
    ),
    summary: bi(
      "Merancang dan mengembangkan aplikasi web full-stack operasional dan keuangan armada truk semen curah menggunakan Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, dan Drizzle ORM (PostgreSQL). Membangun Pure Domain Engine untuk otomasi tarif 296 rute pabrik semen yang divalidasi oleh 297 pengujian Vitest.",
      "Designed and developed full-stack fleet operations and financial management for a bulk cement carrier using Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and Drizzle ORM (PostgreSQL). Engineered a Pure Domain Engine automating rates across 296 cement routes validated by 297 Vitest tests."
    ),
    highlights: [
      bi(
        "297 pengujian otomatis Vitest untuk Pure Domain Engine (100% lulus)",
        "297 automated Vitest tests for Pure Domain Engine (100% pass)"
      ),
      bi(
        "Kalkulasi tarif angkutan otomatis lintas 296 rute pabrik nasional",
        "Automated freight tariff calculation across 296 factory routes"
      ),
      bi(
        "State management keranjang belanja & split payment di Tumbuhin Digital",
        "Cart state management & split payments at Tumbuhin Digital"
      ),
    ],
    labelPosition: "bottom",
  },
] as const

interface BezierSegment {
  cp1x: number
  cp1y: number
  cp2x: number
  cp2y: number
  endX: number
  endY: number
}

// Koordinat geometris tetap pada kanvas viewBox 1000 x 220
const RAW_NODES = [
  { x: 95, y: 135 },
  { x: 285, y: 145 },
  { x: 495, y: 130 },
  { x: 710, y: 68 },
  { x: 905, y: 138 },
] as const

const SEGMENTS: readonly BezierSegment[] = [
  { cp1x: 170, cp1y: 118, cp2x: 220, cp2y: 150, endX: 285, endY: 145 },
  { cp1x: 350, cp1y: 140, cp2x: 420, cp2y: 115, endX: 495, endY: 130 },
  { cp1x: 570, cp1y: 145, cp2x: 640, cp2y: 65, endX: 710, endY: 68 },
  { cp1x: 780, cp1y: 70, cp2x: 845, cp2y: 145, endX: 905, endY: 138 },
] as const

export function getTimelineWaveGeometry(
  activeIndex: number = 0,
  width: number = 1000,
  height: number = 220
): TimelineWaveGeometry {
  const clampedIndex = Math.max(
    0,
    Math.min(activeIndex, timelineMilestones.length - 1)
  )

  const nodes: TimelineNodePosition[] = timelineMilestones.map((m, idx) => ({
    index: idx,
    id: m.id,
    year: m.year,
    x: RAW_NODES[idx].x,
    y: RAW_NODES[idx].y,
    labelPosition: m.labelPosition,
  }))

  const startPoint = RAW_NODES[0]
  let fullPath = `M ${startPoint.x} ${startPoint.y}`
  for (const seg of SEGMENTS) {
    fullPath += ` C ${seg.cp1x} ${seg.cp1y}, ${seg.cp2x} ${seg.cp2y}, ${seg.endX} ${seg.endY}`
  }

  let activePath = `M ${startPoint.x} ${startPoint.y}`
  for (let i = 0; i < clampedIndex; i++) {
    const seg = SEGMENTS[i]
    activePath += ` C ${seg.cp1x} ${seg.cp1y}, ${seg.cp2x} ${seg.cp2y}, ${seg.endX} ${seg.endY}`
  }

  return {
    width,
    height,
    nodes,
    fullPath,
    activePath,
  }
}
