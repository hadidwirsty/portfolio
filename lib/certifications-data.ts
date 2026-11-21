export interface CertificationCategory {
  id: string
  issuerId: "dicoding" | "linkedin"
  title: {
    id: string
    en: string
  }
}

export interface CertificationItem {
  id: string
  title: string
  issuerId: "dicoding" | "linkedin"
  categoryId: string
  certificateId?: string
  issuedAt?: string
  expiresAt?: string
  credentialUrl?: string
  featured?: boolean
}

export interface OtherCredentialItem {
  id: string
  title: string
  issuer: string
  period: {
    id: string
    en: string
  }
  credentialUrl?: string
}

export interface CertificationIssuer {
  id: "dicoding" | "linkedin"
  name: string
  localizedDescription: {
    id: string
    en: string
  }
  featuredCertificateIds: string[]
}

export const LEARNING_ARCHIVE_HERO = {
  sectionIndex: "02 / CERTIFICATIONS",
  title: {
    id: "Arsip Sertifikasi.",
    en: "Learning Archive.",
  },
  description: {
    id: "Kumpulan pencapaian pembelajaran yang mendukung pengembangan kemampuan teknis dan profesional saya.",
    en: "A collection of learning milestones that support my technical and professional development.",
  },
  summary: {
    certificatesCount: 38,
    certificatesLabel: {
      id: "38 Sertifikat Kursus",
      en: "38 Course Certificates",
    },
    platformsCount: 2,
    platformsLabel: {
      id: "2 Platform Pembelajaran",
      en: "2 Learning Platforms",
    },
  },
}

export const CERTIFICATION_CATEGORIES: CertificationCategory[] = [
  // Dicoding Categories (4)
  {
    id: "dicoding-frontend",
    issuerId: "dicoding",
    title: {
      id: "Front-End & React Development",
      en: "Front-End & React Development",
    },
  },
  {
    id: "dicoding-backend",
    issuerId: "dicoding",
    title: {
      id: "Back-End, Database & Cloud",
      en: "Back-End, Database & Cloud",
    },
  },
  {
    id: "dicoding-python",
    issuerId: "dicoding",
    title: {
      id: "Python & Data Science",
      en: "Python & Data Science",
    },
  },
  {
    id: "dicoding-management",
    issuerId: "dicoding",
    title: {
      id: "Engineering & Project Management",
      en: "Engineering & Project Management",
    },
  },

  // LinkedIn Learning Categories (5)
  {
    id: "linkedin-react",
    issuerId: "linkedin",
    title: {
      id: "React Development",
      en: "React Development",
    },
  },
  {
    id: "linkedin-agile",
    issuerId: "linkedin",
    title: {
      id: "Agile & Leadership",
      en: "Agile & Leadership",
    },
  },
  {
    id: "linkedin-communication",
    issuerId: "linkedin",
    title: {
      id: "Communication & Resilience",
      en: "Communication & Resilience",
    },
  },
  {
    id: "linkedin-customer",
    issuerId: "linkedin",
    title: {
      id: "Customer Relations & Sales",
      en: "Customer Relations & Sales",
    },
  },
  {
    id: "linkedin-ethics",
    issuerId: "linkedin",
    title: {
      id: "Business Ethics",
      en: "Business Ethics",
    },
  },
]

export const CERTIFICATION_ISSUERS: Record<
  "dicoding" | "linkedin",
  CertificationIssuer
> = {
  dicoding: {
    id: "dicoding",
    name: "Dicoding Indonesia",
    localizedDescription: {
      id: "Jalur pembelajaran rekayasa frontend dan ekosistem web modern terakreditasi industri.",
      en: "Industry-accredited frontend specialization and modern web engineering learning paths.",
    },
    featuredCertificateIds: [
      "dicoding-react-expert",
      "dicoding-fe-tools",
      "dicoding-fe-fundamental",
    ],
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn Learning",
    localizedDescription: {
      id: "Pengembangan profesional berkelanjutan, arsitektur komponen React, dan praktik Agile modern.",
      en: "Continuous professional development courses in React components and modern Agile workflows.",
    },
    featuredCertificateIds: [
      "linkedin-react-essential",
      "linkedin-react-practice",
      "linkedin-agile-foundations",
    ],
  },
}

// Canonical dataset of exactly 38 course certificates
export const CERTIFICATES_DATA: CertificationItem[] = [
  // ---------------------------------------------------------------------------
  // Dicoding Indonesia — Exactly 16 Course Certificates
  // Category A — Front-End & React Development (7)
  // ---------------------------------------------------------------------------
  {
    id: "dicoding-web-dasar",
    title: "Belajar Dasar Pemrograman Web",
    issuerId: "dicoding",
    categoryId: "dicoding-frontend",
    certificateId: "KEXL1W77WXG2",
  },
  {
    id: "dicoding-fe-pemula",
    title: "Belajar Membuat Front-End Web untuk Pemula",
    issuerId: "dicoding",
    categoryId: "dicoding-frontend",
    certificateId: "JLX17YVDJX72",
  },
  {
    id: "dicoding-fe-fundamental",
    title: "Belajar Fundamental Front-End Web Development",
    issuerId: "dicoding",
    categoryId: "dicoding-frontend",
    certificateId: "NVP7QRKYWZR0",
    featured: true,
  },
  {
    id: "dicoding-fe-tools",
    title: "Belajar Tools Front-End Web Intermediate",
    issuerId: "dicoding",
    categoryId: "dicoding-frontend",
    certificateId: "98XW52LK9PM3",
    featured: true,
  },
  {
    id: "dicoding-react-fundamental",
    title: "Belajar Fundamental Aplikasi Web dengan React",
    issuerId: "dicoding",
    categoryId: "dicoding-frontend",
    certificateId: "1RXYLVG1MPVM",
  },
  {
    id: "dicoding-react-pemula",
    title: "Belajar Membuat Aplikasi Web dengan React",
    issuerId: "dicoding",
    categoryId: "dicoding-frontend",
    certificateId: "0LZ068M9KZ65",
  },
  {
    id: "dicoding-react-expert",
    title: "Menjadi React Web Developer Expert",
    issuerId: "dicoding",
    categoryId: "dicoding-frontend",
    certificateId: "N9ZOY70Y0PG5",
    featured: true,
  },

  // Category B — Back-End, Database & Cloud (4)
  {
    id: "dicoding-js-dasar",
    title: "Belajar Dasar Pemrograman JavaScript",
    issuerId: "dicoding",
    categoryId: "dicoding-backend",
    certificateId: "07Z606QQWZQR",
  },
  {
    id: "dicoding-backend-pemula",
    title: "Belajar Back-End Pemula dengan JavaScript",
    issuerId: "dicoding",
    categoryId: "dicoding-backend",
    certificateId: "N9ZOY581RPG5",
  },
  {
    id: "dicoding-aws-cloud",
    title: "Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)",
    issuerId: "dicoding",
    categoryId: "dicoding-backend",
    certificateId: "07Z60YG2RZQR",
  },
  {
    id: "dicoding-sql-dasar",
    title: "Belajar Dasar Structured Query Language (SQL)",
    issuerId: "dicoding",
    categoryId: "dicoding-backend",
    certificateId: "4EXGV6J81XRL",
  },

  // Category C — Python & Data Science (3)
  {
    id: "dicoding-python-dasar",
    title: "Memulai Pemrograman dengan Python",
    issuerId: "dicoding",
    categoryId: "dicoding-python",
    certificateId: "JMZVE2DKNPN9",
  },
  {
    id: "dicoding-python-prosedural",
    title: "Belajar Pemrograman Prosedural dengan Python",
    issuerId: "dicoding",
    categoryId: "dicoding-python",
    certificateId: "2VX3O414QZYQ",
  },
  {
    id: "dicoding-data-science",
    title: "Belajar Dasar Data Science",
    issuerId: "dicoding",
    categoryId: "dicoding-python",
    certificateId: "4EXGVYY2EXRL",
  },

  // Category D — Engineering & Project Management (2)
  {
    id: "dicoding-git-github",
    title: "Belajar Dasar Git dengan GitHub",
    issuerId: "dicoding",
    categoryId: "dicoding-management",
    certificateId: "ERZR42NDNZYV",
  },
  {
    id: "dicoding-project-management",
    title: "Belajar Dasar Manajemen Proyek",
    issuerId: "dicoding",
    categoryId: "dicoding-management",
    certificateId: "1OP8NWR72XQK",
  },

  // ---------------------------------------------------------------------------
  // LinkedIn Learning — Exactly 22 Course Certificates
  // Category A — React Development (2)
  // ---------------------------------------------------------------------------
  {
    id: "linkedin-react-essential",
    title: "React Essential Training",
    issuerId: "linkedin",
    categoryId: "linkedin-react",
    featured: true,
  },
  {
    id: "linkedin-react-practice",
    title: "React Practice for Beginners: Build and Modify Basic Components",
    issuerId: "linkedin",
    categoryId: "linkedin-react",
    featured: true,
  },

  // Category B — Agile & Leadership (6)
  {
    id: "linkedin-agile-foundations",
    title: "Agile Foundations",
    issuerId: "linkedin",
    categoryId: "linkedin-agile",
    featured: true,
  },
  {
    id: "linkedin-strategic-agility",
    title: "Strategic Agility",
    issuerId: "linkedin",
    categoryId: "linkedin-agile",
  },
  {
    id: "linkedin-rapid-workplace-change",
    title: "Navigating Rapid Workplace Change as a Team",
    issuerId: "linkedin",
    categoryId: "linkedin-agile",
  },
  {
    id: "linkedin-cultural-humility",
    title: "Cultural Humility and Agility",
    issuerId: "linkedin",
    categoryId: "linkedin-agile",
  },
  {
    id: "linkedin-embracing-uncertainty",
    title: "Embracing Times of Uncertainty",
    issuerId: "linkedin",
    categoryId: "linkedin-agile",
  },
  {
    id: "linkedin-fearless-mindfulness",
    title: "Leading with Fearless Mindfulness",
    issuerId: "linkedin",
    categoryId: "linkedin-agile",
  },

  // Category C — Communication & Resilience (7)
  {
    id: "linkedin-speaking-up",
    title: "Speaking Up At Work",
    issuerId: "linkedin",
    categoryId: "linkedin-communication",
  },
  {
    id: "linkedin-courage-to-speak-up",
    title: "Building the Courage to Speak Up and Stand Out at Work",
    issuerId: "linkedin",
    categoryId: "linkedin-communication",
  },
  {
    id: "linkedin-nano-communicating-courage",
    title:
      "Nano Tips for Communicating with Courage at Work with Tatiana Kolovou",
    issuerId: "linkedin",
    categoryId: "linkedin-communication",
  },
  {
    id: "linkedin-nano-strength-resilience",
    title:
      "Nano Tips for Everyday Strength and Resilience with Tatiana Kolovou",
    issuerId: "linkedin",
    categoryId: "linkedin-communication",
  },
  {
    id: "linkedin-courage-habit",
    title: "The Courage Habit (getAbstract Summary)",
    issuerId: "linkedin",
    categoryId: "linkedin-communication",
  },
  {
    id: "linkedin-courage-self-compassion",
    title: "The Courage of Self Compassion",
    issuerId: "linkedin",
    categoryId: "linkedin-communication",
  },
  {
    id: "linkedin-compassionate-purpose",
    title: "The Healing Power of Compassionate Purpose",
    issuerId: "linkedin",
    categoryId: "linkedin-communication",
  },

  // Category D — Customer Relations & Sales (4)
  {
    id: "linkedin-rapport-customers",
    title: "Building Rapport with Customers",
    issuerId: "linkedin",
    categoryId: "linkedin-customer",
  },
  {
    id: "linkedin-positive-conversations-customers",
    title: "Creating Positive Conversations with Challenging Customers",
    issuerId: "linkedin",
    categoryId: "linkedin-customer",
  },
  {
    id: "linkedin-nano-customer-centric",
    title: "Nano Tips for Customer Centric Communication with Richard Moore",
    issuerId: "linkedin",
    categoryId: "linkedin-customer",
  },
  {
    id: "linkedin-personalized-sales",
    title:
      "Personalized Sales: How Real Connections Can Produce Powerful Results",
    issuerId: "linkedin",
    categoryId: "linkedin-customer",
  },

  // Category E — Business Ethics (3)
  {
    id: "linkedin-business-ethics",
    title: "Business Ethics",
    issuerId: "linkedin",
    categoryId: "linkedin-ethics",
  },
  {
    id: "linkedin-ethics-sales",
    title: "Business Ethics for Sales Professionals",
    issuerId: "linkedin",
    categoryId: "linkedin-ethics",
  },
  {
    id: "linkedin-practical-ethics",
    title: "Practical Ethics for Businesses and Individuals",
    issuerId: "linkedin",
    categoryId: "linkedin-ethics",
  },
]

// 3 Separate Legacy Non-Course Credentials (Preserved directly from repository data)
export const OTHER_CREDENTIALS: OtherCredentialItem[] = [
  {
    id: "other-ugm-acept",
    title: "Academic English Proficiency Test (AcEPT) – Skor 218",
    issuer: "Pusat Bahasa FIB, Universitas Gadjah Mada",
    period: {
      id: "Agu 2024 – Berlaku Seumur Hidup",
      en: "Aug 2024 – No Expiration",
    },
  },
  {
    id: "other-ef-set",
    title: "EF SET English Certification",
    issuer: "English First",
    period: {
      id: "Agu 2024",
      en: "Aug 2024",
    },
  },
  {
    id: "other-fhci-magenta",
    title: "Magang Generasi Bertalenta BUMN (MAGENTA) – Skor 87.9",
    issuer: "FHCI BUMN",
    period: {
      id: "Feb 2024 – Berlaku Seumur Hidup",
      en: "Feb 2024 – No Expiration",
    },
  },
]

// Derived dynamic counts from canonical dataset
export function getIssuerCount(issuerId: "dicoding" | "linkedin"): number {
  return CERTIFICATES_DATA.filter((c) => c.issuerId === issuerId).length
}

export function getTotalCertificatesCount(): number {
  return CERTIFICATES_DATA.length
}

export function getFeaturedCertificatesByIssuer(
  issuerId: "dicoding" | "linkedin"
): CertificationItem[] {
  const issuer = CERTIFICATION_ISSUERS[issuerId]
  if (!issuer) return []
  return issuer.featuredCertificateIds
    .map((id) => CERTIFICATES_DATA.find((cert) => cert.id === id))
    .filter((cert): cert is CertificationItem => Boolean(cert))
}

export function getCategoryById(
  categoryId: string
): CertificationCategory | undefined {
  return CERTIFICATION_CATEGORIES.find((cat) => cat.id === categoryId)
}

export function getCategoriesByIssuer(
  issuerId: "dicoding" | "linkedin"
): CertificationCategory[] {
  return CERTIFICATION_CATEGORIES.filter((cat) => cat.issuerId === issuerId)
}
