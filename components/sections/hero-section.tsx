"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowDown, Check, Copy, Globe, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { copyTextToClipboard } from "@/lib/clipboard"
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
  const copyEmailLabel = useT(ui.copyEmail)
  const copiedLabel = useT(ui.copied)
  const cvFile = useT(profile.cvFile)

  const [copied, setCopied] = React.useState(false)

  const handleCopyEmail = async () => {
    const ok = await copyTextToClipboard(profile.email)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section
      id="about"
      className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-72 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--foreground),transparent_94%),transparent)] sm:h-80"
      />

      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 px-6 sm:grid-cols-[1.25fr_0.75fr] sm:gap-10 lg:gap-12">
        {/* Text & Primary Actions Column */}
        <div className="animate-in duration-700 fade-in slide-in-from-bottom-4">
          {/* Live availability badge with soft pulse effect */}
          <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-[0.7rem] text-muted-foreground shadow-2xs backdrop-blur-xs sm:text-xs">
            <span className="relative flex size-2 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            {availableLabel}
          </span>

          <h1 className="mt-4 font-heading text-3xl leading-[1.08] font-medium tracking-tight text-balance sm:mt-6 sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>

          <p className="mt-2 text-base font-medium text-foreground/90 sm:mt-3 sm:text-lg lg:text-xl">
            {role}
          </p>
          <p className="mt-1 font-heading text-sm text-muted-foreground italic sm:text-base lg:text-lg">
            {tagline}
          </p>

          <p className="mt-4 max-w-xl text-xs leading-relaxed text-muted-foreground sm:mt-5 sm:text-sm lg:text-base">
            {summary}
          </p>

          {/* Proof-of-Work Metrics Strip */}
          {profile.metrics && profile.metrics.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-7 sm:grid-cols-4 sm:gap-2.5">
              {profile.metrics.map((metric, i) => (
                <MetricCard key={i} metric={metric} />
              ))}
            </div>
          )}

          {/* Primary Call-to-Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3">
            <Button
              size="default"
              className="sm:h-9 sm:px-4"
              render={<a href={cvFile} download />}
            >
              {downloadLabel}
            </Button>
            <Button
              variant="outline"
              size="default"
              className="sm:h-9 sm:px-4"
              render={<a href="#contact" />}
            >
              {contactLabel}
            </Button>
          </div>

          {/* Social Profiles & Interactive Quick Copy Email */}
          <div className="mt-6 flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[0.75rem] text-muted-foreground sm:mt-7 sm:text-xs lg:text-sm">
            <span className="font-mono text-[0.7rem] sm:text-xs">
              {location}
            </span>

            {/* Quick copy email interactive button */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border/70 bg-background/60 px-2 py-0.5 text-[0.7rem] text-muted-foreground transition-all duration-150 hover:border-border hover:bg-muted/50 hover:text-foreground sm:text-xs"
              aria-label={copied ? copiedLabel : copyEmailLabel}
              title={copyEmailLabel}
            >
              {copied ? (
                <>
                  <Check className="size-3 text-emerald-500" />
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
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
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
              title="Kirim Email Langsung"
            >
              <Mail className="size-3.5" />
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

        {/* Elevated Profile Avatar Frame with Floating Engineering Badge */}
        <div className="order-first flex animate-in justify-center duration-700 fade-in slide-in-from-bottom-6 sm:order-last">
          <div className="relative">
            {/* Ambient subtle glow */}
            <div
              aria-hidden
              className="absolute -inset-2 -z-10 rounded-[2rem] bg-gradient-to-tr from-amber-500/10 via-transparent to-primary/10 blur-xl sm:rounded-[2.5rem]"
            />
            {/* Dashed architectural boundary */}
            <div
              aria-hidden
              className="absolute -inset-2.5 -z-10 rounded-[1.75rem] border border-dashed border-border/80 sm:-inset-4 sm:rounded-[2.25rem]"
            />
            {/* Main photo container (Compact on Mobile, Full on Tablet/Desktop) */}
            <div className="relative aspect-[4/5] w-32 overflow-hidden rounded-2xl border border-border/70 bg-muted shadow-xl sm:w-56 sm:rounded-3xl lg:w-64">
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                priority
                quality={90}
                sizes="(min-width: 1024px) 16rem, (min-width: 640px) 14rem, 8rem"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Floating Engineering Badge */}
            <div className="absolute -bottom-2.5 -left-2.5 flex items-center gap-1.5 rounded-full border border-border/80 bg-background/95 px-2.5 py-1 shadow-md backdrop-blur-md sm:-bottom-4 sm:-left-4 sm:gap-2 sm:px-3 sm:py-1.5">
              <span className="flex size-1.5 rounded-full bg-emerald-500 sm:size-2" />
              <span className="font-mono text-[0.65rem] font-medium text-foreground sm:text-xs">
                {role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bouncing scroll-down hint */}
      <a
        href="#experience"
        aria-label="Scroll to experience"
        className="mx-auto mt-12 hidden w-fit items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground sm:mt-16 sm:flex"
      >
        <ArrowDown className="size-3.5 animate-bounce" />
      </a>
    </section>
  )
}

function MetricCard({
  metric,
}: {
  metric: (typeof profile)["metrics"][number]
}) {
  const label = useT(metric.label)
  const desc = useT(metric.description)

  return (
    <div className="flex flex-col justify-between rounded-xl border border-border/70 bg-card/60 p-2.5 shadow-2xs backdrop-blur-xs transition-colors hover:border-border hover:bg-card sm:p-3">
      <div className="flex items-baseline gap-1">
        <span className="font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl lg:text-2xl">
          {metric.value}
        </span>
        {metric.subvalue && (
          <span className="font-mono text-[0.6rem] text-muted-foreground sm:text-[0.65rem] lg:text-xs">
            {metric.subvalue}
          </span>
        )}
      </div>
      <div className="mt-1">
        <p className="text-[0.7rem] font-medium text-foreground/90 sm:text-xs">
          {label}
        </p>
        <p className="mt-0.5 text-[0.6rem] leading-tight text-muted-foreground sm:text-[0.65rem]">
          {desc}
        </p>
      </div>
    </div>
  )
}

export { HeroSection }
