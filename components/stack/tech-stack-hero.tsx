"use client"

import * as React from "react"
import Image from "next/image"

import { KineticHeading } from "@/components/kinetic-heading"
import { useT } from "@/lib/language-context"
import type { PublicTechHero } from "@/lib/public-tech-stack"

export function TechStackHero({ hero }: { hero: PublicTechHero }) {
  const title = useT(hero.title)
  const description = useT(hero.description)
  const coreHeading = useT(hero.coreHeading)

  return (
    <header className="relative flex w-full flex-col items-center pt-2 sm:pt-6">
      {/* 1. Kinetic Editorial Heading with zero negative margin peek */}
      <div className="w-full text-center">
        <KineticHeading
          text={title}
          motionKey="stack"
          as="h1"
          peek="0"
          className="text-3xl tracking-tight sm:text-5xl lg:text-6xl"
        />
      </div>

      {/* 2. Responsive Subtitle Paragraph with deliberate spacing and comfortable font */}
      <p className="mx-auto mt-6 max-w-xl text-center font-sans text-sm leading-relaxed text-pretty text-muted-foreground sm:mt-8 sm:text-base lg:max-w-2xl">
        {description}
      </p>

      {/* 3. Always-Visible Simplified Core Stack Section */}
      <div className="mt-8 flex flex-col items-center gap-3.5 sm:mt-10">
        <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          {coreHeading}
        </span>

        <div
          role="region"
          aria-label={coreHeading}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        >
          {hero.coreStack.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-3.5 py-1.5 font-mono text-xs font-medium text-foreground shadow-2xs backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card/90"
            >
              <Image
                src={item.icon}
                alt=""
                width={18}
                height={18}
                className="size-4 shrink-0 object-contain"
                unoptimized
                aria-hidden="true"
              />
              <span className="font-semibold">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
