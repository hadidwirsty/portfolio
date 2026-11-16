import { test } from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

import { subpages, projects } from "../../lib/cv-data.ts"
import { timelineMilestones } from "../../lib/portfolio-timeline-data.ts"

const TIMELINE_PATH = path.resolve(
  process.cwd(),
  "components/portfolio/portfolio-timeline.tsx"
)
const FOLDER_CARD_PATH = path.resolve(
  process.cwd(),
  "components/portfolio/folder-bento-card.tsx"
)
const CARD_FOLDER_PATH = path.resolve(
  process.cwd(),
  "components/portfolio/portfolio-card-folder.tsx"
)
const HERO_PATH = path.resolve(
  process.cwd(),
  "components/portfolio/portfolio-hero.tsx"
)

test("Bilingual: portfolio data structures contain complete ID and EN entries", () => {
  // 1. Subpage definition
  assert.ok(
    subpages.portfolio.title.id,
    "subpages.portfolio.title.id must exist"
  )
  assert.ok(
    subpages.portfolio.title.en,
    "subpages.portfolio.title.en must exist"
  )
  assert.ok(
    subpages.portfolio.description.id,
    "subpages.portfolio.description.id must exist"
  )
  assert.ok(
    subpages.portfolio.description.en,
    "subpages.portfolio.description.en must exist"
  )

  // 2. Timeline milestones (5 milestones)
  assert.equal(timelineMilestones.length, 5)
  for (const m of timelineMilestones) {
    assert.ok(
      m.title.id && m.title.en,
      `Milestone ${m.id} must have bilingual title`
    )
    assert.ok(
      m.institution.id && m.institution.en,
      `Milestone ${m.id} must have bilingual institution`
    )
    assert.ok(
      m.period.id && m.period.en,
      `Milestone ${m.id} must have bilingual period`
    )
    assert.ok(
      m.summary.id && m.summary.en,
      `Milestone ${m.id} must have bilingual summary`
    )
    assert.ok(m.highlights.length > 0, `Milestone ${m.id} must have highlights`)
    for (const h of m.highlights) {
      assert.ok(h.id && h.en, `Highlight in ${m.id} must be bilingual`)
    }
  }

  // 3. Projects data for all 10 projects
  assert.equal(projects.length >= 10, true)
  for (const p of projects.slice(0, 10)) {
    assert.ok(p.name, `Project ${p.id} must have a name`)
    assert.ok(
      p.period.id && p.period.en,
      `Project ${p.id} must have bilingual period`
    )
    assert.ok(
      p.company.id && p.company.en,
      `Project ${p.id} must have bilingual company`
    )
    assert.ok(
      p.description.id && p.description.en,
      `Project ${p.id} must have bilingual description`
    )
    assert.ok(
      p.role.id && p.role.en,
      `Project ${p.id} must have bilingual role`
    )
  }
})

test("Bilingual: components implement proper language switching without hardcoded strings", () => {
  const timelineSource = fs.readFileSync(TIMELINE_PATH, "utf-8")
  const folderCardSource = fs.readFileSync(FOLDER_CARD_PATH, "utf-8")
  const cardFolderSource = fs.readFileSync(CARD_FOLDER_PATH, "utf-8")
  const heroSource = fs.readFileSync(HERO_PATH, "utf-8")

  // Hero uses useT with subpages.portfolio
  assert.match(heroSource, /useT\(subpages\.portfolio\.title\)/)
  assert.match(heroSource, /useT\(subpages\.portfolio\.description\)/)

  // Timeline uses lang condition for section title & instructions
  assert.match(
    timelineSource,
    /lang === ["']id["'][\s\S]*?Perjalanan Karier[\s\S]*?My Journey/
  )
  assert.match(
    timelineSource,
    /lang === ["']id["'][\s\S]*?Evolusi Rekayasa & Pencapaian Nyata[\s\S]*?Engineering Evolution & Verified Impact/
  )
  assert.match(
    timelineSource,
    /lang === ["']id["'][\s\S]*?Berkas Tonggak[\s\S]*?Milestone Dossier/
  )

  // FolderCard uses bilingual CTA
  assert.match(
    folderCardSource,
    /lang === ["']id["'][\s\S]*?Lihat Detail[\s\S]*?View Details/
  )

  // CardFolder uses bilingual expand toggle labels
  assert.match(
    cardFolderSource,
    /lang === ["']id["'][\s\S]*?Lihat Semua (13|\$\{totalCount\}) Proyek[\s\S]*?View All (13|\$\{totalCount\}) Projects/
  )
  assert.match(
    cardFolderSource,
    /lang === ["']id["'][\s\S]*?Tampilkan (6|\$\{featuredCount\}) Proyek Unggulan[\s\S]*?Show (6|\$\{featuredCount\}) Featured Projects/
  )
})

test("Accessibility: timeline adheres strictly to WAI-ARIA tablist & keyboard arrow navigation", () => {
  const timelineSource = fs.readFileSync(TIMELINE_PATH, "utf-8")

  // WAI-ARIA tablist pattern
  assert.match(
    timelineSource,
    /role=["']tablist["']/,
    "timeline container must have role='tablist'"
  )
  assert.match(
    timelineSource,
    /role=["']tab["']/,
    "node buttons must have role='tab'"
  )
  assert.match(
    timelineSource,
    /aria-selected=\{isActive\}/,
    "node buttons must set aria-selected"
  )
  assert.match(
    timelineSource,
    /role=["']tabpanel["']/,
    "milestone dossier must have role='tabpanel'"
  )
  assert.match(
    timelineSource,
    /id=["']timeline-milestone-panel["']/,
    "milestone dossier must have id='timeline-milestone-panel'"
  )
  assert.match(
    timelineSource,
    /aria-controls=["']timeline-milestone-panel["']/,
    "node tabs must set aria-controls='timeline-milestone-panel'"
  )
  assert.match(
    timelineSource,
    /aria-labelledby=\{`timeline-tab-\$\{timelineMilestones\[activeIndex\]\.year\}`\}/,
    "milestone dossier must have aria-labelledby pointing to active tab id"
  )

  // Keyboard navigation & focus movement
  assert.match(timelineSource, /ArrowRight/, "must handle ArrowRight")
  assert.match(timelineSource, /ArrowLeft/, "must handle ArrowLeft")
  assert.match(timelineSource, /Home/, "must handle Home key")
  assert.match(timelineSource, /End/, "must handle End key")
  assert.match(
    timelineSource,
    /nodeButtonRefs\.current\[nextIndex\]\?\.focus\(\)/,
    "must move focus to next node on keyboard arrow navigation"
  )
  assert.match(
    timelineSource,
    /focus-visible:ring-2/,
    "must have visible focus ring on nodes"
  )
})

test("Accessibility: card folder and bento cards implement proper ARIA attributes and focus rings", () => {
  const cardFolderSource = fs.readFileSync(CARD_FOLDER_PATH, "utf-8")
  const folderCardSource = fs.readFileSync(FOLDER_CARD_PATH, "utf-8")

  // Drawer expansion ARIA synchronization
  assert.match(
    cardFolderSource,
    /aria-expanded=\{isExpanded\}/,
    "toggle button must synchronize aria-expanded with state"
  )
  assert.match(
    cardFolderSource,
    /aria-controls=["']all-projects-drawer["']/,
    "toggle button must point to drawer via aria-controls"
  )
  assert.match(
    cardFolderSource,
    /id=["']all-projects-drawer["']/,
    "drawer element must have matching id"
  )
  assert.match(
    cardFolderSource,
    /role=["']region["']/,
    "drawer element must have role='region'"
  )

  // Focus management on drawer collapse: focus section heading with preventScroll to avoid scrolling back down
  assert.match(
    cardFolderSource,
    /headingRef\.current\?\.focus\(\{\s*preventScroll:\s*true\s*\}\)/,
    "must shift focus to section heading with preventScroll when drawer collapses"
  )

  // Accessible CTA button context
  assert.match(
    folderCardSource,
    /aria-label=\{`\$\{ctaLabel\}: \$\{title\}`\}/,
    "CTA button must include project title in aria-label for screen reader clarity"
  )

  // Visible focus rings
  assert.match(
    folderCardSource,
    /focus-visible:ring-2 focus-visible:ring-primary/,
    "Folder card article must provide visible focus ring"
  )
  assert.match(
    cardFolderSource,
    /focus-visible:ring-2 focus-visible:ring-primary/,
    "Toggle button must provide visible focus ring"
  )
})

test("Touch & Scroll Safety: no onPointerDown modal triggers and responsive layouts", () => {
  const folderCardSource = fs.readFileSync(FOLDER_CARD_PATH, "utf-8")
  const timelineSource = fs.readFileSync(TIMELINE_PATH, "utf-8")
  const cardFolderSource = fs.readFileSync(CARD_FOLDER_PATH, "utf-8")

  // Do not use onPointerDown to trigger actions (to protect touch scrolling)
  assert.doesNotMatch(
    folderCardSource,
    /onPointerDown=\{.*?onSelect/,
    "must not trigger onSelectProject on pointerDown"
  )
  assert.doesNotMatch(
    timelineSource,
    /onPointerDown=\{.*?setActiveIndex/,
    "must not trigger setActiveIndex on pointerDown"
  )
  assert.doesNotMatch(
    cardFolderSource,
    /onPointerDown=\{.*?handleToggle/,
    "must not trigger toggle on pointerDown"
  )

  // Responsive grid breakpoints
  assert.match(
    cardFolderSource,
    /grid-cols-1[\s\S]*?md:grid-cols-2[\s\S]*?lg:grid-cols-3/,
    "must have 1 col mobile, 2 col tablet, and 3 col desktop"
  )
})

test("Reduced Motion: all animated components honor useReducedMotion", () => {
  const timelineSource = fs.readFileSync(TIMELINE_PATH, "utf-8")
  const folderCardSource = fs.readFileSync(FOLDER_CARD_PATH, "utf-8")
  const cardFolderSource = fs.readFileSync(CARD_FOLDER_PATH, "utf-8")

  assert.match(
    timelineSource,
    /useReducedMotion\(\)/,
    "timeline must check useReducedMotion"
  )
  assert.match(
    folderCardSource,
    /useReducedMotion\(\)/,
    "folder card must check useReducedMotion"
  )
  assert.match(
    cardFolderSource,
    /useReducedMotion\(\)/,
    "card folder drawer must check useReducedMotion"
  )

  // Sheet lift disabled when reduced motion is preferred
  assert.match(
    folderCardSource,
    /const isLifted =[\s\S]*?\(isHovered \|\| isFocused\)[\s\S]*?!shouldReduceMotion/,
    "sheet lift motion must be disabled when shouldReduceMotion is true"
  )
})

test("Accessibility: ProjectTimelineAccordion & TimelineRuler implement robust WAI-ARIA and bilingual labels", () => {
  const ACCORDION_PATH = path.resolve(
    process.cwd(),
    "components/portfolio/project-timeline-accordion.tsx"
  )
  const RULER_PATH = path.resolve(
    process.cwd(),
    "components/portfolio/timeline-ruler.tsx"
  )

  const accordionSource = fs.readFileSync(ACCORDION_PATH, "utf-8")
  const rulerSource = fs.readFileSync(RULER_PATH, "utf-8")

  // Accordion tablist & tabpanel
  assert.match(accordionSource, /role=["']tablist["']/)
  assert.match(accordionSource, /role=["']tab["']/)
  assert.match(accordionSource, /role=["']tabpanel["']/)
  assert.match(accordionSource, /aria-selected=\{isActive\}/)
  assert.match(
    accordionSource,
    /aria-controls=\{`timeline-panel-\$\{item\.id\}`\}/
  )
  assert.match(
    accordionSource,
    /aria-labelledby=\{`timeline-card-\$\{item\.id\}`\}/
  )

  // Keyboard navigation
  assert.match(accordionSource, /ArrowRight/)
  assert.match(accordionSource, /ArrowLeft/)
  assert.match(accordionSource, /Home/)
  assert.match(accordionSource, /End/)

  // Reduced motion
  assert.match(accordionSource, /useReducedMotion\(\)/)
  assert.match(rulerSource, /useReducedMotion\(\)/)

  // Timeline Ruler region and year jump buttons
  assert.match(rulerSource, /role=["']region["']/)
  assert.match(rulerSource, /TIMELINE_YEAR_MARKERS/)
})
