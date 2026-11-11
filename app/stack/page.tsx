import type { Metadata } from "next"

import { VexooSubpageHeader } from "@/components/vexoo-subpage-header"
import { VexooSubpageIntro } from "@/components/vexoo-subpage-intro"
import { SkillsSection } from "@/components/sections/skills-section"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Keahlian (Stack) — Muhammad Hadid Wiransetyo",
  description:
    "Keahlian teknis dan domain rekayasa perangkat lunak mencakup TypeScript, React, Next.js, arsitektur CSS, dan pengujian enterprise.",
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
          {/* Big Header Title */}
          <VexooSubpageIntro pageKey="stack" />

          {/* Skills Section */}
          <SkillsSection />
        </main>
      </div>

      <SiteFooter />
    </div>
  )
}
