import { test } from "node:test"
import assert from "node:assert/strict"

import {
  TIMELINE_START_MONTH,
  TIMELINE_END_MONTH,
  TOTAL_TIMELINE_MONTHS,
  TOTAL_TIMELINE_INTERVALS,
  TIMELINE_YEAR_MARKERS,
  parseYearMonth,
  getMonthOffset,
  getTimelineRulerPosition,
  getTimelineRulerSpan,
  sortProjectsChronologically,
  projectTimelineItems,
  getProjectTimelineItemById,
  type ProjectTimelineItem,
} from "../../lib/portfolio-project-timeline-data.ts"
import { projects } from "../../lib/cv-data.ts"

// ---------------------------------------------------------------------------
// 1. Data Integrity & Mapping Tests
// ---------------------------------------------------------------------------
test("Data Integrity: projectTimelineItems contains exactly 13 unique verified projects", () => {
  assert.equal(projectTimelineItems.length, 13)

  const ids = projectTimelineItems.map((p) => p.id)
  const uniqueIds = new Set(ids)
  assert.equal(uniqueIds.size, 13, "All 13 project IDs must be unique")

  // Every project item must map to an existing project entry in cv-data
  for (const item of projectTimelineItems) {
    const cvProject = projects.find((p) => p.id === item.projectEntryId)
    assert.ok(
      cvProject,
      `Project item ${item.id} must map to valid cv-data entry ${item.projectEntryId}`
    )
    assert.equal(item.name, cvProject.name)
    assert.equal(item.period.id, cvProject.period.id)
    assert.equal(item.period.en, cvProject.period.en)
    assert.equal(item.company.id, cvProject.company.id)
    assert.equal(item.company.en, cvProject.company.en)
  }
})

test("Data Integrity: bilingual fields are complete without empty strings", () => {
  for (const p of projectTimelineItems) {
    assert.ok(p.name && p.name.trim().length > 0, `${p.id} must have a name`)
    assert.ok(
      p.period.id && p.period.id.trim().length > 0,
      `${p.id} must have period.id`
    )
    assert.ok(
      p.period.en && p.period.en.trim().length > 0,
      `${p.id} must have period.en`
    )
    assert.ok(
      p.shortDescription.id && p.shortDescription.id.trim().length > 0,
      `${p.id} must have shortDescription.id`
    )
    assert.ok(
      p.shortDescription.en && p.shortDescription.en.trim().length > 0,
      `${p.id} must have shortDescription.en`
    )
    assert.ok(
      p.company.id && p.company.id.trim().length > 0,
      `${p.id} must have company.id`
    )
    assert.ok(
      p.company.en && p.company.en.trim().length > 0,
      `${p.id} must have company.en`
    )
    assert.ok(
      p.techStack.length >= 3,
      `${p.id} must have at least 3 tech stack items`
    )
    assert.match(
      p.yearBadge,
      /^'\d{2}$/,
      `${p.id} yearBadge must match format 'YY (e.g. '23, '24)`
    )
  }
})

test("Data Integrity: optional coverImage and imagePosition properties are supported", () => {
  for (const p of projectTimelineItems) {
    // coverImage is optional string (undefined or non-empty string)
    if (p.coverImage !== undefined) {
      assert.equal(typeof p.coverImage, "string")
      assert.ok(p.coverImage.length > 0)
    }
    // imagePosition is optional string
    if (p.imagePosition !== undefined) {
      assert.equal(typeof p.imagePosition, "string")
    }
  }

  // Specifically verify the first 6 portfolio projects have active coverImage links
  const netmonk = getProjectTimelineItemById("netmonk")
  assert.equal(netmonk?.coverImage, "/images/portfolio/01-netmonk.png")

  const imaps = getProjectTimelineItemById("imaps")
  assert.equal(imaps?.coverImage, "/images/portfolio/02-imaps.png")

  const cart = getProjectTimelineItemById("cart")
  assert.equal(cart?.coverImage, "/images/portfolio/03-cart.png")

  const monara = getProjectTimelineItemById("monara")
  assert.equal(monara?.coverImage, "/images/portfolio/04-monara.png")

  const alisa = getProjectTimelineItemById("alisa")
  assert.equal(alisa?.coverImage, "/images/portfolio/05-alisa.png")

  const infoTender = getProjectTimelineItemById("info-tender")
  assert.equal(infoTender?.coverImage, "/images/portfolio/06-info-terder.png")
})

test("Data Integrity: getProjectTimelineItemById returns item or undefined", () => {
  const item = getProjectTimelineItemById("netmonk")
  assert.ok(item)
  assert.equal(item.id, "netmonk")
  assert.equal(item.startMonth, "2023-01")

  const nonExistent = getProjectTimelineItemById("non-existent-id")
  assert.equal(nonExistent, undefined)
})

// ---------------------------------------------------------------------------
// 2. Chronological Sorting & Tie-Breaking Tests
// ---------------------------------------------------------------------------
test("Chronology: items are strictly sorted from oldest (2023-01) to newest (2026-09)", () => {
  const expectedOrder = [
    "netmonk", // 2023-01
    "imaps", // 2024-11
    "cart", // 2025-01
    "monara", // 2025-02
    "alisa", // 2025-04
    "info-tender", // 2025-05
    "is-ware", // 2025-07
    "caterine-cm", // 2025-08
    "wbs", // 2025-12
    "cis", // 2026-03
    "pis-mars", // 2026-05 (tie 1)
    "bulk-orders", // 2026-05 (tie 2)
    "hiblow-fleet", // 2026-09
  ]

  const actualOrder = projectTimelineItems.map((p) => p.id)
  assert.deepEqual(actualOrder, expectedOrder)

  // Verify dates are non-decreasing
  for (let i = 0; i < projectTimelineItems.length - 1; i++) {
    const curr = projectTimelineItems[i].startMonth
    const next = projectTimelineItems[i + 1].startMonth
    assert.ok(
      curr <= next,
      `Project ${projectTimelineItems[i].id} (${curr}) must be <= ${projectTimelineItems[i + 1].id} (${next})`
    )
  }
})

test("Chronology: sortProjectsChronologically preserves deterministic tie-breaking for identical start dates", () => {
  const testItems: ProjectTimelineItem[] = [
    {
      id: "proj-b",
      projectEntryId: "b",
      name: "Project B",
      period: { id: "Mei 2026", en: "May 2026" },
      startMonth: "2026-05",
      endMonth: "2026-06",
      startYear: 2026,
      endYear: 2026,
      yearBadge: "'26",
      company: { id: "Co B", en: "Co B" },
      role: { id: "Dev", en: "Dev" },
      category: "enterprise",
      shortDescription: { id: "Desc", en: "Desc" },
      techStack: ["React"],
    },
    {
      id: "proj-a",
      projectEntryId: "a",
      name: "Project A",
      period: { id: "Mei 2026", en: "May 2026" },
      startMonth: "2026-05",
      endMonth: "2026-06",
      startYear: 2026,
      endYear: 2026,
      yearBadge: "'26",
      company: { id: "Co A", en: "Co A" },
      role: { id: "Dev", en: "Dev" },
      category: "fullstack",
      shortDescription: { id: "Desc", en: "Desc" },
      techStack: ["Vue"],
    },
  ]

  // Stable sort must preserve original relative order when startMonth is identical
  const sorted = sortProjectsChronologically(testItems)
  assert.equal(sorted[0].id, "proj-b")
  assert.equal(sorted[1].id, "proj-a")
})

// ---------------------------------------------------------------------------
// 3. Timeline Ruler Helpers & Mathematical Calculation Tests
// ---------------------------------------------------------------------------
test("Timeline Ruler: parseYearMonth accurately parses and validates YYYY-MM", () => {
  assert.deepEqual(parseYearMonth("2023-01"), { year: 2023, month: 1 })
  assert.deepEqual(parseYearMonth("2026-10"), { year: 2026, month: 10 })
  assert.deepEqual(parseYearMonth("2025-12"), { year: 2025, month: 12 })

  // Invalid formats return null
  assert.equal(parseYearMonth(""), null)
  assert.equal(parseYearMonth("2023"), null)
  assert.equal(parseYearMonth("2023-13"), null)
  assert.equal(parseYearMonth("2023-00"), null)
  assert.equal(parseYearMonth("invalid-date"), null)
  assert.equal(parseYearMonth("2023/01"), null)
})

test("Timeline Ruler: getMonthOffset calculates exact offset from timeline start (2023-01)", () => {
  assert.equal(getMonthOffset("2023-01"), 0)
  assert.equal(getMonthOffset("2023-12"), 11)
  assert.equal(getMonthOffset("2024-01"), 12)
  assert.equal(getMonthOffset("2025-01"), 24)
  assert.equal(getMonthOffset("2026-01"), 36)
  assert.equal(getMonthOffset("2026-10"), 45) // 46th month, 45th interval
})

test("Timeline Ruler: constants and interval division adhere to 46 months / 45 intervals", () => {
  assert.equal(TIMELINE_START_MONTH, "2023-01")
  assert.equal(TIMELINE_END_MONTH, "2026-10")
  assert.equal(TOTAL_TIMELINE_MONTHS, 46)
  assert.equal(TOTAL_TIMELINE_INTERVALS, 45)
})

test("Timeline Ruler: getTimelineRulerPosition calculates exact percentage positions (0% to 100%)", () => {
  // 1. Timeline start (2023-01) -> exactly 0%
  const startPos = getTimelineRulerPosition("2023-01")
  assert.equal(startPos, 0)

  // 2. Timeline end (2026-10) -> exactly 100%
  const endPos = getTimelineRulerPosition("2026-10")
  assert.equal(endPos, 100)

  // 3. Intermediate milestones
  // 2024-01 -> month offset 12 -> 12 / 45 * 100 = 26.666...%
  const pos2024 = getTimelineRulerPosition("2024-01")
  assert.ok(pos2024 !== null)
  assert.ok(Math.abs(pos2024 - (12 / 45) * 100) < 0.001)

  // 2025-01 -> month offset 24 -> 24 / 45 * 100 = 53.333...%
  const pos2025 = getTimelineRulerPosition("2025-01")
  assert.ok(pos2025 !== null)
  assert.ok(Math.abs(pos2025 - (24 / 45) * 100) < 0.001)

  // 2026-01 -> month offset 36 -> 36 / 45 * 100 = 80.000%
  const pos2026 = getTimelineRulerPosition("2026-01")
  assert.ok(pos2026 !== null)
  assert.ok(Math.abs(pos2026 - 80) < 0.001)

  // 4. Clamping for out-of-bounds dates
  assert.equal(
    getTimelineRulerPosition("2022-05"),
    0,
    "Dates before start clamp to 0%"
  )
  assert.equal(
    getTimelineRulerPosition("2027-01"),
    100,
    "Dates after end clamp to 100%"
  )

  // 5. Invalid date string returns null
  assert.equal(getTimelineRulerPosition("invalid"), null)
})

test("Timeline Ruler: TIMELINE_YEAR_MARKERS contains 2023, 2024, 2025, 2026 with correct positions", () => {
  assert.equal(TIMELINE_YEAR_MARKERS.length, 4)

  const years = TIMELINE_YEAR_MARKERS.map((m) => m.year)
  assert.deepEqual(years, [2023, 2024, 2025, 2026])

  // 2023 position: 0%
  assert.equal(TIMELINE_YEAR_MARKERS[0].position, 0)
  // 2024 position: ~26.67%
  assert.ok(
    Math.abs(TIMELINE_YEAR_MARKERS[1].position - (12 / 45) * 100) < 0.01
  )
  // 2025 position: ~53.33%
  assert.ok(
    Math.abs(TIMELINE_YEAR_MARKERS[2].position - (24 / 45) * 100) < 0.01
  )
  // 2026 position: 80%
  assert.ok(Math.abs(TIMELINE_YEAR_MARKERS[3].position - 80) < 0.01)
})

test("Timeline Ruler: getTimelineRulerSpan calculates start position and width", () => {
  // Netmonk: 2023-01 to 2023-12 (offsets 0 to 11 -> span from 0% to 11/45 * 100)
  const netmonkSpan = getTimelineRulerSpan("2023-01", "2023-12")
  assert.ok(netmonkSpan)
  assert.equal(netmonkSpan.left, 0)
  assert.ok(Math.abs(netmonkSpan.width - (11 / 45) * 100) < 0.001)

  // Same start and end month: e.g. 2025-01 to 2025-01
  const pointSpan = getTimelineRulerSpan("2025-01", "2025-01")
  assert.ok(pointSpan)
  assert.ok(Math.abs(pointSpan.left - (24 / 45) * 100) < 0.001)
  assert.equal(pointSpan.width, 0)

  // Invalid inputs return null
  assert.equal(getTimelineRulerSpan("invalid", "2024-01"), null)
  assert.equal(getTimelineRulerSpan("2024-01", "invalid"), null)
  assert.equal(
    getTimelineRulerSpan("2025-01", "2024-01"),
    null,
    "End before start returns null"
  )
})
