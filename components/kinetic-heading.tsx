"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface KineticHeadingProps {
  text: string
  motionKey: string
  peek?: string
  className?: string
  as?: "h1" | "h2" | "h3" | "div"
}

const DEFAULT_PEEK = "0.3em"

function renderHeadingContent(text: string) {
  if (!text.includes("👋")) {
    return text
  }

  const parts = text.split("👋")
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {part}
      {index < parts.length - 1 && (
        <span className="animate-wave-hand inline-block select-none">👋</span>
      )}
    </React.Fragment>
  ))
}

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
        {renderHeadingContent(text)}
      </motion.div>
    </AnimatePresence>
  )
}

export function KineticHeading({
  text,
  motionKey,
  peek = DEFAULT_PEEK,
  className,
  as: Component = "h1",
}: KineticHeadingProps) {
  return (
    <Component
      className={cn(
        "relative flex shrink-0 justify-center overflow-visible pt-1 text-center text-4xl leading-none font-normal sm:text-6xl md:pt-2 xl:text-7xl 2xl:text-9xl",
        className
      )}
      style={{
        ["--peek" as string]: peek,
        marginBottom: "calc(var(--peek) * -1)",
      }}
    >
      <div className="pointer-events-none relative z-0">
        <HeadingText text={text} motionKey={motionKey} />
      </div>
    </Component>
  )
}
