"use client"

import * as React from "react"
import { Award, Layers } from "lucide-react"

import { CertificationArchive } from "@/components/stack/certification-archive"
import { CertificationFolder } from "@/components/stack/certification-folder"
import {
  CERTIFICATION_ISSUERS,
  LEARNING_ARCHIVE_HERO,
} from "@/lib/certifications-data"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

export interface CertificationFolderGridProps {
  className?: string
}

export function CertificationFolderGrid({
  className,
}: CertificationFolderGridProps) {
  const { lang } = useLanguage()

  const [activeFolderId, setActiveFolderId] = React.useState<
    "dicoding" | "linkedin" | null
  >(null)
  const [selectedCertId, setSelectedCertId] = React.useState<string | null>(
    null
  )

  // Global Escape key handler to close active detail or active folder
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedCertId !== null) {
          setSelectedCertId(null)
        } else if (activeFolderId !== null) {
          setActiveFolderId(null)
        }
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
  }, [activeFolderId, selectedCertId])

  const handleToggleFolder = (id: "dicoding" | "linkedin") => {
    setActiveFolderId((current) => {
      if (current === id) {
        setSelectedCertId(null)
        return null
      }
      setSelectedCertId(null)
      return id
    })
  }

  const handleSelectCert = (certId: string) => {
    setSelectedCertId((current) => (current === certId ? null : certId))
  }

  const handleCloseDetail = () => {
    setSelectedCertId(null)
  }

  const sectionIndex = LEARNING_ARCHIVE_HERO.sectionIndex
  const sectionTitle = LEARNING_ARCHIVE_HERO.title[lang]
  const sectionSubtitle = LEARNING_ARCHIVE_HERO.description[lang]
  const summary = LEARNING_ARCHIVE_HERO.summary

  return (
    <section
      id="certifications-section"
      aria-labelledby="certifications-heading"
      className={cn("w-full space-y-6 sm:space-y-8", className)}
    >
      {/* =========================================================
          SECTION 02 HEADER & PLATFORM STATS
          ========================================================= */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-1.5">
          <p className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {sectionIndex}
          </p>

          <h2
            id="certifications-heading"
            className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl"
          >
            {sectionTitle}
          </h2>

          <p className="font-sans text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {sectionSubtitle}
          </p>
        </div>

        {/* Collection Summary Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
          <div className="flex items-center gap-1.5 rounded-full border border-border/50 bg-card/60 px-3 py-1 font-mono text-xs font-medium text-foreground backdrop-blur-sm">
            <Award aria-hidden="true" className="size-3.5 text-primary" />
            <span>{summary.certificatesLabel[lang]}</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-border/50 bg-card/60 px-3 py-1 font-mono text-xs font-medium text-foreground backdrop-blur-sm">
            <Layers
              aria-hidden="true"
              className="size-3.5 text-muted-foreground"
            />
            <span>{summary.platformsLabel[lang]}</span>
          </div>
        </div>
      </div>

      {/* =========================================================
          TWO HYBRID CERTIFICATION FOLDERS GRID
          ========================================================= */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <CertificationFolder
          issuer={CERTIFICATION_ISSUERS.dicoding}
          isOpen={activeFolderId === "dicoding"}
          onToggle={() => handleToggleFolder("dicoding")}
          selectedCertId={selectedCertId}
          onSelectCert={handleSelectCert}
          onCloseDetail={handleCloseDetail}
        />

        <CertificationFolder
          issuer={CERTIFICATION_ISSUERS.linkedin}
          isOpen={activeFolderId === "linkedin"}
          onToggle={() => handleToggleFolder("linkedin")}
          selectedCertId={selectedCertId}
          onSelectCert={handleSelectCert}
          onCloseDetail={handleCloseDetail}
        />
      </div>

      {/* =========================================================
          COMPLETE INLINE CERTIFICATION ARCHIVE (ALL 38 + OTHERS)
          ========================================================= */}
      <div className="pt-2 sm:pt-4">
        <CertificationArchive />
      </div>
    </section>
  )
}
