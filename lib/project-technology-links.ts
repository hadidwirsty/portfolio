import { publicTechStack } from "./public-tech-stack.ts"
import {
  getTechnologiesForProject,
  type ProjectTechnologyId,
  type PublicProjectRef,
} from "./skills-portfolio-relationships.ts"

type TechnologyLinkPart = { text: string; techId?: string }

const canonicalIds = new Map(
  publicTechStack.toolkit.categories.flatMap(({ techs }) =>
    techs.map(({ name, id }) => [name, id] as const)
  )
)

const labelAliases = new Map<string, ProjectTechnologyId>([
  ["Ant Design 5", "ant-design"],
  ["Tailwind CSS v4", "tailwind"],
  ["Next.js (App Router)", "nextjs"],
  ["Next.js 16 (App Router)", "nextjs"],
  ["React 18", "react"],
  ["React 19", "react"],
  ["React 19 (RSC, Server Actions)", "react"],
  ["Vue 3 (Composition API)", "vue"],
  ["Node 22 SSR", "nodejs"],
  ["Redux Toolkit", "redux"],
  ["JSON Web Token (JWT)", "jwt"],
  ["TanStack Query v5", "tanstack-query"],
])

export function getProjectTechnologyLinks(
  ref: PublicProjectRef,
  labels: readonly string[]
) {
  const techIds = new Set<string>(getTechnologiesForProject(ref))
  const linkedPart = (text: string, techId?: string): TechnologyLinkPart =>
    techId && techIds.has(techId) ? { text, techId } : { text }

  const entries = labels.map((label) => {
    const parts: TechnologyLinkPart[] =
      label === "shadcn/ui (@base-ui/react)"
        ? [
            linkedPart("shadcn/ui", "shadcn"),
            { text: " (" },
            linkedPart("@base-ui/react", "base-ui"),
            { text: ")" },
          ]
        : [
            linkedPart(
              label,
              labelAliases.get(label) ?? canonicalIds.get(label)
            ),
          ]
    return [label, parts] as const
  })

  return Object.fromEntries(
    entries.filter(([, parts]) => parts.some(({ techId }) => techId))
  )
}
