"use client"

import * as React from "react"
import {
  Boxes,
  Code2,
  Database,
  Palette,
  ShieldCheck,
  Wrench,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import { nav, skillGroups, type SkillGroup } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"
import { cn } from "@/lib/utils"

const CORE_SKILLS = new Set([
  "TypeScript",
  "React (19/18)",
  "Next.js (App Router, RSC)",
  "Tailwind CSS (v3 & v4)",
  "TanStack Query (React Query)",
  "Vitest",
])

function getGroupIcon(index: number) {
  switch (index) {
    case 0:
      return <Code2 className="size-4 text-primary" />
    case 1:
      return <Palette className="size-4 text-emerald-500" />
    case 2:
      return <Database className="size-4 text-amber-500" />
    case 3:
      return <ShieldCheck className="size-4 text-blue-500" />
    case 4:
      return <Boxes className="size-4 text-purple-500" />
    case 5:
    default:
      return <Wrench className="size-4 text-slate-500" />
  }
}

function SkillsSection() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16 sm:py-24"
    >
      <SectionHeading index="03" title={nav.skills} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, idx) => (
          <SkillGroupCard
            key={group.title.id}
            group={group}
            icon={getGroupIcon(idx)}
          />
        ))}
      </div>
    </section>
  )
}

function SkillGroupCard({
  group,
  icon,
}: {
  group: SkillGroup
  icon: React.ReactNode
}) {
  const title = useT(group.title)

  return (
    <Card className="flex flex-col justify-between border-border/70 bg-card/70 p-5 shadow-2xs backdrop-blur-xs transition-all duration-200 hover:border-border hover:shadow-md">
      <div>
        <CardHeader className="flex flex-row items-center gap-2.5 p-0 pb-3">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted/70">
            {icon}
          </div>
          <CardTitle className="font-heading text-sm font-medium tracking-wide">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {group.items.map((item) => {
              const isCore = CORE_SKILLS.has(item)
              return (
                <Badge
                  key={item}
                  variant={isCore ? "secondary" : "outline"}
                  className={cn(
                    "text-xs transition-all duration-150 select-none",
                    isCore
                      ? "border-primary/20 bg-primary/10 font-semibold text-foreground"
                      : "text-muted-foreground hover:border-border hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  {item}
                </Badge>
              )
            })}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export { SkillsSection }
