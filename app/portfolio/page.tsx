import type { Metadata } from "next"

import { VexooSubpageHeader } from "@/components/vexoo-subpage-header"
import { VexooSubpageIntro } from "@/components/vexoo-subpage-intro"
import { ProjectsSection } from "@/components/sections/projects-section"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Portofolio (Portfolio) — Muhammad Hadid Wiransetyo",
  description:
    "Katalog 10 proyek dan aplikasi web enterprise yang dikembangkan oleh Muhammad Hadid Wiransetyo.",
}

export default function PortfolioPage() {
  return (
    <div
      id="top"
      className="min-h-screen bg-background font-sans text-foreground"
    >
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <VexooSubpageHeader />

        <main className="mt-10 space-y-12 sm:mt-16">
          {/* Big Header Title */}
          <VexooSubpageIntro pageKey="portfolio" />

          {/* Projects Catalog */}
          <ProjectsSection />
        </main>
      </div>

      <SiteFooter />
    </div>
  )
}
