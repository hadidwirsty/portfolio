import test from "node:test"
import assert from "node:assert"
import { experience, projects } from "../../lib/cv-professional-data.ts"
import { publicExperience } from "../../lib/public-experience-data.ts"

test("experience entries map to existing projects correctly", () => {
  const allProjectIds = new Set(projects.map((p) => p.id))
  for (const entry of experience) {
    assert.ok(entry.role.id)
    assert.ok(entry.company)
    assert.ok(entry.period.id)
    assert.ok(entry.employmentType.id)
    assert.ok(Array.isArray(entry.points) && entry.points.length > 0)
    assert.ok(Array.isArray(entry.projectIds))
    for (const pid of entry.projectIds) {
      assert.ok(allProjectIds.has(pid), `Project ID ${pid} must exist`)
    }
  }
})

test("experience list has exactly 3 chronological career steps", () => {
  assert.strictEqual(experience.length, 3)
  assert.strictEqual(experience[0].id, "sigma")
  assert.strictEqual(experience[1].id, "tumbuhin")
  assert.strictEqual(experience[2].id, "telkom")
})

test("the About projection preserves experience and uses only public related-project fields", () => {
  assert.equal(publicExperience.length, experience.length)
  for (const [index, entry] of publicExperience.entries()) {
    const { projectIds, ...displayFields } = experience[index]
    const { relatedProjects, ...publicFields } = entry
    assert.deepEqual(publicFields, {
      ...displayFields,
      summary: displayFields.summary,
    })
    assert.deepEqual(
      relatedProjects,
      projects
        .filter(({ id }) => projectIds.includes(id))
        .map(({ id, publicRef, name }) => ({ ref: publicRef ?? id, name }))
    )
  }
})
