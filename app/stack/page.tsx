import type { Metadata } from "next"

import { VexooSubpageHeader } from "@/components/vexoo-subpage-header"
import { VexooSubpageIntro } from "@/components/vexoo-subpage-intro"
import { SkillsSection } from "@/components/sections/skills-section"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Stack — Hadidwirsty",
  description:
    "Keahlian teknis dan domain rekayasa perangkat lunak mencakup TypeScript, React, Next.js, arsitektur CSS, dan pengujian enterprise.",
  openGraph: {
    title: "Stack — Hadidwirsty",
    description:
      "Technical skills and engineering domain expertise spanning TypeScript, React, Next.js, CSS architecture, and automated testing.",
    type: "website",
  },
}

export default function StackPage() {
  return (
    <div
      id="top"
      className="min-h-screen bg-background font-sans text-foreground"
    >
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <VexooSubpageHeader />
        <main className="mt-10 space-y-12 sm:mt-16">
          <VexooSubpageIntro pageKey="stack" />
          <SkillsSection />
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}
