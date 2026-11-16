import { projects, type Bi } from "./cv-data.ts"
import { getProjectCategory, type ProjectCategory } from "./projects-filter.ts"

// ---------------------------------------------------------------------------
// 1. Data Types & Interfaces
// ---------------------------------------------------------------------------

export interface ProjectTimelineItem {
  id: string
  projectEntryId: string
  name: string
  period: Bi
  startMonth: string
  endMonth: string
  startYear: number
  endYear: number
  yearBadge: string
  company: Bi
  role: Bi
  category: ProjectCategory
  shortDescription: Bi
  techStack: string[]
  coverImage?: string
  imagePosition?: string
}

export interface TimelineYearMarker {
  year: number
  label: string
  month: string
  position: number
}

// ---------------------------------------------------------------------------
// 2. Timeline Constants
// ---------------------------------------------------------------------------

/**
 * The chronological project timeline starts with Netmonk Analytics in Jan 2023
 * and concludes with HiBlow Fleet in Oct 2026.
 * Total span: 46 months inclusive -> 45 discrete 1-month intervals.
 */
export const TIMELINE_START_MONTH = "2023-01" as const
export const TIMELINE_END_MONTH = "2026-10" as const
export const TOTAL_TIMELINE_MONTHS = 46 as const
export const TOTAL_TIMELINE_INTERVALS = 45 as const

const BASE_YEAR = 2023
const BASE_MONTH = 1

// ---------------------------------------------------------------------------
// 3. Mathematical & Parsing Helpers
// ---------------------------------------------------------------------------

/**
 * Validates and parses a YYYY-MM string into numeric year and month.
 * Returns null if format is invalid or month is out of 1-12 range.
 */
export function parseYearMonth(
  ym: string
): { year: number; month: number } | null {
  if (!ym || typeof ym !== "string") return null
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(ym)
  if (!match) return null

  const year = parseInt(match[1], 10)
  const month = parseInt(match[2], 10)
  return { year, month }
}

/**
 * Computes discrete zero-based month offset from the timeline origin (2023-01).
 * Example: 2023-01 -> 0, 2024-01 -> 12, 2026-10 -> 45.
 */
export function getMonthOffset(
  ym: string,
  baseYear = BASE_YEAR,
  baseMonth = BASE_MONTH
): number {
  const parsed = parseYearMonth(ym)
  if (!parsed) return 0
  return (parsed.year - baseYear) * 12 + (parsed.month - baseMonth)
}

/**
 * Calculates horizontal percentage position (0 to 100%) for a given month on the ruler.
 * Clamps out-of-bounds dates to 0% or 100%. Returns null if date format is invalid.
 */
export function getTimelineRulerPosition(ym: string): number | null {
  const parsed = parseYearMonth(ym)
  if (!parsed) return null

  const offset = getMonthOffset(ym)
  if (offset <= 0) return 0
  if (offset >= TOTAL_TIMELINE_INTERVALS) return 100

  return (offset / TOTAL_TIMELINE_INTERVALS) * 100
}

/**
 * Calculates ruler segment metrics (left percentage and width percentage)
 * for a project spanning from startMonth to endMonth.
 */
export function getTimelineRulerSpan(
  startMonth: string,
  endMonth: string
): { left: number; width: number } | null {
  const startPos = getTimelineRulerPosition(startMonth)
  const endPos = getTimelineRulerPosition(endMonth)

  if (startPos === null || endPos === null) return null
  if (endMonth < startMonth) return null

  return {
    left: startPos,
    width: endPos - startPos,
  }
}

/**
 * Pre-calculated year markers for the timeline ruler track (2023, 2024, 2025, 2026).
 */
export const TIMELINE_YEAR_MARKERS: readonly TimelineYearMarker[] = [
  {
    year: 2023,
    label: "2023",
    month: "2023-01",
    position: (0 / TOTAL_TIMELINE_INTERVALS) * 100,
  },
  {
    year: 2024,
    label: "2024",
    month: "2024-01",
    position: (12 / TOTAL_TIMELINE_INTERVALS) * 100,
  },
  {
    year: 2025,
    label: "2025",
    month: "2025-01",
    position: (24 / TOTAL_TIMELINE_INTERVALS) * 100,
  },
  {
    year: 2026,
    label: "2026",
    month: "2026-01",
    position: (36 / TOTAL_TIMELINE_INTERVALS) * 100,
  },
] as const

/**
 * Sorts project timeline items chronologically by startMonth ascending.
 * Uses stable tie-breaking when two projects share the same startMonth.
 */
export function sortProjectsChronologically(
  items: ProjectTimelineItem[]
): ProjectTimelineItem[] {
  return [...items].sort((a, b) => {
    if (a.startMonth < b.startMonth) return -1
    if (a.startMonth > b.startMonth) return 1
    return 0
  })
}

// ---------------------------------------------------------------------------
// 4. Chronological Project Definitions (13 Verified Projects)
// ---------------------------------------------------------------------------

/**
 * Metadata definition specifying month range and key highlights for each project.
 */
interface ProjectChronologicalMeta {
  projectEntryId: string
  startMonth: string
  endMonth: string
  startYear: number
  endYear: number
  yearBadge: string
  techStack: string[]
  coverImage?: string
  imagePosition?: string
}

const PROJECT_CHRONOLOGICAL_METAS: readonly ProjectChronologicalMeta[] = [
  {
    projectEntryId: "netmonk",
    startMonth: "2023-01",
    endMonth: "2023-12",
    startYear: 2023,
    endYear: 2023,
    yearBadge: "'23",
    techStack: ["React", "Tailwind CSS", "Redux Toolkit", "Node.js"],
    coverImage: "/images/portfolio/01-netmonk.png",
  },
  {
    projectEntryId: "imaps",
    startMonth: "2024-11",
    endMonth: "2025-01",
    startYear: 2024,
    endYear: 2025,
    yearBadge: "'24",
    techStack: ["React", "TypeScript", "Tailwind CSS", "REST API", "GitLab CI"],
    coverImage: "/images/portfolio/02-imaps.png",
  },
  {
    projectEntryId: "cart",
    startMonth: "2025-01",
    endMonth: "2025-02",
    startYear: 2025,
    endYear: 2025,
    yearBadge: "'25",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Attack Surface Mgmt"],
    coverImage: "/images/portfolio/03-cart.png",
  },
  {
    projectEntryId: "monara",
    startMonth: "2025-02",
    endMonth: "2025-12",
    startYear: 2025,
    endYear: 2025,
    yearBadge: "'25",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "ECharts",
    ],
    coverImage: "/images/portfolio/04-monara.png",
  },
  {
    projectEntryId: "alisa",
    startMonth: "2025-04",
    endMonth: "2025-07",
    startYear: 2025,
    endYear: 2025,
    yearBadge: "'25",
    techStack: ["Vue 3", "TypeScript", "Tailwind CSS", "Pinia", "Vite"],
    coverImage: "/images/portfolio/05-alisa.png",
  },
  {
    projectEntryId: "info-tender",
    startMonth: "2025-05",
    endMonth: "2026-08",
    startYear: 2025,
    endYear: 2026,
    yearBadge: "'25",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
    ],
    coverImage: "/images/portfolio/06-info-terder.png",
  },
  {
    projectEntryId: "is-ware",
    startMonth: "2025-07",
    endMonth: "2025-08",
    startYear: 2025,
    endYear: 2025,
    yearBadge: "'25",
    techStack: ["Vue 3", "TypeScript", "Tailwind CSS", "Pinia", "Vite"],
    coverImage: "/images/portfolio/07-is-ware.png",
  },
  {
    projectEntryId: "caterine-cm",
    startMonth: "2025-08",
    endMonth: "2026-04",
    startYear: 2025,
    endYear: 2026,
    yearBadge: "'25",
    techStack: ["Vue 3", "TypeScript", "Tailwind CSS", "Pinia", "ITIL"],
    coverImage: "/images/portfolio/08-caterine-cm.png",
  },
  {
    projectEntryId: "wbs",
    startMonth: "2025-12",
    endMonth: "2026-08",
    startYear: 2025,
    endYear: 2026,
    yearBadge: "'25",
    techStack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "TanStack Query",
    ],
    coverImage: "/images/portfolio/09-wbs.png",
  },
  {
    projectEntryId: "cis",
    startMonth: "2026-03",
    endMonth: "2026-09",
    startYear: 2026,
    endYear: 2026,
    yearBadge: "'26",
    techStack: ["Vue 3", "React", "TypeScript", "Tailwind CSS", "CSP"],
    coverImage: "/images/portfolio/10-cis.png",
  },
  {
    projectEntryId: "pis-mars",
    startMonth: "2026-05",
    endMonth: "2026-06",
    startYear: 2026,
    endYear: 2026,
    yearBadge: "'26",
    techStack: ["Vue 3", "TypeScript", "Tailwind CSS", "Pinia", "Vite"],
    coverImage: "/images/portfolio/11-pis-mars.png",
  },
  {
    projectEntryId: "bulk-orders",
    startMonth: "2026-05",
    endMonth: "2026-06",
    startYear: 2026,
    endYear: 2026,
    yearBadge: "'26",
    techStack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "TanStack Query",
    ],
    coverImage: "/images/portfolio/12-bulk-orders.png",
  },
  {
    projectEntryId: "hiblow-fleet",
    startMonth: "2026-09",
    endMonth: "2026-10",
    startYear: 2026,
    endYear: 2026,
    yearBadge: "'26",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Drizzle ORM",
    ],
    coverImage: "/images/portfolio/13-hiblow-fleet.png",
  },
] as const

/**
 * Builds the strictly sorted list of 13 chronological project timeline items
 * mapped directly to the single source of truth in `lib/cv-data.ts`.
 */
function buildProjectTimelineItems(): ProjectTimelineItem[] {
  const items: ProjectTimelineItem[] = []

  for (const meta of PROJECT_CHRONOLOGICAL_METAS) {
    const cvProject = projects.find((p) => p.id === meta.projectEntryId)
    if (!cvProject) {
      throw new Error(
        `Project timeline meta specifies non-existent cv-data project: "${meta.projectEntryId}"`
      )
    }

    items.push({
      id: cvProject.id,
      projectEntryId: cvProject.id,
      name: cvProject.name,
      period: cvProject.period,
      startMonth: meta.startMonth,
      endMonth: meta.endMonth,
      startYear: meta.startYear,
      endYear: meta.endYear,
      yearBadge: meta.yearBadge,
      company: cvProject.company,
      role: cvProject.role,
      category: getProjectCategory(cvProject.id),
      shortDescription: cvProject.description,
      techStack: meta.techStack,
      coverImage: meta.coverImage,
      imagePosition: meta.imagePosition,
    })
  }

  return sortProjectsChronologically(items)
}

/**
 * Exactly 13 chronological project timeline items, sorted from oldest to newest.
 */
export const projectTimelineItems: readonly ProjectTimelineItem[] =
  buildProjectTimelineItems()

/**
 * Retrieves a single project timeline item by its unique ID.
 */
export function getProjectTimelineItemById(
  id: string
): ProjectTimelineItem | undefined {
  return projectTimelineItems.find((p) => p.id === id)
}
