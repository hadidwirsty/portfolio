import test from "node:test"
import assert from "node:assert"
import { shouldShowBackToTop } from "../../lib/scroll.ts"

test("shouldShowBackToTop returns false at top of page", () => {
  assert.strictEqual(shouldShowBackToTop(0, 400), false)
  assert.strictEqual(shouldShowBackToTop(350, 400), false)
  assert.strictEqual(shouldShowBackToTop(400, 400), false)
})

test("shouldShowBackToTop returns true past threshold", () => {
  assert.strictEqual(shouldShowBackToTop(401, 400), true)
  assert.strictEqual(shouldShowBackToTop(1200, 400), true)
})

test("shouldShowBackToTop uses default threshold of 400", () => {
  assert.strictEqual(shouldShowBackToTop(399), false)
  assert.strictEqual(shouldShowBackToTop(401), true)
})
