"use client"

import * as React from "react"
import { ExternalLink, X, ShieldCheck } from "lucide-react"

import {
  type CertificationItem,
  getCategoryById,
} from "@/lib/certifications-data"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

export interface CertificateDetailProps {
  cert: CertificationItem
  issuerName: string
  onClose: () => void
  className?: string
}

export function CertificateDetail({
  cert,
  issuerName,
  onClose,
  className,
}: CertificateDetailProps) {
  const { lang } = useLanguage()

  const category = getCategoryById(cert.categoryId)
  const categoryTitle = category ? category.title[lang] : undefined

  const credentialLabel =
    lang === "id" ? "Buka Kredensial Resmi" : "View Official Credential"
  const closeLabel = lang === "id" ? "Tutup Detail" : "Close Details"

  return (
    <div
      role="region"
      aria-label={`Detail sertifikat: ${cert.title}`}
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-2xl p-4 sm:p-5",
        "border border-border/60 bg-card/95 text-foreground shadow-md backdrop-blur-md",
        "transition-all duration-300",
        className
      )}
    >
      {/* Top Header: Issuer label + Close button */}
      <div className="flex items-center justify-between border-b border-border/40 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck aria-hidden="true" className="size-4 text-primary" />
          <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {issuerName}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>

      {/* Middle: Title & Metadata */}
      <div className="my-3 space-y-2">
        {categoryTitle && (
          <span className="inline-block font-mono text-[10px] font-medium tracking-wider text-muted-foreground/80 uppercase">
            {categoryTitle}
          </span>
        )}

        <h4 className="font-heading text-base leading-snug font-bold tracking-tight text-foreground sm:text-lg">
          {cert.title}
        </h4>

        {/* Metadata badges: ID & Period */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          {cert.certificateId && (
            <span className="rounded border border-border/50 bg-muted/60 px-2 py-0.5 text-muted-foreground">
              ID:{" "}
              <span className="font-semibold text-foreground">
                {cert.certificateId}
              </span>
            </span>
          )}

          {cert.issuedAt && (
            <span className="rounded border border-border/50 bg-muted/60 px-2 py-0.5 text-muted-foreground">
              {lang === "id" ? "Diterbitkan: " : "Issued: "}
              <span className="text-foreground">{cert.issuedAt}</span>
            </span>
          )}
        </div>
      </div>

      {/* Bottom Footer Action: Only render verified credential link when available */}
      <div className="border-t border-border/40 pt-3">
        {cert.credentialUrl ? (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold",
              "border border-border/60 bg-primary/10 text-primary transition-all duration-200",
              "hover:border-primary hover:bg-primary/20",
              "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            )}
          >
            <span>{credentialLabel}</span>
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
        ) : (
          <span className="font-mono text-xs text-muted-foreground">
            {lang === "id"
              ? "Tautan kredensial belum tersedia"
              : "Credential link unavailable"}
          </span>
        )}
      </div>
    </div>
  )
}
