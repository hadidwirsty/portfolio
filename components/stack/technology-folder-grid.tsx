"use client"

import * as React from "react"

import { TechnologyPhysicalFolder } from "@/components/stack/technology-physical-folder"
import { useT } from "@/lib/language-context"
import { TECH_CATEGORIES, TECH_STACK_HERO } from "@/lib/tech-stack-data"
import { cn } from "@/lib/utils"

export interface TechnologyFolderGridProps {
  className?: string
}

export function TechnologyFolderGrid({ className }: TechnologyFolderGridProps) {
  const [activePinnedId, setActivePinnedId] = React.useState<string | null>(
    null
  )

  const sectionIndex = TECH_STACK_HERO.sectionIndex
  const sectionTitle = useT(TECH_STACK_HERO.sectionTitle)
  const sectionSubtitle = useT(TECH_STACK_HERO.sectionSubtitle)

  // Global Escape key handler to close any active folder
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activePinnedId !== null) {
        setActivePinnedId(null)
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
  }, [activePinnedId])

  const handleToggle = (id: string) => {
    setActivePinnedId((current) => (current === id ? null : id))
  }

  return (
    <section
      id="toolkit"
      aria-labelledby="toolkit-heading"
      className={cn("w-full space-y-6 sm:space-y-8", className)}
    >
      {/* =========================================================
          SECTION 01 HEADER
          ========================================================= */}
      <div className="space-y-1.5">
        <p className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {sectionIndex}
        </p>

        <h2
          id="toolkit-heading"
          className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl"
        >
          {sectionTitle}
        </h2>

        <p className="max-w-2xl font-sans text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {sectionSubtitle}
        </p>
      </div>

      {/* =========================================================
          SIX INTERACTIVE PHYSICAL TECHNOLOGY FOLDERS GRID
          All 6 categories use the unified physical monochrome folder design
          ========================================================= */}
      <div className="grid grid-cols-1 items-end gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {TECH_CATEGORIES.map((category) => (
          <TechnologyPhysicalFolder
            key={category.id}
            category={category}
            isPinned={activePinnedId === category.id}
            onTogglePin={() => handleToggle(category.id)}
          />
        ))}
      </div>
    </section>
  )
}
