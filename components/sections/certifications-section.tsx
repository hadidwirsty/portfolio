"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { SectionHeading } from "@/components/section-heading"
import { certifications, nav, ui } from "@/lib/cv-data"
import { useLanguage, useT } from "@/lib/language-context"
import { cn } from "@/lib/utils"

const VISIBLE_COUNT = 6

function CertificationsSection() {
  const [expanded, setExpanded] = React.useState(false)
  const showAllLabel = useT(ui.showAllCerts)
  const showLessLabel = useT(ui.showLessCerts)

  const visible = certifications.slice(0, VISIBLE_COUNT)
  const rest = certifications.slice(VISIBLE_COUNT)

  return (
    <section
      id="certifications"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16 sm:py-24"
    >
      <SectionHeading index="05" title={nav.certifications} />

      <div className="flex flex-col">
        {visible.map((cert, i) => (
          <CertRow key={cert.name} cert={cert} isFirst={i === 0} />
        ))}
        {expanded &&
          rest.map((cert) => (
            <CertRow key={cert.name} cert={cert} isFirst={false} />
          ))}
      </div>

      {rest.length > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {expanded ? showLessLabel : showAllLabel}
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform",
              expanded && "rotate-180"
            )}
          />
        </button>
      )}
    </section>
  )
}

function CertRow({
  cert,
  isFirst,
}: {
  cert: (typeof certifications)[number]
  isFirst: boolean
}) {
  const { lang } = useLanguage()
  const period =
    typeof cert.period === "string" ? cert.period : cert.period[lang]

  return (
    <>
      {!isFirst && <Separator />}
      <div className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">{cert.name}</p>
          <p className="text-xs text-muted-foreground">{cert.issuer}</p>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {period}
        </span>
      </div>
    </>
  )
}

export { CertificationsSection }
