"use client"

import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/section-heading"
import { nav, skillGroups } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"

function SkillsSection() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16 sm:py-24"
    >
      <SectionHeading index="03" title={nav.skills} />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <SkillGroupBlock key={group.title.id} group={group} />
        ))}
      </div>
    </section>
  )
}

function SkillGroupBlock({ group }: { group: (typeof skillGroups)[number] }) {
  const title = useT(group.title)
  return (
    <div>
      <h3 className="font-heading text-sm font-medium tracking-wide uppercase">
        {title}
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <Badge key={item} variant="outline">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export { SkillsSection }
