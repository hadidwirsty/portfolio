"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import type { ProjectEntry } from "@/lib/cv-data"
import { useLanguage } from "@/lib/language-context"
import { getProjectTimelineItemById } from "@/lib/portfolio-project-timeline-data"
import { cn } from "@/lib/utils"

export interface FolderBentoCardProps {
  project: ProjectEntry
  index: number
  onSelectProject: (project: ProjectEntry) => void
  coverImage?: string
  imagePosition?: string
  isDialogOpen?: boolean
  className?: string
}

export function FolderBentoCard({
  project,
  index,
  onSelectProject,
  coverImage,
  imagePosition,
  isDialogOpen,
  className,
}: FolderBentoCardProps) {
  const { lang } = useLanguage()
  const shouldReduceMotion = useReducedMotion() ?? false
  const [isHovered, setIsHovered] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)
  const [isSuppressed, setIsSuppressed] = React.useState(false)
  const [prevDialogOpen, setPrevDialogOpen] = React.useState(
    Boolean(isDialogOpen)
  )

  // Adjust state when isDialogOpen prop changes (standard React pattern)
  if (Boolean(isDialogOpen) !== prevDialogOpen) {
    setPrevDialogOpen(Boolean(isDialogOpen))
    if (isDialogOpen) {
      setIsSuppressed(true)
      setIsHovered(false)
      setIsFocused(false)
    }
  }

  const handlePointerEnter = () => {
    // If hover is suppressed (modal open or just closed without pointer leaving), ignore
    if (isSuppressed || isDialogOpen) return
    setIsHovered(true)
  }

  const handlePointerLeave = () => {
    // If modal is currently open, ignore pointer leave event caused by modal overlay opening
    if (isDialogOpen) {
      setIsHovered(false)
      return
    }
    // Genuine pointer leave outside the card after modal closed: clear suppression
    setIsSuppressed(false)
    setIsHovered(false)
  }

  const handleFocus = () => {
    // Programmatic focus restoration after modal closes must not trigger reveal
    if (isSuppressed || isDialogOpen) {
      setIsFocused(false)
      return
    }
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
    // If the card lost focus while dialog is not open, clear suppression so future keyboard navigation works
    if (!isDialogOpen) {
      setIsSuppressed(false)
    }
  }

  const handleSelect = () => {
    // Immediately suppress hover and clear active state when initiating project selection
    setIsSuppressed(true)
    setIsHovered(false)
    setIsFocused(false)
    onSelectProject(project)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault()
      handleSelect()
    }
  }

  const isLifted =
    (isHovered || isFocused) &&
    !isDialogOpen &&
    !isSuppressed &&
    !shouldReduceMotion

  // Synchronize cover image from prop or timeline dataset
  const timelineItem = getProjectTimelineItemById(project.id)
  const resolvedCoverImage = coverImage ?? timelineItem?.coverImage
  const resolvedImagePosition =
    imagePosition ?? timelineItem?.imagePosition ?? "center"

  const title = project.name
  const company = project.company[lang]
  const description = project.description[lang]
  const projectNumber = String(index + 1).padStart(2, "0")
  const ctaLabel = lang === "id" ? "Lihat Detail" : "View Details"

  return (
    <article
      tabIndex={0}
      role="button"
      aria-label={`${ctaLabel}: ${title}`}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={cn(
        // Outer Folder Frame (Backing Card) with generous rounded corners and visible backing layer
        "group relative flex h-115 w-full flex-col overflow-hidden rounded-[28px] p-2.5 sm:h-120 sm:rounded-[32px] sm:p-3 lg:h-125 lg:p-3.5",
        "border border-border/80 bg-zinc-100/90 text-left select-none dark:border-white/10 dark:bg-zinc-900/80",
        "shadow-xs transition-all duration-300",
        "hover:border-foreground/30 hover:shadow-xl dark:hover:border-white/20",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
        "cursor-pointer",
        className
      )}
    >
      {/* Inset Inner Card containing Rear Image, Moving Pocket & Stationary Content */}
      <div className="relative size-full overflow-hidden rounded-[20px] border border-border/70 bg-card shadow-xs sm:rounded-[22px] lg:rounded-2xl dark:border-white/10">
        {/* =========================================================
            A. REAR VISUAL LAYER (Background Image / Neutral Fallback)
            ========================================================= */}
        <div className="absolute inset-0 size-full overflow-hidden bg-neutral-900">
          {resolvedCoverImage ? (
            <motion.div
              className="absolute inset-0 size-full"
              animate={{
                scale: isLifted ? 1.05 : 1,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Image
                src={resolvedCoverImage}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                style={{ objectPosition: resolvedImagePosition }}
                priority={index < 3}
              />
              {/* Subtle scrim for visual depth */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60" />
            </motion.div>
          ) : (
            /* Neutral Technical Blueprint Fallback */
            <div className="absolute inset-0 size-full bg-linear-to-br from-neutral-900 via-zinc-900 to-black dark:from-zinc-950 dark:via-neutral-950 dark:to-black">
              <svg
                className="absolute inset-0 size-full stroke-white/6"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id={`folder-fallback-grid-${project.id}`}
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M 20 0 L 0 0 0 20" fill="none" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill={`url(#folder-fallback-grid-${project.id})`}
                />
              </svg>
              <div className="pointer-events-none absolute top-1/4 left-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
            </div>
          )}
        </div>

        {/* =========================================================
            B. MOVING FOLDER REVEAL LAYER (Silhouette + Number + Arrow)
            ========================================================= */}
        {/* Calibrated height (h-85 = 340px, sm:h-88.75 = 355px) preserves the 400x360 SVG viewBox ratio */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-85 select-none sm:h-88.75"
          animate={{
            y: isLifted ? 52 : 0,
          }}
          transition={{
            type: shouldReduceMotion ? "tween" : "spring",
            stiffness: 280,
            damping: 26,
            mass: 0.8,
            duration: shouldReduceMotion ? 0 : 0.4,
          }}
        >
          {/* SVG Curved Folder Shoulder Background & Border */}
          <svg
            className="pointer-events-none absolute inset-0 size-full overflow-visible"
            viewBox="0 0 400 360"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 0 0 L 170 0 C 196 0, 198 30, 224 30 L 400 30 L 400 360 L 0 360 Z"
              className="fill-card stroke-border/80 transition-colors duration-300 group-hover:stroke-foreground/20 dark:fill-card dark:stroke-white/15 dark:group-hover:stroke-white/30"
              vectorEffect="non-scaling-stroke"
              strokeWidth="1.5"
            />
          </svg>

          {/* Top Row on Moving Tab: Large Project Number + ArrowUpRight CTA */}
          <div className="relative z-10 flex items-start justify-between p-5 sm:p-6">
            {/* Prominent Project Index Number */}
            <span className="font-mono text-3xl font-bold tracking-tight text-foreground select-none sm:text-4xl">
              {projectNumber}
            </span>

            {/* Upper Right ArrowUpRight CTA Indicator */}
            <div
              className="mt-2.5 flex size-9 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground sm:size-10"
              aria-hidden="true"
            >
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-5" />
            </div>
          </div>
        </motion.div>

        {/* =========================================================
            C. STATIONARY CONTENT LAYER (Anchored to Bottom, Unmoving)
            ========================================================= */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end p-5 select-none sm:p-6">
          {/* Solid seamless backing to ensure zero background image peek-through */}
          <div className="absolute inset-0 -z-10 bg-card" />

          <div className="relative z-10 space-y-1 sm:space-y-1.5">
            <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase sm:text-xs">
              {company}
            </span>

            <h3 className="line-clamp-1 font-heading text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl lg:text-2xl">
              {title}
            </h3>

            <p className="line-clamp-2 font-sans text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {description}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
