"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { profile, FRONTEND_STACK } from "@/lib/cv-data"
import { useLanguage, useT } from "@/lib/language-context"
import { LetterRoll } from "@/components/ui/letter-roll"
import { AsciiWaterReveal } from "@/components/ui/ascii-water-reveal"
import { GradientMotionBackground } from "@/components/ui/gradient-motion-background"
import { VexooLanguageToggle } from "@/components/vexoo-language-toggle"
import { ThemeSwitch } from "@/components/theme-switch"
import { AnimatedCardLabel } from "@/components/animated-card-label"

type HoveredCard = "about" | "portfolio" | "contact" | "stack" | "resume" | null

export function VexooDashboard() {
  const { lang } = useLanguage()

  const role = useT(profile.role)
  const location = useT(profile.location)
  const cvFile = useT(profile.cvFile)

  const [hoveredCard, setHoveredCard] = React.useState<HoveredCard>(null)
  const [timeString, setTimeString] = React.useState("")
  const [tickerIndex, setTickerIndex] = React.useState(0)
  const [tickerDirection, setTickerDirection] = React.useState<1 | -1>(1)

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Jakarta",
      })
      setTimeString(formatted)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  React.useEffect(() => {
    const tickerInterval = setInterval(() => {
      setTickerIndex((prev) => {
        if (prev === 0) {
          setTickerDirection(1)
          return 1
        } else {
          setTickerDirection(-1)
          return 0
        }
      })
    }, 3800)
    return () => clearInterval(tickerInterval)
  }, [])

  const tickerItems = React.useMemo(() => {
    return [role, `${location} • ${timeString || "14:00"} GMT+7`]
  }, [role, location, timeString])

  const tickerItemsMobile = React.useMemo(() => {
    const mobileLoc = location.includes("Indonesia")
      ? location.replace("Indonesia", "ID")
      : location
    return [role, `${mobileLoc} • ${timeString || "14:00"} GMT+7`]
  }, [role, location, timeString])

  const getKineticText = () => {
    switch (hoveredCard) {
      case "about":
        return lang === "id" ? "Tentang" : "About"
      case "portfolio":
        return lang === "id" ? "Portofolio" : "Portfolio"
      case "contact":
        return lang === "id" ? "Kontak" : "Contact"
      case "stack":
        return lang === "id" ? "Keahlian" : "Stack"
      case "resume":
        return "Resume"
      default:
        return "Hadidwirsty"
    }
  }

  const hoverProps = (card: Exclude<HoveredCard, null>) => ({
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType !== "touch") setHoveredCard(card)
    },
    onPointerLeave: () => setHoveredCard(null),
    onPointerCancel: () => setHoveredCard(null),
  })

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-x-hidden bg-background p-3.5 font-sans text-foreground select-none md:p-6 lg:p-5 xl:p-6">
      <AsciiWaterReveal
        fontSize={12}
        density={1.05}
        damping={0.96}
        velocity={0.48}
        maxOpacity={0.25}
      />
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-20 grid h-10 shrink-0 grid-cols-[auto_1fr_auto] items-center gap-3 font-sans text-xs tracking-tight md:h-12 md:grid-cols-[1fr_auto_1fr] md:text-sm"
      >
        <div className="flex items-center justify-self-start">
          <Link
            href="/"
            className="inline-flex items-center"
            title={profile.name}
          >
            <Image
              src="/images/logo-white.png"
              alt="Hadidwirsty"
              width={2058}
              height={267}
              priority
              className="hidden h-4.25 w-auto object-contain sm:h-5.5 lg:h-6.5 dark:block"
            />
            <Image
              src="/images/logo-black.png"
              alt="Hadidwirsty"
              width={2058}
              height={267}
              priority
              className="block h-4.25 w-auto object-contain sm:h-5.5 lg:h-6.5 dark:hidden"
            />
          </Link>
        </div>

        <div className="relative flex h-6 items-center justify-center justify-self-center overflow-hidden md:h-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={tickerIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="text-xs font-medium whitespace-nowrap text-muted-foreground md:text-sm"
            >
              <div className="md:hidden">
                <LetterRoll
                  key={`mobile-${tickerIndex}-${tickerDirection}`}
                  text={tickerItemsMobile[tickerIndex]}
                  direction={tickerDirection === 1 ? "up" : "down"}
                  stagger={0.65}
                  duration={0.38}
                  isRolled={true}
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                />
              </div>

              <div className="hidden md:block">
                <LetterRoll
                  key={`desktop-${tickerIndex}-${tickerDirection}`}
                  text={tickerItems[tickerIndex]}
                  direction={tickerDirection === 1 ? "up" : "down"}
                  stagger={0.65}
                  duration={0.38}
                  isRolled={true}
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground md:text-sm"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2.5 justify-self-end md:gap-4 lg:gap-5">
          <VexooLanguageToggle />

          <ThemeSwitch />
        </div>
      </motion.header>

      <main className="relative z-10 flex min-h-0 flex-1 flex-col py-1.5 md:py-2 lg:pt-2 lg:pb-0">
        <div className="relative flex min-h-0 w-full flex-1 flex-col">
          <div className="pointer-events-none relative z-0 -mb-1.5 flex shrink-0 justify-center overflow-visible pt-1 text-center text-4xl leading-none sm:-mb-2.5 sm:text-6xl md:pt-2 lg:-mb-3.5 xl:text-7xl 2xl:-mb-5.5 2xl:text-9xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredCard || "default"}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="font-pixel leading-none font-bold tracking-wider whitespace-nowrap text-foreground"
              >
                {getKineticText()}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col gap-2.5 md:grid md:grid-rows-[1.1fr_1.9fr] md:gap-3.5 lg:grid-rows-2 xl:gap-4">
            <div className="flex min-h-0 flex-1 flex-col gap-2.5 md:grid md:h-full md:grid-cols-2 md:grid-rows-1 md:gap-3.5 lg:col-span-12 lg:grid-cols-12 lg:gap-4">
              {/* Card About */}
              <motion.div
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.985 }}
                className="min-h-0 flex-1 md:col-span-1 md:h-full lg:col-span-3"
              >
                <Link
                  href="/about"
                  {...hoverProps("about")}
                  className="group relative flex h-full min-h-24 w-full cursor-pointer flex-col justify-end overflow-hidden rounded-xl border border-border/80 bg-card/75 p-4 shadow-xs backdrop-blur-xl transition-all duration-500 hover:bg-card/25 hover:shadow-2xl hover:shadow-black/15 sm:rounded-3xl sm:p-5 dark:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)]"
                >
                  <GradientMotionBackground
                    seed={11}
                    className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] transition-opacity duration-500 group-hover:opacity-25"
                  />
                  <div className="relative z-10 flex items-center justify-between">
                    <AnimatedCardLabel
                      idText="Tentang"
                      enText="About"
                      isHovered={hoveredCard === "about"}
                    />
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                  </div>
                </Link>
              </motion.div>

              {/* Card Portfolio */}
              <motion.div
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.985 }}
                className="min-h-0 flex-1 md:col-span-1 md:h-full lg:col-span-9"
              >
                <Link
                  href="/portfolio"
                  {...hoverProps("portfolio")}
                  className="group relative flex h-full min-h-24 w-full cursor-pointer flex-col justify-end overflow-hidden rounded-xl border border-border/80 bg-card/75 p-4 shadow-xs backdrop-blur-xl transition-all duration-500 hover:bg-card/25 hover:shadow-2xl hover:shadow-black/15 sm:rounded-3xl sm:p-5 dark:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)]"
                >
                  <GradientMotionBackground
                    seed={22}
                    className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] transition-opacity duration-500 group-hover:opacity-25"
                  />
                  <div className="relative z-10 flex items-center justify-between">
                    <AnimatedCardLabel
                      idText="Portofolio"
                      enText="Portfolio"
                      isHovered={hoveredCard === "portfolio"}
                    />
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                  </div>
                </Link>
              </motion.div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-2.5 md:grid md:h-full md:grid-rows-[1.05fr_0.95fr] md:gap-3.5 lg:col-span-12 lg:row-span-1 lg:grid lg:grid-cols-12 lg:grid-rows-1 lg:gap-4">
              <div className="grid min-h-0 flex-1 grid-cols-2 gap-2.5 md:flex md:h-full md:flex-row md:gap-3.5 lg:col-span-9 lg:gap-4">
                {/* Card Contact */}
                <motion.div
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.985 }}
                  className="col-span-1 h-full min-h-0 md:h-full md:flex-1"
                >
                  <Link
                    href="/contact"
                    {...hoverProps("contact")}
                    className="group relative flex h-full w-full cursor-pointer flex-col justify-end overflow-hidden rounded-xl border border-border/80 bg-card/75 p-4 shadow-xs backdrop-blur-xl transition-all duration-500 hover:bg-card/25 hover:shadow-2xl hover:shadow-black/15 sm:rounded-3xl sm:p-5 dark:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)]"
                  >
                    <GradientMotionBackground
                      seed={33}
                      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] transition-opacity duration-500 group-hover:opacity-25"
                    />
                    <div className="relative z-10 flex items-center justify-between">
                      <AnimatedCardLabel
                        idText="Kontak"
                        enText="Contact"
                        isHovered={hoveredCard === "contact"}
                      />
                      <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                    </div>
                  </Link>
                </motion.div>

                {/* Card Avatar Profile */}
                <motion.div
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.985 }}
                  className="group relative col-span-1 h-full min-h-0 overflow-hidden rounded-xl border border-border/80 bg-card/75 p-2 shadow-xs backdrop-blur-xl transition-all duration-500 hover:bg-card/25 hover:shadow-2xl hover:shadow-black/15 sm:rounded-3xl sm:p-3 md:aspect-square md:h-full md:w-auto md:shrink-0 dark:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)]"
                >
                  <GradientMotionBackground
                    seed={44}
                    className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] transition-opacity duration-500 group-hover:opacity-25"
                  />
                  <div className="relative z-10 flex h-full w-full items-end justify-center">
                    <Image
                      src="/images/profile-github-transparent.png"
                      alt={profile.name}
                      width={512}
                      height={512}
                      priority
                      quality={95}
                      className="h-full w-auto max-w-full object-contain object-bottom transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </motion.div>
              </div>

              <div className="grid min-h-0 flex-[0.85] grid-cols-2 gap-2.5 md:h-full md:grid-rows-1 md:gap-3.5 lg:col-span-3 lg:flex lg:h-full lg:flex-col lg:gap-4">
                {/* Card Stack */}
                <motion.div
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.985 }}
                  className="col-span-1 h-full min-h-0 lg:h-auto lg:flex-1"
                >
                  <Link
                    href="/stack"
                    {...hoverProps("stack")}
                    className="group relative flex h-full w-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-card/75 p-4 shadow-xs backdrop-blur-xl transition-all duration-500 hover:bg-card/25 hover:shadow-2xl hover:shadow-black/15 sm:rounded-3xl sm:p-5 dark:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)]"
                    title="Lihat Tech Stack & Keahlian"
                  >
                    <GradientMotionBackground
                      seed={55}
                      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] transition-opacity duration-500 group-hover:opacity-25"
                    />

                    <div className="relative z-10 my-auto flex w-full flex-1 items-center justify-start overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] py-1">
                      <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                          repeat: Infinity,
                          ease: "linear",
                          duration: 20,
                        }}
                        className="flex w-max shrink-0 items-center"
                      >
                        {/* Track 1 */}
                        <div className="flex shrink-0 items-center gap-2 pr-2 sm:gap-2.5 sm:pr-2.5 md:gap-3.5 md:pr-3.5 lg:gap-3 lg:pr-3 xl:gap-4 xl:pr-4">
                          {FRONTEND_STACK.map((item) => (
                            <div
                              key={`t1-${item.name}`}
                              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-foreground/5 p-2 shadow-xs transition-transform duration-200 hover:scale-120 sm:size-11 sm:rounded-xl md:size-14 md:p-2.5 lg:size-13 lg:p-2.5 xl:size-15 xl:rounded-2xl xl:p-3"
                              title={item.name}
                            >
                              <Image
                                src={item.src}
                                alt={item.name}
                                width={48}
                                height={48}
                                className="size-6 object-contain sm:size-7 md:size-8 lg:size-8 xl:size-9"
                                unoptimized
                              />
                            </div>
                          ))}
                        </div>

                        {/* Track 2 (Seamless clone) */}
                        <div
                          className="flex shrink-0 items-center gap-2 pr-2 sm:gap-2.5 sm:pr-2.5 md:gap-3.5 md:pr-3.5 lg:gap-3 lg:pr-3 xl:gap-4 xl:pr-4"
                          aria-hidden="true"
                        >
                          {FRONTEND_STACK.map((item) => (
                            <div
                              key={`t2-${item.name}`}
                              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-foreground/5 p-2 shadow-xs transition-transform duration-200 hover:scale-120 sm:size-11 sm:rounded-xl md:size-14 md:p-2.5 lg:size-13 lg:p-2.5 xl:size-15 xl:rounded-2xl xl:p-3"
                              title={item.name}
                            >
                              <Image
                                src={item.src}
                                alt={item.name}
                                width={48}
                                height={48}
                                className="size-6 object-contain sm:size-7 md:size-8 lg:size-8 xl:size-9"
                                unoptimized
                              />
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      <AnimatedCardLabel
                        idText="Keahlian"
                        enText="Stack"
                        isHovered={hoveredCard === "stack"}
                      />
                      <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                    </div>
                  </Link>
                </motion.div>

                {/* Card Resume */}
                <motion.div
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.985 }}
                  className="col-span-1 h-full min-h-0 lg:h-auto lg:flex-1"
                >
                  <a
                    href={cvFile}
                    download
                    {...hoverProps("resume")}
                    className="group relative flex h-full w-full cursor-pointer flex-col justify-end overflow-hidden rounded-xl border border-border/80 bg-card/75 p-4 shadow-xs backdrop-blur-xl transition-all duration-500 hover:bg-card/25 hover:shadow-2xl hover:shadow-black/15 sm:rounded-3xl sm:p-5 dark:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)]"
                    title="Unduh Resume / CV PDF"
                  >
                    <GradientMotionBackground
                      seed={66}
                      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] transition-opacity duration-500 group-hover:opacity-25"
                    />
                    <div className="relative z-10 flex items-center justify-between">
                      <AnimatedCardLabel
                        idText="Resume"
                        enText="Resume"
                        isHovered={hoveredCard === "resume"}
                      />
                      <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                    </div>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-20 mt-2 flex shrink-0 flex-col items-center justify-between gap-1.5 font-sans text-xs text-muted-foreground/60 sm:mt-3 sm:text-xs lg:mt-4 lg:flex-row">
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
            className="font-medium text-foreground/80 underline decoration-border/60 underline-offset-3 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            Vexoo
          </a>
          <span>Framer Template</span>
        </div>
      </footer>
    </div>
  )
}
