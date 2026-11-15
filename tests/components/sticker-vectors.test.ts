import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"
import { getStickerMetadata, ALL_STICKERS } from "../../lib/sticker-metadata.ts"

test("getStickerMetadata returns valid definition for all stickers in ALL_STICKERS", () => {
  assert.strictEqual(ALL_STICKERS.length, 15)
  ALL_STICKERS.forEach((meta) => {
    const found = getStickerMetadata(meta.id)
    assert.ok(found, `Metadata for ${meta.id} must exist`)
    assert.strictEqual(found.id, meta.id)
    assert.ok(
      found.type === "link" ||
        found.type === "avatar" ||
        found.type === "decorative",
      `Expected valid type for ${meta.id}, got ${found.type}`
    )
  })
})

test("sticker-vectors.tsx exists and exports StickerVector and DIE_CUT_FILTER_STYLE", () => {
  const filePath = path.resolve(
    import.meta.dirname,
    "../../components/contact/sticker-vectors.tsx"
  )
  assert.ok(fs.existsSync(filePath), "sticker-vectors.tsx must exist")
  const content = fs.readFileSync(filePath, "utf-8")
  assert.ok(
    content.includes("export function StickerVector"),
    "Must export StickerVector component"
  )
  assert.ok(
    content.includes("DIE_CUT_FILTER_STYLE"),
    "Must export DIE_CUT_FILTER_STYLE"
  )
})

test("sticker-vectors.tsx applies default responsive sizing classes", () => {
  const filePath = path.resolve(
    import.meta.dirname,
    "../../components/contact/sticker-vectors.tsx"
  )
  const content = fs.readFileSync(filePath, "utf-8")
  assert.ok(
    content.includes("size-11 sm:size-13 lg:size-15 object-contain"),
    "sticker-vectors.tsx must define default responsive size classes"
  )
})
