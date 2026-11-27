"use client"

import * as React from "react"

import { TechnologyPhysicalFolder } from "@/components/stack/technology-physical-folder"
import { useT } from "@/lib/language-context"
import type { PublicTechToolkit } from "@/lib/public-tech-stack"
import { cn } from "@/lib/utils"

export interface TechnologyFolderGridProps {
  toolkit: PublicTechToolkit
  className?: string
}

type FolderInteraction = {
  pinned: string | null
  hover: { id: string; dismissed: boolean } | null
}

type FolderAction = {
  type: "enter" | "leave" | "activate" | "dismiss"
  id: string
}

export function previewedFolder(state: FolderInteraction) {
  return state.hover && !state.hover.dismissed ? state.hover.id : null
}

export function updateFolderInteraction(
  state: FolderInteraction,
  { type, id }: FolderAction
): FolderInteraction {
  const { pinned, hover } = state
  const dismissedHover = hover?.id === id ? { id, dismissed: true } : hover
  switch (type) {
    case "enter":
      return hover?.id === id
        ? state
        : { pinned, hover: { id, dismissed: pinned === id } }
    case "leave":
      return hover?.id === id ? { pinned, hover: null } : state
    case "activate":
      return { pinned: pinned === id ? null : id, hover: dismissedHover }
    case "dismiss":
      return { pinned: pinned === id ? null : pinned, hover: dismissedHover }
  }
}

export function TechnologyFolderGrid({
  toolkit,
  className,
}: TechnologyFolderGridProps) {
  const [folders, dispatch] = React.useReducer(updateFolderInteraction, {
    pinned: null,
    hover: null,
  })
  const preview = previewedFolder(folders)

  const sectionIndex = useT(toolkit.sectionIndex)
  const sectionTitle = useT(toolkit.sectionTitle)
  const sectionSubtitle = useT(toolkit.sectionSubtitle)

  // A pointer preview can own Escape while keyboard focus is still on the body.
  React.useEffect(() => {
    if (!preview) return
    const { body } = document
    const dismissPreview = (event: KeyboardEvent) => {
      if (
        event.key !== "Escape" ||
        event.defaultPrevented ||
        event.target !== body ||
        document.activeElement !== body
      )
        return
      event.preventDefault()
      dispatch({ type: "dismiss", id: preview })
    }
    body.addEventListener("keydown", dismissPreview)
    return () => body.removeEventListener("keydown", dismissPreview)
  }, [preview])

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
        {toolkit.categories.map((category) => (
          <TechnologyPhysicalFolder
            key={category.id}
            category={category}
            isRevealed={
              folders.pinned === category.id || preview === category.id
            }
            onInteraction={(type) => dispatch({ type, id: category.id })}
          />
        ))}
      </div>
    </section>
  )
}
