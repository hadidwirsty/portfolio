"use client"

import * as React from "react"

import { subpages } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"
import { KineticHeading } from "@/components/kinetic-heading"

export function PortfolioHero() {
  const headingText = useT(subpages.portfolio.title)
  const descriptionText = useT(subpages.portfolio.description)

  return (
    <section className="relative flex w-full flex-col items-center justify-center gap-4 sm:gap-6">
      <KineticHeading text={headingText} motionKey="portfolio" />
      <p className="max-w-xl text-center font-mono text-xs leading-relaxed text-pretty text-muted-foreground sm:text-sm lg:max-w-2xl">
        {descriptionText}
      </p>
    </section>
  )
}
