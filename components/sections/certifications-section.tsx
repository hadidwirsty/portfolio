"use client"

import * as React from "react"
import { Award, Calendar, ChevronDown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import {
  filterCertifications,
  getCertificationCounts,
  getIssuerCategory,
  issuerCategories,
  type IssuerCategory,
} from "@/lib/certifications-helper"
import { certifications, nav, ui, type CertificationEntry } from "@/lib/cv-data"
import { useLanguage, useT } from "@/lib/language-context"
import { cn } from "@/lib/utils"

const INITIAL_VISIBLE_COUNT = 6

function CertificationsSection() {
  const [activeIssuer, setActiveIssuer] = React.useState<IssuerCategory>("all")
  const [expanded, setExpanded] = React.useState(false)

  const showAllLabel = useT(ui.showAllCerts)
  const showLessLabel = useT(ui.showLessCerts)

  const counts = React.useMemo(() => getCertificationCounts(certifications), [])

  const filteredCerts = React.useMemo(
    () => filterCertifications(certifications, activeIssuer),
    [activeIssuer]
  )

  // Reset expanded state whenever user switches the issuer filter
  const handleIssuerChange = (cat: IssuerCategory) => {
    setActiveIssuer(cat)
    setExpanded(false)
  }

  const shouldShowToggle = filteredCerts.length > INITIAL_VISIBLE_COUNT
  const displayedCerts = expanded
    ? filteredCerts
    : filteredCerts.slice(0, INITIAL_VISIBLE_COUNT)

  return (
    <section
      id="certifications"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16 sm:py-24"
    >
      <SectionHeading index="05" title={nav.certifications} />

      {/* Issuer Filter Tabs */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {issuerCategories.map((cat) => {
          const count = counts[cat.id]
          const isActive = activeIssuer === cat.id
          return (
            <IssuerTabButton
              key={cat.id}
              category={cat}
              count={count}
              isActive={isActive}
              onClick={() => handleIssuerChange(cat.id)}
            />
          )
        })}
      </div>

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {displayedCerts.map((cert) => (
          <CertificationCard key={cert.name} cert={cert} />
        ))}
      </div>

      {/* Expand / Collapse Control */}
      {shouldShowToggle && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/80 bg-background/80 px-4 py-2 text-xs font-medium text-muted-foreground shadow-2xs transition-all duration-150 hover:bg-muted/70 hover:text-foreground"
          >
            <span>
              {expanded
                ? showLessLabel
                : `${showAllLabel} (${filteredCerts.length - INITIAL_VISIBLE_COUNT} lainnya)`}
            </span>
            <ChevronDown
              className={cn(
                "size-3.5 transition-transform duration-200",
                expanded && "rotate-180"
              )}
            />
          </button>
        </div>
      )}
    </section>
  )
}

function IssuerTabButton({
  category,
  count,
  isActive,
  onClick,
}: {
  category: (typeof issuerCategories)[number]
  count: number
  isActive: boolean
  onClick: () => void
}) {
  const label = useT(category.label)

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150 select-none sm:text-sm",
        isActive
          ? "bg-primary text-primary-foreground shadow-2xs"
          : "border border-border/80 bg-background/80 text-muted-foreground hover:bg-muted/70 hover:text-foreground"
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 font-mono text-[0.65rem] leading-none font-semibold",
          isActive
            ? "bg-primary-foreground/20 text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {count}
      </span>
    </button>
  )
}

function CertificationCard({ cert }: { cert: CertificationEntry }) {
  const { lang } = useLanguage()
  const period =
    typeof cert.period === "string" ? cert.period : cert.period[lang]

  const category = getIssuerCategory(cert.issuer)
  const isDicoding = category === "dicoding"
  const isLinkedIn = category === "linkedin"

  return (
    <Card className="flex flex-col justify-between border-border/70 bg-card/70 p-4 shadow-2xs backdrop-blur-xs transition-all duration-200 hover:border-border hover:shadow-md">
      <CardContent className="flex items-start gap-3.5 p-0">
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-xl",
            isDicoding
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : isLinkedIn
                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
          )}
        >
          <Award className="size-4.5" />
        </div>

        <div className="flex-1 space-y-1">
          <p className="font-heading text-sm leading-snug font-medium text-foreground">
            {cert.name}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <Badge variant="secondary" className="text-[0.65rem] font-medium">
              {cert.issuer}
            </Badge>

            <span className="flex items-center gap-1 font-mono text-[0.7rem] text-muted-foreground">
              <Calendar className="size-2.5" />
              {period}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { CertificationsSection }
