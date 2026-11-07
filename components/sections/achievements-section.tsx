"use client"

import * as React from "react"
import { Award, Calendar, HeartHandshake, Trophy, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import {
  achievements,
  nav,
  organizations,
  ui,
  volunteering,
  type AchievementEntry,
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

        {/* Achievements / Awards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {achievements.map((item, idx) => (
            <AchievementCard
              key={item.title.id}
              item={item}
              isFirst={idx === 0}
            />
          ))}
        </div>

        {/* Organizations & Volunteering Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Organizations Card */}
          <Card className="border-border/70 bg-card/80 p-6 shadow-2xs backdrop-blur-xs transition-all duration-200 hover:border-border hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2.5 border-b border-border/60 p-0 pb-4">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="size-4" />
              </div>
              <CardTitle className="font-heading text-sm font-medium tracking-wide uppercase">
                {orgLabel}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-0 pt-4">
              {organizations.map((org) => (
                <OrgRow key={`${org.org}-${org.period}`} entry={org} />
              ))}
            </CardContent>
          </Card>

          {/* Volunteering Card */}
          <Card className="border-border/70 bg-card/80 p-6 shadow-2xs backdrop-blur-xs transition-all duration-200 hover:border-border hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-2.5 border-b border-border/60 p-0 pb-4">
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <HeartHandshake className="size-4" />
              </div>
              <CardTitle className="font-heading text-sm font-medium tracking-wide uppercase">
                {volunteerLabel}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-0 pt-4">
              {volunteering.map((org) => (
                <OrgRow key={`${org.org}-${org.period}`} entry={org} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function AchievementCard({
  item,
  isFirst,
}: {
  item: AchievementEntry
  isFirst: boolean
}) {
  const title = useT(item.title)

  return (
    <Card className="flex flex-row items-start gap-4 border-border/70 bg-card/80 p-5 shadow-2xs backdrop-blur-xs transition-all duration-200 hover:border-border hover:shadow-md">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
        {isFirst ? <Trophy className="size-5" /> : <Award className="size-5" />}
      </div>
      <CardContent className="space-y-1 p-0">
        <p className="font-heading text-sm leading-snug font-medium text-foreground">
          {title}
        </p>
        <p className="text-xs text-muted-foreground">{item.issuer}</p>
        <span className="flex items-center gap-1 font-mono text-[0.7rem] text-muted-foreground/80">
          <Calendar className="size-2.5" />
          {item.period}
        </span>
      </CardContent>
    </Card>
  )
}

function OrgRow({ entry }: { entry: OrganizationEntry }) {
  const role = useT(entry.role)

  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <div>
        <p className="font-medium text-foreground/90">{role}</p>
        <p className="text-xs text-muted-foreground">{entry.org}</p>
      </div>
      <span className="shrink-0 font-mono text-[0.7rem] text-muted-foreground">
        {entry.period}
      </span>
    </div>
  )
}

export { AchievementsSection }
