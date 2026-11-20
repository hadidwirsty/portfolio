import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

const KINETIC_HEADING_PATH = path.resolve(
  process.cwd(),
  "components/kinetic-heading.tsx"
)
const TICKER_STRIP_PATH = path.resolve(
  process.cwd(),
  "components/ticker-strip.tsx"
)
const LETTER_ROLL_PATH = path.resolve(
  process.cwd(),
  "components/ui/letter-roll.tsx"
)
const PORTFOLIO_HERO_PATH = path.resolve(
  process.cwd(),
  "components/portfolio/portfolio-hero.tsx"
)
const CONTACT_HERO_PATH = path.resolve(
  process.cwd(),
  "components/contact/contact-hero.tsx"
)
const DASHBOARD_PATH = path.resolve(
  process.cwd(),
  "components/vexoo-dashboard.tsx"
)

// ---------------------------------------------------------------------------
// 1. KineticHeading Semantic Hierarchy Tests
// ---------------------------------------------------------------------------

test("KineticHeading supports semantic heading tags (as prop defaulting to h1)", () => {
  assert.ok(fs.existsSync(KINETIC_HEADING_PATH))
  const source = fs.readFileSync(KINETIC_HEADING_PATH, "utf-8")

  // Must accept 'as' prop
  assert.match(
    source,
    /as\?:?\s*["']h1["']\s*\|\s*["']h2["']\s*\|\s*["']h3["']\s*\|\s*["']div["']/,
    "KineticHeadingProps must include 'as' prop allowing semantic tags"
  )

  // Must default to 'h1' for top-level page heading semantics
  assert.match(
    source,
    /as:\s*Component\s*=\s*["']h1["']/,
    "KineticHeading must default to 'h1'"
  )
})

test("PortfolioHero and Home maintain h1 top-level heading semantics via KineticHeading", () => {
  const heroSource = fs.readFileSync(PORTFOLIO_HERO_PATH, "utf-8")
  const dashboardSource = fs.readFileSync(DASHBOARD_PATH, "utf-8")

  // PortfolioHero renders KineticHeading (which defaults to h1)
  assert.match(
    heroSource,
    /<KineticHeading[\s\S]*?text=\{headingText\}/,
    "PortfolioHero must render KineticHeading for portfolio title"
  )

  // Dashboard renders KineticHeading for home heading
  assert.match(
    dashboardSource,
    /<KineticHeading/,
    "Dashboard must render KineticHeading for home title"
  )
})

test("ContactHero specifies as='h2' to avoid duplicate h1 with ContactSheet", () => {
  const contactHeroSource = fs.readFileSync(CONTACT_HERO_PATH, "utf-8")
  assert.match(
    contactHeroSource,
    /<KineticHeading[\s\S]*?as=["']h2["']/,
    "ContactHero must specify as='h2' because ContactSheet already renders an h1"
  )
})

// ---------------------------------------------------------------------------
// 2. TickerStrip Semantic Content & Marquee Redundancy Guard
// ---------------------------------------------------------------------------

test("TickerStrip provides a single canonical accessible representation and hides 6x marquee loop", () => {
  const tickerSource = fs.readFileSync(TICKER_STRIP_PATH, "utf-8")

  // Must contain sr-only span with single tickerText instance
  assert.match(
    tickerSource,
    /<span className=["']sr-only["']>\{tickerText\}<\/span>/,
    "TickerStrip must provide single accessible tickerText instance for screen readers"
  )

  // The visual marquee with 6-item repetition must be hidden from screen readers
  assert.match(
    tickerSource,
    /<div[\s\S]*?aria-hidden=["']true["'][\s\S]*?\{repeatedText\}/,
    "TickerStrip visual marquee loop must be aria-hidden"
  )
})

// ---------------------------------------------------------------------------
// 3. LetterRoll & Character Splitting Accessibility
// ---------------------------------------------------------------------------

test("LetterRoll isolates decorative character layers with aria-hidden and preserves canonical text", () => {
  const source = fs.readFileSync(LETTER_ROLL_PATH, "utf-8")

  // Screen reader receives single canonical text
  assert.match(
    source,
    /<span style=\{srOnly\}>\{text\}<\/span>/,
    "LetterRoll must provide single canonical srOnly text"
  )

  // Character-splitting visual layers are hidden from accessibility tree
  assert.match(
    source,
    /<span aria-hidden=["']true["']/,
    "LetterRoll must wrap visual split-character spans in aria-hidden"
  )

  // Respects prefers-reduced-motion
  assert.match(
    source,
    /useReducedMotion\(\)/,
    "LetterRoll must respect useReducedMotion preference"
  )
})
