import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

import {
  CERTIFICATES_DATA,
  getFeaturedCertificatesByIssuer,
  getIssuerCount,
  getTotalCertificatesCount,
  OTHER_CREDENTIALS,
} from "../../lib/certifications-data.ts"

const DATA_PATH = path.resolve(process.cwd(), "lib/certifications-data.ts")
const DOC_PREVIEW_PATH = path.resolve(
  process.cwd(),
  "components/stack/certificate-document-preview.tsx"
)
const DETAIL_PATH = path.resolve(
  process.cwd(),
  "components/stack/certificate-detail.tsx"
)
const ARCHIVE_PATH = path.resolve(
  process.cwd(),
  "components/stack/certification-archive.tsx"
)
const PAGE_PATH = path.resolve(process.cwd(), "app/stack/page.tsx")

test("canonical dataset defines exactly 38 course certificates across 2 platforms", () => {
  assert.ok(fs.existsSync(DATA_PATH), "lib/certifications-data.ts must exist")

  // Total count
  assert.strictEqual(
    getTotalCertificatesCount(),
    38,
    "Must have exactly 38 course certificates in canonical dataset"
  )
  assert.strictEqual(
    CERTIFICATES_DATA.length,
    38,
    "CERTIFICATES_DATA must contain exactly 38 items"
  )

  // Issuer counts
  assert.strictEqual(
    getIssuerCount("dicoding"),
    16,
    "Dicoding must have exactly 16 course certificates"
  )
  assert.strictEqual(
    getIssuerCount("linkedin"),
    22,
    "LinkedIn must have exactly 22 course certificates"
  )

  // Unique IDs
  const allIds = CERTIFICATES_DATA.map((c) => c.id)
  const uniqueIds = new Set(allIds)
  assert.strictEqual(
    uniqueIds.size,
    38,
    "All 38 certificate IDs must be strictly unique"
  )
})

test("dicoding certificates match exact user-provided titles, categories and IDs", () => {
  const dicodingCerts = CERTIFICATES_DATA.filter(
    (c) => c.issuerId === "dicoding"
  )
  assert.strictEqual(dicodingCerts.length, 16)

  // Expected 16 Dicoding IDs
  const expectedDicoding = [
    { title: "Belajar Dasar Pemrograman Web", id: "KEXL1W77WXG2" },
    { title: "Belajar Membuat Front-End Web untuk Pemula", id: "JLX17YVDJX72" },
    {
      title: "Belajar Fundamental Front-End Web Development",
      id: "NVP7QRKYWZR0",
    },
    { title: "Belajar Tools Front-End Web Intermediate", id: "98XW52LK9PM3" },
    {
      title: "Belajar Fundamental Aplikasi Web dengan React",
      id: "1RXYLVG1MPVM",
    },
    { title: "Belajar Membuat Aplikasi Web dengan React", id: "0LZ068M9KZ65" },
    { title: "Menjadi React Web Developer Expert", id: "N9ZOY70Y0PG5" },
    { title: "Belajar Dasar Pemrograman JavaScript", id: "07Z606QQWZQR" },
    { title: "Belajar Back-End Pemula dengan JavaScript", id: "N9ZOY581RPG5" },
    {
      title: "Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)",
      id: "07Z60YG2RZQR",
    },
    {
      title: "Belajar Dasar Structured Query Language (SQL)",
      id: "4EXGV6J81XRL",
    },
    { title: "Memulai Pemrograman dengan Python", id: "JMZVE2DKNPN9" },
    {
      title: "Belajar Pemrograman Prosedural dengan Python",
      id: "2VX3O414QZYQ",
    },
    { title: "Belajar Dasar Data Science", id: "4EXGVYY2EXRL" },
    { title: "Belajar Dasar Git dengan GitHub", id: "ERZR42NDNZYV" },
    { title: "Belajar Dasar Manajemen Proyek", id: "1OP8NWR72XQK" },
  ]

  for (const exp of expectedDicoding) {
    const found = dicodingCerts.find((c) => c.title === exp.title)
    assert.ok(found, `Dicoding course "${exp.title}" must be present`)
    assert.strictEqual(
      found.certificateId,
      exp.id,
      `Course "${exp.title}" must match certificate ID ${exp.id}`
    )
  }

  // Categories breakdown (7 + 4 + 3 + 2 = 16)
  const feCerts = dicodingCerts.filter(
    (c) => c.categoryId === "dicoding-frontend"
  )
  const beCerts = dicodingCerts.filter(
    (c) => c.categoryId === "dicoding-backend"
  )
  const pyCerts = dicodingCerts.filter(
    (c) => c.categoryId === "dicoding-python"
  )
  const mgCerts = dicodingCerts.filter(
    (c) => c.categoryId === "dicoding-management"
  )

  assert.strictEqual(
    feCerts.length,
    7,
    "Dicoding Front-End must have 7 courses"
  )
  assert.strictEqual(beCerts.length, 4, "Dicoding Back-End must have 4 courses")
  assert.strictEqual(pyCerts.length, 3, "Dicoding Python must have 3 courses")
  assert.strictEqual(
    mgCerts.length,
    2,
    "Dicoding Management must have 2 courses"
  )
})

test("linkedin certificates match exact titles and do not fabricate certificate IDs or URLs", () => {
  const linkedinCerts = CERTIFICATES_DATA.filter(
    (c) => c.issuerId === "linkedin"
  )
  assert.strictEqual(linkedinCerts.length, 22)

  // 22 Expected LinkedIn Learning Titles
  const expectedLinkedInTitles = [
    "React Essential Training",
    "React Practice for Beginners: Build and Modify Basic Components",
    "Agile Foundations",
    "Strategic Agility",
    "Navigating Rapid Workplace Change as a Team",
    "Cultural Humility and Agility",
    "Embracing Times of Uncertainty",
    "Leading with Fearless Mindfulness",
    "Speaking Up At Work",
    "Building the Courage to Speak Up and Stand Out at Work",
    "Nano Tips for Communicating with Courage at Work with Tatiana Kolovou",
    "Nano Tips for Everyday Strength and Resilience with Tatiana Kolovou",
    "The Courage Habit (getAbstract Summary)",
    "The Courage of Self Compassion",
    "The Healing Power of Compassionate Purpose",
    "Building Rapport with Customers",
    "Creating Positive Conversations with Challenging Customers",
    "Nano Tips for Customer Centric Communication with Richard Moore",
    "Personalized Sales: How Real Connections Can Produce Powerful Results",
    "Business Ethics",
    "Business Ethics for Sales Professionals",
    "Practical Ethics for Businesses and Individuals",
  ]

  for (const title of expectedLinkedInTitles) {
    const found = linkedinCerts.find((c) => c.title === title)
    assert.ok(found, `LinkedIn Learning course "${title}" must exist`)
    assert.strictEqual(
      found.certificateId,
      undefined,
      `LinkedIn course "${title}" must not fabricate a certificate ID`
    )
    assert.strictEqual(
      found.credentialUrl,
      undefined,
      `LinkedIn course "${title}" must not fabricate a credential URL`
    )
  }

  // Categories breakdown (2 + 6 + 7 + 4 + 3 = 22)
  const reactCerts = linkedinCerts.filter(
    (c) => c.categoryId === "linkedin-react"
  )
  const agileCerts = linkedinCerts.filter(
    (c) => c.categoryId === "linkedin-agile"
  )
  const commCerts = linkedinCerts.filter(
    (c) => c.categoryId === "linkedin-communication"
  )
  const custCerts = linkedinCerts.filter(
    (c) => c.categoryId === "linkedin-customer"
  )
  const ethCerts = linkedinCerts.filter(
    (c) => c.categoryId === "linkedin-ethics"
  )

  assert.strictEqual(reactCerts.length, 2)
  assert.strictEqual(agileCerts.length, 6)
  assert.strictEqual(commCerts.length, 7)
  assert.strictEqual(custCerts.length, 4)
  assert.strictEqual(ethCerts.length, 3)
})

test("other credentials contains exactly 3 historical records separate from the 38 course count", () => {
  assert.strictEqual(OTHER_CREDENTIALS.length, 3)

  const titles = OTHER_CREDENTIALS.map((o) => o.title)
  assert.ok(
    titles.includes("Academic English Proficiency Test (AcEPT) – Skor 218")
  )
  assert.ok(titles.includes("EF SET English Certification"))
  assert.ok(
    titles.includes("Magang Generasi Bertalenta BUMN (MAGENTA) – Skor 87.9")
  )

  // Verify none of other credentials are in CERTIFICATES_DATA
  const courseIds = new Set(CERTIFICATES_DATA.map((c) => c.id))
  for (const other of OTHER_CREDENTIALS) {
    assert.ok(
      !courseIds.has(other.id),
      "Other credentials must not be mixed into 38 courses"
    )
  }
})

test("featured certificates reference canonical data by stable IDs without duplicating records", () => {
  const dicodingFeatured = getFeaturedCertificatesByIssuer("dicoding")
  assert.strictEqual(dicodingFeatured.length, 3)

  const linkedinFeatured = getFeaturedCertificatesByIssuer("linkedin")
  assert.strictEqual(linkedinFeatured.length, 3)

  // Ensure each featured certificate exists in CERTIFICATES_DATA
  for (const feat of [...dicodingFeatured, ...linkedinFeatured]) {
    const canonical = CERTIFICATES_DATA.find((c) => c.id === feat.id)
    assert.ok(
      canonical,
      `Featured cert ${feat.id} must exist in canonical CERTIFICATES_DATA`
    )
    assert.strictEqual(canonical.title, feat.title)
  }
})

test("accessibility hardening: closed document preview cards are non-interactive", () => {
  assert.ok(
    fs.existsSync(DOC_PREVIEW_PATH),
    "certificate-document-preview.tsx must exist"
  )
  const source = fs.readFileSync(DOC_PREVIEW_PATH, "utf-8")

  // tabIndex={isOpen ? 0 : -1} and aria-hidden={!isOpen}
  assert.match(source, /tabIndex=\{isOpen \? 0 : -1\}/)
  assert.match(source, /aria-hidden=\{!isOpen\}/)

  // pointer-events-none when closed
  assert.match(
    source,
    /isOpen[\s\S]*?pointer-events-auto[\s\S]*?pointer-events-none/,
    "must apply pointer-events-none when folder is closed"
  )
})

test("certificate-detail provides neutral wording when credential URL is unavailable", () => {
  assert.ok(fs.existsSync(DETAIL_PATH), "certificate-detail.tsx must exist")
  const source = fs.readFileSync(DETAIL_PATH, "utf-8")

  // Neutral wording replacement: no unsupported claims of official platform verification
  assert.doesNotMatch(
    source,
    /Kredensial terverifikasi di platform resmi/,
    "must not make unsupported verification claims"
  )
  assert.match(
    source,
    /Tautan kredensial belum tersedia/,
    "must use honest neutral fallback wording"
  )
})

test("certification-archive implements expandable 38-certificate listing with contextual filters", () => {
  assert.ok(fs.existsSync(ARCHIVE_PATH), "certification-archive.tsx must exist")
  const source = fs.readFileSync(ARCHIVE_PATH, "utf-8")

  // Expandable toggle state
  assert.match(
    source,
    /const \[isExpanded,\s*setIsExpanded\]\s*=\s*React\.useState\(false\)/
  )

  // Platform filters
  assert.match(source, /handleIssuerChange\("all"\)/)
  assert.match(source, /handleIssuerChange\("dicoding"\)/)
  assert.match(source, /handleIssuerChange\("linkedin"\)/)

  // Other credentials section
  assert.match(source, /OTHER_CREDENTIALS\.map/)
})

test("app/stack/page.tsx renders single unified Section 02 learning archive without duplicate legacy component", () => {
  assert.ok(fs.existsSync(PAGE_PATH), "app/stack/page.tsx must exist")
  const source = fs.readFileSync(PAGE_PATH, "utf-8")

  // Mounts unified CertificationFolderGrid
  assert.match(source, /<CertificationFolderGrid \/>/)

  // Does NOT mount obsolete legacy CertificationsSection on /stack
  assert.doesNotMatch(
    source,
    /<CertificationsSection \/>/,
    "must remove redundant legacy CertificationsSection from /stack render tree"
  )
})
