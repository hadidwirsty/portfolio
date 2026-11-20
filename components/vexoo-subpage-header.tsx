"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { profile } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"
import { VexooLanguageToggle } from "@/components/vexoo-language-toggle"
import { ThemeSwitch } from "@/components/theme-switch"

export function VexooSubpageHeader() {
  const location = useT(profile.location)
  const role = useT(profile.role)

  const [timeString, setTimeString] = React.useState("")

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
      })
      setTimeString(`${formatted} WIB`)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="flex items-center justify-between border-b border-border/50 pb-4 font-sans text-xs tracking-tight sm:text-sm">
      {/* Kiri: Tautan Home & Identitas */}
      <div className="flex items-center gap-4 sm:gap-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-muted-foreground"
        >
          <ArrowLeft className="size-3.5" />
          <span>Home</span>
        </Link>
        <span className="hidden opacity-30 sm:inline">/</span>
        <span className="hidden font-semibold text-foreground sm:inline">
          {profile.name}
        </span>
        <span className="hidden text-muted-foreground md:inline">{role}</span>
      </div>

      {/* Kanan: Lokasi & Jam Lokal + Toggle Controls sama persis seperti Home */}
      <div className="flex items-center gap-2.5 sm:gap-4 md:gap-5">
        <span className="hidden text-muted-foreground md:inline">
          {location.split(",")[0]} • {timeString || "12:00 WIB"}
        </span>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5 md:gap-4 lg:gap-5">
          <VexooLanguageToggle />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
