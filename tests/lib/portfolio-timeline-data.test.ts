import test from "node:test"
import assert from "node:assert"
import {
  timelineMilestones,
  getTimelineWaveGeometry,
} from "../../lib/portfolio-timeline-data.ts"

test("timelineMilestones contains exactly 5 verified milestones", () => {
  assert.strictEqual(timelineMilestones.length, 5)

  const expectedIds = [
    "ugm-cs",
    "telkom-intern",
    "dicoding-cert",
    "telkomsigma-enterprise",
    "hiblow-fullstack",
  ]
  assert.deepStrictEqual(
    timelineMilestones.map((m) => m.id),
    expectedIds
  )
})

test("each milestone has valid bilingual data and non-empty highlights", () => {
  for (const m of timelineMilestones) {
    assert.ok(
      m.year && m.year.length === 4,
      `Milestone ${m.id} must have a 4-digit year`
    )
    assert.ok(
      m.title.id && m.title.en,
      `Milestone ${m.id} must have bilingual title`
    )
    assert.ok(
      m.institution.id && m.institution.en,
      `Milestone ${m.id} must have bilingual institution`
    )
    assert.ok(
      m.summary.id && m.summary.en,
      `Milestone ${m.id} must have bilingual summary`
    )
    assert.ok(
      Array.isArray(m.highlights) && m.highlights.length >= 2,
      `Milestone ${m.id} must have at least 2 highlights`
    )
    for (const h of m.highlights) {
      assert.ok(h.id && h.en, `Highlight in ${m.id} must be bilingual`)
    }
  }
})

test("milestones follow 2020, 2023, 2024, 2025, 2026 sequence matching wireframe", () => {
  const years = timelineMilestones.map((m) => m.year)
  assert.deepStrictEqual(years, ["2020", "2023", "2024", "2025", "2026"])

  // Node 4 (2025) has peak label position "top", others "bottom"
  assert.strictEqual(timelineMilestones[0].labelPosition, "bottom")
  assert.strictEqual(timelineMilestones[1].labelPosition, "bottom")
  assert.strictEqual(timelineMilestones[2].labelPosition, "bottom")
  assert.strictEqual(timelineMilestones[3].labelPosition, "top")
  assert.strictEqual(timelineMilestones[4].labelPosition, "bottom")
})

test("getTimelineWaveGeometry produces valid SVG path and coordinates lying on curve", () => {
  const geometry = getTimelineWaveGeometry(2)

  assert.strictEqual(geometry.nodes.length, 5)
  assert.strictEqual(geometry.width, 1000)
  assert.strictEqual(geometry.height, 220)

  // Full path starts with M and has 4 C commands
  assert.match(geometry.fullPath, /^M\s*\d+/)
  const cubicMatches = geometry.fullPath.match(/C\s*[\d\.\s,]+/g)
  assert.strictEqual(
    cubicMatches?.length,
    4,
    "Must have exactly 4 cubic Bezier segments"
  )

  // For activeIndex = 2 (node 2), activePath must end at node 2's coordinates
  const node2 = geometry.nodes[2]
  assert.match(
    geometry.activePath,
    new RegExp(`${node2.x}\\s*,?\\s*${node2.y}`)
  )
})
