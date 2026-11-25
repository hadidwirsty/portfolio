"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Mail, Download, Check, Copy } from "lucide-react"

import { profile, ui } from "@/lib/cv-data"
import { useT, useLanguage } from "@/lib/language-context"
import { copyTextToClipboard } from "@/lib/clipboard"
import { Button } from "@/components/ui/button"
import { GradientMotionBackground } from "@/components/ui/gradient-motion-background"
import { LetterRoll } from "@/components/ui/letter-roll"
import { StickerBoard } from "@/components/contact/sticker-board"

function RegistrationMark({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute text-muted-foreground/60 select-none ${className}`}
      aria-hidden="true"
    >
      <line
        x1="6"
        y1="0"
        x2="6"
        y2="12"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line
        x1="0"
        y1="6"
        x2="12"
        y2="6"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  )
}

const emptySubscribe = () => () => {}

export function ContactSheet() {
  const isMounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  const { lang } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

  const contactPrompt = useT(ui.contactPrompt)
  const contactSubcopy = useT(ui.contactSubcopy)
  const openToWorkText = useT(ui.openToWork)
  const downloadCvLabel = useT(ui.downloadCv)
  const copyEmailLabel = useT(ui.copyEmail)
  const copiedLabel = useT(ui.copied)
  const cvFile = useT(profile.cvFile)

  const sheetTitle = useT(ui.contactSheetTitle)
  const sheetNumberText = useT(ui.sheetNumber)
  const madeInSemarang = useT(ui.madeInSemarang)

  const [copied, setCopied] = React.useState(false)
  const copyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  )

  React.useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    }
  }, [])

  const dateStr = isMounted
    ? (() => {
        const now = new Date()
        const mm = String(now.getMonth() + 1).padStart(2, "0")
        return `Semarang · ${mm}/${now.getFullYear()}`
      })()
    : "Semarang · 11/2026"

  const handleCopy = async () => {
    const ok = await copyTextToClipboard(profile.email)
    if (ok) {
      setCopied(true)
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  return (
    <motion.section
      initial={
        shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
      }
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative z-10 flex min-h-112 flex-1 flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/8 p-4 shadow-xs backdrop-blur-[10px] transition-[border-color,background-color] duration-500 contain-[layout_style] hover:bg-card/2 sm:p-6 lg:p-8"
    >
      <GradientMotionBackground
        seed={77}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] bg-transparent transition-opacity duration-500 group-hover:opacity-25 dark:bg-transparent"
      />

      <div
        className="pointer-events-none absolute inset-2 rounded-[inherit] border border-dashed border-border/50 sm:inset-3"
        aria-hidden="true"
      />

      <RegistrationMark className="top-3.5 left-3.5 sm:top-4.5 sm:left-4.5" />
      <RegistrationMark className="top-3.5 right-3.5 sm:top-4.5 sm:right-4.5" />
      <RegistrationMark className="bottom-3.5 left-3.5 sm:bottom-4.5 sm:left-4.5" />
      <RegistrationMark className="right-3.5 bottom-3.5 sm:right-4.5 sm:bottom-4.5" />

      <div className="relative z-10 flex items-center justify-between px-6 pt-5 pb-3 font-mono text-[10px] tracking-widest text-muted-foreground/70 uppercase select-none sm:px-8 sm:pt-6 sm:pb-4 sm:text-xs">
        <span>{sheetTitle}</span>
        <span>{dateStr || "Semarang"}</span>
      </div>

      <div className="relative z-10 grid flex-1 grid-cols-1 items-stretch gap-8 px-2 py-2 sm:px-4 lg:grid-cols-12 lg:gap-8 xl:gap-10">
        <div className="my-auto flex flex-col justify-center gap-5 lg:col-span-4">
          <div className="flex items-center">
            <div className="group/badge inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-foreground/5 px-2.5 py-0.5 font-pixel text-xs font-semibold tracking-wider text-muted-foreground shadow-2xs transition-all duration-300 select-none hover:border-border hover:bg-foreground/10 hover:text-foreground sm:gap-2 sm:px-3 sm:py-1">
              <span className="relative flex size-2 shrink-0 items-center justify-center">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500 sm:size-2" />
              </span>
              <LetterRoll
                key={lang}
                text={openToWorkText}
                direction="up"
                stagger={0.65}
                duration={0.38}
                hoverTarget="parent"
                className="font-pixel text-xs font-semibold tracking-wider text-muted-foreground transition-colors group-hover/badge:text-foreground"
              />
            </div>
          </div>

          <h2 className="font-heading text-xl font-medium tracking-tight text-pretty text-foreground sm:text-3xl lg:text-4xl">
            {contactPrompt}
          </h2>

          <p className="max-w-xl font-sans text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
            {contactSubcopy}
          </p>

          <div className="flex w-full flex-col items-center gap-2.5 pt-1 sm:pt-2">
            <Button
              size="default"
              render={<a href={`mailto:${profile.email}`} />}
              className="h-11 w-full rounded-full bg-foreground text-xs font-semibold break-all text-background shadow-xs hover:bg-foreground/90 sm:text-sm"
              title={`Kirim email ke ${profile.email}`}
            >
              <Mail className="size-4 shrink-0" />
              <span>
                <LetterRoll
                  key={`email-${lang}`}
                  text={profile.email}
                  direction="up"
                  stagger={0.65}
                  duration={0.4}
                  hoverTarget="parent"
                  className="truncate font-mono text-xs select-none sm:text-sm"
                />
              </span>
            </Button>

            <div className="flex w-full flex-1 gap-0.5">
              <Button
                variant="outline"
                size="default"
                render={<a href={cvFile} download />}
                className="h-11 w-1/2 rounded-full border-border/50 bg-foreground/5 text-xs font-medium text-foreground hover:border-border hover:bg-foreground/10 sm:text-sm"
                title="Unduh PDF CV"
              >
                <Download className="size-4 shrink-0" />
                <span>
                  <LetterRoll
                    key={`download-${lang}`}
                    text={downloadCvLabel}
                    direction="up"
                    stagger={0.65}
                    duration={0.4}
                    hoverTarget="parent"
                    className="truncate font-mono text-xs select-none sm:text-sm"
                  />
                </span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="default"
                onClick={handleCopy}
                aria-live="polite"
                className="h-11 w-1/2 rounded-full border-border/50 bg-foreground/5 text-xs font-medium text-foreground hover:border-border hover:bg-foreground/10 sm:text-sm"
                title="Salin alamat email ke clipboard"
              >
                {copied ? (
                  <>
                    <Check className="size-4 shrink-0 text-emerald-500" />
                    <span className="font-pixel text-emerald-500">
                      <LetterRoll
                        key={`copied-${lang}`}
                        text={copiedLabel}
                        direction="up"
                        stagger={0.65}
                        duration={0.4}
                        hoverTarget="parent"
                        className="truncate text-xs select-none sm:text-sm"
                      />
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="size-4 shrink-0" />
                    <LetterRoll
                      key={`copy-${lang}`}
                      text={copyEmailLabel}
                      direction="up"
                      stagger={0.65}
                      duration={0.4}
                      hoverTarget="parent"
                      className="truncate font-mono text-xs select-none sm:text-sm"
                    />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col justify-center lg:col-span-8">
          <div className="w-full lg:h-full lg:min-h-120">
            <StickerBoard />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between px-6 pt-4 pb-4 font-mono text-[10px] tracking-widest text-muted-foreground/70 uppercase select-none sm:px-8 sm:pt-6 sm:pb-5 sm:text-xs">
        <span>{sheetNumberText}</span>
        <span>{madeInSemarang}</span>
      </div>
    </motion.section>
  )
}
