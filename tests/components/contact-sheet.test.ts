import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

const SHEET_PATH = path.resolve(
  process.cwd(),
  "components/contact/contact-sheet.tsx"
)
const HERO_PATH = path.resolve(
  process.cwd(),
  "components/contact/contact-hero.tsx"
)
const TICKER_PATH = path.resolve(
  process.cwd(),
  "components/contact/ticker-strip.tsx"
)

test("contact-sheet and contact-hero component files exist and export components", () => {
  assert.ok(
    fs.existsSync(SHEET_PATH),
    "components/contact/contact-sheet.tsx must exist"
  )
  assert.ok(
    fs.existsSync(HERO_PATH),
    "components/contact/contact-hero.tsx must exist"
  )
  assert.ok(
    fs.existsSync(TICKER_PATH),
    "components/contact/ticker-strip.tsx must exist"
  )

  const sheetSource = fs.readFileSync(SHEET_PATH, "utf-8")
  const heroSource = fs.readFileSync(HERO_PATH, "utf-8")
  const tickerSource = fs.readFileSync(TICKER_PATH, "utf-8")

  assert.match(sheetSource, /export (function ContactSheet|const ContactSheet)/)
  assert.match(heroSource, /export (function ContactHero|const ContactHero)/)
  assert.match(tickerSource, /export (function TickerStrip|const TickerStrip)/)
})

test("contact-sheet implements 5fr/7fr grid ratio on desktop and integrates StickerBoard", () => {
  const source = fs.readFileSync(SHEET_PATH, "utf-8")

  assert.match(source, /lg:col-span-4/, "Left column should be lg:col-span-4")
  assert.match(source, /lg:col-span-8/, "Right column should be lg:col-span-8")
  assert.match(
    source,
    /StickerBoard/,
    "contact-sheet must integrate StickerBoard"
  )
})

test("contact-sheet maintains Open to Work badge, Fraunces heading, and action pills", () => {
  const source = fs.readFileSync(SHEET_PATH, "utf-8")

  assert.match(
    source,
    /openToWork/,
    "contact-sheet must include openToWork text"
  )
  assert.match(
    source,
    /font-heading/,
    "contact-sheet must use Fraunces font-heading"
  )
  assert.match(
    source,
    /copyEmail/,
    "contact-sheet must include copyEmail action"
  )
  assert.match(
    source,
    /downloadCv/,
    "contact-sheet must include downloadCv action"
  )
  assert.match(
    source,
    /<Button[\s\S]*?render=\{<a href=\{`mailto:\$\{profile\.email\}`\} \/>\}/,
    "contact-sheet must render email action using Button component"
  )
})

test("contact-hero integrates KineticHeading and positions TickerStrip at base", () => {
  const source = fs.readFileSync(HERO_PATH, "utf-8")

  assert.match(
    source,
    /KineticHeading/,
    "contact-hero must render KineticHeading"
  )
  assert.match(source, /TickerStrip/, "contact-hero must render TickerStrip")
  assert.match(
    source,
    /mt-auto/,
    "TickerStrip must be placed at the bottom via mt-auto"
  )
})
