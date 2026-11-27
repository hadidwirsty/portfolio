import test from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"
import { projects } from "../../lib/cv-professional-data.ts"
import { getProjectCategory } from "../../lib/projects-filter.ts"
import { publicSelectedWorks } from "../../lib/public-portfolio-data.ts"

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
    assert.ok(project.technicalDetails?.length)
    const headings = new Set<string>()
    for (const { title, description } of project.technicalDetails) {
      assert.ok(title.id.trim() && title.en.trim())
      assert.ok(description.id.trim() && description.en.trim())
      assert.ok(!headings.has(title.en))
      headings.add(title.en)
    }
    for (const { value, label } of project.highlights ?? []) {
      assert.ok(value.trim() && label.id.trim() && label.en.trim())
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

test("project detail gives the mobile bottom sheet more reading space and centers the dialog from tablet up", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")
  assert.match(
    source,
    /<DialogContent[\s\S]*?className="[^"]*bottom-0[^"]*h-\[92dvh\][^"]*rounded-t-3xl/
  )
  assert.match(source, /sm:top-1\/2[^"]*sm:h-auto[^"]*sm:max-h-\[88dvh\]/)
  assert.match(source, /sm:max-w-3xl/)
  assert.match(source, /max-w-\[68ch\]/)
})

test("project detail leads with the title, followed by role, affiliation, and period", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")
  const header = source.match(/<DialogHeader[\s\S]+?<\/DialogHeader>/)?.[0]
  assert.ok(header)
  assert.match(
    header,
    /<DialogTitle[^>]*wrap-break-word[^>]*>\s*\{project\.name\}/
  )
  assert.match(
    header,
    /<\/DialogTitle>[\s\S]*?project\.roleLabel\[lang\][\s\S]*?project\.company\[lang\][\s\S]*?project\.period\[lang\]/
  )
  assert.doesNotMatch(header, /DOSSIER|dossierCode/)
  assert.match(
    header,
    /<DialogClose[\s\S]*?aria-label=\{lang === "id" \? "Tutup dialog" : "Close dialog"\}/
  )
})

test("project detail presents a keyboard-scrollable overview, contribution, highlights, and titled technical list", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")
  assert.match(
    source,
    /tabIndex=\{0\}[\s\S]*?overflow-y-auto overscroll-contain/
  )
  assert.equal(source.match(/overflow-y-auto/g)?.length, 1)
  assert.match(
    source,
    /Project Overview[\s\S]*?My Contribution[\s\S]*?Project Highlights[\s\S]*?Technical Details[\s\S]*?Technology Stack/
  )
  assert.match(
    source,
    /project\.technicalDetails\.map[\s\S]*?<li[^>]*>[\s\S]*?<h4[^>]*>\s*\{title\[lang\]\}/
  )
  assert.match(source, /project\.tech\.map/)
})

test("HiBlow Fleet surfaces route and test counts, while project highlights remain optional", () => {
  assert.deepEqual(
    publicSelectedWorks.projectsByRef["hiblow-fleet"].highlights?.map(
      ({ value }) => value
    ),
    ["296", "297"]
  )
  assert.equal(publicSelectedWorks.projectsByRef.imaps.highlights, undefined)
})

test("project detail offers the public link as its primary action and respects the bottom safe area", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")
  assert.match(
    source,
    /\{project\.link && \([\s\S]*?env\(safe-area-inset-bottom\)[\s\S]*?<Button\s+className=[\s\S]*?<a href=\{project\.link\} target="_blank" rel="noreferrer"/
  )
  assert.match(source, /Kunjungi Proyek.*Visit Project/)
  assert.equal(source.match(/<DialogClose\s/g)?.length, 1)
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
