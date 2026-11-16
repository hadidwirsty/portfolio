import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

const GLOBAL_TICKER_PATH = path.resolve(
  process.cwd(),
  "components/ticker-strip.tsx"
)
const CONTACT_TICKER_PATH = path.resolve(
  process.cwd(),
  "components/contact/ticker-strip.tsx"
)

test("components/ticker-strip.tsx exists as a reusable global component and exports TickerStrip", () => {
  assert.ok(
    fs.existsSync(GLOBAL_TICKER_PATH),
    "components/ticker-strip.tsx must exist"
  )
  assert.ok(
    fs.existsSync(CONTACT_TICKER_PATH),
    "components/contact/ticker-strip.tsx must exist for backward compatibility"
  )

  const globalSource = fs.readFileSync(GLOBAL_TICKER_PATH, "utf-8")
  const contactSource = fs.readFileSync(CONTACT_TICKER_PATH, "utf-8")

  assert.match(
    globalSource,
    /export (function TickerStrip|const TickerStrip)/,
    "global ticker-strip must export TickerStrip"
  )
  assert.match(
    contactSource,
    /export (function TickerStrip|const TickerStrip)/,
    "contact ticker-strip must export TickerStrip"
  )
})

test("ticker-strip supports accessibility roles and reduced motion", () => {
  const source = fs.readFileSync(GLOBAL_TICKER_PATH, "utf-8")

  assert.match(
    source,
    /role=["']presentation["']/,
    "must have role='presentation' on marquee container"
  )
  assert.match(
    source,
    /aria-hidden=["']true["']/,
    "must hide duplicate marquee loop from screen readers"
  )
  assert.match(
    source,
    /useReducedMotion\(\)/,
    "must respect user's prefers-reduced-motion preference"
  )
})
