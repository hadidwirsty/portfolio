"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import { nav, projects, ui } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"

function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-20 bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading index="02" title={nav.projects} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const period = useT(project.period)
  const description = useT(project.description)
  const role = useT(project.role)
  const roleLabel = useT(ui.role)

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{project.name}</CardTitle>
          <span className="shrink-0 font-mono text-[0.7rem] text-muted-foreground">
            {period}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{project.company}</p>
      </CardHeader>
      <CardContent>
        <p className="leading-relaxed text-muted-foreground">{description}</p>
        <p className="text-foreground/80">
          <span className="text-muted-foreground">{roleLabel}: </span>
          {role}
        </p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <Badge key={tech} variant="muted">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export { ProjectsSection }
