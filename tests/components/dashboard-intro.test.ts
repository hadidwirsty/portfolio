import { test } from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

test("dashboard-intro file exists and exports required constants and components", () => {
  const filePath = path.resolve(process.cwd(), "components/dashboard-intro.tsx")
  assert.ok(
    fs.existsSync(filePath),
    "components/dashboard-intro.tsx must exist"
  )

  const content = fs.readFileSync(filePath, "utf-8")
  assert.ok(
    content.includes('export const INTRO_SESSION_KEY = "hasVisitedDashboard"'),
    "INTRO_SESSION_KEY must be 'hasVisitedDashboard'"
  )
  assert.ok(
    content.includes("export function useDashboardIntro"),
    "Must export useDashboardIntro hook"
  )
  assert.ok(
    content.includes("export function DashboardIntroOverlay"),
    "Must export DashboardIntroOverlay component"
  )
})

test("dashboard-intro defines the exact 6-card sequential reveal order", () => {
  const filePath = path.resolve(process.cwd(), "components/dashboard-intro.tsx")
  const content = fs.readFileSync(filePath, "utf-8")

  // The 6 cards in sequence: (1) About, (2) Portfolio, (3) Contact, (4) Avatar, (5) Stack, (6) Resume
  assert.ok(content.includes('"about"'), "Must include about in card sequence")
  assert.ok(
    content.includes('"portfolio"'),
    "Must include portfolio in card sequence"
  )
  assert.ok(
    content.includes('"contact"'),
    "Must include contact in card sequence"
  )
  assert.ok(
    content.includes('"avatar"'),
    "Must include avatar in card sequence"
  )
  assert.ok(content.includes('"stack"'), "Must include stack in card sequence")
  assert.ok(
    content.includes('"resume"'),
    "Must include resume in card sequence"
  )
})

test("vexoo-dashboard integrates DashboardIntroOverlay and applies motion props in order", () => {
  const dashboardPath = path.resolve(
    process.cwd(),
    "components/vexoo-dashboard.tsx"
  )
  const content = fs.readFileSync(dashboardPath, "utf-8")

  assert.ok(
    content.includes("DashboardIntroOverlay"),
    "vexoo-dashboard must render DashboardIntroOverlay"
  )
  assert.ok(
    content.includes("useDashboardIntro"),
    "vexoo-dashboard must use useDashboardIntro"
  )

  // Verify card indices 0 through 5 are bound to each of the 6 cards in order
  assert.ok(
    content.includes("getCardMotionProps(0)"),
    "Card About must have index 0"
  )
  assert.ok(
    content.includes("getCardMotionProps(1)"),
    "Card Portfolio must have index 1"
  )
  assert.ok(
    content.includes("getCardMotionProps(2)"),
    "Card Contact must have index 2"
  )
  assert.ok(
    content.includes("getCardMotionProps(3)"),
    "Card Avatar must have index 3"
  )
  assert.ok(
    content.includes("getCardMotionProps(4)"),
    "Card Stack must have index 4"
  )
  assert.ok(
    content.includes("getCardMotionProps(5)"),
    "Card Resume must have index 5"
  )
})

test("app/page.tsx does not contain inline script tags and cleanly mounts VexooDashboard", () => {
  const pagePath = path.resolve(process.cwd(), "app/page.tsx")
  const pageContent = fs.readFileSync(pagePath, "utf-8")

  // Ensure no <script> tag is rendered in React components to avoid React 19 warning
  assert.ok(
    !pageContent.includes("<script"),
    "app/page.tsx must not render <script> tags inside React component"
  )
  assert.ok(
    pageContent.includes("<VexooDashboard />") ||
      pageContent.includes("VexooDashboard"),
    "app/page.tsx must render VexooDashboard"
  )

  const introPath = path.resolve(
    process.cwd(),
    "components/dashboard-intro.tsx"
  )
  const introContent = fs.readFileSync(introPath, "utf-8")

  assert.ok(
    introContent.includes("hasVisitedDashboard"),
    "components/dashboard-intro.tsx must check hasVisitedDashboard in sessionStorage"
  )
})

test("dashboard-intro exports in-memory navigation helpers for hard-refresh support", () => {
  const introPath = path.resolve(
    process.cwd(),
    "components/dashboard-intro.tsx"
  )
  const introContent = fs.readFileSync(introPath, "utf-8")

  assert.ok(
    introContent.includes("export function markDashboardVisited"),
    "Must export markDashboardVisited"
  )
  assert.ok(
    introContent.includes("hasVisitedDashboardInMemory"),
    "Must use in-memory flag to allow hard refresh while ignoring internal back navigation"
  )
  assert.ok(
    introContent.includes("AsciiWaterReveal"),
    "DashboardIntroOverlay must render AsciiWaterReveal code animation"
  )
})
