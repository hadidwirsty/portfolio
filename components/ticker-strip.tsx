"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

import { ui } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"
import { cn } from "@/lib/utils"

export interface TickerStripProps {
  className?: string
  showPauseControl?: boolean
}

export function TickerStrip({
  className,
  showPauseControl = false,
}: TickerStripProps) {
  if (showPauseControl) return <PausableTickerStrip className={className} />
  return <AutomaticTickerStrip className={className} />
}

function PausableTickerStrip({
  className,
}: Pick<TickerStripProps, "className">) {
  const tickerText = useT(ui.tickerStrip)
  const pauseLabel = useT(ui.pauseTicker)
  const [isPaused, setIsPaused] = React.useState(false)
  const repeatedText = Array(6).fill(tickerText).join("   ")

  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 border-y border-dashed border-border/50 font-mono text-xs tracking-widest text-muted-foreground uppercase",
        className
      )}
    >
      <div className="group/ticker min-w-0 flex-1 overflow-hidden py-2.5">
        <span className="sr-only motion-reduce:not-sr-only">{tickerText}</span>
        <div
          aria-hidden="true"
          className="flex w-max animate-[stack-ticker-scroll_25s_linear_infinite] mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] whitespace-nowrap group-hover/ticker:[animation-play-state:paused] motion-reduce:hidden"
          style={{ animationPlayState: isPaused ? "paused" : undefined }}
        >
          <span className="shrink-0 pr-8">{repeatedText}</span>
          <span className="shrink-0 pr-8">{repeatedText}</span>
        </div>
      </div>
      <button
        type="button"
        aria-label={pauseLabel}
        aria-pressed={isPaused}
        onClick={() => setIsPaused((paused) => !paused)}
        className="min-h-8 min-w-8 shrink-0 rounded-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:hidden"
      >
        <span aria-hidden="true">{isPaused ? "▶" : "Ⅱ"}</span>
      </button>
    </div>
  )
}

function AutomaticTickerStrip({
  className,
}: Pick<TickerStripProps, "className">) {
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
        "relative w-full overflow-hidden border-y border-dashed border-border/50 py-2.5 font-mono text-xs tracking-widest text-muted-foreground uppercase select-none",
        className
      )}
    >
      <span className="sr-only">{tickerText}</span>
      <div
        aria-hidden="true"
        className="flex w-max items-center mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
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
