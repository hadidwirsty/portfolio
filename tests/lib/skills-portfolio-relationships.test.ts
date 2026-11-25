import assert from "node:assert/strict"
import { readdirSync, readFileSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import { test } from "node:test"
import ts from "typescript"

import { projects } from "../../lib/cv-professional-data.ts"
import { getFilteredProjects } from "../../lib/portfolio-experience-filter.ts"
import { projectTimelineItems } from "../../lib/portfolio-project-timeline-data.ts"
import {
  publicProjectTimelineItems,
  publicSelectedWorks,
} from "../../lib/public-portfolio-data.ts"
import { publicTechStack } from "../../lib/public-tech-stack.ts"
import {
  getProjectsForTechnology,
  getTechnologiesForProject,
  isPublicProjectRef,
  PUBLIC_PROJECT_TECHNOLOGIES,
} from "../../lib/skills-portfolio-relationships.ts"
import { CORE_STACK, TECH_CATEGORIES } from "../../lib/tech-stack-data.ts"

const technologies = TECH_CATEGORIES.flatMap(({ techs }) => techs)
const technologyIds = new Set(technologies.map(({ id }) => id))
const technologyIdByName = new Map(
  technologies.map(({ name, id }) => [name, id])
)
const publicRefs = projects.map(({ id, publicRef = id }) => publicRef)

// These aliases validate the curated registry against the accepted dossier labels.
// They are intentionally kept out of the runtime lookup.
const labelAliases: Record<string, readonly string[]> = {
  "Ant Design 5": ["ant-design"],
  "Tailwind CSS v4": ["tailwind"],
  "Next.js (App Router)": ["nextjs"],
  "Next.js 16 (App Router)": ["nextjs"],
  "React 18": ["react"],
  "React 19": ["react"],
  "React 19 (RSC, Server Actions)": ["react"],
  "Vue 3 (Composition API)": ["vue"],
  "Node 22 SSR": ["nodejs"],
  "Redux Toolkit": ["redux"],
  "JSON Web Token (JWT)": ["jwt"],
  "TanStack Query v5": ["tanstack-query"],
  "shadcn/ui (@base-ui/react)": ["shadcn", "base-ui"],
}

test("public registry covers the approved explicit project evidence without orphan or duplicate references", () => {
  assert.equal(projects.length, 13)
  assert.equal(new Set(publicRefs).size, 13)
  assert.deepEqual(
    new Set(Object.keys(PUBLIC_PROJECT_TECHNOLOGIES)),
    new Set(publicRefs)
  )

  let relationships = 0
  for (const project of projects) {
    const ref = project.publicRef ?? project.id
    const actual = getTechnologiesForProject(ref)
    const expected = new Set(
      project.tech.flatMap((label) => {
        const exact = technologyIdByName.get(label)
        return labelAliases[label] ?? (exact ? [exact] : [])
      })
    )
    assert.equal(actual.length, new Set(actual).size, ref)
    assert.ok(
      actual.every((id) => technologyIds.has(id)),
      ref
    )
    assert.deepEqual(new Set(actual), expected, ref)
    relationships += actual.length
  }
  assert.equal(relationships, 98)
})

test("selectors return the same relationships in either direction and handle unsupported inputs", () => {
  const attributed = technologies.filter(({ id }) => {
    const expected = publicRefs.filter((ref) =>
      getTechnologiesForProject(ref).some((techId) => techId === id)
    )
    assert.deepEqual(getProjectsForTechnology(id), expected, id)
    return expected.length > 0
  })
  assert.equal(attributed.length, 25)
  assert.equal(technologies.length - attributed.length, 11)
  assert.deepEqual(getProjectsForTechnology("rxjs"), ["imaps"])
  assert.deepEqual(getProjectsForTechnology("ant-design"), ["alisa"])
  assert.deepEqual(getProjectsForTechnology("vitest"), ["hiblow-fleet"])
  assert.deepEqual(getProjectsForTechnology("aws"), [])
  assert.ok(!getTechnologiesForProject("netmonk").some((id) => id === "vite"))

  for (const value of ["", "__proto__", "constructor", "unknown"]) {
    assert.equal(isPublicProjectRef(value), false)
    assert.deepEqual(getTechnologiesForProject(value), [])
    assert.deepEqual(getProjectsForTechnology(value), [])
  }
})

test("Stack projection keeps the approved display fields and omits evidence metadata", () => {
  assert.deepEqual(
    publicTechStack.hero.coreStack,
    CORE_STACK.map(({ name, icon }) => ({ name, icon }))
  )
  assert.deepEqual(
    publicTechStack.toolkit.categories,
    TECH_CATEGORIES.map(({ id, index, title, description, techs }) => ({
      id,
      index,
      title,
      description,
      techs: techs.map(({ id, name }) => ({ id, name })),
    }))
  )
  assert.ok(!JSON.stringify(publicTechStack).includes('"verifiedIn"'))
})

test("Portfolio projection retains filters, sort order and display data using public references", () => {
  const refById = new Map(projects.map((p) => [p.id, p.publicRef ?? p.id]))
  assert.deepEqual(
    publicProjectTimelineItems.map(({ ref }) => ref),
    projectTimelineItems.map(({ id }) => refById.get(id))
  )
  assert.deepEqual(
    publicProjectTimelineItems.map(({ techStack }) => techStack),
    projectTimelineItems.map(({ techStack }) => techStack)
  )
  for (const { id, projectRefs } of publicSelectedWorks.filters) {
    assert.deepEqual(
      projectRefs,
      getFilteredProjects(id).map((p) => refById.get(p.id))
    )
    assert.ok(
      projectRefs.every((ref) =>
        Object.hasOwn(publicSelectedWorks.projectsByRef, ref)
      )
    )
  }
  for (const p of projects) {
    const ref = p.publicRef ?? p.id
    const card = publicSelectedWorks.projectsByRef[ref]
    assert.equal(card.ref, ref)
    assert.equal(card.name, p.name)
    assert.deepEqual(card.period, p.period)
    assert.deepEqual(card.company, p.company)
    const timelineCard = publicProjectTimelineItems.find(
      (item) => item.ref === ref
    )
    assert.ok(timelineCard)
    assert.deepEqual(timelineCard.shortDescription, p.shortDescription)
    assert.deepEqual(card.shortDescription, p.shortDescription)
    assert.deepEqual(card.description, p.description)
    for (const lang of ["id", "en"] as const) {
      assert.ok(card.shortDescription[lang].trim())
      assert.ok(
        card.shortDescription[lang].length < card.description[lang].length
      )
    }
    assert.deepEqual(card.role, p.role)
    assert.deepEqual(card.bullets, p.bullets)
    assert.deepEqual(card.tech, p.tech)
    assert.equal(card.link, p.link)
    assert.ok(!Object.hasOwn(card, "id"))
  }
})

test("P08 uses the approved public reference in the registry and both Portfolio projections", () => {
  const ref = "enterprise-web-maintenance-operations"
  const project = projects.find(({ publicRef }) => publicRef === ref)
  assert.ok(project)
  assert.ok(!isPublicProjectRef(project.id))
  assert.ok(!Object.hasOwn(publicSelectedWorks.projectsByRef, project.id))
  assert.equal(publicSelectedWorks.projectsByRef[ref].dossierCode, "P08")
  const timeline = publicProjectTimelineItems.find((item) => item.ref === ref)
  assert.ok(timeline)
  assert.equal(timeline.name, project.name)
  assert.ok(!Object.hasOwn(timeline, "projectEntryId"))
  assert.ok(!Object.hasOwn(timeline, "id"))
  assert.deepEqual(getTechnologiesForProject(ref), [
    "typescript",
    "tailwind",
    "vue",
    "nuxt",
    "nodejs",
  ])
})

test("active client components use projected props without importing raw evidence or Portfolio records", () => {
  const files = [
    "components/stack/tech-stack-hero.tsx",
    "components/stack/skills-in-practice.tsx",
    "components/stack/technology-folder-grid.tsx",
    "components/stack/technology-physical-folder.tsx",
    "components/stack/controlled-scatter.ts",
    "components/portfolio/folder-bento-card.tsx",
    "components/portfolio/portfolio-card-folder.tsx",
    "components/portfolio/project-timeline-accordion.tsx",
    "components/portfolio/timeline-ruler.tsx",
    "components/project-detail-dialog.tsx",
  ]
  for (const file of files) {
    const source = readFileSync(file, "utf-8")
    for (const statement of source.matchAll(
      /^import\s+(\{[^}]*\}|[^\n]+?)\s+from\s+["']([^"']+)["']/gm
    )) {
      if (statement[1].startsWith("type ")) continue
      assert.doesNotMatch(
        statement[2],
        /\/(?:tech-stack-data|public-tech-stack|cv-data|public-portfolio-data|portfolio-experience-filter|portfolio-project-timeline-data|projects-filter|skills-in-practice-data)$/,
        file
      )
    }
  }
})

test("no client entry can reach the raw professional data through runtime imports", () => {
  const root = process.cwd()
  const privateModule = resolve(root, "lib/cv-professional-data.ts")
  const options = {
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    baseUrl: root,
    paths: { "@/*": ["./*"] },
  }
  const visited = new Set<string>()

  function visit(file: string, chain: string[] = []) {
    const trail = [...chain, relative(root, file)]
    assert.notEqual(file, privateModule, trail.join(" → "))
    if (visited.has(file)) return
    visited.add(file)

    const source = ts.createSourceFile(
      file,
      readFileSync(file, "utf-8"),
      ts.ScriptTarget.Latest
    )
    function scan(node: ts.Node) {
      let specifier: ts.Expression | undefined
      if (ts.isImportDeclaration(node) && !node.importClause?.isTypeOnly) {
        const bindings = node.importClause?.namedBindings
        const typesOnly =
          !node.importClause?.name &&
          bindings &&
          ts.isNamedImports(bindings) &&
          bindings.elements.length > 0 &&
          bindings.elements.every(({ isTypeOnly }) => isTypeOnly)
        if (!typesOnly) specifier = node.moduleSpecifier
      } else if (ts.isExportDeclaration(node) && !node.isTypeOnly) {
        const clause = node.exportClause
        const typesOnly =
          clause &&
          ts.isNamedExports(clause) &&
          clause.elements.length > 0 &&
          clause.elements.every(({ isTypeOnly }) => isTypeOnly)
        if (!typesOnly) specifier = node.moduleSpecifier
      } else if (
        ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword
      ) {
        specifier = node.arguments[0]
      }
      if (
        specifier &&
        ts.isStringLiteral(specifier) &&
        /^(?:@\/|\.)/.test(specifier.text)
      ) {
        const dependency = ts.resolveModuleName(
          specifier.text,
          file,
          options,
          ts.sys
        ).resolvedModule
        if (dependency) visit(dependency.resolvedFileName, trail)
      }
      ts.forEachChild(node, scan)
    }
    scan(source)
  }

  for (const directory of ["app", "components", "hooks", "lib"]) {
    for (const entry of readdirSync(directory, {
      recursive: true,
      withFileTypes: true,
    })) {
      if (!entry.isFile() || !/\.tsx?$/.test(entry.name)) continue
      const file = resolve(join(entry.parentPath, entry.name))
      if (/^["']use client["']/m.test(readFileSync(file, "utf-8"))) visit(file)
    }
  }
})
