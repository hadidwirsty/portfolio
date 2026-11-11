"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface KineticHeadingProps {
  text: string
  motionKey: string
  peek?: string
  ghostBlur?: string
  ghostOpacity?: number
  className?: string
}

const DEFAULT_PEEK = "0.4em"
const DEFAULT_GHOST_BLUR = "0.09em"
const DEFAULT_GHOST_OPACITY = 0.55

function HeadingText({ text, motionKey }: { text: string; motionKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={motionKey}
        initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="font-pixel leading-none font-bold tracking-wider whitespace-nowrap text-foreground"
      >
        {text}
      </motion.div>
    </AnimatePresence>
  )
}

export function KineticHeading({
  text,
  motionKey,
  peek = DEFAULT_PEEK,
  ghostBlur = DEFAULT_GHOST_BLUR,
  ghostOpacity = DEFAULT_GHOST_OPACITY,
  className,
}: KineticHeadingProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 justify-center overflow-visible pt-1 text-center text-4xl leading-none sm:text-6xl md:pt-2 xl:text-7xl 2xl:text-9xl",
        className
      )}
      style={{
        ["--peek" as string]: peek,
        ["--ghost-blur" as string]: ghostBlur,
        marginBottom: "calc(var(--peek) * -1)",
      }}
    >
      <div className="pointer-events-none relative z-0">
        <HeadingText text={text} motionKey={motionKey} />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 flex justify-center overflow-visible pt-1 md:pt-2"
        style={{
          filter: `blur(var(--ghost-blur, ${ghostBlur}))`,
          opacity: ghostOpacity,
          maskImage:
            "linear-gradient(to bottom, transparent calc(100% - var(--peek)), #000 calc(100% - var(--peek) + 0.02em), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent calc(100% - var(--peek)), #000 calc(100% - var(--peek) + 0.02em), transparent 100%)",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      >
        <HeadingText text={text} motionKey={motionKey} />
      </div>
    </div>
  )
}
