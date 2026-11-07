import test from "node:test"
import assert from "node:assert"
import { profile, ui } from "../../lib/cv-data.ts"

test("hero profile has required presentation fields", () => {
  assert.ok(profile.name)
  assert.ok(profile.photo)
  assert.ok(profile.role.id)
  assert.ok(profile.tagline.id)
  assert.ok(profile.summary.id)
  assert.ok(profile.metrics && profile.metrics.length === 4)
  assert.ok(ui.copyEmail)
  assert.ok(ui.copied)
})
