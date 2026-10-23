"use client"

import { useT } from "@/lib/language-context"
import type { Bi } from "@/lib/cv-data"
import { cn } from "@/lib/utils"

function SectionHeading({
  index,
  title,
  className,
}: {
  index: string
  title: Bi
  className?: string
}) {
  const label = useT(title)

  return (
    <div className={cn("mb-10 flex items-baseline gap-3 sm:mb-14", className)}>
      <span className="font-mono text-xs text-amber-600 dark:text-amber-400">
        {index}
      </span>
      <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
        {label}
      </h2>
      <div className="ml-2 hidden flex-1 border-t border-border sm:block" />
    </div>
  )
}

export { SectionHeading }
