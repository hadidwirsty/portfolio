import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

const NAV_PATH = path.resolve(
  process.cwd(),
  "components/dynamic-island-nav.tsx"
)

test("dynamic-island-nav file exists and exports DynamicIslandNav component", () => {
  assert.ok(
    fs.existsSync(NAV_PATH),
    "components/dynamic-island-nav.tsx must exist"
  )
  const source = fs.readFileSync(NAV_PATH, "utf-8")

  assert.match(
    source,
    /export (function DynamicIslandNav|const DynamicIslandNav)/,
    "dynamic-island-nav.tsx must export DynamicIslandNav"
  )
  assert.match(
    source,
    /use client/,
    "dynamic-island-nav.tsx must be a client component"
  )
})

test("dynamic-island-nav strictly filters allowed routes to subpages only", () => {
  const source = fs.readFileSync(NAV_PATH, "utf-8")

  // Must only allow subpages
  assert.match(source, /ALLOWED_PATHS/)
  assert.match(source, /\/about/)
  assert.match(source, /\/contact/)
  assert.match(source, /\/portfolio/)
  assert.match(source, /\/stack/)

  // Must return null if route not allowed (e.g. Home page "/")
  assert.match(source, /if \(!isAllowed\) return null/)
})

test("dynamic-island-nav defines 5 navigation items and icons", () => {
  const source = fs.readFileSync(NAV_PATH, "utf-8")

  // 5 Links
  assert.match(source, /href:\s*"\/"/)
  assert.match(source, /href:\s*"\/about"/)
  assert.match(source, /href:\s*"\/portfolio"/)
  assert.match(source, /href:\s*"\/contact"/)
  assert.match(source, /href:\s*"\/stack"/)

  // Lucide Icons
  assert.match(source, /Home/)
  assert.match(source, /User/)
  assert.match(source, /FolderGit2/)
  assert.match(source, /Mail/)
  assert.match(source, /Layers/)
})

test("dynamic-island-nav implements IntersectionObserver for footer auto-hide", () => {
  const source = fs.readFileSync(NAV_PATH, "utf-8")

  assert.match(
    source,
    /IntersectionObserver/,
    "dynamic-island-nav.tsx must use IntersectionObserver"
  )
  assert.match(
    source,
    /footer\[role="contentinfo"\]/,
    "dynamic-island-nav.tsx must observe footer[role='contentinfo']"
  )
  assert.match(
    source,
    /isFooterVisible/,
    "dynamic-island-nav.tsx must track isFooterVisible state"
  )
})

test("dynamic-island-nav implements scroll compacting and gliding indicator", () => {
  const source = fs.readFileSync(NAV_PATH, "utf-8")

  // Compact state tracking on scroll
  assert.match(source, /isScrollCompact/)
  assert.match(source, /scrollRaf/)
  assert.match(source, /window\.addEventListener\("scroll"/)

  // Spring animations and layoutId for liquid glider
  assert.match(source, /layoutId="desktop-active-indicator"/)
  assert.match(source, /SMOOTH_SPRING/)
  assert.match(source, /useReducedMotion/)
})

test("dynamic-island-nav includes accessible attributes and keyboard focus rings", () => {
  const source = fs.readFileSync(NAV_PATH, "utf-8")

  assert.match(source, /role="navigation"/)
  assert.match(source, /aria-label="Dynamic Island Navigation/)
  assert.match(source, /aria-current=\{isActive \? "page" : undefined\}/)
  assert.match(source, /focus-visible:ring-2/)
})

test("dynamic-island-nav implements mobile dropdown card and desktop hover-to-expand with three dots", () => {
  const source = fs.readFileSync(NAV_PATH, "utf-8")

  // Mobile drawer card with close button
  assert.match(source, /isMobileMenuOpen/)
  assert.match(source, /setIsMobileMenuOpen/)
  assert.match(source, /<X\s+className/)

  // Desktop compact state has MoreHorizontal that reveals menu on hover
  assert.match(source, /MoreHorizontal/)
  assert.match(source, /isDesktopHovered/)
  assert.match(source, /onMouseEnter=\{\(\) => setIsDesktopHovered\(true\)\}/)

  // Label reveal condition on desktop: when hovering another item, active item hides its label
  assert.match(
    source,
    /const showLabel =\s*hoveredItemKey !== null \? isHovered : isActive/
  )
})

test("dynamic-island-nav is borderless and has taller height on tablet/desktop", () => {
  const source = fs.readFileSync(NAV_PATH, "utf-8")

  // Borderless: no border-neutral-800 or border-white/10 on island capsules
  assert.strictEqual(
    source.includes("border-neutral-800"),
    false,
    "Dynamic island capsules must be borderless"
  )
  assert.strictEqual(
    source.includes("border-white/10"),
    false,
    "Active item pill must be borderless"
  )

  // Taller desktop item height (h-9 and sm:h-10 or sm:h-13)
  assert.match(source, /h-9/)
  assert.match(source, /sm:h-10/)
  assert.match(source, /sm:h-13/)
})

test("dynamic-island-nav implements card-based dark mode tokens and soft shadow", () => {
  const source = fs.readFileSync(NAV_PATH, "utf-8")

  // Dark mode capsule matches card tokens and has soft floating shadow
  assert.match(
    source,
    /dark:bg-card\/90/,
    "Desktop capsule must use dark:bg-card/90"
  )
  assert.match(
    source,
    /dark:bg-card\/95/,
    "Mobile elements must use dark:bg-card/95"
  )
  assert.match(
    source,
    /dark:shadow-\[0_16px_40px_-10px_rgba\(0,0,0,0\.7\)\]/,
    "Capsule must have soft floating dark shadow"
  )

  // Dark mode active pill contrast
  assert.match(
    source,
    /dark:bg-neutral-700\/80/,
    "Active pill glider must use dark:bg-neutral-700/80 for clear contrast"
  )

  // Light mode styling must remain untouched
  assert.match(
    source,
    /bg-neutral-950\/95/,
    "Light mode background must remain bg-neutral-950/95"
  )
  assert.match(
    source,
    /bg-neutral-800/,
    "Light mode glider must remain bg-neutral-800"
  )
})

test("dynamic-island-nav tunes spring physics and synchronizes label reveal via Framer Motion", () => {
  const source = fs.readFileSync(NAV_PATH, "utf-8")

  // Spring physics tuned to Framer dynamic island standard
  assert.match(source, /stiffness:\s*350/)
  assert.match(source, /damping:\s*28/)
  assert.match(source, /mass:\s*0\.7/)

  // Morphing expanded <-> compact uses popLayout mode
  assert.match(
    source,
    /mode="popLayout"/,
    "Desktop view must morph between expanded and compact using popLayout mode"
  )

  // Synchronized label reveal uses Framer Motion AnimatePresence without CSS transition conflict
  assert.strictEqual(
    source.includes("transition-[max-width,opacity,margin]"),
    false,
    "Label must not use conflicting CSS transition"
  )
})
