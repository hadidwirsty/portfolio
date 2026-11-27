import { test } from "node:test"
import assert from "node:assert"
import { projects } from "../../lib/cv-professional-data.ts"
import {
  EXPERIENCE_FILTER_DEFS,
  PROJECT_WORK_AFFILIATION,
  getExperienceCategoryCounts,
  getFilteredProjects,
  sortProjectsNewestFirst,
} from "../../lib/portfolio-experience-filter.ts"

test("Work Experience Affiliation maps all 13 projects uniquely", () => {
  assert.strictEqual(projects.length, 13, "must have exactly 13 projects")

  const mappedIds = Object.keys(PROJECT_WORK_AFFILIATION)
  assert.strictEqual(
    mappedIds.length,
    13,
    "affiliation mapping must contain exactly 13 projects"
  )

  for (const project of projects) {
    const affiliation = PROJECT_WORK_AFFILIATION[project.id]
    assert.ok(
      affiliation,
      `project '${project.id}' must have a valid work experience affiliation`
    )
    assert.ok(
      [
        "telkom-indonesia",
        "telkomsigma",
        "tumbuhin-digital",
        "personal",
      ].includes(affiliation),
      `project '${project.id}' affiliation '${affiliation}' must be valid`
    )
  }
})

test("Project counts match required distribution across work experiences", () => {
  const counts = getExperienceCategoryCounts()

  assert.strictEqual(counts.featured, 6, "Featured must have 6 projects")
  assert.strictEqual(counts.all, 13, "All must have 13 projects")
  assert.strictEqual(
    counts["telkom-indonesia"],
    1,
    "Telkom Indonesia must have exactly 1 project (Netmonk)"
  )
  assert.strictEqual(
    counts.telkomsigma,
    10,
    "Telkomsigma must have exactly 10 projects"
  )
  assert.strictEqual(
    counts["tumbuhin-digital"],
    1,
    "Tumbuhin Digital must have exactly 1 project (Bulk Orders)"
  )
  assert.strictEqual(
    counts.personal,
    1,
    "Personal must have exactly 1 project (HiBlow Fleet)"
  )
})

test("Featured filter returns exact 6 curated projects in predefined order", () => {
  const featured = getFilteredProjects("featured")
  assert.strictEqual(featured.length, 6)

  const expectedOrder = [
    "hiblow-fleet",
    "is-ware",
    "alisa",
    "wbs",
    "info-tender",
    "imaps",
  ]

  assert.deepStrictEqual(
    featured.map((p) => p.id),
    expectedOrder,
    "Featured projects must maintain curated sequence"
  )
})

test("All filter keeps Featured in the first six positions and adds the remaining seven newest first", () => {
  const featuredIds = getFilteredProjects("featured").map(({ id }) => id)
  const allIds = getFilteredProjects("all").map(({ id }) => id)

  assert.deepEqual(allIds, [
    ...featuredIds,
    "bulk-orders",
    "pis-mars",
    "cis",
    "caterine-cm",
    "monara",
    "cart",
    "netmonk",
  ])
  assert.deepEqual(new Set(allIds), new Set(projects.map(({ id }) => id)))
})

test("Deterministic tie-breaking works for projects starting on the same month", () => {
  // bulk-orders and pis-mars both start in 2026-05 and end in 2026-06
  const sample = projects.filter(
    (p) => p.id === "bulk-orders" || p.id === "pis-mars"
  )
  const sorted = sortProjectsNewestFirst(sample)

  // id ASC tie-breaking: 'bulk-orders' < 'pis-mars'
  assert.strictEqual(sorted[0].id, "bulk-orders")
  assert.strictEqual(sorted[1].id, "pis-mars")
})

test("Telkomsigma filter returns all 10 Telkomsigma projects sorted newest first", () => {
  const telkomsigmaProjects = getFilteredProjects("telkomsigma")
  assert.strictEqual(telkomsigmaProjects.length, 10)

  const expectedIds = [
    "pis-mars",
    "cis",
    "wbs",
    "caterine-cm",
    "is-ware",
    "info-tender",
    "alisa",
    "monara",
    "cart",
    "imaps",
  ]

  assert.deepStrictEqual(
    telkomsigmaProjects.map((p) => p.id),
    expectedIds,
    "Telkomsigma projects must be sorted chronologically newest first"
  )
})

test("Single project filters (Telkom Indonesia, Tumbuhin Digital, Personal) return correct single items", () => {
  const telkom = getFilteredProjects("telkom-indonesia")
  assert.strictEqual(telkom.length, 1)
  assert.strictEqual(telkom[0].id, "netmonk")

  const tumbuhin = getFilteredProjects("tumbuhin-digital")
  assert.strictEqual(tumbuhin.length, 1)
  assert.strictEqual(tumbuhin[0].id, "bulk-orders")

  const personal = getFilteredProjects("personal")
  assert.strictEqual(personal.length, 1)
  assert.strictEqual(personal[0].id, "hiblow-fleet")
})

test("Filter definitions contain valid bilingual labels", () => {
  assert.strictEqual(EXPERIENCE_FILTER_DEFS.length, 6)

  for (const def of EXPERIENCE_FILTER_DEFS) {
    assert.ok(def.id)
    assert.ok(def.label.id && def.label.id.length > 0)
    assert.ok(def.label.en && def.label.en.length > 0)
  }
})
