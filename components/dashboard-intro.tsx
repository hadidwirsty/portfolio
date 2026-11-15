"use client"

import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { AsciiWaterReveal } from "@/components/ui/ascii-water-reveal"

export type IntroPhase =
  "idle" | "phaseA" | "phaseB" | "phaseC" | "phaseD" | "done"

export const INTRO_SESSION_KEY = "hasVisitedDashboard"

let hasVisitedDashboardInMemory = false

export function markDashboardVisited() {
  hasVisitedDashboardInMemory = true
}

export function resetDashboardVisitedForTesting() {
  hasVisitedDashboardInMemory = false
}

export function hasVisitedDashboard() {
  return hasVisitedDashboardInMemory
}

export const INTRO_CARD_ORDER = [
  "about",
  "portfolio",
  "contact",
  "avatar",
  "stack",
  "resume",
] as const

export type IntroCardKey = (typeof INTRO_CARD_ORDER)[number]

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

export function useDashboardIntro() {
  const shouldReduceMotion = useReducedMotion() ?? false

  const [phase, setPhase] = React.useState<IntroPhase>("idle")

  React.useEffect(() => {
    const isReduced =
      shouldReduceMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (hasVisitedDashboardInMemory || isReduced) {
      return
    }

    const timerA = setTimeout(() => {
      setPhase("phaseA")
    }, 16)

    const timerB = setTimeout(() => {
      setPhase("phaseB")
    }, 800)

    const timerC = setTimeout(() => {
      setPhase("phaseC")
    }, 1350)

    const timerD = setTimeout(() => {
      setPhase("phaseD")
    }, 1550)

    const timerDone = setTimeout(() => {
      hasVisitedDashboardInMemory = true
      setPhase("done")
    }, 2150)

    return () => {
      clearTimeout(timerA)
      clearTimeout(timerB)
      clearTimeout(timerC)
      clearTimeout(timerD)
      clearTimeout(timerDone)
    }
  }, [shouldReduceMotion])

  const isIntroActive = phase !== "idle" && phase !== "done"

  const getCardMotionProps = React.useCallback(
    (index: number) => {
      if (phase === "done" || phase === "idle") {
        return {}
      }

      const isRevealed = phase === "phaseD"
      return {
        initial: { opacity: 0, y: 22, scale: 0.96 },
        animate: isRevealed
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 22, scale: 0.96 },
        transition: {
          duration: 0.44,
          delay: isRevealed ? index * 0.08 : 0,
          ease: EASE_OUT_EXPO,
        },
      }
    },
    [phase]
  )

  return {
    phase,
    isIntroActive,
    getCardMotionProps,
  }
}

export function DashboardIntroOverlay({ phase }: { phase: IntroPhase }) {
  if (phase === "done" || phase === "idle") {
    return null
  }

  const isMorphing = phase !== "phaseA"

  return (
    <AnimatePresence>
      {(phase === "phaseA" || phase === "phaseB") && (
        <motion.div
          key="dashboard-intro-overlay"
          id="dashboard-intro-overlay"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={isMorphing ? { opacity: 0 } : { opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background select-none"
        >
          <AsciiWaterReveal
            fontSize={12}
            density={1.05}
            damping={0.96}
            velocity={0.48}
            maxOpacity={0.25}
          />

          <motion.div
            initial={{ y: 0, scale: 1 }}
            animate={
              isMorphing
                ? { y: "-28vh", scale: 0.88, opacity: 0 }
                : { y: 0, scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="relative z-10 flex items-center justify-center text-center font-pixel text-4xl font-bold tracking-wider sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-9xl"
          >
            <span className="text-neutral-700/40 dark:text-neutral-700/50">
              Hadidwirsty
            </span>
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.75, ease: EASE_IN_OUT }}
              className="absolute inset-0 text-foreground"
            >
              Hadidwirsty
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
