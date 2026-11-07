import test from "node:test"
import assert from "node:assert"
import { projects } from "../../lib/cv-data.ts"
import { filterProjects, getProjectCounts } from "../../lib/projects-filter.ts"

test("projects section filtering yields non-empty lists for all categories", () => {
  const counts = getProjectCounts(projects)
  assert.strictEqual(counts.all, 13)
  assert.strictEqual(counts.enterprise, 10)
  assert.strictEqual(counts.fullstack, 3)

  assert.strictEqual(filterProjects(projects, "all").length, 13)
  assert.strictEqual(filterProjects(projects, "enterprise").length, 10)
  assert.strictEqual(filterProjects(projects, "fullstack").length, 3)
})
