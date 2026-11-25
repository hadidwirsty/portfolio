import { publicSelectedWorks } from "./public-portfolio-data.ts"
import { publicTechStack } from "./public-tech-stack.ts"
import { getProjectsForTechnology } from "./skills-portfolio-relationships.ts"

const allProjectRefs =
  publicSelectedWorks.filters.find(({ id }) => id === "all")?.projectRefs ?? []

export const publicSkillsInPractice = publicTechStack.toolkit.categories
  .map(({ id, title, techs }) => ({
    id,
    title,
    skills: techs.flatMap(({ id: techId, name }) => {
      const relatedRefs = new Set(getProjectsForTechnology(techId))
      const projects = allProjectRefs
        .filter((ref) => relatedRefs.has(ref))
        .map((ref) => ({
          ref,
          name: publicSelectedWorks.projectsByRef[ref].name,
        }))
      return projects.length ? [{ id: techId, name, projects }] : []
    }),
  }))
  .filter(({ skills }) => skills.length > 0)

export type PublicSkillsInPractice = typeof publicSkillsInPractice
