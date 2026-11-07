import test from "node:test"
import assert from "node:assert"
import { projects } from "../../lib/cv-data.ts"
import {
  filterProjects,
  getProjectCategory,
  getProjectCounts,
  projectCategories,
} from "../../lib/projects-filter.ts"

test("getProjectCategory correctly classifies projects", () => {
  assert.strictEqual(getProjectCategory("imaps"), "enterprise")
  assert.strictEqual(getProjectCategory("wbs"), "enterprise")
  assert.strictEqual(getProjectCategory("hiblow-fleet"), "fullstack")
  assert.strictEqual(getProjectCategory("netmonk"), "fullstack")
})

test("filterProjects returns accurate counts per category", () => {
  const all = filterProjects(projects, "all")
  const enterprise = filterProjects(projects, "enterprise")
  const fullstack = filterProjects(projects, "fullstack")

  assert.strictEqual(all.length, 13)
  assert.strictEqual(enterprise.length, 10)
  assert.strictEqual(fullstack.length, 3)
})

test("getProjectCounts matches total and category breakdown", () => {
  const counts = getProjectCounts(projects)
  assert.deepStrictEqual(counts, { all: 13, enterprise: 10, fullstack: 3 })
})

test("projectCategories contains valid bilingual definitions", () => {
  assert.strictEqual(projectCategories.length, 3)
  for (const cat of projectCategories) {
    assert.ok(cat.id)
    assert.ok(cat.label.id)
    assert.ok(cat.label.en)
  }
})
