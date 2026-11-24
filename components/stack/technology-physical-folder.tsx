"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"

import {
  fitScatterToArea,
  scatterSessionAfterReveal,
  stickerHalfExtent,
  tooltipBridgeHeight,
  type StickerArea,
} from "@/components/stack/controlled-scatter"
import { GradientMotionBackground } from "@/components/ui/gradient-motion-background"
import { useLanguage } from "@/lib/language-context"
import {
  getTechStickerAsset,
  type TechStickerAssetInfo,
} from "@/lib/tech-stack-sticker-assets"
import type { TechCategory, TechItem } from "@/lib/tech-stack-data"
import { cn } from "@/lib/utils"

export interface TechnologyPhysicalFolderProps {
  category: TechCategory
  isRevealed: boolean
  onInteraction: (type: "enter" | "leave" | "activate" | "dismiss") => void
  className?: string
}

export interface StickerPlacement {
  resting: { x: number; y: number; rotate: number; zIndex: number }
  expanded: { x: number; y: number; rotate: number; zIndex: number }
}

/**
 * Category 01 exact canonical placements (Preserved 100% from approved Frontend prototype).
 */
export const FRONTEND_PLACEMENTS: Record<string, StickerPlacement> = {
  typescript: {
    resting: { x: -115, y: -74, rotate: -8, zIndex: 11 },
    expanded: { x: -135, y: -120, rotate: -12, zIndex: 21 },
  },
  javascript: {
    resting: { x: -70, y: -64, rotate: 4, zIndex: 14 },
    expanded: { x: -105, y: -190, rotate: -10, zIndex: 24 },
  },
  react: {
    resting: { x: -14, y: -72, rotate: -3, zIndex: 15 },
    expanded: { x: -20, y: -205, rotate: 5, zIndex: 26 },
  },
  nextjs: {
    resting: { x: 42, y: -80, rotate: 6, zIndex: 12 },
    expanded: { x: 70, y: -180, rotate: -7, zIndex: 25 },
  },
  html5: {
    resting: { x: 88, y: -66, rotate: -5, zIndex: 13 },
    expanded: { x: 15, y: -110, rotate: 8, zIndex: 22 },
  },
  css3: {
    resting: { x: 130, y: -76, rotate: 9, zIndex: 10 },
    expanded: { x: 125, y: -125, rotate: 12, zIndex: 23 },
  },
}

/**
 * Category 02 (UI & Design Systems) organic multi-tier placements.
 * Replicates the non-linear, multi-depth organic scatter from the approved Frontend prototype.
 */
export const UI_STYLING_PLACEMENTS: Record<string, StickerPlacement> = {
  "ant-design": {
    resting: { x: -108, y: -76, rotate: -10, zIndex: 11 },
    expanded: { x: -128, y: -125, rotate: -12, zIndex: 21 },
  },
  "base-ui": {
    resting: { x: -54, y: -64, rotate: 4, zIndex: 14 },
    expanded: { x: -78, y: -195, rotate: 8, zIndex: 24 },
  },
  "ng-zorro": {
    resting: { x: 0, y: -82, rotate: -2, zIndex: 12 },
    expanded: { x: -12, y: -210, rotate: -4, zIndex: 26 },
  },
  radix: {
    resting: { x: 54, y: -66, rotate: 6, zIndex: 15 },
    expanded: { x: 38, y: -115, rotate: 9, zIndex: 22 },
  },
  shadcn: {
    resting: { x: 108, y: -74, rotate: -8, zIndex: 10 },
    expanded: { x: 118, y: -168, rotate: -8, zIndex: 25 },
  },
  tailwind: {
    resting: { x: 130, y: -76, rotate: 9, zIndex: 10 },
    expanded: { x: 126, y: -130, rotate: 10, zIndex: 23 },
  },
}

/**
 * Category 03 (State & Data Management) organic multi-tier placements.
 * Features an asymmetrical multi-depth scatter with alternating high-tier and low-tier layers.
 */
export const STATE_DATA_PLACEMENTS: Record<string, StickerPlacement> = {
  "tanstack-query": {
    resting: { x: -108, y: -76, rotate: -10, zIndex: 11 },
    expanded: { x: -118, y: -178, rotate: -10, zIndex: 24 },
  },
  zustand: {
    resting: { x: -54, y: -64, rotate: 4, zIndex: 14 },
    expanded: { x: -42, y: -115, rotate: 8, zIndex: 22 },
  },
  redux: {
    resting: { x: 0, y: -82, rotate: -2, zIndex: 12 },
    expanded: { x: 18, y: -210, rotate: -5, zIndex: 26 },
  },
  "react-hook-form": {
    resting: { x: 54, y: -66, rotate: 6, zIndex: 15 },
    expanded: { x: 78, y: -185, rotate: 7, zIndex: 25 },
  },
  "tanstack-table": {
    resting: { x: 88, y: -66, rotate: -5, zIndex: 13 },
    expanded: { x: 82, y: -188, rotate: -7, zIndex: 25 },
  },
  recharts: {
    resting: { x: 130, y: -76, rotate: 9, zIndex: 10 },
    expanded: { x: 126, y: -130, rotate: 10, zIndex: 23 },
  },
}

/**
 * Category 04 (Testing & Web Security) organic multi-tier placements.
 * Features an asymmetrical multi-depth scatter with alternating high-tier and low-tier layers.
 */
export const TESTING_SECURITY_PLACEMENTS: Record<string, StickerPlacement> = {
  vitest: {
    resting: { x: -108, y: -76, rotate: -10, zIndex: 11 },
    expanded: { x: -128, y: -125, rotate: -12, zIndex: 21 },
  },
  jest: {
    resting: { x: -54, y: -64, rotate: 4, zIndex: 14 },
    expanded: { x: -78, y: -195, rotate: 8, zIndex: 24 },
  },
  rtl: {
    resting: { x: 0, y: -82, rotate: -2, zIndex: 12 },
    expanded: { x: -12, y: -210, rotate: -4, zIndex: 26 },
  },
  cypress: {
    resting: { x: 54, y: -66, rotate: 6, zIndex: 15 },
    expanded: { x: 38, y: -115, rotate: 9, zIndex: 22 },
  },
  jwt: {
    resting: { x: 108, y: -74, rotate: -8, zIndex: 10 },
    expanded: { x: 118, y: -168, rotate: -8, zIndex: 25 },
  },
  zod: {
    resting: { x: 130, y: -76, rotate: 9, zIndex: 10 },
    expanded: { x: 126, y: -130, rotate: 10, zIndex: 23 },
  },
}

/**
 * Category 05 (Cross-Framework Engineering) organic multi-tier placements.
 * Features an asymmetrical multi-depth scatter with alternating high-tier and low-tier layers.
 */
export const CROSS_FRAMEWORK_PLACEMENTS: Record<string, StickerPlacement> = {
  vue: {
    resting: { x: -108, y: -76, rotate: -10, zIndex: 11 },
    expanded: { x: -118, y: -178, rotate: -10, zIndex: 24 },
  },
  nuxt: {
    resting: { x: -54, y: -64, rotate: 4, zIndex: 14 },
    expanded: { x: -42, y: -115, rotate: 8, zIndex: 22 },
  },
  angular: {
    resting: { x: 0, y: -82, rotate: -2, zIndex: 12 },
    expanded: { x: 18, y: -210, rotate: -5, zIndex: 26 },
  },
  blazor: {
    resting: { x: 54, y: -66, rotate: 6, zIndex: 15 },
    expanded: { x: 78, y: -185, rotate: 7, zIndex: 25 },
  },
  nodejs: {
    resting: { x: 108, y: -74, rotate: -8, zIndex: 10 },
    expanded: { x: 128, y: -125, rotate: -12, zIndex: 21 },
  },
  rxjs: {
    resting: { x: 130, y: -76, rotate: 9, zIndex: 10 },
    expanded: { x: 126, y: -130, rotate: 10, zIndex: 23 },
  },
}

/**
 * Category 06 (Developer Tools & Cloud) organic multi-tier placements.
 * Features an asymmetrical multi-depth scatter with alternating high-tier and low-tier layers.
 */
export const DEV_TOOLS_CLOUD_PLACEMENTS: Record<string, StickerPlacement> = {
  git: {
    resting: { x: -108, y: -76, rotate: -10, zIndex: 11 },
    expanded: { x: -128, y: -125, rotate: -12, zIndex: 21 },
  },
  vite: {
    resting: { x: -54, y: -64, rotate: 4, zIndex: 14 },
    expanded: { x: -78, y: -195, rotate: 8, zIndex: 24 },
  },
  postman: {
    resting: { x: 0, y: -82, rotate: -2, zIndex: 12 },
    expanded: { x: -12, y: -210, rotate: -4, zIndex: 26 },
  },
  aws: {
    resting: { x: 54, y: -66, rotate: 6, zIndex: 15 },
    expanded: { x: 38, y: -115, rotate: 9, zIndex: 22 },
  },
  "vs-code": {
    resting: { x: 108, y: -74, rotate: -8, zIndex: 10 },
    expanded: { x: 118, y: -168, rotate: -8, zIndex: 25 },
  },
  gitlab: {
    resting: { x: 130, y: -76, rotate: 9, zIndex: 10 },
    expanded: { x: 126, y: -130, rotate: 10, zIndex: 23 },
  },
}

/**
 * Deterministic spatial layout presets for 4-item and 5-item categories.
 * Calibrated with expressive multi-layer physical stacking, vertical offsets, and organic rotations.
 */
const FOUR_ITEM_PRESETS: StickerPlacement[] = [
  {
    resting: { x: -92, y: -76, rotate: -9, zIndex: 11 },
    expanded: { x: -120, y: -135, rotate: -14, zIndex: 21 },
  },
  {
    resting: { x: -34, y: -64, rotate: 5, zIndex: 14 },
    expanded: { x: -48, y: -205, rotate: 7, zIndex: 24 },
  },
  {
    resting: { x: 30, y: -80, rotate: -4, zIndex: 12 },
    expanded: { x: 44, y: -195, rotate: -6, zIndex: 23 },
  },
  {
    resting: { x: 92, y: -68, rotate: 8, zIndex: 13 },
    expanded: { x: 122, y: -140, rotate: 11, zIndex: 22 },
  },
]

const FIVE_ITEM_PRESETS: StickerPlacement[] = [
  {
    resting: { x: -108, y: -76, rotate: -10, zIndex: 11 },
    expanded: { x: -128, y: -125, rotate: -12, zIndex: 21 },
  },
  {
    resting: { x: -54, y: -64, rotate: 4, zIndex: 14 },
    expanded: { x: -75, y: -190, rotate: 8, zIndex: 24 },
  },
  {
    resting: { x: 0, y: -82, rotate: -2, zIndex: 12 },
    expanded: { x: 0, y: -215, rotate: -3, zIndex: 25 },
  },
  {
    resting: { x: 54, y: -66, rotate: 6, zIndex: 15 },
    expanded: { x: 75, y: -185, rotate: 7, zIndex: 23 },
  },
  {
    resting: { x: 108, y: -74, rotate: -8, zIndex: 10 },
    expanded: { x: 126, y: -130, rotate: -10, zIndex: 22 },
  },
]

const SIX_ITEM_PRESETS: StickerPlacement[] = [
  {
    resting: { x: -115, y: -74, rotate: -8, zIndex: 11 },
    expanded: { x: -128, y: -125, rotate: -12, zIndex: 21 },
  },
  {
    resting: { x: -70, y: -64, rotate: 4, zIndex: 14 },
    expanded: { x: -78, y: -195, rotate: 8, zIndex: 24 },
  },
  {
    resting: { x: -14, y: -72, rotate: -3, zIndex: 15 },
    expanded: { x: -12, y: -210, rotate: -4, zIndex: 26 },
  },
  {
    resting: { x: 42, y: -80, rotate: 6, zIndex: 12 },
    expanded: { x: 38, y: -115, rotate: 9, zIndex: 22 },
  },
  {
    resting: { x: 88, y: -66, rotate: -5, zIndex: 13 },
    expanded: { x: 82, y: -188, rotate: -7, zIndex: 25 },
  },
  {
    resting: { x: 130, y: -76, rotate: 9, zIndex: 10 },
    expanded: { x: 126, y: -130, rotate: 10, zIndex: 23 },
  },
]

/**
 * Resolves placement for a given technology within its category.
 */
export function getStickerPlacement(
  techId: string,
  index: number,
  total: number,
  categoryId: string
): StickerPlacement {
  if (categoryId === "frontend-development" && FRONTEND_PLACEMENTS[techId]) {
    return FRONTEND_PLACEMENTS[techId]
  }

  if (categoryId === "ui-styling" && UI_STYLING_PLACEMENTS[techId]) {
    return UI_STYLING_PLACEMENTS[techId]
  }

  if (categoryId === "state-data" && STATE_DATA_PLACEMENTS[techId]) {
    return STATE_DATA_PLACEMENTS[techId]
  }

  if (
    categoryId === "testing-security" &&
    TESTING_SECURITY_PLACEMENTS[techId]
  ) {
    return TESTING_SECURITY_PLACEMENTS[techId]
  }

  if (categoryId === "cross-framework" && CROSS_FRAMEWORK_PLACEMENTS[techId]) {
    return CROSS_FRAMEWORK_PLACEMENTS[techId]
  }

  if (categoryId === "dev-tools-cloud" && DEV_TOOLS_CLOUD_PLACEMENTS[techId]) {
    return DEV_TOOLS_CLOUD_PLACEMENTS[techId]
  }

  if (total === 4) {
    return FOUR_ITEM_PRESETS[index % 4]
  }

  if (total === 5) {
    return FIVE_ITEM_PRESETS[index % 5]
  }

  if (total === 6) {
    return SIX_ITEM_PRESETS[index % 6]
  }

  // Fallback linear spread for generic counts
  const rel = total > 1 ? (index - (total - 1) / 2) / ((total - 1) / 2) : 0
  return {
    resting: {
      x: Math.round(rel * 95),
      y: -74 + Math.round(Math.abs(rel) * 6),
      rotate: Math.round(rel * 7),
      zIndex: 10 + index,
    },
    expanded: {
      x: Math.round(rel * 120),
      y: -140 - Math.round((1 - Math.abs(rel)) * 60),
      rotate: Math.round(rel * 10),
      zIndex: 20 + index,
    },
  }
}

/**
 * Minimal category title & subtitle dictionary.
 */
interface CategoryHeaderCopy {
  title: Record<"id" | "en", string>
  subtitle: Record<"id" | "en", string>
}

const CATEGORY_HEADER_MAP: Record<string, CategoryHeaderCopy> = {
  "frontend-development": {
    title: { id: "Frontend", en: "Frontend" },
    subtitle: {
      id: "Bahasa & Framework",
      en: "Languages & Frameworks",
    },
  },
  "ui-styling": {
    title: { id: "UI & Desain", en: "UI & Design" },
    subtitle: {
      id: "Sistem Desain & Komponen",
      en: "Design Systems & Components",
    },
  },
  "state-data": {
    title: { id: "State & Data", en: "State & Data" },
    subtitle: {
      id: "State, Formulir, Tabel & Visualisasi",
      en: "State, Forms, Tables & Visualization",
    },
  },
  "testing-security": {
    title: { id: "Pengujian", en: "Testing" },
    subtitle: {
      id: "Pengujian, Validasi & Keamanan",
      en: "Testing, Validation & Security",
    },
  },
  "cross-framework": {
    title: { id: "Framework", en: "Frameworks" },
    subtitle: {
      id: "Framework & Pemrograman Reaktif",
      en: "Frameworks & Reactive Programming",
    },
  },
  "dev-tools-cloud": {
    title: { id: "Tools & Cloud", en: "Tools & Cloud" },
    subtitle: {
      id: "GitLab, Toolchain & Cloud",
      en: "GitLab, Toolchains & Cloud",
    },
  },
}

type TechnologyLabel = { hovered: string | null; focused: string | null }
type LabelEvent =
  { type: "hover" | "focus"; id: string } | { type: "leave" | "blur" | "close" }

const emptyLabel: TechnologyLabel = { hovered: null, focused: null }

export function updateTechnologyLabel(
  state: TechnologyLabel,
  event: LabelEvent
): TechnologyLabel {
  switch (event.type) {
    case "hover":
      return { ...state, hovered: event.id }
    case "focus":
      return { hovered: null, focused: event.id }
    case "leave":
      return { ...state, hovered: null }
    case "blur":
      return { ...state, focused: null }
    case "close":
      return emptyLabel
  }
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

function subscribeToReducedMotion(onChange: () => void) {
  const preference = window.matchMedia(reducedMotionQuery)
  preference.addEventListener("change", onChange)
  return () => preference.removeEventListener("change", onChange)
}

export function TechnologyPhysicalFolder({
  category,
  isRevealed,
  onInteraction,
  className,
}: TechnologyPhysicalFolderProps) {
  const { lang } = useLanguage()
  const shouldReduceMotion = React.useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false
  )
  const trigger = React.useRef<HTMLButtonElement>(null)
  const stage = React.useRef<HTMLDivElement>(null)
  const firstSticker = React.useRef<HTMLDivElement>(null)
  const labelSizer = React.useRef<HTMLDivElement>(null)
  const [area, setArea] = React.useState<StickerArea>({
    width: 320,
    height: 264,
    sticker: 72,
    labelHeight: 22,
  })

  React.useLayoutEffect(() => {
    const panel = stage.current
    const sticker = firstSticker.current
    const labels = labelSizer.current
    if (!panel || !sticker || !labels) return

    const observer = new ResizeObserver(() => {
      const next = {
        width: panel.clientWidth,
        height: panel.clientHeight,
        sticker: sticker.offsetWidth,
        labelHeight: labels.offsetHeight,
      }
      if (!next.width || !next.height || !next.sticker || !next.labelHeight)
        return
      setArea((previous) =>
        previous.width === next.width &&
        previous.height === next.height &&
        previous.sticker === next.sticker &&
        previous.labelHeight === next.labelHeight
          ? previous
          : next
      )
    })
    observer.observe(panel)
    observer.observe(sticker)
    observer.observe(labels)
    return () => observer.disconnect()
  }, [])
  const pointerInside = React.useRef(false)
  const [label, updateLabel] = React.useReducer(
    updateTechnologyLabel,
    emptyLabel
  )
  const activeTechId = label.hovered ?? label.focused
  const [sessionIndex, setSessionIndex] = React.useState(0)
  const [wasRevealed, setWasRevealed] = React.useState(isRevealed)
  if (wasRevealed !== isRevealed) {
    setWasRevealed(isRevealed)
    if (isRevealed)
      setSessionIndex(
        scatterSessionAfterReveal(sessionIndex, wasRevealed, isRevealed)
      )
    else updateLabel({ type: "close" })
  }

  React.useLayoutEffect(() => {
    if (!isRevealed && stage.current?.contains(document.activeElement)) {
      trigger.current?.focus({ preventScroll: true })
    }
  }, [isRevealed])

  // Active controlled organic scatter layout computed for this open session
  const scatter = React.useMemo(
    () => fitScatterToArea(category, sessionIndex, area, shouldReduceMotion),
    [category, sessionIndex, area, shouldReduceMotion]
  )

  const restingPosition = (tech: TechItem, index: number) => {
    const { x, y, rotate, zIndex } = getStickerPlacement(
      tech.id,
      index,
      category.techs.length,
      category.id
    ).resting
    const angle = shouldReduceMotion ? 0 : rotate
    const scale = Math.min(
      shouldReduceMotion ? 1 : 0.98,
      Math.max(1, area.width - 8) /
        (2 * stickerHalfExtent(area.sticker, angle, 1))
    )
    const limit = Math.max(
      0,
      area.width / 2 - 4 - stickerHalfExtent(area.sticker, angle, scale)
    )
    return {
      x: Math.max(-limit, Math.min(limit, x)),
      y,
      rotate: angle,
      zIndex,
      scale,
      hoverScale: scale,
    }
  }

  // Category copy
  const headerCopy = CATEGORY_HEADER_MAP[category.id] ?? {
    title: { id: category.title.id, en: category.title.en },
    subtitle: { id: category.description.id, en: category.description.en },
  }
  const displayTitle = lang === "id" ? headerCopy.title.id : headerCopy.title.en
  const displaySubtitle =
    lang === "id" ? headerCopy.subtitle.id : headerCopy.subtitle.en

  const stageId = `tech-folder-stage-${category.id}`
  const canPreview = (event: React.PointerEvent) =>
    (event.pointerType === "mouse" || event.pointerType === "pen") &&
    event.buttons === 0 &&
    window.matchMedia("(any-hover: hover)").matches

  // Seed variation: Category 01 uses exact canonical seed 42, others offset deterministically
  const folderSeed =
    category.id === "frontend-development"
      ? 42
      : 42 + (parseInt(category.index, 10) || 1) * 7

  return (
    <article
      onPointerEnter={(event) => {
        if (canPreview(event) && !pointerInside.current) {
          pointerInside.current = true
          onInteraction("enter")
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "touch") return
        pointerInside.current = false
        updateLabel({ type: "leave" })
        if (!stage.current?.contains(document.activeElement))
          onInteraction("leave")
      }}
      onBlur={(event) => {
        if (
          !pointerInside.current &&
          !stage.current?.contains(event.relatedTarget)
        )
          onInteraction("leave")
      }}
      onKeyDown={(event) => {
        const focused = event.currentTarget.ownerDocument.activeElement
        if (
          event.key !== "Escape" ||
          event.defaultPrevented ||
          !isRevealed ||
          event.target !== focused ||
          !event.currentTarget.contains(focused)
        )
          return
        event.preventDefault()
        if (stage.current?.contains(focused))
          trigger.current?.focus({ preventScroll: true })
        onInteraction("dismiss")
      }}
      style={
        scatter.extraHeight ? { paddingTop: scatter.extraHeight } : undefined
      }
      className={cn(
        "group relative box-content flex h-98 w-full flex-col items-center justify-end select-none sm:h-102 lg:h-106",
        className
      )}
    >
      <button
        ref={trigger}
        type="button"
        aria-label={
          lang === "id"
            ? `Folder teknologi ${displayTitle}`
            : `${displayTitle} technology folder`
        }
        aria-expanded={isRevealed}
        aria-controls={stageId}
        onClick={() => onInteraction("activate")}
        className="absolute inset-0 cursor-pointer rounded-3xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      />
      {/* =========================================================
          1. PHYSICAL FOLDER CONTAINER (Enlarged Silhouette)
          ========================================================= */}
      <div
        className={cn(
          "pointer-events-none relative flex h-80 w-full max-w-90 flex-col justify-end transition-transform duration-300 motion-reduce:scale-100 motion-reduce:transition-none sm:h-86 sm:max-w-107.5 lg:h-90 lg:max-w-112.5",
          isRevealed ? "scale-[1.01]" : "scale-100"
        )}
      >
        {/* =========================================================
            1A. BACK FOLDER LAYER (Silhouette-Masked GradientMotionBackground)
            ========================================================= */}
        <div className="absolute inset-0 size-full overflow-hidden rounded-b-3xl">
          {/* Reusable SVG Definition for Folder Silhouette Clipping */}
          <svg
            className="absolute size-0 overflow-hidden"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <clipPath
                id={`folder-back-clip-${category.id}`}
                clipPathUnits="objectBoundingBox"
              >
                <path d="M 0 0.11429 C 0 0.05 0.03889 0 0.08889 0 L 0.38889 0 C 0.43889 0 0.46667 0.06429 0.51667 0.06429 L 0.91111 0.06429 C 0.96111 0.06429 1 0.11429 1 0.17857 L 1 1 L 0 1 Z" />
              </clipPath>
            </defs>
          </svg>

          {/* Masked GradientMotionBackground conforming strictly to folder silhouette */}
          <div
            className="absolute inset-0 size-full"
            style={{ clipPath: `url(#folder-back-clip-${category.id})` }}
          >
            <GradientMotionBackground
              seed={folderSeed}
              speed={28}
              blurAmount={45}
              className="size-full rounded-none motion-reduce:transition-none"
            />
          </div>

          {/* Back folder SVG contour stroke for design system border compliance */}
          <svg
            className="pointer-events-none absolute inset-0 size-full overflow-visible"
            viewBox="0 0 360 280"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 0 32 C 0 14, 14 0, 32 0 L 140 0 C 158 0, 168 18, 186 18 L 328 18 C 346 18, 360 32, 360 50 L 360 280 L 0 280 Z"
              fill="none"
              className="stroke-border/50 transition-colors duration-200 group-hover:stroke-border motion-reduce:transition-none"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        {/* =========================================================
            1B. PIXEL-ART STICKER / LOGO LAYER (Resting & Scatter)
            ========================================================= */}
        <div
          id={stageId}
          ref={stage}
          aria-hidden={!isRevealed}
          className="pointer-events-none absolute inset-x-0 bottom-32 z-10 h-66 sm:bottom-36 lg:h-70"
        >
          <div
            ref={labelSizer}
            aria-hidden="true"
            className="pointer-events-none invisible absolute inset-x-[6px] bottom-0 grid"
          >
            {category.techs.map((tech) => (
              <span
                key={tech.id}
                className="col-start-1 row-start-1 max-w-full justify-self-center sticker-tooltip text-center [overflow-wrap:anywhere]"
              >
                {tech.name}
              </span>
            ))}
          </div>
          <ul
            aria-label={displayTitle}
            className="absolute inset-x-0 bottom-0 list-none"
          >
            {category.techs.map((tech, index) => {
              const isTechHovered = activeTechId === tech.id
              const assetInfo = getTechStickerAsset(tech.id)
              const coords =
                (isRevealed ? scatter.positions[tech.id] : undefined) ??
                restingPosition(tech, index)

              return (
                <motion.li
                  key={tech.id}
                  className={cn(
                    "absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center",
                    isRevealed ? "pointer-events-auto" : "pointer-events-none"
                  )}
                  initial={false}
                  animate={{
                    x: coords.x,
                    y: coords.y,
                    rotate: coords.rotate,
                    scale: isTechHovered ? coords.hoverScale : coords.scale,
                    zIndex: isTechHovered ? 35 : coords.zIndex,
                  }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 300,
                          damping: 24,
                          mass: 0.8,
                          duration: 0.4,
                        }
                  }
                >
                  <div
                    ref={index === 0 ? firstSticker : undefined}
                    role="img"
                    aria-labelledby={`tech-name-${tech.id}`}
                    tabIndex={isRevealed ? 0 : -1}
                    className="relative flex items-center justify-center rounded-lg select-none focus-visible:shadow-[0_0_0_4px_white] focus-visible:outline-2 focus-visible:outline-[#17171a] forced-colors:focus-visible:outline-[Highlight]"
                    onPointerEnter={(event) => {
                      if (canPreview(event))
                        updateLabel({ type: "hover", id: tech.id })
                    }}
                    onPointerLeave={(event) => {
                      if (!(
                        event.relatedTarget instanceof Element &&
                        event.relatedTarget
                          .closest("[data-tech-label]")
                          ?.getAttribute("data-tech-label") === tech.id
                      )) {
                        updateLabel({ type: "leave" })
                      }
                    }}
                    onFocus={() => {
                      updateLabel({ type: "focus", id: tech.id })
                    }}
                    onBlur={() => updateLabel({ type: "blur" })}
                    onClick={(event) => {
                      event.currentTarget.focus({ preventScroll: true })
                      updateLabel({ type: "focus", id: tech.id })
                    }}
                  >
                    <div aria-hidden="true">
                      <TechItemArtwork
                        tech={tech}
                        assetInfo={assetInfo}
                        isHovered={isTechHovered}
                      />
                    </div>
                    <span id={`tech-name-${tech.id}`} className="sr-only">
                      {tech.name}
                    </span>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </div>

        {/* =========================================================
            1C. FRONT POCKET LAYER (SVG Tab Silhouette & Shadows)
            ========================================================= */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 overflow-hidden rounded-b-3xl">
          <svg
            className="h-46 w-full overflow-visible sm:h-50 lg:h-54"
            viewBox="0 0 360 180"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id={`folder-front-grad-dark-${category.id}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#2c2c34" />
                <stop offset="100%" stopColor="#1e1e23" />
              </linearGradient>
              <linearGradient
                id={`folder-front-grad-light-${category.id}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#e8e8ee" />
                <stop offset="100%" stopColor="#d8d8e2" />
              </linearGradient>
              <filter
                id={`pocket-depth-shadow-dark-${category.id}`}
                x="-5%"
                y="-10%"
                width="110%"
                height="120%"
              >
                <feDropShadow
                  dx="0"
                  dy="-4"
                  stdDeviation="5"
                  floodOpacity="0.30"
                  floodColor="#000"
                />
              </filter>
              <filter
                id={`pocket-depth-shadow-light-${category.id}`}
                x="-5%"
                y="-10%"
                width="110%"
                height="120%"
              >
                <feDropShadow
                  dx="0"
                  dy="-3"
                  stdDeviation="4"
                  floodOpacity="0.08"
                  floodColor="#000"
                />
              </filter>
            </defs>
            {/* Light Mode Front Pocket Path */}
            <path
              d="M 0 28 L 130 28 C 150 28, 160 10, 180 10 L 336 10 C 350 10, 360 20, 360 34 L 360 180 L 0 180 Z"
              fill={`url(#folder-front-grad-light-${category.id})`}
              className="stroke-border/50 transition-colors duration-200 group-hover:stroke-border motion-reduce:transition-none dark:hidden"
              style={{
                filter: `url(#pocket-depth-shadow-light-${category.id})`,
              }}
              strokeWidth="1.2"
            />
            {/* Dark Mode Front Pocket Path */}
            <path
              d="M 0 28 L 130 28 C 150 28, 160 10, 180 10 L 336 10 C 350 10, 360 20, 360 34 L 360 180 L 0 180 Z"
              fill={`url(#folder-front-grad-dark-${category.id})`}
              className="hidden stroke-border/50 transition-colors duration-200 group-hover:stroke-border motion-reduce:transition-none dark:block"
              style={{
                filter: `url(#pocket-depth-shadow-dark-${category.id})`,
              }}
              strokeWidth="1.2"
            />
          </svg>
        </div>

        {/* =========================================================
            1D. FRONT POCKET CONTENT (Minimal Typography: Title + Subtitle Only)
            ========================================================= */}
        <div className="relative z-30 flex flex-col justify-end p-6 pb-5 select-none sm:p-7 sm:pb-6 lg:p-8">
          <h3 className="font-heading text-2xl leading-tight font-bold tracking-tight text-foreground transition-colors group-hover:text-primary motion-reduce:transition-none sm:text-3xl">
            {displayTitle}
          </h3>
          <p className="mt-1 font-sans text-xs font-medium tracking-wide text-[#52525b] sm:text-sm dark:text-[#b0b0ba]">
            {displaySubtitle}
          </p>
        </div>

        {/* =========================================================
            1E. DEDICATED TOOLTIP OVERLAY (z-40: Reserved Above Each Sticker Row)
            ========================================================= */}
        {isRevealed && activeTechId && (
          <div className="pointer-events-none absolute inset-x-0 bottom-32 z-40 flex items-center justify-center sm:bottom-36">
            <div className="relative size-full">
              {category.techs.map((tech) => {
                const position = scatter.positions[tech.id]
                if (tech.id !== activeTechId || !position) return null
                const leftSpace = area.width / 2 + position.x - 6
                const rightSpace = area.width / 2 - position.x - 6

                return (
                  <motion.div
                    key={tech.id}
                    aria-hidden="true"
                    data-tech-label={tech.id}
                    className="pointer-events-none absolute z-40"
                    style={{
                      left: `calc(50% + ${position.x}px)`,
                      top: position.tooltipY,
                    }}
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
                    onPointerEnter={(event) => {
                      if (canPreview(event))
                        updateLabel({ type: "hover", id: tech.id })
                    }}
                    onPointerLeave={() => updateLabel({ type: "leave" })}
                  >
                    <span
                      className="pointer-events-auto block w-max sticker-tooltip text-center [overflow-wrap:anywhere]"
                      style={{
                        maxWidth: Math.max(1, area.width - 12),
                        translate: `clamp(${-leftSpace}px, -50%, calc(${rightSpace}px - 100%)) -100%`,
                      }}
                    >
                      {tech.name}
                    </span>
                    <span
                      className="pointer-events-auto absolute top-0 left-0 -translate-x-1/2"
                      style={{
                        width: Math.min(12, area.sticker * position.scale),
                        height: tooltipBridgeHeight(position, area.sticker),
                      }}
                    />
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

/**
 * Renders individual technology artwork (transparent pixel-art sticker or authentic transparent logo).
 * Enforces NO dark boxes, NO forced rounded squares, and pure transparent presentation.
 * Fallbacks are optically scaled to match the apparent visual presence of authentic pixel-art stickers.
 */
function TechItemArtwork({
  tech,
  assetInfo,
  isHovered,
}: {
  tech: TechItem
  assetInfo: TechStickerAssetInfo
  isHovered: boolean
}) {
  // 1. Genuine local pixel-art sticker available
  if (assetInfo.status === "PIXEL_STICKER_AVAILABLE" && assetInfo.stickerPath) {
    return (
      <Image
        src={assetInfo.stickerPath}
        alt=""
        width={96}
        height={96}
        unoptimized
        className={cn(
          "size-18 object-contain filter [image-rendering:pixelated] sm:size-20 lg:size-22",
          "drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]",
          isHovered && "drop-shadow-[0_6px_14px_rgba(0,0,0,0.5)]"
        )}
      />
    )
  }

  // 2. Normalized genuine transparent vector emblem / logo fallback
  // Scaled to full size-18 sm:size-20 lg:size-22 bounding box for visual weight parity
  return (
    <div
      className={cn(
        "relative flex size-18 items-center justify-center select-none sm:size-20 lg:size-22",
        "drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]",
        isHovered && "drop-shadow-[0_6px_14px_rgba(0,0,0,0.5)]"
      )}
    >
      {renderTransparentEmblem(tech.id)}
    </div>
  )
}

/**
 * Transparent vector emblems for technologies without a local pixel-art PNG sticker.
 * All rendered without card backgrounds or dark tiles, optically sized ~56-76px.
 */
function renderTransparentEmblem(techId: string) {
  switch (techId) {
    case "shadcn":
      return (
        <svg
          viewBox="0 0 256 256"
          className="size-15 text-foreground sm:size-17 lg:size-19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <line
            x1="208"
            y1="128"
            x2="128"
            y2="208"
            stroke="currentColor"
            strokeWidth="26"
            strokeLinecap="round"
          />
          <line
            x1="192"
            y1="40"
            x2="40"
            y2="192"
            stroke="currentColor"
            strokeWidth="26"
            strokeLinecap="round"
          />
        </svg>
      )

    case "ant-design":
      return (
        <svg
          viewBox="0 0 1024 1024"
          className="size-15 text-[#1890ff] sm:size-17 lg:size-19"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M981.6 444.6L686.4 149.4c-20.4-20.4-48-31.4-76.8-31.4H240c-60.8 0-110 49.2-110 110v568c0 60.8 49.2 110 110 110h544c60.8 0 110-49.2 110-110V521.4c0-28.8-11-56.4-31.4-76.8h19zM784 796H240c-22.2 0-40-17.8-40-40V228c0-22.2 17.8-40 40-40h369.6L824 402.4V756c0 22.2-17.8 40-40 40z" />
          <path d="M512 432c-61.9 0-112 50.1-112 112s50.1 112 112 112 112-50.1 112-112-50.1-112-112-112z" />
        </svg>
      )

    case "radix":
      return (
        <svg
          viewBox="0 0 25 25"
          className="size-14 text-foreground sm:size-16 lg:size-18"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12 25C18.6274 25 24 19.6274 24 13C24 6.37258 18.6274 1 12 1V25Z" />
          <path d="M0 13C0 6.37258 5.37258 1 12 1V25C5.37258 25 0 19.6274 0 13Z" />
          <circle cx="12" cy="13" r="5" fill="var(--background)" />
        </svg>
      )

    case "tanstack-query":
      return (
        <svg
          viewBox="0 0 24 24"
          className="size-15 text-[#ff4154] sm:size-17 lg:size-19"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="8" />
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="M4.93 4.93l2.83 2.83" />
          <path d="M16.24 16.24l2.83 2.83" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      )

    case "zustand":
      return (
        <div className="flex items-center justify-center font-mono text-3xl font-black tracking-tighter text-amber-500 sm:text-4xl lg:text-[44px]">
          <span>ZU</span>
        </div>
      )

    case "redux":
      return (
        <svg
          viewBox="0 0 24 24"
          className="size-15 text-[#764abc] sm:size-17 lg:size-19"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)" />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="4"
            transform="rotate(-30 12 12)"
          />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      )

    case "react-hook-form":
      return (
        <svg
          viewBox="0 0 24 24"
          className="size-15 text-[#ec5990] sm:size-17 lg:size-19"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 15l2 2 4-4" />
        </svg>
      )

    case "zod":
      return (
        <div className="flex items-center justify-center font-mono text-4xl font-black text-[#3068b7] sm:text-5xl lg:text-6xl">
          <span>Z</span>
        </div>
      )

    case "vitest":
      return (
        <svg
          viewBox="0 0 24 24"
          className="size-15 text-[#fcc72b] sm:size-17 lg:size-19"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2L2 19.5h8.5L12 22l1.5-2.5H22L12 2zm0 4.5l5.5 10H6.5L12 6.5z" />
        </svg>
      )

    case "jest":
      return (
        <div className="flex items-center justify-center font-mono text-xl font-black tracking-tight text-[#c21325] sm:text-2xl lg:text-3xl">
          <span>JEST</span>
        </div>
      )

    case "rtl":
      return (
        <div className="flex items-center justify-center font-mono text-xl font-black tracking-tight text-[#e33332] sm:text-2xl lg:text-3xl">
          <span>RTL</span>
        </div>
      )

    case "web-security":
      return (
        <ShieldCheck
          className="size-15 text-emerald-500 sm:size-17 lg:size-19"
          aria-hidden="true"
        />
      )

    case "blazor":
      return (
        <div className="flex items-center justify-center font-mono text-2xl font-black tracking-tighter text-[#512bd4] sm:text-3xl lg:text-4xl">
          <span>.NET</span>
        </div>
      )

    case "postman":
      return (
        <svg
          viewBox="0 0 24 24"
          className="size-15 text-[#ff6c37] sm:size-17 lg:size-19"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon
            points="22 2 15 22 11 13 2 9 22 2"
            fill="currentColor"
            fillOpacity="0.2"
          />
        </svg>
      )

    case "aws":
      return (
        <div className="flex items-center justify-center font-mono text-2xl font-black tracking-tight text-[#ff9900] sm:text-3xl lg:text-4xl">
          <span>AWS</span>
        </div>
      )

    default:
      return (
        <div className="flex items-center justify-center font-mono text-xs font-bold text-muted-foreground">
          <span>{techId}</span>
        </div>
      )
  }
}
