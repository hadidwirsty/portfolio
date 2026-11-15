"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface GradientMotionBackgroundProps {
  className?: string
  seed?: number
  speed?: number
  blurAmount?: number
}

const emptySubscribe = () => () => {}

function useMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

function mulberry32(seed: number) {
  let a = seed
  return function () {
    a |= 0
    a = (a + 1831565813) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface BlobSpec {
  id: number
  xPct: number
  yPct: number
  sizePct: number
  colorDark: string
  colorLight: string
  rotation: number
  phase: number
  dirX: number
  dirY: number
}

export function GradientMotionBackground({
  className,
  seed = 42,
  speed = 28,
  blurAmount = 45,
}: GradientMotionBackgroundProps) {
  const mounted = useMounted()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme !== "light"

  const durationSec = React.useMemo(() => {
    return speed > 0 ? (600 / speed).toFixed(2) : "21.4"
  }, [speed])

  const blobs: BlobSpec[] = React.useMemo(() => {
    const rand = mulberry32(Math.floor(seed * 1000) + 7)
    const count = 3
    const darkPalette = [
      "rgba(38, 42, 50, 0.75)",
      "rgba(28, 31, 37, 0.85)",
      "rgba(48, 53, 63, 0.65)",
    ]
    const lightPalette = [
      "rgba(224, 226, 233, 0.85)",
      "rgba(235, 237, 242, 0.9)",
      "rgba(215, 218, 226, 0.75)",
    ]

    const list: BlobSpec[] = []
    for (let i = 0; i < count; i++) {
      const baseX = ((i + 0.5) / count) * 100
      const baseY = 25 + rand() * 50
      const sizePct = 65 + rand() * 45
      const angle = rand() * Math.PI * 2
      list.push({
        id: i,
        xPct: baseX + (rand() - 0.5) * 20,
        yPct: baseY + (rand() - 0.5) * 20,
        sizePct,
        colorDark: darkPalette[i % darkPalette.length],
        colorLight: lightPalette[i % lightPalette.length],
        rotation: rand() * 360,
        phase: rand(),
        dirX: Math.cos(angle),
        dirY: Math.sin(angle),
      })
    }
    return list
  }, [seed])

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] bg-[rgba(244,245,247,0.85)] transition-opacity duration-300 dark:bg-[rgba(18,20,24,0.82)]",
        className
      )}
      aria-hidden="true"
    >
      {mounted && (
        <div
          className="relative h-full w-full"
          style={{ filter: `blur(${blurAmount}px)` }}
        >
          {blobs.map((b) => {
            const range = 24
            const tx = (b.dirX * range).toFixed(2)
            const ty = (b.dirY * range).toFixed(2)
            const color = isDark ? b.colorDark : b.colorLight
            const delaySec = (-(b.phase * Number(durationSec))).toFixed(2)

            return (
              <div
                key={b.id}
                className="gradient-motion-blob"
                style={
                  {
                    left: `${b.xPct}%`,
                    top: `${b.yPct}%`,
                    width: `${b.sizePct}%`,
                    height: `${b.sizePct}%`,
                    background: `radial-gradient(circle, ${color} 0%, transparent 72%)`,
                    "--blob-tx": `${tx}px`,
                    "--blob-ty": `${ty}px`,
                    "--blob-rot": `${b.rotation.toFixed(1)}deg`,
                    "--blob-dur": `${durationSec}s`,
                    animationDelay: `${delaySec}s`,
                  } as React.CSSProperties
                }
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
