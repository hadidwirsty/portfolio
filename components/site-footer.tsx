"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"

import { profile, ui } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"

function SiteFooter() {
  const year = new Date().getFullYear()
  const role = useT(profile.role)
  const footerNote = useT(ui.footerNote)
  const backToTopLabel = useT(ui.backToTop)

  return (
    <footer
      role="contentinfo"
      className="border-t border-border/60 bg-background/50 text-xs text-muted-foreground backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        {/* Kiri: Identitas & Hak Cipta */}
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p className="font-sans font-medium text-foreground">
            © {year} {profile.name} <span className="opacity-40">•</span> {role}
          </p>
          <p className="text-[0.7rem] text-muted-foreground">{footerNote}</p>
        </div>

        {/* Kanan: Tautan Sosial & Kembali ke Atas */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href={profile.linkedin.href}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={profile.github.href}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={profile.website.href}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Website
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-foreground"
          >
            Email
          </a>

          <a
            href="#top"
            className="inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:underline"
            aria-label={backToTopLabel}
          >
            <span>{backToTopLabel}</span>
            <ArrowUp className="size-3" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export { SiteFooter }
