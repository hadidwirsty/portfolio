"use client"

import * as React from "react"
import Link from "next/link"
import { Building2, Calendar, ExternalLink, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LetterRoll } from "@/components/ui/letter-roll"
import { replaceContextualFragment } from "@/hooks/use-contextual-fragment"
import { useLanguage } from "@/lib/language-context"
import type { PublicProjectCard } from "@/lib/public-portfolio-data"
import {
  getProjectFragment,
  getSkillFragment,
} from "@/lib/skills-portfolio-navigation"

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

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
    >
      <DialogContent
        hideCloseButton
        className="inset-x-0 top-auto bottom-0 flex h-[92dvh] w-full max-w-full translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-t-3xl rounded-b-none border-x-0 border-b-0 p-0 sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:h-auto sm:max-h-[88dvh] sm:w-[calc(100%-2.5rem)] sm:max-w-3xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:border"
      >
        <DialogDescription className="sr-only">
          {project.shortDescription[lang]}
        </DialogDescription>

        <DialogHeader className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 border-b border-border/60 bg-background px-5 pt-3 pb-4 sm:px-8 sm:pt-4 sm:pb-5">
          <DialogTitle className="font-heading text-2xl leading-tight font-bold wrap-break-word sm:text-3xl">
            {project.name}
          </DialogTitle>
          <DialogClose
            className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-card/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label={lang === "id" ? "Tutup dialog" : "Close dialog"}
          >
            <X aria-hidden="true" className="size-4" />
          </DialogClose>

          <div className="col-span-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm leading-snug text-muted-foreground">
            {project.roleLabel && (
              <span className="font-medium text-foreground">
                {project.roleLabel[lang]}
              </span>
            )}
            <span className="flex min-w-0 items-baseline gap-1.5">
              <Building2
                aria-hidden="true"
                className="mt-0.5 size-3.5 shrink-0 self-start"
              />
              <span className="wrap-break-word">{project.company[lang]}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar aria-hidden="true" className="size-3.5 shrink-0" />
              {project.period[lang]}
            </span>
          </div>
        </DialogHeader>

        <div
          key={project.ref}
          role="region"
          aria-label={lang === "id" ? "Detail proyek" : "Project details"}
          tabIndex={0}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset sm:px-8 sm:pt-5 sm:pb-7"
        >
          <div className="max-w-[68ch] space-y-6 sm:space-y-7">
            <section className="space-y-1.5">
              <h3 className="text-base font-semibold">
                {lang === "id" ? "Ringkasan proyek" : "Project Overview"}
              </h3>
              <p className="text-base leading-relaxed text-foreground/90">
                {project.description[lang]}
              </p>
            </section>

            <section className="space-y-1.5">
              <h3 className="text-base font-semibold">
                {lang === "id" ? "Kontribusi saya" : "My Contribution"}
              </h3>
              <p className="text-base leading-relaxed text-foreground/90">
                {project.role[lang]}
              </p>
            </section>

            {project.highlights && project.highlights.length > 0 && (
              <section className="space-y-2">
                <h3 className="text-base font-semibold">
                  {lang === "id" ? "Sorotan proyek" : "Project Highlights"}
                </h3>
                <ul className="flex flex-wrap gap-x-6 gap-y-3 rounded-xl border border-border/60 bg-muted/25 px-4 py-3 sm:px-5">
                  {project.highlights.map(({ value, label }) => (
                    <li key={label.en} className="min-w-0 flex-1 basis-28">
                      <span className="block font-mono text-2xl leading-tight font-semibold tracking-tight tabular-nums">
                        {value}
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                        {label[lang]}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.technicalDetails &&
              project.technicalDetails.length > 0 && (
                <section className="space-y-2">
                  <h3 className="text-base font-semibold">
                    {lang === "id" ? "Detail teknis" : "Technical Details"}
                  </h3>
                  <ul className="divide-y divide-border/60 border-y border-border/60">
                    {project.technicalDetails.map(({ title, description }) => (
                      <li key={title.en} className="space-y-1 py-3">
                        <h4 className="text-base leading-snug font-medium">
                          {title[lang]}
                        </h4>
                        <p className="text-base leading-relaxed text-muted-foreground">
                          {description[lang]}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

            <section className="space-y-2.5">
              <h3 className="text-base font-semibold">
                {lang === "id" ? "Teknologi" : "Technology Stack"}
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.tech.map((technology) => (
                  <Badge
                    key={technology}
                    variant="outline"
                    className="max-w-full rounded-md border-border/60 bg-muted/25 px-2.5 py-1 font-mono text-xs font-normal whitespace-normal text-foreground/90"
                  >
                    <span>
                      {project.technologyLinks[technology]?.map(
                        ({ text, techId }) =>
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
                      ) ?? technology}
                    </span>
                  </Badge>
                ))}
              </div>
            </section>
          </div>
        </div>

        {project.link && (
          <div className="flex shrink-0 border-t border-border/60 bg-background px-5 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:justify-end sm:px-8 sm:py-3">
            <Button
              className="h-11 w-full cursor-pointer gap-2.5 rounded-full px-5 sm:w-auto"
              render={
                <a href={project.link} target="_blank" rel="noreferrer" />
              }
            >
              <LetterRoll
                text={lang === "id" ? "Kunjungi Proyek" : "Visit Project"}
                hoverTarget="parent"
              />
              <ExternalLink aria-hidden="true" className="size-4" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
