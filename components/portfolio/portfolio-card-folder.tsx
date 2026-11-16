"use client"

import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

import { projects, type ProjectEntry } from "@/lib/cv-data"
import { useLanguage } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderBentoCard } from "@/components/portfolio/folder-bento-card"
import { ProjectDetailDialog } from "@/components/project-detail-dialog"
import { cn } from "@/lib/utils"

export const FEATURED_PROJECT_IDS = [
  "hiblow-fleet",
  "is-ware",
  "alisa",
  "wbs",
  "info-tender",
  "imaps",
] as const

export const ADDITIONAL_PROJECT_IDS = [
  "monara",
  "cart",
  "caterine-cm",
  "pis-mars",
] as const

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

  const [isExpanded, setIsExpanded] = React.useState(false)
  const [selectedProject, setSelectedProject] =
    React.useState<ProjectEntry | null>(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const toggleButtonRef = React.useRef<HTMLButtonElement>(null)

  const featuredProjects = React.useMemo(() => {
    return FEATURED_PROJECT_IDS.map((id) =>
      projects.find((p) => p.id === id)
    ).filter((p): p is ProjectEntry => Boolean(p))
  }, [])

  const additionalProjects = React.useMemo(() => {
    return ADDITIONAL_PROJECT_IDS.map((id) =>
      projects.find((p) => p.id === id)
    ).filter((p): p is ProjectEntry => Boolean(p))
  }, [])

  const handleSelectProject = (project: ProjectEntry) => {
    setSelectedProject(project)
    setDialogOpen(true)
    onSelectProject?.(project)
  }

  const handleToggleExpand = () => {
    setIsExpanded((prev) => {
      const next = !prev
      if (!next) {
        // Safe focus restoration when collapsing drawer
        setTimeout(() => {
          toggleButtonRef.current?.focus()
        }, 50)
      }
      return next
    })
  }

  const expandButtonLabel = isExpanded
    ? lang === "id"
      ? "Tampilkan 6 Proyek Unggulan"
      : "Show 6 Featured Projects"
    : lang === "id"
      ? "Lihat Semua 10 Proyek"
      : "View All 10 Projects"

  return (
    <section
      id="selected-works"
      className={cn("relative w-full scroll-mt-20 select-none", className)}
      aria-label={
        lang === "id"
          ? "02 / Karya Terpilih — Map Arsip Proyek"
          : "02 / Selected Works — Project Card Folders"
      }
    >
      {/* Section Header Card */}
      <div className="flex flex-col gap-2 pb-6 sm:flex-row sm:items-center sm:justify-between sm:pb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              02 // {lang === "id" ? "Karya Terpilih" : "Selected Works"}
            </span>
            <Badge variant="outline" className="font-mono text-[10px]">
              {isExpanded
                ? lang === "id"
                  ? "Semua 10 Proyek"
                  : "All 10 Projects"
                : lang === "id"
                  ? "6 Proyek Unggulan"
                  : "6 Featured Works"}
            </Badge>
          </div>
          <h2 className="mt-1 font-heading text-xl font-medium tracking-tight text-foreground sm:text-2xl">
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

      {/* 1. Featured Bento Folder Grid (6 Projects) */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {featuredProjects.map((project, idx) => (
          <FolderBentoCard
            key={project.id}
            project={project}
            index={idx}
            onSelectProject={handleSelectProject}
          />
        ))}
      </div>

      {/* 2. Expandable Drawer for Additional Projects */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id="all-projects-drawer"
            key="all-projects-drawer"
            role="region"
            aria-label={
              lang === "id" ? "Proyek Tambahan" : "Additional Projects"
            }
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, height: "auto" }
            }
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }
            }
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden pt-5 lg:pt-6"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {additionalProjects.map((project, idx) => (
                <FolderBentoCard
                  key={project.id}
                  project={project}
                  index={FEATURED_PROJECT_IDS.length + idx}
                  onSelectProject={handleSelectProject}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Expand / Collapse Trigger Control */}
      <div className="mt-8 flex justify-center sm:mt-10">
        <Button
          ref={toggleButtonRef}
          type="button"
          variant="outline"
          onClick={handleToggleExpand}
          aria-expanded={isExpanded}
          aria-controls="all-projects-drawer"
          className="group inline-flex cursor-pointer items-center gap-2 rounded-full border-border/80 bg-card/80 px-6 py-2.5 text-xs font-medium text-foreground shadow-xs backdrop-blur-md transition-all hover:border-foreground/40 hover:bg-card focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:text-sm"
        >
          <span>{expandButtonLabel}</span>
          {!isExpanded && (
            <Badge
              variant="secondary"
              className="font-mono text-[10px] text-muted-foreground"
            >
              +4
            </Badge>
          )}
          {isExpanded ? (
            <ChevronUp className="size-4 transition-transform group-hover:-translate-y-0.5" />
          ) : (
            <ChevronDown className="size-4 transition-transform group-hover:translate-y-0.5" />
          )}
        </Button>
      </div>

      {/* 4. Single Reused ProjectDetailDialog */}
      <ProjectDetailDialog
        project={selectedProject}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  )
}
