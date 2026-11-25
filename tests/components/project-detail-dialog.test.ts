import test from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"
import { projects } from "../../lib/cv-professional-data.ts"
import { getProjectCategory } from "../../lib/projects-filter.ts"

const COMPONENT_PATH = path.resolve(
  process.cwd(),
  "components/project-detail-dialog.tsx"
)

const CARD_FOLDER_PATH = path.resolve(
  process.cwd(),
  "components/portfolio/portfolio-card-folder.tsx"
)

test("first project has all required data for detail dialog", () => {
  const project = projects[0]
  assert.ok(project.name)
  assert.ok(project.role.id)
  assert.ok(project.role.en)
  assert.ok(project.description.id)
  assert.ok(project.description.en)
  assert.ok(Array.isArray(project.tech))
  assert.ok(project.tech.length > 0)
})

test("all 13 projects have complete company, period, and category data", () => {
  assert.strictEqual(projects.length, 13, "must have exactly 13 projects")
  for (const project of projects) {
    assert.ok(project.id, "project must have id")
    assert.ok(project.name, `project ${project.id} must have name`)
    assert.ok(project.company.id, `project ${project.id} must have company.id`)
    assert.ok(project.company.en, `project ${project.id} must have company.en`)
    assert.ok(project.period.id, `project ${project.id} must have period.id`)
    assert.ok(project.period.en, `project ${project.id} must have period.en`)
    const category = getProjectCategory(project.id)
    assert.ok(
      category === "enterprise" || category === "fullstack",
      `project ${project.id} category must be enterprise or fullstack`
    )
    if (project.bullets) {
      assert.ok(Array.isArray(project.bullets))
      for (const bullet of project.bullets) {
        assert.ok(bullet.id, `bullet in ${project.id} must have id`)
        assert.ok(bullet.en, `bullet in ${project.id} must have en`)
      }
    }
  }
})

test("project-detail-dialog file exists and exports ProjectDetailDialog component", () => {
  assert.ok(
    fs.existsSync(COMPONENT_PATH),
    "components/project-detail-dialog.tsx must exist"
  )
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")
  assert.match(
    source,
    /export (function ProjectDetailDialog|const ProjectDetailDialog)/,
    "must export ProjectDetailDialog"
  )
})

test("project-detail-dialog implements responsive layout classes (mobile bottom-sheet docked at bottom-0, tablet 3xl, desktop 4xl)", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Mobile native bottom sheet docked at bottom-0 with dvh height and rounded top
  assert.match(
    source,
    /bottom-0[\s\S]*?w-full[\s\S]*?rounded-t-3xl[\s\S]*?max-h-\[88dvh\]/,
    "must implement native mobile bottom-sheet docked at bottom-0 with rounded-t-3xl and bounded dvh"
  )

  // Mobile pull handle indicator
  assert.match(
    source,
    /bg-muted-foreground\/25[\s\S]*?sm:hidden/,
    "must render mobile pull handle indicator in header"
  )

  // Tablet preserved centered dialog with proportional max-width (3xl)
  assert.match(
    source,
    /sm:top-1\/2[\s\S]*?sm:max-w-3xl/,
    "must preserve centered dialog with sm:max-w-3xl for comfortable tablet width"
  )

  // Desktop generous max-width (4xl ~896px)
  assert.match(
    source,
    /lg:max-w-4xl/,
    "must preserve lg:max-w-4xl for generous desktop dossier reading space"
  )

  // Maximum desktop height bounded to 90dvh
  assert.match(source, /lg:max-h-\[90dvh\]/, "must cap desktop height to 90dvh")
})

test("project-detail-dialog implements sticky header with dossier metadata, long title wrap, and accessible close button", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Sticky header with backdrop blur
  assert.match(
    source,
    /DialogHeader[\s\S]*?sticky top-0[\s\S]*?backdrop-blur/,
    "header must be sticky with backdrop-blur"
  )

  // Technical dossier identifier
  assert.match(
    source,
    /DOSSIER \/\//,
    "must include technical DOSSIER // identifier"
  )

  // Category badge
  assert.match(source, /categoryLabel/, "must display category badge")

  // DialogTitle with long title wrapping
  assert.match(
    source,
    /<DialogTitle[\s\S]*?(break-words|wrap-break-word)/,
    "DialogTitle must include break-words/wrap-break-word to handle long titles gracefully"
  )

  // Dedicated close button in header with accessible label
  assert.match(
    source,
    /<DialogClose[\s\S]*?aria-label=\{lang === ["']id["'] \? ["']Tutup dialog["'] : ["']Close dialog["']\}/,
    "must render accessible DialogClose button with bilingual aria-label"
  )
})

test("project-detail-dialog implements single scroll body with overscroll-contain and structured sections", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Single internal scroll container with overscroll-contain
  assert.match(
    source,
    /overflow-y-auto overscroll-contain/,
    "scroll body must use overflow-y-auto and overscroll-contain"
  )

  // Section: Overview
  assert.match(
    source,
    /(Ringkasan Proyek|Project Overview)/,
    "must render Project Overview section"
  )

  // Section: Role & Scope
  assert.match(
    source,
    /(Peran & Lingkup Tanggung Jawab|Role & Responsibilities)/,
    "must render Role & Responsibilities section"
  )

  // Section: Architecture & Engineering Highlights
  assert.match(
    source,
    /(Sorotan Arsitektur & Rekayasa|Architecture & Engineering Highlights)/,
    "must render Architecture & Engineering Highlights section"
  )

  // Structured bullet items
  assert.match(
    source,
    /project\.bullets\.map/,
    "must map bullet highlights into structured items"
  )

  // Section: Technology Stack
  assert.match(
    source,
    /(Tumpukan Teknologi|Technology Stack)/,
    "must render Technology Stack section"
  )
  assert.match(
    source,
    /project\.tech\.map/,
    "must map tech stack into responsive badges"
  )
})

test("project-detail-dialog implements sticky footer with safe-area padding and action buttons", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Sticky footer
  assert.match(
    source,
    /sticky bottom-0[\s\S]*?border-t/,
    "footer must be sticky with top border"
  )

  // Safe-area inset bottom padding
  assert.match(
    source,
    /env\(safe-area-inset-bottom\)/,
    "footer must respect safe-area-inset-bottom for mobile devices"
  )

  // Link button or internal corporate documentation fallback
  assert.match(
    source,
    /(Kunjungi Tautan|Visit Project)/,
    "must support project external link"
  )
  assert.match(
    source,
    /(Dokumentasi internal korporat|Internal corporate documentation)/,
    "must provide fallback notice for internal documentation"
  )

  // Close button in footer
  assert.match(
    source,
    /<DialogClose[\s\S]*?(Tutup|Close)/,
    "must include accessible close button in footer"
  )
})

test("project-detail-dialog satisfies WAI-ARIA compliance with hidden DialogDescription", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /<DialogDescription className=["']sr-only["']>/,
    "must provide visually hidden DialogDescription for screen readers"
  )
})

test("Selected Works owns ProjectDetailDialog and passes selection & dialog open state", () => {
  const cardFolderSource = fs.readFileSync(CARD_FOLDER_PATH, "utf-8")

  // PortfolioCardFolder renders ProjectDetailDialog
  assert.match(
    cardFolderSource,
    /<ProjectDetailDialog[\s\S]*?project=\{selectedProject\}[\s\S]*?open=\{dialogOpen\}[\s\S]*?onOpenChange=\{setDialogOpen\}/,
    "PortfolioCardFolder must own and mount single ProjectDetailDialog"
  )

  // Pass isDialogOpen to cards for hover suppression
  assert.match(
    cardFolderSource,
    /isDialogOpen=\{dialogOpen && selectedProject\?\.ref === project\.ref\}/,
    "must pass isDialogOpen to FolderBentoCards for hover suppression preservation"
  )
})
