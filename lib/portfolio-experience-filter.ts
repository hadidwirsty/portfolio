// Explicit .ts extensions required for standalone Node.js test runner (--experimental-strip-types)
import { projects, type ProjectEntry, type Bi } from "./cv-data.ts"
import { getProjectTimelineItemById } from "./portfolio-project-timeline-data.ts"

// ---------------------------------------------------------------------------
// 1. Types & Filter Category Keys
// ---------------------------------------------------------------------------

export type ExperienceFilterCategory =
  | "featured"
  | "all"
  | "telkom-indonesia"
  | "telkomsigma"
  | "tumbuhin-digital"
  | "personal"

export type WorkExperienceAffiliation = Exclude<
  ExperienceFilterCategory,
  "featured" | "all"
>

export interface ExperienceFilterDef {
  id: ExperienceFilterCategory
  label: Bi
  badgeLabel?: Bi
}

// ---------------------------------------------------------------------------
// 2. Explicit Project Affiliation Mapping (Every project maps to exactly 1)
// ---------------------------------------------------------------------------

export const PROJECT_WORK_AFFILIATION: Record<
  string,
  WorkExperienceAffiliation
> = {
  // Telkom Indonesia (Internship / Magang)
  netmonk: "telkom-indonesia",

  // Telkomsigma (Professional / Profesional)
  imaps: "telkomsigma",
  cart: "telkomsigma",
  monara: "telkomsigma",
  alisa: "telkomsigma",
  "info-tender": "telkomsigma",
  "is-ware": "telkomsigma",
  "caterine-cm": "telkomsigma",
  wbs: "telkomsigma",
  cis: "telkomsigma",
  "pis-mars": "telkomsigma",

  // Tumbuhin Digital (Professional / Profesional)
  "bulk-orders": "tumbuhin-digital",

  // Personal Projects (Proyek Pribadi)
  "hiblow-fleet": "personal",
}

// ---------------------------------------------------------------------------
// 3. Featured Projects Definition (Strict 6 Curated Projects)
// ---------------------------------------------------------------------------

export const FEATURED_PROJECT_IDS = [
  "hiblow-fleet",
  "is-ware",
  "alisa",
  "wbs",
  "info-tender",
  "imaps",
] as const

export const ADDITIONAL_PROJECT_IDS = [
  "monara",
  "cart",
  "caterine-cm",
  "pis-mars",
  "cis",
  "bulk-orders",
  "netmonk",
] as const

// ---------------------------------------------------------------------------
// 4. Filter Definitions with Bilingual Labels
// ---------------------------------------------------------------------------

export const EXPERIENCE_FILTER_DEFS: readonly ExperienceFilterDef[] = [
  {
    id: "featured",
    label: { id: "Unggulan", en: "Featured" },
    badgeLabel: { id: "Proyek Unggulan", en: "Featured Works" },
  },
  {
    id: "all",
    label: { id: "Semua Proyek", en: "All Projects" },
    badgeLabel: { id: "Semua Proyek", en: "All Projects" },
  },
  {
    id: "telkom-indonesia",
    label: { id: "Telkom Indonesia", en: "Telkom Indonesia" },
    badgeLabel: {
      id: "Magang Telkom Indonesia",
      en: "Telkom Indonesia Internship",
    },
  },
  {
    id: "telkomsigma",
    label: { id: "Telkomsigma", en: "Telkomsigma" },
    badgeLabel: {
      id: "Profesional Telkomsigma",
      en: "Telkomsigma Professional",
    },
  },
  {
    id: "tumbuhin-digital",
    label: { id: "Tumbuhin Digital", en: "Tumbuhin Digital" },
    badgeLabel: {
      id: "Profesional Tumbuhin Digital",
      en: "Tumbuhin Digital Professional",
    },
  },
  {
    id: "personal",
    label: { id: "Proyek Pribadi", en: "Personal Projects" },
    badgeLabel: { id: "Proyek Pribadi", en: "Personal Projects" },
  },
] as const

// ---------------------------------------------------------------------------
// 5. Sorting & Filtering Logic
// ---------------------------------------------------------------------------

/**
 * Sorts projects chronologically by startMonth descending (newest first).
 * Uses deterministic tie-breaking when two projects share the same startMonth:
 * 1. endMonth DESC
 * 2. project id ASC (lexicographical stable tie-break)
 */
export function sortProjectsNewestFirst(items: ProjectEntry[]): ProjectEntry[] {
  return [...items].sort((a, b) => {
    const metaA = getProjectTimelineItemById(a.id)
    const metaB = getProjectTimelineItemById(b.id)
    const startA = metaA?.startMonth ?? ""
    const startB = metaB?.startMonth ?? ""

    // 1. Primary sort: startMonth DESC (newest first)
    if (startA !== startB) {
      return startB.localeCompare(startA)
    }

    // 2. Deterministic secondary tie-break: endMonth DESC
    const endA = metaA?.endMonth ?? ""
    const endB = metaB?.endMonth ?? ""
    if (endA !== endB) {
      return endB.localeCompare(endA)
    }

    // 3. Deterministic tertiary tie-break: project id ASC
    return a.id.localeCompare(b.id)
  })
}

/**
 * Filters and sorts projects based on the active work experience category.
 * - 'featured': Strictly returns the 6 curated featured projects in their predefined order.
 * - 'all': Returns all 13 verified projects sorted newest first.
 * - Company categories: Returns all projects affiliated with the company, sorted newest first.
 */
export function getFilteredProjects(
  category: ExperienceFilterCategory
): ProjectEntry[] {
  if (category === "featured") {
    return FEATURED_PROJECT_IDS.map((id) =>
      projects.find((p) => p.id === id)
    ).filter((p): p is ProjectEntry => Boolean(p))
  }

  if (category === "all") {
    return sortProjectsNewestFirst(projects)
  }

  const matches = projects.filter(
    (p) => PROJECT_WORK_AFFILIATION[p.id] === category
  )
  return sortProjectsNewestFirst(matches)
}

/**
 * Dynamically counts the number of projects under each experience category.
 */
export function getExperienceCategoryCounts(): Record<
  ExperienceFilterCategory,
  number
> {
  const counts: Record<ExperienceFilterCategory, number> = {
    featured: FEATURED_PROJECT_IDS.length,
    all: projects.length,
    "telkom-indonesia": 0,
    telkomsigma: 0,
    "tumbuhin-digital": 0,
    personal: 0,
  }

  for (const project of projects) {
    const affiliation = PROJECT_WORK_AFFILIATION[project.id]
    if (affiliation) {
      counts[affiliation]++
    }
  }

  return counts
}
