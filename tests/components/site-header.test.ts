import test from "node:test"
import assert from "node:assert"
import {
  navLinks,
  navSectionIds,
  subpageRoutes,
  subpagePaths,
} from "../../lib/navigation.ts"
import { subpages } from "../../lib/cv-data.ts"

test("navSectionIds matches all 8 landing page sections in exact sequence", () => {
  const expected = [
    "about",
    "experience",
    "projects",
    "skills",
    "education",
    "certifications",
    "achievements",
    "contact",
  ]
  assert.deepStrictEqual(navSectionIds, expected)
})

test("navLinks contains proper href and sectionId mappings", () => {
  assert.strictEqual(navLinks.length, 8)
  for (const link of navLinks) {
    assert.strictEqual(link.href, `#${link.sectionId}`)
    assert.ok(link.label.id)
    assert.ok(link.label.en)
  }
})

test("subpageRoutes and subpagePaths correctly map all 4 subpages", () => {
  assert.strictEqual(subpageRoutes.length, 4)
  assert.deepStrictEqual(subpagePaths, [
    "/about",
    "/portfolio",
    "/stack",
    "/contact",
  ])

  for (const route of subpageRoutes) {
    assert.strictEqual(route.href, `/${route.key}`)
    assert.deepStrictEqual(route.label, subpages[route.key].title)
  }
})
