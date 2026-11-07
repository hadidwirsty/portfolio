"use client"

import * as React from "react"
import {
  Building2,
  Calendar,
  CheckCircle2,
  Code2,
  ExternalLink,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { ProjectEntry } from "@/lib/cv-data"
import { ui } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"
import { getProjectCategory } from "@/lib/projects-filter"

interface ProjectDetailDialogProps {
  project: ProjectEntry | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDetailDialog({
  project,
  open,
  onOpenChange,
}: ProjectDetailDialogProps) {
  const roleLabel = useT(ui.role)
  const techLabel = useT(ui.techStack)

  if (!project) return null

  const category = getProjectCategory(project.id)
  const isEnterprise = category === "enterprise"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[88vh] flex-col overflow-hidden p-0 sm:max-w-2xl">
        {/* Header with Category Badge and Period */}
        <DialogHeader className="border-b border-border/70 bg-muted/20 p-4.5 pr-10 pb-3.5 sm:p-6 sm:pr-12 sm:pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge
              variant={isEnterprise ? "secondary" : "default"}
              className="text-xs"
            >
              {isEnterprise ? "Enterprise & B2B" : "Full-Stack & Produk"}
            </Badge>
            <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
              <Calendar className="size-3" />
              <TranslatedText entry={project.period} />
            </span>
          </div>

          <DialogTitle className="mt-2 text-xl sm:text-2xl">
            {project.name}
          </DialogTitle>

          <p className="flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
            <Building2 className="size-3.5 text-primary/80" />
            <TranslatedText entry={project.company} />
          </p>
        </DialogHeader>

        {/* Scrollable Content Body */}
        <div className="flex-1 space-y-5 overflow-y-auto px-4.5 py-4 text-sm sm:space-y-6 sm:px-6 sm:py-5">
          {/* General Description */}
          <div>
            <h4 className="font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Ringkasan Proyek
            </h4>
            <p className="mt-2 leading-relaxed text-foreground/90">
              <TranslatedText entry={project.description} />
            </p>
          </div>

          {/* Role & Specific Scope */}
          <div>
            <h4 className="font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {roleLabel} & Tanggung Jawab
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              <TranslatedText entry={project.role} />
            </p>
          </div>

          {/* Architecture & Engineering Highlights */}
          {project.bullets && project.bullets.length > 0 && (
            <div>
              <h4 className="font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Sorotan Arsitektur & Rekayasa
              </h4>
              <ul className="mt-2.5 space-y-2">
                {project.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
                    <span>
                      <TranslatedText entry={bullet} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Stack */}
          <div>
            <h4 className="flex items-center gap-1.5 font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              <Code2 className="size-3.5" />
              {techLabel}
            </h4>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <Badge key={t} variant="outline" className="text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Actions */}
        <DialogFooter className="items-center border-t border-border/70 bg-muted/20 p-4 sm:justify-between">
          {project.link ? (
            <Button
              variant="outline"
              size="sm"
              render={
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5"
                />
              }
            >
              Kunjungi Tautan <ExternalLink className="size-3.5" />
            </Button>
          ) : (
            <span className="text-xs text-muted-foreground">
              Dokumentasi internal korporat
            </span>
          )}

          <DialogClose render={<Button size="sm">Tutup</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function TranslatedText({ entry }: { entry: { id: string; en: string } }) {
  const text = useT(entry)
  return <>{text}</>
}
