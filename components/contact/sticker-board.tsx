"use client"

import * as React from "react"
import { useReducedMotion } from "framer-motion"
import { ArrowDownRight, Shuffle, Sparkles } from "lucide-react"

import { ui } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"
import {
  STICKER_ORDER,
  PILE_LAYOUTS,
  computeGridLayout,
  computeShuffleLayout,
} from "@/lib/sticker-layout"
import { InteractiveSticker } from "@/components/contact/interactive-sticker"
import { Button } from "@/components/ui/button"
import { LetterRoll } from "@/components/ui/letter-roll"

type BoardMode = "pile" | "tidy" | "custom"

interface StickerState {
  x: number
  y: number
  rotate: number
  zIndex: number
}

function getPilePositions(w: number, h: number): Record<string, StickerState> {
  const isWide = w >= 640
  const isDesktop = w >= 1024
  const pile = isWide ? PILE_LAYOUTS.wide : PILE_LAYOUTS.narrow
  const stickerSize = isDesktop ? 60 : isWide ? 52 : 44
  const rulerOffset = isWide ? 28 : 24
  const usableW = Math.max(0, w - rulerOffset - stickerSize - 12)
  const usableH = Math.max(0, h - rulerOffset - stickerSize - 12)

  const result: Record<string, StickerState> = {}
  pile.forEach((item) => {
    result[item.id] = {
      x: Math.round(rulerOffset + item.x * usableW),
      y: Math.round(rulerOffset + item.y * usableH),
      rotate: item.rotate,
      zIndex: item.zIndex,
    }
  })
  return result
}

export function StickerBoard() {
  const shouldReduceMotion = useReducedMotion() ?? false
  const areaLabel = useT(ui.stickerAreaLabel)
  const hintText = useT(ui.dragStickerHint)
  const shuffleLabel = useT(ui.shuffle)
  const tidyUpLabel = useT(ui.tidyUp)

  const boardRef = React.useRef<HTMLDivElement>(null)
  const topZRef = React.useRef(20)
  const [boardDimensions, setBoardDimensions] = React.useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })

  const [mode, setMode] = React.useState<BoardMode>("pile")
  const [positions, setPositions] = React.useState<
    Record<string, StickerState>
  >({})

  React.useEffect(() => {
    const el = boardRef.current
    if (!el) return

    const updateSize = () => {
      const rect = el.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        const w = Math.round(rect.width)
        const h = Math.round(rect.height)
        setBoardDimensions({ width: w, height: h })
        setPositions((current) => {
          if (Object.keys(current).length === 0) {
            return getPilePositions(w, h)
          }
          return current
        })
      }
    }

    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleTidyUp = () => {
    const { width, height } = boardDimensions
    if (width === 0 || height === 0) return

    const isWide = width >= 640
    const isDesktop = width >= 1024
    const cols = isWide ? 5 : 3
    const rows = isWide ? 3 : 5
    const halfSticker = isDesktop ? 30 : isWide ? 26 : 22

    const grid = computeGridLayout(cols, rows, width, height, STICKER_ORDER)
    const newPos: Record<string, StickerState> = {}

    grid.forEach((item) => {
      newPos[item.id] = {
        x: Math.round(item.x - halfSticker),
        y: Math.round(item.y - halfSticker),
        rotate: 0,
        zIndex: item.zIndex,
      }
    })

    setMode("tidy")
    setPositions(newPos)
  }

  const handleShuffle = () => {
    const { width, height } = boardDimensions
    if (width === 0 || height === 0) return

    const isWide = width >= 640
    const isDesktop = width >= 1024
    const halfSticker = isDesktop ? 30 : isWide ? 26 : 22

    const shuffled = computeShuffleLayout(width, height, STICKER_ORDER)
    const newPos: Record<string, StickerState> = {}

    shuffled.forEach((item) => {
      newPos[item.id] = {
        x: Math.round(item.x - halfSticker),
        y: Math.round(item.y - halfSticker),
        rotate: item.rotate,
        zIndex: item.zIndex,
      }
    })

    setMode("custom")
    setPositions(newPos)
  }

  const handleDragStart = (id: string) => {
    topZRef.current += 1
    const nextZ = topZRef.current
    setPositions((current) => {
      const item = current[id]
      if (!item) return current
      return {
        ...current,
        [id]: { ...item, zIndex: nextZ },
      }
    })
  }

  const handleDragEnd = (
    id: string,
    newPos: { x: number; y: number; rotate: number }
  ) => {
    setMode("custom")
    setPositions((current) => {
      const item = current[id]
      if (!item) return current
      return {
        ...current,
        [id]: {
          ...item,
          x: newPos.x,
          y: newPos.y,
          rotate: newPos.rotate,
        },
      }
    })
  }

  return (
    <div
      role="group"
      aria-label={areaLabel}
      className="group/board relative flex w-full flex-col overflow-visible rounded-2xl border border-border/70 bg-card/60 p-3 shadow-sm backdrop-blur-md select-none sm:p-4 lg:h-full lg:min-h-120"
    >
      <div className="relative mb-3 flex items-center justify-between gap-2 border-b border-border/40 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase sm:text-xs">
            CUTTING MAT // 01
          </span>
          <span className="hidden size-1 rounded-full bg-border sm:inline-block" />
          <span className="hidden font-mono text-xs text-muted-foreground/70 uppercase sm:inline-block">
            {mode === "pile" ? "Pile" : mode === "tidy" ? "Grid" : "Custom"}
          </span>
        </div>

        <div className="hidden items-center gap-1 font-mono text-xs text-muted-foreground/85 lg:flex">
          <span>{hintText}</span>
          <ArrowDownRight className="size-3 shrink-0" />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleShuffle}
            className="h-7 px-2 font-mono text-xs sm:h-8 sm:px-3"
            title={shuffleLabel}
            aria-label={shuffleLabel}
          >
            <Shuffle className="size-3.5 shrink-0" />
            <span className="hidden sm:inline-flex">
              <LetterRoll
                text={shuffleLabel}
                direction="up"
                stagger={0.65}
                duration={0.4}
                hoverTarget="parent"
                className="truncate font-mono text-xs select-none"
              />
            </span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleTidyUp}
            className="h-7 px-2 font-mono text-xs sm:h-8 sm:px-3"
            title={tidyUpLabel}
            aria-label={tidyUpLabel}
          >
            <Sparkles className="size-3.5 shrink-0" />
            <span className="hidden sm:inline-flex">
              <LetterRoll
                text={tidyUpLabel}
                direction="up"
                stagger={0.65}
                duration={0.4}
                hoverTarget="parent"
                className="truncate font-mono text-xs select-none"
              />
            </span>
          </Button>
        </div>
      </div>

      <div
        ref={boardRef}
        className="relative aspect-3/4 w-full overflow-hidden rounded-xl border border-border/50 bg-zinc-950/2 sm:aspect-auto sm:min-h-96 sm:flex-1 dark:bg-zinc-950/40"
        style={{
          backgroundImage: `
            radial-gradient(circle, currentColor 0.85px, transparent 0.85px)
          `,
          backgroundSize: "20px 20px",
          color: "oklch(var(--border) / 0.4)",
        }}
      >
        <div
          className="pointer-events-none absolute top-0 left-0 z-10 flex size-5 items-center justify-center border-r border-b border-border/40 font-mono text-[8px] text-muted-foreground/60 select-none sm:size-6"
          aria-hidden="true"
        >
          +
        </div>

        <div
          className="pointer-events-none absolute top-0 right-0 left-5 z-10 flex h-5 items-center justify-between border-b border-border/40 px-3 font-mono text-[8px] text-muted-foreground/50 select-none sm:left-6 sm:h-6 sm:text-[9px]"
          aria-hidden="true"
        >
          <span>00</span>
          <span>10</span>
          <span>20</span>
          <span>30</span>
          <span>40</span>
          <span>50</span>
          <span>60</span>
          <span>70</span>
          <span>80</span>
          <span>90</span>
        </div>

        <div
          className="pointer-events-none absolute top-5 bottom-0 left-0 z-10 flex w-5 flex-col items-center justify-between border-r border-border/40 py-3 font-mono text-[8px] text-muted-foreground/50 select-none sm:top-6 sm:w-6 sm:text-[9px]"
          aria-hidden="true"
        >
          <span>00</span>
          <span>10</span>
          <span>20</span>
          <span>30</span>
          <span>40</span>
          <span>50</span>
        </div>

        {STICKER_ORDER.map((id, index) => {
          const state = positions[id]
          if (!state) return null

          const staggerDelay =
            mode === "tidy" && !shouldReduceMotion ? index * 0.02 : 0

          return (
            <InteractiveSticker
              key={id}
              id={id}
              x={state.x}
              y={state.y}
              rotate={state.rotate}
              zIndex={state.zIndex}
              dragConstraints={boardRef}
              shouldReduceMotion={shouldReduceMotion}
              animationDelay={staggerDelay}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          )
        })}
      </div>
    </div>
  )
}
