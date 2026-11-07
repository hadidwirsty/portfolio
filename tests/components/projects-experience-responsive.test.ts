import test from "node:test"
import assert from "node:assert"
import { projects, experience } from "../../lib/cv-data.ts"
import { filterProjects, getProjectCounts } from "../../lib/projects-filter.ts"

test("projects and experience collections are properly populated", () => {
  assert.strictEqual(projects.length, 13)
  assert.strictEqual(experience.length, 3)
})

test("project filtering produces valid items for all tabs", () => {
  const counts = getProjectCounts(projects)
  assert.strictEqual(counts.all, 13)
  assert.strictEqual(filterProjects(projects, "all").length, 13)
  assert.strictEqual(filterProjects(projects, "enterprise").length, 10)
  assert.strictEqual(filterProjects(projects, "fullstack").length, 3)
})
