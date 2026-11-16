"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

import { ui } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"
import { cn } from "@/lib/utils"

export interface TickerStripProps {
  className?: string
}

export function TickerStrip({ className }: TickerStripProps) {
  const tickerText = useT(ui.tickerStrip)
  const shouldReduceMotion = useReducedMotion()
  const [isHovered, setIsHovered] = React.useState(false)

  const repeatedText = React.useMemo(() => {
    return Array(6).fill(tickerText).join("   ")
  }, [tickerText])

  return (
    <div
      role="presentation"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={cn(
        "relative w-full overflow-hidden border-y border-dashed border-border/70 py-2.5 font-mono text-xs tracking-widest text-muted-foreground uppercase select-none",
        className
      )}
    >
      <div className="flex w-max items-center mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <motion.div
          animate={
            shouldReduceMotion || isHovered
              ? { x: "0%" }
              : { x: ["0%", "-50%"] }
          }
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
          className="flex shrink-0 items-center whitespace-nowrap"
        >
          <span className="shrink-0 pr-8">{repeatedText}</span>
          <span className="shrink-0 pr-8" aria-hidden="true">
            {repeatedText}
          </span>
        </motion.div>
      </div>
    </div>
  )
}
