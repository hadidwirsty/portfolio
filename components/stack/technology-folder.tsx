"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Folder, FolderOpen } from "lucide-react"

import { TechIcon } from "@/components/stack/tech-icon"
import { useLanguage, useT } from "@/lib/language-context"
import type { TechCategory } from "@/lib/tech-stack-data"
import { cn } from "@/lib/utils"

export interface TechnologyFolderProps {
  category: TechCategory
  isOpen: boolean
  onToggle: () => void
  className?: string
}

export function TechnologyFolder({
  category,
  isOpen,
  onToggle,
  className,
}: TechnologyFolderProps) {
  const { lang } = useLanguage()
  const shouldReduceMotion = useReducedMotion() ?? false
  const [isHovered, setIsHovered] = React.useState(false)

  const title = useT(category.title)
  const description = useT(category.description)
  const toolsCount = category.techs.length

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault()
      onToggle()
    }
  }

  // Accessible action labels
  const actionHint = isOpen
    ? lang === "id"
      ? "Klik untuk menutup"
      : "Click to close"
    : lang === "id"
      ? "Klik untuk membuka"
      : "Click to reveal"

  const ariaLabel = `${title} (${toolsCount} tools) — ${actionHint}`

  return (
    <article
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      aria-controls={`folder-techs-${category.id}`}
      aria-label={ariaLabel}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex h-92 w-full flex-col justify-end overflow-hidden rounded-3xl sm:h-96 lg:h-100",
        "border border-border/50 bg-card/60 text-left shadow-xs backdrop-blur-md select-none",
        "transition-all duration-300",
        "hover:border-border hover:bg-card/85 hover:shadow-xl hover:shadow-black/10",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
        "cursor-pointer",
        isOpen && "border-border bg-card/90 shadow-lg",
        className
      )}
    >
      {/* =========================================================
          A. AMBIENT BACKGROUND & SUBTLE GRID PATTERN
          ========================================================= */}
      <div className="pointer-events-none absolute inset-0 size-full overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className={cn(
            "absolute -top-12 left-1/2 size-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500",
            isOpen || isHovered ? "opacity-100" : "opacity-40"
          )}
        />
        {/* Subtle grid pattern */}
        <svg
          className="absolute inset-0 size-full stroke-foreground/4 transition-opacity duration-300"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={`tech-folder-grid-${category.id}`}
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 24 0 L 0 0 0 24" fill="none" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill={`url(#tech-folder-grid-${category.id})`}
          />
        </svg>
      </div>

      {/* =========================================================
          B. SCATTER STAGE (Technology Icons Peeking or Fanning Out)
          ========================================================= */}
      <div
        id={`folder-techs-${category.id}`}
        className="pointer-events-none absolute inset-x-0 top-0 bottom-36 flex items-center justify-center select-none sm:bottom-40"
      >
        <div className="relative size-full">
          {category.techs.map((tech, index) => {
            const coords = calculateIconCoords(
              index,
              category.techs.length,
              isOpen,
              isHovered,
              shouldReduceMotion
            )

            return (
              <motion.div
                key={tech.id}
                className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                initial={false}
                animate={{
                  x: coords.x,
                  y: coords.y,
                  rotate: coords.rotate,
                  scale: coords.scale,
                  opacity: 1,
                }}
                transition={{
                  type: shouldReduceMotion ? "tween" : "spring",
                  stiffness: 320,
                  damping: 24,
                  mass: 0.8,
                  duration: shouldReduceMotion ? 0 : 0.4,
                }}
              >
                <div className="relative">
                  <TechIcon
                    tech={tech}
                    size="md"
                    className={cn(
                      "transition-shadow duration-300",
                      isOpen
                        ? "border-border shadow-md"
                        : "border-border/60 shadow-xs"
                    )}
                  />

                  {/* Core badge dot indicator if core tech */}
                  {tech.isCore && (
                    <span
                      className="absolute -top-1 -right-1 size-2.5 rounded-full border-2 border-card bg-primary"
                      title="Core Technology"
                    />
                  )}
                </div>

                {/* Name pill label — reveals smoothly when folder is open */}
                <motion.span
                  initial={false}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    y: isOpen ? 4 : 0,
                    scale: isOpen ? 1 : 0.85,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.2,
                    delay: isOpen && !shouldReduceMotion ? index * 0.02 : 0,
                  }}
                  className="mt-1.5 rounded border border-border/60 bg-card/95 px-1.5 py-0.5 font-mono text-[10px] font-semibold whitespace-nowrap text-foreground shadow-2xs backdrop-blur-sm"
                >
                  {tech.name}
                </motion.span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* =========================================================
          C. FRONT POCKET SILHOUETTE (SVG Curved Folder Tab)
          ========================================================= */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 select-none">
        <svg
          className="h-38 w-full overflow-visible sm:h-42"
          viewBox="0 0 400 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 0 30 L 140 30 C 165 30, 175 10, 200 10 L 376 10 C 390 10, 400 20, 400 34 L 400 200 L 0 200 Z"
            className="fill-card/95 stroke-border/50 transition-colors duration-300 dark:fill-card/98"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* =========================================================
          D. FOLDER INFO & ACTION FOOTER (Foreground Text Layer)
          ========================================================= */}
      <div className="pointer-events-none relative z-20 flex flex-col justify-end p-5 select-none sm:p-6">
        {/* Top bar: Category index + Action badge */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {category.index} / TOOLKIT
          </span>

          <div className="flex items-center gap-1.5 rounded-full border border-border/50 bg-background/60 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground backdrop-blur-sm transition-colors group-hover:border-border group-hover:text-foreground">
            {isOpen ? (
              <FolderOpen
                aria-hidden="true"
                className="size-3.5 text-primary"
              />
            ) : (
              <Folder aria-hidden="true" className="size-3.5" />
            )}
            <span>
              {toolsCount} {toolsCount === 1 ? "tool" : "tools"}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-2.5 font-heading text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-1 line-clamp-2 font-sans text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {description}
        </p>

        {/* Visual action hint */}
        <div className="mt-3 flex items-center justify-between border-t border-border/30 pt-2 font-mono text-[10px] text-muted-foreground/80">
          <span className="transition-colors group-hover:text-foreground">
            {actionHint}
          </span>
          <span className="text-[10px] text-muted-foreground/60 sm:inline">
            {isOpen ? "[ESC]" : "↵"}
          </span>
        </div>
      </div>
    </article>
  )
}

/**
 * Calculates organic, deterministic scatter coordinates for technology icons.
 * Pure deterministic calculation without pseudo-random generators.
 */
function calculateIconCoords(
  index: number,
  total: number,
  isOpen: boolean,
  isHovered: boolean,
  shouldReduceMotion: boolean
) {
  if (shouldReduceMotion) {
    return {
      x: 0,
      y: isOpen ? -30 : 0,
      rotate: 0,
      scale: 1,
    }
  }

  const mid = (total - 1) / 2
  const rel = total > 1 ? (index - mid) / mid : 0 // Normalized -1 to +1

  if (isOpen) {
    // Reveal State: Fan-out upward into an organic arc
    // Spread horizontally across [-96px, +96px]
    const maxSpread = 96
    const x = rel * maxSpread
    // Arc elevation: center items go higher (-90px), outer items slightly lower (-68px)
    const arcHeight = Math.cos((rel * Math.PI) / 3) * 28
    const y = -62 - arcHeight
    // Subtle organic fan rotation
    const rotate = rel * 10

    return {
      x,
      y,
      rotate,
      scale: 1.05,
    }
  }

  if (isHovered) {
    // Hover Preview State: slight lift above the resting pocket
    const x = rel * 28
    const y = -14 - Math.abs(rel) * 2
    const rotate = rel * 4

    return {
      x,
      y,
      rotate,
      scale: 1,
    }
  }

  // Resting State: icons peek slightly from behind the pocket
  const x = rel * 20
  const y = 8 + Math.abs(rel) * 2
  const rotate = rel * 3

  return {
    x,
    y,
    rotate,
    scale: 0.95,
  }
}
