"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { useLanguage } from "@/lib/language-context"
import { StatusPage } from "@/components/status-page"

export function NotFoundView() {
  const { lang } = useLanguage()

  const chipText = "Error 404"
  const title = lang === "id" ? "Halaman tidak ditemukan" : "Page not found"
  const description =
    lang === "id"
      ? "Alamat yang kamu tuju tidak ada atau sudah dipindahkan."
      : "The page you're looking for doesn't exist or has been moved."

  const primaryLabel = lang === "id" ? "Kembali ke beranda" : "Back to home"

  return (
    <StatusPage
      heading="404"
      chipText={chipText}
      chipDotColor="bg-amber-500"
      title={title}
      description={description}
      actions={
        <Link
          href="/"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 font-sans text-sm font-medium text-background transition-[opacity,transform] duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring active:scale-[0.98] sm:h-10 sm:w-auto"
        >
          <ArrowLeft className="size-4 shrink-0" />
          <span>{primaryLabel}</span>
        </Link>
      }
    />
  )
}
