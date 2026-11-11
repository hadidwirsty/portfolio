"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Download, Mail } from "lucide-react"

import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { profile } from "@/lib/cv-data"
import { useLanguage, useT } from "@/lib/language-context"
import { StatusPage } from "@/components/status-page"

export function MaintenanceView() {
  const { lang } = useLanguage()
  const cvFile = useT(profile.cvFile)

  const heading = lang === "id" ? "Pemeliharaan" : "Maintenance"
  const chipText = lang === "id" ? "Dalam perbaikan" : "Under maintenance"
  const title =
    lang === "id" ? "Halaman sedang diperbarui" : "This page is being updated"
  const description =
    lang === "id"
      ? "Saya sedang merombak tampilan halaman ini agar sesuai dengan desain terbaru. Silakan kembali lagi sebentar lagi."
      : "I'm reworking this page to match the new design. Please check back soon."

  const primaryLabel = lang === "id" ? "Kembali ke beranda" : "Back to home"
  const secondaryLabel = lang === "id" ? "Unduh CV" : "Download CV"
  const alternateContactLabel =
    lang === "id" ? "Hubungi saya langsung via:" : "Reach me directly via:"

  return (
    <StatusPage
      heading={heading}
      chipText={chipText}
      chipDotColor="bg-emerald-500"
      title={title}
      description={description}
      actions={
        <div className="flex w-full items-center justify-between gap-2">
          <Link
            href="/"
            className="inline-flex h-11 w-1/2 flex-1 items-center justify-center gap-1.5 rounded-full bg-foreground px-2 font-sans text-xs font-medium whitespace-nowrap text-background transition-[opacity,transform] duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring active:scale-[0.98] sm:h-10 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <ArrowLeft className="size-4 shrink-0" />
            <span className="truncate">{primaryLabel}</span>
          </Link>

          <a
            href={cvFile}
            download
            className="inline-flex h-11 w-1/2 flex-1 items-center justify-center gap-1.5 rounded-full border border-border/80 bg-card/60 px-2 font-sans text-xs font-medium whitespace-nowrap text-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-card/90 focus-visible:outline-2 focus-visible:outline-ring active:scale-[0.98] sm:h-10 sm:gap-2 sm:px-4 sm:text-sm"
            title={secondaryLabel}
          >
            <Download className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{secondaryLabel}</span>
          </a>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-2 text-center text-xs text-muted-foreground sm:text-sm">
        <span className="font-medium text-foreground/80">
          {alternateContactLabel}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-1.5 break-all transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <Mail className="size-3.5 shrink-0" />
            <span>{profile.email}</span>
          </a>
          <a
            href={profile.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <GithubIcon className="size-3.5 shrink-0" />
            <span>GitHub</span>
          </a>
          <a
            href={profile.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <LinkedinIcon className="size-3.5 shrink-0" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </StatusPage>
  )
}
