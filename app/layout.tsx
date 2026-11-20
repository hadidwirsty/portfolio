import type { Metadata } from "next"
import { Fraunces, Geist_Mono, Inter, Pixelify_Sans } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/language-context"
import { DynamicIslandNav } from "@/components/dynamic-island-nav"
import { PageTransition } from "@/components/page-transition"
import { cn } from "@/lib/utils"

import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
})

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Hadidwirsty",
  description:
    "Portfolio & Curriculum Vitae Muhammad Hadid Wiransetyo — Frontend Engineer berbasis di Semarang, Indonesia. Spesialisasi TypeScript, React, Next.js, dan web enterprise.",
  openGraph: {
    title: "Hadidwirsty",
    description:
      "Frontend Engineer specializing in TypeScript, React, Next.js, and high-performance enterprise web applications.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        fraunces.variable,
        pixelifySans.variable
      )}
    >
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <DynamicIslandNav />
            <PageTransition />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
