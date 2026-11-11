import * as React from "react"

import { cn } from "@/lib/utils"

export interface WaveTextProps {
  /** Teks yang akan ditampilkan dengan animasi gelombang */
  text: string
  /** Amplitudo gelombang dalam satuan em (default: 0.06) */
  amplitude?: number
  /** Durasi satu siklus gelombang dalam detik (default: 2.4) */
  duration?: number
  /** Jeda per karakter (stagger) dalam detik (default: 0.18) */
  stagger?: number
  /** Kelas CSS tambahan untuk wrapper */
  className?: string
}

/**
 * Komponen WaveText
 * Menghasilkan animasi gelombang halus berbasis CSS transform murni per-karakter.
 * Sepenuhnya deterministik tanpa nilai acak (bebas hydration mismatch)
 * dan otomatis nonaktif saat prefers-reduced-motion aktif.
 */
export function WaveText({
  text,
  amplitude = 0.06,
  duration = 2.4,
  stagger = 0.18,
  className,
}: WaveTextProps) {
  const characters = Array.from(text)
  const total = characters.length

  const styleVariables: React.CSSProperties = {
    // Variabel CSS untuk dikonsumsi keyframe wave-y dan .wave-char di globals.css
    ["--n" as string]: total,
    ["--wave-amp" as string]: `${amplitude}em`,
    ["--wave-dur" as string]: `${duration}s`,
    ["--wave-stagger" as string]: `${stagger}s`,
  }

  return (
    <span
      aria-hidden="true"
      className={cn("inline-block whitespace-nowrap select-none", className)}
      style={styleVariables}
    >
      {characters.map((char, index) => (
        <span
          key={index}
          className="wave-char"
          style={{ ["--i" as string]: index } as React.CSSProperties}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
