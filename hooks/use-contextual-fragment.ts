"use client"

import { useEffect, useEffectEvent } from "react"
import { usePathname } from "next/navigation"

const FRAGMENT_REPLACED = "portfolio:fragment-replaced"

export function replaceContextualFragment(fragment: string) {
  if (window.location.hash === fragment) return
  const url = new URL(window.location.href)
  url.hash = fragment
  // The App Router copies its own history state and synchronizes the new URL.
  window.history.replaceState(null, "", url)
  window.dispatchEvent(new Event(FRAGMENT_REPLACED))
}

export function focusContextualTarget(target: HTMLElement) {
  target.focus({ preventScroll: true })
  target.scrollIntoView({ behavior: "instant", block: "start" })
}

export function useContextualFragment(
  pathname: string,
  onFragment: (fragment: string) => void
) {
  const currentPath = usePathname()
  const readFragment = useEffectEvent(onFragment)

  useEffect(() => {
    if (currentPath !== pathname) return

    let frame = 0
    let lastFragment: string | undefined
    let restored = false

    // A history traversal can dispatch both popstate and hashchange.
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (window.location.pathname !== pathname) return
        const fragment = window.location.hash
        if (!restored && fragment === lastFragment) return
        lastFragment = fragment
        restored = false
        readFragment(fragment)
      })
    }
    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return
      restored = true
      schedule()
    }
    const handleReplace = () => {
      cancelAnimationFrame(frame)
      lastFragment = window.location.hash
      restored = false
    }

    schedule()
    window.addEventListener("popstate", schedule)
    window.addEventListener("hashchange", schedule)
    window.addEventListener("pageshow", handlePageShow)
    window.addEventListener(FRAGMENT_REPLACED, handleReplace)
    // App Router commits its fragment with the History API, which does not fire hashchange.
    const navigation =
      "navigation" in window && window.navigation instanceof EventTarget
        ? window.navigation
        : undefined
    navigation?.addEventListener("currententrychange", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("popstate", schedule)
      window.removeEventListener("hashchange", schedule)
      window.removeEventListener("pageshow", handlePageShow)
      window.removeEventListener(FRAGMENT_REPLACED, handleReplace)
      navigation?.removeEventListener("currententrychange", schedule)
    }
  }, [currentPath, pathname])
}
