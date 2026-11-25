import { experience, projects } from "./cv-professional-data.ts"
import { getPublicProjectRef } from "./public-portfolio-data.ts"

export const publicExperience = experience.map((entry) => ({
  id: entry.id,
  company: entry.company,
  role: entry.role,
  period: entry.period,
  location: entry.location,
  employmentType: entry.employmentType,
  summary: entry.summary,
  points: entry.points,
  relatedProjects: projects
    .filter(({ id }) => entry.projectIds.includes(id))
    .map(({ id, name }) => ({ ref: getPublicProjectRef(id), name })),
}))

export type PublicExperienceEntry = (typeof publicExperience)[number]
