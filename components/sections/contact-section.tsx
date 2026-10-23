"use client"

import { Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { InstagramIcon, LinkedinIcon } from "@/components/icons"
import { SectionHeading } from "@/components/section-heading"
import { nav, profile, ui } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"

function ContactSection() {
  const downloadLabel = useT(ui.downloadCv)
  const contactPrompt = useT(ui.contactPrompt)

  return (
    <section
      id="contact"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16 sm:py-24"
    >
      <SectionHeading index="07" title={nav.contact} />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1.3fr_1fr] sm:items-start">
        <div>
          <p className="max-w-md font-heading text-2xl leading-snug font-medium text-balance sm:text-3xl">
            {contactPrompt}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" render={<a href={`mailto:${profile.email}`} />}>
              <Mail data-icon="inline-start" />
              {profile.email}
            </Button>
            <Button
              variant="outline"
              size="lg"
              render={<a href={profile.cvFile} download />}
            >
              {downloadLabel}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-border/70 p-5 text-sm">
          <ContactRow
            icon={<Mail className="size-4" />}
            label={profile.email}
            href={`mailto:${profile.email}`}
          />
          <ContactRow
            icon={<Phone className="size-4" />}
            label={profile.phoneDisplay}
            href={`tel:${profile.phoneHref}`}
          />
          <ContactRow
            icon={<LinkedinIcon className="size-4" />}
            label={profile.linkedin.label}
            href={profile.linkedin.href}
            external
          />
          <ContactRow
            icon={<InstagramIcon className="size-4" />}
            label={profile.instagram.label}
            href={profile.instagram.href}
            external
          />
        </div>
      </div>
    </section>
  )
}

function ContactRow({
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
      <span className="flex size-8 items-center justify-center rounded-full border border-border">
        {icon}
      </span>
      {label}
    </a>
  )
}

export { ContactSection }
