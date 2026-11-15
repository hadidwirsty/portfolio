import type { Metadata } from "next"

import { VexooSubpageHeader } from "@/components/vexoo-subpage-header"
import { VexooSubpageIntro } from "@/components/vexoo-subpage-intro"
import { ProjectsSection } from "@/components/sections/projects-section"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Portfolio — Hadidwirsty",
  description:
    "Katalog 10 proyek dan aplikasi web enterprise yang dikembangkan oleh Muhammad Hadid Wiransetyo.",
  openGraph: {
    title: "Portfolio — Hadidwirsty",
    description:
      "Showcase of 10 enterprise web applications and digital products developed by Muhammad Hadid Wiransetyo.",
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
