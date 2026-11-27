import type { ComponentProps } from "react"

import { LetterRoll } from "@/components/ui/letter-roll"
import { cn } from "@/lib/utils"

interface FilterPillProps extends ComponentProps<"button"> {
  children: string
  count?: number
  truncateLabel?: boolean
}

export function FilterPill({
  children,
  className,
  count,
  truncateLabel,
  ...props
}: FilterPillProps) {
  const selected = props["aria-selected"]
  const pressed = props["aria-pressed"]
  const isActive =
    selected === true ||
    selected === "true" ||
    pressed === true ||
    pressed === "true"

  return (
    <button
      type="button"
      className={cn(
        "group inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-all select-none",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
        isActive
          ? "bg-foreground font-semibold text-background shadow-xs"
          : "border border-border/50 bg-card/70 text-muted-foreground hover:border-foreground/30 hover:bg-muted hover:text-foreground",
        className
      )}
      {...props}
    >
      <LetterRoll
        text={children}
        hoverTarget="parent"
        className="min-w-0"
        style={{ width: "100%" }}
        truncate={truncateLabel}
      />
      {count !== undefined && (
        <span
          className={cn(
            "py-0.2 shrink-0 rounded-full px-1.5 font-mono text-[10px]",
            isActive
              ? "bg-background/25 font-bold text-background"
              : "bg-muted text-muted-foreground group-hover:text-foreground"
          )}
        >
          {count}
        </span>
      )}
    </button>
  )
}
