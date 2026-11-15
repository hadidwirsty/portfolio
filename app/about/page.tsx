import type { Metadata } from "next"

import { subpages } from "@/lib/cv-data"
import { VexooSubpageHeader } from "@/components/vexoo-subpage-header"
import { VexooSubpageIntro } from "@/components/vexoo-subpage-intro"
import { ExperienceSection } from "@/components/sections/experience-section"
import { EducationSection } from "@/components/sections/education-section"
import { AchievementsSection } from "@/components/sections/achievements-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: `${subpages.about.title.en} — Hadidwirsty`,
  description: subpages.about.description.id,
  openGraph: {
    title: `${subpages.about.title.en} — Hadidwirsty`,
    description: subpages.about.description.en,
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <div
      id="top"
      className="min-h-screen bg-background font-sans text-foreground"
    >
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <VexooSubpageHeader />
        <main className="mt-10 space-y-16 sm:mt-16">
          <VexooSubpageIntro pageKey="about" />
          <ExperienceSection />
          <EducationSection />
          <AchievementsSection />
          <CertificationsSection />
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}
