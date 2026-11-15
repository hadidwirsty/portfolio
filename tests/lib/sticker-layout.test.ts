import { test } from "node:test"
import assert from "node:assert"
import {
  STICKER_ORDER,
  PILE_LAYOUTS,
  computeGridLayout,
  computeShuffleLayout,
} from "../../lib/sticker-layout.ts"

test("STICKER_ORDER contains exactly 15 stickers", () => {
  assert.strictEqual(STICKER_ORDER.length, 15)
})

test("computeGridLayout generates exact 5x3 grid with uniform spacing and 0 rotation", () => {
  const grid = computeGridLayout(5, 3, 800, 600, STICKER_ORDER)
  assert.strictEqual(grid.length, 15)
  grid.forEach((item) => {
    assert.strictEqual(item.rotate, 0)
    assert.ok(item.x >= 0 && item.x <= 800)
    assert.ok(item.y >= 0 && item.y <= 600)
  })
  // Verify horizontal column pitch is equal
  const colPitch = 800 / 5
  assert.strictEqual(grid[1].x - grid[0].x, colPitch)
})

test("computeGridLayout generates exact 3x5 grid for mobile", () => {
  const grid = computeGridLayout(3, 5, 360, 480, STICKER_ORDER)
  assert.strictEqual(grid.length, 15)
  const colPitch = 360 / 3
  assert.strictEqual(grid[1].x - grid[0].x, colPitch)
})

test("PILE_LAYOUTS keeps all 15 items strictly within 0..1 normalized bounds", () => {
  ;(["wide", "narrow"] as const).forEach((mode) => {
    const layout = PILE_LAYOUTS[mode]
    assert.strictEqual(layout.length, 15)
    layout.forEach((s) => {
      assert.ok(s.x >= 0 && s.x <= 1, `${s.id} x must be within [0, 1]`)
      assert.ok(s.y >= 0 && s.y <= 1, `${s.id} y must be within [0, 1]`)
      assert.ok(s.rotate >= -10 && s.rotate <= 10)
    })
  })
})

test("computeShuffleLayout generates valid bounded coordinates for all 15 items", () => {
  const shuffle = computeShuffleLayout(800, 600, STICKER_ORDER)
  assert.strictEqual(shuffle.length, 15)
  shuffle.forEach((item) => {
    assert.ok(item.x >= 0 && item.x <= 800)
    assert.ok(item.y >= 0 && item.y <= 600)
    assert.ok(item.rotate >= -15 && item.rotate <= 15)
  })
})
