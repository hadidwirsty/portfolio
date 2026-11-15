import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

const COMPONENT_PATH = path.resolve(
  process.cwd(),
  "components/contact/sticker-board.tsx"
)

test("sticker-board component file exists and exports StickerBoard", () => {
  assert.ok(
    fs.existsSync(COMPONENT_PATH),
    "components/contact/sticker-board.tsx must exist"
  )
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /export (function StickerBoard|const StickerBoard)/,
    "sticker-board.tsx must export StickerBoard"
  )
  assert.match(
    source,
    /use client/,
    "sticker-board.tsx must be a client component"
  )
})

test("sticker-board renders cutting mat surface with grid, accents, and ruler markings", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Cutting mat visual details: 24px grid, accent markings, ruler numbers
  assert.match(
    source,
    /CUTTING MAT \/\/ 01/,
    "sticker-board.tsx must display CUTTING MAT // 01 title"
  )
  assert.match(
    source,
    /role=["']group["']/,
    "sticker-board.tsx container must have role='group'"
  )
})

test("sticker-board provides Shuffle and Tidy Up controls", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /shuffle/,
    "sticker-board.tsx must include Shuffle control"
  )
  assert.match(
    source,
    /tidyUp/,
    "sticker-board.tsx must include Tidy Up control"
  )
})

test("sticker-board includes micro-annotation arrow for >=1025px viewports", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /dragStickerHint/,
    "sticker-board.tsx must render dragStickerHint micro-annotation"
  )
  assert.match(
    source,
    /lg:/,
    "sticker-board.tsx must restrict micro-annotation to large screens (>=1025px)"
  )
})

test("sticker-board manages pile, tidy, and custom layout states for all 12 stickers", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /InteractiveSticker/,
    "sticker-board.tsx must render InteractiveSticker components"
  )
  assert.match(
    source,
    /STICKER_ORDER/,
    "sticker-board.tsx must render stickers according to STICKER_ORDER"
  )
  assert.match(
    source,
    /computeGridLayout/,
    "sticker-board.tsx must use computeGridLayout for tidy mode"
  )
})

test("sticker-board uses responsive halfSticker offsets for centering without clipping", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Must calculate halfSticker dynamically based on viewport breakpoints (22 for mobile, 26 for tablet, 30 for desktop)
  assert.match(
    source,
    /halfSticker = isDesktop \? 30 : isWide \? 26 : 22/,
    "sticker-board.tsx must adjust halfSticker centering offset for mobile, tablet, and desktop"
  )
  assert.match(
    source,
    /stickerSize = isDesktop \? 60 : isWide \? 52 : 44/,
    "sticker-board.tsx must adjust pile usable area using responsive sticker sizes"
  )
})
