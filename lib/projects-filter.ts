import type { Bi, ProjectEntry } from "./cv-data.ts"

export type ProjectCategory = "all" | "enterprise" | "fullstack"

export interface CategoryDefinition {
  id: ProjectCategory
  label: Bi
  description: Bi
}

export const ENTERPRISE_PROJECT_IDS = new Set([
  "imaps",
  "cart",
  "info-tender",
  "monara",
  "alisa",
  "is-ware",
  "caterine-cm",
  "wbs",
  "pis-mars",
  "cis",
])

export const FULLSTACK_PROJECT_IDS = new Set([
  "hiblow-fleet",
  "bulk-orders",
  "netmonk",
])

export const projectCategories: readonly CategoryDefinition[] = [
  {
    id: "all",
    label: { id: "Semua Proyek", en: "All Projects" },
    description: {
      id: "Seluruh portofolio proyek enterprise dan aplikasi mandiri",
      en: "Complete portfolio of enterprise and standalone web applications",
    },
  },
  {
    id: "enterprise",
    label: { id: "Enterprise & B2B", en: "Enterprise & B2B" },
    description: {
      id: "Aplikasi web skala korporat di PT Sigma Cipta Caraka (Telkomsigma)",
      en: "Corporate-scale web applications developed at PT Sigma Cipta Caraka",
    },
  },
  {
    id: "fullstack",
    label: { id: "Full-Stack & Produk", en: "Full-Stack & Products" },
    description: {
      id: "Solusi web end-to-end, e-commerce, dan purwarupa data analitik",
      en: "End-to-end web solutions, e-commerce, and analytics prototypes",
    },
  },
] as const

/**
 * Classifies a project into its respective category ('enterprise' or 'fullstack').
 */
export function getProjectCategory(
  projectId: string
): "enterprise" | "fullstack" {
  if (FULLSTACK_PROJECT_IDS.has(projectId)) {
    return "fullstack"
  }
  return "enterprise"
}

/**
 * Filters an array of projects according to the specified category filter.
 */
export function filterProjects(
  projects: readonly ProjectEntry[],
  category: ProjectCategory
): ProjectEntry[] {
  if (category === "all") {
    return [...projects]
  }
  return projects.filter((p) => getProjectCategory(p.id) === category)
}

/**
 * Calculates project counts per category.
 */
export function getProjectCounts(
  projects: readonly ProjectEntry[]
): Record<ProjectCategory, number> {
  const counts: Record<ProjectCategory, number> = {
    all: projects.length,
    enterprise: 0,
    fullstack: 0,
  }

  for (const project of projects) {
    const cat = getProjectCategory(project.id)
    counts[cat]++
  }

  return counts
}
