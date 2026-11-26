import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"

import {
  CERTIFICATES_DATA,
  CERTIFICATION_ISSUERS,
  LEARNING_ARCHIVE_HERO,
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
    assert.equal(
      found.credentialUrl,
      `https://www.dicoding.com/certificates/${exp.id}`,
      `Course "${exp.title}" must link to its official Dicoding credential`
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

test("LinkedIn certificates match exact titles and have distinct canonical credential URLs", () => {
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

  const urls = new Set<string>()
  for (const title of expectedLinkedInTitles) {
    const found = linkedinCerts.find((c) => c.title === title)
    assert.ok(found, `LinkedIn Learning course "${title}" must exist`)
    assert.equal(found.certificateId, undefined)
    assert.ok(found.credentialUrl, `Missing credential URL for "${title}"`)
    assert.match(
      found.credentialUrl,
      /^https:\/\/www\.linkedin\.com\/learning\/certificates\/[a-f0-9]{64}$/
    )
    urls.add(found.credentialUrl)
  }
  assert.equal(urls.size, expectedLinkedInTitles.length)
  assert.equal(
    linkedinCerts.find((cert) => cert.id === "linkedin-fearless-mindfulness")
      ?.credentialUrl,
    "https://www.linkedin.com/learning/certificates/26433d7c1cad2831159479820b146860cd76547c4439efe1ea9125af227f2ead"
  )

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
  assert.deepEqual(
    dicodingFeatured.map(({ id }) => id),
    ["dicoding-react-expert", "dicoding-fe-tools", "dicoding-fe-fundamental"]
  )

  const linkedinFeatured = getFeaturedCertificatesByIssuer("linkedin")
  assert.deepEqual(
    linkedinFeatured.map(({ id }) => id),
    [
      "linkedin-react-essential",
      "linkedin-react-practice",
      "linkedin-agile-foundations",
    ]
  )

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

const requireFromTest = createRequire(import.meta.url)
const jitiPath = requireFromTest.resolve("jiti", {
  paths: [requireFromTest.resolve("eslint")],
})
const loadTsx = requireFromTest(jitiPath).createJiti(import.meta.url, {
  jsx: { runtime: "automatic" },
  fsCache: false,
  alias: { "@": process.cwd() },
})

const FOLDER_PATH = path.resolve("components/stack/certification-folder.tsx")

test("closed certification folders expose only the disclosure button; open folders expose three separate papers", () => {
  const { CertificationFolder } = loadTsx(
    FOLDER_PATH
  ) as typeof import("../../components/stack/certification-folder")
  const { LanguageProvider } = loadTsx(
    "@/lib/language-context"
  ) as typeof import("../../lib/language-context")
  for (const issuer of Object.values(CERTIFICATION_ISSUERS)) {
    const featured = getFeaturedCertificatesByIssuer(issuer.id)
    const render = (isOpen: boolean) =>
      renderToStaticMarkup(
        createElement(
          LanguageProvider,
          null,
          createElement(CertificationFolder, {
            issuer,
            isOpen,
            selectedCertId: isOpen ? featured[0].id : null,
            onToggle: () => {},
            onSelectCert: () => {},
            onCloseDetail: () => {},
          })
        )
      )
    const closed = render(false)
    assert.equal((closed.match(/<button\b/g) ?? []).length, 1)
    assert.match(closed, /aria-expanded="false"/)
    assert.match(closed, /<\/button>[\s\S]*?data-certificate-stack/)
    assert.match(closed, /aria-hidden="true"[^>]*data-certificate-stack/)
    assert.doesNotMatch(closed, /aria-pressed=/)

    const open = render(true)
    const target = open.match(/aria-controls="([^"]+)"/)?.[1]
    assert.ok(target)
    assert.ok(open.includes(`id="${target}"`))
    assert.match(open, /aria-expanded="true"/)
    assert.equal((open.match(/aria-pressed="(?:true|false)"/g) ?? []).length, 3)
    assert.equal((open.match(/aria-pressed="true"/g) ?? []).length, 1)
    assert.match(open, /<ul[^>]*grid-cols-1[^>]*grid-cols-3/)
    assert.doesNotMatch(open, /data-certificate-stack/)
  }

  const preview = fs.readFileSync(DOC_PREVIEW_PATH, "utf-8")
  assert.match(preview, /initial=\{shouldReduceMotion \? false :/)
  assert.match(preview, /delay: shouldReduceMotion \? 0 :/)
})

test("folder Escape is locally owned and returns focus to the relevant trigger", () => {
  const grid = fs.readFileSync(
    "components/stack/certification-folder-grid.tsx",
    "utf-8"
  )
  const folder = fs.readFileSync(FOLDER_PATH, "utf-8")
  assert.doesNotMatch(grid, /addEventListener\("keydown"/)
  assert.match(folder, /<article\s+onKeyDown=\{handleEscape\}/)
  assert.match(
    folder,
    /event\.key !== "Escape"[\s\S]*?event\.defaultPrevented[\s\S]*?!isOpen/
  )
  assert.match(
    folder,
    /event\.preventDefault\(\)[\s\S]*?event\.stopPropagation\(\)/
  )
  assert.match(
    folder,
    /if \(selectedCert\) \{\s*handleCloseDetailWithFocus\(\)\s*\} else \{\s*onToggle\(\)\s*toggleButtonRef\.current\?\.focus\(\)/
  )
  assert.match(folder, /onCloseDetail\(\)[\s\S]*?selectedButton\?\.focus\(\)/)
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

test("complete archive uses one collapsed disclosure labelled with the course count", () => {
  const { CertificationArchive } = loadTsx(
    ARCHIVE_PATH
  ) as typeof import("../../components/stack/certification-archive")
  const { LanguageProvider } = loadTsx(
    "@/lib/language-context"
  ) as typeof import("../../lib/language-context")
  const html = renderToStaticMarkup(
    createElement(LanguageProvider, null, createElement(CertificationArchive))
  )
  assert.equal((html.match(/<button\b/g) ?? []).length, 1)
  assert.match(html, /aria-expanded="false"/)
  assert.match(html, /(?:Lihat semua 38 sertifikat|View all 38 certificates)/)
  const target = html.match(/aria-controls="([^"]+)"/)?.[1]
  assert.ok(target)
  assert.ok(html.includes(`id="${target}" hidden`))

  const source = fs.readFileSync(ARCHIVE_PATH, "utf-8")
  assert.match(source, /Lihat semua \$\{totalCount\} sertifikat/)
  assert.match(source, /View all \$\{totalCount\} certificates/)
  assert.match(source, /Tutup arsip/)
  assert.match(source, /Close archive/)
  assert.match(source, /handleCategoryChange\(cat\.id\)/)
})

test("archive announces the selected platform and category filters", () => {
  const source = fs.readFileSync(ARCHIVE_PATH, "utf-8")

  for (const issuer of ["all", "dicoding", "linkedin"]) {
    assert.ok(
      source.includes(`aria-pressed={activeIssuer === "${issuer}"}`),
      `Missing pressed state for platform ${issuer}`
    )
  }
  assert.match(source, /aria-pressed=\{activeCategory === "all"\}/)
  assert.match(source, /aria-pressed=\{activeCategory === cat\.id\}/)
})

test("closing archive details restores focus to the selected certificate button", () => {
  const source = fs.readFileSync(ARCHIVE_PATH, "utf-8")

  assert.match(source, /ref=\{isSelected \? selectedButtonRef : undefined\}/)
  assert.match(source, /onClose=\{handleCloseDetailWithFocus\}/)
  assert.match(
    source,
    /const selectedButton = selectedButtonRef\.current\s+setSelectedCertId\(null\)\s+selectedButton\?\.focus\(\)/
  )
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

test("course dates match the audited source documents by stable ID", () => {
  const expected: Record<string, [string, string?]> = {
    "dicoding-web-dasar": ["2024-08-19", "2027-08-19"],
    "dicoding-fe-pemula": ["2024-08-20", "2027-08-20"],
    "dicoding-fe-fundamental": ["2024-09-14", "2027-09-14"],
    "dicoding-fe-tools": ["2024-10-16", "2027-10-16"],
    "dicoding-react-fundamental": ["2024-08-25", "2027-08-25"],
    "dicoding-react-pemula": ["2024-08-22", "2027-08-22"],
    "dicoding-react-expert": ["2024-10-02", "2027-10-02"],
    "dicoding-js-dasar": ["2024-08-21", "2027-08-21"],
    "dicoding-backend-pemula": ["2024-10-14", "2027-10-14"],
    "dicoding-aws-cloud": ["2024-09-10", "2027-09-10"],
    "dicoding-sql-dasar": ["2025-01-15", "2028-01-15"],
    "dicoding-python-dasar": ["2025-01-13", "2028-01-13"],
    "dicoding-python-prosedural": ["2024-01-15", "2027-01-15"],
    "dicoding-data-science": ["2025-01-05", "2028-01-05"],
    "dicoding-git-github": ["2021-10-17", "2024-10-17"],
    "dicoding-project-management": ["2024-01-07", "2027-01-07"],
    "linkedin-react-essential": ["2025-07-03"],
    "linkedin-react-practice": ["2025-07-03"],
    "linkedin-agile-foundations": ["2025-06-18"],
    "linkedin-strategic-agility": ["2025-07-03"],
    "linkedin-rapid-workplace-change": ["2025-07-03"],
    "linkedin-cultural-humility": ["2025-06-24"],
    "linkedin-embracing-uncertainty": ["2025-07-03"],
    "linkedin-fearless-mindfulness": ["2025-07-03"],
    "linkedin-speaking-up": ["2025-06-20"],
    "linkedin-courage-to-speak-up": ["2025-07-03"],
    "linkedin-nano-communicating-courage": ["2025-06-20"],
    "linkedin-nano-strength-resilience": ["2025-06-17"],
    "linkedin-courage-habit": ["2025-06-20"],
    "linkedin-courage-self-compassion": ["2025-06-20"],
    "linkedin-compassionate-purpose": ["2025-06-20"],
    "linkedin-rapport-customers": ["2025-06-18"],
    "linkedin-positive-conversations-customers": ["2025-06-20"],
    "linkedin-nano-customer-centric": ["2025-06-20"],
    "linkedin-personalized-sales": ["2025-06-20"],
    "linkedin-business-ethics": ["2025-06-20"],
    "linkedin-ethics-sales": ["2025-06-20"],
    "linkedin-practical-ethics": ["2025-07-03"],
  }

  assert.equal(Object.keys(expected).length, CERTIFICATES_DATA.length)
  for (const cert of CERTIFICATES_DATA) {
    const dates = expected[cert.id]
    assert.ok(dates, cert.id)
    assert.equal(cert.issuedAt, dates[0], cert.id)
    assert.equal(cert.expiresAt, dates[1], cert.id)
    if (cert.expiresAt) assert.ok(dates[0] < cert.expiresAt)
  }
})

test("Learning Archive uses a single bilingual summary and compact platform folders", () => {
  assert.deepEqual(LEARNING_ARCHIVE_HERO.title, {
    id: "Arsip Pembelajaran",
    en: "Learning Archive",
  })
  const grid = fs.readFileSync(
    "components/stack/certification-folder-grid.tsx",
    "utf-8"
  )
  const folder = fs.readFileSync(
    "components/stack/certification-folder.tsx",
    "utf-8"
  )
  assert.match(grid, /getTotalCertificatesCount\(\)/)
  assert.match(grid, /grid-cols-1[^"\n]*lg:grid-cols-2/)
  assert.match(
    folder,
    /<Badge[^>]*variant="outline"[^>]*>\s*\{certCountLabel\}\s*<\/Badge>/
  )
  assert.doesNotMatch(folder, /\[Buka 3 Dokumen\]/)
})

test("credential actions are conditional native links in detail and archive", () => {
  const detail = fs.readFileSync(DETAIL_PATH, "utf-8")
  const archive = fs.readFileSync(ARCHIVE_PATH, "utf-8")
  assert.match(detail, /<CertificateCredentialLink\s+certificate=\{cert\}/)
  assert.match(
    archive,
    /<\/button>\s*<CertificateCredentialLink\s+certificate=\{cert\}/
  )
  const { CertificateCredentialLink } = loadTsx(
    path.resolve("components/stack/certificate-credential-link.tsx")
  ) as typeof import("../../components/stack/certificate-credential-link")

  const title = "Example certificate"
  const credentialUrl = "https://example.test/certificates/example"
  const withoutUrl = renderToStaticMarkup(
    createElement(CertificateCredentialLink, {
      certificate: { title },
      lang: "en",
    })
  )
  assert.equal(withoutUrl, "")

  for (const [lang, label, tabHint] of [
    ["id", "Lihat sertifikat", "buka di tab baru"],
    ["en", "Show credential", "opens in a new tab"],
  ] as const) {
    const html = renderToStaticMarkup(
      createElement(CertificateCredentialLink, {
        certificate: { title, credentialUrl },
        lang,
      })
    )
    assert.ok(html.startsWith("<a "))
    assert.ok(html.includes(`href="${credentialUrl}"`))
    assert.match(html, /target="_blank"/)
    assert.match(html, /rel="noopener noreferrer"/)
    assert.ok(html.includes(`aria-label="${label}: ${title} (${tabHint})"`))
  }
})
