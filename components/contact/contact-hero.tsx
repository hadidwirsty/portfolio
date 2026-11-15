"use client"

import { subpages } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"
import { KineticHeading } from "@/components/kinetic-heading"
import { ContactSheet } from "@/components/contact/contact-sheet"
import { TickerStrip } from "@/components/contact/ticker-strip"

export function ContactHero() {
  const headingText = useT(subpages.contact.title)

  return (
    <div className="relative flex w-full flex-1 flex-col justify-between">
      <div className="relative flex w-full flex-col">
        <KineticHeading text={headingText} motionKey="contact" />
        <ContactSheet />
      </div>
      <div className="mt-auto py-6">
        <TickerStrip />
      </div>
    </div>
  )
}
