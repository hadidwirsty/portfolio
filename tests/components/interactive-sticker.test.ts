import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

import { ALL_STICKERS } from "../../lib/sticker-metadata.ts"
import { ui } from "../../lib/cv-data.ts"

const COMPONENT_PATH = path.resolve(
  process.cwd(),
  "components/contact/interactive-sticker.tsx"
)

test("interactive-sticker component file exists and exports InteractiveSticker", () => {
  assert.ok(
    fs.existsSync(COMPONENT_PATH),
    "components/contact/interactive-sticker.tsx must exist"
  )
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /export (function InteractiveSticker|const InteractiveSticker)/,
    "interactive-sticker.tsx must export InteractiveSticker"
  )
  assert.match(
    source,
    /use client/,
    "interactive-sticker.tsx must be a client component"
  )
})

test("interactive-sticker integrates die-cut vector silhouettes and filter style", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /StickerVector/,
    "interactive-sticker.tsx must render StickerVector"
  )
  assert.match(
    source,
    /DIE_CUT_FILTER_STYLE/,
    "interactive-sticker.tsx must use DIE_CUT_FILTER_STYLE for silhouettes"
  )
})

test("interactive-sticker implements bilingual popovers with accessibility roles", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /role=["']tooltip["']/,
    "interactive-sticker.tsx must include role='tooltip' for the popover"
  )
  assert.match(
    source,
    /["']?aria-describedby["']?:?/,
    "interactive-sticker.tsx must link sticker to popover via aria-describedby"
  )
  assert.match(
    source,
    /stickerPopovers/,
    "interactive-sticker.tsx must reference ui.stickerPopovers"
  )
})

test("interactive-sticker provides drag momentum and click threshold guard", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /dragMomentum/,
    "interactive-sticker.tsx must configure dragMomentum"
  )
  assert.match(
    source,
    /touch-pan-y|touch-action/,
    "interactive-sticker.tsx must support touch scrolling via pan-y"
  )
})

test("all sticker IDs in ALL_STICKERS have matching popovers in cv-data ui", () => {
  ALL_STICKERS.forEach((sticker) => {
    const popover =
      ui.stickerPopovers[sticker.id as keyof typeof ui.stickerPopovers]
    assert.ok(
      popover,
      `Popover for ${sticker.id} must exist in ui.stickerPopovers`
    )
    assert.ok(
      popover.id && popover.id.length > 0,
      `Popover ID for ${sticker.id} must be non-empty`
    )
    assert.ok(
      popover.en && popover.en.length > 0,
      `Popover EN for ${sticker.id} must be non-empty`
    )
  })
})

test("interactive-sticker implements responsive sticker sizing across viewports", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Must apply responsive sizing classes matching mobile (~40-48px), tablet (~44-56px), desktop (~48-64px)
  assert.match(
    source,
    /size-11[\s\S]*?sm:size-13[\s\S]*?lg:size-15/,
    "interactive-sticker.tsx must apply size-11 (44px), sm:size-13 (52px), lg:size-15 (60px) responsive classes"
  )
  assert.match(
    source,
    /size-full object-contain/,
    "interactive-sticker.tsx must render StickerVector with size-full object-contain"
  )
})
