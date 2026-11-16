import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

const COMPONENT_PATH = path.resolve(
  process.cwd(),
  "components/portfolio/folder-bento-card.tsx"
)

test("folder-bento-card file exists and exports FolderBentoCard component", () => {
  assert.ok(
    fs.existsSync(COMPONENT_PATH),
    "components/portfolio/folder-bento-card.tsx must exist"
  )
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /export (function FolderBentoCard|const FolderBentoCard)/,
    "folder-bento-card.tsx must export FolderBentoCard"
  )
})

test("folder-bento-card renders physical folder tab with tab index and category", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /TAB \/\//,
    "folder-bento-card must render TAB // format"
  )
  assert.match(
    source,
    /rounded-t/,
    "folder-bento-card must have rounded top tab styling"
  )
})

test("folder-bento-card includes technical blueprint cover without fake bitmaps", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Ensure no fake project screenshot image references
  assert.doesNotMatch(
    source,
    /<Image[\s\S]*?src=["']\/(images|screenshots)\/project/,
    "must not use fake project screenshot bitmaps"
  )

  // Must include SVG/CSS blueprint decorative elements
  assert.match(
    source,
    /(svg|pattern|grid|blueprint|REF \/\/)/i,
    "must include technical blueprint styling or reference ID"
  )
})

test("folder-bento-card implements sheet lift with spring motion and reduced motion support", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  assert.match(
    source,
    /useReducedMotion/,
    "folder-bento-card must use useReducedMotion"
  )
  assert.match(
    source,
    /motion\.(div|article)/,
    "folder-bento-card must use framer-motion"
  )
  assert.match(
    source,
    /translateY|y:/,
    "folder-bento-card must implement vertical sheet lift"
  )
})

test("folder-bento-card renders accessible CTA button without invalid nested buttons", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")

  // Must have CTA button
  assert.match(
    source,
    /(Lihat Detail|View Details|ui\.viewProject)/,
    "must render view details CTA label"
  )
  assert.match(source, /ArrowUpRight/, "must render ArrowUpRight icon")

  // Must not trigger modal on pointerDown to protect touch scrolling
  assert.doesNotMatch(
    source,
    /onPointerDown=\{.*?onSelect/,
    "must not trigger onSelect on pointerDown"
  )
})
