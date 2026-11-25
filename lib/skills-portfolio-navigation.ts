import type { ExperienceFilterCategory } from "./portfolio-experience-filter.ts"
import type { PublicProjectRef } from "./skills-portfolio-relationships.ts"

export const SKILL_FRAGMENT_PREFIX = "#skill-"
export const PROJECT_FRAGMENT_PREFIX = "#project-"

const SKILL_RETURN_KEY = "skillsInPracticeReturnKey"
let pendingSkillReturn: { key: string; skillId: string } | null = null

export function rememberSkillForProjectReturn(
  history: Pick<History, "state" | "replaceState">,
  skillId: string
) {
  const key = crypto.getRandomValues(new Uint32Array(4)).join("-")
  // Preserve Next.js state while marking only the Stack entry behind the project.
  history.replaceState({ ...history.state, [SKILL_RETURN_KEY]: key }, "")
  pendingSkillReturn = { key, skillId }
}

export function takeSkillForProjectReturn(history: Pick<History, "state">) {
  if (
    !pendingSkillReturn ||
    history.state?.[SKILL_RETURN_KEY] !== pendingSkillReturn.key
  ) {
    return null
  }
  const { skillId } = pendingSkillReturn
  pendingSkillReturn = null
  return skillId
}

export function getSkillFragment(techId: string) {
  return `${SKILL_FRAGMENT_PREFIX}${techId}`
}

export function getProjectFragment(ref: PublicProjectRef) {
  return `${PROJECT_FRAGMENT_PREFIX}${ref}`
}

export function readSkillFragment(
  fragment: string,
  techIds: ReadonlySet<string>
) {
  if (!fragment.startsWith(SKILL_FRAGMENT_PREFIX)) return null
  const id = fragment.slice(SKILL_FRAGMENT_PREFIX.length)
  return techIds.has(id) ? id : null
}

export function readProjectFragment(
  fragment: string,
  projectsByRef: Readonly<Record<string, { ref: PublicProjectRef }>>
) {
  if (!fragment.startsWith(PROJECT_FRAGMENT_PREFIX)) return null
  // Next.js can append the requested hash to the cached route's project hash.
  const start = fragment.lastIndexOf(PROJECT_FRAGMENT_PREFIX)
  const ref = fragment.slice(start + PROJECT_FRAGMENT_PREFIX.length)
  return Object.hasOwn(projectsByRef, ref) ? projectsByRef[ref].ref : null
}

export function getProjectTargetFilter(
  filters: readonly {
    id: ExperienceFilterCategory
    projectRefs: readonly PublicProjectRef[]
  }[],
  activeFilter: ExperienceFilterCategory,
  ref: PublicProjectRef
) {
  const current = filters.find(({ id }) => id === activeFilter)
  if (current?.projectRefs.includes(ref)) return activeFilter
  return filters.find(({ id }) => id === "all")?.projectRefs.includes(ref)
    ? "all"
    : null
}
