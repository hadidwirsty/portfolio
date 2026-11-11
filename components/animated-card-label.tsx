"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

import { useLanguage } from "@/lib/language-context"
import { LetterRoll } from "@/components/ui/letter-roll"

interface AnimatedCardLabelProps {
  idText: string
  enText: string
  isHovered?: boolean
  className?: string
}

export function AnimatedCardLabel({
  idText,
  enText,
  isHovered = false,
  className,
}: AnimatedCardLabelProps) {
  const { lang } = useLanguage()
  const label = lang === "id" ? idText : enText

  return (
    <div
      className={`relative flex items-center font-pixel text-base font-semibold tracking-wider text-foreground sm:text-xl lg:text-2xl ${className || ""}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={lang}
          initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -6, filter: "blur(3px)" }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <LetterRoll
            text={label}
            isRolled={isHovered}
            hoverTarget="parent"
            direction="up"
            stagger={0.75}
            duration={0.38}
            hoverColor="currentColor"
            className="font-pixel text-base font-semibold tracking-wider sm:text-xl lg:text-2xl"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
