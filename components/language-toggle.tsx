"use client"

import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-muted/60 p-0.5 text-xs font-medium",
        className
      )}
      role="group"
      aria-label="Language switch"
    >
      {(["id", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLang(option)}
          aria-pressed={lang === option}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase transition-colors",
            lang === option
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export { LanguageToggle }
