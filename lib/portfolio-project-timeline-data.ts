import type { Bi } from "./cv-data.ts"
import { projects } from "./cv-professional-data.ts"
import { getProjectCategory, type ProjectCategory } from "./projects-filter.ts"

export * from "./portfolio-timeline-ruler.ts"

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
    techStack: [
      "Angular 18",
      "NG-ZORRO",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
    ],
    coverImage: "/images/portfolio/02-imaps.png",
  },
  {
    projectEntryId: "cart",
    startMonth: "2025-01",
    endMonth: "2025-02",
    startYear: 2025,
    endYear: 2025,
    yearBadge: "'25",
    techStack: ["Nuxt 3", "Vue.js", "TypeScript", "Tailwind CSS", "Pinia"],
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
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
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
    techStack: [
      "React 19",
      "Vite",
      "Ant Design 5",
      "Module Federation",
      "Tailwind CSS",
    ],
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
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "TanStack Table",
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
    techStack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
    ],
    coverImage: "/images/portfolio/07-is-ware.png",
  },
  {
    projectEntryId: "caterine-cm",
    startMonth: "2025-08",
    endMonth: "2026-04",
    startYear: 2025,
    endYear: 2026,
    yearBadge: "'25",
    techStack: ["Vue 3", "TypeScript", "Vite", "Tailwind CSS", "Pinia"],
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
    techStack: ["Vue.js", "Nuxt 3", "TypeScript", "Tailwind CSS", "CSP"],
    coverImage: "/images/portfolio/10-cis.png",
  },
  {
    projectEntryId: "pis-mars",
    startMonth: "2026-05",
    endMonth: "2026-06",
    startYear: 2026,
    endYear: 2026,
    yearBadge: "'26",
    techStack: [
      ".NET 8",
      "C#",
      "Blazor Server",
      "ASP.NET Core",
      "Microservices",
    ],
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
 * mapped directly to the single source of truth in `lib/cv-professional-data.ts`.
 */
function buildProjectTimelineItems(): ProjectTimelineItem[] {
  const items: ProjectTimelineItem[] = []

  for (const meta of PROJECT_CHRONOLOGICAL_METAS) {
    const cvProject = projects.find((p) => p.id === meta.projectEntryId)
    if (!cvProject) {
      throw new Error(
        `Project timeline meta specifies non-existent project: "${meta.projectEntryId}"`
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
