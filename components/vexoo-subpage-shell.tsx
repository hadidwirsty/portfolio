"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

import { profile } from "@/lib/cv-data"
import { AsciiWaterReveal } from "@/components/ui/ascii-water-reveal"
import { VexooLanguageToggle } from "@/components/vexoo-language-toggle"
import { ThemeSwitch } from "@/components/theme-switch"
import { markDashboardVisited } from "@/components/dashboard-intro"

export interface VexooSubpageShellProps {
  children: React.ReactNode
  footer?: React.ReactNode
  currentSectionKey?: string
}

export function VexooSubpageShell({
  children,
  footer,
}: VexooSubpageShellProps) {
  React.useEffect(() => {
    markDashboardVisited()
  }, [])
  return (
    <>
      <div className="relative flex w-full flex-col overflow-x-hidden bg-background font-sans text-foreground">
        <div className="relative flex min-h-dvh w-full flex-col justify-between p-3.5 md:p-6 lg:p-5 xl:p-6">
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
            className="relative z-20 grid h-10 shrink-0 grid-cols-[auto_1fr_auto] items-center gap-1.5 font-sans text-xs tracking-tight sm:gap-3 md:h-12 md:grid-cols-[1fr_auto_1fr] md:gap-4 md:text-sm"
          >
            {/* Left: Logo */}
            <div className="flex shrink-0 items-center justify-self-start">
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
                  className="hidden h-3.75 w-auto object-contain sm:h-5 lg:h-6.5 dark:block"
                />
                <Image
                  src="/images/logo-black.png"
                  alt="Hadidwirsty"
                  width={2058}
                  height={267}
                  priority
                  className="block h-3.75 w-auto object-contain sm:h-5 lg:h-6.5 dark:hidden"
                />
              </Link>
            </div>

            {/* Spacer kolom tengah agar grid 3-kolom tetap terjaga dan switch tetap di kolom 3 (kanan atas) */}
            <div
              className="min-w-0 flex-1 justify-self-center"
              aria-hidden="true"
            />

            {/* Right: Controls */}
            <div className="col-start-3 flex shrink-0 items-center gap-1.5 justify-self-end sm:gap-2.5 md:gap-4 lg:gap-5">
              <VexooLanguageToggle />
              <ThemeSwitch />
            </div>
          </motion.header>

          <main className="relative z-10 flex min-h-0 flex-1 flex-col py-1.5 md:py-2 lg:pt-2 lg:pb-0">
            {children}
          </main>
        </div>
      </div>

      {footer}
    </>
  )
}
