export interface TimelineYearMarker {
  year: number
  label: string
  month: string
  position: number
}

// ---------------------------------------------------------------------------
// 2. Timeline Constants
// ---------------------------------------------------------------------------

/**
 * The chronological project timeline starts with Netmonk Analytics in Jan 2023
 * and concludes with HiBlow Fleet in Oct 2026.
 * Total span: 46 months inclusive -> 45 discrete 1-month intervals.
 */
export const TIMELINE_START_MONTH = "2023-01" as const
export const TIMELINE_END_MONTH = "2026-10" as const
export const TOTAL_TIMELINE_MONTHS = 46 as const
export const TOTAL_TIMELINE_INTERVALS = 45 as const

const BASE_YEAR = 2023
const BASE_MONTH = 1

// ---------------------------------------------------------------------------
// 3. Mathematical & Parsing Helpers
// ---------------------------------------------------------------------------

/**
 * Validates and parses a YYYY-MM string into numeric year and month.
 * Returns null if format is invalid or month is out of 1-12 range.
 */
export function parseYearMonth(
  ym: string
): { year: number; month: number } | null {
  if (!ym || typeof ym !== "string") return null
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(ym)
  if (!match) return null

  const year = parseInt(match[1], 10)
  const month = parseInt(match[2], 10)
  return { year, month }
}

/**
 * Computes discrete zero-based month offset from the timeline origin (2023-01).
 * Example: 2023-01 -> 0, 2024-01 -> 12, 2026-10 -> 45.
 */
export function getMonthOffset(
  ym: string,
  baseYear = BASE_YEAR,
  baseMonth = BASE_MONTH
): number {
  const parsed = parseYearMonth(ym)
  if (!parsed) return 0
  return (parsed.year - baseYear) * 12 + (parsed.month - baseMonth)
}

/**
 * Calculates horizontal percentage position (0 to 100%) for a given month on the ruler.
 * Clamps out-of-bounds dates to 0% or 100%. Returns null if date format is invalid.
 */
export function getTimelineRulerPosition(ym: string): number | null {
  const parsed = parseYearMonth(ym)
  if (!parsed) return null

  const offset = getMonthOffset(ym)
  if (offset <= 0) return 0
  if (offset >= TOTAL_TIMELINE_INTERVALS) return 100

  return (offset / TOTAL_TIMELINE_INTERVALS) * 100
}

/**
 * Calculates ruler segment metrics (left percentage and width percentage)
 * for a project spanning from startMonth to endMonth.
 */
export function getTimelineRulerSpan(
  startMonth: string,
  endMonth: string
): { left: number; width: number } | null {
  const startPos = getTimelineRulerPosition(startMonth)
  const endPos = getTimelineRulerPosition(endMonth)

  if (startPos === null || endPos === null) return null
  if (endMonth < startMonth) return null

  return {
    left: startPos,
    width: endPos - startPos,
  }
}

/**
 * Pre-calculated year markers for the timeline ruler track (2023, 2024, 2025, 2026).
 */
export const TIMELINE_YEAR_MARKERS: readonly TimelineYearMarker[] = [
  {
    year: 2023,
    label: "2023",
    month: "2023-01",
    position: (0 / TOTAL_TIMELINE_INTERVALS) * 100,
  },
  {
    year: 2024,
    label: "2024",
    month: "2024-01",
    position: (12 / TOTAL_TIMELINE_INTERVALS) * 100,
  },
  {
    year: 2025,
    label: "2025",
    month: "2025-01",
    position: (24 / TOTAL_TIMELINE_INTERVALS) * 100,
  },
  {
    year: 2026,
    label: "2026",
    month: "2026-01",
    position: (36 / TOTAL_TIMELINE_INTERVALS) * 100,
  },
] as const
