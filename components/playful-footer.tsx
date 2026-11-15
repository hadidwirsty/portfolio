"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion"
import { ArrowUp, Check, Copy, MapPin, Clock, Mail } from "lucide-react"

import { profile, nav, ui, subpages } from "@/lib/cv-data"
import { useT, useLanguage } from "@/lib/language-context"
import { copyTextToClipboard } from "@/lib/clipboard"
import {
  computeNudgeOffset,
  DEFAULT_NUDGE_CONFIG,
  type Point,
} from "@/lib/nudge-physics"
import { Button } from "@/components/ui/button"
import { GradientMotionBackground } from "@/components/ui/gradient-motion-background"
import { LetterRoll } from "@/components/ui/letter-roll"
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  ThreadsIcon,
  StravaIcon,
  YoutubeIcon,
} from "@/components/icons"

const HADIDWIRSTY_EM_WIDTH = 6.169

function subscribeFinePointer(cb: () => void) {
  if (typeof window === "undefined") return () => {}
  const m = window.matchMedia("(pointer: fine)")
  m.addEventListener("change", cb)
  return () => m.removeEventListener("change", cb)
}

function getFinePointerSnapshot() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(pointer: fine)").matches
}

function useHasFinePointer() {
  return React.useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    () => false
  )
}

interface TechLogoConfig {
  id: string
  name: string
  src: string
  positionClass: string
  baseRotate: number
  visibility?: "all" | "sm" | "xl"
}

const TECH_LOGOS: TechLogoConfig[] = [
  {
    id: "nextjs",
    name: "Next.js",
    src: "/images/pixel-art-sticker/nextjs-icon-sticker.png",
    positionClass: "left-[8%] top-[22%] sm:left-[6%] sm:top-[22%]",
    baseRotate: -8,
    visibility: "all",
  },
  {
    id: "vue",
    name: "Vue.js",
    src: "/images/pixel-art-sticker/vuejs-icon-sticker.png",
    positionClass: "sm:left-[17%] sm:top-[42%]",
    baseRotate: -5,
    visibility: "sm",
  },
  {
    id: "react",
    name: "React",
    src: "/images/pixel-art-sticker/react-icon-sticker.png",
    positionClass: "left-[34%] top-[20%] sm:left-[29%] sm:top-[20%]",
    baseRotate: 6,
    visibility: "all",
  },
  {
    id: "typescript",
    name: "TypeScript",
    src: "/images/pixel-art-sticker/typescript-icon-sticker.png",
    positionClass: "left-[60%] top-[46%] sm:left-[42%] sm:top-[46%]",
    baseRotate: -7,
    visibility: "all",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    src: "/images/pixel-art-sticker/tailwind-css-icon-sticker.png",
    positionClass: "left-[86%] top-[22%] sm:left-[55%] sm:top-[22%]",
    baseRotate: 8,
    visibility: "all",
  },
  {
    id: "vite",
    name: "Vite",
    src: "/images/pixel-art-sticker/vite-icon-sticker.png",
    positionClass: "sm:left-[68%] sm:top-[48%]",
    baseRotate: -6,
    visibility: "sm",
  },
  {
    id: "nuxt",
    name: "Nuxt",
    src: "/images/pixel-art-sticker/nuxt-icon-sticker.png",
    positionClass: "sm:left-[79%] sm:top-[24%]",
    baseRotate: 6,
    visibility: "sm",
  },
  {
    id: "angular",
    name: "Angular",
    src: "/images/pixel-art-sticker/angular-icon-sticker.png",
    positionClass: "xl:left-[90%] xl:top-[44%]",
    baseRotate: -8,
    visibility: "xl",
  },
]

interface NudgeLogoItemProps {
  logo: TechLogoConfig
  canNudge: boolean
  cursorMotion: {
    x: ReturnType<typeof useMotionValue<number>>
    y: ReturnType<typeof useMotionValue<number>>
  }
}

function NudgeLogoItem({ logo, canNudge, cursorMotion }: NudgeLogoItemProps) {
  const itemRef = React.useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rawRotate = useMotionValue(0)

  const springX = useSpring(rawX, {
    stiffness: DEFAULT_NUDGE_CONFIG.stiffness,
    damping: DEFAULT_NUDGE_CONFIG.damping,
    mass: DEFAULT_NUDGE_CONFIG.mass,
  })
  const springY = useSpring(rawY, {
    stiffness: DEFAULT_NUDGE_CONFIG.stiffness,
    damping: DEFAULT_NUDGE_CONFIG.damping,
    mass: DEFAULT_NUDGE_CONFIG.mass,
  })
  const springRotate = useSpring(rawRotate, {
    stiffness: DEFAULT_NUDGE_CONFIG.stiffness,
    damping: DEFAULT_NUDGE_CONFIG.damping,
    mass: DEFAULT_NUDGE_CONFIG.mass,
  })

  React.useEffect(() => {
    if (!canNudge) {
      rawX.set(0)
      rawY.set(0)
      rawRotate.set(0)
      return
    }

    const docCenterRef = { current: null as Point | null }

    const updateDocCenter = () => {
      if (!itemRef.current) return
      const rect = itemRef.current.getBoundingClientRect()
      const scrollX = window.scrollX || window.pageXOffset || 0
      const scrollY = window.scrollY || window.pageYOffset || 0
      docCenterRef.current = {
        x: rect.left + scrollX + rect.width / 2,
        y: rect.top + scrollY + rect.height / 2,
      }
    }

    updateDocCenter()
    window.addEventListener("resize", updateDocCenter, { passive: true })

    const updateOffset = () => {
      let docCenter = docCenterRef.current
      if (!docCenter) {
        updateDocCenter()
        docCenter = docCenterRef.current
      }
      if (!docCenter) return

      const scrollX = window.scrollX || window.pageXOffset || 0
      const scrollY = window.scrollY || window.pageYOffset || 0
      const viewportCenter: Point = {
        x: docCenter.x - scrollX,
        y: docCenter.y - scrollY,
      }

      const cursorPos: Point = {
        x: cursorMotion.x.get(),
        y: cursorMotion.y.get(),
      }

      const offset = computeNudgeOffset(
        cursorPos,
        viewportCenter,
        DEFAULT_NUDGE_CONFIG
      )
      rawX.set(offset.x)
      rawY.set(offset.y)
      rawRotate.set(offset.rotate)
    }

    const unsubX = cursorMotion.x.on("change", updateOffset)
    const unsubY = cursorMotion.y.on("change", updateOffset)

    return () => {
      window.removeEventListener("resize", updateDocCenter)
      unsubX()
      unsubY()
    }
  }, [canNudge, cursorMotion.x, cursorMotion.y, rawRotate, rawX, rawY])

  const visibilityClass =
    logo.visibility === "xl"
      ? "hidden xl:block"
      : logo.visibility === "sm"
        ? "hidden sm:block"
        : "block"

  return (
    <div
      ref={itemRef}
      className={`pointer-events-none absolute transition-opacity duration-300 select-none ${visibilityClass} ${logo.positionClass}`}
      style={{
        transform: `rotate(${logo.baseRotate}deg)`,
      }}
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          rotate: springRotate,
        }}
        className="relative flex items-center justify-center"
      >
        <Image
          src={logo.src}
          alt={logo.name}
          width={72}
          height={72}
          unoptimized
          className="size-8 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)] filter transition-transform duration-200 [image-rendering:pixelated] sm:size-14 lg:size-18"
        />
      </motion.div>
    </div>
  )
}

export function PlayfulFooter() {
  const pathname = usePathname()
  const { lang } = useLanguage()
  const shouldReduceMotion = useReducedMotion() ?? false
  const hasFinePointer = useHasFinePointer()
  const canNudge = hasFinePointer && !shouldReduceMotion

  const taglineText = useT(profile.tagline)
  const navText = useT(ui.navigation)
  const homeText = useT(nav.home)
  const aboutText = useT(subpages.about.title)
  const portfolioText = useT(subpages.portfolio.title)
  const contactText = useT(subpages.contact.title)
  const stackText = useT(subpages.stack.title)

  const letsBuildText = useT(ui.letsBuildTogether)
  const copyEmailText = useT(ui.copyEmail)
  const copiedText = useT(ui.copied)
  const backToTopText = useT(ui.backToTop)

  const [copied, setCopied] = React.useState(false)
  const [timeString, setTimeString] = React.useState("")

  const socialProfile = profile as typeof profile & {
    strava?: { label?: string; href?: string }
    youtube?: { label?: string; href?: string }
  }

  const copyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  )
  const cursorX = useMotionValue(-9999)
  const cursorY = useMotionValue(-9999)

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
      setTimeString(new Intl.DateTimeFormat("en-GB", options).format(now))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  React.useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    }
  }, [])

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canNudge) return
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
  }

  const handlePointerLeave = () => {
    cursorX.set(-9999)
    cursorY.set(-9999)
  }

  const handleCopyEmail = async () => {
    const ok = await copyTextToClipboard(profile.email)
    if (ok) {
      setCopied(true)
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  const handleScrollToTop = () => {
    if (typeof window === "undefined") return
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navLinks = [
    { href: "/", label: homeText, active: pathname === "/" },
    {
      href: "/about",
      label: aboutText,
      active: Boolean(pathname?.startsWith("/about")),
    },
    {
      href: "/portfolio",
      label: portfolioText,
      active: Boolean(pathname?.startsWith("/portfolio")),
    },
    {
      href: "/contact",
      label: contactText,
      active: Boolean(pathname?.startsWith("/contact")),
    },
    {
      href: "/stack",
      label: stackText,
      active: Boolean(pathname?.startsWith("/stack")),
    },
  ]

  return (
    <footer
      role="contentinfo"
      className="@container relative flex min-h-dvh w-full flex-col justify-between overflow-hidden rounded-t-3xl border-t border-border/80 p-4 shadow-sm backdrop-blur-[10px] transition-[border-color,background-color] duration-500 contain-[layout_style] sm:p-6 md:h-auto md:min-h-0 md:py-8 lg:min-h-dvh lg:p-8"
    >
      <GradientMotionBackground
        seed={88}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] bg-transparent transition-opacity duration-500 group-hover:opacity-25 dark:bg-transparent"
      />
      <div className="relative z-10 flex flex-1 flex-col justify-between gap-6 pt-3 sm:gap-8 sm:pt-5 md:gap-12 lg:gap-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-start lg:gap-10">
          {/* Left: Profile, Tagline, Location & Live Time */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="group/avatar relative flex shrink-0 cursor-default items-center justify-center">
                <Image
                  src="/images/pixel-art-avatar-chibi-suit-portrait.png"
                  alt={profile.name}
                  width={80}
                  height={80}
                  unoptimized
                  className="size-12 shrink-0 object-contain transition-transform duration-200 [image-rendering:pixelated] group-hover/avatar:scale-105 sm:size-14"
                />
                <div
                  role="tooltip"
                  className="pointer-events-none absolute -top-8 left-1/2 z-50 -translate-x-1/2 rounded-full border border-background/20 bg-foreground px-2 py-0.5 font-mono text-[10px] font-medium whitespace-nowrap text-background opacity-0 shadow-md transition-all duration-150 group-hover/avatar:opacity-100 sm:text-[11px]"
                >
                  <span>{lang === "id" ? "Halo" : "Hi"}</span>{" "}
                  <span className="animate-wave-hand inline-block select-none">
                    👋
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-pixel text-base font-bold text-foreground">
                  Hadidwirsty
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  Muhammad Hadid Wiransetyo
                </span>
              </div>
            </div>

            <p className="max-w-sm font-sans text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {taglineText}
            </p>

            <div className="flex flex-col gap-1.5 pt-1 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 shrink-0 text-foreground/80" />
                <span>Semarang, Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 shrink-0 text-foreground/80" />
                <span>
                  {timeString || "14:00"}{" "}
                  <span className="text-xs text-muted-foreground/75">
                    {lang === "id" ? "WIB" : "GMT+7"}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Middle: 5 Nav Links */}
          <div className="flex flex-col gap-3 md:items-center">
            <div className="flex w-full max-w-xs flex-col gap-3 md:w-auto md:max-w-none md:items-start">
              <h3 className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {navText}
              </h3>
              <nav
                aria-label="Footer Navigation"
                className="grid grid-cols-1 gap-2.5 pt-0.5 font-mono text-xs sm:text-sm md:grid-flow-col md:grid-rows-3 md:gap-x-8 md:gap-y-2.5 lg:grid-rows-2"
              >
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={item.active ? "page" : undefined}
                    className={`group inline-flex items-center gap-2 transition-colors hover:text-foreground ${
                      item.active
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full transition-all ${
                        item.active
                          ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                          : "bg-muted-foreground/30 group-hover:bg-foreground/60"
                      }`}
                      aria-hidden="true"
                    />
                    <LetterRoll
                      text={item.label}
                      direction="up"
                      stagger={0.65}
                      duration={0.4}
                      hoverTarget="parent"
                      className="select-none"
                    />
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Right: Call to Action & Social Links */}
          <div className="flex flex-col gap-3.5 md:items-end md:text-right">
            <p className="font-heading text-lg font-medium text-foreground sm:text-xl">
              {letsBuildText}
            </p>

            <div className="flex items-center md:justify-end">
              <Button
                variant="outline"
                size="default"
                onClick={handleCopyEmail}
                className="h-11 max-w-full rounded-full border-border/80 bg-foreground/5 px-4 text-xs font-medium text-foreground hover:border-border hover:bg-foreground/10 sm:text-sm"
                title={copyEmailText}
              >
                {copied ? (
                  <>
                    <Check className="size-4 shrink-0" />
                    <span className="font-pixel">
                      <LetterRoll
                        key={`copied-${lang}`}
                        text={copiedText}
                        direction="up"
                        stagger={0.65}
                        duration={0.4}
                        hoverTarget="parent"
                        className="truncate text-xs select-none"
                      />
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="size-4 shrink-0" />
                    <LetterRoll
                      key={`copy-${lang}`}
                      text={profile.email}
                      direction="up"
                      stagger={0.65}
                      duration={0.4}
                      hoverTarget="parent"
                      className="truncate font-mono text-xs select-none"
                    />
                  </>
                )}
              </Button>
            </div>

            {/* Social Media Links — 2 Rows */}
            <div className="flex flex-col gap-2 pt-1 md:items-end">
              {/* Row 1: Email, GitHub, LinkedIn, Instagram */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  render={
                    <a
                      href={`mailto:${profile.email}`}
                      aria-label="Email"
                      title={`Kirim email ke ${profile.email}`}
                    />
                  }
                  className="size-11 rounded-full border-border/80 bg-foreground/5 text-foreground shadow-2xs transition-all hover:scale-105 hover:border-border hover:bg-foreground/10 active:scale-95"
                >
                  <Mail className="size-4 shrink-0" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  render={
                    <a
                      href={profile.github.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      title="Profil GitHub"
                    />
                  }
                  className="size-11 rounded-full border-border/80 bg-foreground/5 text-foreground shadow-2xs transition-all hover:scale-105 hover:border-border hover:bg-foreground/10 active:scale-95"
                >
                  <GithubIcon className="size-4 shrink-0" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  render={
                    <a
                      href={profile.linkedin.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      title="Profil LinkedIn"
                    />
                  }
                  className="size-11 rounded-full border-border/80 bg-foreground/5 text-foreground shadow-2xs transition-all hover:scale-105 hover:border-border hover:bg-foreground/10 active:scale-95"
                >
                  <LinkedinIcon className="size-4 shrink-0" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  render={
                    <a
                      href={profile.instagram.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      title="Profil Instagram"
                    />
                  }
                  className="size-11 rounded-full border-border/80 bg-foreground/5 text-foreground shadow-2xs transition-all hover:scale-105 hover:border-border hover:bg-foreground/10 active:scale-95"
                >
                  <InstagramIcon className="size-4 shrink-0" />
                </Button>
              </div>

              {/* Row 2: Threads, Strava, YouTube */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  render={
                    <a
                      href={profile.threads.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Threads"
                      title="Profil Threads"
                    />
                  }
                  className="size-11 rounded-full border-border/80 bg-foreground/5 text-foreground shadow-2xs transition-all hover:scale-105 hover:border-border hover:bg-foreground/10 active:scale-95"
                >
                  <ThreadsIcon className="size-4 shrink-0" />
                </Button>
                {Boolean(socialProfile.strava?.href) && (
                  <Button
                    variant="outline"
                    size="icon"
                    render={
                      <a
                        href={socialProfile.strava!.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Strava"
                        title="Profil Strava"
                      />
                    }
                    className="size-11 rounded-full border-border/80 bg-foreground/5 text-foreground shadow-2xs transition-all hover:scale-105 hover:border-border hover:bg-foreground/10 active:scale-95"
                  >
                    <StravaIcon className="size-4 shrink-0" />
                  </Button>
                )}
                {Boolean(socialProfile.youtube?.href) && (
                  <Button
                    variant="outline"
                    size="icon"
                    render={
                      <a
                        href={socialProfile.youtube!.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                        title="Saluran YouTube"
                      />
                    }
                    className="size-11 rounded-full border-border/80 bg-foreground/5 text-foreground shadow-2xs transition-all hover:scale-105 hover:border-border hover:bg-foreground/10 active:scale-95"
                  >
                    <YoutubeIcon className="size-4 shrink-0" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tecnology Logos */}
        <div
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="@container relative mt-auto flex w-full items-end justify-center overflow-hidden pt-4 pb-0 select-none sm:pt-6 md:pt-8"
        >
          <div
            className="pointer-events-none font-pixel font-bold tracking-tight whitespace-nowrap text-foreground opacity-15"
            style={{
              fontSize: `calc(100cqw / ${HADIDWIRSTY_EM_WIDTH})`,
              lineHeight: 0.95,
              marginBottom: "0",
              maskImage:
                "linear-gradient(to bottom, #000 45%, rgba(0,0,0,0.15) 90%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 45%, rgba(0,0,0,0.15) 90%, transparent 100%)",
            }}
            aria-label="Hadidwirsty"
          >
            Hadidwirsty
          </div>
          <div className="pointer-events-none absolute inset-0">
            {TECH_LOGOS.map((logo) => (
              <NudgeLogoItem
                key={logo.id}
                logo={logo}
                canNudge={canNudge}
                cursorMotion={{ x: cursorX, y: cursorY }}
              />
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-border/60 pt-4 text-center font-mono text-xs text-muted-foreground sm:flex-row sm:pt-5 sm:text-left">
          <div>© 2026 {profile.name}. All rights reserved.</div>
          <button
            type="button"
            onClick={handleScrollToTop}
            className="group inline-flex cursor-pointer items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <LetterRoll
              key={`bt-to-top-${lang}`}
              text={backToTopText}
              direction="up"
              stagger={0.65}
              duration={0.4}
              hoverTarget="parent"
              className="truncate font-mono text-xs select-none"
            />
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
