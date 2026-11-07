import test from "node:test"
import assert from "node:assert"
import { findActiveSection } from "../../hooks/use-scroll-spy.ts"

test("findActiveSection returns first section at top of page", () => {
  const sections = [
    { id: "about", offsetTop: 0 },
    { id: "experience", offsetTop: 600 },
    { id: "projects", offsetTop: 1200 },
  ]
  const active = findActiveSection(sections, 50, 100)
  assert.strictEqual(active, "about")
})

test("findActiveSection switches to next section when scrolled past threshold", () => {
  const sections = [
    { id: "about", offsetTop: 0 },
    { id: "experience", offsetTop: 600 },
    { id: "projects", offsetTop: 1200 },
  ]
  const active = findActiveSection(sections, 650, 100)
  assert.strictEqual(active, "experience")
})

test("findActiveSection returns last section when scrolled far down", () => {
  const sections = [
    { id: "about", offsetTop: 0 },
    { id: "experience", offsetTop: 600 },
    { id: "projects", offsetTop: 1200 },
  ]
  const active = findActiveSection(sections, 1300, 100)
  assert.strictEqual(active, "projects")
})

test("findActiveSection handles empty sections list gracefully", () => {
  const active = findActiveSection([], 100, 100)
  assert.strictEqual(active, "")
})
