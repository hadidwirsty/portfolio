"use client"

import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/section-heading"
import { experience, nav, projects, ui } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"

function ExperienceSection() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16 sm:py-24"
    >
      <SectionHeading index="01" title={nav.experience} />

      <div className="flex flex-col gap-10">
        {experience.map((entry) => (
          <ExperienceCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  )
}

function ExperienceCard({ entry }: { entry: (typeof experience)[number] }) {
  const role = useT(entry.role)
  const period = useT(entry.period)
  const location = useT(entry.location)
  const employmentType = useT(entry.employmentType)
  const relatedLabel = useT(ui.keyProjects)
  const relatedProjects = projects.filter((p) =>
    entry.projectIds.includes(p.id)
  )

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[10rem_1fr] sm:gap-8">
      <div className="text-sm text-muted-foreground">
        <p className="font-mono text-xs">{period}</p>
        <p className="mt-1">{location}</p>
        <p className="mt-1">{employmentType}</p>
      </div>

      <div className="border-l border-border/70 pl-6">
        <h3 className="font-heading text-lg font-medium">{role}</h3>
        <p className="text-sm text-muted-foreground">{entry.company}</p>

        <ul className="mt-4 flex flex-col gap-2.5">
          {entry.points.map((point, i) => (
            <PointItem key={i} point={point} />
          ))}
        </ul>

        {relatedProjects.length > 0 && (
          <div className="mt-5">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">
              {relatedLabel}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {relatedProjects.map((p) => (
                <Badge key={p.id} variant="outline">
                  {p.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function PointItem({
  point,
}: {
  point: (typeof experience)[number]["points"][number]
}) {
  const text = useT(point)
  return (
    <li className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
      <span className="mt-2 size-1 shrink-0 rounded-full bg-amber-500" />
      {text}
    </li>
  )
}

export { ExperienceSection }
