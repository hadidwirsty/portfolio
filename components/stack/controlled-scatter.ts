/**
 * Controlled Random Scatter Generator for Technology Physical Folders.
 * Generates bounded, visually balanced, multi-tier organic scatter layouts
 * per open session while strictly preserving deterministic resting positions.
 */

import type { TechCategory } from "@/lib/tech-stack-data"

export interface StickerPosition {
  x: number
  y: number
  rotate: number
  zIndex: number
}

export interface ScatterSlot {
  x: number
  y: number
  rotate: number
  zIndex: number
}

// Bounded coordinate limits for visual and layout safety
export const SCATTER_BOUNDS = {
  minX: -132,
  maxX: 132,
  minY: -220,
  maxY: -112,
  minRotate: -14,
  maxRotate: 14,
  minDistance: 38, // minimum Euclidean distance between centers to prevent stacking collapse
}

/**
 * 6-Item Curated Spatial Formations (e.g. Category 01: Frontend).
 * Each formation provides a distinct aesthetic multi-tier composition.
 */
export const SIX_ITEM_FORMATIONS: ScatterSlot[][] = [
  // Formation 0: The Classic Arc (Canonical baseline)
  [
    { x: -128, y: -125, rotate: -12, zIndex: 21 },
    { x: -78, y: -195, rotate: 8, zIndex: 24 },
    { x: -12, y: -210, rotate: -4, zIndex: 26 },
    { x: 38, y: -115, rotate: 9, zIndex: 22 },
    { x: 82, y: -188, rotate: -7, zIndex: 25 },
    { x: 126, y: -130, rotate: 10, zIndex: 23 },
  ],
  // Formation 1: Inverted Wave (High wings, floating mid-tier center)
  [
    { x: -124, y: -195, rotate: -9, zIndex: 25 },
    { x: -74, y: -125, rotate: 7, zIndex: 22 },
    { x: -20, y: -180, rotate: -5, zIndex: 24 },
    { x: 32, y: -215, rotate: 5, zIndex: 26 },
    { x: 80, y: -120, rotate: -8, zIndex: 21 },
    { x: 128, y: -185, rotate: 10, zIndex: 23 },
  ],
  // Formation 2: Dual Peak Cascade (Two energetic elevated crests)
  [
    { x: -120, y: -140, rotate: -10, zIndex: 22 },
    { x: -68, y: -210, rotate: 6, zIndex: 26 },
    { x: -16, y: -130, rotate: -6, zIndex: 21 },
    { x: 36, y: -190, rotate: 8, zIndex: 25 },
    { x: 86, y: -135, rotate: -8, zIndex: 23 },
    { x: 124, y: -205, rotate: 9, zIndex: 24 },
  ],
  // Formation 3: Asymmetric Drift (Alternating depth stagger)
  [
    { x: -130, y: -175, rotate: -8, zIndex: 24 },
    { x: -80, y: -120, rotate: 10, zIndex: 21 },
    { x: -28, y: -205, rotate: -3, zIndex: 26 },
    { x: 26, y: -145, rotate: 7, zIndex: 22 },
    { x: 74, y: -210, rotate: -5, zIndex: 25 },
    { x: 122, y: -125, rotate: 9, zIndex: 23 },
  ],
]

/**
 * 5-Item Curated Spatial Formations (e.g. Categories 02-06).
 * Each formation provides a distinct aesthetic multi-tier composition.
 */
export const FIVE_ITEM_FORMATIONS: ScatterSlot[][] = [
  // Formation 0: Center Peak (Canonical baseline)
  [
    { x: -125, y: -125, rotate: -12, zIndex: 21 },
    { x: -65, y: -190, rotate: 8, zIndex: 24 },
    { x: 0, y: -215, rotate: -3, zIndex: 26 },
    { x: 65, y: -185, rotate: 7, zIndex: 25 },
    { x: 125, y: -125, rotate: -10, zIndex: 22 },
  ],
  // Formation 1: Double Ridge / M-Formation (Two high towers flanking a middle tier)
  [
    { x: -120, y: -195, rotate: -9, zIndex: 25 },
    { x: -58, y: -120, rotate: 6, zIndex: 21 },
    { x: 4, y: -175, rotate: -4, zIndex: 24 },
    { x: 68, y: -210, rotate: 9, zIndex: 26 },
    { x: 122, y: -130, rotate: -8, zIndex: 22 },
  ],
  // Formation 2: Wing Crests (Left and right soar, central pocket valley)
  [
    { x: -122, y: -205, rotate: -10, zIndex: 26 },
    { x: -56, y: -145, rotate: 7, zIndex: 23 },
    { x: 0, y: -115, rotate: -2, zIndex: 21 },
    { x: 62, y: -170, rotate: 6, zIndex: 24 },
    { x: 124, y: -200, rotate: 10, zIndex: 25 },
  ],
  // Formation 3: Dynamic Diagonal Stagger (Alternating high-low staircase)
  [
    { x: -126, y: -135, rotate: -11, zIndex: 21 },
    { x: -66, y: -210, rotate: 9, zIndex: 26 },
    { x: -8, y: -155, rotate: -5, zIndex: 23 },
    { x: 54, y: -120, rotate: 7, zIndex: 22 },
    { x: 118, y: -195, rotate: -8, zIndex: 25 },
  ],
]

/**
 * Fast deterministic string hashing for repeatable pseudorandom seeding.
 */
export function hashString(str: string): number {
  let hash = 2166136261
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

/**
 * 32-bit Mulberry32 seeded pseudo-random number generator.
 * Fast, stateless closure returning float in [0, 1).
 */
export function createPrng(seed: number): () => number {
  let s = seed >>> 0
  return function () {
    let t = (s += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Clamps a number strictly within [min, max].
 */
function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

/**
 * Validates that all positions in a layout satisfy minimum spacing to avoid excessive overlap.
 */
export function validateScatterLayout(
  layout: Record<string, StickerPosition>,
  minDist = SCATTER_BOUNDS.minDistance
): boolean {
  const items = Object.values(layout)
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const dx = items[i].x - items[j].x
      const dy = items[i].y - items[j].y
      const dist = Math.hypot(dx, dy)
      if (dist < minDist) {
        return false
      }
    }
  }
  return true
}

/**
 * Generates an organic, bounded, collision-safe scatter layout for a folder category.
 *
 * @param category The technology category containing tech items
 * @param sessionIndex Monotonically increasing counter for the current folder open session
 * @returns Map of techId to StickerPosition
 */
export function generateControlledScatterLayout(
  category: TechCategory,
  sessionIndex: number
): Record<string, StickerPosition> {
  const techs = category.techs
  const total = techs.length
  if (total === 0) return {}

  const catHash = hashString(category.id)
  // Seed combines category identity with session count for unique sequences per folder
  const seed = (catHash ^ (sessionIndex * 31337)) >>> 0
  const prng = createPrng(seed)

  // Select formation set based on item count
  const formations = total >= 6 ? SIX_ITEM_FORMATIONS : FIVE_ITEM_FORMATIONS

  // Select formation index. Crucially, (sessionIndex % formations.length) guarantees
  // consecutive open sessions NEVER choose the same primary spatial formation!
  const formationIndex = Math.abs(sessionIndex) % formations.length
  const baseSlots = formations[formationIndex]

  // Construct permuted slot mapping so items change roles across sessions
  const slotIndices = Array.from({ length: total }, (_, i) => i)
  if (sessionIndex > 0) {
    // Deterministic Fisher-Yates shuffle of slot assignments
    for (let i = total - 1; i > 0; i--) {
      const j = Math.floor(prng() * (i + 1))
      const temp = slotIndices[i]
      slotIndices[i] = slotIndices[j]
      slotIndices[j] = temp
    }
  }

  const result: Record<string, StickerPosition> = {}

  for (let i = 0; i < total; i++) {
    const tech = techs[i]
    const slotIdx = slotIndices[i] % baseSlots.length
    const base = baseSlots[slotIdx]

    // Controlled micro-jitter: +-4px horizontal, +-5px vertical, +-2.5 deg rotation
    const jitterX = Math.round((prng() - 0.5) * 8)
    const jitterY = Math.round((prng() - 0.5) * 10)
    const jitterRot = Math.round((prng() - 0.5) * 5)

    const x = clamp(base.x + jitterX, SCATTER_BOUNDS.minX, SCATTER_BOUNDS.maxX)
    const y = clamp(base.y + jitterY, SCATTER_BOUNDS.minY, SCATTER_BOUNDS.maxY)
    const rotate = clamp(
      base.rotate + jitterRot,
      SCATTER_BOUNDS.minRotate,
      SCATTER_BOUNDS.maxRotate
    )
    const zIndex = base.zIndex

    result[tech.id] = { x, y, rotate, zIndex }
  }

  // Safety validation: if for any rare reason jitter caused a tight collision, fallback to raw base slots
  if (!validateScatterLayout(result, SCATTER_BOUNDS.minDistance - 6)) {
    const safeFallback: Record<string, StickerPosition> = {}
    for (let i = 0; i < total; i++) {
      const tech = techs[i]
      const base = baseSlots[i % baseSlots.length]
      safeFallback[tech.id] = { ...base }
    }
    return safeFallback
  }

  return result
}

export interface StickerArea {
  width: number
  height: number
  sticker: number
  labelHeight: number
}

export interface FittedSticker extends StickerPosition {
  scale: number
  hoverScale: number
  tooltipY: number
}

const EDGE = 8
const GAP = 10
const LABEL_GAP = 6
const MAX_STAGGER = 12
const FORMATION_STAGGER = [
  [0, 12, 4],
  [12, 0, 8],
  [4, 12, 0],
  [0, 5, 12],
]
// Largest pocket height (216px) minus the 144px sticker anchor offset.
const POCKET_CLEARANCE = 72
const OPEN_SCALE = 1.08
const HOVER_SCALE = OPEN_SCALE * 1.12 * 1.1

export function stickerHalfExtent(
  sticker: number,
  rotate: number,
  scale: number
) {
  const radians = (Math.abs(rotate) * Math.PI) / 180
  return (
    (sticker *
      scale *
      (Math.abs(Math.cos(radians)) + Math.abs(Math.sin(radians)))) /
    2
  )
}

export function scatterSessionAfterReveal(
  session: number,
  wasRevealed: boolean,
  isRevealed: boolean
) {
  return isRevealed && !wasRevealed ? session + 1 : session
}

export function fitScatterToArea(
  category: TechCategory,
  session: number,
  area: StickerArea,
  reducedMotion: boolean
) {
  const { width, height, sticker, labelHeight } = area
  const seeded = reducedMotion
    ? null
    : generateControlledScatterLayout(category, session)
  const preferred = category.techs.map(({ id }, index) => ({
    id,
    ...(seeded?.[id] ?? { x: index, y: 0, rotate: 0, zIndex: 20 + index }),
  }))
  const positions: Record<string, FittedSticker> = {}
  if (preferred.length === 0) return { positions, extraHeight: 0 }

  const usableWidth = Math.max(1, width - 2 * Math.min(EDGE, width / 4))
  const columns = Math.min(
    preferred.length,
    3,
    Math.max(1, Math.floor((usableWidth + GAP) / (sticker + GAP)))
  )
  const rows = Math.ceil(preferred.length / columns)
  const cellWidth = (usableWidth + GAP) / columns
  const stagger =
    seeded && columns > 1
      ? FORMATION_STAGGER[Math.abs(session) % FORMATION_STAGGER.length]
      : null
  const staggerSpace = stagger ? MAX_STAGGER : 0
  // Every row has a label band above all of its stickers. Reserve it for the
  // tallest actual label, including when line wrapping is needed.
  const labelBand = staggerSpace + labelHeight + LABEL_GAP * 2
  const preferredSize = stagger ? sticker * 1.16 : sticker
  const displaySize = Math.max(1, Math.min(preferredSize, cellWidth - GAP))
  const cellHeight = Math.max(
    displaySize,
    (height - POCKET_CLEARANCE) / rows - labelBand
  )
  const rowPitch = cellHeight + labelBand
  const extraHeight = Math.max(
    0,
    Math.ceil(rows * rowPitch + POCKET_CLEARANCE - height)
  )
  const cellExtent = Math.max(1, Math.min(cellWidth - GAP, cellHeight))
  const ordered = preferred.sort((a, b) => a.x - b.x)

  for (let column = 0; column < columns; column++) {
    const group = reducedMotion
      ? ordered.filter((_, index) => index % columns === column)
      : ordered.slice(column * rows, (column + 1) * rows)
    group.sort((a, b) => a.y - b.y)
    for (const [row, item] of group.entries()) {
      const rotationBudget = cellExtent / (sticker * (seeded ? OPEN_SCALE : 1))
      const angleLimit = Math.max(0, ((rotationBudget - 1) * 180) / Math.PI)
      const rotate = clamp(item.rotate, -angleLimit, angleLimit)
      const maximumScale =
        cellExtent / (2 * stickerHalfExtent(sticker, rotate, 1))
      const scale = Math.min(reducedMotion ? 1 : OPEN_SCALE, maximumScale)
      const hoverScale = reducedMotion
        ? scale
        : Math.min(HOVER_SCALE, maximumScale)
      const slackX = Math.max(
        0,
        (cellWidth - GAP) / 2 - stickerHalfExtent(sticker, rotate, hoverScale)
      )
      const rowBottom = -POCKET_CLEARANCE - (rows - row - 1) * rowPitch
      positions[item.id] = {
        x:
          (column - (columns - 1) / 2) * cellWidth +
          (seeded ? (item.x / 132) * Math.min(6, slackX) : 0),
        y: rowBottom - cellHeight / 2 - (stagger?.[column] ?? 0),
        tooltipY: rowBottom - cellHeight - staggerSpace - LABEL_GAP,
        rotate,
        zIndex: item.zIndex,
        scale,
        hoverScale,
      }
    }
  }

  return { positions, extraHeight }
}

/** Keep the hover path inside the label's own column down to the artwork. */
export function tooltipBridgeHeight(position: FittedSticker, sticker: number) {
  return position.y - (sticker * position.scale) / 2 - position.tooltipY + 2
}
