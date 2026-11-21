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

export interface StickerPlacement {
  resting: { x: number; y: number; rotate: number; zIndex: number }
  expanded: { x: number; y: number; rotate: number; zIndex: number }
}

const CANONICAL_RESTING_PRESETS: Record<
  string,
  { x: number; y: number; rotate: number; zIndex: number }
> = {
  typescript: { x: -115, y: -74, rotate: -8, zIndex: 11 },
  javascript: { x: -70, y: -64, rotate: 4, zIndex: 14 },
  react: { x: -14, y: -72, rotate: -3, zIndex: 15 },
  nextjs: { x: 42, y: -80, rotate: 6, zIndex: 12 },
  html5: { x: 88, y: -66, rotate: -5, zIndex: 13 },
  css3: { x: 130, y: -76, rotate: 9, zIndex: 10 },
  "ant-design": { x: -108, y: -76, rotate: -10, zIndex: 11 },
  "base-ui": { x: -54, y: -64, rotate: 4, zIndex: 14 },
  "ng-zorro": { x: 0, y: -82, rotate: -2, zIndex: 12 },
  radix: { x: 54, y: -66, rotate: 6, zIndex: 15 },
  shadcn: { x: 108, y: -74, rotate: -8, zIndex: 10 },
  "tanstack-query": { x: -108, y: -76, rotate: -10, zIndex: 11 },
  zustand: { x: -54, y: -64, rotate: 4, zIndex: 14 },
  redux: { x: 0, y: -82, rotate: -2, zIndex: 12 },
  "react-hook-form": { x: 54, y: -66, rotate: 6, zIndex: 15 },
  zod: { x: 108, y: -74, rotate: -8, zIndex: 10 },
  vitest: { x: -108, y: -76, rotate: -10, zIndex: 11 },
  jest: { x: -54, y: -64, rotate: 4, zIndex: 14 },
  rtl: { x: 0, y: -82, rotate: -2, zIndex: 12 },
  cypress: { x: 54, y: -66, rotate: 6, zIndex: 15 },
  jwt: { x: 108, y: -74, rotate: -8, zIndex: 10 },
  vue: { x: -108, y: -76, rotate: -10, zIndex: 11 },
  nuxt: { x: -54, y: -64, rotate: 4, zIndex: 14 },
  angular: { x: 0, y: -82, rotate: -2, zIndex: 12 },
  blazor: { x: 54, y: -66, rotate: 6, zIndex: 15 },
  nodejs: { x: 108, y: -74, rotate: -8, zIndex: 10 },
  git: { x: -108, y: -76, rotate: -10, zIndex: 11 },
  vite: { x: -54, y: -64, rotate: 4, zIndex: 14 },
  postman: { x: 0, y: -82, rotate: -2, zIndex: 12 },
  aws: { x: 54, y: -66, rotate: 6, zIndex: 15 },
  "vs-code": { x: 108, y: -74, rotate: -8, zIndex: 10 },
}

export function calculateCategoryCoords(
  techId: string,
  index: number,
  total: number,
  categoryId: string,
  isRevealed: boolean,
  shouldReduceMotion: boolean,
  activeScatterPositions?: Record<string, StickerPosition>
) {
  const restingFallback = CANONICAL_RESTING_PRESETS[techId] ?? {
    x: 0,
    y: -74,
    rotate: 0,
    zIndex: 10 + index,
  }

  if (shouldReduceMotion) {
    const targetX =
      isRevealed && activeScatterPositions?.[techId]
        ? activeScatterPositions[techId].x
        : 0
    return {
      x: isRevealed ? targetX : restingFallback.x,
      y: isRevealed ? -115 : restingFallback.y,
      rotate: 0,
      scale: 1,
      zIndex: isRevealed
        ? (activeScatterPositions?.[techId]?.zIndex ?? 20 + index)
        : restingFallback.zIndex,
    }
  }

  if (isRevealed) {
    const active = activeScatterPositions?.[techId]
    if (active) {
      return {
        x: active.x,
        y: active.y,
        rotate: active.rotate,
        scale: 1.08,
        zIndex: active.zIndex,
      }
    }
  }

  return {
    x: restingFallback.x,
    y: restingFallback.y,
    rotate: restingFallback.rotate,
    scale: 0.98,
    zIndex: restingFallback.zIndex,
  }
}

export function calculateCategoryTooltipCoords(
  techId: string,
  index: number,
  total: number,
  categoryId: string,
  isRevealed: boolean,
  shouldReduceMotion: boolean,
  activeScatterPositions?: Record<string, StickerPosition>
) {
  const coords = calculateCategoryCoords(
    techId,
    index,
    total,
    categoryId,
    isRevealed,
    shouldReduceMotion,
    activeScatterPositions
  )
  const verticalOffset = 56
  return {
    x: coords.x,
    y: coords.y - verticalOffset,
  }
}
