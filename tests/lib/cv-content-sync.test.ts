import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"
import { profile, education, subpages } from "../../lib/cv-data.ts"
import { experience, projects } from "../../lib/cv-professional-data.ts"
import { timelineMilestones } from "../../lib/portfolio-timeline-data.ts"
import {
  projectTimelineItems,
  getProjectTimelineItemById,
} from "../../lib/portfolio-project-timeline-data.ts"
import { PROJECT_WORK_AFFILIATION } from "../../lib/portfolio-experience-filter.ts"
import { TECH_CATEGORIES } from "../../lib/tech-stack-data.ts"

// ---------------------------------------------------------------------------
// 1. CV Language-to-File Mapping and Public PDF Integrity
// ---------------------------------------------------------------------------

test("CV language mapping routes to exact bilingual public PDF paths", () => {
  assert.strictEqual(
    profile.cvFile.id,
    "/cv/Muhammad-Hadid-Wiransetyo-CV-2026-ID.pdf"
  )
  assert.strictEqual(
    profile.cvFile.en,
    "/cv/Muhammad-Hadid-Wiransetyo-CV-2026.pdf"
  )

  const idPdfPath = path.join(process.cwd(), "public", profile.cvFile.id)
  const enPdfPath = path.join(process.cwd(), "public", profile.cvFile.en)

  assert.ok(fs.existsSync(idPdfPath), "Indonesian public CV PDF must exist")
  assert.ok(fs.existsSync(enPdfPath), "English public CV PDF must exist")

  assert.ok(
    fs.statSync(idPdfPath).size > 50000,
    "Indonesian PDF size must be valid (>50KB)"
  )
  assert.ok(
    fs.statSync(enPdfPath).size > 50000,
    "English PDF size must be valid (>50KB)"
  )
})

test("Public PDFs contain zero phone number patterns", () => {
  // Read personal config if present to extract raw phone
  const configPath = path.join(process.cwd(), ".cv_personal_config.json")
  let personalPhoneDigits = ""
  if (fs.existsSync(configPath)) {
    try {
      const cfg = JSON.parse(fs.readFileSync(configPath, "utf-8"))
      personalPhoneDigits = (cfg.phone || "").replace(/\D/g, "")
    } catch {
      // ignore
    }
  }

  const pdfPaths = [
    path.join(process.cwd(), "public", profile.cvFile.id),
    path.join(process.cwd(), "public", profile.cvFile.en),
  ]

  for (const pdfPath of pdfPaths) {
    const buffer = fs.readFileSync(pdfPath)
    const content = buffer.toString("latin1")

    // Personal phone digits must not appear
    if (personalPhoneDigits && personalPhoneDigits.length >= 10) {
      assert.ok(
        !content.includes(personalPhoneDigits),
        `Public PDF '${path.basename(pdfPath)}' must not contain personal phone digits`
      )
    }

    // Common phone formatting prefixes must not be present in public PDFs
    assert.ok(
      !content.includes("+62 8"),
      `Public PDF '${path.basename(pdfPath)}' must not contain '+62 8'`
    )
  }
})

// ---------------------------------------------------------------------------
// 2. Professional Experience Accuracy & Official Wording
// ---------------------------------------------------------------------------

test("Telkomsigma experience reflects exactly 2 years and official 10-initiatives wording", () => {
  const sigma = experience.find((e) => e.id === "sigma")
  assert.ok(sigma, "Telkomsigma experience entry must exist")

  assert.strictEqual(sigma.role.id, "Junior Programmer")
  assert.strictEqual(sigma.role.en, "Junior Programmer")

  assert.strictEqual(sigma.period.id, "Nov 2024 – Okt 2026")
  assert.strictEqual(sigma.period.en, "Nov 2024 – Oct 2026")

  assert.strictEqual(sigma.employmentType.id, "Kontrak")
  assert.strictEqual(sigma.employmentType.en, "Contract")

  assert.ok(
    sigma.location.id.includes("On-site"),
    "Telkomsigma must be on-site"
  )

  // Official enterprise wording
  assert.ok(sigma.summary, "Telkomsigma must have a summary")
  assert.ok(
    sigma.summary.id.includes(
      "Berkontribusi dalam 10 inisiatif pengembangan dan pemeliharaan aplikasi web enterprise bagi klien B2B dan unit internal Telkom Group menggunakan Next.js, React, Angular 18, Vue, dan Blazor."
    ),
    "Telkomsigma summary.id must contain official 10-initiatives wording"
  )
  assert.ok(
    sigma.summary.en.includes(
      "Contributed to 10 enterprise web development and maintenance initiatives for B2B clients and internal Telkom Group teams, using Next.js, React, Angular 18, Vue, and Blazor."
    ),
    "Telkomsigma summary.en must contain official 10-initiatives wording"
  )

  // Must never say 'nearly 2 years' or 'hampir 2 tahun'
  const allText = JSON.stringify(experience)
  assert.ok(
    !allText.toLowerCase().includes("hampir 2 tahun"),
    "Must never contain 'hampir 2 tahun'"
  )
  assert.ok(
    !allText.toLowerCase().includes("nearly 2 years"),
    "Must never contain 'nearly 2 years'"
  )
})

test("Telkom Indonesia and Tumbuhin Digital experiences have accurate parameters", () => {
  const telkom = experience.find((e) => e.id === "telkom")
  assert.ok(telkom, "Telkom Indonesia entry must exist")
  assert.strictEqual(telkom.period.id, "Jan 2023 – Des 2023")
  assert.strictEqual(telkom.period.en, "Jan 2023 – Dec 2023")
  assert.strictEqual(telkom.employmentType.id, "Magang")
  assert.strictEqual(telkom.employmentType.en, "Internship")

  const tumbuhin = experience.find((e) => e.id === "tumbuhin")
  assert.ok(tumbuhin, "Tumbuhin Digital entry must exist")
  assert.strictEqual(tumbuhin.period.id, "Mei 2026 – Jun 2026")
  assert.strictEqual(tumbuhin.period.en, "May 2026 – Jun 2026")
  assert.strictEqual(tumbuhin.employmentType.id, "Paruh Waktu")
  assert.strictEqual(tumbuhin.employmentType.en, "Part-Time")
})

// ---------------------------------------------------------------------------
// 3. 10 Initiatives vs 11 Codebases vs 13 Projects
// ---------------------------------------------------------------------------

test("Initiatives, codebases, and projects follow exact authoritative mapping", () => {
  const sigma = experience.find((e) => e.id === "sigma")
  assert.ok(sigma)

  // Telkomsigma maps exactly 10 projects / initiatives
  assert.strictEqual(
    sigma.projectIds.length,
    10,
    "Telkomsigma must cover exactly 10 project IDs"
  )

  // All 10 projects are affiliated with Telkomsigma
  for (const pid of sigma.projectIds) {
    assert.strictEqual(
      PROJECT_WORK_AFFILIATION[pid],
      "telkomsigma",
      `Project '${pid}' must be affiliated with telkomsigma`
    )
  }

  // Total projects in cv-data is exactly 13
  assert.strictEqual(projects.length, 13, "Total projects must be exactly 13")
  assert.strictEqual(
    projectTimelineItems.length,
    13,
    "Project timeline items must be exactly 13"
  )
})

// ---------------------------------------------------------------------------
// 4. Bilingual Thesis Titles (Exact Official Title)
// ---------------------------------------------------------------------------

test("Thesis titles match exact official wording across education and milestones", () => {
  const expectedId =
    "Keamanan Akses Embed Dashboard Metabase dengan JSON Web Token (JWT) pada Purwarupa Web Analytics Netmonk"
  const expectedEn =
    "Securing Access to Embed Metabase Dashboards With JSON Web Token (JWT) in Netmonk's Prototype Web Analytics"

  // Check in cv-data education
  const ugmEdu = education.find((e) => e.id === "ugm")
  assert.ok(ugmEdu && ugmEdu.extra)
  assert.ok(
    ugmEdu.extra.id.includes(expectedId),
    "Education extra.id must contain exact official thesis title"
  )
  assert.ok(
    ugmEdu.extra.en.includes(expectedEn),
    "Education extra.en must contain exact official thesis title"
  )

  // Check in portfolio-timeline-data milestone
  const ugmMilestone = timelineMilestones.find((m) => m.id === "ugm-cs")
  assert.ok(ugmMilestone, "UGM milestone must exist")
  const thesisHighlight = ugmMilestone.highlights.find(
    (h) => h.id.includes("Skripsi") || h.en.includes("Thesis")
  )
  assert.ok(thesisHighlight, "Thesis highlight in UGM milestone must exist")
  assert.ok(
    thesisHighlight.id.includes(expectedId),
    "UGM milestone highlight.id must contain exact official thesis title"
  )
  assert.ok(
    thesisHighlight.en.includes(expectedEn),
    "UGM milestone highlight.en must contain exact official thesis title"
  )
})

// ---------------------------------------------------------------------------
// 5. Updated Milestone Wording in Timeline V1
// ---------------------------------------------------------------------------

test("Career Timeline V1 milestone wording reflects 10 Initiatives and four categories", () => {
  const sigmaMilestone = timelineMilestones.find(
    (m) => m.id === "telkomsigma-enterprise"
  )
  assert.ok(sigmaMilestone, "Telkomsigma milestone must exist")

  assert.strictEqual(
    sigmaMilestone.title.id,
    "Junior Programmer — 10 Inisiatif Web Enterprise",
    "Milestone title.id must say '10 Inisiatif Web Enterprise'"
  )
  assert.strictEqual(
    sigmaMilestone.title.en,
    "Junior Programmer — 10 Enterprise Web Initiatives",
    "Milestone title.en must say '10 Enterprise Web Initiatives'"
  )

  // Summary distinguishes the 4 categories
  const summaryId = sigmaMilestone.summary.id
  const summaryEn = sigmaMilestone.summary.en

  assert.ok(
    summaryId.includes("pengembangan baru") &&
      summaryId.includes("modul") &&
      summaryId.includes("PoC") &&
      summaryId.includes("pemeliharaan"),
    "Milestone summary.id must distinguish new development, modules, PoC, and maintenance"
  )

  assert.ok(
    summaryEn.includes("new development") &&
      summaryEn.includes("modules") &&
      summaryEn.includes("PoC") &&
      summaryEn.includes("maintenance"),
    "Milestone summary.en must distinguish new development, modules, PoC, and maintenance"
  )
})

// ---------------------------------------------------------------------------
// 6. Chronology Guard: Netmonk Internship Does Not Claim 2026 Vite 6 Migration
// ---------------------------------------------------------------------------

test("Chronology guard: Netmonk 2023 internship does not claim post-internship Vite 6 modernization", () => {
  const telkomMilestone = timelineMilestones.find(
    (m) => m.id === "telkom-intern"
  )
  assert.ok(telkomMilestone, "Telkom intern milestone must exist")

  for (const highlight of telkomMilestone.highlights) {
    assert.ok(
      !highlight.id.includes("Vite 6"),
      "Telkom 2023 internship milestone must not claim Vite 6 migration"
    )
    assert.ok(
      !highlight.en.includes("Vite 6"),
      "Telkom 2023 internship milestone must not claim Vite 6 migration"
    )
  }

  // Netmonk timeline item tech stack must not claim Vite 6 as an internship tech
  const netmonkTimeline = getProjectTimelineItemById("netmonk")
  assert.ok(netmonkTimeline)
  assert.ok(
    !netmonkTimeline.techStack.includes("Vite 6"),
    "Netmonk timeline tech stack must not include Vite 6"
  )
})

// ---------------------------------------------------------------------------
// 7. Project Timeline Item Tech Stack Accuracy
// ---------------------------------------------------------------------------

test("IMAPS attributes Angular 18, NG-ZORRO, and RxJS without claiming Ant Design React", () => {
  const imaps = projects.find((project) => project.id === "imaps")
  assert.ok(imaps)
  assert.deepStrictEqual(imaps.tech, [
    "Angular 18",
    "NG-ZORRO",
    "TypeScript",
    "Tailwind CSS",
    "REST API",
    "RxJS",
  ])
  for (const role of Object.values(imaps.role)) {
    assert.match(role, /Angular 18.*NG-ZORRO/)
    assert.doesNotMatch(role, /Ant Design/i)
  }

  const timeline = getProjectTimelineItemById("imaps")
  assert.ok(timeline)
  assert.deepStrictEqual(timeline.techStack, imaps.tech.slice(0, -1))
})

test("Tech Stack evidence keeps Ant Design and NG-ZORRO separate and Vitest attributed to HiBlow Fleet", () => {
  const technologies = TECH_CATEGORIES.flatMap(({ techs }) => techs)
  const antDesign = technologies.find(({ id }) => id === "ant-design")
  const ngZorro = technologies.find(({ id }) => id === "ng-zorro")
  const rxjs = technologies.find(({ id }) => id === "rxjs")
  const vitest = technologies.find(({ id }) => id === "vitest")

  assert.ok(antDesign && ngZorro && rxjs && vitest)
  assert.ok(antDesign.verifiedIn.some((entry) => entry.startsWith("Alisa 2.0")))
  assert.ok(antDesign.verifiedIn.every((entry) => !/\bIMAPS\b/i.test(entry)))
  assert.ok(ngZorro.verifiedIn.some((entry) => /\bIMAPS\b/i.test(entry)))
  assert.ok(rxjs.verifiedIn.some((entry) => /\bIMAPS\b/i.test(entry)))
  assert.ok(vitest.verifiedIn.some((entry) => entry.startsWith("HiBlow Fleet")))
  assert.ok(
    vitest.verifiedIn.every((entry) => !/Portfolio CV|node:test/i.test(entry))
  )
})

test("The public-safe enterprise maintenance project wording is preserved", () => {
  const titleEn = "Enterprise Web Applications Maintenance & Operations Portal"
  const titleId = "Pemeliharaan Aplikasi Web Enterprise & Portal Operasional"
  const project = projects.find(({ name }) => name === titleEn)
  assert.ok(project)
  assert.strictEqual(getProjectTimelineItemById(project.id)?.name, titleEn)
  assert.ok(
    experience.some(({ points }) =>
      points.some(
        (point) =>
          point.id.startsWith(`${titleId}: `) &&
          point.en.startsWith(`${titleEn}: `)
      )
    )
  )
})

test("Project timeline items reflect verified tech stacks (IMAPS Angular 18, CART Nuxt/Vue, etc.)", () => {
  const imaps = getProjectTimelineItemById("imaps")
  assert.ok(imaps)
  assert.ok(
    imaps.techStack.includes("Angular 18"),
    "IMAPS tech stack must include Angular 18"
  )
  assert.ok(
    !imaps.techStack.includes("React"),
    "IMAPS tech stack must NOT include React"
  )

  const cart = getProjectTimelineItemById("cart")
  assert.ok(cart)
  assert.ok(
    cart.techStack.includes("Nuxt 3") || cart.techStack.includes("Vue.js"),
    "CART tech stack must include Nuxt 3 or Vue.js"
  )
  assert.ok(
    !cart.techStack.includes("React"),
    "CART tech stack must NOT include React"
  )

  const alisa = getProjectTimelineItemById("alisa")
  assert.ok(alisa)
  assert.ok(
    alisa.techStack.includes("React 19") || alisa.techStack.includes("React"),
    "Alisa tech stack must include React"
  )
  assert.ok(
    !alisa.techStack.includes("Vue 3"),
    "Alisa tech stack must NOT include Vue 3"
  )

  const isWare = getProjectTimelineItemById("is-ware")
  assert.ok(isWare)
  assert.ok(
    isWare.techStack.includes("Next.js") ||
      isWare.techStack.includes("React 19"),
    "IS-WARE tech stack must include Next.js/React 19"
  )
  assert.ok(
    !isWare.techStack.includes("Vue 3"),
    "IS-WARE tech stack must NOT include Vue 3"
  )

  const pisMars = getProjectTimelineItemById("pis-mars")
  assert.ok(pisMars)
  assert.ok(
    pisMars.techStack.includes(".NET 8") ||
      pisMars.techStack.includes("Blazor Server") ||
      pisMars.techStack.includes("C#"),
    "PIS MARS tech stack must include .NET 8 / Blazor Server / C#"
  )
  assert.ok(
    !pisMars.techStack.includes("Vue 3"),
    "PIS MARS tech stack must NOT include Vue 3"
  )
})

// ---------------------------------------------------------------------------
// 9. Portfolio Copywriting Polish & Precision Wording
// ---------------------------------------------------------------------------

test("Portfolio Hero avoids unverified 13-enterprise-applications claim and uses verified scope", () => {
  const descId = subpages.portfolio.description.id
  const descEn = subpages.portfolio.description.en

  assert.ok(
    !descId.includes("13 aplikasi web enterprise"),
    "subpages.portfolio.description.id must NOT claim all 13 are enterprise web applications"
  )
  assert.ok(
    !descEn.includes("13 enterprise web applications"),
    "subpages.portfolio.description.en must NOT claim all 13 are enterprise web applications"
  )

  assert.strictEqual(
    descId,
    "Jelajahi 13 proyek aplikasi web dan produk digital yang saya kerjakan melalui pengalaman magang, profesional, dan pengembangan mandiri."
  )
  assert.strictEqual(
    descEn,
    "Explore 13 web application and digital product projects from my internship, professional experience, and independent work."
  )
})

test("Section 01 Project Timeline and Section 02 Selected Works use polished recruiter-friendly wording", () => {
  const accordionPath = path.join(
    process.cwd(),
    "components",
    "portfolio",
    "project-timeline-accordion.tsx"
  )
  const cardFolderPath = path.join(
    process.cwd(),
    "components",
    "portfolio",
    "portfolio-card-folder.tsx"
  )

  const accordionSrc = fs.readFileSync(accordionPath, "utf-8")
  const cardFolderSrc = fs.readFileSync(cardFolderPath, "utf-8")

  // Section 01 heading
  assert.ok(
    !accordionSrc.includes("Evolusi Rekayasa Seluruh Proyek Riil"),
    "project-timeline-accordion must not use awkward 'Seluruh Proyek Riil' heading"
  )
  assert.ok(
    accordionSrc.includes("Perjalanan Pengembangan Proyek"),
    "project-timeline-accordion must use polished ID heading 'Perjalanan Pengembangan Proyek'"
  )
  assert.ok(
    accordionSrc.includes("Project Development Journey"),
    "project-timeline-accordion must use polished EN heading 'Project Development Journey'"
  )

  // Section 02 description
  assert.ok(
    !cardFolderSrc.includes("Arsip map bento"),
    "portfolio-card-folder must not use 'Arsip map bento' buzzword"
  )
  assert.ok(
    cardFolderSrc.includes(
      "Kumpulan proyek yang menunjukkan pengalaman saya membangun dan meningkatkan aplikasi web untuk berbagai kebutuhan bisnis."
    ),
    "portfolio-card-folder must use polished ID description"
  )
  assert.ok(
    cardFolderSrc.includes(
      "A selection of projects showcasing my experience building and improving web applications for diverse business needs."
    ),
    "portfolio-card-folder must use polished EN description"
  )
})
