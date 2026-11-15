import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

const SHELL_PATH = path.resolve(
  process.cwd(),
  "components/vexoo-subpage-shell.tsx"
)

test("vexoo-subpage-shell component file exists and exports VexooSubpageShell", () => {
  assert.ok(
    fs.existsSync(SHELL_PATH),
    "components/vexoo-subpage-shell.tsx must exist"
  )
  const source = fs.readFileSync(SHELL_PATH, "utf-8")

  assert.match(
    source,
    /export (function VexooSubpageShell|const VexooSubpageShell)/,
    "vexoo-subpage-shell.tsx must export VexooSubpageShell"
  )
  assert.match(
    source,
    /use client/,
    "vexoo-subpage-shell.tsx must be a client component"
  )
})

test("vexoo-subpage-shell renders top section with min-h-dvh and flex column", () => {
  const source = fs.readFileSync(SHELL_PATH, "utf-8")

  assert.match(
    source,
    /min-h-dvh/,
    "vexoo-subpage-shell.tsx top section must include min-h-dvh"
  )
  assert.match(
    source,
    /flex-col/,
    "vexoo-subpage-shell.tsx top section must include flex-col"
  )
})

test("vexoo-subpage-shell renders footer slot full-bleed outside padded section", () => {
  const source = fs.readFileSync(SHELL_PATH, "utf-8")

  assert.match(
    source,
    /\{footer\}/,
    "vexoo-subpage-shell.tsx must render {footer} slot"
  )
})
