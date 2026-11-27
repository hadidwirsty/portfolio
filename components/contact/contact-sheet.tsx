"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Mail, Download, Check, Copy } from "lucide-react"

import { profile, ui } from "@/lib/cv-data"
import { useT, useLanguage } from "@/lib/language-context"
import { copyTextToClipboard } from "@/lib/clipboard"
import { Button } from "@/components/ui/button"
import { FeaturePanelBackground } from "@/components/ui/feature-panel-background"
import { LetterRoll } from "@/components/ui/letter-roll"
import { StickerBoard } from "@/components/contact/sticker-board"

export function ContactSheet() {
  const { lang } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

  const contactPrompt = useT(ui.contactPrompt)
  const contactSubcopy = useT(ui.contactSubcopy)
  const openToWorkText = useT(ui.openToWork)
  const downloadCvLabel = useT(ui.downloadCv)
  const copyEmailLabel = useT(ui.copyEmail)
  const copiedLabel = useT(ui.copied)
  const cvFile = useT(profile.cvFile)

  const [copied, setCopied] = React.useState(false)
  const copyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  )

  React.useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    }
  }, [])

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
      className="feature-panel z-10 flex min-h-112 flex-1 flex-col p-4 contain-[layout_style] sm:p-6 lg:p-8"
    >
      <FeaturePanelBackground />

      {/* Retain the vertical spacing previously occupied by the sheet labels. */}
      <div className="relative z-10 grid flex-1 grid-cols-1 items-stretch gap-8 px-2 py-[3.4375rem] sm:px-4 sm:pt-16 sm:pb-17 lg:grid-cols-12 lg:gap-8 xl:gap-10">
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

            <div className="grid w-full grid-cols-2 gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="default"
                render={<a href={cvFile} download />}
                className="h-11 min-w-0 rounded-full border-border/50 bg-foreground/5 text-xs font-medium text-foreground hover:border-border hover:bg-foreground/10 sm:text-sm"
                title="Unduh PDF CV"
              >
                <Download className="size-4 shrink-0" />
                <span className="min-w-0">
                  <LetterRoll
                    key={`download-${lang}`}
                    text={downloadCvLabel}
                    direction="up"
                    stagger={0.65}
                    duration={0.4}
                    hoverTarget="parent"
                    className="max-w-full truncate font-mono text-xs select-none sm:text-sm"
                  />
                </span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="default"
                onClick={handleCopy}
                aria-live="polite"
                className="h-11 min-w-0 rounded-full border-border/50 bg-foreground/5 text-xs font-medium text-foreground hover:border-border hover:bg-foreground/10 sm:text-sm"
                title="Salin alamat email ke clipboard"
              >
                {copied ? (
                  <>
                    <Check className="size-4 shrink-0" />
                    <span className="min-w-0 font-pixel">
                      <LetterRoll
                        key={`copied-${lang}`}
                        text={copiedLabel}
                        direction="up"
                        stagger={0.65}
                        duration={0.4}
                        hoverTarget="parent"
                        className="max-w-full truncate text-xs select-none sm:text-sm"
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
                      className="min-w-0 truncate font-mono text-xs select-none sm:text-sm"
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
    </motion.section>
  )
}
