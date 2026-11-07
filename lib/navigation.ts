import { nav } from "./cv-data.ts"
import type { Bi } from "./cv-data.ts"

export interface NavItem {
  sectionId: string
  href: string
  label: Bi
}

export const navLinks: readonly NavItem[] = [
  { sectionId: "about", href: "#about", label: nav.about },
  { sectionId: "experience", href: "#experience", label: nav.experience },
  { sectionId: "projects", href: "#projects", label: nav.projects },
  { sectionId: "skills", href: "#skills", label: nav.skills },
  { sectionId: "education", href: "#education", label: nav.education },
  {
    sectionId: "certifications",
    href: "#certifications",
    label: nav.certifications,
  },
  {
    sectionId: "achievements",
    href: "#achievements",
    label: nav.achievements,
  },
  { sectionId: "contact", href: "#contact", label: nav.contact },
] as const

export const navSectionIds: readonly string[] = navLinks.map(
  (item) => item.sectionId
)
