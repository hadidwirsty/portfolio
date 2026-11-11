import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

import {
  HIDDEN_PATHS,
  isMaintenanceActive,
  isPageHidden,
} from "../../lib/maintenance.ts"
import { resolveHeadingEmWidth } from "../../lib/status-heading.ts"

test("HIDDEN_PATHS contains the exact 4 pages under maintenance", () => {
  assert.deepEqual(Array.from(HIDDEN_PATHS), [
    "/about",
    "/portfolio",
    "/contact",
    "/stack",
  ])
})

test("isPageHidden correctly matches hidden routes and subroutes", () => {
  // Exact match
  assert.equal(isPageHidden("/about"), true)
  assert.equal(isPageHidden("/about/"), true)
  assert.equal(isPageHidden("/portfolio"), true)
  assert.equal(isPageHidden("/contact"), true)
  assert.equal(isPageHidden("/stack"), true)

  // Subroutes under hidden pages
  assert.equal(isPageHidden("/portfolio/project-1"), true)
  assert.equal(isPageHidden("/about/team"), true)
  assert.equal(isPageHidden("/contact/form/submit"), true)
  assert.equal(isPageHidden("/stack/detail"), true)

  // Prefix collisions MUST NOT match
  assert.equal(isPageHidden("/stacks"), false)
  assert.equal(isPageHidden("/about-me"), false)
  assert.equal(isPageHidden("/portfolio-v2"), false)
  assert.equal(isPageHidden("/contact-us"), false)

  // Other routes MUST NOT match
  assert.equal(isPageHidden("/"), false)
  assert.equal(isPageHidden("/maintenance"), false)
  assert.equal(isPageHidden("/abc"), false)
  assert.equal(isPageHidden("/api/test"), false)
  assert.equal(isPageHidden(""), false)
})

test("isMaintenanceActive honors NODE_ENV and SHOW_ALL_PAGES", () => {
  const originalEnv = process.env.NODE_ENV
  const originalShowAll = process.env.SHOW_ALL_PAGES
  const envMap = process.env as Record<string, string | undefined>

  try {
    // In development or test, maintenance is inactive
    envMap.NODE_ENV = "development"
    delete process.env.SHOW_ALL_PAGES
    assert.equal(isMaintenanceActive(), false)

    // In production without SHOW_ALL_PAGES, maintenance is active
    envMap.NODE_ENV = "production"
    delete process.env.SHOW_ALL_PAGES
    assert.equal(isMaintenanceActive(), true)

    // In production with SHOW_ALL_PAGES=true, maintenance is bypassed
    envMap.NODE_ENV = "production"
    process.env.SHOW_ALL_PAGES = "true"
    assert.equal(isMaintenanceActive(), false)

    // In production with SHOW_ALL_PAGES=false, maintenance is active
    envMap.NODE_ENV = "production"
    process.env.SHOW_ALL_PAGES = "false"
    assert.equal(isMaintenanceActive(), true)
  } finally {
    envMap.NODE_ENV = originalEnv
    if (originalShowAll === undefined) {
      delete process.env.SHOW_ALL_PAGES
    } else {
      process.env.SHOW_ALL_PAGES = originalShowAll
    }
  }
})

test("proxy.ts config.matcher is strictly in sync with HIDDEN_PATHS", () => {
  const proxyFilePath = path.resolve(import.meta.dirname, "../../proxy.ts")
  const proxyContent = fs.readFileSync(proxyFilePath, "utf-8")
  for (const path of HIDDEN_PATHS) {
    const expectedPattern = `"${path}/:path*"`
    assert.ok(
      proxyContent.includes(expectedPattern),
      `proxy.ts matcher missing required pattern: '${expectedPattern}' for HIDDEN_PATH: '${path}'`
    )
  }
})

test("resolveHeadingEmWidth correctly calculates em width for known and custom headings", () => {
  // Known headings
  assert.equal(resolveHeadingEmWidth("Maintenance"), 6.723)
  assert.equal(resolveHeadingEmWidth("Pemeliharaan"), 6.972)
  assert.equal(resolveHeadingEmWidth("Perbaikan"), 5.252)
  assert.equal(resolveHeadingEmWidth("404"), 1.81)

  // Case-insensitive matching
  assert.equal(resolveHeadingEmWidth("maintenance"), 6.723)
  assert.equal(resolveHeadingEmWidth("pemeliharaan"), 6.972)

  // Explicit override
  assert.equal(resolveHeadingEmWidth("Maintenance", 8.5), 8.5)

  // Dynamic proportional fallback for unknown string (18 chars * 0.59 = 10.62)
  const custom = resolveHeadingEmWidth("Under Construction")
  assert.equal(custom, 10.62)
})
