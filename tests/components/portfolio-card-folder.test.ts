import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

const COMPONENT_PATH = path.resolve(
  process.cwd(),
  "components/portfolio/portfolio-card-folder.tsx"
)

test("portfolio-card-folder file exists and exports PortfolioCardFolder component", () => {
  assert.ok(
    fs.existsSync(COMPONENT_PATH),
    "components/portfolio/portfolio-card-folder.tsx must exist"
  )
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /export (function PortfolioCardFolder|const PortfolioCardFolder)/,
    "portfolio-card-folder.tsx must export PortfolioCardFolder"
  )
})

test("portfolio-card-folder curates exactly 6 featured projects in exact order", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Must define the 6 featured projects in exact order
  const expectedSequence = [
    "hiblow-fleet",
    "is-ware",
    "alisa",
    "wbs",
    "info-tender",
    "imaps",
  ]

  for (const id of expectedSequence) {
    assert.ok(
      source.includes(`"${id}"`) || source.includes(`'${id}'`),
      `portfolio-card-folder must include featured project id '${id}'`
    )
  }

  // Check sequence definition
  assert.match(
    source,
    /hiblow-fleet[\s\S]*?is-ware[\s\S]*?alisa[\s\S]*?wbs[\s\S]*?info-tender[\s\S]*?imaps/,
    "featured projects must be in required order"
  )
})

test("portfolio-card-folder implements responsive grid and section header", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Section header 02
  assert.match(source, /02 \/\//, "must have section index 02 //")

  // Responsive grid
  assert.match(
    source,
    /grid-cols-1[\s\S]*?md:grid-cols-2/,
    "must implement responsive 1 col mobile and 2 col tablet"
  )

  // Uses FolderBentoCard
  assert.match(
    source,
    /FolderBentoCard/,
    "must render FolderBentoCard for each project"
  )
})

test("portfolio-card-folder includes expandable drawer for all 10 projects with bilingual toggle", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Must include the 4 additional projects
  const additionalProjects = ["monara", "cart", "caterine-cm", "pis-mars"]
  for (const id of additionalProjects) {
    assert.ok(
      source.includes(`"${id}"`) || source.includes(`'${id}'`),
      `portfolio-card-folder must include additional project id '${id}'`
    )
  }

  // Bilingual toggle labels
  assert.match(
    source,
    /(Lihat Semua 10 Proyek|View All 10 Projects)/,
    "must include bilingual toggle label for viewing all 10 projects"
  )

  // Accessible attributes
  assert.match(
    source,
    /aria-expanded/,
    "must implement aria-expanded on toggle button"
  )
  assert.match(
    source,
    /aria-controls/,
    "must implement aria-controls pointing to drawer"
  )
})

test("portfolio-card-folder integrates ProjectDetailDialog", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /ProjectDetailDialog/,
    "portfolio-card-folder must integrate ProjectDetailDialog"
  )
  assert.match(
    source,
    /selectedProject/,
    "must maintain selectedProject state for dialog"
  )
})
