"use client"

import { motion, useReducedMotion } from "framer-motion"
import { FileText } from "lucide-react"

import { getCategoryById } from "@/lib/certifications-data"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

import type { Ref } from "react"
import type { CertificationItem } from "@/lib/certifications-data"

export interface CertificateDocumentPreviewProps {
  cert: CertificationItem
  index: number
  isSelected: boolean
  onSelect: () => void
  ref?: Ref<HTMLButtonElement>
}

export function CertificateDocumentPreview({
  cert,
  index,
  isSelected,
  onSelect,
  ref,
}: CertificateDocumentPreviewProps) {
  const { lang } = useLanguage()
  const shouldReduceMotion = useReducedMotion()
  const categoryTitle = getCategoryById(cert.categoryId)?.title[lang]

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={isSelected}
      onClick={onSelect}
      className="group flex h-full w-full min-w-0 overflow-hidden rounded-xl text-left focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <motion.span
        className={cn(
          "pointer-events-none flex min-h-28 w-full min-w-0 flex-col gap-2 rounded-xl border border-border bg-background p-3 text-foreground shadow-xs transition-colors group-hover:border-primary/60 group-hover:bg-muted",
          isSelected && "border-primary bg-muted"
        )}
        initial={shouldReduceMotion ? false : { y: 14, opacity: 0.35 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.22,
          delay: shouldReduceMotion ? 0 : index * 0.045,
          ease: "easeOut",
        }}
      >
        <span className="flex items-start gap-2 text-muted-foreground">
          <FileText aria-hidden="true" className="size-3.5 shrink-0" />
          {categoryTitle && (
            <span className="font-mono text-[10px] leading-tight">
              {categoryTitle}
            </span>
          )}
        </span>
        <span className="font-heading text-xs leading-snug font-bold break-words sm:text-sm">
          {cert.title}
        </span>
      </motion.span>
    </button>
  )
}
