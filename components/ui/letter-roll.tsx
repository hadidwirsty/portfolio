"use client"

import * as React from "react"
import { useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

const GAP = "0.45em"
const BLEED_Y = "0.12em"
const BLEED_X = "0.08em"

const srOnly: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
}

function findHoverTarget(
  root: HTMLElement,
  mode: "self" | "parent"
): HTMLElement {
  if (mode === "self") return root
  const container = root.parentElement
  if (!container) return root
  const clickable = container.closest("a, button") as HTMLElement | null
  if (clickable) return clickable
  const frame = /-container\b/.test(String(container.className))
    ? (container.parentElement as HTMLElement | null)
    : container
  return frame || root
}

export interface LetterRollProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string
  color?: string
  hoverColor?: string
  direction?: "up" | "down"
  stagger?: number
  duration?: number
  easing?: string
  hoverTarget?: "self" | "parent"
  link?: string
  newTab?: boolean
  className?: string
  style?: React.CSSProperties
  isRolled?: boolean
}

export function LetterRoll({
  text = "Rolling Text",
  color,
  hoverColor,
  direction = "up",
  stagger = 0.8,
  duration = 0.4,
  easing = "cubic-bezier(0.16, 1, 0.3, 1)",
  hoverTarget = "self",
  link,
  newTab = false,
  className,
  style,
  isRolled,
  ...rest
}: LetterRollProps) {
  const rootRef = React.useRef<HTMLElement | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const controlled = typeof isRolled === "boolean"
  const [ready, setReady] = React.useState(false)
  const [hovered, setHovered] = React.useState(false)

  // Mode terkontrol: flush layout dan aktifkan via requestAnimationFrame
  React.useEffect(() => {
    if (!controlled) return
    rootRef.current?.getBoundingClientRect()
    const rafId = requestAnimationFrame(() => {
      setReady(true)
    })
    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [controlled, isRolled])

  // Mode uncontrolled: hover dan focus event listeners dengan safety nets
  React.useEffect(() => {
    if (controlled) return
    const root = rootRef.current
    if (!root) return

    const target = findHoverTarget(root, hoverTarget)
    let pointerIn = false
    let focusIn = false
    let safetyAttached = false

    const sync = () => {
      setHovered(pointerIn || focusIn)
    }

    const releasePointer = () => {
      if (!pointerIn) return
      pointerIn = false
      detachSafety()
      sync()
    }

    const onDocPointerMove = (e: PointerEvent) => {
      if (!target.contains(e.target as Node)) {
        releasePointer()
      }
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        releasePointer()
      }
    }

    const onDocPointerLeave = (e: PointerEvent) => {
      if (!e.relatedTarget || e.relatedTarget === document.documentElement) {
        releasePointer()
      }
    }

    const onWindowBlur = () => {
      releasePointer()
    }

    const attachSafety = () => {
      if (safetyAttached) return
      safetyAttached = true
      document.addEventListener("pointermove", onDocPointerMove)
      document.addEventListener("visibilitychange", onVisibilityChange)
      document.documentElement.addEventListener(
        "pointerleave",
        onDocPointerLeave
      )
      window.addEventListener("blur", onWindowBlur)
    }

    const detachSafety = () => {
      if (!safetyAttached) return
      safetyAttached = false
      document.removeEventListener("pointermove", onDocPointerMove)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      document.documentElement.removeEventListener(
        "pointerleave",
        onDocPointerLeave
      )
      window.removeEventListener("blur", onWindowBlur)
    }

    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch") return
      pointerIn = true
      attachSafety()
      sync()
    }

    const onPointerLeave = () => {
      releasePointer()
    }

    const onPointerCancel = () => {
      releasePointer()
    }

    const onFocusIn = (e: FocusEvent) => {
      try {
        if ((e.target as HTMLElement)?.matches(":focus-visible")) {
          focusIn = true
          sync()
        }
      } catch {
        // Fallback untuk browser yang tidak mendukung selector matches
      }
    }

    const onFocusOut = () => {
      focusIn = false
      sync()
    }

    target.addEventListener("pointerenter", onPointerEnter)
    target.addEventListener("pointerleave", onPointerLeave)
    target.addEventListener("pointercancel", onPointerCancel)
    target.addEventListener("focusin", onFocusIn)
    target.addEventListener("focusout", onFocusOut)

    return () => {
      detachSafety()
      target.removeEventListener("pointerenter", onPointerEnter)
      target.removeEventListener("pointerleave", onPointerLeave)
      target.removeEventListener("pointercancel", onPointerCancel)
      target.removeEventListener("focusin", onFocusIn)
      target.removeEventListener("focusout", onFocusOut)
    }
  }, [controlled, hoverTarget])

  const rolled = controlled ? Boolean(ready && isRolled) : hovered

  // Parsing kata dan menghitung indeks global huruf
  const { words, totalLetters } = React.useMemo(() => {
    const rawWords = text.split(/(\s+)/).filter((w) => w.length > 0)
    let count = 0
    const parsed = rawWords.map((word) => {
      const isSpace = /^\s+$/.test(word)
      if (isSpace) {
        return { isSpace: true, word, letters: [] }
      }
      const letters = Array.from(word).map((char) => {
        const index = count++
        return { char, index }
      })
      return { isSpace: false, word, letters }
    })
    return { words: parsed, totalLetters: count }
  }, [text])

  const autoWidth = !(style && style.width === "100%")

  const columnStyle: React.CSSProperties = {
    display: "inline-block",
    verticalAlign: "top",
    overflow: "hidden",
    padding: `${BLEED_Y} ${BLEED_X}`,
    margin: `-${BLEED_Y} -${BLEED_X}`,
  }

  const letterStyle: React.CSSProperties = {
    display: "block",
    whiteSpace: "pre",
  }

  const copyStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: direction === "down" ? `calc(-100% - ${GAP})` : `calc(100% + ${GAP})`,
    display: "block",
    whiteSpace: "pre",
    color: hoverColor || "inherit",
  }

  const transformValue =
    direction === "up"
      ? rolled
        ? `translateY(calc(-100% - ${GAP}))`
        : "translateY(0)"
      : rolled
        ? `translateY(calc(100% + ${GAP}))`
        : "translateY(0)"

  const RootTag = link ? "a" : "span"
  const linkProps = link
    ? {
        href: link,
        target: newTab ? "_blank" : undefined,
        rel: newTab ? "noopener noreferrer" : undefined,
        "aria-label": text,
      }
    : {}

  return (
    <RootTag
      ref={rootRef as React.Ref<HTMLAnchorElement & HTMLSpanElement>}
      {...linkProps}
      {...rest}
      className={cn(
        "relative block no-underline select-none",
        link && "cursor-pointer",
        className
      )}
      style={{
        ...style,
        position: "relative",
        display: "block",
        margin: 0,
        color: color || "inherit",
        whiteSpace: autoWidth ? "nowrap" : "normal",
        width: autoWidth ? "max-content" : style?.width,
      }}
    >
      <span style={srOnly}>{text}</span>
      <span aria-hidden="true" style={{ display: "block", userSelect: "none" }}>
        {words.map((item, wi) =>
          item.isSpace ? (
            <span key={wi}>{item.word}</span>
          ) : (
            <span key={wi} style={{ whiteSpace: "nowrap" }}>
              {item.letters.map((letter) => {
                const delay =
                  (duration / Math.max(totalLetters, 1)) *
                  letter.index *
                  stagger
                const innerStyle: React.CSSProperties = {
                  display: "block",
                  position: "relative",
                  willChange: "transform",
                  transform: transformValue,
                  transition: shouldReduceMotion
                    ? "none"
                    : `transform ${duration}s ${easing} ${delay}s`,
                }

                return (
                  <span key={letter.index} style={columnStyle}>
                    <span style={innerStyle}>
                      <span style={letterStyle}>{letter.char}</span>
                      <span style={copyStyle}>{letter.char}</span>
                    </span>
                  </span>
                )
              })}
            </span>
          )
        )}
      </span>
    </RootTag>
  )
}

export default LetterRoll
