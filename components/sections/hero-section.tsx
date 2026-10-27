"use client"

import Image from "next/image"
import { ArrowDown, Globe, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { profile, ui } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"

function HeroSection() {
  const role = useT(profile.role)
  const tagline = useT(profile.tagline)
  const summary = useT(profile.summary)
  const location = useT(profile.location)
  const downloadLabel = useT(ui.downloadCv)
  const contactLabel = useT(ui.contactMe)
  const availableLabel = useT(ui.availableFor)
  const cvFile = useT(profile.cvFile)

  return (
    <section
      id="about"
      className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-72 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--foreground),transparent_94%),transparent)]"
      />
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-6 sm:grid-cols-[1.2fr_0.8fr] sm:gap-8">
        <div className="animate-in duration-700 fade-in slide-in-from-bottom-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {availableLabel}
          </span>

          <h1 className="mt-6 font-heading text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl">
            {profile.name}
          </h1>

          <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
            {role}
          </p>
          <p className="mt-1 font-heading text-lg text-foreground/80 italic sm:text-xl">
            {tagline}
          </p>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" render={<a href={cvFile} download />}>
              {downloadLabel}
            </Button>
            <Button variant="outline" size="lg" render={<a href="#contact" />}>
              {contactLabel}
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span>{location}</span>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Mail className="size-3.5" /> {profile.email}
            </a>
            <a
              href={profile.linkedin.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <LinkedinIcon className="size-3.5" /> LinkedIn
            </a>
            <a
              href={profile.github.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-3.5" /> GitHub
            </a>
            <a
              href={profile.website.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Globe className="size-3.5" /> Website
            </a>
          </div>
        </div>

        <div className="order-first flex animate-in justify-center duration-700 fade-in slide-in-from-bottom-6 sm:order-last">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-[2rem] border border-dashed border-border/70 sm:-inset-4"
            />
            <div className="relative aspect-[4/5] w-48 overflow-hidden rounded-3xl bg-muted shadow-xl sm:w-64">
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                priority
                sizes="(min-width: 640px) 16rem, 12rem"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#experience"
        aria-label="Scroll to experience"
        className="mx-auto mt-16 hidden w-fit items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
      >
        <ArrowDown className="size-3.5 animate-bounce" />
      </a>
    </section>
  )
}

export { HeroSection }
