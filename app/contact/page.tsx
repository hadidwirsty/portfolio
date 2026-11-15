import type { Metadata } from "next"

import { VexooSubpageShell } from "@/components/vexoo-subpage-shell"
import { ContactHero } from "@/components/contact/contact-hero"
import { PlayfulFooter } from "@/components/playful-footer"

export const metadata: Metadata = {
  title: "Contact — Hadidwirsty",
  description:
    "Hubungi Muhammad Hadid Wiransetyo untuk peluang kerja sama, rekayasa perangkat lunak, dan konsultasi teknis.",
  openGraph: {
    title: "Contact — Hadidwirsty",
    description:
      "Get in touch with Muhammad Hadid Wiransetyo for software engineering opportunities, technical collaboration, and consulting.",
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
