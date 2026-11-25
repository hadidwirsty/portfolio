import type { Metadata } from "next"

import { subpages } from "@/lib/cv-data"
import {
  publicProjectTimelineItems,
  publicSelectedWorks,
} from "@/lib/public-portfolio-data"
import { VexooSubpageShell } from "@/components/vexoo-subpage-shell"
import { PortfolioHero } from "@/components/portfolio/portfolio-hero"
import { ProjectTimelineAccordion } from "@/components/portfolio/project-timeline-accordion"
import { PortfolioCardFolder } from "@/components/portfolio/portfolio-card-folder"
import { TickerStrip } from "@/components/ticker-strip"
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
      <div className="relative flex w-full flex-1 flex-col justify-between">
        <div className="relative flex w-full flex-col gap-4 sm:gap-6">
          <PortfolioHero />
          <ProjectTimelineAccordion
            projectTimelineItems={publicProjectTimelineItems}
          />
          <PortfolioCardFolder selectedWorks={publicSelectedWorks} />
        </div>
        <div className="mt-auto py-6">
          <TickerStrip />
        </div>
      </div>
    </VexooSubpageShell>
  )
}
