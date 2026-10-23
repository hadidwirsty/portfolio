"use client"

import { Award } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import {
  achievements,
  nav,
  organizations,
  ui,
  volunteering,
  type OrganizationEntry,
} from "@/lib/cv-data"
import { useT } from "@/lib/language-context"

function AchievementsSection() {
  const orgLabel = useT(ui.organization)
  const volunteerLabel = useT(ui.volunteering)

  return (
    <section
      id="achievements"
      className="scroll-mt-20 bg-muted/30 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading index="06" title={nav.achievements} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {achievements.map((item) => (
            <AchievementCard key={item.title.id} item={item} />
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-heading text-sm font-medium tracking-wide uppercase">
              {orgLabel}
            </h3>
            <div className="mt-4 flex flex-col gap-4">
              {organizations.map((org) => (
                <OrgRow key={`${org.org}-${org.period}`} entry={org} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-heading text-sm font-medium tracking-wide uppercase">
              {volunteerLabel}
            </h3>
            <div className="mt-4 flex flex-col gap-4">
              {volunteering.map((org) => (
                <OrgRow key={`${org.org}-${org.period}`} entry={org} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AchievementCard({ item }: { item: (typeof achievements)[number] }) {
  const title = useT(item.title)
  return (
    <Card className="flex-row items-start gap-4 p-5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
        <Award className="size-4" />
      </div>
      <CardContent className="gap-1 p-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">
          {item.issuer} · {item.period}
        </p>
      </CardContent>
    </Card>
  )
}

function OrgRow({ entry }: { entry: OrganizationEntry }) {
  const role = useT(entry.role)
  return (
    <div className="text-sm">
      <p className="font-medium">{role}</p>
      <p className="text-xs text-muted-foreground">
        {entry.org} · {entry.period}
      </p>
    </div>
  )
}

export { AchievementsSection }
