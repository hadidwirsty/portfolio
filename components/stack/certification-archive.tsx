"use client"

import * as React from "react"
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react"

import { CertificateSticker } from "@/components/stack/certificate-sticker"
import { FeaturePanelBackground } from "@/components/ui/feature-panel-background"
import { FilterPill } from "@/components/ui/filter-pill"
import { LetterRoll } from "@/components/ui/letter-roll"
import {
  CERTIFICATES_DATA,
  getCategoriesByIssuer,
  getIssuerCount,
  getTotalCertificatesCount,
  OTHER_CREDENTIALS,
} from "@/lib/certifications-data"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

export interface CertificationArchiveProps {
  className?: string
}

export function CertificationArchive({ className }: CertificationArchiveProps) {
  const { lang } = useLanguage()

  // Archive expandable toggle state (default: collapsed)
  const [isExpanded, setIsExpanded] = React.useState(false)
  const contentId = React.useId()

  // Filters state
  const [activeIssuer, setActiveIssuer] = React.useState<
    "all" | "dicoding" | "linkedin"
  >("all")
  const [activeCategory, setActiveCategory] = React.useState<string>("all")

  // When active issuer changes, reset category filter
  const handleIssuerChange = (issuer: "all" | "dicoding" | "linkedin") => {
    setActiveIssuer(issuer)
    setActiveCategory("all")
  }

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId)
  }

  const issuerCertificates =
    activeIssuer === "all"
      ? CERTIFICATES_DATA
      : CERTIFICATES_DATA.filter((cert) => cert.issuerId === activeIssuer)
  const filteredCertificates =
    activeCategory === "all"
      ? issuerCertificates
      : issuerCertificates.filter((cert) => cert.categoryId === activeCategory)

  // Contextual categories for the selected issuer
  const contextualCategories = React.useMemo(() => {
    if (activeIssuer === "all") return []
    return getCategoriesByIssuer(activeIssuer)
  }, [activeIssuer])

  const totalCount = getTotalCertificatesCount()
  const dicodingCount = getIssuerCount("dicoding")
  const linkedinCount = getIssuerCount("linkedin")

  return (
    <section
      id="complete-archive"
      aria-labelledby="archive-heading"
      className={cn("feature-panel w-full p-6 sm:p-8", className)}
    >
      <FeaturePanelBackground
        className={isExpanded ? "max-h-[45rem] mask-b-from-70%" : undefined}
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1.5">
          <h3
            id="archive-heading"
            className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {lang === "id" ? "Arsip lengkap" : "Full archive"}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {lang === "id"
              ? "Jelajahi sertifikat kursus berdasarkan platform dan kategori."
              : "Browse course certificates by platform and category."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          className={cn(
            "inline-flex max-w-full shrink-0 items-center justify-center gap-2 self-start rounded-full px-4 py-2.5 font-mono text-xs font-semibold transition-all duration-200 sm:self-auto",
            "border border-border/60 bg-background/80 text-foreground shadow-2xs hover:border-border hover:bg-background",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
            isExpanded && "border-primary/40 bg-primary/10 text-primary"
          )}
        >
          <BookOpen aria-hidden="true" className="size-4 shrink-0" />
          <LetterRoll
            className="min-w-0"
            hoverTarget="parent"
            style={{ width: "100%" }}
            text={
              isExpanded
                ? lang === "id"
                  ? "Tutup arsip"
                  : "Close archive"
                : lang === "id"
                  ? `Lihat semua ${totalCount} sertifikat`
                  : `View all ${totalCount} certificates`
            }
          />
          {isExpanded ? (
            <ChevronUp aria-hidden="true" className="size-4 shrink-0" />
          ) : (
            <ChevronDown aria-hidden="true" className="size-4 shrink-0" />
          )}
        </button>
      </div>

      {isExpanded ? (
        <div
          id={contentId}
          className="mt-8 space-y-8 border-t border-border/40 pt-6 motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in"
        >
          {/* 1. FILTER CONTROLS */}
          <div className="space-y-4">
            {/* 1A. Issuer Platform Filter Pills */}
            <div
              role="group"
              aria-labelledby={`${contentId}-platform`}
              className="flex flex-wrap items-center gap-2"
            >
              <span
                id={`${contentId}-platform`}
                className="mr-1 basis-full font-mono text-xs font-medium text-muted-foreground sm:basis-auto"
              >
                Platform
              </span>

              <FilterPill
                onClick={() => handleIssuerChange("all")}
                aria-pressed={activeIssuer === "all"}
                count={totalCount}
              >
                {lang === "id" ? "Semua" : "All"}
              </FilterPill>

              <FilterPill
                onClick={() => handleIssuerChange("dicoding")}
                aria-pressed={activeIssuer === "dicoding"}
                count={dicodingCount}
              >
                Dicoding Indonesia
              </FilterPill>

              <FilterPill
                onClick={() => handleIssuerChange("linkedin")}
                aria-pressed={activeIssuer === "linkedin"}
                count={linkedinCount}
              >
                LinkedIn Learning
              </FilterPill>
            </div>

            {/* 1B. Contextual Category Filter Pills (when a specific platform is chosen) */}
            {contextualCategories.length > 0 && (
              <div
                role="group"
                aria-labelledby={`${contentId}-category`}
                className="flex flex-wrap items-center gap-2 border-t border-border/30 pt-3"
              >
                <span
                  id={`${contentId}-category`}
                  className="mr-1 basis-full font-mono text-xs font-medium text-muted-foreground sm:basis-auto"
                >
                  {lang === "id" ? "Kategori" : "Category"}
                </span>

                <FilterPill
                  onClick={() => handleCategoryChange("all")}
                  aria-pressed={activeCategory === "all"}
                  count={issuerCertificates.length}
                >
                  {lang === "id" ? "Semua Kategori" : "All Categories"}
                </FilterPill>

                {contextualCategories.map((cat) => (
                  <FilterPill
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    aria-pressed={activeCategory === cat.id}
                    count={
                      issuerCertificates.filter(
                        (cert) => cert.categoryId === cat.id
                      ).length
                    }
                    className="whitespace-normal"
                  >
                    {cat.title[lang]}
                  </FilterPill>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 font-mono text-xs text-muted-foreground">
              <span>
                {lang === "id"
                  ? `Menampilkan ${filteredCertificates.length} dari ${totalCount} sertifikat`
                  : `Showing ${filteredCertificates.length} of ${totalCount} certificates`}
              </span>
            </div>

            <ul className="certificate-archive-list grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCertificates.map((cert) => (
                <li key={cert.id} className="min-w-0">
                  <CertificateSticker certificate={cert} />
                </li>
              ))}
            </ul>
          </div>

          {/* Historical academic and career credentials */}
          <div className="space-y-4 border-t border-border/40 pt-6">
            <div className="space-y-1">
              <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {lang === "id"
                  ? "Kredensial Tambahan & Bahasa"
                  : "Other Credentials & Language"}
              </span>
              <p className="font-sans text-xs text-muted-foreground">
                {lang === "id"
                  ? "Sertifikasi kemahiran bahasa Inggris dan pelatihan karier resmi BUMN."
                  : "English language proficiency and official national enterprise certifications."}
              </p>
            </div>

            <ul className="certificate-archive-list grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {OTHER_CREDENTIALS.map((cred) => (
                <li key={cred.id} className="min-w-0">
                  <CertificateSticker certificate={cred} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div id={contentId} hidden />
      )}
    </section>
  )
}
