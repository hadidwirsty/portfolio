import type { Bi, CertificationEntry } from "./cv-data.ts"

export type IssuerCategory = "all" | "dicoding" | "linkedin" | "other"

export interface IssuerCategoryDefinition {
  id: IssuerCategory
  label: Bi
}

export const issuerCategories: readonly IssuerCategoryDefinition[] = [
  {
    id: "all",
    label: { id: "Semua Kredensial", en: "All Credentials" },
  },
  {
    id: "dicoding",
    label: { id: "Dicoding Indonesia", en: "Dicoding Indonesia" },
  },
  {
    id: "linkedin",
    label: { id: "LinkedIn Learning", en: "LinkedIn Learning" },
  },
  {
    id: "other",
    label: { id: "Akademik & Lainnya", en: "Academic & Others" },
  },
] as const

/**
 * Classifies a certification's issuer into one of the designated categories.
 */
export function getIssuerCategory(
  issuer: string
): "dicoding" | "linkedin" | "other" {
  const normalized = issuer.toLowerCase()
  if (normalized.includes("dicoding")) {
    return "dicoding"
  }
  if (normalized.includes("linkedin")) {
    return "linkedin"
  }
  return "other"
}

/**
 * Filters certifications according to the selected issuer category.
 */
export function filterCertifications(
  certifications: readonly CertificationEntry[],
  category: IssuerCategory
): CertificationEntry[] {
  if (category === "all") {
    return [...certifications]
  }
  return certifications.filter(
    (cert) => getIssuerCategory(cert.issuer) === category
  )
}

/**
 * Calculates certification counts per issuer category.
 */
export function getCertificationCounts(
  certifications: readonly CertificationEntry[]
): Record<IssuerCategory, number> {
  const counts: Record<IssuerCategory, number> = {
    all: certifications.length,
    dicoding: 0,
    linkedin: 0,
    other: 0,
  }

  for (const cert of certifications) {
    const cat = getIssuerCategory(cert.issuer)
    counts[cat]++
  }

  return counts
}
