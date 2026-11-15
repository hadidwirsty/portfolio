/**
 * Pure physics calculation for playful cursor-repel (nudge) effect.
 */

export interface Point {
  x: number
  y: number
}

export interface NudgeConfig {
  /** Radius of influence around cursor in pixels (default: 160) */
  nudgeRadius: number
  /** Maximum distance to push away when cursor is closest (default: 44) */
  pushDistance: number
  /** Maximum rotational twist in degrees (default: 12) */
  maxTwist: number
  /** Spring stiffness (default: 220) */
  stiffness: number
  /** Spring damping (default: 18) */
  damping: number
  /** Spring mass (default: 0.6) */
  mass: number
}

export const DEFAULT_NUDGE_CONFIG: NudgeConfig = {
  nudgeRadius: 160,
  pushDistance: 44,
  maxTwist: 12,
  stiffness: 220,
  damping: 18,
  mass: 0.6,
}

export interface NudgeOffset {
  x: number
  y: number
  rotate: number
}

/**
 * Computes the repel vector and rotation angle for a sticker given the cursor position.
 * Returns (0, 0, 0) if the cursor is outside the influence radius or invalid.
 */
export function computeNudgeOffset(
  cursorPos: Point,
  stickerCenter: Point,
  config: Partial<NudgeConfig> = {}
): NudgeOffset {
  const radius = config.nudgeRadius ?? DEFAULT_NUDGE_CONFIG.nudgeRadius
  const maxPush = config.pushDistance ?? DEFAULT_NUDGE_CONFIG.pushDistance
  const maxTwist = config.maxTwist ?? DEFAULT_NUDGE_CONFIG.maxTwist

  const dx = stickerCenter.x - cursorPos.x
  const dy = stickerCenter.y - cursorPos.y
  const distance = Math.hypot(dx, dy)

  // Outside influence radius or zero distance
  if (distance >= radius || distance <= 0.001) {
    return { x: 0, y: 0, rotate: 0 }
  }

  // Linear decay factor: 1 at cursor center, 0 at outer boundary
  const factor = 1 - distance / radius
  const push = maxPush * factor

  // Normalized direction vector pushing away from cursor
  const ux = dx / distance
  const uy = dy / distance

  const x = ux * push
  const y = uy * push

  // Dynamic twist proportional to horizontal push
  const rotate = Math.max(-maxTwist, Math.min(maxTwist, ux * maxTwist * factor))

  return {
    x: Math.round(x * 100) / 100,
    y: Math.round(y * 100) / 100,
    rotate: Math.round(rotate * 100) / 100,
  }
}
