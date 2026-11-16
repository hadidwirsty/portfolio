"use client"

import * as React from "react"
import { useReducedMotion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

import type { ProjectEntry } from "@/lib/cv-data"
import { useLanguage } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderBentoCard } from "@/components/portfolio/folder-bento-card"
import { ProjectDetailDialog } from "@/components/project-detail-dialog"
import {
  EXPERIENCE_FILTER_DEFS,
  getExperienceCategoryCounts,
  getFilteredProjects,
  type ExperienceFilterCategory,
} from "@/lib/portfolio-experience-filter"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Re-export Project Sequence Constants from Single Source of Truth
// ---------------------------------------------------------------------------

export {
  FEATURED_PROJECT_IDS,
  ADDITIONAL_PROJECT_IDS,
} from "@/lib/portfolio-experience-filter"

export interface PortfolioCardFolderProps {
  onSelectProject?: (project: ProjectEntry) => void
  className?: string
}

export function PortfolioCardFolder({
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
    React.useState<ProjectEntry | null>(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  // Stable references for auto-scroll target and accessible focus management
  const sectionRef = React.useRef<HTMLElement>(null)
  const headingRef = React.useRef<HTMLHeadingElement>(null)

  // Derived filtered & sorted projects based on active filter
  const visibleProjects = React.useMemo(() => {
    return getFilteredProjects(activeFilter)
  }, [activeFilter])

  // Dynamic project counts per category
  const counts = React.useMemo(() => {
    return getExperienceCategoryCounts()
  }, [])

  const handleSelectProject = (project: ProjectEntry) => {
    setSelectedProject(project)
    setDialogOpen(true)
    onSelectProject?.(project)
  }

  // Expansion indicator for shortcut button & ARIA sync
  const isExpanded = activeFilter !== "featured"

  const handleShortcutToggle = () => {
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

  // Active filter definition for badge styling
  const activeDef = EXPERIENCE_FILTER_DEFS.find((d) => d.id === activeFilter)
  const totalCount = counts.all
  const featuredCount = counts.featured
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
      aria-label={
        lang === "id"
          ? "02 / Karya Terpilih — Map Arsip Proyek"
          : "02 / Selected Works — Project Card Folders"
      }
    >
      {/* 1. Section Header Card */}
      <div className="flex flex-col gap-2 pb-5 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              02 // {lang === "id" ? "Karya Terpilih" : "Selected Works"}
            </span>
            <Badge variant="outline" className="font-mono text-[10px]">
              {activeDef
                ? `${counts[activeFilter]} ${activeDef.badgeLabel?.[lang] ?? activeDef.label[lang]}`
                : `${counts.featured} Proyek Unggulan`}
            </Badge>
          </div>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="mt-1 font-heading text-xl font-medium tracking-tight text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:text-2xl"
          >
            {lang === "id"
              ? "Sistem Rekayasa & Produk Berdampak"
              : "Engineered Systems & High-Impact Products"}
          </h2>
        </div>

        <p className="max-w-md font-sans text-xs leading-relaxed text-muted-foreground sm:text-right sm:text-sm">
          {lang === "id"
            ? "Arsip map bento sistem enterprise dan produk full-stack terkurasi dengan rincian arsitektur teknis."
            : "Curated bento folders of enterprise systems and full-stack products with deep architectural specs."}
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
        {EXPERIENCE_FILTER_DEFS.map((def) => {
          const isActive = activeFilter === def.id
          const count = counts[def.id]

          return (
            <button
              key={def.id}
              role="tab"
              type="button"
              id={`filter-tab-${def.id}`}
              aria-selected={isActive}
              aria-controls="all-projects-drawer"
              onClick={() => setActiveFilter(def.id)}
              className={cn(
                "group inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-all select-none",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
                isActive
                  ? "bg-foreground font-semibold text-background shadow-xs"
                  : "border border-border/80 bg-card/70 text-muted-foreground hover:border-foreground/30 hover:bg-muted hover:text-foreground"
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
            key={project.id}
            project={project}
            index={idx}
            onSelectProject={handleSelectProject}
            isDialogOpen={dialogOpen && selectedProject?.id === project.id}
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
          className="group inline-flex cursor-pointer items-center gap-2 rounded-full border-border/80 bg-card/80 px-6 py-2.5 text-xs font-medium text-foreground shadow-xs backdrop-blur-md transition-all hover:border-foreground/40 hover:bg-card focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:text-sm"
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
      />
    </section>
  )
}
