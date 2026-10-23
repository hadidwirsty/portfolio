"use client"

import { ui } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"

function FooterText() {
  const text = useT(ui.footerNote)
  return <p>{text}</p>
}

export { FooterText }
