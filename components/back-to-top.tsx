"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"

import { shouldShowBackToTop } from "@/lib/scroll"
import { cn } from "@/lib/utils"

export function BackToTop() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId !== null) return

      rafId = window.requestAnimationFrame(() => {
        rafId = null
        const isPastThreshold = shouldShowBackToTop(window.scrollY, 400)
        setVisible((prev) =>
          prev !== isPastThreshold ? isPastThreshold : prev
        )
      })
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleScrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  return (
    <aside aria-label="Aksi Cepat Halaman">
      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label="Kembali ke atas halaman"
        title="Kembali ke atas"
        className={cn(
          "fixed right-4 bottom-5 z-40 flex size-10 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-border hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-95 sm:right-6 sm:bottom-6 sm:size-11",
          visible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <ArrowUp className="size-4.5" />
      </button>
    </aside>
  )
}
