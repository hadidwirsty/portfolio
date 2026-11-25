import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"

import { publicSelectedWorks } from "../../lib/public-portfolio-data.ts"
import { getProjectTechnologyLinks } from "../../lib/project-technology-links.ts"
import { publicSkillsInPractice } from "../../lib/skills-in-practice-data.ts"
import {
  getProjectFragment,
  getProjectTargetFilter,
  getSkillFragment,
  readProjectFragment,
  readSkillFragment,
  rememberSkillForProjectReturn,
  takeSkillForProjectReturn,
} from "../../lib/skills-portfolio-navigation.ts"
import {
  getProjectsForTechnology,
  getTechnologiesForProject,
} from "../../lib/skills-portfolio-relationships.ts"

const skills = publicSkillsInPractice.flatMap(({ skills }) => skills)
const skillIds = new Set(skills.map(({ id }) => id))
const p08 = "enterprise-web-maintenance-operations"

test("the picker projects all 98 public relations in Selected Works order", () => {
  const all = publicSelectedWorks.filters.find(({ id }) => id === "all")
  assert.ok(all)
  assert.equal(publicSkillsInPractice.length, 6)
  assert.equal(skillIds.size, 25)
  assert.equal(skills.flatMap(({ projects }) => projects).length, 98)
  for (const skill of skills) {
    const related = new Set(getProjectsForTechnology(skill.id))
    assert.deepEqual(
      skill.projects.map(({ ref }) => ref),
      all.projectRefs.filter((ref) => related.has(ref))
    )
    assert.ok(
      skill.projects.every(({ ref, name }) => {
        return name === publicSelectedWorks.projectsByRef[ref].name
      })
    )
  }
  assert.deepEqual(
    skills.find(({ id }) => id === "rxjs")?.projects.map(({ ref }) => ref),
    ["imaps"]
  )
  assert.equal(skills.find(({ id }) => id === "tailwind")?.projects.length, 13)
  assert.ok(!skillIds.has("aws"))
})

test("only public project fragments and attributed technology fragments resolve", () => {
  assert.equal(getProjectFragment("imaps"), "#project-imaps")
  const { projectsByRef } = publicSelectedWorks
  assert.equal(readProjectFragment(getProjectFragment(p08), projectsByRef), p08)
  assert.equal(readProjectFragment(getProjectFragment(p08), {}), null)
  assert.equal(getSkillFragment("rxjs"), "#skill-rxjs")
  assert.equal(readSkillFragment("#skill-rxjs", skillIds), "rxjs")
  for (const invalid of [
    "",
    "#toolkit",
    "#skill-aws",
    "#skill-%",
    "#skill-unknown",
    "#project-__proto__",
  ]) {
    assert.equal(readSkillFragment(invalid, skillIds), null)
    assert.equal(readProjectFragment(invalid, projectsByRef), null)
  }
})

test("a project target retains a filter when visible and otherwise falls back to All", () => {
  const { filters } = publicSelectedWorks
  assert.equal(getProjectTargetFilter(filters, "featured", "imaps"), "featured")
  assert.equal(getProjectTargetFilter(filters, "featured", p08), "all")
  assert.equal(
    getProjectTargetFilter(filters, "telkomsigma", p08),
    "telkomsigma"
  )
  assert.equal(getProjectTargetFilter(filters, "personal", "netmonk"), "all")
  assert.equal(getProjectTargetFilter([], "featured", p08), null)
})

test("a cached HiBlow Fleet hash followed by the MONARA hash resolves to MONARA", () => {
  const { projectsByRef, filters } = publicSelectedWorks
  const url = new URL(
    "/portfolio#project-hiblow-fleet#project-monara",
    "http://localhost:3000"
  )
  const ref = readProjectFragment(url.hash, projectsByRef)
  assert.equal(ref, "monara")
  assert.equal(getProjectFragment(ref), "#project-monara")
  assert.equal(getProjectTargetFilter(filters, "featured", ref), "all")
  assert.equal(
    readProjectFragment("#project-monara#project-hiblow-fleet", projectsByRef),
    "hiblow-fleet"
  )
  assert.equal(
    readProjectFragment("#project-monara#project-monara", projectsByRef),
    "monara"
  )
  for (const invalid of [
    "#project-hiblow-fleet#project-unknown",
    "#project-hiblow-fleet#project-",
    "#project-hiblow-fleet#selected-works",
    "#selected-works#project-monara",
  ]) {
    assert.equal(readProjectFragment(invalid, projectsByRef), null)
  }
})

test("a related project restores the skill only on its original Stack history entry", () => {
  const initialState = { routerState: "stack" }
  const history = {
    state: initialState,
    replaceState(state: typeof initialState) {
      this.state = state
    },
  }
  assert.equal(takeSkillForProjectReturn(history), null)

  rememberSkillForProjectReturn(history, "rxjs")
  const originalStackEntry = history.state
  assert.equal(originalStackEntry.routerState, "stack")
  history.state = { routerState: "a-new-stack-visit" }
  assert.equal(takeSkillForProjectReturn(history), null)

  history.state = originalStackEntry
  assert.equal(takeSkillForProjectReturn(history), "rxjs")
  assert.equal(takeSkillForProjectReturn(history), null)
})

test("badge links cover all registry pairs, preserving dossier text and order", () => {
  for (const project of Object.values(publicSelectedWorks.projectsByRef)) {
    const linkedIds = new Set(
      Object.values(project.technologyLinks).flatMap((parts) =>
        parts.flatMap(({ techId }) => (techId ? [techId] : []))
      )
    )
    assert.deepEqual(linkedIds, new Set(getTechnologiesForProject(project.ref)))
    for (const [label, parts] of Object.entries(project.technologyLinks)) {
      assert.ok(project.tech.includes(label))
      assert.equal(parts.map(({ text }) => text).join(""), label)
    }
  }
})

test("composite badges resolve two independent links and ambiguous or unrelated labels stay text", () => {
  const composite = "shadcn/ui (@base-ui/react)"
  assert.deepEqual(
    getProjectTechnologyLinks("bulk-orders", [composite])[composite],
    [
      { text: "shadcn/ui", techId: "shadcn" },
      { text: " (" },
      { text: "@base-ui/react", techId: "base-ui" },
      { text: ")" },
    ]
  )
  assert.deepEqual(
    Object.keys(
      getProjectTechnologyLinks("imaps", [
        "Ant Design 5",
        "Ant Design (NG-ZORRO)",
        "NG-ZORRO",
        "React 19",
        "REST API",
      ])
    ),
    ["NG-ZORRO"]
  )
  assert.deepEqual(
    getProjectTechnologyLinks("netmonk", ["Vite", "RTK Query", "PostgreSQL"]),
    {}
  )
})

test("contextual links retain Next Link history handling and destination focus ownership", () => {
  const read = (path: string) => readFileSync(path, "utf-8")
  const stack = read("components/stack/skills-in-practice.tsx")
  const dialog = read("components/project-detail-dialog.tsx")
  const transition = read("components/page-transition.tsx")
  assert.match(
    stack,
    /getProjectFragment\(ref\)[\s\S]*?scroll=\{false\}\s+data-skip-page-transition[\s\S]*?onNavigate=\{\(\) =>\s+rememberSkillForProjectReturn/
  )
  assert.match(
    dialog,
    /getSkillFragment\(techId\)[\s\S]*?scroll=\{false\}\s+data-skip-page-transition[\s\S]*?onNavigate=\{\(\) =>\s+replaceContextualFragment/
  )
  assert.match(
    transition,
    /if \(anchor\.hasAttribute\("data-skip-page-transition"\)\) return[\s\S]*?e\.preventDefault\(\)/
  )
})
