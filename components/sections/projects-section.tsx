"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectDetailDialog } from "@/components/project-detail-dialog"
import { SectionHeading } from "@/components/section-heading"
import { nav, projects, ui, type ProjectEntry } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"
import {
  filterProjects,
  getProjectCategory,
  getProjectCounts,
  projectCategories,
  type ProjectCategory,
} from "@/lib/projects-filter"
import { cn } from "@/lib/utils"

function ProjectsSection() {
  const [activeCategory, setActiveCategory] =
    React.useState<ProjectCategory>("all")
  const [selectedProject, setSelectedProject] =
    React.useState<ProjectEntry | null>(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const projectCounts = React.useMemo(() => getProjectCounts(projects), [])

  const filteredProjects = React.useMemo(
    () => filterProjects(projects, activeCategory),
    [activeCategory]
  )

  const handleOpenDetail = (project: ProjectEntry) => {
    setSelectedProject(project)
    setDialogOpen(true)
  }

  return (
    <section id="projects" className="scroll-mt-20 bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading index="02" title={nav.projects} />

        {/* Interactive Category Filter Tabs */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {projectCategories.map((cat) => {
            const count = projectCounts[cat.id]
            const isActive = activeCategory === cat.id
            return (
              <CategoryTabButton
                key={cat.id}
                category={cat}
                count={count}
                isActive={isActive}
                onClick={() => setActiveCategory(cat.id)}
              />
            )
          })}
        </div>

        {/* Projects Grid (1 col on mobile, 2 cols on tablet/desktop) */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={handleOpenDetail}
            />
          ))}
        </div>
      </div>

      {/* Comprehensive Project Detail Dialog */}
      <ProjectDetailDialog
        project={selectedProject}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  )
}

function CategoryTabButton({
  category,
  count,
  isActive,
  onClick,
}: {
  category: (typeof projectCategories)[number]
  count: number
  isActive: boolean
  onClick: () => void
}) {
  const label = useT(category.label)

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150 select-none sm:text-sm",
        isActive
          ? "bg-primary text-primary-foreground shadow-2xs"
          : "border border-border/80 bg-background/80 text-muted-foreground hover:bg-muted/70 hover:text-foreground"
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 font-mono text-[0.65rem] leading-none font-semibold",
          isActive
            ? "bg-primary-foreground/20 text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {count}
      </span>
    </button>
  )
}

function ProjectCard({
  project,
  onSelect,
}: {
  project: ProjectEntry
  onSelect: (project: ProjectEntry) => void
}) {
  const period = useT(project.period)
  const description = useT(project.description)
  const role = useT(project.role)
  const company = useT(project.company)
  const roleLabel = useT(ui.role)
  const viewProjectLabel = useT(ui.viewProject)

  const category = getProjectCategory(project.id)
  const isEnterprise = category === "enterprise"

  const displayTech = project.tech.slice(0, 4)
  const remainingTechCount = project.tech.length - displayTech.length

  return (
    <Card className="flex h-full flex-col justify-between border-border/70 bg-card/80 transition-all duration-200 hover:border-border hover:shadow-md">
      <div>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2">
            <Badge
              variant={isEnterprise ? "secondary" : "default"}
              className="text-[0.65rem]"
            >
              {isEnterprise ? "Enterprise & B2B" : "Full-Stack & Produk"}
            </Badge>
            <span className="shrink-0 font-mono text-[0.7rem] text-muted-foreground">
              {period}
            </span>
          </div>

          <CardTitle className="mt-2 font-heading text-lg leading-snug font-medium">
            {project.name}
          </CardTitle>
          <p className="text-xs text-muted-foreground">{company}</p>
        </CardHeader>

        <CardContent className="space-y-3 pb-3 text-sm">
          <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {description}
          </p>

          <p className="line-clamp-1 text-xs text-foreground/80">
            <span className="text-muted-foreground">{roleLabel}: </span>
            {role}
          </p>

          {/* Key Technologies */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {displayTech.map((tech) => (
              <Badge
                key={`${project.id}-${tech}`}
                variant="muted"
                className="text-[0.65rem]"
              >
                {tech}
              </Badge>
            ))}
            {remainingTechCount > 0 && (
              <Badge variant="outline" className="font-mono text-[0.65rem]">
                +{remainingTechCount}
              </Badge>
            )}
          </div>
        </CardContent>
      </div>

      {/* Action Footer */}
      <div className="mx-6 flex items-center justify-between border-t border-border/60 py-3 text-xs">
        <span className="font-mono text-[0.7rem] text-muted-foreground">
          {project.bullets?.length ?? 0} poin arsitektur
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1 text-xs hover:text-primary"
          onClick={() => onSelect(project)}
        >
          {viewProjectLabel}
          <ArrowRight className="size-3" />
        </Button>
      </div>
    </Card>
  )
}

export { ProjectsSection }
