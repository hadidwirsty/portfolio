"use client"

import * as React from "react"
import { BookOpen, ChevronDown, ChevronUp, GraduationCap } from "lucide-react"

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

  // Filters state
  const [activeIssuer, setActiveIssuer] = React.useState<
    "all" | "dicoding" | "linkedin"
  >("all")
  const [activeCategory, setActiveCategory] = React.useState<string>("all")

  // Selected certificate for inline detail view
  const [selectedCertId, setSelectedCertId] = React.useState<string | null>(
    null
  )

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
      {/* =========================================================
          ARCHIVE HEADER & EXPAND TOGGLE
          ========================================================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            COMPLETE ARCHIVE
          </span>

          <h3
            id="archive-heading"
            className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            {lang === "id"
              ? "Seluruh Sertifikat Kursus"
              : "All Course Certificates"}
          </h3>

          <p className="font-sans text-xs text-muted-foreground sm:text-sm">
            {lang === "id"
              ? `Eksplorasi arsip lengkap 38 sertifikat kursus yang terbagi dalam 2 platform pembelajaran.`
              : `Explore the complete archive of 38 course certificates across 2 learning platforms.`}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-controls="archive-expandable-content"
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
                ? "Tutup Arsip Lengkap"
                : "Collapse Full Archive"
              : lang === "id"
                ? `Buka Arsip Lengkap (38)`
                : `Open Full Archive (38)`}
          </span>
          {isExpanded ? (
            <ChevronUp aria-hidden="true" className="size-4" />
          ) : (
            <ChevronDown aria-hidden="true" className="size-4" />
          )}
        </button>
      </div>

      {/* =========================================================
          EXPANDABLE ARCHIVE BODY
          ========================================================= */}
      {isExpanded && (
        <div
          id="archive-expandable-content"
          className="mt-8 animate-in space-y-8 border-t border-border/40 pt-6 duration-300 fade-in"
        >
          {/* 1. FILTER CONTROLS */}
          <div className="space-y-4">
            {/* 1A. Issuer Platform Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-mono text-[11px] font-semibold text-muted-foreground uppercase">
                Platform:
              </span>

              <button
                type="button"
                onClick={() => handleIssuerChange("all")}
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
              <div className="flex flex-wrap items-center gap-2 border-t border-border/30 pt-1">
                <span className="mr-1 font-mono text-[11px] font-semibold text-muted-foreground uppercase">
                  {lang === "id" ? "Kategori:" : "Category:"}
                </span>

                <button
                  type="button"
                  onClick={() => handleCategoryChange("all")}
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
                onClose={() => setSelectedCertId(null)}
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
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => handleSelectCert(cert.id)}
                    className={cn(
                      "flex flex-col justify-between rounded-xl p-3.5 text-left transition-all duration-200 select-none",
                      "border border-border/50 bg-background/60 shadow-2xs hover:border-border hover:bg-background/95",
                      "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
                      isSelected &&
                        "border-primary bg-background shadow-xs ring-2 ring-primary/20"
                    )}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-mono text-[9px] font-semibold tracking-wider text-muted-foreground uppercase">
                          {issuerName}
                        </span>
                        {category && (
                          <span className="max-w-[50%] truncate font-mono text-[8px] text-muted-foreground/70">
                            {category.title[lang]}
                          </span>
                        )}
                      </div>

                      <h4 className="font-heading text-xs leading-snug font-bold text-foreground group-hover:text-primary sm:text-sm">
                        {cert.title}
                      </h4>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-border/30 pt-2 font-mono text-[9px] text-muted-foreground">
                      <span>
                        {cert.certificateId
                          ? `ID: ${cert.certificateId}`
                          : "Course Completed"}
                      </span>
                      <span className="font-medium text-primary">
                        {isSelected
                          ? lang === "id"
                            ? "[Terpilih]"
                            : "[Selected]"
                          : lang === "id"
                            ? "Lihat Detail"
                            : "Details"}
                      </span>
                    </div>
                  </button>
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
      )}
    </section>
  )
}
