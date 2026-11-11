import { flushSync } from "react-dom"

/**
 * Mengganti tema (light / dark) dengan transisi mulus via CSS View Transitions API.
 * Menyuntikkan class `theme-switching` pada <html> untuk menonaktifkan transisi elemen lain
 * sementara Switch thumb tetap meluncur bebas tanpa tersendat.
 */
export function changeTheme(
  next: "light" | "dark",
  setTheme: (t: string) => void
) {
  if (typeof window === "undefined") return

  const root = document.documentElement
  root.classList.add("theme-switching")

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches

  const supportsViewTransition =
    typeof document.startViewTransition === "function"

  if (!prefersReducedMotion && supportsViewTransition) {
    try {
      const transition = document.startViewTransition(() => {
        // Terapkan class `dark` secara manual sebelum snapshot new view transition diambil,
        // karena effect next-themes berjalan asinkron setelah render.
        if (next === "dark") {
          root.classList.add("dark")
        } else {
          root.classList.remove("dark")
        }
        flushSync(() => {
          setTheme(next)
        })
      })

      transition.finished.finally(() => {
        root.classList.remove("theme-switching")
      })
      return
    } catch {
      // Fallback jika pemanggilan startViewTransition gagal
    }
  }

  // Fallback untuk browser yang tidak mendukung View Transitions atau preferensi reduced motion
  if (next === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
  setTheme(next)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.remove("theme-switching")
    })
  })
}
