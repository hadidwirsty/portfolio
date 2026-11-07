import test from "node:test"
import assert from "node:assert"
import { navLinks, navSectionIds } from "../../lib/navigation.ts"

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
