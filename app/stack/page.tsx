import type { Metadata } from "next"

import { PlayfulFooter } from "@/components/playful-footer"
import { CertificationFolderGrid } from "@/components/stack/certification-folder-grid"
import { TechStackHero } from "@/components/stack/tech-stack-hero"
import { SkillsInPractice } from "@/components/stack/skills-in-practice"
import { TechnologyFolderGrid } from "@/components/stack/technology-folder-grid"
import { TickerStrip } from "@/components/ticker-strip"
import { VexooSubpageShell } from "@/components/vexoo-subpage-shell"
import { subpages } from "@/lib/cv-data"
import { publicTechStack } from "@/lib/public-tech-stack"
import { publicSkillsInPractice } from "@/lib/skills-in-practice-data"
import { shouldShowStackCertifications } from "@/lib/stack-visibility"

export const metadata: Metadata = {
  title: `${subpages.stack.title.en} — Hadidwirsty`,
  description: subpages.stack.description.id,
  openGraph: {
    title: `${subpages.stack.title.en} — Hadidwirsty`,
    description: subpages.stack.description.en,
    type: "website",
  },
}

export default function StackPage() {
  const showCertifications = shouldShowStackCertifications()

  return (
    <VexooSubpageShell currentSectionKey="stack" footer={<PlayfulFooter />}>
      <div className="relative flex w-full flex-1 flex-col justify-between">
        <div className="relative flex w-full flex-col gap-12 sm:gap-16">
          {/* Tech Stack Hero with Kinetic Heading & Always-Visible Core Stack */}
          <TechStackHero hero={publicTechStack.hero} />

          {/* Section 01: Inside My Toolkit with 6 Interactive Technology Folders */}
          <TechnologyFolderGrid toolkit={publicTechStack.toolkit} />
          <SkillsInPractice categories={publicSkillsInPractice} />

          {/* Section 02: Learning Archive (Development default or when explicitly enabled) */}
          {showCertifications && <CertificationFolderGrid />}
        </div>

        {/* Global Bottom Ticker Strip */}
        <div className="mt-auto py-6">
          <TickerStrip showPauseControl />
        </div>
      </div>
    </VexooSubpageShell>
  )
}
