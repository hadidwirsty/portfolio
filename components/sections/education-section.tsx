"use client"

import * as React from "react"
import { Calendar, GraduationCap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import { education, nav, ui, type EducationEntry } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"

function EducationSection() {
  return (
    <section id="education" className="scroll-mt-20 bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading index="04" title={nav.education} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {education.map((entry) => (
            <EducationCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  )
}

function EducationCard({ entry }: { entry: EducationEntry }) {
  const degree = useT(entry.degree)
  const gpaLabel = useT(ui.gpa)
  const score = useT(entry.score)
  const extra = useT(entry.extra ?? { id: "", en: "" })
  const isUGM = entry.id === "ugm"

  return (
    <Card className="flex flex-col justify-between border-border/70 bg-card/80 p-6 shadow-2xs backdrop-blur-xs transition-all duration-200 hover:border-border hover:shadow-md">
      <div>
        <CardHeader className="flex flex-row items-start justify-between gap-3 p-0 pb-4">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="size-5" />
            </div>
            <div>
              <CardTitle className="font-heading text-lg leading-snug font-medium text-foreground">
                {entry.institution}
              </CardTitle>
              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                {degree}
              </p>
            </div>
          </div>

          <span className="flex shrink-0 items-center gap-1 font-mono text-[0.7rem] text-muted-foreground sm:text-xs">
            <Calendar className="size-3" />
            {entry.period}
          </span>
        </CardHeader>

        <CardContent className="space-y-3 p-0 pt-1 text-sm">
          {/* GPA Score Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{gpaLabel}:</span>
            <Badge
              variant={isUGM ? "default" : "secondary"}
              className="font-mono text-xs font-semibold"
            >
              {score}
            </Badge>
          </div>

          {/* Undergraduate Thesis Box */}
          {extra && (
            <div className="mt-3 rounded-xl border border-border/60 bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
              <p className="mb-1 font-medium text-foreground/90">
                Fokus Skripsi Sarjana:
              </p>
              <p>{extra}</p>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  )
}

export { EducationSection }
