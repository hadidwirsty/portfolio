import test from "node:test"
import assert from "node:assert"
import { profile, ui } from "../../lib/cv-data.ts"

test("hero profile has required attributes for responsive display", () => {
  assert.ok(profile.name)
  assert.ok(profile.photo)
  assert.ok(profile.metrics && profile.metrics.length === 4)
  assert.ok(ui.downloadCv.id)
  assert.ok(ui.contactMe.id)
})
