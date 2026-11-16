import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

const PAGE_PATH = path.resolve(process.cwd(), "app/portfolio/page.tsx")

test("portfolio page file exists and exports PortfolioPage component", () => {
  assert.ok(fs.existsSync(PAGE_PATH), "app/portfolio/page.tsx must exist")
  const source = fs.readFileSync(PAGE_PATH, "utf-8")

  assert.match(
    source,
    /export default function PortfolioPage/,
    "portfolio page must export default PortfolioPage"
  )
})

test("portfolio page integrates VexooSubpageShell and PlayfulFooter", () => {
  const source = fs.readFileSync(PAGE_PATH, "utf-8")

  assert.match(
    source,
    /VexooSubpageShell/,
    "portfolio page must use VexooSubpageShell"
  )
  assert.match(
    source,
    /currentSectionKey=["']portfolio["']/,
    "portfolio page must set currentSectionKey to portfolio"
  )
  assert.match(
    source,
    /PlayfulFooter/,
    "portfolio page must pass PlayfulFooter"
  )
  assert.match(
    source,
    /footer=\{<PlayfulFooter[\s\S]*?>\}/,
    "portfolio page must pass PlayfulFooter to footer slot"
  )
})

test("portfolio page mounts PortfolioHero, ProjectTimelineAccordion, and PortfolioCardFolder in exact order", () => {
  const source = fs.readFileSync(PAGE_PATH, "utf-8")

  assert.match(
    source,
    /PortfolioHero/,
    "portfolio page must mount PortfolioHero"
  )
  assert.match(
    source,
    /ProjectTimelineAccordion/,
    "portfolio page must mount ProjectTimelineAccordion (V2)"
  )
  assert.doesNotMatch(
    source,
    /PortfolioTimeline\b/,
    "portfolio page must NOT mount legacy PortfolioTimeline"
  )
  assert.match(
    source,
    /PortfolioCardFolder/,
    "portfolio page must mount PortfolioCardFolder"
  )

  const heroIdx = source.indexOf("<PortfolioHero")
  const accordionIdx = source.indexOf("<ProjectTimelineAccordion")
  const cardFolderIdx = source.indexOf("<PortfolioCardFolder")

  assert.ok(heroIdx > -1, "PortfolioHero must be present")
  assert.ok(
    accordionIdx > heroIdx,
    "ProjectTimelineAccordion must come after PortfolioHero"
  )
  assert.ok(
    cardFolderIdx > accordionIdx,
    "PortfolioCardFolder must come after ProjectTimelineAccordion"
  )
})

test("portfolio page preserves subpages.portfolio metadata SEO", () => {
  const source = fs.readFileSync(PAGE_PATH, "utf-8")

  assert.match(
    source,
    /subpages\.portfolio\.title/,
    "metadata must use subpages.portfolio.title"
  )
  assert.match(
    source,
    /subpages\.portfolio\.description/,
    "metadata must use subpages.portfolio.description"
  )
})

test("portfolio page uses fluid full-width layout without restrictive max-w-5xl constraint", () => {
  const source = fs.readFileSync(PAGE_PATH, "utf-8")

  assert.doesNotMatch(
    source,
    /max-w-5xl/,
    "portfolio page must not constrain content within max-w-5xl"
  )
})
