import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

const TIMELINE_PATH = path.resolve(
  process.cwd(),
  "components/portfolio/portfolio-timeline.tsx"
)

test("portfolio-timeline component file exists and exports PortfolioTimeline", () => {
  assert.ok(
    fs.existsSync(TIMELINE_PATH),
    "components/portfolio/portfolio-timeline.tsx must exist"
  )
  const source = fs.readFileSync(TIMELINE_PATH, "utf-8")

  assert.match(
    source,
    /export (function PortfolioTimeline|const PortfolioTimeline)/,
    "portfolio-timeline.tsx must export PortfolioTimeline"
  )
  assert.match(
    source,
    /["']use client["']/,
    "portfolio-timeline.tsx must be a client component"
  )
})

test("portfolio-timeline renders section heading with index 01 and subtitle", () => {
  const source = fs.readFileSync(TIMELINE_PATH, "utf-8")

  assert.match(
    source,
    /01[\s\S]*?(My Journey|Perjalanan)/,
    "portfolio-timeline must include section heading with index 01"
  )
})

test("portfolio-timeline integrates SVG wave curve and 5 milestone nodes for desktop", () => {
  const source = fs.readFileSync(TIMELINE_PATH, "utf-8")

  assert.match(
    source,
    /<svg[\s\S]*?viewBox=["']0 0 1000 220["']/,
    "must render SVG with 1000x220 viewBox"
  )
  assert.match(
    source,
    /getTimelineWaveGeometry/,
    "must import and use getTimelineWaveGeometry"
  )
  assert.match(source, /timelineMilestones/, "must import timelineMilestones")
})

test("portfolio-timeline implements Milestone Dossier with min-height to prevent layout shift", () => {
  const source = fs.readFileSync(TIMELINE_PATH, "utf-8")

  assert.match(
    source,
    /Milestone Dossier/,
    "must render Milestone Dossier label"
  )
  assert.match(
    source,
    /min-h-/,
    "Milestone Dossier must specify min-height to prevent layout shift"
  )
})

test("portfolio-timeline supports keyboard navigation and reduced motion", () => {
  const source = fs.readFileSync(TIMELINE_PATH, "utf-8")

  assert.match(
    source,
    /useReducedMotion/,
    "must support prefers-reduced-motion via useReducedMotion"
  )
  assert.match(
    source,
    /onKeyDown|ArrowRight|ArrowLeft/,
    "must support keyboard arrow navigation"
  )
  assert.match(
    source,
    /focus-visible:/,
    "must provide clear visible focus rings"
  )
})

test("portfolio-timeline provides responsive mobile vertical stream", () => {
  const source = fs.readFileSync(TIMELINE_PATH, "utf-8")

  assert.match(
    source,
    /lg:hidden/,
    "must include mobile/tablet layout hidden on desktop (lg:hidden)"
  )
  assert.match(
    source,
    /hidden lg:block/,
    "must include desktop layout visible only on large screens (hidden lg:block)"
  )
})
