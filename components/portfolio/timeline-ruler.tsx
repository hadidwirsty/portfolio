"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

import { useLanguage } from "@/lib/language-context"
import {
  TIMELINE_YEAR_MARKERS,
  getTimelineRulerPosition,
} from "@/lib/portfolio-project-timeline-data"
import { cn } from "@/lib/utils"

export interface TimelineRulerProps {
  activeMonth: string
  onSelectYear?: (year: number) => void
  className?: string
}

export function TimelineRuler({
  activeMonth,
  onSelectYear,
  className,
}: TimelineRulerProps) {
  const { lang } = useLanguage()
  const shouldReduceMotion = useReducedMotion() ?? false

  const activePosition = getTimelineRulerPosition(activeMonth) ?? 0

  return (
    <div
      role="region"
      aria-label={
        lang === "id" ? "Penggaris Waktu Proyek" : "Project Timeline Ruler"
      }
      className={cn(
        "relative w-full pt-2 pb-4 select-none sm:pt-6 sm:pb-8",
        className
      )}
    >
      {/* 1. Base Horizontal Track Line */}
      <div className="relative h-px w-full rounded-full bg-border/60">
        {/* Subtle intermediate quarter ticks */}
        {[10, 20, 30, 40, 50, 60, 70, 90].map((pct) => (
          <div
            key={pct}
            style={{ left: `${pct}%` }}
            className="absolute top-1/2 h-1 w-px -translate-x-1/2 -translate-y-1/2 bg-border/40 sm:h-1.5"
            aria-hidden="true"
          />
        ))}

        {/* 2. Active Scrubber (Gliding thin bright vertical line indicator matching project startMonth) */}
        <motion.div
          animate={{ left: `${activePosition}%` }}
          transition={{
            type: shouldReduceMotion ? "tween" : "spring",
            stiffness: 350,
            damping: 32,
            mass: 0.8,
            duration: shouldReduceMotion ? 0 : 0.35,
          }}
          className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Thin bright vertical line matching Framer reference, scaled down proportionally on mobile */}
          <div className="h-3.5 w-0.5 rounded-full bg-foreground shadow-xs shadow-foreground/30 transition-colors sm:h-5" />
        </motion.div>

        {/* 3. Year Markers (2023, 2024, 2025, 2026) */}
        {TIMELINE_YEAR_MARKERS.map((marker) => {
          const isCurrentYear = activeMonth.startsWith(String(marker.year))

          return (
            <div
              key={marker.year}
              style={{ left: `${marker.position}%` }}
              className="absolute top-1/2 -translate-x-1/2"
            >
              {/* Vertical Tick Mark crossing the horizontal line */}
              <div
                className={cn(
                  "mx-auto h-2 w-px -translate-y-1/2 transition-colors sm:h-3",
                  isCurrentYear
                    ? "bg-foreground"
                    : "bg-border/70 group-hover:bg-foreground"
                )}
                aria-hidden="true"
              />

              {/* Interactive Year Label */}
              <button
                type="button"
                onClick={() => onSelectYear?.(marker.year)}
                aria-label={
                  lang === "id"
                    ? `Lompat ke proyek tahun ${marker.year}`
                    : `Jump to projects in ${marker.year}`
                }
                className={cn(
                  "group mt-1.5 block font-mono text-[11px] font-semibold tracking-wider sm:mt-2.5 sm:text-sm",
                  "transition-colors hover:text-foreground",
                  isCurrentYear
                    ? "font-bold text-foreground"
                    : "text-muted-foreground/60 hover:text-foreground",
                  "rounded-sm px-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                )}
              >
                <span>{marker.label}</span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
