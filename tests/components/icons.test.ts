import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

const ICONS_PATH = path.resolve(process.cwd(), "components/icons.tsx")

test("icons.tsx exports all 6 standardized Tabler brand outline icons", () => {
  assert.ok(fs.existsSync(ICONS_PATH), "components/icons.tsx must exist")
  const source = fs.readFileSync(ICONS_PATH, "utf-8")

  const expectedIcons = [
    "GithubIcon",
    "LinkedinIcon",
    "InstagramIcon",
    "ThreadsIcon",
    "StravaIcon",
    "YoutubeIcon",
  ]

  expectedIcons.forEach((name) => {
    assert.match(
      source,
      new RegExp(`export\\s*\\{[^}]*\\b${name}\\b[^}]*\\}`),
      `icons.tsx must export ${name}`
    )
    assert.match(
      source,
      new RegExp(`function ${name}\\(`),
      `icons.tsx must declare function ${name}`
    )
  })
})

test("all brand icons adhere strictly to Tabler brand outline visual standard", () => {
  const source = fs.readFileSync(ICONS_PATH, "utf-8")

  // Check SVG standard attributes
  const viewBoxMatches = source.match(/viewBox="0 0 24 24"/g)
  assert.strictEqual(
    viewBoxMatches?.length,
    6,
    "All 6 icons must have viewBox='0 0 24 24'"
  )

  const fillMatches = source.match(/fill="none"/g)
  assert.strictEqual(
    fillMatches?.length,
    6,
    "All 6 icons must have fill='none'"
  )

  const strokeMatches = source.match(/stroke="currentColor"/g)
  assert.strictEqual(
    strokeMatches?.length,
    6,
    "All 6 icons must have stroke='currentColor'"
  )

  const strokeWidthMatches = source.match(/strokeWidth=\{2\}/g)
  assert.strictEqual(
    strokeWidthMatches?.length,
    6,
    "All 6 icons must have strokeWidth={2}"
  )

  const linecapMatches = source.match(/strokeLinecap="round"/g)
  assert.strictEqual(
    linecapMatches?.length,
    6,
    "All 6 icons must have strokeLinecap='round'"
  )

  const linejoinMatches = source.match(/strokeLinejoin="round"/g)
  assert.strictEqual(
    linejoinMatches?.length,
    6,
    "All 6 icons must have strokeLinejoin='round'"
  )
})

test("StravaIcon and YoutubeIcon contain accurate brand SVG paths", () => {
  const source = fs.readFileSync(ICONS_PATH, "utf-8")

  // Strava 2-chevron outline path
  assert.match(
    source,
    /M15 13l-5 -10l-5 10m6 0l4 8l4 -8/,
    "StravaIcon must use Tabler outline chevron path"
  )

  // YouTube rounded player outline + play triangle
  assert.match(
    source,
    /M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8/,
    "YoutubeIcon must use Tabler outline display frame"
  )
  assert.match(
    source,
    /M10 9l5 3l-5 3/,
    "YoutubeIcon must include play triangle"
  )
})
