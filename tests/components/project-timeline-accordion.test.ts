import { test } from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

import { projectTimelineItems } from "../../lib/portfolio-project-timeline-data.ts"

const COMPONENT_PATH = path.resolve(
  process.cwd(),
  "components/portfolio/project-timeline-accordion.tsx"
)

// ---------------------------------------------------------------------------
// 1. Module Export & Component Contract Tests
// ---------------------------------------------------------------------------
test("project-timeline-accordion exists and exports ProjectTimelineAccordion", () => {
  assert.ok(
    fs.existsSync(COMPONENT_PATH),
    "components/portfolio/project-timeline-accordion.tsx must exist"
  )
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /export (function ProjectTimelineAccordion|const ProjectTimelineAccordion)/,
    "must export ProjectTimelineAccordion component"
  )
  assert.match(
    source,
    /["']use client["']/,
    "must have 'use client' directive for Framer Motion and interactivity"
  )
})

test("project-timeline-accordion integrates all 13 chronological projects from data layer", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /projectTimelineItems/,
    "must import and utilize projectTimelineItems"
  )
  assert.equal(projectTimelineItems.length, 13)
  assert.equal(projectTimelineItems[0].id, "netmonk")
  assert.equal(projectTimelineItems[12].id, "hiblow-fleet")
})

test("project-timeline-accordion renders a bilingual section heading", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /<h2[^>]*>[\s\S]*?Lini Masa Proyek[\s\S]*?Project Timeline/,
    "must render an h2 with both localized labels"
  )
})

test("project-timeline-accordion implements active card expansion and inactive card panels", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(source, /activeIndex/, "must maintain active project state")
  assert.match(
    source,
    /setSelectedIndex/,
    "must provide state updater for selected project"
  )
})

test("project-timeline-accordion implements dark gradient scrim and neutral technical blueprint fallback", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /from-black[\s\S]*?to-transparent/,
    "must render bottom gradient overlay for text readability"
  )

  assert.match(source, /coverImage/, "must check for optional coverImage")
  assert.match(
    source,
    /<Image[\s\S]*?src=\{item\.coverImage\}[\s\S]*?fill/,
    "must utilize Next.js Image component with fill property for optimized covers"
  )
})

test("project-timeline-accordion supports controlled track shifting to prevent crushed 13-card overflow", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /trackOffset/,
    "must calculate track offset to accommodate 13 cards cleanly"
  )
})

test("project-timeline-accordion respects prefers-reduced-motion", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /useReducedMotion\(\)/,
    "must check useReducedMotion hook"
  )
})

test("project-timeline-accordion implements WAI-ARIA tab/button semantics with keyboard and click interaction", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /role=["']tablist["']/,
    "container must have role='tablist'"
  )
  assert.match(source, /role=["']tab["']/, "cards must have role='tab'")
  assert.match(
    source,
    /aria-selected=\{isActive\}/,
    "cards must bind aria-selected to active state"
  )
  assert.match(source, /onClick/, "cards must support click selection")
})

// ---------------------------------------------------------------------------
// 2. Batch 3 Responsive, Touch, & Timeline Ruler Integration Tests
// ---------------------------------------------------------------------------
test("project-timeline-accordion integrates TimelineRuler with startMonth synchronization", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /<TimelineRuler[\s\S]*?activeMonth=\{projectTimelineItems\[activeIndex\]\.startMonth\}/,
    "must render TimelineRuler and bind activeMonth to active project startMonth"
  )
  assert.match(
    source,
    /onSelectYear=\{handleSelectYear\}/,
    "must bind onSelectYear to handleSelectYear callback"
  )
})

test("project-timeline-accordion implements responsive card widths for mobile, tablet, and desktop", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /isMobile[\s\S]*?isTablet/,
    "must compute isMobile and isTablet flags"
  )
  assert.match(
    source,
    /activeCardWidth[\s\S]*?inactiveCardWidth/,
    "must compute responsive active and inactive card widths"
  )
  assert.match(
    source,
    /window\.addEventListener\(["']resize["']/,
    "must listen to window resize events to update dimensions dynamically"
  )
  assert.match(
    source,
    /ResizeObserver/,
    "must utilize ResizeObserver for accurate element container bounds tracking"
  )
})

test("project-timeline-accordion implements horizontal touch swipe handling without blocking vertical scroll", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /onTouchStart=\{handleTouchStart\}/,
    "must bind onTouchStart handler"
  )
  assert.match(
    source,
    /onTouchEnd=\{handleTouchEnd\}/,
    "must bind onTouchEnd handler"
  )
  assert.match(
    source,
    /Math\.abs\(dx\)\s*>\s*40/,
    "must require at least 40px displacement to trigger horizontal swipe"
  )
  assert.doesNotMatch(
    source,
    /onTouchMove/,
    "must not intercept touchMove to preserve smooth native vertical scrolling"
  )
})

test("project-timeline-accordion provides accessible previous and next buttons with min/max disabled bounds", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(source, /handlePrev/, "must provide previous button handler")
  assert.match(source, /handleNext/, "must provide next button handler")
  assert.match(
    source,
    /Proyek sebelumnya|Previous project/,
    "must have bilingual aria-label for previous button"
  )
  assert.match(
    source,
    /Proyek berikutnya|Next project/,
    "must have bilingual aria-label for next button"
  )
  // Must disable previous button at index 0 and next button at maximum index
  assert.match(
    source,
    /disabled=\{activeIndex === 0\}/,
    "must disable previous button when at first project (01/13)"
  )
  assert.match(
    source,
    /disabled=\{activeIndex === projectTimelineItems\.length - 1\}/,
    "must disable next button when at last project (13/13)"
  )
  assert.match(
    source,
    /preventScroll:\s*true/,
    "must use preventScroll to avoid browser native focus auto-scrolling container"
  )
})

test("project-timeline-accordion guarantees zero offset at activeIndex 0 to prevent text clipping", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /activeIndex === 0\s*\)\s*\{\s*return 0/,
    "must guarantee trackOffset is 0 when activeIndex is 0 to prevent left clipping"
  )
  assert.match(
    source,
    /getCardLeftPosition/,
    "must calculate card positions deterministically"
  )
})

test("project-timeline-accordion disables hover expansion and relies solely on click and swipe", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Must not have onMouseEnter or onMouseLeave that alters active index or hovered state
  assert.doesNotMatch(
    source,
    /onMouseEnter/,
    "must not have onMouseEnter trigger for card expansion"
  )
  assert.doesNotMatch(
    source,
    /onMouseLeave/,
    "must not have onMouseLeave trigger for card expansion"
  )
  assert.doesNotMatch(
    source,
    /setHoveredIndex/,
    "must not maintain hovered index state"
  )

  // The help text names the arrows and swipe gesture
  assert.match(
    source,
    /Gunakan tombol panah atau geser kartu untuk menjelajahi proyek\./,
    "ID subtitle must mention the arrows and swipe gesture"
  )
  assert.match(
    source,
    /Use the arrows or swipe to browse projects\./,
    "EN subtitle must mention the arrows and swipe gesture"
  )
})

test("project-timeline-accordion defaults to project 1 (Netmonk Analytics) on initial load and spans 100% width on desktop", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Must have initialIndex default to 0
  assert.match(
    source,
    /initialIndex\s*=\s*0/,
    "must default initialIndex to 0 (Netmonk Analytics)"
  )
  assert.match(
    source,
    /setSelectedIndex\(initialIndex\)/,
    "must initialize selectedIndex to initialIndex"
  )

  // Must ensure full-width spanning on desktop without empty space on the right
  assert.match(
    source,
    /(isDesktop\s*\?\s*availableWidth|if\s*\(isDesktop\)\s*\{\s*return availableWidth)/,
    "must allocate totalTrackWidth as 100% of availableWidth on desktop"
  )
  assert.match(
    source,
    /isDesktop\s*\?\s*desktopActiveWidth/,
    "must calculate desktopActiveWidth to balance with inactive cards"
  )
  assert.match(
    source,
    /isDesktop\s*\?\s*desktopInactiveWidth/,
    "must distribute remaining space evenly across inactive cards"
  )

  // Must provide clean spacing between accordion box and timeline ruler
  assert.match(
    source,
    /<TimelineRuler[\s\S]*?className=["']mt-4 sm:mt-6/,
    "must provide clean vertical margin before TimelineRuler"
  )
})

test("project-timeline-accordion uses the shared feature panel and background", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /className=\{cn\(\s*"feature-panel\b[^"]*"/,
    "must use the same panel styles as Contact and Skills in Practice"
  )
  assert.match(source, /<FeaturePanelBackground\s*\/>/)

  // Must NOT render corner registration marks
  assert.doesNotMatch(
    source,
    /<RegistrationMark/,
    "must not render RegistrationMark components"
  )

  // Must NOT have metadata stamp strings
  assert.doesNotMatch(
    source,
    /LEMBAR LINIMASA 01|TIMELINE SHEET 01/,
    "must not have top sheet title metadata"
  )
  assert.doesNotMatch(
    source,
    /LEMBAR 1\/2|SHEET 1\/2/,
    "must not have bottom sheet pagination metadata"
  )
  assert.doesNotMatch(
    source,
    /DIBUAT DI SEMARANG|MADE IN SEMARANG/,
    "must not have bottom made-in metadata"
  )
})

test("project-timeline-accordion removes category badge from active card and uses clean white period text", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Active card panel must not render category badge pill
  const activePanelMatch = source.match(
    /id=\{`timeline-panel-\$\{item\.ref\}`\}[\s\S]*?<\/motion\.div>/
  )
  assert.ok(activePanelMatch, "must render active card panel")
  const activePanelSource = activePanelMatch[0]

  assert.doesNotMatch(
    activePanelSource,
    /<Badge/,
    "must not render Badge in active card panel"
  )
  assert.doesNotMatch(
    activePanelSource,
    /Full-Stack|Enterprise & B2B/,
    "must not render category badge pill text in active card"
  )

  // Period text must be white, NOT green
  assert.match(
    source,
    /text-white\/90[\s\S]*?item\.period\[lang\]/,
    "must use white text for project period"
  )
  assert.doesNotMatch(
    source,
    /text-emerald-400/,
    "must not use emerald text for project period"
  )

  // Inactive card dot must be white
  assert.match(
    source,
    /isSelected[\s\S]*?bg-white/,
    "must use white dot for inactive card indicator"
  )
})

test("project-timeline-accordion uses responsive fluid spring physics matching Framer reference", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /stiffness:\s*350,\s*damping:\s*32,\s*mass:\s*0\.8/,
    "must tune spring physics to stiffness: 350, damping: 32, mass: 0.8"
  )
})
