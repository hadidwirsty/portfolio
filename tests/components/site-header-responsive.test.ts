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

  assert.ok(fs.existsSync(avatarPath), "profile avatar image must exist")
  assert.ok(
    fs.statSync(avatarPath).size > 0,
    "profile avatar image must not be empty"
  )
  assert.ok(fs.existsSync(faviconAppPath), "app/favicon.ico must exist")
  assert.ok(
    fs.statSync(faviconAppPath).size > 0,
    "app/favicon.ico must not be empty"
  )
})
