"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { markDashboardVisited } from "@/components/dashboard-intro"
import { AsciiWaterReveal } from "@/components/ui/ascii-water-reveal"

export type TransitionStatus = "idle" | "covering" | "revealing"

interface PageTransitionContextValue {
  status: TransitionStatus
  navigate: (href: string) => void
}

const PageTransitionContext = React.createContext<PageTransitionContextValue>({
  status: "idle",
  navigate: () => {},
})

export function usePageTransition() {
  return React.useContext(PageTransitionContext)
}

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const
const SAFETY_TIMEOUT_MS = 1400

export function PageTransition() {
  const pathname = usePathname()
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion() ?? false

  const [status, setStatus] = React.useState<TransitionStatus>("idle")
  const pendingHref = React.useRef<string | null>(null)
  const previousPathname = React.useRef(pathname)

  const navigate = React.useCallback(
    (href: string) => {
      if (!href) return

      markDashboardVisited()

      if (shouldReduceMotion) {
        router.push(href)
        return
      }

      if (status !== "idle") return

      pendingHref.current = href
      setStatus("covering")
    },
    [router, shouldReduceMotion, status]
  )

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return

      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const target = e.target as HTMLElement | null
      const anchor = target?.closest("a")
      if (!anchor) return

      if (anchor.hasAttribute("download")) return

      if (anchor.target && anchor.target !== "_self") return

      const href = anchor.getAttribute("href")
      if (!href) return

      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return
      }

      try {
        const url = new URL(href, window.location.origin)

        if (url.origin !== window.location.origin) return

        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search
        ) {
          return
        }

        e.preventDefault()
        navigate(href)
      } catch {}
    }

    document.addEventListener("click", handleClick, { capture: true })
    return () => {
      document.removeEventListener("click", handleClick, { capture: true })
    }
  }, [navigate])

  React.useEffect(() => {
    if (pathname !== previousPathname.current) {
      previousPathname.current = pathname
      if (status === "covering") {
        const timer = setTimeout(() => {
          setStatus("revealing")
        }, 0)
        return () => clearTimeout(timer)
      }
    }
  }, [pathname, status])

  React.useEffect(() => {
    if (status === "idle") return

    const timer = setTimeout(() => {
      setStatus("idle")
      pendingHref.current = null
    }, SAFETY_TIMEOUT_MS)

    return () => clearTimeout(timer)
  }, [status])

  return (
    <PageTransitionContext.Provider value={{ status, navigate }}>
      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            key="global-curtain-wipe"
            aria-hidden="true"
            data-testid="curtain-wipe-overlay"
            initial={{ y: "100%" }}
            animate={status === "covering" ? { y: "0%" } : { y: "-100%" }}
            transition={{
              duration: 0.42,
              ease: CURTAIN_EASE,
            }}
            onAnimationComplete={() => {
              if (status === "covering") {
                if (pendingHref.current) {
                  router.push(pendingHref.current)
                }
              } else if (status === "revealing") {
                setStatus("idle")
                pendingHref.current = null
              }
            }}
            className="pointer-events-auto fixed inset-0 z-9999 flex flex-col justify-between overflow-hidden bg-background text-foreground shadow-2xl select-none"
          >
            {/* Animasi ASCII Water Reveal dengan tampilan code saat cursor bergerak */}
            <AsciiWaterReveal
              fontSize={12}
              density={1.05}
              damping={0.96}
              velocity={0.48}
              maxOpacity={0.25}
            />
            <div className="relative z-10 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
            <div className="relative z-10 flex-1" />
            <div className="relative z-10 h-px w-full bg-linear-to-r from-transparent via-border/60 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  )
}
