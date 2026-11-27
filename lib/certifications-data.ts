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
  completion?: {
    timeUtc: string
    durationMinutes: number
    skills: string[]
  }
}

export interface OtherCredentialItem {
  id: string
  title: string
  issuer: string
  certificateId?: string
  period: {
    id: string
    en: string
  }
  credentialUrl?: string
  issuedAt?: string
  assessment?: {
    score: string
    level: { id: string; en: string }
    skills: { id: string; en: string }[]
  }
  internship?: {
    organization: string
    role: string
    startedAt: string
    endedAt: string
    grade: string
  }
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
  sectionIndex: { id: "02 / SERTIFIKAT", en: "02 / CERTIFICATIONS" },
  title: {
    id: "Arsip Pembelajaran",
    en: "Learning Archive",
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
      id: "Pengembangan Web & React",
      en: "Web Development & React",
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
      id: "React, Agile & Keterampilan Profesional",
      en: "React, Agile & Professional Skills",
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
    credentialUrl: "https://www.dicoding.com/certificates/KEXL1W77WXG2",
    issuedAt: "2024-08-19",
    expiresAt: "2027-08-19",
  },
  {
    id: "dicoding-fe-pemula",
    title: "Belajar Membuat Front-End Web untuk Pemula",
    issuerId: "dicoding",
    categoryId: "dicoding-frontend",
    certificateId: "JLX17YVDJX72",
    credentialUrl: "https://www.dicoding.com/certificates/JLX17YVDJX72",
    issuedAt: "2024-08-20",
    expiresAt: "2027-08-20",
  },
  {
    id: "dicoding-fe-fundamental",
    title: "Belajar Fundamental Front-End Web Development",
    issuerId: "dicoding",
    categoryId: "dicoding-frontend",
    certificateId: "NVP7QRKYWZR0",
    credentialUrl: "https://www.dicoding.com/certificates/NVP7QRKYWZR0",
    issuedAt: "2024-09-14",
    expiresAt: "2027-09-14",
    featured: true,
  },
  {
    id: "dicoding-fe-tools",
    title: "Belajar Tools Front-End Web Intermediate",
    issuerId: "dicoding",
    categoryId: "dicoding-frontend",
    certificateId: "98XW52LK9PM3",
    credentialUrl: "https://www.dicoding.com/certificates/98XW52LK9PM3",
    issuedAt: "2024-10-16",
    expiresAt: "2027-10-16",
    featured: true,
  },
  {
    id: "dicoding-react-fundamental",
    title: "Belajar Fundamental Aplikasi Web dengan React",
    issuerId: "dicoding",
    categoryId: "dicoding-frontend",
    certificateId: "1RXYLVG1MPVM",
    credentialUrl: "https://www.dicoding.com/certificates/1RXYLVG1MPVM",
    issuedAt: "2024-08-25",
    expiresAt: "2027-08-25",
  },
  {
    id: "dicoding-react-pemula",
    title: "Belajar Membuat Aplikasi Web dengan React",
    issuerId: "dicoding",
    categoryId: "dicoding-frontend",
    certificateId: "0LZ068M9KZ65",
    credentialUrl: "https://www.dicoding.com/certificates/0LZ068M9KZ65",
    issuedAt: "2024-08-22",
    expiresAt: "2027-08-22",
  },
  {
    id: "dicoding-react-expert",
    title: "Menjadi React Web Developer Expert",
    issuerId: "dicoding",
    categoryId: "dicoding-frontend",
    certificateId: "N9ZOY70Y0PG5",
    credentialUrl: "https://www.dicoding.com/certificates/N9ZOY70Y0PG5",
    issuedAt: "2024-10-02",
    expiresAt: "2027-10-02",
    featured: true,
  },

  // Category B — Back-End, Database & Cloud (4)
  {
    id: "dicoding-js-dasar",
    title: "Belajar Dasar Pemrograman JavaScript",
    issuerId: "dicoding",
    categoryId: "dicoding-backend",
    certificateId: "07Z606QQWZQR",
    credentialUrl: "https://www.dicoding.com/certificates/07Z606QQWZQR",
    issuedAt: "2024-08-21",
    expiresAt: "2027-08-21",
  },
  {
    id: "dicoding-backend-pemula",
    title: "Belajar Back-End Pemula dengan JavaScript",
    issuerId: "dicoding",
    categoryId: "dicoding-backend",
    certificateId: "N9ZOY581RPG5",
    credentialUrl: "https://www.dicoding.com/certificates/N9ZOY581RPG5",
    issuedAt: "2024-10-14",
    expiresAt: "2027-10-14",
  },
  {
    id: "dicoding-aws-cloud",
    title: "Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)",
    issuerId: "dicoding",
    categoryId: "dicoding-backend",
    certificateId: "07Z60YG2RZQR",
    credentialUrl: "https://www.dicoding.com/certificates/07Z60YG2RZQR",
    issuedAt: "2024-09-10",
    expiresAt: "2027-09-10",
  },
  {
    id: "dicoding-sql-dasar",
    title: "Belajar Dasar Structured Query Language (SQL)",
    issuerId: "dicoding",
    categoryId: "dicoding-backend",
    certificateId: "4EXGV6J81XRL",
    credentialUrl: "https://www.dicoding.com/certificates/4EXGV6J81XRL",
    issuedAt: "2025-01-15",
    expiresAt: "2028-01-15",
  },

  // Category C — Python & Data Science (3)
  {
    id: "dicoding-python-dasar",
    title: "Memulai Pemrograman dengan Python",
    issuerId: "dicoding",
    categoryId: "dicoding-python",
    certificateId: "JMZVE2DKNPN9",
    credentialUrl: "https://www.dicoding.com/certificates/JMZVE2DKNPN9",
    issuedAt: "2025-01-13",
    expiresAt: "2028-01-13",
  },
  {
    id: "dicoding-python-prosedural",
    title: "Belajar Pemrograman Prosedural dengan Python",
    issuerId: "dicoding",
    categoryId: "dicoding-python",
    certificateId: "2VX3O414QZYQ",
    credentialUrl: "https://www.dicoding.com/certificates/2VX3O414QZYQ",
    issuedAt: "2024-01-15",
    expiresAt: "2027-01-15",
  },
  {
    id: "dicoding-data-science",
    title: "Belajar Dasar Data Science",
    issuerId: "dicoding",
    categoryId: "dicoding-python",
    certificateId: "4EXGVYY2EXRL",
    credentialUrl: "https://www.dicoding.com/certificates/4EXGVYY2EXRL",
    issuedAt: "2025-01-05",
    expiresAt: "2028-01-05",
  },

  // Category D — Engineering & Project Management (2)
  {
    id: "dicoding-git-github",
    title: "Belajar Dasar Git dengan GitHub",
    issuerId: "dicoding",
    categoryId: "dicoding-management",
    certificateId: "ERZR42NDNZYV",
    credentialUrl: "https://www.dicoding.com/certificates/ERZR42NDNZYV",
    issuedAt: "2021-10-17",
    expiresAt: "2024-10-17",
  },
  {
    id: "dicoding-project-management",
    title: "Belajar Dasar Manajemen Proyek",
    issuerId: "dicoding",
    categoryId: "dicoding-management",
    certificateId: "1OP8NWR72XQK",
    credentialUrl: "https://www.dicoding.com/certificates/1OP8NWR72XQK",
    issuedAt: "2024-01-07",
    expiresAt: "2027-01-07",
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
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/ff25b4a497d900e702729c12796e54c0f3720d0987563035cfa0da2fd21495cf",
    issuedAt: "2025-07-03",
    completion: {
      timeUtc: "03:38",
      durationMinutes: 105,
      skills: ["Web Development", "React.js", "Front-End Development"],
    },
    featured: true,
  },
  {
    id: "linkedin-react-practice",
    title: "React Practice for Beginners: Build and Modify Basic Components",
    issuerId: "linkedin",
    categoryId: "linkedin-react",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/bfebd927bd8cdde1ca15faf657f0422dae786dcafecae21d5156140df6fe7417",
    issuedAt: "2025-07-03",
    completion: {
      timeUtc: "02:17",
      durationMinutes: 35,
      skills: ["React.js"],
    },
    featured: true,
  },

  // Category B — Agile & Leadership (6)
  {
    id: "linkedin-agile-foundations",
    title: "Agile Foundations",
    issuerId: "linkedin",
    categoryId: "linkedin-agile",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/fd6ad980d1da24f05b38846ba7b799dcbe2f86ceda9ff53e1dff144fb699d60e",
    issuedAt: "2025-06-18",
    completion: {
      timeUtc: "08:53",
      durationMinutes: 95,
      skills: ["Agile Methodologies", "Agile Project Management"],
    },
    featured: true,
  },
  {
    id: "linkedin-strategic-agility",
    title: "Strategic Agility",
    issuerId: "linkedin",
    categoryId: "linkedin-agile",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/e2c1e032f4d1d5ec10b98a203a7f52d898ada03366545638f249aa65575922d9",
    issuedAt: "2025-07-03",
    completion: {
      timeUtc: "04:50",
      durationMinutes: 60,
      skills: ["Organizational Change Management"],
    },
  },
  {
    id: "linkedin-rapid-workplace-change",
    title: "Navigating Rapid Workplace Change as a Team",
    issuerId: "linkedin",
    categoryId: "linkedin-agile",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/0ff57008e6a2e8bd730940e7f27e41fe19cf38add07cc4772a153afb54444501",
    issuedAt: "2025-07-03",
    completion: {
      timeUtc: "04:07",
      durationMinutes: 38,
      skills: [
        "Team Management",
        "Cross-team Communication",
        "Change Management",
      ],
    },
  },
  {
    id: "linkedin-cultural-humility",
    title: "Cultural Humility and Agility",
    issuerId: "linkedin",
    categoryId: "linkedin-agile",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/bda481e48b3a96e150c978e5364a4c435bc2d4a5e6874edf515530dbd8aa700f",
    issuedAt: "2025-06-24",
    completion: {
      timeUtc: "12:33",
      durationMinutes: 55,
      skills: ["Cultural Awareness", "Diversity & Inclusion"],
    },
  },
  {
    id: "linkedin-embracing-uncertainty",
    title: "Embracing Times of Uncertainty",
    issuerId: "linkedin",
    categoryId: "linkedin-agile",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/a5b7c649d3bd12b5fc4452741cea7c65aadf12e90ff69f0b08649fba616b03bd",
    issuedAt: "2025-07-03",
    completion: {
      timeUtc: "04:29",
      durationMinutes: 14,
      skills: ["Resiliency"],
    },
  },
  {
    id: "linkedin-fearless-mindfulness",
    title: "Leading with Fearless Mindfulness",
    issuerId: "linkedin",
    categoryId: "linkedin-agile",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/26433d7c1cad2831159479820b146860cd76547c4439efe1ea9125af227f2ead",
    issuedAt: "2025-07-03",
    completion: {
      timeUtc: "06:13",
      durationMinutes: 53,
      skills: ["Mindfulness", "Leadership"],
    },
  },

  // Category C — Communication & Resilience (7)
  {
    id: "linkedin-speaking-up",
    title: "Speaking Up At Work",
    issuerId: "linkedin",
    categoryId: "linkedin-communication",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/898a794b297451902d7211ff230ee4e99f4476840f9ed7942cc7c486bce78966",
    issuedAt: "2025-06-20",
    completion: {
      timeUtc: "07:11",
      durationMinutes: 22,
      skills: ["Professional Communication", "Self-confidence"],
    },
  },
  {
    id: "linkedin-courage-to-speak-up",
    title: "Building the Courage to Speak Up and Stand Out at Work",
    issuerId: "linkedin",
    categoryId: "linkedin-communication",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/2534bea3ef1acfa5cbda9c8ef7ddf198938a681c1ba187f20cd30d2ddfe98940",
    issuedAt: "2025-07-03",
    completion: {
      timeUtc: "04:04",
      durationMinutes: 29,
      skills: ["Professional Communication", "Self-confidence"],
    },
  },
  {
    id: "linkedin-nano-communicating-courage",
    title:
      "Nano Tips for Communicating with Courage at Work with Tatiana Kolovou",
    issuerId: "linkedin",
    categoryId: "linkedin-communication",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/0cdb90c22fce5c116de8d1d6f910d1169a5a5db3cb6edc071db12a2e49857b96",
    issuedAt: "2025-06-20",
    completion: {
      timeUtc: "06:42",
      durationMinutes: 13,
      skills: ["Workplace Relations", "Communication", "Self-confidence"],
    },
  },
  {
    id: "linkedin-nano-strength-resilience",
    title:
      "Nano Tips for Everyday Strength and Resilience with Tatiana Kolovou",
    issuerId: "linkedin",
    categoryId: "linkedin-communication",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/cf52d430be10270bb1a3ab2d4ad473f716d13d83da9f6b0aa4fab84a4d2d4d07",
    issuedAt: "2025-06-17",
    completion: {
      timeUtc: "07:39",
      durationMinutes: 14,
      skills: ["Resiliency"],
    },
  },
  {
    id: "linkedin-courage-habit",
    title: "The Courage Habit (getAbstract Summary)",
    issuerId: "linkedin",
    categoryId: "linkedin-communication",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/cf05e930476c217ac24680890d976f0afe56c03e22aa803131d7b0423d57b077",
    issuedAt: "2025-06-20",
    completion: {
      timeUtc: "04:32",
      durationMinutes: 13,
      skills: ["Resiliency"],
    },
  },
  {
    id: "linkedin-courage-self-compassion",
    title: "The Courage of Self Compassion",
    issuerId: "linkedin",
    categoryId: "linkedin-communication",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/6c7d007503d736ba2c099267b45f482bab6fc6a5cd0843dbe48ff94a30bdbc2a",
    issuedAt: "2025-06-20",
    completion: {
      timeUtc: "04:00",
      durationMinutes: 43,
      skills: ["Emotional Intelligence", "Compassion"],
    },
  },
  {
    id: "linkedin-compassionate-purpose",
    title: "The Healing Power of Compassionate Purpose",
    issuerId: "linkedin",
    categoryId: "linkedin-communication",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/17e40bd6bf1340e84f4c03b4fc54d918c366ffc2c15baff0cc6fca3dd8818f7a",
    issuedAt: "2025-06-20",
    completion: {
      timeUtc: "04:25",
      durationMinutes: 29,
      skills: ["Compassion"],
    },
  },

  // Category D — Customer Relations & Sales (4)
  {
    id: "linkedin-rapport-customers",
    title: "Building Rapport with Customers",
    issuerId: "linkedin",
    categoryId: "linkedin-customer",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/d7e68a75d2749d96e7da37d956487d663b126d146d8beb2f8eb5e64d1178495c",
    issuedAt: "2025-06-18",
    completion: {
      timeUtc: "09:28",
      durationMinutes: 25,
      skills: ["Relationship Building", "Customer Service"],
    },
  },
  {
    id: "linkedin-positive-conversations-customers",
    title: "Creating Positive Conversations with Challenging Customers",
    issuerId: "linkedin",
    categoryId: "linkedin-customer",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/131d6c81228119e599f7fb086ba055e96c64c51a46af918700bda05669afdab5",
    issuedAt: "2025-06-20",
    completion: {
      timeUtc: "07:13",
      durationMinutes: 30,
      skills: ["Challenging Environment", "Customer Service"],
    },
  },
  {
    id: "linkedin-nano-customer-centric",
    title: "Nano Tips for Customer Centric Communication with Richard Moore",
    issuerId: "linkedin",
    categoryId: "linkedin-customer",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/0a24a11719f53fcf6ad3e0f75a5eb8a379fe8b1cc0b103cb3854d27f734d4922",
    issuedAt: "2025-06-20",
    completion: {
      timeUtc: "06:41",
      durationMinutes: 9,
      skills: [
        "Brand Communication",
        "Customer Communication",
        "Customer Service",
      ],
    },
  },
  {
    id: "linkedin-personalized-sales",
    title:
      "Personalized Sales: How Real Connections Can Produce Powerful Results",
    issuerId: "linkedin",
    categoryId: "linkedin-customer",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/6ac85e81a4fc24d4234a2373cbb087cd1f51d9df8e62294c41062b5bdb0da79f",
    issuedAt: "2025-06-20",
    completion: {
      timeUtc: "02:36",
      durationMinutes: 56,
      skills: ["Client Relations", "Sales Effectiveness"],
    },
  },

  // Category E — Business Ethics (3)
  {
    id: "linkedin-business-ethics",
    title: "Business Ethics",
    issuerId: "linkedin",
    categoryId: "linkedin-ethics",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/97fc2cf6e0b584b3988a332085d670c8c0f3c671d705980e4047e0d196ad1586",
    issuedAt: "2025-06-20",
    completion: {
      timeUtc: "09:20",
      durationMinutes: 52,
      skills: ["Business Ethics"],
    },
  },
  {
    id: "linkedin-ethics-sales",
    title: "Business Ethics for Sales Professionals",
    issuerId: "linkedin",
    categoryId: "linkedin-ethics",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/9fa252ca31934f1852fb12f91018d86b6f8583b90c9c7266d4e6af3051583775",
    issuedAt: "2025-06-20",
    completion: {
      timeUtc: "07:13",
      durationMinutes: 60,
      skills: ["Sales", "Business Ethics"],
    },
  },
  {
    id: "linkedin-practical-ethics",
    title: "Practical Ethics for Businesses and Individuals",
    issuerId: "linkedin",
    categoryId: "linkedin-ethics",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/117aa43ce845cf1bab5dbbfa289828375d2b207d7055b5482513863e8df59918",
    issuedAt: "2025-07-03",
    completion: {
      timeUtc: "06:02",
      durationMinutes: 53,
      skills: [
        "Professional Ethics",
        "Business Ethics",
        "Ethical Decision Making",
      ],
    },
  },
]

// Non-course credentials stay separate from the course archive count.
export const OTHER_CREDENTIALS: OtherCredentialItem[] = [
  {
    id: "other-ef-set",
    title: "EF SET English Certification",
    issuer: "English First",
    issuedAt: "2024-08-17",
    credentialUrl: "https://cert.efset.org/MDhMhx",
    assessment: {
      score: "60/100",
      level: { id: "B2 Menengah Atas", en: "B2 Upper Intermediate" },
      skills: [
        { id: "Membaca", en: "Reading" },
        { id: "Menyimak", en: "Listening" },
      ],
    },
    period: {
      id: "Agu 2024",
      en: "Aug 2024",
    },
  },
  {
    id: "other-fhci-magenta",
    title: "Magang Generasi Bertalenta BUMN (MAGENTA)",
    issuer: "FHCI BUMN",
    certificateId: "00263/MAGENTA/FHCI01/2/24",
    issuedAt: "2024-02-27",
    credentialUrl:
      "https://magentaku.id/?nomor_sertifikat=00263%252FMAGENTA%252FFHCI01%252F2%252F24",
    internship: {
      organization: "PT Telekomunikasi Indonesia (Persero) Tbk",
      role: "Developer",
      startedAt: "2023-01-02",
      endedAt: "2023-12-31",
      grade: "A",
    },
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

export function getCertificateId(
  certificate: CertificationItem
): string | undefined {
  if (certificate.certificateId || certificate.issuerId !== "linkedin") {
    return certificate.certificateId
  }

  return certificate.credentialUrl?.match(
    /^https:\/\/www\.linkedin\.com\/learning\/certificates\/([a-f0-9]{64})(?=$|[/?#])/i
  )?.[1]
}

export function formatCourseDuration(
  minutes: number,
  lang: "id" | "en"
): string {
  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  const units: [number, "hour" | "minute"][] = [
    [hours, "hour"],
    [remainder, "minute"],
  ]

  return units
    .filter(([value]) => value > 0)
    .map(([value, unit]) =>
      new Intl.NumberFormat(lang, {
        style: "unit",
        unit,
        unitDisplay: "long",
      }).format(value)
    )
    .join(" ")
}

export function getCategoriesByIssuer(
  issuerId: "dicoding" | "linkedin"
): CertificationCategory[] {
  return CERTIFICATION_CATEGORIES.filter((cat) => cat.issuerId === issuerId)
}
