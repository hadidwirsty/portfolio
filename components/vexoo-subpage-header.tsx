"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useTheme } from "next-themes"

import { profile } from "@/lib/cv-data"
import { useLanguage, useT } from "@/lib/language-context"
import { changeTheme } from "@/lib/theme-transition"

export function VexooSubpageHeader() {
  const { resolvedTheme, setTheme } = useTheme()
  const { lang, setLang } = useLanguage()
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
    <header className="flex items-center justify-between border-b border-border/60 pb-4 font-sans text-xs tracking-tight sm:text-sm">
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

      {/* Kanan: Lokasi & Jam Lokal + Toggle */}
      <div className="flex items-center gap-3 sm:gap-5">
        <span className="text-muted-foreground">
          {location.split(",")[0]} • {timeString || "12:00 WIB"}
        </span>

        {/* Language switch */}
        <button
          type="button"
          onClick={() => setLang(lang === "id" ? "en" : "id")}
          className="rounded-full border border-border/80 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
          title="Ganti Bahasa (ID / EN)"
        >
          {lang.toUpperCase()}
        </button>

        {/* Theme Toggle Dot */}
        <button
          type="button"
          onClick={() =>
            changeTheme(resolvedTheme === "dark" ? "light" : "dark", setTheme)
          }
          className="size-3 rounded-full border border-foreground/30 bg-foreground transition-transform hover:scale-125"
          aria-label="Toggle tema tampilan"
          title="Toggle tema tampilan"
        />
      </div>
    </header>
  )
}
