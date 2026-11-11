"use client"

import * as React from "react"
import { Globe } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

export function VexooLanguageToggle() {
  const { lang, setLang } = useLanguage()
  const [isLangOpen, setIsLangOpen] = React.useState(false)
  const langContainerRef = React.useRef<HTMLDivElement>(null)
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  React.useEffect(() => {
    return () => clearCloseTimeout()
  }, [])

  // Klik di luar (pointerdown) dan tombol Escape untuk menutup
  React.useEffect(() => {
    if (!isLangOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (
        langContainerRef.current &&
        !langContainerRef.current.contains(event.target as Node)
      ) {
        setIsLangOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLangOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isLangOpen])

  const handleSelectLang = (selected: "id" | "en") => {
    clearCloseTimeout()
    if (selected === lang) {
      setIsLangOpen(false)
      return
    }
    setLang(selected)
    // Jeda 260ms supaya pill layoutId terlihat meluncur ke opsi baru sebelum popover menutup
    closeTimeoutRef.current = setTimeout(() => {
      setIsLangOpen(false)
      closeTimeoutRef.current = null
    }, 260)
  }

  const toggleOpen = () => {
    clearCloseTimeout()
    setIsLangOpen((prev) => !prev)
  }

  return (
    <div ref={langContainerRef} className="relative flex items-center">
      {/* Tombol Lingkaran Ikon Globe */}
      <motion.button
        type="button"
        onClick={toggleOpen}
        animate={
          shouldReduceMotion ? undefined : { scale: isLangOpen ? 1.05 : 1 }
        }
        whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
        transition={
          shouldReduceMotion
            ? undefined
            : { type: "spring", stiffness: 500, damping: 30 }
        }
        aria-haspopup="true"
        aria-expanded={isLangOpen}
        aria-label="Pilih Bahasa"
        title="Pilih Bahasa (ID / EN)"
        className={cn(
          "flex size-7 cursor-pointer items-center justify-center rounded-full border transition-[background-color,border-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-8",
          isLangOpen
            ? "border-foreground bg-foreground text-background shadow-md"
            : "border-border/80 bg-background/40 text-foreground/80 hover:border-foreground/50 hover:bg-foreground/5 hover:text-foreground"
        )}
      >
        <Globe
          className={cn(
            "size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-4",
            isLangOpen && "rotate-45"
          )}
        />
      </motion.button>

      {/* Popover Kapsul Pilihan ID / EN */}
      <AnimatePresence>
        {isLangOpen && (
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1, transition: { duration: 0.1 } }
                : {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 420,
                      damping: 32,
                      mass: 0.8,
                    },
                  }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0, transition: { duration: 0.1 } }
                : {
                    opacity: 0,
                    scale: 0.92,
                    transition: {
                      duration: 0.15,
                      ease: [0.4, 0, 1, 1],
                    },
                  }
            }
            className="absolute top-full left-1/2 z-50 mt-2 origin-top -translate-x-1/2 min-[700px]:top-1/2 min-[700px]:right-full min-[700px]:left-auto min-[700px]:mt-0 min-[700px]:mr-2 min-[700px]:origin-right min-[700px]:translate-x-0 min-[700px]:-translate-y-1/2"
          >
            <div className="relative flex h-7 items-center rounded-full border border-border/80 bg-background/95 p-0.5 font-sans text-xs shadow-xl backdrop-blur-md sm:h-8">
              {/* Opsi ID */}
              <button
                type="button"
                onClick={() => handleSelectLang("id")}
                className={cn(
                  "relative z-10 flex h-full cursor-pointer items-center justify-center px-2.5 font-medium transition-colors sm:px-3",
                  lang === "id"
                    ? "font-semibold text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="Bahasa Indonesia"
              >
                {lang === "id" && (
                  <motion.div
                    layoutId="activeLangPill"
                    className="absolute inset-0 rounded-full bg-foreground shadow-xs"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 500,
                            damping: 34,
                          }
                    }
                  />
                )}
                <span className="relative z-20">ID</span>
              </button>

              {/* Opsi EN */}
              <button
                type="button"
                onClick={() => handleSelectLang("en")}
                className={cn(
                  "relative z-10 flex h-full cursor-pointer items-center justify-center px-2.5 font-medium transition-colors sm:px-3",
                  lang === "en"
                    ? "font-semibold text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="English"
              >
                {lang === "en" && (
                  <motion.div
                    layoutId="activeLangPill"
                    className="absolute inset-0 rounded-full bg-foreground shadow-xs"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 500,
                            damping: 34,
                          }
                    }
                  />
                )}
                <span className="relative z-20">EN</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
