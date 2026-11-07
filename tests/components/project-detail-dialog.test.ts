import test from "node:test"
import assert from "node:assert"
import { projects } from "../../lib/cv-data.ts"
import { getProjectCategory } from "../../lib/projects-filter.ts"

test("first project has all required data for detail dialog", () => {
  const project = projects[0]
  assert.ok(project.name)
  assert.ok(project.role.id)
  assert.ok(project.role.en)
  assert.ok(project.description.id)
  assert.ok(project.description.en)
  assert.ok(Array.isArray(project.tech))
  assert.ok(project.tech.length > 0)
})

test("projects have company and period fields formatted properly", () => {
  for (const project of projects) {
    assert.ok(project.company.id)
    assert.ok(project.period.id)
    const category = getProjectCategory(project.id)
    assert.ok(category === "enterprise" || category === "fullstack")
  }
})
