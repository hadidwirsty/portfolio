import type { Metadata } from "next"

import { subpages } from "@/lib/cv-data"
import { VexooSubpageShell } from "@/components/vexoo-subpage-shell"
import { PortfolioHero } from "@/components/portfolio/portfolio-hero"
import { PortfolioTimeline } from "@/components/portfolio/portfolio-timeline"
import { PortfolioCardFolder } from "@/components/portfolio/portfolio-card-folder"
import { PlayfulFooter } from "@/components/playful-footer"

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
    <VexooSubpageShell currentSectionKey="portfolio" footer={<PlayfulFooter />}>
      <main className="relative z-10 flex w-full flex-1 flex-col pt-2 pb-12 sm:pt-4 sm:pb-16">
        <div className="mx-auto w-full max-w-5xl space-y-8 sm:space-y-12">
          <PortfolioHero />
          <PortfolioTimeline />
          <PortfolioCardFolder />
        </div>
      </main>
    </VexooSubpageShell>
  )
}
