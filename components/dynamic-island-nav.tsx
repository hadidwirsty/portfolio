"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Transition,
} from "framer-motion"
import {
  Home,
  User,
  FolderGit2,
  Mail,
  Layers,
  MoreHorizontal,
  X,
} from "lucide-react"

import { nav, subpages } from "@/lib/cv-data"
import { useT } from "@/lib/language-context"

const ALLOWED_PATHS = ["/about", "/contact", "/portfolio", "/stack"]

const SMOOTH_SPRING: Transition = {
  type: "spring",
  stiffness: 350,
  damping: 28,
  mass: 0.7,
}

const REDUCED_TRANSITION: Transition = {
  duration: 0.1,
}

export function DynamicIslandNav() {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion() ?? false
  const activeTransition = shouldReduceMotion
    ? REDUCED_TRANSITION
    : SMOOTH_SPRING

  const homeLabel = useT(nav.home)
  const aboutLabel = useT(subpages.about.title)
  const portfolioLabel = useT(subpages.portfolio.title)
  const contactLabel = useT(subpages.contact.title)
  const stackLabel = useT(subpages.stack.title)

  const [isScrollCompact, setIsScrollCompact] = React.useState(false)
  const [isDesktopHovered, setIsDesktopHovered] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [hoveredItemKey, setHoveredItemKey] = React.useState<string | null>(
    null
  )
  const [isFooterVisible, setIsFooterVisible] = React.useState(false)

  const lastScrollY = React.useRef(0)
  const scrollRaf = React.useRef<number | null>(null)
  const navRef = React.useRef<HTMLElement>(null)

  const isAllowed = React.useMemo(() => {
    if (!pathname) return false
    return ALLOWED_PATHS.some(
      (path) => pathname === path || pathname.startsWith(path + "/")
    )
  }, [pathname])

  const navItems = React.useMemo(
    () => [
      { key: "home", href: "/", label: homeLabel, icon: Home },
      { key: "about", href: "/about", label: aboutLabel, icon: User },
      {
        key: "portfolio",
        href: "/portfolio",
        label: portfolioLabel,
        icon: FolderGit2,
      },
      { key: "contact", href: "/contact", label: contactLabel, icon: Mail },
      { key: "stack", href: "/stack", label: stackLabel, icon: Layers },
    ],
    [homeLabel, aboutLabel, portfolioLabel, contactLabel, stackLabel]
  )

  const isCurrentRoute = React.useCallback(
    (href: string) => {
      if (!pathname) return false
      if (href === "/") return pathname === "/"
      return pathname === href || pathname.startsWith(href + "/")
    },
    [pathname]
  )

  const activeItem = React.useMemo(() => {
    return navItems.find((item) => isCurrentRoute(item.href)) || navItems[0]
  }, [navItems, isCurrentRoute])

  React.useEffect(() => {
    if (!isAllowed) return

    const handleScroll = () => {
      if (scrollRaf.current !== null) return
      scrollRaf.current = window.requestAnimationFrame(() => {
        const currentY = window.scrollY || window.pageYOffset || 0
        const delta = currentY - lastScrollY.current

        if (currentY > 90) {
          if (delta > 8) {
            setIsScrollCompact(true)
            setIsMobileMenuOpen(false)
          } else if (delta < -8) {
            setIsScrollCompact(false)
          }
        } else {
          setIsScrollCompact(false)
        }

        lastScrollY.current = currentY
        scrollRaf.current = null
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollRaf.current !== null) {
        window.cancelAnimationFrame(scrollRaf.current)
      }
    }
  }, [isAllowed])

  React.useEffect(() => {
    if (!isAllowed) return

    const checkFooter = () => {
      const footer = document.querySelector('footer[role="contentinfo"]')
      if (!footer) return null

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          setIsFooterVisible(Boolean(entry?.isIntersecting))
        },
        {
          root: null,
          threshold: 0.05,
          rootMargin: "0px",
        }
      )

      observer.observe(footer)
      return observer
    }

    let observer = checkFooter()
    const timer = setTimeout(() => {
      if (!observer) observer = checkFooter()
    }, 150)

    return () => {
      clearTimeout(timer)
      if (observer) observer.disconnect()
    }
  }, [isAllowed, pathname])

  const [prevPathname, setPrevPathname] = React.useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setIsMobileMenuOpen(false)
    setIsDesktopHovered(false)
    setHoveredItemKey(null)
  }

  if (!isAllowed) return null

  const isDesktopExpanded = !isScrollCompact || isDesktopHovered
  const ActiveIcon = activeItem.icon

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs sm:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.nav
        role="navigation"
        aria-label="Dynamic Island Navigation Mobile"
        initial={{ opacity: 0, y: -24, scale: 0.94 }}
        animate={{
          opacity: isFooterVisible ? 0 : 1,
          y: isFooterVisible ? -32 : 0,
          scale: isFooterVisible ? 0.92 : 1,
          pointerEvents: isFooterVisible ? "none" : "auto",
        }}
        transition={activeTransition}
        className="fixed top-3 left-1/2 z-50 -translate-x-1/2 font-sans select-none sm:hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          {!isMobileMenuOpen ? (
            <motion.div
              key="mobile-capsule"
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={activeTransition}
              className="relative flex items-center gap-1.5 rounded-full bg-neutral-950/95 p-1.5 text-neutral-300 shadow-2xl shadow-black/60 backdrop-blur-md dark:bg-card/95 dark:text-neutral-200 dark:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.7)]"
            >
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-neutral-800/90 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-tight text-white shadow-xs transition-colors hover:bg-neutral-700/90 active:scale-95 dark:bg-neutral-700/80 dark:hover:bg-neutral-600/80"
              >
                <ActiveIcon className="size-4 shrink-0 text-white" />
                <span>{activeItem.label}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Buka menu navigasi"
                title="Buka menu navigasi"
                className="inline-flex size-7 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/10 hover:text-white active:scale-95 dark:text-neutral-400 dark:hover:text-white"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="size-3.5"
                  aria-hidden="true"
                >
                  <line x1="3" y1="5.5" x2="13" y2="5.5" />
                  <line x1="3" y1="10.5" x2="13" y2="10.5" />
                </svg>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="mobile-expanded-card"
              layout
              initial={{ opacity: 0, scale: 0.94, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -6 }}
              transition={activeTransition}
              className="w-[calc(100vw-1.5rem)] max-w-sm rounded-3xl bg-neutral-950/98 p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl dark:bg-card/95 dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center justify-end pb-2.5">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Tutup navigasi"
                  title="Tutup navigasi"
                  className="inline-flex size-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/10 hover:text-white active:scale-95 dark:text-neutral-400 dark:hover:text-white"
                >
                  <X className="size-4.5" />
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const isActive = isCurrentRoute(item.href)
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3.5 rounded-2xl px-4 py-3 font-mono text-sm transition-colors ${
                        isActive
                          ? "bg-neutral-800 font-semibold text-white shadow-xs dark:bg-neutral-700/80"
                          : "text-neutral-400 hover:bg-white/5 hover:text-white dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
                      }`}
                    >
                      <Icon className="size-4.5 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <motion.nav
        ref={navRef}
        role="navigation"
        aria-label="Dynamic Island Navigation"
        initial={{ opacity: 0, y: -24, scale: 0.94 }}
        animate={{
          opacity: isFooterVisible ? 0 : 1,
          y: isFooterVisible ? -32 : 0,
          scale: isFooterVisible ? 0.92 : 1,
          pointerEvents: isFooterVisible ? "none" : "auto",
        }}
        transition={activeTransition}
        onMouseEnter={() => setIsDesktopHovered(true)}
        onMouseLeave={() => {
          setIsDesktopHovered(false)
          setHoveredItemKey(null)
        }}
        className="fixed top-3 left-1/2 z-50 hidden -translate-x-1/2 font-sans select-none sm:top-3.5 sm:flex md:top-4"
      >
        <motion.div
          layout
          transition={activeTransition}
          className="relative flex items-center justify-center rounded-full bg-neutral-950/95 p-2 text-neutral-300 shadow-2xl shadow-black/50 backdrop-blur-md transition-colors duration-200 sm:h-13 sm:p-2 dark:bg-card/90 dark:text-neutral-200 dark:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.7)]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {isDesktopExpanded ? (
              <motion.div
                key="desktop-expanded"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={activeTransition}
                className="flex items-center gap-1 sm:gap-1.5"
              >
                {navItems.map((item) => {
                  const isActive = isCurrentRoute(item.href)
                  const isHovered = hoveredItemKey === item.key
                  const showLabel =
                    hoveredItemKey !== null ? isHovered : isActive
                  const isHighlighted =
                    hoveredItemKey !== null ? isHovered : isActive

                  const Icon = item.icon

                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      title={item.label}
                      onMouseEnter={() => setHoveredItemKey(item.key)}
                      onMouseLeave={() => setHoveredItemKey(null)}
                      className={`relative inline-flex h-9 items-center justify-center rounded-full font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none sm:h-10 ${
                        showLabel
                          ? "px-3.5 text-xs font-semibold text-white sm:px-4 sm:text-[13px]"
                          : "size-9 text-neutral-400 hover:text-neutral-200 sm:size-10 dark:text-neutral-400 dark:hover:text-white"
                      }`}
                    >
                      {isHighlighted && (
                        <motion.span
                          layoutId="desktop-active-indicator"
                          transition={activeTransition}
                          className="absolute inset-0 -z-10 rounded-full bg-neutral-800 shadow-xs dark:bg-neutral-700/80"
                        />
                      )}

                      <Icon className="size-4.5 shrink-0 sm:size-5" />

                      <AnimatePresence initial={false}>
                        {showLabel && (
                          <motion.span
                            initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                            animate={{
                              width: "auto",
                              opacity: 1,
                              marginLeft: 8,
                            }}
                            exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                            transition={activeTransition}
                            className="overflow-hidden font-mono tracking-tight whitespace-nowrap"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {!showLabel && (
                        <span className="sr-only">{item.label}</span>
                      )}
                    </Link>
                  )
                })}
              </motion.div>
            ) : (
              <motion.div
                key="desktop-compact"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={activeTransition}
                className="flex items-center gap-1"
              >
                <Link
                  href={activeItem.href}
                  aria-current="page"
                  title={activeItem.label}
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-neutral-800/90 px-3.5 font-mono text-xs font-semibold tracking-tight text-white shadow-xs transition-colors hover:bg-neutral-700/90 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none active:scale-95 sm:h-10 sm:px-4 sm:text-[13px] dark:bg-neutral-700/80 dark:hover:bg-neutral-600/80"
                >
                  <ActiveIcon className="size-4.5 shrink-0 text-white sm:size-5" />
                  <span>{activeItem.label}</span>
                </Link>

                <div
                  aria-label="Arahkan kursor untuk membuka navigasi lengkap"
                  title="Arahkan kursor untuk melihat menu"
                  className="inline-flex size-9 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/10 hover:text-white sm:size-10 dark:text-neutral-400 dark:hover:text-white"
                >
                  <MoreHorizontal className="size-4.5 sm:size-5" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>
    </>
  )
}
