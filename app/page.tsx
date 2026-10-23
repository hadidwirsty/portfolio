import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { EducationSection } from "@/components/sections/education-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { AchievementsSection } from "@/components/sections/achievements-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function Page() {
  return (
    <>
      <div id="top" />
      <SiteHeader />
      <main>
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
