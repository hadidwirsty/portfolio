"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import type { Transition } from "framer-motion"

import { profile } from "@/lib/cv-data"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { AsciiWaterReveal } from "@/components/ui/ascii-water-reveal"
import { GradientMotionBackground } from "@/components/ui/gradient-motion-background"
import { VexooLanguageToggle } from "@/components/vexoo-language-toggle"
import { ThemeSwitch } from "@/components/theme-switch"
import { WaveText } from "@/components/ui/wave-text"
import {
  MAINTENANCE_EM_WIDTH,
  PEMELIHARAAN_EM_WIDTH,
  PERBAIKAN_EM_WIDTH,
  NOT_FOUND_EM_WIDTH,
  HEADING_EM_WIDTHS,
  ESTIMATED_EM_PER_CHAR,
  resolveHeadingEmWidth,
} from "@/lib/status-heading"

export {
  MAINTENANCE_EM_WIDTH,
  PEMELIHARAAN_EM_WIDTH,
  PERBAIKAN_EM_WIDTH,
  NOT_FOUND_EM_WIDTH,
  HEADING_EM_WIDTHS,
  ESTIMATED_EM_PER_CHAR,
  resolveHeadingEmWidth,
}

export interface StatusPageProps {
  heading: string
  emWidth?: number
  waveAmp?: number
  waveDuration?: number
  waveStagger?: number
  chipText: string
  chipDotColor?: string
  title: string
  description: string
  actions?: React.ReactNode
  children?: React.ReactNode
}

export function StatusPage({
  heading,
  emWidth,
  waveAmp,
  waveDuration,
  waveStagger,
  chipText,
  chipDotColor = "bg-emerald-500",
  title,
  description,
  actions,
  children,
}: StatusPageProps) {
  const { lang } = useLanguage()
  const prefersReducedMotion = useReducedMotion()

  const is404 = heading.trim() === "404"
  const computedEmWidth = resolveHeadingEmWidth(heading, emWidth)

  const computedWaveAmp = waveAmp ?? (is404 ? 0.08 : 0.04)
  const computedWaveDuration = waveDuration ?? (is404 ? 2.4 : 3.0)
  const computedWaveStagger = waveStagger ?? (is404 ? 0.18 : 0.2)

  const motionInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 12 }
  const motionAnimate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0 }
  const motionTransition: Transition = prefersReducedMotion
    ? { duration: 0.1 }
    : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }

  return (
    <div className="relative flex h-dvh min-h-dvh w-full flex-col justify-between overflow-x-hidden overflow-y-auto bg-background p-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom,0px))] font-sans text-foreground select-none sm:h-auto sm:min-h-dvh md:p-6 md:pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
      <AsciiWaterReveal
        fontSize={12}
        density={1.05}
        damping={0.96}
        velocity={0.48}
        maxOpacity={0.25}
      />

      <motion.header
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0.1 }
            : { duration: 0.35, ease: "easeOut" }
        }
        className="relative z-20 flex h-10 shrink-0 items-center justify-between font-sans text-xs min-[700px]:h-12 min-[700px]:text-sm"
      >
        <div className="flex items-center">
          <Link
            href="/"
            className="inline-flex items-center transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-ring"
            title={profile.name}
          >
            <Image
              src="/images/logo-white.png"
              alt={profile.name}
              width={2058}
              height={267}
              priority
              className="hidden h-4.25 w-auto object-contain sm:h-5.5 lg:h-6.5 dark:block"
            />
            <Image
              src="/images/logo-black.png"
              alt={profile.name}
              width={2058}
              height={267}
              priority
              className="block h-4.25 w-auto object-contain sm:h-5.5 lg:h-6.5 dark:hidden"
            />
          </Link>
        </div>

        <div className="flex items-center gap-2.5 min-[700px]:gap-4 lg:gap-5">
          <VexooLanguageToggle />
          <ThemeSwitch />
        </div>
      </motion.header>

      <main className="relative z-10 my-auto flex w-full flex-1 flex-col items-center justify-center py-2 sm:py-6">
        <div className="@container relative flex w-full max-w-xl flex-col items-center">
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none relative z-0 flex w-full justify-center overflow-visible select-none",
              is404 ? "status-heading-404" : "status-heading-maintenance"
            )}
            style={
              {
                ["--heading-k" as string]: computedEmWidth,
              } as React.CSSProperties
            }
          >
            <div className="text-center font-pixel leading-none font-bold whitespace-nowrap text-foreground">
              <WaveText
                text={heading}
                amplitude={computedWaveAmp}
                duration={computedWaveDuration}
                stagger={computedWaveStagger}
              />
            </div>
          </div>

          <motion.div
            initial={motionInitial}
            animate={motionAnimate}
            transition={motionTransition}
            className="relative z-10 w-full overflow-hidden rounded-[18px] border border-border/80 bg-card/75 p-5 shadow-xs backdrop-blur-xl sm:rounded-3xl sm:p-8"
          >
            <GradientMotionBackground
              seed={77}
              className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] opacity-85 transition-opacity duration-500"
            />

            <div className="relative z-10 flex flex-col items-center gap-3.5 text-center sm:gap-5">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-foreground/5 px-3 py-1 font-pixel text-xs font-semibold tracking-wider text-muted-foreground sm:text-sm">
                <span
                  className={cn(
                    "size-2 rounded-full",
                    chipDotColor,
                    "animate-pulse motion-reduce:animate-none"
                  )}
                />
                <span>{chipText}</span>
              </div>

              <h1 className="font-heading text-xl leading-snug font-semibold tracking-tight text-foreground sm:text-3xl">
                {title}
              </h1>

              <p className="max-w-md font-sans text-xs leading-relaxed text-muted-foreground sm:text-base">
                {description}
              </p>

              {actions && (
                <div className="flex w-full items-center justify-center gap-2 pt-1">
                  {actions}
                </div>
              )}

              {children && (
                <div className="w-full border-t border-border/60 pt-3.5 sm:pt-4">
                  {children}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-20 mt-auto flex shrink-0 flex-col items-center justify-between gap-1.5 pb-1 font-sans text-xs text-muted-foreground/60 min-[1025px]:flex-row sm:text-xs">
        <div>
          © {new Date().getFullYear()} {profile.name}.{" "}
          {lang === "id" ? "Hak Cipta Dilindungi." : "All rights reserved."}
        </div>
        <div className="flex items-center gap-1">
          <span>{lang === "id" ? "Terinspirasi dari" : "Inspired by"}</span>
          <a
            href="https://vexoo.framer.website/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground/80 underline decoration-border/60 underline-offset-3 transition-colors hover:text-foreground hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            Vexoo
          </a>
          <span>Framer Template</span>
        </div>
      </footer>
    </div>
  )
}
