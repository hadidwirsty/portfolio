"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import type { PublicProjectCard } from "@/lib/public-portfolio-data"
import { useLanguage } from "@/lib/language-context"
import { getProjectFragment } from "@/lib/skills-portfolio-navigation"
import { cn } from "@/lib/utils"

export interface FolderBentoCardProps {
  project: PublicProjectCard
  index: number
  onSelectProject: (project: PublicProjectCard) => void
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

  if (Boolean(isDialogOpen) !== prevDialogOpen) {
    setPrevDialogOpen(Boolean(isDialogOpen))
    if (isDialogOpen) {
      setIsSuppressed(true)
      setIsHovered(false)
      setIsFocused(false)
    }
  }

  const handlePointerEnter = () => {
    if (isSuppressed || isDialogOpen) return
    setIsHovered(true)
  }

  const handlePointerLeave = () => {
    if (isDialogOpen) {
      setIsHovered(false)
      return
    }

    setIsSuppressed(false)
    setIsHovered(false)
  }

  const handleFocus = () => {
    if (isSuppressed || isDialogOpen) {
      setIsFocused(false)
      return
    }
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (!isDialogOpen) {
      setIsSuppressed(false)
    }
  }

  const handleSelect = () => {
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

  const resolvedCoverImage = coverImage ?? project.coverImage
  const resolvedImagePosition =
    imagePosition ?? project.imagePosition ?? "center"

  const title = project.name
  const company = project.company[lang]
  const description = project.shortDescription[lang]
  const projectNumber = String(index + 1).padStart(2, "0")
  const ctaLabel = lang === "id" ? "Lihat Detail" : "View Details"

  return (
    <article
      id={getProjectFragment(project.ref).slice(1)}
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
        "group relative flex h-115 w-full scroll-mt-20 flex-col overflow-hidden rounded-4xl p-2.5 sm:h-120 sm:scroll-mt-24 sm:p-3 lg:h-125 lg:p-3.5",
        "border border-border/50 bg-zinc-100/90 text-left select-none dark:bg-zinc-900/80",
        "shadow-xs transition-all duration-300",
        "hover:border-border hover:shadow-xl",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
        "cursor-pointer",
        className
      )}
    >
      <div className="relative size-full overflow-hidden rounded-3xl bg-card">
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
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60" />
            </motion.div>
          ) : (
            <div className="absolute inset-0 size-full bg-linear-to-br from-neutral-900 via-zinc-900 to-black dark:from-zinc-950 dark:via-neutral-950 dark:to-black">
              <svg
                className="absolute inset-0 size-full stroke-white/6"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id={`folder-fallback-grid-${project.ref}`}
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
                  fill={`url(#folder-fallback-grid-${project.ref})`}
                />
              </svg>
              <div className="pointer-events-none absolute top-1/4 left-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
            </div>
          )}
        </div>

        {/* =========================================================
            B. MOVING FOLDER REVEAL LAYER (Silhouette + Number + Arrow)
            ========================================================= */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-75 select-none sm:h-85"
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
          <svg
            className="pointer-events-none absolute inset-0 size-full overflow-visible"
            viewBox="0 0 400 360"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 0 0 L 170 0 C 196 0, 198 30, 224 30 L 400 30 L 400 360 L 0 360 Z"
              className="fill-card transition-colors duration-300"
            />
          </svg>

          <div className="relative z-10 flex items-start justify-between p-5 sm:p-6">
            <span className="font-mono text-6xl leading-none font-bold tracking-tight text-foreground select-none sm:text-7xl lg:text-8xl">
              {projectNumber}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="mt-2 size-7 shrink-0 text-foreground/80 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground sm:mt-2.5 sm:size-8 lg:mt-3 lg:size-9"
            />
          </div>
        </motion.div>

        {/* =========================================================
            C. STATIONARY CONTENT LAYER (Anchored to Bottom, Unmoving)
            ========================================================= */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end p-5 select-none sm:p-6">
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
