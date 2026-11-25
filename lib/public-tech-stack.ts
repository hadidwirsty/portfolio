import {
  CORE_STACK,
  TECH_CATEGORIES,
  TECH_STACK_HERO,
} from "./tech-stack-data.ts"

// Project display data on the server before crossing the /stack client boundary.
export const publicTechStack = {
  hero: {
    title: TECH_STACK_HERO.title,
    description: TECH_STACK_HERO.description,
    coreHeading: TECH_STACK_HERO.coreHeading,
    coreStack: CORE_STACK.map(({ name, icon }) => ({ name, icon })),
  },
  toolkit: {
    sectionIndex: TECH_STACK_HERO.sectionIndex,
    sectionTitle: TECH_STACK_HERO.sectionTitle,
    sectionSubtitle: TECH_STACK_HERO.sectionSubtitle,
    categories: TECH_CATEGORIES.map(
      ({ id, index, title, description, techs }) => ({
        id,
        index,
        title,
        description,
        techs: techs.map(({ id, name }) => ({ id, name })),
      })
    ),
  },
}

export type PublicTechHero = typeof publicTechStack.hero
export type PublicTechToolkit = typeof publicTechStack.toolkit
export type PublicTechCategory = PublicTechToolkit["categories"][number]
export type PublicTechItem = PublicTechCategory["techs"][number]
