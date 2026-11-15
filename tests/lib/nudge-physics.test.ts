import { test } from "node:test"
import assert from "node:assert"
import {
  computeNudgeOffset,
  DEFAULT_NUDGE_CONFIG,
  type Point,
} from "../../lib/nudge-physics.ts"

test("computeNudgeOffset returns zero offset when cursor is outside influence radius", () => {
  const cursorPos: Point = { x: 0, y: 0 }
  const stickerCenter: Point = { x: 300, y: 300 } // distance ~424px > 160px
  const offset = computeNudgeOffset(cursorPos, stickerCenter)

  assert.strictEqual(offset.x, 0)
  assert.strictEqual(offset.y, 0)
  assert.strictEqual(offset.rotate, 0)
})

test("computeNudgeOffset pushes away directly along the vector within influence radius", () => {
  const cursorPos: Point = { x: 100, y: 100 }
  // Sticker is 80px directly to the right (distance = 80, radius = 160 -> factor = 0.5)
  const stickerCenter: Point = { x: 180, y: 100 }
  const offset = computeNudgeOffset(cursorPos, stickerCenter, {
    pushDistance: 40,
    nudgeRadius: 160,
  })

  // Expected push = 40 * 0.5 = 20px to the right
  assert.strictEqual(offset.x, 20)
  assert.strictEqual(offset.y, 0)
  assert.ok(
    offset.rotate > 0,
    "Rotation twist should be positive when pushed right"
  )
})

test("computeNudgeOffset handles cursor at far away point (-9999)", () => {
  const cursorPos: Point = { x: -9999, y: -9999 }
  const stickerCenter: Point = { x: 200, y: 200 }
  const offset = computeNudgeOffset(cursorPos, stickerCenter)

  assert.strictEqual(offset.x, 0)
  assert.strictEqual(offset.y, 0)
  assert.strictEqual(offset.rotate, 0)
})

test("DEFAULT_NUDGE_CONFIG has valid physics properties", () => {
  assert.ok(DEFAULT_NUDGE_CONFIG.nudgeRadius >= 100)
  assert.ok(DEFAULT_NUDGE_CONFIG.pushDistance >= 20)
  assert.ok(DEFAULT_NUDGE_CONFIG.stiffness > 0)
  assert.ok(DEFAULT_NUDGE_CONFIG.damping > 0)
})
