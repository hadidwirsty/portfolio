import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"
import {
  FEATURED_PROJECT_IDS,
  ADDITIONAL_PROJECT_IDS,
} from "../../lib/portfolio-experience-filter.ts"
import { publicSelectedWorks } from "../../lib/public-portfolio-data.ts"

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
  const expectedSequence = [
    "hiblow-fleet",
    "is-ware",
    "alisa",
    "wbs",
    "info-tender",
    "imaps",
  ]

  assert.deepStrictEqual(
    FEATURED_PROJECT_IDS,
    expectedSequence,
    "featured projects must match required sequence"
  )
  assert.deepStrictEqual(
    publicSelectedWorks.filters.find(({ id }) => id === "featured")
      ?.projectRefs,
    expectedSequence,
    "the client projection must keep the featured sequence"
  )
})

test("portfolio-card-folder implements responsive grid and section header", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(source, /aria-labelledby="portfolio-projects-heading"/)
  assert.match(
    source,
    /<h2[^>]*id="portfolio-projects-heading"[^>]*>\s*\{lang === "id" \? "Proyek" : "Projects"\}/
  )

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

test("portfolio-card-folder includes expandable drawer for all 13 projects with bilingual toggle", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.equal(
    publicSelectedWorks.filters.find(({ id }) => id === "all")?.projectRefs
      .length,
    13
  )

  const additionalProjects = [
    "monara",
    "cart",
    "caterine-cm",
    "pis-mars",
    "cis",
    "bulk-orders",
    "netmonk",
  ]

  assert.deepStrictEqual(
    ADDITIONAL_PROJECT_IDS,
    additionalProjects,
    "additional projects must match required dataset"
  )

  // Dynamic bilingual toggle labels supporting 13 projects
  assert.match(
    source,
    /(Lihat Semua \$\{totalCount\} Proyek|View All \$\{totalCount\} Projects|Lihat Semua 13 Proyek|View All 13 Projects)/,
    "must include dynamic bilingual toggle label for viewing all 13 projects"
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

test("portfolio-card-folder renders accessible work experience filter pills", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Tablist container
  assert.match(
    source,
    /role=["']tablist["']/,
    "filter pills container must have role='tablist'"
  )

  // Tab items with aria-selected
  assert.match(
    source,
    /role=["']tab["']/,
    "filter pill items must have role='tab'"
  )
  assert.match(
    source,
    /aria-selected=\{isActive\}/,
    "filter pill items must synchronize aria-selected with active filter"
  )

  // Uses the projected filter definitions
  assert.match(
    source,
    /selectedWorks\.filters\.map/,
    "must map over the public filter definitions passed to Selected Works"
  )

  // State defaults to featured
  assert.match(
    source,
    /React\.useState<ExperienceFilterCategory>\(["']featured["']\)/,
    "active filter state must default to 'featured'"
  )

  // Renders visibleProjects dynamically
  assert.match(
    source,
    /visibleProjects\.map/,
    "must map over derived visibleProjects array"
  )
})

test("portfolio-card-folder implements smooth auto-scroll to section on collapse with reduced motion support", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Stable sectionRef and headingRef
  assert.match(
    source,
    /const sectionRef = React\.useRef<HTMLElement>\(null\)/,
    "must define sectionRef for stable scroll target"
  )
  assert.match(
    source,
    /const headingRef = React\.useRef<HTMLHeadingElement>\(null\)/,
    "must define headingRef for accessible focus transfer"
  )

  // Section element has ref and scroll margin
  assert.match(
    source,
    /<section[^>]*ref=\{sectionRef\}[^>]*scroll-mt-20/,
    "section must attach sectionRef and include responsive scroll margin for navbar clearance"
  )

  // Heading element has ref and tabIndex={-1}
  assert.match(
    source,
    /<h2[^>]*ref=\{headingRef\}[^>]*tabIndex=\{-1\}/,
    "heading must attach headingRef with tabIndex={-1} for programmatic focus"
  )

  // Collapse behavior triggers scroll and focus with preventScroll
  assert.match(
    source,
    /sectionRef\.current\?\.scrollIntoView\(\{\s*behavior:\s*shouldReduceMotion\s*\?\s*["']auto["']\s*:\s*["']smooth["'],\s*block:\s*["']start["'],?\s*\}\)/,
    "collapse handler must call scrollIntoView honoring reduced-motion"
  )
  assert.match(
    source,
    /headingRef\.current\?\.focus\(\{\s*preventScroll:\s*true\s*\}\)/,
    "collapse handler must transfer focus with preventScroll: true to avoid bouncing back to button"
  )

  // Expand branch does not invoke scroll
  assert.match(
    source,
    /if\s*\(activeFilter === ["']featured["']\)\s*\{[\s\S]*?setActiveFilter\(["']all["']\)/,
    "expand branch must only activate 'all' filter without auto-scrolling"
  )
})
