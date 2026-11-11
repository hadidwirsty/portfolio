"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { changeTheme } from "@/lib/theme-transition"
import { Switch } from "@/components/ui/switch"

const emptySubscribe = () => () => {}

function useMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

interface ThemeSwitchProps {
  className?: string
}

export function ThemeSwitch({ className }: ThemeSwitchProps) {
  const mounted = useMounted()
  const { resolvedTheme, setTheme } = useTheme()
  const [pending, setPending] = React.useState<{
    from?: string
    value: boolean
  } | null>(null)

  if (!mounted) {
    return (
      <div
        className="h-3.5 w-6 rounded-full bg-input/80 sm:h-3.5 sm:w-6"
        aria-hidden="true"
      />
    )
  }

  const checked =
    pending && pending.from === resolvedTheme
      ? pending.value
      : resolvedTheme === "dark"

  return (
    <Switch
      checked={checked}
      onCheckedChange={(next) => {
        setPending({ from: resolvedTheme, value: next })
        changeTheme(next ? "dark" : "light", setTheme)
      }}
      size="sm"
      aria-label="Toggle tema tampilan (Gelap / Terang)"
      title="Toggle tema tampilan"
      className={className || "cursor-pointer"}
    />
  )
}
