"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import { education, nav, ui } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"

function EducationSection() {
  return (
    <section id="education" className="scroll-mt-20 bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading index="04" title={nav.education} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {education.map((entry) => (
            <EducationCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  )
}

function EducationCard({ entry }: { entry: (typeof education)[number] }) {
  const degree = useT(entry.degree)
  const gpaLabel = useT(ui.gpa)
  const extra = useT(entry.extra ?? { id: "", en: "" })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{entry.institution}</CardTitle>
          <span className="shrink-0 font-mono text-[0.7rem] text-muted-foreground">
            {entry.period}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{degree}</p>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80">
          <span className="text-muted-foreground">{gpaLabel}: </span>
          {entry.score}
        </p>
        {extra && (
          <p className="leading-relaxed text-muted-foreground">{extra}</p>
        )}
      </CardContent>
    </Card>
  )
}

export { EducationSection }
