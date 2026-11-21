"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

import { GradientMotionBackground } from "@/components/ui/gradient-motion-background"
import { useLanguage, useT } from "@/lib/language-context"
import type { TechCategory } from "@/lib/tech-stack-data"
import { cn } from "@/lib/utils"

export interface FrontendFolderPrototypeProps {
  category: TechCategory
  isPinned: boolean
  onTogglePin: () => void
  className?: string
}

/**
 * Verified local pixel-art sticker assets for Category 01 (Frontend Development).
 * Sourced directly from public/images/pixel-art-sticker/ with 100% 1:1 asset parity.
 */
export const FRONTEND_PIXEL_STICKERS: Record<string, string> = {
  typescript: "/images/pixel-art-sticker/typescript-icon-sticker.png",
  javascript: "/images/pixel-art-sticker/javascript-icon-sticker.png",
  react: "/images/pixel-art-sticker/react-icon-sticker.png",
  nextjs: "/images/pixel-art-sticker/nextjs-icon-sticker.png",
  html5: "/images/pixel-art-sticker/html-icon-sticker.png",
  css3: "/images/pixel-art-sticker/css-icon-sticker.png",
}

/**
 * Deterministic spatial placements for Category 01 technology stickers.
 * Resting: Physical two-tier overlapping stack tucked into the folder pocket (88-92% artwork exposed).
 * Expanded: Expressive two-dimensional organic scatter across multiple vertical levels.
 */
export interface StickerPlacement {
  resting: { x: number; y: number; rotate: number; zIndex: number }
  expanded: { x: number; y: number; rotate: number; zIndex: number }
}

export const STICKER_PLACEMENTS: Record<string, StickerPlacement> = {
  typescript: {
    resting: { x: -115, y: -74, rotate: -8, zIndex: 11 },
    expanded: { x: -135, y: -120, rotate: -12, zIndex: 21 },
  },
  javascript: {
    resting: { x: -70, y: -64, rotate: 4, zIndex: 14 },
    expanded: { x: -105, y: -190, rotate: -10, zIndex: 24 },
  },
  react: {
    resting: { x: -14, y: -72, rotate: -3, zIndex: 15 },
    expanded: { x: -20, y: -205, rotate: 5, zIndex: 26 },
  },
  nextjs: {
    resting: { x: 42, y: -80, rotate: 6, zIndex: 12 },
    expanded: { x: 70, y: -180, rotate: -7, zIndex: 25 },
  },
  html5: {
    resting: { x: 88, y: -66, rotate: -5, zIndex: 13 },
    expanded: { x: 15, y: -110, rotate: 8, zIndex: 22 },
  },
  css3: {
    resting: { x: 130, y: -76, rotate: 9, zIndex: 10 },
    expanded: { x: 125, y: -125, rotate: 12, zIndex: 23 },
  },
}

export function FrontendFolderPrototype({
  category,
  isPinned,
  onTogglePin,
  className,
}: FrontendFolderPrototypeProps) {
  const { lang } = useLanguage()
  const shouldReduceMotion = useReducedMotion() ?? false
  const [isHovered, setIsHovered] = React.useState(false)
  const [hoveredTechId, setHoveredTechId] = React.useState<string | null>(null)

  // Revealed state: active either when hovered OR pinned
  const isRevealed = isPinned || isHovered

  const title = useT(category.title)
  const toolsCount = category.techs.length

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault()
      onTogglePin()
    }
  }

  const ariaActionHint = isPinned
    ? lang === "id"
      ? "Klik untuk melepas pin"
      : "Click to unpin"
    : lang === "id"
      ? "Arahkan untuk melihat, klik untuk mengunci"
      : "Hover to reveal, click to pin"

  const techNamesSummary = category.techs.map((t) => t.name).join(", ")
  const ariaLabel = `${title} (${toolsCount} technologies: ${techNamesSummary}) — ${ariaActionHint}`

  return (
    <article
      tabIndex={0}
      role="button"
      aria-expanded={isRevealed}
      aria-controls={`frontend-prototype-techs-${category.id}`}
      aria-label={ariaLabel}
      onClick={onTogglePin}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setHoveredTechId(null)
      }}
      className={cn(
        // Outer interactive stage: compact clearance above eliminating excessive dead space
        "group relative flex h-98 w-full cursor-pointer flex-col items-center justify-end select-none sm:h-102 lg:h-106",
        "rounded-3xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
        className
      )}
    >
      {/* =========================================================
          1. PHYSICAL FOLDER CONTAINER (Enlarged, Dominates Grid Cell)
          ========================================================= */}
      <div
        className={cn(
          "relative flex h-80 w-full max-w-90 flex-col justify-end transition-all duration-300 sm:h-86 sm:max-w-107.5 lg:h-90 lg:max-w-112.5",
          isRevealed ? "scale-[1.01]" : "scale-100"
        )}
      >
        {/* =========================================================
            1A. BACK FOLDER LAYER (Silhouette-Masked GradientMotionBackground)
            ========================================================= */}
        <div className="absolute inset-0 size-full overflow-hidden rounded-b-3xl">
          {/* Reusable SVG Definition for Folder Silhouette Clipping */}
          <svg
            className="absolute size-0 overflow-hidden"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <clipPath
                id="folder-back-clip-norm"
                clipPathUnits="objectBoundingBox"
              >
                <path d="M 0 0.11429 C 0 0.05 0.03889 0 0.08889 0 L 0.38889 0 C 0.43889 0 0.46667 0.06429 0.51667 0.06429 L 0.91111 0.06429 C 0.96111 0.06429 1 0.11429 1 0.17857 L 1 1 L 0 1 Z" />
              </clipPath>
            </defs>
          </svg>

          {/* Masked GradientMotionBackground conforming strictly to folder silhouette */}
          <div
            className="absolute inset-0 size-full"
            style={{ clipPath: "url(#folder-back-clip-norm)" }}
          >
            <GradientMotionBackground
              seed={42}
              speed={28}
              blurAmount={45}
              className="size-full rounded-none"
            />
          </div>

          {/* Back folder SVG contour stroke for design system border compliance */}
          <svg
            className="pointer-events-none absolute inset-0 size-full overflow-visible"
            viewBox="0 0 360 280"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 0 32 C 0 14, 14 0, 32 0 L 140 0 C 158 0, 168 18, 186 18 L 328 18 C 346 18, 360 32, 360 50 L 360 280 L 0 280 Z"
              fill="none"
              className="stroke-border/50 transition-colors duration-200 group-hover:stroke-border"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        {/* =========================================================
            1B. PIXEL-ART STICKER LAYER (Transparent Artwork, Peeking at Rest, Scattering on Reveal)
            ========================================================= */}
        <div
          id={`frontend-prototype-techs-${category.id}`}
          className="pointer-events-none absolute inset-x-0 bottom-32 z-10 flex items-center justify-center sm:bottom-36"
        >
          <div className="relative size-full">
            {category.techs.map((tech) => {
              const isTechHovered = hoveredTechId === tech.id
              const stickerSrc = FRONTEND_PIXEL_STICKERS[tech.id]
              const coords = calculatePrototypeCoords(
                tech.id,
                isRevealed,
                shouldReduceMotion
              )

              return (
                <motion.div
                  key={tech.id}
                  className={cn(
                    "absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center",
                    isRevealed ? "pointer-events-auto" : "pointer-events-none"
                  )}
                  initial={false}
                  animate={{
                    x: coords.x,
                    y: coords.y,
                    rotate: coords.rotate,
                    scale: isTechHovered ? coords.scale * 1.12 : coords.scale,
                    zIndex: isTechHovered ? 35 : coords.zIndex,
                  }}
                  transition={{
                    type: shouldReduceMotion ? "tween" : "spring",
                    stiffness: 300,
                    damping: 24,
                    mass: 0.8,
                    duration: shouldReduceMotion ? 0 : 0.4,
                  }}
                  onMouseEnter={() => setHoveredTechId(tech.id)}
                  onMouseLeave={() => setHoveredTechId(null)}
                >
                  {/* Transparent Pixel-Art Sticker Artwork (Enlarged, apparent size ~88-100px) */}
                  <div className="relative flex items-center justify-center select-none">
                    {stickerSrc ? (
                      <Image
                        src={stickerSrc}
                        alt={tech.name}
                        width={96}
                        height={96}
                        unoptimized
                        className={cn(
                          "size-18 object-contain filter transition-transform duration-200 [image-rendering:pixelated] sm:size-20 lg:size-22",
                          "drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]",
                          isTechHovered &&
                            "scale-110 drop-shadow-[0_6px_14px_rgba(0,0,0,0.5)]"
                        )}
                      />
                    ) : (
                      <span className="font-mono text-xs font-bold text-foreground">
                        {tech.name}
                      </span>
                    )}
                    <span className="sr-only">{tech.name}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* =========================================================
            1C. FRONT POCKET LAYER (SVG Tab Silhouette with Theme-Aware Depth Shadow)
            ========================================================= */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 overflow-hidden rounded-b-3xl">
          <svg
            className="h-46 w-full overflow-visible sm:h-50 lg:h-54"
            viewBox="0 0 360 180"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              {/* Dark Mode Gradient */}
              <linearGradient
                id="folder-front-grad-dark"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#2c2c34" />
                <stop offset="100%" stopColor="#1e1e23" />
              </linearGradient>
              {/* Light Mode Gradient */}
              <linearGradient
                id="folder-front-grad-light"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#e8e8ee" />
                <stop offset="100%" stopColor="#d8d8e2" />
              </linearGradient>
              {/* Theme-Aware Depth Shadows */}
              <filter
                id="pocket-depth-shadow-dark"
                x="-5%"
                y="-10%"
                width="110%"
                height="120%"
              >
                <feDropShadow
                  dx="0"
                  dy="-4"
                  stdDeviation="5"
                  floodOpacity="0.30"
                  floodColor="#000"
                />
              </filter>
              <filter
                id="pocket-depth-shadow-light"
                x="-5%"
                y="-10%"
                width="110%"
                height="120%"
              >
                <feDropShadow
                  dx="0"
                  dy="-3"
                  stdDeviation="4"
                  floodOpacity="0.08"
                  floodColor="#000"
                />
              </filter>
            </defs>
            {/* Front pocket contour: tab silhouette with soft dip in center */}
            <path
              d="M 0 28 L 130 28 C 150 28, 160 10, 180 10 L 336 10 C 350 10, 360 20, 360 34 L 360 180 L 0 180 Z"
              fill="url(#folder-front-grad-light)"
              className="stroke-border/50 filter-[url(#pocket-depth-shadow-light)] transition-colors duration-200 group-hover:stroke-border dark:fill-[url(#folder-front-grad-dark)] dark:filter-[url(#pocket-depth-shadow-dark)]"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        {/* =========================================================
            1D. FRONT POCKET CONTENT (Minimal Typography: Title + Subtitle Only)
            ========================================================= */}
        <div className="relative z-30 flex flex-col justify-end p-6 pb-5 select-none sm:p-7 sm:pb-6 lg:p-8">
          {/* Primary Title */}
          <h3 className="font-heading text-2xl leading-tight font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
            Frontend
          </h3>

          {/* Secondary Quiet Label */}
          <p className="mt-1 font-sans text-xs font-medium tracking-wide text-muted-foreground/80 sm:text-sm">
            {lang === "id" ? "Bahasa & Framework" : "Languages & Frameworks"}
          </p>
        </div>

        {/* =========================================================
            1E. DEDICATED TOOLTIP OVERLAY (z-40: Centered Directly Above Hovered Sticker)
            ========================================================= */}
        {isRevealed && hoveredTechId && (
          <div className="pointer-events-none absolute inset-x-0 bottom-32 z-40 flex items-center justify-center sm:bottom-36">
            <div className="relative size-full">
              {category.techs.map((tech) => {
                if (tech.id !== hoveredTechId) return null
                const tooltipCoords = calculateTooltipCoords(
                  tech.id,
                  isRevealed,
                  shouldReduceMotion
                )

                return (
                  <motion.div
                    key={`tooltip-${tech.id}`}
                    className="pointer-events-none absolute top-1/2 left-1/2 z-40"
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      x: tooltipCoords.x,
                      y: tooltipCoords.y + 4,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: tooltipCoords.x,
                      y: tooltipCoords.y,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      x: tooltipCoords.x,
                      y: tooltipCoords.y + 4,
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="flex -translate-x-1/2 -translate-y-full flex-col items-center">
                      <span className="rounded-md border border-border/80 bg-popover/95 px-2.5 py-1 font-mono text-[11px] font-semibold whitespace-nowrap text-popover-foreground shadow-md backdrop-blur-md">
                        {tech.name}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

/**
 * Calculates organic, deterministic scatter coordinates for pixel-art technology stickers
 * within the prototype physical folder.
 * Pure deterministic calculation based on per-technology spatial mappings.
 */
export function calculatePrototypeCoords(
  techId: string,
  isRevealed: boolean,
  shouldReduceMotion: boolean
) {
  const placement = STICKER_PLACEMENTS[techId] ?? {
    resting: { x: 0, y: -50, rotate: 0, zIndex: 10 },
    expanded: { x: 0, y: -140, rotate: 0, zIndex: 20 },
  }

  if (shouldReduceMotion) {
    return {
      x: isRevealed ? placement.expanded.x : placement.resting.x,
      y: isRevealed ? -115 : placement.resting.y,
      rotate: 0,
      scale: 1,
      zIndex: isRevealed ? placement.expanded.zIndex : placement.resting.zIndex,
    }
  }

  if (isRevealed) {
    return {
      x: placement.expanded.x,
      y: placement.expanded.y,
      rotate: placement.expanded.rotate,
      scale: 1.08,
      zIndex: placement.expanded.zIndex,
    }
  }

  return {
    x: placement.resting.x,
    y: placement.resting.y,
    rotate: placement.resting.rotate,
    scale: 0.98,
    zIndex: placement.resting.zIndex,
  }
}

/**
 * Calculates deterministic tooltip anchor coordinates centered directly above the specified sticker.
 * Positioned with a predictable ~10-12px gap above the sticker's upper visual boundary.
 */
export function calculateTooltipCoords(
  techId: string,
  isRevealed: boolean,
  shouldReduceMotion: boolean
) {
  const coords = calculatePrototypeCoords(
    techId,
    isRevealed,
    shouldReduceMotion
  )
  // Distance from sticker center to tooltip bottom-center:
  // Half-height of sticker artwork (~44px) + gap above upper edge (~12px) = 56px offset
  const verticalOffset = 56
  return {
    x: coords.x,
    y: coords.y - verticalOffset,
  }
}
