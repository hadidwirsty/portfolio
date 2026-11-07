"use client"

import * as React from "react"
import { Check, Copy, Download, Globe, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { SectionHeading } from "@/components/section-heading"
import { copyTextToClipboard } from "@/lib/clipboard"
import { nav, profile, ui } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"

function ContactSection() {
  const downloadLabel = useT(ui.downloadCv)
  const contactPrompt = useT(ui.contactPrompt)
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
      id="contact"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16 sm:py-24"
    >
      <SectionHeading index="07" title={nav.contact} />

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1.3fr_1fr] sm:items-start">
        {/* Left Column: Heading, Prompt, Primary Action */}
        <div>
          <p className="max-w-md font-heading text-2xl leading-snug font-medium text-balance text-foreground sm:text-3xl">
            {contactPrompt}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Siap berkontribusi secara langsung pada pengembangan produk web
            enterprise yang cepat, aman, dan modular.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" render={<a href={`mailto:${profile.email}`} />}>
              <Mail data-icon="inline-start" />
              {profile.email}
            </Button>
            <Button
              variant="outline"
              size="lg"
              render={<a href={cvFile} download />}
            >
              <Download data-icon="inline-start" />
              {downloadLabel}
            </Button>
          </div>
        </div>

        {/* Right Column: Contact Channels Card with Quick Copy */}
        <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/80 p-6 text-sm shadow-2xs backdrop-blur-xs">
          {/* Email row with quick copy */}
          <div className="flex items-center justify-between gap-2 text-muted-foreground sm:gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex min-w-0 items-center gap-2.5 transition-colors hover:text-foreground sm:gap-3"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-muted/60 text-foreground">
                <Mail className="size-4" />
              </span>
              <span className="truncate font-mono text-xs sm:text-sm">
                {profile.email}
              </span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label={copied ? copiedLabel : copyEmailLabel}
              title={copyEmailLabel}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-md border border-border/70 bg-background/80 px-2 py-1 text-xs text-muted-foreground transition-all hover:bg-muted/80 hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="size-3 text-emerald-500" />
                  <span className="text-[0.7rem] font-medium text-emerald-600 dark:text-emerald-400">
                    {copiedLabel}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span className="text-[0.7rem]">{copyEmailLabel}</span>
                </>
              )}
            </button>
          </div>

          <ContactLinkRow
            icon={<LinkedinIcon className="size-4" />}
            label={profile.linkedin.label}
            href={profile.linkedin.href}
            external
          />
          <ContactLinkRow
            icon={<GithubIcon className="size-4" />}
            label={profile.github.label}
            href={profile.github.href}
            external
          />
          <ContactLinkRow
            icon={<Globe className="size-4" />}
            label={profile.website.label}
            href={profile.website.href}
            external
          />
        </div>
      </div>
    </section>
  )
}

function ContactLinkRow({
  icon,
  label,
  href,
  external,
}: {
  icon: React.ReactNode
  label: string
  href: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
    >
      <span className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-muted/60 text-foreground">
        {icon}
      </span>
      <span className="font-mono text-xs sm:text-sm">{label}</span>
    </a>
  )
}

export { ContactSection }
