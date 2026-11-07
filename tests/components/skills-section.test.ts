import test from "node:test"
import assert from "node:assert"
import { skillGroups } from "../../lib/cv-data.ts"

test("skillGroups contains exactly 6 categories with items", () => {
  assert.strictEqual(skillGroups.length, 6)
  for (const group of skillGroups) {
    assert.ok(group.title.id)
    assert.ok(group.title.en)
    assert.ok(Array.isArray(group.items) && group.items.length > 0)
  }
})

test("core skills are present in respective groups", () => {
  const allSkills = new Set(skillGroups.flatMap((g) => g.items))
  assert.ok(allSkills.has("TypeScript"))
  assert.ok(allSkills.has("React (19/18)"))
  assert.ok(allSkills.has("Next.js (App Router, RSC)"))
  assert.ok(allSkills.has("Tailwind CSS (v3 & v4)"))
  assert.ok(allSkills.has("TanStack Query (React Query)"))
  assert.ok(allSkills.has("Vitest"))
})
