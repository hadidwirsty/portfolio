import { test } from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

test("gradient-motion-background maintains production defaults for dark mode", () => {
  const filePath = path.resolve(
    process.cwd(),
    "components/ui/gradient-motion-background.tsx"
  )
  assert.ok(
    fs.existsSync(filePath),
    "components/ui/gradient-motion-background.tsx must exist"
  )

  const content = fs.readFileSync(filePath, "utf-8")
  assert.ok(
    content.includes("dark:bg-[rgba(18,20,24,0.82)]"),
    "GradientMotionBackground must use production dark background rgba(18,20,24,0.82)"
  )
  assert.ok(
    content.includes("rgba(38, 42, 50, 0.75)"),
    "GradientMotionBackground must use subtle production darkPalette"
  )
})

test("kinetic-heading eliminates artificial ghost layer completely", () => {
  const headingPath = path.resolve(
    process.cwd(),
    "components/kinetic-heading.tsx"
  )
  assert.ok(
    fs.existsSync(headingPath),
    "components/kinetic-heading.tsx must exist"
  )
  const content = fs.readFileSync(headingPath, "utf-8")

  assert.ok(
    !content.includes("showGhost"),
    "KineticHeading must not contain showGhost prop"
  )
  assert.ok(
    !content.includes("ghostBlur"),
    "KineticHeading must not contain ghostBlur prop"
  )
  assert.ok(
    !content.includes("ghostOpacity"),
    "KineticHeading must not contain ghostOpacity prop"
  )
  assert.ok(
    !content.includes("--ghost-blur"),
    "KineticHeading must not define --ghost-blur style"
  )
})

test("vexoo-dashboard matches Vexoo card styling baseline with unified heading motion", () => {
  const dashboardPath = path.resolve(
    process.cwd(),
    "components/vexoo-dashboard.tsx"
  )
  const content = fs.readFileSync(dashboardPath, "utf-8")

  // Heading motion must be unified without duplicated KineticHeading calls
  const matches = content.match(/<KineticHeading/g)
  assert.strictEqual(
    matches?.length,
    1,
    "vexoo-dashboard must render exactly one KineticHeading element"
  )

  // Baseline Vexoo card opacity (8% normal, 2% hover, 10px blur)
  assert.ok(
    content.includes("bg-card/8") || content.includes("bg-card/[0.08]"),
    "vexoo-dashboard cards must use Vexoo baseline opacity 0.08 (bg-card/8)"
  )
  assert.ok(
    content.includes("hover:bg-card/2") ||
      content.includes("hover:bg-card/[0.02]"),
    "vexoo-dashboard cards must use Vexoo baseline hover opacity 0.02 (hover:bg-card/2)"
  )
  assert.ok(
    content.includes("backdrop-blur-[10px]"),
    "vexoo-dashboard cards must use Vexoo baseline blur 10 (backdrop-blur-[10px])"
  )

  // GradientMotionBackground container in dashboard cards must be transparent to avoid solid/bright layer
  assert.ok(
    content.includes("dark:bg-transparent"),
    "GradientMotionBackground inside dashboard cards must override dark background to transparent"
  )

  // Must not have bright custom palettes or aggressive alpha overrides
  assert.ok(
    !content.includes("DASHBOARD_AMBIENT_PALETTE"),
    "vexoo-dashboard must not use artificial DASHBOARD_AMBIENT_PALETTE"
  )
  assert.ok(
    !content.includes("dark:bg-[rgba(18,20,24,0.20)]"),
    "vexoo-dashboard cards must not override dark background to bright alpha 0.20"
  )
})
