"use client"

import * as React from "react"
import Link from "next/link"
import {
  Building2,
  Calendar,
  CheckCircle2,
  Code2,
  ExternalLink,
  Layers,
  Lock,
  X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { replaceContextualFragment } from "@/hooks/use-contextual-fragment"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { PublicProjectCard } from "@/lib/public-portfolio-data"
import { useLanguage, useT } from "@/lib/language-context"
import {
  getProjectFragment,
  getSkillFragment,
} from "@/lib/skills-portfolio-navigation"
import { cn } from "@/lib/utils"

export interface ProjectDetailDialogProps {
  project: PublicProjectCard | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenChangeComplete?: (open: boolean) => void
}

export function ProjectDetailDialog({
  project,
  open,
  onOpenChange,
  onOpenChangeComplete,
}: ProjectDetailDialogProps) {
  const { lang } = useLanguage()

  if (!project) return null

  const isEnterprise = project.category === "enterprise"

  const dossierId = `DOSSIER // ${project.dossierCode}`
  const categoryLabel = isEnterprise
    ? lang === "id"
      ? "Enterprise & B2B"
      : "Enterprise & B2B"
    : lang === "id"
      ? "Produk Mandiri & Full-Stack"
      : "Product & Full-Stack"

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
    >
      <DialogContent
        hideCloseButton
        className={cn(
          "flex flex-col gap-0 overflow-hidden p-0 shadow-2xl transition-all duration-200 outline-none select-text",
          // Mobile: Native Bottom Sheet docked at bottom-0, full width, rounded top, max-h-[88dvh]
          "fixed inset-x-0 top-auto bottom-0 max-h-[88dvh] w-full max-w-full translate-x-0 translate-y-0 rounded-t-3xl rounded-b-none border-x-0 border-t border-b-0 border-border/50 bg-background",
          // Tablet & Desktop: Centered dialog with generous editorial max-width (preserved)
          "sm:top-1/2 sm:right-auto sm:bottom-auto sm:left-1/2 sm:h-auto sm:max-h-[88dvh] sm:w-[calc(100%-2.5rem)] sm:max-w-3xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:border sm:border-border/50",
          "lg:max-h-[90dvh] lg:max-w-4xl"
        )}
      >
        {/* Hidden screen-reader description for WAI-ARIA accessibility compliance */}
        <DialogDescription className="sr-only">
          <TranslatedText entry={project.description} />
        </DialogDescription>

        {/* 1. Header — Sticky Monochromatic & Editorial */}
        <DialogHeader className="sticky top-0 z-20 shrink-0 border-b border-border/50 bg-background/95 px-4.5 pt-3 pb-3.5 backdrop-blur-md sm:px-8 sm:py-5">
          {/* Mobile Bottom-Sheet Pull Handle */}
          <div className="mx-auto mb-2 h-1 w-10 shrink-0 rounded-full bg-muted-foreground/25 sm:hidden" />

          {/* Top Row: Dossier identifier, Category Badge, Project Period, and Dedicated Close Button */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase sm:text-xs">
                {dossierId}
              </span>
              <span className="font-mono text-xs text-muted-foreground/40">
                •
              </span>
              <Badge
                variant={isEnterprise ? "secondary" : "outline"}
                className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase"
              >
                {categoryLabel}
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-1.5 font-mono text-xs text-muted-foreground sm:inline-flex">
                <Calendar className="size-3.5 text-muted-foreground/80" />
                <TranslatedText entry={project.period} />
              </span>

              <DialogClose
                className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border/50 bg-card/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:size-10"
                aria-label={lang === "id" ? "Tutup dialog" : "Close dialog"}
              >
                <X className="size-4" />
                <span className="sr-only">
                  {lang === "id" ? "Tutup dialog" : "Close dialog"}
                </span>
              </DialogClose>
            </div>
          </div>

          {/* Project Title with long title wrapping support */}
          <DialogTitle className="mt-2.5 font-heading text-xl font-bold tracking-tight wrap-break-word text-foreground sm:mt-3 sm:text-2xl md:text-3xl">
            {project.name}
          </DialogTitle>

          {/* Metadata Sub-row: Company, Role & Period for Mobile */}
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground sm:mt-1.5 sm:text-sm">
            <p className="flex items-center gap-1.5 font-medium text-foreground/90">
              <Building2 className="size-3.5 shrink-0 text-primary/80" />
              <TranslatedText entry={project.company} />
            </p>
            <span className="font-mono text-xs text-muted-foreground/40 sm:hidden">
              •
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground sm:hidden">
              <Calendar className="size-3 text-muted-foreground/80" />
              <TranslatedText entry={project.period} />
            </span>
          </div>
        </DialogHeader>

        {/* 2. Scrollable Body — Single Main Scroll Container with overscroll-contain */}
        <div className="flex-1 space-y-5 overflow-y-auto overscroll-contain px-4.5 py-4 sm:space-y-8 sm:px-8 sm:py-7">
          {/* Section A: Project Overview */}
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              <Layers className="size-3.5 text-muted-foreground/80" />
              {lang === "id" ? "Ringkasan Proyek" : "Project Overview"}
            </h4>
            <p className="max-w-prose font-sans text-sm leading-relaxed text-foreground/90 sm:text-base">
              <TranslatedText entry={project.description} />
            </p>
          </div>

          {/* Section B: Role & Scope */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {lang === "id" ? "Kontribusi Saya" : "My Contribution"}
            </h4>
            <div className="rounded-xl border border-border/50 bg-muted/20 p-3.5 sm:p-5">
              <p className="font-sans text-xs leading-relaxed text-foreground/85 sm:text-sm">
                <TranslatedText entry={project.role} />
              </p>
            </div>
          </div>

          {/* Section C: Architecture & Engineering Highlights */}
          {project.bullets && project.bullets.length > 0 && (
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                <CheckCircle2 className="size-3.5 text-emerald-500" />
                {lang === "id"
                  ? "Sorotan Arsitektur & Rekayasa"
                  : "Architecture & Engineering Highlights"}
              </h4>
              <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                {project.bullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/50 p-3.5 transition-colors hover:border-border sm:p-4"
                  >
                    <span className="mt-0.5 shrink-0 font-mono text-[11px] font-bold text-muted-foreground/70 select-none sm:text-xs">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <p className="font-sans text-xs leading-relaxed text-foreground/85 sm:text-sm">
                      <TranslatedText entry={bullet} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section D: Technology Stack */}
          <div className="space-y-2.5">
            <h4 className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              <Code2 className="size-3.5 text-muted-foreground/80" />
              {lang === "id" ? "Tumpukan Teknologi" : "Technology Stack"}
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tech.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="max-w-full rounded-md border-border/50 bg-muted/30 px-2.5 py-1 font-mono text-xs font-normal whitespace-normal text-foreground/90"
                >
                  <span>
                    {project.technologyLinks[t]?.map(({ text, techId }) =>
                      techId ? (
                        <Link
                          key={text}
                          href={`/stack${getSkillFragment(techId)}`}
                          scroll={false}
                          data-skip-page-transition=""
                          onNavigate={() =>
                            replaceContextualFragment(
                              getProjectFragment(project.ref)
                            )
                          }
                          aria-label={`${text} — ${lang === "id" ? "Lihat proyek terkait" : "View related projects"}`}
                          className="inline-flex min-h-6 min-w-6 items-center rounded-sm underline underline-offset-2 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                          {text}
                        </Link>
                      ) : (
                        <React.Fragment key={text}>{text}</React.Fragment>
                      )
                    ) ?? t}
                  </span>
                </Badge>
              ))}
            </div>
          </div>

          {/* Safe bottom spacer */}
          <div className="h-2" />
        </div>

        {/* 3. Footer — Sticky Action Bar */}
        <div className="sticky bottom-0 z-20 shrink-0 border-t border-border/50 bg-background/95 px-4.5 py-3 pb-[max(0.875rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:px-8 sm:py-4">
          <div className="flex flex-row items-center justify-between gap-3">
            {project.link ? (
              <Button
                variant="outline"
                size="sm"
                className="h-9 flex-1 cursor-pointer gap-1.5 rounded-full px-3 text-xs font-medium sm:flex-none sm:px-4"
                render={
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5"
                  />
                }
              >
                <span>
                  {lang === "id" ? "Kunjungi Tautan" : "Visit Project"}
                </span>
                <ExternalLink className="size-3.5 shrink-0" />
              </Button>
            ) : (
              <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <Lock className="size-3.5 shrink-0 text-muted-foreground/70" />
                <span className="truncate">
                  {lang === "id"
                    ? "Tidak ada tautan publik"
                    : "No public link available"}
                </span>
              </div>
            )}

            <DialogClose
              render={
                <Button
                  size="sm"
                  className={cn(
                    "h-9 cursor-pointer rounded-full font-sans text-xs font-medium",
                    project.link ? "flex-1 sm:flex-none sm:px-6" : "px-6"
                  )}
                >
                  {lang === "id" ? "Tutup" : "Close"}
                </Button>
              }
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function TranslatedText({ entry }: { entry: { id: string; en: string } }) {
  const text = useT(entry)
  return <>{text}</>
}
