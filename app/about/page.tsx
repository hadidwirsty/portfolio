import type { Metadata } from "next"

import { VexooSubpageHeader } from "@/components/vexoo-subpage-header"
import { VexooSubpageIntro } from "@/components/vexoo-subpage-intro"
import { ExperienceSection } from "@/components/sections/experience-section"
import { EducationSection } from "@/components/sections/education-section"
import { AchievementsSection } from "@/components/sections/achievements-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Tentang (About) — Muhammad Hadid Wiransetyo",
  description:
    "Profil profesional, riwayat karier, pendidikan, pencapaian, dan sertifikasi teknis Muhammad Hadid Wiransetyo.",
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
          {/* Big Header Title */}
          <VexooSubpageIntro pageKey="about" />

          {/* Sections */}
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
