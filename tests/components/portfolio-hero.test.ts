import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

const HERO_PATH = path.resolve(
  process.cwd(),
  "components/portfolio/portfolio-hero.tsx"
)

test("portfolio-hero component file exists and exports PortfolioHero", () => {
  assert.ok(
    fs.existsSync(HERO_PATH),
    "components/portfolio/portfolio-hero.tsx must exist"
  )
  const source = fs.readFileSync(HERO_PATH, "utf-8")

  assert.match(
    source,
    /export (function PortfolioHero|const PortfolioHero)/,
    "portfolio-hero.tsx must export PortfolioHero"
  )
  assert.match(
    source,
    /["']use client["']/,
    "portfolio-hero.tsx must be a client component"
  )
})

test("portfolio-hero integrates KineticHeading and subpages.portfolio metadata", () => {
  assert.ok(fs.existsSync(HERO_PATH))
  const source = fs.readFileSync(HERO_PATH, "utf-8")

  assert.match(
    source,
    /KineticHeading/,
    "portfolio-hero must import and render KineticHeading"
  )
  assert.match(
    source,
    /subpages\.portfolio\.title/,
    "portfolio-hero must reference subpages.portfolio.title"
  )
  assert.match(
    source,
    /subpages\.portfolio\.description/,
    "portfolio-hero must reference subpages.portfolio.description"
  )
  assert.match(
    source,
    /motionKey=["']portfolio["']/,
    "portfolio-hero must set motionKey to portfolio"
  )
})

test("portfolio-hero uses responsive container styling without horizontal overflow", () => {
  assert.ok(fs.existsSync(HERO_PATH))
  const source = fs.readFileSync(HERO_PATH, "utf-8")

  assert.match(
    source,
    /<section[\s\S]*?max-w-/,
    "portfolio-hero must constrain description width"
  )
})
