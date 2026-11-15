import type { Metadata } from "next"

import { subpages } from "@/lib/cv-data"
import { VexooSubpageHeader } from "@/components/vexoo-subpage-header"
import { VexooSubpageIntro } from "@/components/vexoo-subpage-intro"
import { ProjectsSection } from "@/components/sections/projects-section"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: `${subpages.portfolio.title.en} — Hadidwirsty`,
  description: subpages.portfolio.description.id,
  openGraph: {
    title: `${subpages.portfolio.title.en} — Hadidwirsty`,
    description: subpages.portfolio.description.en,
    type: "website",
  },
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
          <VexooSubpageIntro pageKey="portfolio" />
          <ProjectsSection />
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}
