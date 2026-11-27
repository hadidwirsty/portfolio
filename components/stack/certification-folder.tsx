"use client"

import * as React from "react"

import { CertificateSticker } from "@/components/stack/certificate-sticker"
import { LetterRoll } from "@/components/ui/letter-roll"
import { getFeaturedCertificatesByIssuer } from "@/lib/certifications-data"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

import type { CertificationIssuer } from "@/lib/certifications-data"

export interface CertificationFolderProps {
  issuer: CertificationIssuer
  isOpen: boolean
  onToggle: () => void
  className?: string
}

export function CertificationFolder({
  issuer,
  isOpen,
  onToggle,
  className,
}: CertificationFolderProps) {
  const { lang } = useLanguage()
  const contentId = React.useId()
  const toggleButtonRef = React.useRef<HTMLButtonElement>(null)
  const featuredCerts = getFeaturedCertificatesByIssuer(issuer.id)

  const actionLabel =
    lang === "id"
      ? `${isOpen ? "Tutup folder" : "Buka folder"} ${issuer.name}`
      : `${isOpen ? "Close" : "Open"} ${issuer.name} folder`

  const handleEscape = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || event.defaultPrevented || !isOpen) return

    event.preventDefault()
    event.stopPropagation()
    if (event.repeat) return

    onToggle()
    toggleButtonRef.current?.focus()
  }

  return (
    <article
      onKeyDown={handleEscape}
      data-open={isOpen}
      className={cn(
        "certificate-folder @container relative isolate",
        className
      )}
    >
      <div className="certificate-pocket">
        <h3 className="certificate-cover relative z-10">
          <button
            ref={toggleButtonRef}
            type="button"
            aria-label={actionLabel}
            aria-describedby={contentId + "-description"}
            aria-expanded={isOpen}
            aria-controls={contentId}
            onClick={onToggle}
            className="relative isolate flex min-h-32 w-full cursor-pointer flex-col justify-end gap-1 rounded-b-3xl p-5 pt-9 text-left text-foreground outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring sm:min-h-36 sm:p-6 sm:pt-10"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              className="certificate-folder-front pointer-events-none absolute inset-0 -z-10 size-full rounded-b-[inherit]"
              viewBox="0 0 360 180"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={contentId + "-front"} x2="0" y2="1">
                  <stop className="certificate-front-start" />
                  <stop offset="100%" className="certificate-front-end" />
                </linearGradient>
              </defs>
              <path
                d="M 0 28 L 130 28 C 150 28 160 10 180 10 L 336 10 C 350 10 360 20 360 34 L 360 180 L 0 180 Z"
                fill={`url(#${contentId}-front)`}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <LetterRoll
              text={issuer.name}
              hoverTarget="parent"
              className="font-heading text-2xl leading-tight font-bold tracking-tight sm:text-3xl"
              style={{ width: "100%" }}
            />
            <span
              id={contentId + "-description"}
              className="text-xs font-medium tracking-wide text-[#52525b] sm:text-sm dark:text-[#b0b0ba]"
            >
              {issuer.localizedDescription[lang]}
            </span>
          </button>
        </h3>
        <div
          id={contentId}
          className="certificate-sleeve"
          inert={!isOpen}
          aria-hidden={!isOpen}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            className="certificate-folder-back pointer-events-none absolute inset-x-0 bottom-0 w-full"
            viewBox="0 0 360 120"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={contentId + "-back"} x2="0" y2="1">
                <stop className="certificate-back-start" />
                <stop offset="100%" className="certificate-back-end" />
              </linearGradient>
            </defs>
            <path
              d="M 0 32 C 0 14 14 0 32 0 L 140 0 C 158 0 168 18 186 18 L 328 18 C 346 18 360 32 360 50 L 360 120 L 0 120 Z"
              fill={`url(#${contentId}-back)`}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <ul className="certificate-sheets">
            {featuredCerts.map((cert) => (
              <li key={cert.id}>
                <CertificateSticker certificate={cert} disabled={!isOpen} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
