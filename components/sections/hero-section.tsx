"use client"

import * as React from "react"
import Image from "next/image"
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  FileText,
  Globe,
  Mail,
} from "lucide-react"

import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { copyTextToClipboard } from "@/lib/clipboard"
import { profile, ui, nav } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"

type HoveredSection =
  "about" | "projects" | "stack" | "contact" | "resume" | null

function HeroSection() {
  const role = useT(profile.role)
  const tagline = useT(profile.tagline)
  const summary = useT(profile.summary)
  const location = useT(profile.location)
  const downloadLabel = useT(ui.downloadCv)
  const contactLabel = useT(ui.contactMe)
  const contactPrompt = useT(ui.contactPrompt)
  const availableLabel = useT(ui.availableFor)
  const copyEmailLabel = useT(ui.copyEmail)
  const copiedLabel = useT(ui.copied)
  const greeting = useT(ui.greeting)
  const cvFile = useT(profile.cvFile)

  const navAbout = useT(nav.about)
  const navProjects = useT(nav.projects)
  const navSkills = useT(nav.skills)
  const navContact = useT(nav.contact)

  const [hoveredCard, setHoveredCard] = React.useState<HoveredSection>(null)
  const [copied, setCopied] = React.useState(false)
  const [timeString, setTimeString] = React.useState("")

  // Live Clock (Local Indonesia / WIB Time) ala Vexoo
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
      })
      setTimeString(`${formatted} WIB`)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const ok = await copyTextToClipboard(profile.email)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Dynamic Kinetic Heading text based on hovered bento card
  const getHeadingText = () => {
    switch (hoveredCard) {
      case "about":
        return navAbout
      case "projects":
        return navProjects
      case "stack":
        return navSkills
      case "contact":
        return navContact
      case "resume":
        return "Resume"
      default:
        return profile.name
    }
  }

  return (
    <section
      id="about"
      className="relative mx-auto max-w-6xl px-4 pt-4 pb-12 sm:px-6 sm:pt-6 sm:pb-20 lg:px-8"
    >
      {/* 1. SUB-HEADER METADATA BAR (Meniru Vexoo top metadata bar) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3 font-mono text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-sans font-bold text-foreground">
            {profile.name}
          </span>
          <span className="opacity-40">/</span>
          <span>{role}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <span>{location}</span>
          <span className="opacity-40">•</span>
          <span>{timeString || "WIB"}</span>
          <span className="relative ml-0.5 flex size-2 items-center justify-center">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-lime-400 dark:bg-lime-400" />
          </span>
        </div>
      </div>

      {/* 2. KINETIC INTERACTIVE HEADING (Signature Vexoo Kinetic Display) */}
      <div className="relative my-8 overflow-hidden py-2 text-center select-none sm:my-14">
        <h1
          className="font-sans text-4xl leading-none font-black tracking-tighter text-foreground transition-all duration-300 sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ willChange: "transform, opacity" }}
        >
          {getHeadingText()}
        </h1>
        <p className="mt-2 font-heading text-xs text-muted-foreground italic sm:text-sm">
          {tagline}
        </p>
      </div>

      {/* 3. VEXOO BENTO GRID HUB (5 Kartu Interaktif) */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-4">
        {/* CARD 1: ABOUT CARD (Span 1) */}
        <a
          href="#experience"
          onMouseEnter={() => setHoveredCard("about")}
          onMouseLeave={() => setHoveredCard(null)}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/40 p-5 backdrop-blur-md transition-all duration-300 hover:border-foreground/30 hover:bg-card/70 sm:rounded-3xl sm:p-6 md:col-span-1"
        >
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs font-bold tracking-wider text-muted-foreground uppercase group-hover:text-foreground">
              {navAbout}
            </span>
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
          </div>

          <div className="my-5 flex items-center justify-center">
            <div className="relative size-20 overflow-hidden rounded-full border border-border/80 bg-muted shadow-md transition-transform duration-500 group-hover:scale-105 sm:size-24">
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                priority
                quality={90}
                sizes="6rem"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <p className="font-sans text-sm font-bold text-foreground">
              {greeting}
            </p>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {summary}
            </p>
          </div>
        </a>

        {/* CARD 2: PROJECTS / PORTFOLIO CARD (Span 2) */}
        <a
          href="#projects"
          onMouseEnter={() => setHoveredCard("projects")}
          onMouseLeave={() => setHoveredCard(null)}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/40 p-5 backdrop-blur-md transition-all duration-300 hover:border-foreground/30 hover:bg-card/70 sm:rounded-3xl sm:p-6 md:col-span-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs font-bold tracking-wider text-muted-foreground uppercase group-hover:text-foreground">
                {navProjects}
              </span>
              <span className="rounded-full bg-foreground/5 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
                10+ Apps
              </span>
            </div>
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
          </div>

          <div className="my-4">
            <h2 className="font-sans text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Enterprise Web Solutions
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Frontend engineering for BPJS Kesehatan, Red Teaming intelligence,
              and internal digital platforms.
            </p>
          </div>

          {/* Tech Badges Row */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            {[
              "Next.js",
              "React 19",
              "TypeScript",
              "Tailwind v4",
              "Angular 18",
              "Nuxt 3",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border/60 bg-background/50 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground sm:text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </a>

        {/* CARD 3: TECH STACK CARD (Span 1) */}
        <a
          href="#skills"
          onMouseEnter={() => setHoveredCard("stack")}
          onMouseLeave={() => setHoveredCard(null)}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/40 p-5 backdrop-blur-md transition-all duration-300 hover:border-foreground/30 hover:bg-card/70 sm:rounded-3xl sm:p-6 md:col-span-1"
        >
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs font-bold tracking-wider text-muted-foreground uppercase group-hover:text-foreground">
              {navSkills}
            </span>
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
          </div>

          <div className="my-4 grid grid-cols-2 gap-2 text-left">
            <div className="rounded-lg border border-border/50 bg-background/40 p-2">
              <p className="font-mono text-[0.65rem] text-muted-foreground">
                Core
              </p>
              <p className="text-xs font-bold text-foreground">TypeScript</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-background/40 p-2">
              <p className="font-mono text-[0.65rem] text-muted-foreground">
                Framework
              </p>
              <p className="text-xs font-bold text-foreground">Next.js</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-background/40 p-2">
              <p className="font-mono text-[0.65rem] text-muted-foreground">
                Styling
              </p>
              <p className="text-xs font-bold text-foreground">Tailwind v4</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-background/40 p-2">
              <p className="font-mono text-[0.65rem] text-muted-foreground">
                State/API
              </p>
              <p className="text-xs font-bold text-foreground">TanStack</p>
            </div>
          </div>

          <p className="text-[0.7rem] text-muted-foreground">
            Explore 6 skill domains →
          </p>
        </a>

        {/* CARD 4: CONTACT & AVAILABILITY CARD (Span 2) */}
        <div
          onMouseEnter={() => setHoveredCard("contact")}
          onMouseLeave={() => setHoveredCard(null)}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/40 p-5 backdrop-blur-md transition-all duration-300 hover:border-foreground/30 hover:bg-card/70 sm:rounded-3xl sm:p-6 md:col-span-2"
        >
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-[0.7rem] text-muted-foreground">
              <span className="relative flex size-2 items-center justify-center">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-lime-400" />
              </span>
              <span>{availableLabel}</span>
            </div>
            <a href="#contact" aria-label={contactLabel}>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
            </a>
          </div>

          <div className="my-3">
            <p className="text-sm font-medium text-foreground sm:text-base">
              {contactPrompt}
            </p>
          </div>

          {/* Interactive Actions & Social Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-3 py-1.5 text-xs text-muted-foreground shadow-2xs transition-all hover:border-foreground/40 hover:text-foreground"
              aria-label={copied ? copiedLabel : copyEmailLabel}
              title={copyEmailLabel}
            >
              {copied ? (
                <>
                  <Check className="size-3 text-lime-400" />
                  <span className="font-medium text-lime-500 dark:text-lime-400">
                    {copiedLabel}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span>{profile.email}</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${profile.email}`}
              className="inline-flex size-8 items-center justify-center rounded-full border border-border/80 bg-background/80 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Direct Email"
              title="Kirim Email"
            >
              <Mail className="size-3.5" />
            </a>

            <a
              href={profile.linkedin.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-8 items-center justify-center rounded-full border border-border/80 bg-background/80 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <LinkedinIcon className="size-3.5" />
            </a>

            <a
              href={profile.github.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-8 items-center justify-center rounded-full border border-border/80 bg-background/80 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <GithubIcon className="size-3.5" />
            </a>

            <a
              href={profile.website.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-8 items-center justify-center rounded-full border border-border/80 bg-background/80 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Website Link"
              title="Website"
            >
              <Globe className="size-3.5" />
            </a>
          </div>
        </div>

        {/* CARD 5: RESUME & METRICS CARD (Span 2) */}
        <div
          onMouseEnter={() => setHoveredCard("resume")}
          onMouseLeave={() => setHoveredCard(null)}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/40 p-5 backdrop-blur-md transition-all duration-300 hover:border-foreground/30 hover:bg-card/70 sm:rounded-3xl sm:p-6 md:col-span-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <FileText className="size-3.5 text-muted-foreground" />
              <span className="font-sans text-xs font-bold tracking-wider text-muted-foreground uppercase group-hover:text-foreground">
                Resume & Qualifications
              </span>
            </div>
            <a
              href={cvFile}
              download
              className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:underline"
            >
              <span>{downloadLabel}</span>
              <Download className="size-3.5" />
            </a>
          </div>

          {/* 4 Proof-of-Work Metrics integrated compactly */}
          <div className="my-3 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
            {profile.metrics &&
              profile.metrics.map((metric, i) => (
                <MetricItem key={i} metric={metric} />
              ))}
          </div>

          <div className="flex items-center justify-between border-t border-border/50 pt-1 text-[0.7rem] text-muted-foreground">
            <span>Verified with 297 tests & A4 PDF pipeline</span>
            <a
              href="#contact"
              className="font-medium text-foreground hover:underline"
            >
              {contactLabel} →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function MetricItem({
  metric,
}: {
  metric: (typeof profile)["metrics"][number]
}) {
  const label = useT(metric.label)
  return (
    <div className="rounded-lg border border-border/50 bg-background/40 p-2 text-left">
      <div className="flex items-baseline gap-1">
        <span className="font-sans text-sm font-bold text-foreground sm:text-base">
          {metric.value}
        </span>
        {metric.subvalue && (
          <span className="font-mono text-[0.6rem] text-muted-foreground">
            {metric.subvalue}
          </span>
        )}
      </div>
      <p className="mt-0.5 line-clamp-1 text-[0.65rem] text-muted-foreground">
        {label}
      </p>
    </div>
  )
}

export { HeroSection }
