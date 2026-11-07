"use client"

import * as React from "react"
import Image from "next/image"
import { Download, Menu, X } from "lucide-react"

import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { profile, ui, type Bi } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"
import { navLinks, navSectionIds } from "@/lib/navigation"
import { cn } from "@/lib/utils"

function SiteHeader() {
  const [open, setOpen] = React.useState(false)
  const downloadLabel = useT(ui.downloadCv)
  const cvFile = useT(profile.cvFile)
  const activeSection = useScrollSpy(navSectionIds, { offset: 120 })

  // Close mobile drawer on ESC key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Brand / Logo Avatar (Pengganti inisial MHW dan nama) */}
        <a
          href="#top"
          className="group flex items-center transition-opacity hover:opacity-90"
          aria-label={`${profile.name} — Kembali ke atas profil`}
          title={profile.name}
        >
          <div className="relative size-8 overflow-hidden rounded-full border border-border/80 bg-muted shadow-2xs transition-all duration-200 group-hover:scale-105 group-hover:border-primary/50 sm:size-9">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={36}
              height={36}
              priority
              className="size-full object-cover"
            />
          </div>
        </a>

        {/* Desktop Navigation with Active Scroll Indicator */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden items-center gap-1 text-xs font-medium lg:flex xl:gap-1.5 xl:text-sm"
        >
          {navLinks.map((item) => (
            <NavLink
              key={item.sectionId}
              href={item.href}
              label={item.label}
              isActive={activeSection === item.sectionId}
            />
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />
          <ThemeToggle />
          <Button
            size="sm"
            className="hidden sm:inline-flex"
            render={<a href={cvFile} download />}
          >
            <Download data-icon="inline-start" />
            {downloadLabel}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Buka navigasi menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {open && (
        <div className="animate-in border-t border-border/70 bg-background/95 backdrop-blur-lg duration-200 slide-in-from-top-2 lg:hidden">
          <nav
            aria-label="Navigasi Menu Ponsel"
            className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-4 text-sm"
          >
            {navLinks.map((item) => (
              <NavLink
                key={item.sectionId}
                href={item.href}
                label={item.label}
                isActive={activeSection === item.sectionId}
                onClick={() => setOpen(false)}
                className="py-2.5"
              />
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
              <LanguageToggle />
              <Button size="sm" render={<a href={cvFile} download />}>
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
  isActive,
  onClick,
  className,
}: {
  href: string
  label: Bi
  isActive?: boolean
  onClick?: () => void
  className?: string
}) {
  const text = useT(label)
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "rounded-md px-2.5 py-1.5 whitespace-nowrap transition-all duration-150",
        isActive
          ? "bg-muted font-semibold text-foreground shadow-2xs"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
        className
      )}
    >
      {text}
    </a>
  )
}

export { SiteHeader }
