export const STICKER_ORDER = [
  "avatar",
  "email",
  "github",
  "linkedin",
  "instagram",
  "threads",
  "strava",
  "youtube",
  "website",
  "cv",
  "open-to-work",
  "react",
  "nextjs",
  "typescript",
  "tailwind-css",
] as const

export type StickerId = (typeof STICKER_ORDER)[number]

export interface StickerPosition {
  id: string
  x: number
  y: number
  rotate: number
  zIndex: number
}

export interface PileItem {
  id: string
  x: number
  y: number
  rotate: number
  zIndex: number
}

export const WIDE_PILE: PileItem[] = [
  { id: "email", x: 0.18, y: 0.22, rotate: -4, zIndex: 1 },
  { id: "strava", x: 0.38, y: 0.16, rotate: 6, zIndex: 2 },
  { id: "github", x: 0.58, y: 0.24, rotate: -3, zIndex: 3 },
  { id: "avatar", x: 0.82, y: 0.26, rotate: 5, zIndex: 4 },
  { id: "linkedin", x: 0.22, y: 0.52, rotate: 7, zIndex: 5 },
  { id: "open-to-work", x: 0.44, y: 0.48, rotate: -5, zIndex: 6 },
  { id: "instagram", x: 0.66, y: 0.54, rotate: 4, zIndex: 7 },
  { id: "youtube", x: 0.84, y: 0.58, rotate: -6, zIndex: 8 },
  { id: "threads", x: 0.16, y: 0.78, rotate: -5, zIndex: 9 },
  { id: "react", x: 0.36, y: 0.82, rotate: 8, zIndex: 10 },
  { id: "nextjs", x: 0.56, y: 0.82, rotate: -8, zIndex: 11 },
  { id: "typescript", x: 0.76, y: 0.82, rotate: 8, zIndex: 12 },
  { id: "tailwind-css", x: 0.96, y: 0.82, rotate: -8, zIndex: 13 },
  { id: "website", x: 0.62, y: 0.78, rotate: -3, zIndex: 11 },
  { id: "cv", x: 0.82, y: 0.84, rotate: 4, zIndex: 12 },
]

export const NARROW_PILE: PileItem[] = [
  { id: "email", x: 0.24, y: 0.14, rotate: -5, zIndex: 1 },
  { id: "strava", x: 0.58, y: 0.12, rotate: 6, zIndex: 2 },
  { id: "github", x: 0.82, y: 0.18, rotate: -4, zIndex: 3 },
  { id: "avatar", x: 0.28, y: 0.38, rotate: 4, zIndex: 4 },
  { id: "linkedin", x: 0.68, y: 0.36, rotate: -6, zIndex: 5 },
  { id: "open-to-work", x: 0.22, y: 0.6, rotate: 7, zIndex: 6 },
  { id: "instagram", x: 0.62, y: 0.58, rotate: -3, zIndex: 7 },
  { id: "youtube", x: 0.84, y: 0.62, rotate: 5, zIndex: 8 },
  { id: "threads", x: 0.26, y: 0.82, rotate: -6, zIndex: 9 },
  { id: "react", x: 0.54, y: 0.8, rotate: 4, zIndex: 10 },
  { id: "nextjs", x: 0.74, y: 0.8, rotate: -4, zIndex: 11 },
  { id: "typescript", x: 0.24, y: 0.9, rotate: 4, zIndex: 12 },
  { id: "tailwind-css", x: 0.44, y: 0.9, rotate: -4, zIndex: 13 },
  { id: "website", x: 0.82, y: 0.84, rotate: -5, zIndex: 11 },
  { id: "cv", x: 0.5, y: 0.94, rotate: 3, zIndex: 12 },
]

export const PILE_LAYOUTS = {
  wide: WIDE_PILE,
  narrow: NARROW_PILE,
} as const

export function computeGridLayout(
  cols: number,
  rows: number,
  width: number,
  height: number,
  order: readonly string[] = STICKER_ORDER
): StickerPosition[] {
  const colPitch = width / cols
  const rowPitch = height / rows

  return order.slice(0, cols * rows).map((id, index) => {
    const col = index % cols
    const row = Math.floor(index / cols)
    const x = (col + 0.5) * colPitch
    const y = (row + 0.5) * rowPitch

    return {
      id,
      x,
      y,
      rotate: 0,
      zIndex: index + 1,
    }
  })
}

export function computeShuffleLayout(
  areaWidth: number,
  areaHeight: number,
  order: readonly string[] = STICKER_ORDER,
  rng: () => number = Math.random
): StickerPosition[] {
  const marginX = Math.min(60, areaWidth * 0.12)
  const marginY = Math.min(60, areaHeight * 0.12)
  const usableWidth = Math.max(0, areaWidth - 2 * marginX)
  const usableHeight = Math.max(0, areaHeight - 2 * marginY)

  return order.map((id, index) => {
    const x = marginX + rng() * usableWidth
    const y = marginY + rng() * usableHeight
    const rotate = Math.round((rng() - 0.5) * 24)

    return {
      id,
      x,
      y,
      rotate,
      zIndex: index + 1,
    }
  })
}
