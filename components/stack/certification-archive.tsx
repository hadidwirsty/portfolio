"use client"

import * as React from "react"
import { BookOpen, ChevronDown, ChevronUp, GraduationCap } from "lucide-react"

import { CertificateCredentialLink } from "@/components/stack/certificate-credential-link"
import { CertificateDetail } from "@/components/stack/certificate-detail"
import {
  CERTIFICATES_DATA,
  CERTIFICATION_ISSUERS,
  getCategoriesByIssuer,
  getCategoryById,
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

  // Selected certificate for inline detail view
  const [selectedCertId, setSelectedCertId] = React.useState<string | null>(
    null
  )
  const selectedButtonRef = React.useRef<HTMLButtonElement>(null)

  // When active issuer changes, reset category filter
  const handleIssuerChange = (issuer: "all" | "dicoding" | "linkedin") => {
    setActiveIssuer(issuer)
    setActiveCategory("all")
    setSelectedCertId(null)
  }

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId)
    setSelectedCertId(null)
  }

  const handleSelectCert = (certId: string) => {
    setSelectedCertId((current) => (current === certId ? null : certId))
  }

  const handleCloseDetailWithFocus = () => {
    const selectedButton = selectedButtonRef.current
    setSelectedCertId(null)
    selectedButton?.focus()
  }

  // Derive filtered certificates
  const filteredCertificates = React.useMemo(() => {
    return CERTIFICATES_DATA.filter((cert) => {
      // 1. Filter by issuer
      if (activeIssuer !== "all" && cert.issuerId !== activeIssuer) {
        return false
      }
      // 2. Filter by category
      if (activeCategory !== "all" && cert.categoryId !== activeCategory) {
        return false
      }
      return true
    })
  }, [activeIssuer, activeCategory])

  // Contextual categories for the selected issuer
  const contextualCategories = React.useMemo(() => {
    if (activeIssuer === "all") return []
    return getCategoriesByIssuer(activeIssuer)
  }, [activeIssuer])

  const totalCount = getTotalCertificatesCount()
  const dicodingCount = getIssuerCount("dicoding")
  const linkedinCount = getIssuerCount("linkedin")

  const selectedCert = React.useMemo(
    () => CERTIFICATES_DATA.find((c) => c.id === selectedCertId),
    [selectedCertId]
  )

  const selectedIssuerName = selectedCert
    ? CERTIFICATION_ISSUERS[selectedCert.issuerId].name
    : ""

  return (
    <section
      id="complete-archive"
      aria-labelledby="archive-heading"
      className={cn(
        "relative w-full rounded-3xl border border-border/50 bg-card/60 p-6 backdrop-blur-md transition-all duration-300 sm:p-8",
        className
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3
          id="archive-heading"
          className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          {lang === "id" ? "Arsip lengkap" : "Full archive"}
        </h3>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          className={cn(
            "inline-flex items-center justify-center gap-2 self-start rounded-xl px-4 py-2.5 font-mono text-xs font-semibold transition-all duration-200 sm:self-auto",
            "border border-border/60 bg-background/80 text-foreground shadow-2xs hover:border-border hover:bg-background",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
            isExpanded && "border-primary/40 bg-primary/10 text-primary"
          )}
        >
          <BookOpen aria-hidden="true" className="size-4" />
          <span>
            {isExpanded
              ? lang === "id"
                ? "Tutup arsip"
                : "Close archive"
              : lang === "id"
                ? `Lihat semua ${totalCount} sertifikat`
                : `View all ${totalCount} certificates`}
          </span>
          {isExpanded ? (
            <ChevronUp aria-hidden="true" className="size-4" />
          ) : (
            <ChevronDown aria-hidden="true" className="size-4" />
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
                className="mr-1 font-mono text-[11px] font-semibold text-muted-foreground uppercase"
              >
                Platform:
              </span>

              <button
                type="button"
                onClick={() => handleIssuerChange("all")}
                aria-pressed={activeIssuer === "all"}
                className={cn(
                  "rounded-full px-3 py-1 font-mono text-xs font-medium transition-colors",
                  "border focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                  activeIssuer === "all"
                    ? "border-primary bg-primary font-semibold text-primary-foreground"
                    : "border-border/50 bg-background/60 text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                {lang === "id" ? "Semua" : "All"} ({totalCount})
              </button>

              <button
                type="button"
                onClick={() => handleIssuerChange("dicoding")}
                aria-pressed={activeIssuer === "dicoding"}
                className={cn(
                  "rounded-full px-3 py-1 font-mono text-xs font-medium transition-colors",
                  "border focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                  activeIssuer === "dicoding"
                    ? "border-primary bg-primary font-semibold text-primary-foreground"
                    : "border-border/50 bg-background/60 text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                Dicoding Indonesia ({dicodingCount})
              </button>

              <button
                type="button"
                onClick={() => handleIssuerChange("linkedin")}
                aria-pressed={activeIssuer === "linkedin"}
                className={cn(
                  "rounded-full px-3 py-1 font-mono text-xs font-medium transition-colors",
                  "border focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                  activeIssuer === "linkedin"
                    ? "border-primary bg-primary font-semibold text-primary-foreground"
                    : "border-border/50 bg-background/60 text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                LinkedIn Learning ({linkedinCount})
              </button>
            </div>

            {/* 1B. Contextual Category Filter Pills (when a specific platform is chosen) */}
            {contextualCategories.length > 0 && (
              <div
                role="group"
                aria-labelledby={`${contentId}-category`}
                className="flex flex-wrap items-center gap-2 border-t border-border/30 pt-1"
              >
                <span
                  id={`${contentId}-category`}
                  className="mr-1 font-mono text-[11px] font-semibold text-muted-foreground uppercase"
                >
                  {lang === "id" ? "Kategori:" : "Category:"}
                </span>

                <button
                  type="button"
                  onClick={() => handleCategoryChange("all")}
                  aria-pressed={activeCategory === "all"}
                  className={cn(
                    "rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium transition-colors",
                    "border focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                    activeCategory === "all"
                      ? "border-primary/80 bg-primary/20 font-semibold text-primary"
                      : "border-border/40 bg-background/40 text-muted-foreground hover:border-border hover:text-foreground"
                  )}
                >
                  {lang === "id" ? "Semua Kategori" : "All Categories"}
                </button>

                {contextualCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    aria-pressed={activeCategory === cat.id}
                    className={cn(
                      "rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium transition-colors",
                      "border focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                      activeCategory === cat.id
                        ? "border-primary/80 bg-primary/20 font-semibold text-primary"
                        : "border-border/40 bg-background/40 text-muted-foreground hover:border-border hover:text-foreground"
                    )}
                  >
                    {cat.title[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. INLINE DETAIL PANEL (When an item in the archive is clicked) */}
          {selectedCert && (
            <div className="pt-2">
              <CertificateDetail
                cert={selectedCert}
                issuerName={selectedIssuerName}
                onClose={handleCloseDetailWithFocus}
              />
            </div>
          )}

          {/* 3. CERTIFICATE ITEMS LIST */}
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 font-mono text-xs text-muted-foreground">
              <span>
                {lang === "id"
                  ? `Menampilkan ${filteredCertificates.length} dari ${totalCount} sertifikat`
                  : `Showing ${filteredCertificates.length} of ${totalCount} certificates`}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCertificates.map((cert) => {
                const isSelected = cert.id === selectedCertId
                const category = getCategoryById(cert.categoryId)
                const issuerName = CERTIFICATION_ISSUERS[cert.issuerId].name

                return (
                  <div
                    key={cert.id}
                    className={cn(
                      "flex flex-col items-start gap-3 rounded-xl border border-border/50 bg-background/60 p-3.5 shadow-2xs",
                      isSelected &&
                        "border-primary bg-background ring-2 ring-primary/20"
                    )}
                  >
                    <button
                      ref={isSelected ? selectedButtonRef : undefined}
                      type="button"
                      onClick={() => handleSelectCert(cert.id)}
                      aria-pressed={isSelected}
                      className="group flex w-full flex-1 flex-col justify-between gap-2 rounded-sm text-left focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      <span className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[9px] font-semibold tracking-wider text-muted-foreground uppercase">
                          {issuerName}
                        </span>
                        {category && (
                          <span className="font-mono text-[9px] text-muted-foreground">
                            {category.title[lang]}
                          </span>
                        )}
                      </span>
                      <span className="font-heading text-xs leading-snug font-bold text-foreground group-hover:text-primary sm:text-sm">
                        {cert.title}
                      </span>
                      <span className="font-mono text-[10px] font-medium text-primary">
                        {isSelected
                          ? lang === "id"
                            ? "Terpilih"
                            : "Selected"
                          : lang === "id"
                            ? "Lihat detail"
                            : "View details"}
                      </span>
                    </button>
                    <CertificateCredentialLink certificate={cert} lang={lang} />
                  </div>
                )
              })}
            </div>
          </div>

          {/* 4. OTHER CREDENTIALS (Historical Academic & Career Records) */}
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

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {OTHER_CREDENTIALS.map((cred) => (
                <div
                  key={cred.id}
                  className="flex flex-col justify-between rounded-xl border border-border/50 bg-background/60 p-4 shadow-2xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <GraduationCap
                        aria-hidden="true"
                        className="size-3.5 text-primary"
                      />
                      <span className="font-mono text-[10px] font-semibold tracking-wider uppercase">
                        {cred.issuer}
                      </span>
                    </div>

                    <h5 className="font-heading text-xs leading-snug font-bold text-foreground sm:text-sm">
                      {cred.title}
                    </h5>
                  </div>

                  <div className="mt-3 border-t border-border/30 pt-2 font-mono text-[10px] text-muted-foreground">
                    <span>{cred.period[lang]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div id={contentId} hidden />
      )}
    </section>
  )
}
