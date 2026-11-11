import type { Metadata } from "next"

import { VexooSubpageHeader } from "@/components/vexoo-subpage-header"
import { VexooSubpageIntro } from "@/components/vexoo-subpage-intro"
import { ContactSection } from "@/components/sections/contact-section"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Kontak (Contact) — Muhammad Hadid Wiransetyo",
  description:
    "Hubungi Muhammad Hadid Wiransetyo untuk peluang rekayasa perangkat lunak, kolaborasi proyek, dan konsultasi teknis.",
}

export default function ContactPage() {
  return (
    <div
      id="top"
      className="min-h-screen bg-background font-sans text-foreground"
    >
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <VexooSubpageHeader />

        <main className="mt-10 space-y-12 sm:mt-16">
          {/* Big Header Title */}
          <VexooSubpageIntro pageKey="contact" />

          {/* Contact Section */}
          <ContactSection />
        </main>
      </div>

      <SiteFooter />
    </div>
  )
}
