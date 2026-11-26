"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, Folder, FolderOpen } from "lucide-react"

import { CertificateDetail } from "@/components/stack/certificate-detail"
import { CertificateDocumentPreview } from "@/components/stack/certificate-document-preview"
import { Badge } from "@/components/ui/badge"
import {
  getFeaturedCertificatesByIssuer,
  getIssuerCount,
} from "@/lib/certifications-data"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

import type { CertificationIssuer } from "@/lib/certifications-data"

export interface CertificationFolderProps {
  issuer: CertificationIssuer
  isOpen: boolean
  onToggle: () => void
  selectedCertId: string | null
  onSelectCert: (certId: string) => void
  onCloseDetail: () => void
  className?: string
}

export function CertificationFolder({
  issuer,
  isOpen,
  onToggle,
  selectedCertId,
  onSelectCert,
  onCloseDetail,
  className,
}: CertificationFolderProps) {
  const { lang } = useLanguage()
  const contentId = React.useId()
  const toggleButtonRef = React.useRef<HTMLButtonElement>(null)
  const selectedButtonRef = React.useRef<HTMLButtonElement>(null)
  const featuredCerts = getFeaturedCertificatesByIssuer(issuer.id)
  const selectedCert = isOpen
    ? featuredCerts.find((cert) => cert.id === selectedCertId)
    : undefined

  const certCount = getIssuerCount(issuer.id)
  const certCountLabel =
    lang === "id"
      ? `${certCount} Sertifikat Kursus`
      : `${certCount} Course Certificates`

  const actionLabel =
    lang === "id"
      ? `${isOpen ? "Tutup folder" : "Buka folder"} ${issuer.name}`
      : `${isOpen ? "Close" : "Open"} ${issuer.name} folder`

  const handleCloseDetailWithFocus = () => {
    const selectedButton = selectedButtonRef.current
    onCloseDetail()
    selectedButton?.focus()
  }

  const handleEscape = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || event.defaultPrevented || !isOpen) return

    event.preventDefault()
    event.stopPropagation()
    if (event.repeat) return

    if (selectedCert) {
      handleCloseDetailWithFocus()
    } else {
      onToggle()
      toggleButtonRef.current?.focus()
    }
  }

  return (
    <article
      onKeyDown={handleEscape}
      className={cn(
        "@container relative flex w-full flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/70 text-left shadow-xs transition-colors",
        "hover:border-border",
        isOpen && "border-border bg-card/90 shadow-lg",
        className
      )}
    >
      <div className="px-5 pt-5 sm:px-6 sm:pt-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {issuer.name}
          </h3>
          <Badge variant="outline" className="font-mono">
            {certCountLabel}
          </Badge>
        </div>
        <p className="mt-1 font-sans text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {issuer.localizedDescription[lang]}
        </p>
      </div>

      <div className="px-5 py-4 sm:px-6">
        <button
          ref={toggleButtonRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-xl border border-border/60 bg-background/70 px-4 py-2.5 font-mono text-xs font-semibold text-foreground transition-colors hover:border-border hover:bg-background",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
            isOpen && "border-primary/40 bg-primary/5 text-primary"
          )}
        >
          <span className="flex items-center gap-2">
            {isOpen ? (
              <FolderOpen aria-hidden="true" className="size-4 shrink-0" />
            ) : (
              <Folder aria-hidden="true" className="size-4 shrink-0" />
            )}
            {actionLabel}
          </span>
          {isOpen ? (
            <ChevronUp aria-hidden="true" className="size-4 shrink-0" />
          ) : (
            <ChevronDown aria-hidden="true" className="size-4 shrink-0" />
          )}
        </button>
      </div>

      {!isOpen && (
        <div
          aria-hidden="true"
          data-certificate-stack
          className="pointer-events-none relative h-28 overflow-hidden sm:h-32"
        >
          <div className="absolute inset-x-0 bottom-[-2rem] mx-auto flex w-fit items-end justify-center">
            {featuredCerts.map((cert, index) => (
              <span
                key={cert.id}
                className={cn(
                  "flex h-24 w-16 justify-center rounded-t-lg border border-border bg-background pt-3 shadow-xs",
                  index === 0 && "translate-x-5 translate-y-1 -rotate-12",
                  index === 1 && "z-10 -translate-y-2",
                  index === 2 && "-translate-x-5 translate-y-1 rotate-12"
                )}
              >
                <span className="h-1 w-7 rounded-full bg-muted-foreground/40" />
              </span>
            ))}
          </div>
          <svg
            className="absolute inset-x-0 bottom-0 z-20 h-12 w-full"
            viewBox="0 0 400 60"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 20 L 130 20 C 150 20, 160 4, 180 4 L 376 4 C 390 4, 400 12, 400 24 L 400 60 L 0 60 Z"
              className="fill-card stroke-border/60"
            />
          </svg>
        </div>
      )}

      <div id={contentId} hidden={!isOpen}>
        {isOpen && (
          <div className="space-y-4 px-5 pb-5 sm:px-6 sm:pb-6">
            <ul className="grid grid-cols-1 gap-3 @min-[30rem]:grid-cols-3">
              {featuredCerts.map((cert, index) => (
                <li key={cert.id} className="min-w-0">
                  <CertificateDocumentPreview
                    ref={
                      cert.id === selectedCertId ? selectedButtonRef : undefined
                    }
                    cert={cert}
                    index={index}
                    isSelected={cert.id === selectedCertId}
                    onSelect={() => onSelectCert(cert.id)}
                  />
                </li>
              ))}
            </ul>

            {selectedCert && (
              <CertificateDetail
                cert={selectedCert}
                issuerName={issuer.name}
                onClose={handleCloseDetailWithFocus}
              />
            )}
          </div>
        )}
      </div>
    </article>
  )
}
