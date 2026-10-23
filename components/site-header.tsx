"use client"

import * as React from "react"
import { Download, Menu, X } from "lucide-react"

import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { nav, profile, ui } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"

const links = [
  { href: "#about", label: nav.about },
  { href: "#experience", label: nav.experience },
  { href: "#projects", label: nav.projects },
  { href: "#skills", label: nav.skills },
  { href: "#education", label: nav.education },
  { href: "#certifications", label: nav.certifications },
  { href: "#achievements", label: nav.achievements },
  { href: "#contact", label: nav.contact },
] as const

function SiteHeader() {
  const [open, setOpen] = React.useState(false)
  const downloadLabel = useT(ui.downloadCv)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <nav className="hidden items-center gap-3.5 text-xs font-medium lg:flex xl:gap-5 xl:text-sm">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />
          <ThemeToggle />
          <Button
            size="sm"
            className="hidden sm:inline-flex"
            render={<a href={profile.cvFile} download />}
          >
            <Download data-icon="inline-start" />
            {downloadLabel}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-background lg:hidden">
          <nav className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-4 text-sm">
            {links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                onClick={() => setOpen(false)}
                className="py-2"
              />
            ))}
            <div className="mt-2 flex items-center justify-between">
              <LanguageToggle />
              <Button size="sm" render={<a href={profile.cvFile} download />}>
                <Download data-icon="inline-start" />
                {downloadLabel}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function NavLink({
  href,
  label,
  onClick,
  className,
}: {
  href: string
  label: (typeof links)[number]["label"]
  onClick?: () => void
  className?: string
}) {
  const text = useT(label)
  return (
    <a
      href={href}
      onClick={onClick}
      className={`whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground ${className ?? ""}`}
    >
      {text}
    </a>
  )
}

export { SiteHeader }
