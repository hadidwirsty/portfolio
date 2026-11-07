import test from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"
import nextConfig from "../../next.config.ts"
import { profile } from "../../lib/cv-data.ts"

test("nextConfig disables dev indicators", () => {
  assert.strictEqual(nextConfig.devIndicators, false)
})

test("profile provides initials and name for brand link", () => {
  assert.ok(profile.initials)
  assert.ok(profile.name)
})

test("profile provides pixel avatar image and favicon assets exist", () => {
  assert.ok(profile.avatar)
  const avatarPath = path.join(process.cwd(), "public", profile.avatar)
  const faviconAppPath = path.join(process.cwd(), "app", "favicon.ico")
  const iconAppPath = path.join(process.cwd(), "app", "icon.png")

  assert.ok(fs.existsSync(avatarPath), "public/images/avatar.png must exist")
  assert.ok(fs.existsSync(faviconAppPath), "app/favicon.ico must exist")
  assert.ok(fs.existsSync(iconAppPath), "app/icon.png must exist")
})
