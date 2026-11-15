"use client"

import * as React from "react"
import { motion, type Transition } from "framer-motion"

import {
  StickerVector,
  getStickerMetadata,
  DIE_CUT_FILTER_STYLE,
  NATURAL_STICKER_FILTER_STYLE,
} from "@/components/contact/sticker-vectors"
import { ui } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"

export interface InteractiveStickerProps {
  id: string
  x: number
  y: number
  rotate: number
  zIndex: number
  dragConstraints: React.RefObject<HTMLDivElement | null>
  shouldReduceMotion?: boolean
  animationDelay?: number
  onDragStart?: (id: string) => void
  onDragEnd?: (
    id: string,
    newPos: { x: number; y: number; rotate: number }
  ) => void
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function InteractiveSticker({
  id,
  x,
  y,
  rotate,
  zIndex,
  dragConstraints,
  shouldReduceMotion = false,
  animationDelay = 0,
  onDragStart,
  onDragEnd,
}: InteractiveStickerProps) {
  const meta = getStickerMetadata(id)
  const popoverData = ui.stickerPopovers[id as keyof typeof ui.stickerPopovers]
  const translatedPopover = useT(popoverData)
  const popoverText = translatedPopover || meta?.name || id

  const [isHovered, setIsHovered] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragTilt, setDragTilt] = React.useState(0)

  const dragStartPos = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const hasDraggedRef = React.useRef(false)
  const dragTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  )

  React.useEffect(() => {
    return () => {
      if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current)
    }
  }, [])

  React.useEffect(() => {
    if (!isHovered && !isFocused) return
    const handleGlobalPointerDown = () => {
      setIsHovered(false)
      setIsFocused(false)
    }
    window.addEventListener("pointerdown", handleGlobalPointerDown)
    return () => {
      window.removeEventListener("pointerdown", handleGlobalPointerDown)
    }
  }, [isHovered, isFocused])

  const springTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : {
        type: "spring",
        stiffness: 320,
        damping: 25,
        delay: animationDelay,
      }

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY }
    hasDraggedRef.current = false
    setIsFocused(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsFocused(false)
  }

  const handleFocus = (e: React.FocusEvent) => {
    try {
      if ((e.target as HTMLElement).matches(":focus-visible")) {
        setIsFocused(true)
      }
    } catch {}
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsFocused(false)
      setIsHovered(false)
    }
  }

  const handleDragStart = () => {
    setIsDragging(true)
    setIsHovered(false)
    setIsFocused(false)
    onDragStart?.(id)
  }

  const handleDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { point: { x: number; y: number } }
  ) => {
    const deltaX = info.point.x - dragStartPos.current.x
    const deltaY = info.point.y - dragStartPos.current.y
    const distance = Math.hypot(deltaX, deltaY)

    if (distance > 5) {
      hasDraggedRef.current = true
      if (!shouldReduceMotion) {
        const nextTilt = Math.round(clamp(deltaX * 0.22, -8, 8) * 2) / 2
        setDragTilt((prev) => (prev !== nextTilt ? nextTilt : prev))
      }
    }
  }

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { point: { x: number; y: number }; offset: { x: number; y: number } }
  ) => {
    setIsDragging(false)
    setDragTilt(0)

    const finalX = x + info.offset.x
    const finalY = y + info.offset.y
    onDragEnd?.(id, { x: finalX, y: finalY, rotate })

    if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current)
    dragTimeoutRef.current = setTimeout(() => {
      hasDraggedRef.current = false
    }, 80)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    setIsFocused(false)
    setIsHovered(false)
    ;(e.currentTarget as HTMLElement)?.blur?.()
  }

  const showTooltip = (isHovered || isFocused) && !isDragging
  const tooltipId = `sticker-tooltip-${id}`
  const totalRotate = rotate + dragTilt

  const commonProps = {
    "data-sticker-id": id,
    drag: true,
    dragConstraints,
    dragElastic: 0.12,
    dragMomentum: true,
    dragTransition: {
      power: 0.18,
      timeConstant: 180,
      bounceStiffness: 380,
      bounceDamping: 26,
    },
    onPointerDown: handlePointerDown,
    onDragStart: handleDragStart,
    onDrag: handleDrag,
    onDragEnd: handleDragEnd,
    onHoverStart: handleMouseEnter,
    onHoverEnd: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onPointerLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    onClick: handleClick,
    animate: {
      x,
      y,
      rotate: totalRotate,
      scale: isDragging ? 1.08 : 1,
    },
    transition: springTransition,
    whileHover: shouldReduceMotion
      ? undefined
      : {
          scale: 1.06,
          y: y - 4,
          transition: { duration: 0.15 },
        },
    whileTap: shouldReduceMotion ? undefined : { scale: 0.96 },
    className:
      "group/sticker absolute touch-pan-y select-none cursor-grab active:cursor-grabbing outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 rounded-xl size-11 sm:size-13 lg:size-15",
    style: {
      zIndex: isDragging ? 60 : zIndex,
    },
    "aria-label": popoverText || meta?.name || id,
    "aria-describedby": showTooltip ? tooltipId : undefined,
  }

  const isNaturalSticker = id !== "hi" && id !== "heart" && id !== "bolt"

  const stickerContent = (
    <div
      className="flex size-full items-center justify-center"
      style={{
        filter: isNaturalSticker
          ? NATURAL_STICKER_FILTER_STYLE
          : DIE_CUT_FILTER_STYLE,
        contain: "paint layout",
        transform: "translateZ(0)",
      }}
    >
      <StickerVector id={id} className="size-full object-contain" />
    </div>
  )

  const isNearTop = y < 70
  const tooltipPositionClass = isNearTop ? "top-full mt-2" : "-top-8"

  const tooltipElement =
    showTooltip && popoverText ? (
      <div
        id={tooltipId}
        role="tooltip"
        className={`pointer-events-none absolute ${tooltipPositionClass} left-1/2 z-50 -translate-x-1/2 rounded-full border border-background/20 bg-foreground px-2 py-0.5 font-mono text-[10px] font-medium whitespace-nowrap text-background shadow-md transition-opacity duration-150 sm:text-[11px]`}
      >
        {popoverText}
      </div>
    ) : null

  if (meta?.type === "link" && meta.href) {
    const isExternal =
      meta.href.startsWith("http://") || meta.href.startsWith("https://")

    return (
      <motion.a
        {...commonProps}
        href={meta.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        download={meta.download ? true : undefined}
        onClick={handleClick}
      >
        {tooltipElement}
        {stickerContent}
      </motion.a>
    )
  }

  return (
    <motion.div
      {...commonProps}
      role={meta?.type === "avatar" ? "figure" : "img"}
      tabIndex={0}
    >
      {tooltipElement}
      {stickerContent}
    </motion.div>
  )
}
