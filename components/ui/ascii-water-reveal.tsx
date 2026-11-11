"use client"

import * as React from "react"
import { useTheme } from "next-themes"

interface AsciiWaterRevealProps {
  fontSize?: number
  density?: number
  damping?: number
  velocity?: number
  maxOpacity?: number
  className?: string
}

const CHARS = ["·", ".", "-", "~", "=", "+", "x", "*", "o"]
const CHARS_LEN = CHARS.length - 1

export function AsciiWaterReveal({
  fontSize = 12,
  density = 1,
  damping = 0.96,
  velocity = 0.48,
  maxOpacity = 0.28,
  className,
}: AsciiWaterRevealProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  React.useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    let isSleeping = false
    let idleFrames = 0

    const colSpacing = (fontSize * 0.85) / density
    const rowSpacing = (fontSize * 1.15) / density

    let buffer1 = new Float32Array(0)
    let buffer2 = new Float32Array(0)

    const isDark = resolvedTheme !== "light"
    const rgb = isDark ? "255, 255, 255" : "30, 30, 35"
    const alphaSteps = 14
    const colorPalette = Array.from({ length: alphaSteps + 1 }, (_, i) => {
      const alpha = ((i / alphaSteps) * maxOpacity).toFixed(3)
      return `rgba(${rgb}, ${alpha})`
    })

    function wakeUp() {
      idleFrames = 0
      if (isSleeping) {
        isSleeping = false
        render()
      }
    }

    function initBuffers() {
      if (!container || !canvas) return
      const rect = container.getBoundingClientRect()
      width = canvas.width = rect.width
      height = canvas.height = rect.height
      cols = Math.ceil(width / colSpacing) + 2
      rows = Math.ceil(height / rowSpacing) + 2
      const size = cols * rows
      buffer1 = new Float32Array(size)
      buffer2 = new Float32Array(size)
      wakeUp()
    }

    const resizeObserver = new ResizeObserver(() => initBuffers())
    resizeObserver.observe(container)
    initBuffers()

    const mouse = {
      x: -1,
      y: -1,
      prevX: -1,
      prevY: -1,
      isDown: false,
    }

    function drop(x: number, y: number, radius: number, strength: number) {
      const gridX = Math.floor(x / colSpacing)
      const gridY = Math.floor(y / rowSpacing)

      for (let r = -radius; r <= radius; r++) {
        for (let c = -radius; c <= radius; c++) {
          const nx = gridX + c
          const ny = gridY + r
          if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1) {
            const dist = c * c + r * r
            const radSq = radius * radius
            if (dist < radSq) {
              const index = ny * cols + nx
              buffer1[index] += strength * (1 - dist / radSq)
            }
          }
        }
      }
      wakeUp()
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top

      if (mouse.prevX === -1) {
        mouse.prevX = mouse.x
        mouse.prevY = mouse.y
      }

      const dx = mouse.x - mouse.prevX
      const dy = mouse.y - mouse.prevY
      const speedSq = dx * dx + dy * dy

      if (speedSq > 2) {
        const speed = Math.sqrt(speedSq)
        const steps = Math.min(Math.floor(speed / 6), 8)
        const strength = Math.min(speed * 0.12, 3.5) * (mouse.isDown ? 1.8 : 1)
        const radius = mouse.isDown ? 3 : 2
        for (let i = 0; i <= steps; i++) {
          const t = steps === 0 ? 0 : i / steps
          drop(mouse.prevX + dx * t, mouse.prevY + dy * t, radius, strength)
        }
      }

      mouse.prevX = mouse.x
      mouse.prevY = mouse.y
    }

    const handlePointerDown = () => {
      mouse.isDown = true
      if (mouse.x !== -1) drop(mouse.x, mouse.y, 5, 7)
    }

    const handlePointerUp = () => {
      mouse.isDown = false
    }

    const handlePointerLeave = () => {
      mouse.prevX = -1
      mouse.prevY = -1
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerdown", handlePointerDown, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    container.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    })

    function render() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      ctx.font = `${fontSize}px monospace`
      ctx.textBaseline = "middle"
      ctx.textAlign = "center"

      let activeCells = 0

      for (let y = 1; y < rows - 1; y++) {
        const rowOffset = y * cols
        for (let x = 1; x < cols - 1; x++) {
          const i = rowOffset + x
          buffer2[i] =
            (buffer1[i - 1] +
              buffer1[i + 1] +
              buffer1[i - cols] +
              buffer1[i + cols]) *
              velocity -
            buffer2[i]
          buffer2[i] *= damping
        }
      }

      const temp = buffer1
      buffer1 = buffer2
      buffer2 = temp
      for (let y = 1; y < rows - 1; y++) {
        const rowOffset = y * cols
        const posY = y * rowSpacing
        for (let x = 1; x < cols - 1; x++) {
          const i = rowOffset + x
          const intensity = Math.abs(buffer1[i])
          if (intensity > 0.008) {
            activeCells++
            const posX = x * colSpacing
            const charIndex = Math.min((intensity * 2.2) | 0, CHARS_LEN)
            const colorIndex = Math.min((intensity * 6) | 0, alphaSteps)
            ctx.fillStyle = colorPalette[colorIndex]
            ctx.fillText(CHARS[charIndex], posX, posY)
          }
        }
      }

      if (activeCells === 0 && !mouse.isDown) {
        idleFrames++
        if (idleFrames > 30) {
          isSleeping = true
          return
        }
      } else {
        idleFrames = 0
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerdown", handlePointerDown)
      window.removeEventListener("pointerup", handlePointerUp)
      container.removeEventListener("pointerleave", handlePointerLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [fontSize, damping, maxOpacity, density, velocity, resolvedTheme])

  return (
    <div
      ref={containerRef}
      className={
        className ||
        "pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden select-none"
      }
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none block h-full w-full"
      />
    </div>
  )
}
