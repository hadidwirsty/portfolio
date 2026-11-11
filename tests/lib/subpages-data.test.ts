import test from "node:test"
import assert from "node:assert"
import { subpages } from "../../lib/cv-data.ts"

test("subpages contains all 4 subpage definitions", () => {
  const expectedKeys = ["about", "contact", "portfolio", "stack"] as const
  assert.deepStrictEqual(Object.keys(subpages).sort(), [...expectedKeys].sort())
})

test("each subpage has valid bilingual title and description", () => {
  const subpageKeys = Object.keys(subpages) as (keyof typeof subpages)[]

  for (const key of subpageKeys) {
    const entry = subpages[key]

    // Validate title
    assert.ok(entry.title, `subpage ${key} should have a title`)
    assert.ok(
      typeof entry.title.id === "string" && entry.title.id.trim().length > 0,
      `subpage ${key} should have non-empty title.id`
    )
    assert.ok(
      typeof entry.title.en === "string" && entry.title.en.trim().length > 0,
      `subpage ${key} should have non-empty title.en`
    )

    // Validate description
    assert.ok(entry.description, `subpage ${key} should have a description`)
    assert.ok(
      typeof entry.description.id === "string" &&
        entry.description.id.trim().length > 0,
      `subpage ${key} should have non-empty description.id`
    )
    assert.ok(
      typeof entry.description.en === "string" &&
        entry.description.en.trim().length > 0,
      `subpage ${key} should have non-empty description.en`
    )
  }
})

test("subpage titles match expected bilingual labels", () => {
  assert.strictEqual(subpages.about.title.id, "Tentang")
  assert.strictEqual(subpages.about.title.en, "About")

  assert.strictEqual(subpages.contact.title.id, "Kontak")
  assert.strictEqual(subpages.contact.title.en, "Contact")

  assert.strictEqual(subpages.portfolio.title.id, "Portofolio")
  assert.strictEqual(subpages.portfolio.title.en, "Portfolio")

  assert.strictEqual(subpages.stack.title.id, "Keahlian")
  assert.strictEqual(subpages.stack.title.en, "Stack")
})
