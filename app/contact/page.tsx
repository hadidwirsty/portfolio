import type { Metadata } from "next"

import { subpages } from "@/lib/cv-data"
import { VexooSubpageShell } from "@/components/vexoo-subpage-shell"
import { ContactHero } from "@/components/contact/contact-hero"
import { PlayfulFooter } from "@/components/playful-footer"

export const metadata: Metadata = {
  title: `${subpages.contact.title.en} — Hadidwirsty`,
  description: subpages.contact.description.id,
  openGraph: {
    title: `${subpages.contact.title.en} — Hadidwirsty`,
    description: subpages.contact.description.en,
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <VexooSubpageShell currentSectionKey="contact" footer={<PlayfulFooter />}>
      <ContactHero />
    </VexooSubpageShell>
  )
}
