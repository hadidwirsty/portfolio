"use client"

import * as React from "react"
import { Award, FileText } from "lucide-react"

import {
  type CertificationItem,
  getCategoryById,
} from "@/lib/certifications-data"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

export interface CertificateDocumentPreviewProps {
  cert: CertificationItem
  issuerName: string
  isSelected: boolean
  onSelect: () => void
  isOpen: boolean
  className?: string
}

export function CertificateDocumentPreview({
  cert,
  issuerName,
  isSelected,
  onSelect,
  isOpen,
  className,
}: CertificateDocumentPreviewProps) {
  const { lang } = useLanguage()

  const category = getCategoryById(cert.categoryId)
  const categoryTitle = category ? category.title[lang] : undefined

  const handleClick = (e: React.MouseEvent) => {
    if (!isOpen) return
    e.stopPropagation()
    onSelect()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      e.stopPropagation()
      onSelect()
    }
  }

  return (
    <button
      type="button"
      role="button"
      tabIndex={isOpen ? 0 : -1}
      aria-hidden={!isOpen}
      aria-pressed={isSelected}
      aria-label={`Pilih sertifikat: ${cert.title}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        // Physical monochrome document styling
        "group relative flex h-52 w-38 flex-col justify-between overflow-hidden rounded-xl p-3.5 text-left select-none sm:h-60 sm:w-44 sm:p-4",
        "border border-border/50 bg-zinc-100/95 text-foreground dark:bg-zinc-900/90",
        "shadow-xs transition-all duration-300",
        isOpen
          ? "pointer-events-auto cursor-pointer hover:-translate-y-1 hover:border-border hover:shadow-lg"
          : "pointer-events-none cursor-default",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
        isSelected &&
          "border-primary bg-zinc-50 shadow-md ring-2 ring-primary/20 dark:bg-zinc-900",
        className
      )}
    >
      {/* Subtle paper grid texture */}
      <div className="pointer-events-none absolute inset-0 size-full overflow-hidden opacity-30 dark:opacity-20">
        <svg
          className="size-full stroke-foreground/10"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={`paper-grid-${cert.id}`}
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 12 0 L 0 0 0 12" fill="none" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill={`url(#paper-grid-${cert.id})`}
          />
        </svg>
      </div>

      {/* Top Header: Issuer badge & Icon */}
      <div className="relative z-10 flex items-center justify-between border-b border-border/40 pb-2">
        <span className="max-w-[80%] truncate font-mono text-[9px] font-semibold tracking-wider text-muted-foreground uppercase">
          {issuerName}
        </span>
        <FileText
          aria-hidden="true"
          className="size-3 text-muted-foreground/70"
        />
      </div>

      {/* Document Center: Title & Category */}
      <div className="relative z-10 my-auto space-y-1.5 py-1">
        {categoryTitle && (
          <span className="inline-block font-mono text-[8px] font-medium tracking-wide text-muted-foreground/80 uppercase sm:text-[9px]">
            {categoryTitle}
          </span>
        )}
        <h4 className="line-clamp-3 font-heading text-xs leading-snug font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-[13px]">
          {cert.title}
        </h4>

        {/* Minimal paper lines placeholder */}
        <div className="space-y-1 pt-1 opacity-50">
          <div className="h-0.5 w-full rounded bg-border/80" />
          <div className="h-0.5 w-4/5 rounded bg-border/60" />
          <div className="h-0.5 w-3/5 rounded bg-border/40" />
        </div>
      </div>

      {/* Bottom Footer: Certificate ID & Monogram Seal */}
      <div className="relative z-10 flex items-center justify-between border-t border-border/40 pt-2 font-mono text-[8px] text-muted-foreground sm:text-[9px]">
        <span className="max-w-[70%] truncate">
          {cert.certificateId
            ? `ID: ${cert.certificateId}`
            : "Course Certificate"}
        </span>
        <Award aria-hidden="true" className="size-3 text-muted-foreground/60" />
      </div>
    </button>
  )
}
