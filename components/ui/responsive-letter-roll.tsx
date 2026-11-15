"use client"

import * as React from "react"
import { LetterRoll, type LetterRollProps } from "@/components/ui/letter-roll"

export interface ResponsiveLetterRollProps extends Omit<
  LetterRollProps,
  "text"
> {
  mobileText: string
  desktopText: string
  breakpoint?: "sm" | "md" | "lg"
  langKey?: string
}

export function ResponsiveLetterRoll({
  mobileText,
  desktopText,
  breakpoint = "sm",
  langKey,
  className,
  ...rest
}: ResponsiveLetterRollProps) {
  const mobileWrapperClass =
    breakpoint === "sm"
      ? "sm:hidden"
      : breakpoint === "md"
        ? "md:hidden"
        : "lg:hidden"

  const desktopWrapperClass =
    breakpoint === "sm"
      ? "hidden sm:block"
      : breakpoint === "md"
        ? "hidden md:block"
        : "hidden lg:block"

  return (
    <>
      <div className={mobileWrapperClass}>
        <LetterRoll
          key={langKey ? `badge-mob-${langKey}` : undefined}
          text={mobileText}
          className={className}
          {...rest}
        />
      </div>
      <div className={desktopWrapperClass}>
        <LetterRoll
          key={langKey ? `badge-desk-${langKey}` : undefined}
          text={desktopText}
          className={className}
          {...rest}
        />
      </div>
    </>
  )
}
