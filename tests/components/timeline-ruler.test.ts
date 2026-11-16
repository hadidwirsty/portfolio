import { test } from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

import {
  TIMELINE_YEAR_MARKERS,
  getTimelineRulerPosition,
} from "../../lib/portfolio-project-timeline-data.ts"

const RULER_PATH = path.resolve(
  process.cwd(),
  "components/portfolio/timeline-ruler.tsx"
)

test("timeline-ruler exists and exports TimelineRuler", () => {
  assert.ok(
    fs.existsSync(RULER_PATH),
    "components/portfolio/timeline-ruler.tsx must exist"
  )
  const source = fs.readFileSync(RULER_PATH, "utf-8")

  assert.match(
    source,
    /export (function TimelineRuler|const TimelineRuler)/,
    "must export TimelineRuler component"
  )
  assert.match(
    source,
    /["']use client["']/,
    "must have 'use client' directive for Framer Motion animation"
  )
})

test("timeline-ruler renders 4 year markers (2023, 2024, 2025, 2026)", () => {
  const source = fs.readFileSync(RULER_PATH, "utf-8")

  assert.match(
    source,
    /TIMELINE_YEAR_MARKERS/,
    "must utilize TIMELINE_YEAR_MARKERS constant"
  )
  assert.equal(TIMELINE_YEAR_MARKERS.length, 4)
  assert.equal(TIMELINE_YEAR_MARKERS[0].year, 2023)
  assert.equal(TIMELINE_YEAR_MARKERS[1].year, 2024)
  assert.equal(TIMELINE_YEAR_MARKERS[2].year, 2025)
  assert.equal(TIMELINE_YEAR_MARKERS[3].year, 2026)
})

test("timeline-ruler synchronizes active scrubber position with project startMonth", () => {
  const source = fs.readFileSync(RULER_PATH, "utf-8")

  // Must call getTimelineRulerPosition with activeMonth
  assert.match(
    source,
    /getTimelineRulerPosition\(activeMonth\)/,
    "must calculate position from activeMonth via getTimelineRulerPosition"
  )

  // Test mathematical positions of various project months
  // Netmonk: 2023-01 -> 0%
  assert.equal(getTimelineRulerPosition("2023-01"), 0)
  // IMAPS: 2024-11 -> 22/45 * 100 = 48.888%
  const imapsPos = getTimelineRulerPosition("2024-11")
  assert.ok(imapsPos !== null && Math.abs(imapsPos - (22 / 45) * 100) < 0.001)
  // Info Tender: 2025-05 -> 28/45 * 100 = 62.222%
  const infoTenderPos = getTimelineRulerPosition("2025-05")
  assert.ok(
    infoTenderPos !== null && Math.abs(infoTenderPos - (28 / 45) * 100) < 0.001
  )
  // PIS MARS & Bulk Orders: 2026-05 -> 40/45 * 100 = 88.888%
  const tiePos1 = getTimelineRulerPosition("2026-05")
  assert.ok(tiePos1 !== null && Math.abs(tiePos1 - (40 / 45) * 100) < 0.001)
  // HiBlow Fleet: 2026-09 -> 44/45 * 100 = 97.777%
  const hiblowPos = getTimelineRulerPosition("2026-09")
  assert.ok(hiblowPos !== null && Math.abs(hiblowPos - (44 / 45) * 100) < 0.001)
})

test("timeline-ruler supports year selection clicks to jump between project eras", () => {
  const source = fs.readFileSync(RULER_PATH, "utf-8")

  assert.match(source, /onSelectYear/, "must accept onSelectYear callback prop")
})

test("timeline-ruler respects prefers-reduced-motion for scrubber transitions", () => {
  const source = fs.readFileSync(RULER_PATH, "utf-8")

  assert.match(
    source,
    /useReducedMotion\(\)/,
    "must check useReducedMotion hook"
  )
})

test("timeline-ruler implements continuous thin track and thin bright vertical scrubber without green bullet", () => {
  const source = fs.readFileSync(RULER_PATH, "utf-8")

  // Must have continuous thin track
  assert.match(
    source,
    /h-px\s+w-full[\s\S]*?bg-border/,
    "must have continuous 1px thin track line"
  )

  // Scrubber must be thin vertical bar (w-0.5)
  assert.match(
    source,
    /w-0\.5[\s\S]*?bg-foreground/,
    "must have thin vertical scrubber bar using bg-foreground"
  )

  // Must NOT have green glow or emerald bullet
  assert.doesNotMatch(
    source,
    /bg-emerald-400|bg-emerald-500/,
    "must not have green glow bullet on scrubber"
  )

  // Year text must brighten active year
  assert.match(
    source,
    /(text-foreground font-bold|font-bold text-foreground)/,
    "must highlight active year with text-foreground font-bold"
  )

  // Mobile scaling: smaller scrubber bar and tick marks on mobile display
  assert.match(
    source,
    /h-3\.5[\s\S]*?sm:h-5/,
    "must scale down scrubber height to h-3.5 on mobile and sm:h-5 on larger screens"
  )
  assert.match(
    source,
    /h-2[\s\S]*?sm:h-3/,
    "must scale down year tick marks to h-2 on mobile and sm:h-3 on larger screens"
  )
})
