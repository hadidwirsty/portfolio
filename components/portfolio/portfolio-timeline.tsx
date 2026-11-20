"use client"

import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Calendar, Building2, CheckCircle2 } from "lucide-react"

import {
  timelineMilestones,
  getTimelineWaveGeometry,
} from "@/lib/portfolio-timeline-data"
import { useLanguage, useT } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function PortfolioTimeline() {
  const { lang } = useLanguage()
  const shouldReduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = React.useState(2) // Default: 2024 (center)

  const activeMilestone = timelineMilestones[activeIndex]
  const geometry = React.useMemo(
    () => getTimelineWaveGeometry(activeIndex, 1000, 220),
    [activeIndex]
  )

  const activeTitle = useT(activeMilestone.title)
  const activeInstitution = useT(activeMilestone.institution)
  const activePeriod = useT(activeMilestone.period)
  const activeBadge = useT(activeMilestone.badge)
  const activeSummary = useT(activeMilestone.summary)
  const nodeButtonRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let nextIndex: number | null = null
    if (e.key === "ArrowRight") {
      e.preventDefault()
      nextIndex = (activeIndex + 1) % timelineMilestones.length
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      nextIndex =
        (activeIndex - 1 + timelineMilestones.length) %
        timelineMilestones.length
    } else if (e.key === "Home") {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === "End") {
      e.preventDefault()
      nextIndex = timelineMilestones.length - 1
    }

    if (nextIndex !== null) {
      setActiveIndex(nextIndex)
      nodeButtonRefs.current[nextIndex]?.focus()
    }
  }

  return (
    <section
      id="journey"
      className="relative w-full scroll-mt-20 select-none"
      aria-label={
        lang === "id"
          ? "01 / Perjalanan Karier & Milestone"
          : "01 / My Journey & Career Milestones"
      }
    >
      <div className="relative w-full overflow-hidden rounded-2xl border border-border/50 bg-card/75 p-4 shadow-xs backdrop-blur-md sm:p-7 lg:p-8">
        {/* Section Header */}
        <div className="flex flex-col gap-2 border-b border-border/50 pb-4 sm:flex-row sm:items-center sm:justify-between sm:pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                01 // {lang === "id" ? "Perjalanan Karier" : "My Journey"}
              </span>
              <Badge variant="outline" className="font-mono text-[10px]">
                {lang === "id" ? "5 Fase" : "5 Milestones"}
              </Badge>
            </div>
            <h2 className="mt-1 font-heading text-lg font-medium tracking-tight text-foreground sm:text-2xl">
              {lang === "id"
                ? "Evolusi Rekayasa & Pencapaian Nyata"
                : "Engineering Evolution & Verified Impact"}
            </h2>
          </div>

          <div className="hidden font-mono text-xs text-muted-foreground/80 lg:block">
            {lang === "id"
              ? "Sorot atau klik node tahun"
              : "Hover or click year nodes"}
          </div>
        </div>

        {/* Desktop Layout (>=1024px): Sinusoidal Curved Wave */}
        <div className="hidden lg:block">
          <div
            className="relative my-4 flex h-60 w-full items-center justify-center"
            onKeyDown={handleKeyDown}
            role="tablist"
            aria-label={
              lang === "id"
                ? "Garis Waktu Sinusoidal Interaktif"
                : "Interactive Sinusoidal Timeline"
            }
          >
            <svg
              viewBox="0 0 1000 220"
              className="h-full w-full overflow-visible"
              aria-hidden="true"
            >
              {/* Background Dim Stem */}
              <path
                d={geometry.fullPath}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="text-border/60 transition-colors"
              />

              {/* Active Highlighted Stem up to active node */}
              <motion.path
                d={geometry.activePath}
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="text-foreground"
                initial={false}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.35,
                  ease: "easeOut",
                }}
              />
            </svg>

            {/* 5 Milestone Node Buttons positioned on exact SVG coordinates */}
            {geometry.nodes.map((node) => {
              const isActive = activeIndex === node.index
              const isPast = node.index <= activeIndex
              const isTop = node.labelPosition === "top"

              return (
                <div
                  key={node.id}
                  className="absolute"
                  style={{
                    left: `${(node.x / geometry.width) * 100}%`,
                    top: `${(node.y / geometry.height) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* Interactive Button */}
                  <button
                    ref={(el) => {
                      nodeButtonRefs.current[node.index] = el
                    }}
                    type="button"
                    role="tab"
                    id={`timeline-tab-${node.year}`}
                    aria-controls="timeline-milestone-panel"
                    onClick={() => setActiveIndex(node.index)}
                    onMouseEnter={() => setActiveIndex(node.index)}
                    aria-label={`${node.year} — ${timelineMilestones[node.index].title[lang]}`}
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    className={cn(
                      "group relative flex size-11 items-center justify-center rounded-full transition-transform focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none",
                      isActive ? "scale-110" : "hover:scale-105"
                    )}
                  >
                    {/* Outer Glow Ring on Active */}
                    {isActive && (
                      <span className="absolute inset-1.5 animate-ping rounded-full bg-emerald-400/40 opacity-75 motion-reduce:animate-none" />
                    )}

                    {/* Node Circle */}
                    <div
                      className={cn(
                        "relative flex items-center justify-center rounded-full border transition-all duration-200",
                        isActive
                          ? "size-7 border-foreground bg-foreground text-background shadow-md shadow-foreground/20"
                          : isPast
                            ? "size-5 border-foreground/60 bg-card hover:border-foreground"
                            : "size-4.5 border-border bg-muted/80 hover:border-foreground/40"
                      )}
                    >
                      {isActive && (
                        <div className="size-2 rounded-full bg-background" />
                      )}
                    </div>

                    {/* Year Label positioned Above (top) or Below (bottom) */}
                    <span
                      className={cn(
                        "pointer-events-none absolute font-pixel text-base font-bold tracking-wider transition-colors duration-200 select-none",
                        isTop ? "-top-7" : "top-8",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground/75 group-hover:text-foreground"
                      )}
                    >
                      {node.year}
                    </span>
                  </button>
                </div>
              )
            })}
          </div>

          {/* Desktop Milestone Dossier Card */}
          <div
            role="tabpanel"
            id="timeline-milestone-panel"
            aria-labelledby={`timeline-tab-${timelineMilestones[activeIndex].year}`}
            aria-label={
              lang === "id"
                ? "Berkas Tonggak Terpilih"
                : "Selected Milestone Dossier"
            }
            className="mt-2 min-h-43.75 rounded-xl border border-border/50 bg-muted/20 p-5 backdrop-blur-xs transition-colors"
          >
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {lang === "id" ? "Berkas Tonggak" : "Milestone Dossier"}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {activeBadge}
                </Badge>
              </div>
              <span className="font-mono text-xs font-semibold text-muted-foreground">
                {String(activeIndex + 1).padStart(2, "0")} / 05
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="mt-3.5 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading text-lg font-medium text-foreground sm:text-xl">
                    {activeTitle}
                  </h3>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <Calendar className="size-3.5" />
                    <span>{activePeriod}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Building2 className="size-3.5 shrink-0" />
                  <span>{activeInstitution}</span>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {activeSummary}
                </p>

                <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2 lg:grid-cols-3">
                  {activeMilestone.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-foreground/90"
                    >
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
                      <span>{h[lang]}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile & Tablet Layout (<1024px): Vertical Stream */}
        <div className="relative mt-6 lg:hidden">
          {/* Vertical Stem Line */}
          <div className="absolute top-4 bottom-4 left-4.5 w-0.5 bg-border/60 sm:left-6" />

          <div className="space-y-6">
            {timelineMilestones.map((m, idx) => {
              const isSelected = activeIndex === idx
              const title = m.title[lang]
              const institution = m.institution[lang]
              const period = m.period[lang]
              const badge = m.badge[lang]
              const summary = m.summary[lang]

              return (
                <div
                  key={m.id}
                  className="relative flex items-start gap-4 pl-1.5 sm:gap-6"
                >
                  {/* Vertical Node Indicator */}
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`${m.year} — ${title}`}
                    className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card shadow-xs transition-transform hover:scale-105 sm:size-11"
                  >
                    <span
                      className={cn(
                        "font-pixel text-xs font-bold sm:text-sm",
                        isSelected ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {m.year}
                    </span>
                  </button>

                  {/* Milestone Card Content */}
                  <div
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "min-w-0 flex-1 cursor-pointer rounded-xl border p-3.5 transition-all duration-200 sm:p-4",
                      isSelected
                        ? "border-foreground/30 bg-muted/40 shadow-xs"
                        : "border-border/50 bg-card/60 hover:border-border"
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <Badge variant="secondary" className="text-[10px]">
                        {badge}
                      </Badge>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {period}
                      </span>
                    </div>

                    <h3 className="mt-2 font-heading text-base font-medium text-foreground sm:text-lg">
                      {title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {institution}
                    </p>

                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {summary}
                    </p>

                    {isSelected && (
                      <div className="mt-3 space-y-1.5 border-t border-border/50 pt-2.5">
                        {m.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs text-foreground/90"
                          >
                            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
                            <span>{h[lang]}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
