import { nav, subpages, type Bi } from "./cv-data.ts"

export interface NavItem {
  sectionId: string
  href: string
  label: Bi
}

export interface SubpageRoute {
  key: keyof typeof subpages
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

export const subpageRoutes: readonly SubpageRoute[] = [
  { key: "about", href: "/about", label: subpages.about.title },
  { key: "portfolio", href: "/portfolio", label: subpages.portfolio.title },
  { key: "stack", href: "/stack", label: subpages.stack.title },
  { key: "contact", href: "/contact", label: subpages.contact.title },
] as const

export const subpagePaths: readonly string[] = subpageRoutes.map(
  (item) => item.href
)
