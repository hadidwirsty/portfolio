"use client"

import * as React from "react"
import { useReducedMotion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

import { useLanguage } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderBentoCard } from "@/components/portfolio/folder-bento-card"
import { ProjectDetailDialog } from "@/components/project-detail-dialog"
import {
  focusContextualTarget,
  replaceContextualFragment,
  useContextualFragment,
} from "@/hooks/use-contextual-fragment"
import type { ExperienceFilterCategory } from "@/lib/portfolio-experience-filter"
import type {
  PublicProjectCard,
  PublicSelectedWorks,
} from "@/lib/public-portfolio-data"
import type { PublicProjectRef } from "@/lib/skills-portfolio-relationships"
import {
  getProjectFragment,
  getProjectTargetFilter,
  PROJECT_FRAGMENT_PREFIX,
  readProjectFragment,
} from "@/lib/skills-portfolio-navigation"
import { cn } from "@/lib/utils"

export interface PortfolioCardFolderProps {
  selectedWorks: PublicSelectedWorks
  onSelectProject?: (project: PublicProjectCard) => void
  className?: string
}

export function PortfolioCardFolder({
  selectedWorks,
  onSelectProject,
  className,
}: PortfolioCardFolderProps) {
  const { lang } = useLanguage()
  const shouldReduceMotion = useReducedMotion() ?? false

  // Single active filter state defaulting to "featured"
  const [activeFilter, setActiveFilter] =
    React.useState<ExperienceFilterCategory>("featured")

  // Selected project for the single reused ProjectDetailDialog
  const [selectedProject, setSelectedProject] =
    React.useState<PublicProjectCard | null>(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [dialogPresent, setDialogPresent] = React.useState(false)
  const [focusRequest, setFocusRequest] = React.useState<{
    ref: PublicProjectRef
  } | null>(null)
  const handledFocusRequest = React.useRef<typeof focusRequest>(null)
  const hadProjectContext = React.useRef(false)

  // Stable references for auto-scroll target and accessible focus management
  const sectionRef = React.useRef<HTMLElement>(null)
  const headingRef = React.useRef<HTMLHeadingElement>(null)

  useContextualFragment("/portfolio", (fragment) => {
    if (fragment && !fragment.startsWith(PROJECT_FRAGMENT_PREFIX)) {
      setFocusRequest(null)
      return
    }
    const restoreDefault = Boolean(fragment) || hadProjectContext.current
    hadProjectContext.current = Boolean(fragment)
    const ref = readProjectFragment(fragment, selectedWorks.projectsByRef)
    const filter =
      ref && getProjectTargetFilter(selectedWorks.filters, activeFilter, ref)
    if (ref && filter) {
      const targetFragment = getProjectFragment(ref)
      if (fragment !== targetFragment) {
        replaceContextualFragment(targetFragment)
      }
      setActiveFilter(filter)
      setDialogOpen(false)
      setFocusRequest({ ref })
    } else {
      setFocusRequest(null)
      if (restoreDefault) {
        setActiveFilter("featured")
        setDialogOpen(false)
      }
    }
  })

  React.useEffect(() => {
    if (
      dialogPresent ||
      !focusRequest ||
      handledFocusRequest.current === focusRequest
    )
      return
    const fragment = getProjectFragment(focusRequest.ref)
    const frame = requestAnimationFrame(() => {
      // A cached Portfolio view can resume with the preceding project's request.
      if (
        window.location.pathname !== "/portfolio" ||
        window.location.hash !== fragment
      )
        return

      const target = sectionRef.current?.querySelector<HTMLElement>(
        `#${CSS.escape(fragment.slice(1))}`
      )
      if (!target?.getClientRects().length) return

      focusContextualTarget(target)
      handledFocusRequest.current = focusRequest
    })
    return () => cancelAnimationFrame(frame)
  }, [activeFilter, dialogPresent, focusRequest])

  const handleSelectProject = (project: PublicProjectCard) => {
    setFocusRequest(null)
    setSelectedProject(project)
    setDialogPresent(true)
    setDialogOpen(true)
    onSelectProject?.(project)
  }

  // Expansion indicator for shortcut button & ARIA sync
  const isExpanded = activeFilter !== "featured"

  const handleShortcutToggle = () => {
    setFocusRequest(null)
    if (activeFilter === "featured") {
      // 1. Expand: View all projects without changing vertical scroll position
      setActiveFilter("all")
    } else {
      // 2. Collapse: Return to featured view and smoothly auto-scroll to the top of Selected Works
      setActiveFilter("featured")

      // Smoothly scroll to the section container with safe navigation offset
      sectionRef.current?.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      })

      // Shift focus to the section heading for screen readers without re-scrolling to the bottom
      headingRef.current?.focus({ preventScroll: true })
    }
  }

  const activeDef = selectedWorks.filters.find((def) => def.id === activeFilter)
  const visibleProjects = (activeDef?.projectRefs ?? []).map(
    (ref) => selectedWorks.projectsByRef[ref]
  )
  const totalCount = Object.keys(selectedWorks.projectsByRef).length
  const featuredCount =
    selectedWorks.filters.find((def) => def.id === "featured")?.projectRefs
      .length ?? 0
  const additionalCount = totalCount - featuredCount

  // Dynamic bilingual shortcut toggle label
  const shortcutButtonLabel =
    activeFilter === "featured"
      ? lang === "id"
        ? `Lihat Semua ${totalCount} Proyek`
        : `View All ${totalCount} Projects`
      : lang === "id"
        ? `Tampilkan ${featuredCount} Proyek Unggulan`
        : `Show ${featuredCount} Featured Projects`

  return (
    <section
      ref={sectionRef}
      id="selected-works"
      className={cn(
        "relative w-full scroll-mt-20 select-none sm:scroll-mt-24",
        className
      )}
      aria-labelledby="portfolio-projects-heading"
    >
      {/* 1. Section Header Card */}
      <div className="flex flex-col gap-2 pb-5 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
        <h2
          id="portfolio-projects-heading"
          ref={headingRef}
          tabIndex={-1}
          className="font-heading text-xl font-medium tracking-tight text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:text-2xl"
        >
          {lang === "id" ? "Proyek" : "Projects"}
        </h2>

        <p className="max-w-md font-sans text-xs leading-relaxed text-muted-foreground sm:text-right sm:text-sm">
          {lang === "id"
            ? "Pilih filter untuk menjelajahi proyek berdasarkan afiliasi."
            : "Choose a filter to browse projects by affiliation."}
        </p>
      </div>

      {/* 2. Work Experience Category Filter Pills */}
      <div
        role="tablist"
        aria-label={
          lang === "id"
            ? "Filter Kategori Pengalaman Kerja"
            : "Work Experience Category Filter"
        }
        className="-mx-4 mb-6 no-scrollbar flex items-center gap-2 overflow-x-auto px-4 sm:mx-0 sm:mb-8 sm:flex-wrap sm:px-0"
      >
        {selectedWorks.filters.map((def) => {
          const isActive = activeFilter === def.id
          const count = def.projectRefs.length

          return (
            <button
              key={def.id}
              role="tab"
              type="button"
              id={`filter-tab-${def.id}`}
              aria-selected={isActive}
              aria-controls="all-projects-drawer"
              onClick={() => {
                setFocusRequest(null)
                setActiveFilter(def.id)
              }}
              className={cn(
                "group inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-all select-none",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
                isActive
                  ? "bg-foreground font-semibold text-background shadow-xs"
                  : "border border-border/50 bg-card/70 text-muted-foreground hover:border-foreground/30 hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{def.label[lang]}</span>
              <span
                className={cn(
                  "py-0.2 rounded-full px-1.5 font-mono text-[10px]",
                  isActive
                    ? "bg-background/25 font-bold text-background"
                    : "bg-muted text-muted-foreground group-hover:text-foreground"
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* 3. Filtered Bento Folder Grid */}
      <div
        id="all-projects-drawer"
        role="region"
        aria-live="polite"
        aria-label={
          lang === "id"
            ? `Daftar proyek ${activeDef?.label[lang] ?? ""}`
            : `${activeDef?.label[lang] ?? ""} project list`
        }
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {visibleProjects.map((project, idx) => (
          <FolderBentoCard
            key={project.ref}
            project={project}
            index={idx}
            onSelectProject={handleSelectProject}
            isDialogOpen={dialogOpen && selectedProject?.ref === project.ref}
          />
        ))}
      </div>

      {/* 4. Quick Shortcut Toggle Control (View All / Show Featured) */}
      <div className="mt-8 flex justify-center sm:mt-10">
        <Button
          type="button"
          variant="outline"
          onClick={handleShortcutToggle}
          aria-expanded={isExpanded}
          aria-controls="all-projects-drawer"
          className="group inline-flex cursor-pointer items-center gap-2 rounded-full border-border/50 bg-card/80 px-6 py-2.5 text-xs font-medium text-foreground shadow-xs backdrop-blur-md transition-all hover:border-foreground/40 hover:bg-card focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:text-sm"
        >
          <span>{shortcutButtonLabel}</span>
          {!isExpanded && (
            <Badge
              variant="secondary"
              className="font-mono text-[10px] text-muted-foreground"
            >
              +{additionalCount}
            </Badge>
          )}
          {isExpanded ? (
            <ChevronUp className="size-4 transition-transform group-hover:-translate-y-0.5" />
          ) : (
            <ChevronDown className="size-4 transition-transform group-hover:translate-y-0.5" />
          )}
        </Button>
      </div>

      {/* 5. Single Reused ProjectDetailDialog */}
      <ProjectDetailDialog
        project={selectedProject}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onOpenChangeComplete={setDialogPresent}
      />
    </section>
  )
}
