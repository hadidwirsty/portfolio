import { experience, projects } from "./cv-professional-data.ts"
import {
  EXPERIENCE_FILTER_DEFS,
  getFilteredProjects,
} from "./portfolio-experience-filter.ts"
import {
  getProjectTimelineItemById,
  projectTimelineItems,
} from "./portfolio-project-timeline-data.ts"
import { getProjectTechnologyLinks } from "./project-technology-links.ts"
import {
  isPublicProjectRef,
  type PublicProjectRef,
} from "./skills-portfolio-relationships.ts"

// This mapping stays on the server. Only the projected fields below cross to clients.
const refsByProjectId = new Map(
  projects.map(({ id, publicRef = id }) => {
    if (!isPublicProjectRef(publicRef)) {
      throw new Error(
        "Missing approved public reference for a Portfolio project"
      )
    }
    return [id, publicRef] as const
  })
)

export function getPublicProjectRef(projectId: string): PublicProjectRef {
  const ref = refsByProjectId.get(projectId)
  if (!ref) throw new Error("Unknown Portfolio project in public projection")
  return ref
}

export const publicProjectTimelineItems = projectTimelineItems.map((item) => ({
  ref: getPublicProjectRef(item.projectEntryId),
  name: item.name,
  period: item.period,
  startMonth: item.startMonth,
  startYear: item.startYear,
  yearBadge: item.yearBadge,
  company: item.company,
  category: item.category,
  shortDescription: item.shortDescription,
  techStack: item.techStack,
  coverImage: item.coverImage,
  imagePosition: item.imagePosition,
}))

const projectCards = projects.map((project) => {
  const ref = getPublicProjectRef(project.id)
  const timeline = getProjectTimelineItemById(project.id)
  const affiliation = experience.find(({ projectIds }) =>
    projectIds.includes(project.id)
  )
  return {
    ref,
    name: project.name,
    company: project.company,
    period: project.period,
    shortDescription: project.shortDescription,
    description: project.description,
    roleLabel: project.roleLabel ?? affiliation?.role,
    role: project.role,
    highlights: project.highlights,
    technicalDetails: project.technicalDetails,
    tech: project.tech,
    technologyLinks: getProjectTechnologyLinks(ref, project.tech),
    link: project.link,
    coverImage: timeline?.coverImage,
    imagePosition: timeline?.imagePosition,
  }
})

export const publicSelectedWorks = {
  projectsByRef: Object.fromEntries(
    projectCards.map((project) => [project.ref, project])
  ),
  filters: EXPERIENCE_FILTER_DEFS.map(({ id, label, badgeLabel }) => ({
    id,
    label,
    badgeLabel,
    projectRefs: getFilteredProjects(id).map(({ id }) =>
      getPublicProjectRef(id)
    ),
  })),
}

export type PublicTimelineItem = (typeof publicProjectTimelineItems)[number]
export type PublicProjectCard = (typeof projectCards)[number]
export type PublicSelectedWorks = typeof publicSelectedWorks
