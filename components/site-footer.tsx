import { profile } from "@/lib/cv-data"

import { FooterText } from "@/components/footer-text"

function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}.
        </p>
        <FooterText />
      </div>
    </footer>
  )
}

export { SiteFooter }
