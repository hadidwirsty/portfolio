import test from "node:test"
import assert from "node:assert"
import { profile, ui } from "../../lib/cv-data.ts"

test("profile contains all social links for contact section", () => {
  assert.ok(profile.email)
  assert.ok(profile.linkedin.href)
  assert.ok(profile.github.href)
  assert.ok(profile.website.href)
  assert.ok(ui.contactPrompt.id)
})
