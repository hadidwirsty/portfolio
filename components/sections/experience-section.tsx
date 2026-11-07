"use client"

import * as React from "react"
import { Briefcase, Building2, Calendar, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/section-heading"
import {
  experience,
  nav,
  projects,
  ui,
  type ExperienceEntry,
} from "@/lib/cv-data"
import { useT } from "@/lib/language-context"

function ExperienceSection() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16 sm:py-24"
    >
      <SectionHeading index="01" title={nav.experience} />

      {/* Stepper Timeline Container */}
      <div className="relative pl-8 before:absolute before:top-3 before:bottom-3 before:left-3.5 before:w-0.5 before:bg-border/80 sm:pl-10 sm:before:left-4.5">
        <div className="flex flex-col gap-12 sm:gap-16">
          {experience.map((entry) => (
            <ExperienceItem key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  const role = useT(entry.role)
  const period = useT(entry.period)
  const location = useT(entry.location)
  const employmentType = useT(entry.employmentType)
  const summary = useT(entry.summary ?? { id: "", en: "" })
  const relatedLabel = useT(ui.keyProjects)

  const relatedProjects = projects.filter((p) =>
    entry.projectIds.includes(p.id)
  )

  return (
    <div className="group relative">
      {/* Timeline Stepper Node */}
      <div className="absolute top-1 -left-[29px] flex size-6 items-center justify-center rounded-full border-2 border-primary bg-background shadow-xs transition-transform duration-200 group-hover:scale-110 sm:-left-[35px] sm:size-7">
        <Briefcase className="size-3 text-primary" />
      </div>

      <div className="rounded-2xl border border-border/70 bg-card/60 p-5 shadow-2xs backdrop-blur-xs transition-all duration-200 hover:border-border hover:bg-card sm:p-7">
        {/* Experience Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h3 className="font-heading text-xl font-medium tracking-tight text-foreground sm:text-2xl">
              {role}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-foreground/85">
              <Building2 className="size-3.5 text-primary/80" />
              {entry.company}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2.5 py-1 font-mono text-xs text-muted-foreground">
              <Calendar className="size-3" />
              {period}
            </span>
            <Badge variant="secondary" className="text-xs">
              {employmentType}
            </Badge>
          </div>
        </div>

        {/* Location / Work Mode */}
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 text-muted-foreground/80" />
          <span>{location}</span>
        </div>

        {/* Executive Summary */}
        {summary && (
          <p className="mt-4 text-xs leading-relaxed text-foreground/85 sm:text-sm">
            {summary}
          </p>
        )}

        {/* Detailed Points */}
        <ul className="mt-5 space-y-3">
          {entry.points.map((point, i) => (
            <PointItem key={i} point={point} />
          ))}
        </ul>

        {/* Related Projects Linkage */}
        {relatedProjects.length > 0 && (
          <div className="mt-6 border-t border-border/60 pt-4">
            <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              {relatedLabel}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {relatedProjects.map((p) => (
                <a
                  key={p.id}
                  href="#projects"
                  className="inline-block transition-transform duration-150 hover:-translate-y-0.5"
                  title={`Lihat proyek ${p.name} di seksi Proyek`}
                >
                  <Badge
                    variant="outline"
                    className="cursor-pointer text-xs transition-colors hover:border-primary/50 hover:bg-primary/5"
                  >
                    {p.name}
                  </Badge>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function PointItem({ point }: { point: ExperienceEntry["points"][number] }) {
  const text = useT(point)

  return (
    <li className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-500/80 dark:bg-emerald-400" />
      <span>{text}</span>
    </li>
  )
}

export { ExperienceSection }
