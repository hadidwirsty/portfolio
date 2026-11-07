"use client"

import * as React from "react"

export interface SectionOffset {
  id: string
  offsetTop: number
}

/**
 * Pure helper function to determine the currently active section given
 * the list of section offsets and the current scroll position.
 */
export function findActiveSection(
  sections: SectionOffset[],
  scrollY: number,
  offset = 120
): string {
  if (!sections.length) return ""

  // Sort sections by offsetTop ascending
  const sorted = [...sections].sort((a, b) => a.offsetTop - b.offsetTop)

  let activeId = sorted[0].id

  for (const section of sorted) {
    if (scrollY + offset >= section.offsetTop) {
      activeId = section.id
    } else {
      break
    }
  }

  return activeId
}

export interface UseScrollSpyOptions {
  offset?: number
  defaultActive?: string
}

/**
 * React hook to observe scroll position and return the currently active section ID.
 */
export function useScrollSpy(
  sectionIds: readonly string[],
  options: UseScrollSpyOptions = {}
): string {
  const { offset = 120, defaultActive = sectionIds[0] ?? "" } = options
  const [activeSection, setActiveSection] =
    React.useState<string>(defaultActive)

  React.useEffect(() => {
    if (typeof window === "undefined" || !sectionIds.length) return

    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId !== null) return

      rafId = window.requestAnimationFrame(() => {
        rafId = null
        const scrollY = window.scrollY

        const sections: SectionOffset[] = []
        for (const id of sectionIds) {
          const el = document.getElementById(id)
          if (el) {
            sections.push({
              id,
              offsetTop: el.offsetTop,
            })
          }
        }

        if (sections.length > 0) {
          const active = findActiveSection(sections, scrollY, offset)
          setActiveSection((prev) => (prev !== active ? active : prev))
        }
      })
    }

    // Run once on mount to set initial state
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [sectionIds, offset])

  return activeSection
}
