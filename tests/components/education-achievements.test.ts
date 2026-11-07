import test from "node:test"
import assert from "node:assert"
import {
  achievements,
  education,
  organizations,
  volunteering,
} from "../../lib/cv-data.ts"

test("education has UGM CS entry with thesis details", () => {
  assert.strictEqual(education.length, 2)
  const ugm = education[0]
  assert.ok(ugm.institution.includes("Universitas Gadjah Mada"))
  assert.ok(ugm.extra)
  assert.strictEqual(ugm.period, "2020 – 2024")
})

test("achievements and organizations have valid structures", () => {
  assert.strictEqual(achievements.length, 2)
  assert.strictEqual(organizations.length, 4)
  assert.strictEqual(volunteering.length, 2)
})
