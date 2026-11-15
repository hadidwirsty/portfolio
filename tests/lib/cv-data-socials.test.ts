import { test } from "node:test"
import assert from "node:assert"
import { profile, ui } from "../../lib/cv-data.ts"

test("profile contains instagram and threads links in correct format", () => {
  assert.strictEqual(profile.instagram.label, "@hadidwirsty")
  assert.strictEqual(
    profile.instagram.href,
    "https://www.instagram.com/hadidwirsty/"
  )
  assert.strictEqual(profile.threads.label, "@hadidwirsty")
  assert.strictEqual(
    profile.threads.href,
    "https://www.threads.com/@hadidwirsty"
  )
})

test("ui contains popover copy for all stickers in ID and EN", () => {
  const stickerIds = [
    "email",
    "github",
    "linkedin",
    "instagram",
    "threads",
    "website",
    "cv",
    "avatar",
    "hi",
    "open-to-work",
    "heart",
    "bolt",
    "strava",
    "youtube",
    "react",
    "nextjs",
    "typescript",
    "tailwind-css",
  ] as const

  assert.ok(ui.stickerPopovers, "ui.stickerPopovers must exist")
  stickerIds.forEach((id) => {
    assert.ok(ui.stickerPopovers[id], `Popover copy for ${id} must exist`)
    assert.ok(ui.stickerPopovers[id].id, `Indonesian copy for ${id} required`)
    assert.ok(ui.stickerPopovers[id].en, `English copy for ${id} required`)
  })
})
