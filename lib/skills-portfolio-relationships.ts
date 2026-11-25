// Curated from the technologies explicitly attributed in Portfolio project details.
// Keys are public references. Learning and general workflow evidence stays out of this registry.
export const PUBLIC_PROJECT_TECHNOLOGIES = {
  "hiblow-fleet": [
    "typescript",
    "react",
    "nextjs",
    "shadcn",
    "tailwind",
    "tanstack-table",
    "recharts",
    "vitest",
    "zod",
  ],
  "is-ware": [
    "typescript",
    "react",
    "nextjs",
    "radix",
    "shadcn",
    "tailwind",
    "tanstack-query",
    "zustand",
    "react-hook-form",
    "tanstack-table",
    "zod",
  ],
  alisa: [
    "react",
    "ant-design",
    "tailwind",
    "tanstack-query",
    "zustand",
    "vite",
  ],
  wbs: [
    "typescript",
    "react",
    "nextjs",
    "shadcn",
    "tailwind",
    "tanstack-query",
    "zustand",
    "react-hook-form",
    "tanstack-table",
    "recharts",
    "zod",
  ],
  monara: [
    "typescript",
    "react",
    "nextjs",
    "radix",
    "shadcn",
    "tailwind",
    "tanstack-query",
    "zustand",
    "react-hook-form",
    "tanstack-table",
    "recharts",
    "zod",
  ],
  "info-tender": [
    "typescript",
    "react",
    "radix",
    "shadcn",
    "tailwind",
    "tanstack-query",
    "zustand",
    "react-hook-form",
    "tanstack-table",
    "recharts",
    "zod",
    "vite",
  ],
  imaps: ["typescript", "ng-zorro", "tailwind", "angular", "rxjs"],
  "enterprise-web-maintenance-operations": [
    "typescript",
    "tailwind",
    "vue",
    "nuxt",
    "nodejs",
  ],
  "pis-mars": ["tailwind", "blazor"],
  "caterine-cm": ["typescript", "tailwind", "vue", "vite"],
  cart: ["typescript", "tailwind", "vue", "nuxt"],
  "bulk-orders": [
    "typescript",
    "react",
    "nextjs",
    "base-ui",
    "shadcn",
    "tailwind",
    "tanstack-query",
    "zustand",
    "react-hook-form",
    "tanstack-table",
    "recharts",
    "zod",
  ],
  netmonk: ["react", "tailwind", "redux", "jwt", "nodejs"],
} as const

export type PublicProjectRef = keyof typeof PUBLIC_PROJECT_TECHNOLOGIES
export type ProjectTechnologyId =
  (typeof PUBLIC_PROJECT_TECHNOLOGIES)[PublicProjectRef][number]

export function isPublicProjectRef(ref: string): ref is PublicProjectRef {
  return Object.hasOwn(PUBLIC_PROJECT_TECHNOLOGIES, ref)
}

export function getTechnologiesForProject(
  ref: string
): readonly ProjectTechnologyId[] {
  return isPublicProjectRef(ref) ? PUBLIC_PROJECT_TECHNOLOGIES[ref] : []
}

export function getProjectsForTechnology(techId: string): PublicProjectRef[] {
  const refs = Object.keys(PUBLIC_PROJECT_TECHNOLOGIES).filter(
    isPublicProjectRef
  )
  return refs.filter((ref) =>
    getTechnologiesForProject(ref).some((id) => id === techId)
  )
}
