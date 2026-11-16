"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowUpRight,
  Database,
  Layers,
  ShieldCheck,
  Workflow,
  Cpu,
  Terminal,
  Activity,
  ShieldAlert,
  FileCheck2,
  Ship,
} from "lucide-react"

import type { ProjectEntry } from "@/lib/cv-data"
import { useLanguage } from "@/lib/language-context"
import { getProjectCategory } from "@/lib/projects-filter"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface FolderBentoCardProps {
  project: ProjectEntry
  index: number
  onSelectProject: (project: ProjectEntry) => void
  className?: string
}

// Render deterministic blueprint technical icon declared outside render
function renderBlueprintIcon(id: string) {
  const iconClass = "size-7 stroke-[1.6] sm:size-8"
  switch (id) {
    case "hiblow-fleet":
      return <Workflow className={iconClass} />
    case "is-ware":
      return <Database className={iconClass} />
    case "alisa":
      return <Layers className={iconClass} />
    case "wbs":
      return <ShieldCheck className={iconClass} />
    case "info-tender":
      return <Cpu className={iconClass} />
    case "imaps":
      return <Terminal className={iconClass} />
    case "monara":
      return <Activity className={iconClass} />
    case "cart":
      return <ShieldAlert className={iconClass} />
    case "caterine-cm":
      return <FileCheck2 className={iconClass} />
    case "pis-mars":
      return <Ship className={iconClass} />
    default:
      return <Layers className={iconClass} />
  }
}

export function FolderBentoCard({
  project,
  index,
  onSelectProject,
  className,
}: FolderBentoCardProps) {
  const { lang } = useLanguage()
  const shouldReduceMotion = useReducedMotion() ?? false
  const [isHovered, setIsHovered] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)

  const category = getProjectCategory(project.id)
  const isEnterprise = category === "enterprise"

  const tabIndexLabel = `TAB // ${String(index + 1).padStart(2, "0")}`
  const categoryLabel =
    category === "enterprise"
      ? lang === "id"
        ? "ENTERPRISE"
        : "ENTERPRISE"
      : lang === "id"
        ? "PRODUK MANDIRI"
        : "FULL-STACK"

  const title = project.name
  const company = project.company[lang]
  const description = project.description[lang]
  const ctaLabel = lang === "id" ? "Lihat Detail" : "View Details"

  const displayTech = project.tech.slice(0, 4)
  const remainingCount = project.tech.length - displayTech.length

  const isLifted = (isHovered || isFocused) && !shouldReduceMotion

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault()
      onSelectProject(project)
    }
  }

  return (
    <article
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-label={`${title} — ${company}`}
      className={cn(
        "group relative flex flex-col rounded-2xl pt-7 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
        className
      )}
    >
      {/* 1. Physical Folder Ear Tab */}
      <div className="absolute top-0 left-0 z-10 flex items-center gap-2.5 rounded-t-xl rounded-tr-md border-x border-t border-border/80 bg-card/90 px-3.5 py-1.5 shadow-2xs backdrop-blur-md transition-colors group-hover:border-foreground/30">
        <span className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
          {tabIndexLabel}
        </span>
        <span className="font-mono text-[9px] font-bold tracking-widest text-foreground/75 uppercase">
          {categoryLabel}
        </span>
      </div>

      {/* 2. Folder Pocket Container */}
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl rounded-tl-none border border-border/70 bg-card/75 p-4 shadow-xs backdrop-blur-md transition-all duration-300 group-hover:border-foreground/30 sm:p-5">
        {/* 3. Inner Sheet with Spring Lift Animation */}
        <motion.div
          animate={
            isLifted
              ? {
                  y: -18,
                  transition: { type: "spring", stiffness: 320, damping: 26 },
                }
              : {
                  y: 0,
                  transition: { type: "spring", stiffness: 320, damping: 26 },
                }
          }
          className="relative flex flex-1 flex-col justify-between"
        >
          {/* Blueprint Technical Graphic Cover */}
          <div className="relative mb-4 flex h-36 w-full flex-col justify-between overflow-hidden rounded-xl border border-border/60 bg-muted/30 p-3 select-none sm:h-40">
            {/* Blueprint Grid Texture SVG */}
            <svg
              className="pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)] stroke-border/40"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id={`blueprint-grid-${project.id}`}
                  width="18"
                  height="18"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M 18 0 L 0 0 0 18" fill="none" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill={`url(#blueprint-grid-${project.id})`}
              />
            </svg>

            {/* Corner Blueprint Crosshairs */}
            <div className="pointer-events-none absolute top-1.5 left-2 font-mono text-[9px] text-muted-foreground/60">
              +
            </div>
            <div className="pointer-events-none absolute top-1.5 right-2 font-mono text-[9px] text-muted-foreground/60">
              +
            </div>
            <div className="pointer-events-none absolute bottom-1.5 left-2 font-mono text-[9px] text-muted-foreground/60">
              +
            </div>
            <div className="pointer-events-none absolute right-2 bottom-1.5 font-mono text-[9px] text-muted-foreground/60">
              +
            </div>

            {/* Top Bar of Blueprint: Reference Code & Category Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground">
                REF // {project.id.toUpperCase()}
              </span>
              <Badge
                variant={isEnterprise ? "secondary" : "default"}
                className="font-mono text-[9px] tracking-wide uppercase"
              >
                {isEnterprise
                  ? "Enterprise"
                  : lang === "id"
                    ? "Produk"
                    : "Full-Stack"}
              </Badge>
            </div>

            {/* Center Blueprint Emblem */}
            <div className="relative z-10 flex flex-1 items-center justify-center py-2">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-border/70 bg-card/85 text-foreground/80 shadow-xs transition-transform duration-300 group-hover:scale-105 sm:size-16">
                {renderBlueprintIcon(project.id)}
              </div>
            </div>

            {/* Bottom Bar of Blueprint: Micro Spec Info */}
            <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
              <span>{project.period[lang]}</span>
              <span className="max-w-[140px] truncate text-right sm:max-w-[180px]">
                {company}
              </span>
            </div>
          </div>

          {/* Project Details Content */}
          <div className="flex flex-1 flex-col">
            <h3 className="font-heading text-lg font-medium tracking-tight text-foreground sm:text-xl">
              {title}
            </h3>
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">
              {company}
            </p>

            <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {description}
            </p>

            {/* Tech Stack Chips */}
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {displayTech.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="font-mono text-[10px] text-muted-foreground"
                >
                  {t}
                </Badge>
              ))}
              {remainingCount > 0 && (
                <Badge
                  variant="outline"
                  className="font-mono text-[10px] font-semibold text-muted-foreground"
                >
                  +{remainingCount}
                </Badge>
              )}
            </div>
          </div>

          {/* Footer Action CTA */}
          <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-3.5">
            <span className="font-mono text-[11px] text-muted-foreground">
              {lang === "id" ? "Rincian Teknis" : "Technical Specs"}
            </span>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onSelectProject(project)
              }}
              aria-label={`${ctaLabel}: ${title}`}
              className="group/btn inline-flex cursor-pointer items-center gap-1.5 rounded-full border-border/80 px-3.5 py-1 text-xs font-medium text-foreground transition-all hover:border-foreground/50 hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-primary active:scale-95"
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </article>
  )
}
