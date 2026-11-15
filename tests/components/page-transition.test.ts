import { test } from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

test("page-transition component file exists and exports PageTransition and usePageTransition", () => {
  const filePath = path.resolve(process.cwd(), "components/page-transition.tsx")
  assert.ok(
    fs.existsSync(filePath),
    "components/page-transition.tsx must exist"
  )

  const content = fs.readFileSync(filePath, "utf-8")
  assert.ok(
    content.includes("export function PageTransition"),
    "Must export PageTransition component"
  )
  assert.ok(
    content.includes("export function usePageTransition"),
    "Must export usePageTransition hook"
  )
})

test("page-transition implements comprehensive internal link interception guards", () => {
  const filePath = path.resolve(process.cwd(), "components/page-transition.tsx")
  const content = fs.readFileSync(filePath, "utf-8")

  // Must guard against modifier keys (open new tab/window)
  assert.ok(
    content.includes("e.metaKey || e.ctrlKey || e.shiftKey || e.altKey"),
    "Must ignore modified clicks"
  )

  // Must guard against downloads (e.g. CV PDF)
  assert.ok(
    content.includes('anchor.hasAttribute("download")'),
    "Must ignore download links"
  )

  // Must guard against external targets
  assert.ok(
    content.includes('anchor.target !== "_self"'),
    "Must ignore target _blank or external targets"
  )

  // Must guard against non-HTTP/internal schemes
  assert.ok(
    content.includes('href.startsWith("#")'),
    "Must ignore hash anchors"
  )
  assert.ok(
    content.includes('href.startsWith("mailto:")'),
    "Must ignore mailto links"
  )

  // Must check same origin
  assert.ok(
    content.includes("url.origin !== window.location.origin"),
    "Must ignore external domains"
  )

  // Must support prefers-reduced-motion bypass
  assert.ok(
    content.includes("shouldReduceMotion"),
    "Must support prefers-reduced-motion bypass"
  )

  // Must include safety timeout
  assert.ok(
    content.includes("SAFETY_TIMEOUT_MS") || content.includes("1400"),
    "Must include safety timeout to prevent getting stuck"
  )
})

test("app/layout.tsx integrates PageTransition provider component", () => {
  const layoutPath = path.resolve(process.cwd(), "app/layout.tsx")
  const layoutContent = fs.readFileSync(layoutPath, "utf-8")

  assert.ok(
    layoutContent.includes(
      'import { PageTransition } from "@/components/page-transition"'
    ),
    "app/layout.tsx must import PageTransition"
  )
  assert.ok(
    layoutContent.includes("<PageTransition />"),
    "app/layout.tsx must render <PageTransition />"
  )
})

test("page-transition uses theme background and omits center dot element", () => {
  const filePath = path.resolve(process.cwd(), "components/page-transition.tsx")
  const content = fs.readFileSync(filePath, "utf-8")

  // Must use theme background matching the active site theme
  assert.ok(
    content.includes("bg-background"),
    "Curtain wipe must use bg-background matching theme"
  )

  // Must omit the center dot element
  assert.ok(
    !content.includes("rounded-full bg-white/40 shadow-"),
    "Curtain wipe must not contain center dot element"
  )

  // Must integrate AsciiWaterReveal for the code animation on cursor movement
  assert.ok(
    content.includes("AsciiWaterReveal"),
    "Curtain wipe must render AsciiWaterReveal code animation"
  )
})
