"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { CertificateDetail } from "@/components/stack/certificate-detail"
import { CertificationArchive } from "@/components/stack/certification-archive"
import { CertificationFolder } from "@/components/stack/certification-folder"
import {
  CERTIFICATION_ISSUERS,
  getTotalCertificatesCount,
  LEARNING_ARCHIVE_HERO,
} from "@/lib/certifications-data"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

import type { CertificateRecord } from "@/components/stack/certificate-sticker"

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
  const handleToggleFolder = (id: "dicoding" | "linkedin") => {
    setActiveFolderId((current) => (current === id ? null : id))
  }

  const sectionIndex = LEARNING_ARCHIVE_HERO.sectionIndex[lang]
  const sectionTitle = LEARNING_ARCHIVE_HERO.title[lang]
  const totalCount = getTotalCertificatesCount()
  const sectionSubtitle =
    lang === "id"
      ? `${totalCount} sertifikat kursus dari Dicoding Indonesia dan LinkedIn Learning.`
      : `${totalCount} course certificates from Dicoding Indonesia and LinkedIn Learning.`

  return (
    <DialogPrimitive.Root<CertificateRecord>>
      {({ payload }) => (
        <>
          <section
            id="certifications-section"
            aria-labelledby="certifications-heading"
            className={cn("w-full space-y-6 sm:space-y-8", className)}
          >
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

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
              <CertificationFolder
                issuer={CERTIFICATION_ISSUERS.dicoding}
                isOpen={activeFolderId === "dicoding"}
                onToggle={() => handleToggleFolder("dicoding")}
              />

              <CertificationFolder
                issuer={CERTIFICATION_ISSUERS.linkedin}
                isOpen={activeFolderId === "linkedin"}
                onToggle={() => handleToggleFolder("linkedin")}
              />
            </div>

            <div className="pt-2 sm:pt-4">
              <CertificationArchive />
            </div>
          </section>
          {payload && <CertificateDetail certificate={payload} />}
        </>
      )}
    </DialogPrimitive.Root>
  )
}
