"use client"

import * as React from "react"

import { subpages } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"
import { KineticHeading } from "@/components/kinetic-heading"

export function PortfolioHero() {
  const headingText = useT(subpages.portfolio.title)
  const descriptionText = useT(subpages.portfolio.description)

  return (
    <section className="relative flex w-full flex-col items-center justify-center pt-2 pb-6 text-center sm:pt-4 sm:pb-8 lg:pb-10">
      <KineticHeading text={headingText} motionKey="portfolio" />
      <p className="mx-auto mt-4 max-w-2xl px-4 font-sans text-sm leading-relaxed text-pretty text-muted-foreground sm:mt-6 sm:text-base lg:text-lg">
        {descriptionText}
      </p>
    </section>
  )
}
