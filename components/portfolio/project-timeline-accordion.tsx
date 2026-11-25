"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar, Building2 } from "lucide-react"

import { useLanguage } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GradientMotionBackground } from "@/components/ui/gradient-motion-background"
import type { PublicTimelineItem } from "@/lib/public-portfolio-data"
import { TimelineRuler } from "@/components/portfolio/timeline-ruler"
import { cn } from "@/lib/utils"

export interface ProjectTimelineAccordionProps {
  projectTimelineItems: readonly PublicTimelineItem[]
  className?: string
  initialIndex?: number
  onSelectProject?: (project: PublicTimelineItem) => void
}

export function ProjectTimelineAccordion({
  projectTimelineItems,
  className,
  initialIndex = 0,
  onSelectProject,
}: ProjectTimelineAccordionProps) {
  const { lang } = useLanguage()
  const shouldReduceMotion = useReducedMotion() ?? false

  const [selectedIndex, setSelectedIndex] = React.useState(initialIndex)
  const [prevInitialIndex, setPrevInitialIndex] = React.useState(initialIndex)

  if (initialIndex !== prevInitialIndex) {
    setPrevInitialIndex(initialIndex)
    setSelectedIndex(initialIndex)
  }

  const activeIndex = selectedIndex

  const containerRef = React.useRef<HTMLDivElement>(null)
  const trackRef = React.useRef<HTMLDivElement>(null)
  const cardRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  const [containerWidth, setContainerWidth] = React.useState(1024)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateWidth = (width: number) => {
      if (width > 0) {
        setContainerWidth(Math.round(width))
      }
    }

    updateWidth(container.clientWidth)

    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect && entry.contentRect.width > 0) {
            updateWidth(entry.contentRect.width)
          }
        }
      })
      resizeObserver.observe(container)
      return () => resizeObserver.disconnect()
    }

    const handleWindowResize = () => {
      updateWidth(container.clientWidth)
    }
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

  const isMobile = containerWidth < 768
  const isTablet = containerWidth >= 768 && containerWidth < 1024
  const isDesktop = containerWidth >= 1024
  const isWide = containerWidth >= 1440

  const cardGap = isMobile ? 8 : isTablet ? 8 : 10
  const containerPadding = 0
  const availableWidth = Math.max(0, containerWidth - 2 * containerPadding)

  const inactiveCount = projectTimelineItems.length - 1
  const totalGapsWidth = inactiveCount * cardGap
  const netCardSpace = Math.max(0, availableWidth - totalGapsWidth)

  // Di desktop, seluruh 13 kartu membentang mengisi 100% dari availableWidth (0 space kosong)
  const desktopActiveWidth = Math.max(
    420,
    Math.min(
      Math.round(netCardSpace * (isWide ? 0.38 : 0.42)),
      isWide ? 760 : 620
    )
  )
  const desktopInactiveWidth = Math.max(
    38,
    (netCardSpace - desktopActiveWidth) / inactiveCount
  )

  const activeCardWidth = isDesktop
    ? desktopActiveWidth
    : isMobile
      ? Math.max(260, Math.min(containerWidth - 64, 380))
      : Math.max(340, Math.min(containerWidth * 0.58, 440))

  const inactiveCardWidth = isDesktop
    ? desktopInactiveWidth
    : isMobile
      ? 44
      : 56

  const totalTrackWidth = React.useMemo(() => {
    if (isDesktop) {
      return availableWidth
    }
    return activeCardWidth + inactiveCount * inactiveCardWidth + totalGapsWidth
  }, [
    isDesktop,
    availableWidth,
    activeCardWidth,
    inactiveCount,
    inactiveCardWidth,
    totalGapsWidth,
  ])

  const getCardLeftPosition = React.useCallback(
    (targetIndex: number) => {
      let pos = 0
      for (let i = 0; i < targetIndex; i++) {
        const w = i === activeIndex ? activeCardWidth : inactiveCardWidth
        pos += w + cardGap
      }
      return pos
    },
    [activeIndex, activeCardWidth, inactiveCardWidth, cardGap]
  )

  const trackOffset = React.useMemo(() => {
    if (isDesktop) {
      return 0
    }

    if (totalTrackWidth <= availableWidth || activeIndex === 0) {
      return 0
    }

    const minOffset = availableWidth - totalTrackWidth
    const maxOffset = 0

    if (activeIndex === projectTimelineItems.length - 1) {
      return minOffset
    }

    const activeLeft = getCardLeftPosition(activeIndex)
    const activeCenter = activeLeft + activeCardWidth / 2
    const idealOffset = availableWidth / 2 - activeCenter

    return Math.max(minOffset, Math.min(maxOffset, idealOffset))
  }, [
    isDesktop,
    activeIndex,
    totalTrackWidth,
    availableWidth,
    projectTimelineItems.length,
    getCardLeftPosition,
    activeCardWidth,
  ])

  // Ensure DOM container scrollLeft never drifts away from 0 due to browser focus auto-scroll
  React.useEffect(() => {
    if (containerRef.current && containerRef.current.scrollLeft !== 0) {
      containerRef.current.scrollLeft = 0
    }
  }, [activeIndex])

  const handlePrev = () => {
    if (selectedIndex <= 0) return
    const nextIdx = selectedIndex - 1
    setSelectedIndex(nextIdx)
    cardRefs.current[nextIdx]?.focus({ preventScroll: true })
  }

  const handleNext = () => {
    if (selectedIndex >= projectTimelineItems.length - 1) return
    const nextIdx = selectedIndex + 1
    setSelectedIndex(nextIdx)
    cardRefs.current[nextIdx]?.focus({ preventScroll: true })
  }

  const handleSelectYear = (year: number) => {
    const targetIdx = projectTimelineItems.findIndex(
      (p) => p.startYear === year
    )
    if (targetIdx !== -1) {
      setSelectedIndex(targetIdx)
      cardRefs.current[targetIdx]?.focus({ preventScroll: true })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let nextIdx = activeIndex
    if (e.key === "ArrowRight") {
      if (activeIndex >= projectTimelineItems.length - 1) return
      nextIdx = activeIndex + 1
    } else if (e.key === "ArrowLeft") {
      if (activeIndex <= 0) return
      nextIdx = activeIndex - 1
    } else if (e.key === "Home") {
      nextIdx = 0
    } else if (e.key === "End") {
      nextIdx = projectTimelineItems.length - 1
    } else {
      return
    }

    e.preventDefault()
    setSelectedIndex(nextIdx)
    cardRefs.current[nextIdx]?.focus({ preventScroll: true })
  }

  const handleCardClick = (index: number) => {
    setSelectedIndex(index)
    cardRefs.current[index]?.focus({ preventScroll: true })
    if (onSelectProject) {
      onSelectProject(projectTimelineItems[index])
    }
  }

  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y
    touchStartRef.current = null

    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
  }

  return (
    <motion.section
      initial={
        shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
      }
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      aria-label={
        lang === "id"
          ? "Lini Masa Proyek Interaktif"
          : "Interactive Project Timeline"
      }
      className={cn(
        "group relative z-10 flex w-full flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/8 p-4 shadow-xs backdrop-blur-[10px] transition-[border-color,background-color] duration-500 hover:bg-card/2 sm:p-6 lg:p-8",
        className
      )}
    >
      <GradientMotionBackground
        seed={42}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] bg-transparent transition-opacity duration-500 group-hover:opacity-25 dark:bg-transparent"
      />

      <div className="relative z-10 w-full space-y-4 sm:space-y-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {lang === "id"
                  ? "01 // Lini Masa Proyek"
                  : "01 // Project Timeline"}
              </span>
              <Badge variant="outline" className="font-mono text-[10px]">
                2023 – 2026
              </Badge>
            </div>
            <h2 className="mt-1 font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {lang === "id"
                ? "Perjalanan Pengembangan Proyek"
                : "Project Development Journey"}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              {lang === "id"
                ? "Klik atau geser kartu untuk melihat detail rentang waktu dan teknologi"
                : "Click or swipe cards to explore timeline details and technologies"}
            </p>
          </div>

          {/* Navigation Controls & Counter */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="font-mono text-xs font-semibold text-muted-foreground">
              {String(activeIndex + 1).padStart(2, "0")} / 13
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label={
                  lang === "id" ? "Proyek sebelumnya" : "Previous project"
                }
                className="size-8 rounded-full border-border/50 hover:bg-muted disabled:pointer-events-none disabled:border-border/50 disabled:opacity-30"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={handleNext}
                disabled={activeIndex === projectTimelineItems.length - 1}
                aria-label={
                  lang === "id" ? "Proyek berikutnya" : "Next project"
                }
                className="size-8 rounded-full border-border/50 hover:bg-muted disabled:pointer-events-none disabled:border-border/50 disabled:opacity-30"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Accordion Viewport Container */}
        <div
          ref={containerRef}
          onScroll={(e) => {
            e.currentTarget.scrollLeft = 0
          }}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="tablist"
          aria-label={
            lang === "id"
              ? "Deretan Kartu Proyek Melebar"
              : "Expanding Project Cards Accordion"
          }
          className="relative h-100 w-full overflow-hidden sm:h-107.5 lg:h-112.5"
        >
          {/* Moving Track to accommodate 13 cards with smooth spring shift */}
          <motion.div
            ref={trackRef}
            animate={{ x: trackOffset }}
            transition={{
              type: shouldReduceMotion ? "tween" : "spring",
              stiffness: 350,
              damping: 32,
              mass: 0.8,
              duration: shouldReduceMotion ? 0 : 0.4,
            }}
            className={cn(
              "flex h-full gap-2 sm:gap-2.5",
              isDesktop ? "w-full justify-between" : "w-max"
            )}
          >
            {projectTimelineItems.map((item, idx) => {
              const isActive = idx === activeIndex
              const isSelected = idx === selectedIndex

              return (
                <motion.button
                  key={item.ref}
                  ref={(el) => {
                    cardRefs.current[idx] = el
                  }}
                  type="button"
                  role="tab"
                  id={`timeline-card-${item.ref}`}
                  aria-selected={isActive}
                  aria-controls={`timeline-panel-${item.ref}`}
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`${item.name} (${item.period[lang]})`}
                  onClick={() => handleCardClick(idx)}
                  animate={{
                    width: isActive ? activeCardWidth : inactiveCardWidth,
                  }}
                  transition={{
                    type: shouldReduceMotion ? "tween" : "spring",
                    stiffness: 350,
                    damping: 32,
                    mass: 0.8,
                    duration: shouldReduceMotion ? 0 : 0.4,
                  }}
                  className={cn(
                    "group relative h-full shrink-0 overflow-hidden rounded-2xl text-left select-none",
                    "border transition-colors duration-200",
                    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
                    isActive
                      ? "border-foreground/30 shadow-lg shadow-black/20"
                      : isSelected
                        ? "border-primary/50 opacity-90 hover:opacity-100"
                        : "border-border/50 opacity-75 hover:border-foreground/30 hover:opacity-100"
                  )}
                  style={{
                    willChange: "width",
                  }}
                >
                  {/* 1. Visual Cover or Neutral Blueprint Fallback */}
                  {item.coverImage ? (
                    <Image
                      src={item.coverImage}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 380px, (max-width: 1024px) 440px, 760px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{
                        objectPosition: item.imagePosition || "center",
                      }}
                      priority={idx === 0}
                    />
                  ) : (
                    <div className="absolute inset-0 size-full bg-linear-to-br from-neutral-900 via-zinc-900 to-neutral-950 dark:from-zinc-950 dark:via-neutral-950 dark:to-black">
                      {/* Technical Blueprint Grid Pattern */}
                      <svg
                        className="absolute inset-0 size-full stroke-white/8"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <defs>
                          <pattern
                            id={`blueprint-grid-${item.ref}`}
                            width="24"
                            height="24"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M 24 0 L 0 0 0 24"
                              fill="none"
                              strokeWidth="1"
                            />
                          </pattern>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill={`url(#blueprint-grid-${item.ref})`}
                        />
                      </svg>

                      {/* Subtle Radial Glow */}
                      <div
                        className={cn(
                          "absolute -top-12 -right-12 size-48 rounded-full opacity-20 blur-2xl",
                          item.category === "enterprise"
                            ? "bg-blue-500"
                            : "bg-emerald-500"
                        )}
                      />

                      {/* Technical Watermark */}
                      <div className="absolute top-4 right-4 font-mono text-[10px] tracking-widest text-white/15 uppercase select-none">
                        {item.category === "enterprise"
                          ? "ENT // ARCH"
                          : "SYS // CORE"}
                      </div>
                    </div>
                  )}

                  {/* 2. High-Contrast Bottom Gradient Scrim */}
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/95 via-black/50 via-60% to-transparent" />

                  {/* 3. Active Card Content Overlay */}
                  {isActive ? (
                    <motion.div
                      key={`active-panel-${item.ref}`}
                      initial={
                        shouldReduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: 6 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      id={`timeline-panel-${item.ref}`}
                      role="tabpanel"
                      aria-labelledby={`timeline-card-${item.ref}`}
                      className="relative flex h-full flex-col justify-between p-4 text-white sm:p-5 lg:p-6"
                    >
                      {/* Top Row: Clean Index Counter without category badge */}
                      <div className="flex items-center justify-end">
                        <span className="font-mono text-xs font-semibold text-white/60">
                          {String(idx + 1).padStart(2, "0")} / 13
                        </span>
                      </div>

                      {/* Bottom Row: Detailed Project Info */}
                      <div className="space-y-1.5 sm:space-y-2 lg:space-y-2.5">
                        {/* Period in Clean White text matching Framer reference */}
                        <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wider text-white/90 uppercase">
                          <Calendar className="size-3.5 text-white/70" />
                          <span>{item.period[lang]}</span>
                        </div>

                        <h3 className="line-clamp-1 font-heading text-lg font-bold tracking-tight text-white sm:text-xl">
                          {item.name}
                        </h3>

                        <div className="line-clamp-1 flex items-center gap-1.5 text-xs text-white/70">
                          <Building2 className="size-3.5 shrink-0" />
                          <span>{item.company[lang]}</span>
                        </div>

                        <p className="line-clamp-2 text-xs leading-relaxed text-white/80">
                          {item.shortDescription[lang]}
                        </p>

                        {/* Key Tech Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.techStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/90 backdrop-blur-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* 4. Inactive Narrow Card Panel */
                    <div className="relative flex h-full flex-col items-center justify-between py-4 text-white">
                      {/* Top Index Badge */}
                      <span className="font-mono text-[11px] font-semibold text-white/50 transition-colors group-hover:text-white/80">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      {/* Vertical Year Stamp */}
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="font-pixel text-sm font-bold text-white/70 transition-colors group-hover:text-white sm:text-base">
                          {item.yearBadge}
                        </span>
                        <div
                          className={cn(
                            "size-1.5 rounded-full transition-all duration-200",
                            isSelected
                              ? "scale-125 bg-white"
                              : "bg-white/30 group-hover:bg-white/70"
                          )}
                        />
                      </div>
                    </div>
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        </div>

        {/* Synchronized Timeline Ruler */}
        <TimelineRuler
          activeMonth={projectTimelineItems[activeIndex].startMonth}
          onSelectYear={handleSelectYear}
          className="mt-4 sm:mt-6"
        />
      </div>
    </motion.section>
  )
}
