import test from "node:test"
import assert from "node:assert"
import { profile, ui } from "../../lib/cv-data.ts"
import { copyTextToClipboard } from "../../lib/clipboard.ts"

test("profile includes 4 highlight metrics", () => {
  const metrics = (
    profile as {
      metrics?: Array<{ value: string; label: { id: string; en: string } }>
    }
  ).metrics
  assert.ok(Array.isArray(metrics))
  assert.strictEqual(metrics.length, 4)
  assert.ok(metrics[0].value)
  assert.ok(metrics[0].label.id)
  assert.ok(metrics[0].label.en)
})

test("ui includes copyEmail and copied labels", () => {
  const customUi = ui as typeof ui & {
    copyEmail?: { id: string; en: string }
    copied?: { id: string; en: string }
  }
  assert.ok(customUi.copyEmail)
  assert.strictEqual(customUi.copyEmail.id, "Salin Email")
  assert.strictEqual(customUi.copyEmail.en, "Copy Email")
  assert.ok(customUi.copied)
  assert.strictEqual(customUi.copied.id, "Tersalin!")
  assert.strictEqual(customUi.copied.en, "Copied!")
})

test("copyTextToClipboard returns false when text is empty", async () => {
  const result = await copyTextToClipboard("")
  assert.strictEqual(result, false)
})
