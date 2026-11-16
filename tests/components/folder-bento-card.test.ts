import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

const COMPONENT_PATH = path.resolve(
  process.cwd(),
  "components/portfolio/folder-bento-card.tsx"
)

test("folder-bento-card file exists and exports FolderBentoCard component", () => {
  assert.ok(
    fs.existsSync(COMPONENT_PATH),
    "components/portfolio/folder-bento-card.tsx must exist"
  )
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /export (function FolderBentoCard|const FolderBentoCard)/,
    "folder-bento-card.tsx must export FolderBentoCard"
  )
})

test("folder-bento-card renders portrait card with large project index and curved folder pocket silhouette", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Portrait height
  assert.match(
    source,
    /(h-\[460px\]|h-115)[\s\S]*?(sm:h-\[480px\]|sm:h-120)[\s\S]*?(lg:h-\[500px\]|lg:h-125)/,
    "must implement tall portrait card dimensions"
  )

  // Large project index format (padStart)
  assert.match(
    source,
    /String\(index \+ 1\)\.padStart\(2,\s*["']0["']\)/,
    "must render prominent 01, 02 style project index number"
  )

  // Curved folder shoulder silhouette path
  assert.match(
    source,
    /d=["']M 0 0 L 170 0 C 196 0, 198 30, 224 30 L 400 30/,
    "must render SVG curved shoulder silhouette with horizontal tab and smooth S-curve"
  )

  // No legacy detached external ear tab or tech specs footer
  assert.doesNotMatch(
    source,
    /TAB \/\//,
    "must NOT render legacy external TAB // ear"
  )
  assert.doesNotMatch(
    source,
    /REF \/\//,
    "must NOT render legacy REF // metadata tag"
  )
})

test("folder-bento-card renders rear visual layer with cover image support and neutral fallback without fake bitmaps", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Next.js Image component for real project covers
  assert.match(
    source,
    /<Image[\s\S]*?fill/,
    "must use Next.js Image with fill layout for rear cover"
  )

  // Ensure no fake project screenshot image references
  assert.doesNotMatch(
    source,
    /<Image[\s\S]*?src=["']\/(screenshots)\/project/,
    "must not use fake project screenshot bitmaps"
  )

  // Neutral geometric fallback pattern
  assert.match(
    source,
    /<pattern[\s\S]*?folder-fallback-grid/,
    "must provide clean neutral SVG fallback grid when cover image is absent"
  )
})

test("folder-bento-card implements foreground pocket reveal animation with spring motion and useReducedMotion", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /useReducedMotion/,
    "folder-bento-card must use useReducedMotion"
  )
  assert.match(
    source,
    /motion\.div/,
    "folder-bento-card must animate pocket with motion.div"
  )
  assert.match(
    source,
    /y:\s*isLifted \? \d+ : 0/,
    "folder-bento-card must slide pocket down on hover/focus"
  )
  assert.match(
    source,
    /stiffness:\s*280[\s\S]*?damping:\s*26/,
    "folder-bento-card must tune spring physics for smooth folder reveal"
  )
})

test("folder-bento-card renders accessible card action with ArrowUpRight indicator without invalid nested buttons", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Outer article is the single interactive button element
  assert.match(
    source,
    /<article[\s\S]*?role=["']button["']/,
    "outer article must act as the primary accessible button"
  )

  // ArrowUpRight indicator
  assert.match(source, /ArrowUpRight/, "must render ArrowUpRight icon")

  // No nested <button> elements inside article
  assert.doesNotMatch(
    source,
    /<button[\s\S]*?>/,
    "must not contain nested button elements inside role=button article"
  )

  // Keyboard accessibility
  assert.match(
    source,
    /onKeyDown=\{handleKeyDown\}/,
    "must handle Enter and Space keys for accessible navigation"
  )
})

test("folder-bento-card implements physical two-layer architecture with outer backing frame and inset inner card", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Outer frame article with inset padding and large rounded corners
  assert.match(
    source,
    /<article[\s\S]*?(p-2\.5|p-3|p-3\.5)[\s\S]*?(rounded-\[28px\]|sm:rounded-\[32px\])/,
    "outer article must serve as backing frame with visible inset padding and large rounded corners"
  )

  // Inset inner card clipping inner elements
  assert.match(
    source,
    /<div[\s\S]*?relative size-full overflow-hidden[\s\S]*?rounded-\[20px\]/,
    "inner card must be inset and clip inner layers with overflow-hidden"
  )
})

test("folder-bento-card separates moving reveal pocket from stationary bottom content", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Moving pocket houses projectNumber and ArrowUpRight
  assert.match(
    source,
    /<motion\.div[\s\S]*?\{projectNumber\}[\s\S]*?ArrowUpRight[\s\S]*?<\/motion\.div>/,
    "motion.div must contain only the reveal pocket silhouette, project number, and arrow"
  )

  // Title and description are in stationary layer outside of moving pocket motion.div
  assert.doesNotMatch(
    source,
    /<motion\.div[\s\S]*?y:\s*isLifted[\s\S]*?\{title\}[\s\S]*?<\/motion\.div>/,
    "title must NOT be inside moving pocket motion.div"
  )
  assert.doesNotMatch(
    source,
    /<motion\.div[\s\S]*?y:\s*isLifted[\s\S]*?\{description\}[\s\S]*?<\/motion\.div>/,
    "description must NOT be inside moving pocket motion.div"
  )

  // Stationary bottom layer with solid backing
  assert.match(
    source,
    /STATIONARY CONTENT LAYER[\s\S]*?z-20[\s\S]*?bg-card/,
    "stationary content layer must be anchored with z-20 and solid card backing"
  )
})
