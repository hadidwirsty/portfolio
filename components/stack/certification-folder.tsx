"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Award, ChevronDown, ChevronUp, Folder, FolderOpen } from "lucide-react"

import { CertificateDetail } from "@/components/stack/certificate-detail"
import { CertificateDocumentPreview } from "@/components/stack/certificate-document-preview"
import {
  type CertificationIssuer,
  getFeaturedCertificatesByIssuer,
  getIssuerCount,
} from "@/lib/certifications-data"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

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
  const shouldReduceMotion = useReducedMotion() ?? false
  const toggleButtonRef = React.useRef<HTMLButtonElement>(null)

  const featuredCerts = React.useMemo(
    () => getFeaturedCertificatesByIssuer(issuer.id),
    [issuer.id]
  )

  const selectedCert = React.useMemo(
    () => featuredCerts.find((cert) => cert.id === selectedCertId),
    [featuredCerts, selectedCertId]
  )

  const certCount = getIssuerCount(issuer.id)
  const certCountLabel =
    lang === "id"
      ? `${certCount} Sertifikat Kursus`
      : `${certCount} Course Certificates`

  const actionLabel = isOpen
    ? lang === "id"
      ? "Tutup Arsip"
      : "Close Archive"
    : lang === "id"
      ? "Buka & Pratinjau Kredensial"
      : "Open & Preview Credentials"

  const handleCloseDetailWithFocus = () => {
    onCloseDetail()
    toggleButtonRef.current?.focus()
  }

  return (
    <article
      className={cn(
        "group relative flex w-full flex-col justify-between overflow-hidden rounded-3xl",
        "border border-border/50 bg-card/70 text-left shadow-xs backdrop-blur-md select-none",
        "transition-all duration-300",
        "hover:border-border hover:shadow-xl hover:shadow-black/10",
        isOpen && "border-border bg-card/90 shadow-lg",
        className
      )}
    >
      {/* =========================================================
          A. FOLDER HEADER & COLLECTION METADATA
          ========================================================= */}
      <div className="relative z-20 flex flex-col p-5 pb-2 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {issuer.id === "dicoding" ? "01 / PLATFORM" : "02 / PLATFORM"}
          </span>

          <div className="flex items-center gap-1.5 rounded-full border border-border/50 bg-background/60 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground backdrop-blur-sm">
            <Award aria-hidden="true" className="size-3.5 text-primary" />
            <span>{certCountLabel}</span>
          </div>
        </div>

        <h3 className="mt-3 font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {issuer.name}
        </h3>

        <p className="mt-1 font-sans text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {issuer.localizedDescription[lang]}
        </p>
      </div>

      {/* =========================================================
          B. REAL FOLDER STAGE: 3 MONOCHROME PAPERS + POCKET SILHOUETTE
          ========================================================= */}
      <div
        id={`cert-folder-content-${issuer.id}`}
        className="relative flex h-72 w-full items-center justify-center overflow-hidden pt-4 pb-2 select-none sm:h-80"
      >
        {/* Subtle radial ambient glow inside stage */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 -top-8 mx-auto size-48 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500",
            isOpen ? "opacity-100" : "opacity-30"
          )}
        />

        {/* 3 Staggered Physical Documents */}
        <div
          className={cn(
            "relative z-10 flex size-full items-center justify-center",
            !isOpen && "pointer-events-none"
          )}
        >
          {featuredCerts.map((cert, index) => {
            const transform = calculatePaperTransform(
              index,
              isOpen,
              shouldReduceMotion
            )

            return (
              <motion.div
                key={cert.id}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={false}
                animate={{
                  x: transform.x,
                  y: transform.y,
                  rotate: transform.rotate,
                  scale: transform.scale,
                  zIndex: cert.id === selectedCertId ? 30 : transform.zIndex,
                }}
                transition={{
                  type: shouldReduceMotion ? "tween" : "spring",
                  stiffness: 300,
                  damping: 26,
                  mass: 0.8,
                  duration: shouldReduceMotion ? 0 : 0.45,
                }}
              >
                <CertificateDocumentPreview
                  cert={cert}
                  issuerName={issuer.name}
                  isSelected={cert.id === selectedCertId}
                  onSelect={() => onSelectCert(cert.id)}
                  isOpen={isOpen}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Physical Front Pocket Silhouette (Curved Tab with soft shadow) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 select-none">
          <svg
            className="h-28 w-full overflow-visible sm:h-32"
            viewBox="0 0 400 160"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter
                id={`pocket-shadow-${issuer.id}`}
                x="-10%"
                y="-10%"
                width="120%"
                height="130%"
              >
                <feDropShadow
                  dx="0"
                  dy="-4"
                  stdDeviation="6"
                  floodOpacity="0.12"
                />
              </filter>
            </defs>
            <path
              d="M 0 32 L 130 32 C 150 32, 160 12, 180 12 L 376 12 C 390 12, 400 22, 400 36 L 400 160 L 0 160 Z"
              className="fill-card/98 stroke-border/50 transition-colors duration-300 dark:fill-card"
              strokeWidth="1"
              filter={`url(#pocket-shadow-${issuer.id})`}
            />
          </svg>
        </div>
      </div>

      {/* =========================================================
          C. SELECTED CERTIFICATE DETAIL INLINE PANEL
          ========================================================= */}
      {isOpen && selectedCert && (
        <div className="relative z-30 px-5 pb-4 sm:px-6">
          <CertificateDetail
            cert={selectedCert}
            issuerName={issuer.name}
            onClose={handleCloseDetailWithFocus}
          />
        </div>
      )}

      {/* =========================================================
          D. FOLDER TOGGLE ACTION FOOTER (Semantic Button)
          ========================================================= */}
      <div className="relative z-20 border-t border-border/40 bg-card/60 p-4 sm:px-6">
        <button
          ref={toggleButtonRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls={`cert-folder-content-${issuer.id}`}
          onClick={onToggle}
          className={cn(
            "flex w-full items-center justify-between rounded-xl px-4 py-2.5 font-mono text-xs font-semibold tracking-wide transition-all duration-200",
            "border border-border/50 bg-background/70 text-foreground shadow-2xs hover:border-border hover:bg-background/95",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
            isOpen && "border-primary/40 bg-primary/5 text-primary"
          )}
        >
          <div className="flex items-center gap-2">
            {isOpen ? (
              <FolderOpen aria-hidden="true" className="size-4 text-primary" />
            ) : (
              <Folder
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
            )}
            <span>{actionLabel}</span>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="hidden text-[11px] font-normal sm:inline">
              {isOpen ? "[Tutup]" : "[Buka 3 Dokumen]"}
            </span>
            {isOpen ? (
              <ChevronUp aria-hidden="true" className="size-4 text-primary" />
            ) : (
              <ChevronDown aria-hidden="true" className="size-4" />
            )}
          </div>
        </button>
      </div>
    </article>
  )
}

/**
 * Calculates deterministic spring positions for the 3 staggered paper cards.
 * Pure deterministic calculation without pseudo-random generators.
 */
function calculatePaperTransform(
  index: number,
  isOpen: boolean,
  shouldReduceMotion: boolean
) {
  if (shouldReduceMotion) {
    return {
      x: 0,
      y: isOpen ? -30 : 10,
      rotate: 0,
      scale: 1,
      zIndex: 10 + index,
    }
  }

  // index 0 = left paper, index 1 = center paper, index 2 = right paper
  if (isOpen) {
    if (index === 0) {
      return {
        x: -64,
        y: -60,
        rotate: -6,
        scale: 0.98,
        zIndex: 11,
      }
    }
    if (index === 1) {
      return {
        x: 0,
        y: -85,
        rotate: 0,
        scale: 1.04,
        zIndex: 15,
      }
    }
    // index 2
    return {
      x: 64,
      y: -60,
      rotate: 6,
      scale: 0.98,
      zIndex: 12,
    }
  }

  // Resting state: staggered peeking out of the pocket
  if (index === 0) {
    return {
      x: -22,
      y: 18,
      rotate: -4,
      scale: 0.9,
      zIndex: 11,
    }
  }
  if (index === 1) {
    return {
      x: 0,
      y: 10,
      rotate: 0,
      scale: 0.93,
      zIndex: 13,
    }
  }
  // index 2
  return {
    x: 22,
    y: 16,
    rotate: 4,
    scale: 0.9,
    zIndex: 12,
  }
}
