"use client"

import { useT } from "@/lib/language-context"
import { subpages } from "@/lib/cv-data"

interface VexooSubpageIntroProps {
  pageKey: keyof typeof subpages
}

export function VexooSubpageIntro({ pageKey }: VexooSubpageIntroProps) {
  const page = subpages[pageKey]
  const title = useT(page.title)
  const description = useT(page.description)

  return (
    <div>
      <h1 className="font-sans text-5xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {description}
      </p>
    </div>
  )
}
