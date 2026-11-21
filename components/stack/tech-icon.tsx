"use client"

import * as React from "react"
import Image from "next/image"
import { ShieldCheck, Wrench } from "lucide-react"

import type { TechItem } from "@/lib/tech-stack-data"
import { cn } from "@/lib/utils"

interface TechIconProps {
  tech: TechItem
  className?: string
  size?: "sm" | "md" | "lg"
}

export function TechIcon({ tech, className, size = "md" }: TechIconProps) {
  const sizeClasses =
    size === "sm"
      ? "size-9 rounded-lg"
      : size === "lg"
        ? "size-14 sm:size-16 rounded-2xl"
        : "size-11 sm:size-12 rounded-xl"

  const iconSizes =
    size === "sm"
      ? "size-5"
      : size === "lg"
        ? "size-8 sm:size-9"
        : "size-6 sm:size-7"

  // 1. If explicit SVG / PNG asset path exists
  if (tech.icon) {
    return (
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden border border-border/50 bg-card p-2 shadow-xs transition-colors select-none",
          sizeClasses,
          className
        )}
      >
        <Image
          src={tech.icon}
          alt=""
          aria-hidden="true"
          width={48}
          height={48}
          className={cn("object-contain", iconSizes)}
          unoptimized
        />
      </div>
    )
  }

  // 2. Specific verified vector emblers for tools without static SVG files
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden border border-border/50 bg-card p-2 text-foreground shadow-xs transition-colors select-none",
        sizeClasses,
        className
      )}
      title={tech.name}
    >
      {renderVectorEmblem(tech.id, iconSizes)}
    </div>
  )
}

function renderVectorEmblem(id: string, sizeClass: string) {
  switch (id) {
    case "shadcn":
      return (
        <svg
          viewBox="0 0 256 256"
          className={cn("text-foreground", sizeClass)}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <line
            x1="208"
            y1="128"
            x2="128"
            y2="208"
            stroke="currentColor"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <line
            x1="192"
            y1="40"
            x2="40"
            y2="192"
            stroke="currentColor"
            strokeWidth="24"
            strokeLinecap="round"
          />
        </svg>
      )

    case "radix":
      return (
        <svg
          viewBox="0 0 25 25"
          className={cn("text-foreground", sizeClass)}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12 25C18.6274 25 24 19.6274 24 13C24 6.37258 18.6274 1 12 1V25Z" />
          <path d="M0 13C0 6.37258 5.37258 1 12 1V25C5.37258 25 0 19.6274 0 13Z" />
          <circle cx="12" cy="13" r="5" fill="var(--background)" />
        </svg>
      )

    case "ant-design":
      return (
        <svg
          viewBox="0 0 1024 1024"
          className={cn("text-red-500", sizeClass)}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M981.6 444.6L686.4 149.4c-20.4-20.4-48-31.4-76.8-31.4H240c-60.8 0-110 49.2-110 110v568c0 60.8 49.2 110 110 110h544c60.8 0 110-49.2 110-110V521.4c0-28.8-11-56.4-31.4-76.8h19zM784 796H240c-22.2 0-40-17.8-40-40V228c0-22.2 17.8-40 40-40h369.6L824 402.4V756c0 22.2-17.8 40-40 40z" />
          <path d="M512 432c-61.9 0-112 50.1-112 112s50.1 112 112 112 112-50.1 112-112-50.1-112-112-112z" />
        </svg>
      )

    case "redux":
      return (
        <svg
          viewBox="0 0 24 24"
          className={cn("text-purple-500", sizeClass)}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)" />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="4"
            transform="rotate(-30 12 12)"
          />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      )

    case "zustand":
      return (
        <div
          className={cn(
            "flex items-center justify-center font-mono font-bold text-amber-500",
            sizeClass
          )}
        >
          <span className="text-sm tracking-tighter sm:text-base">ZU</span>
        </div>
      )

    case "tanstack-query":
      return (
        <svg
          viewBox="0 0 24 24"
          className={cn("text-red-500", sizeClass)}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="8" />
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="M4.93 4.93l2.83 2.83" />
          <path d="M16.24 16.24l2.83 2.83" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      )

    case "react-hook-form":
      return (
        <svg
          viewBox="0 0 24 24"
          className={cn("text-pink-500", sizeClass)}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 15l2 2 4-4" />
        </svg>
      )

    case "zod":
      return (
        <div
          className={cn(
            "flex items-center justify-center font-mono font-bold text-blue-500",
            sizeClass
          )}
        >
          <span className="text-base font-black tracking-tight sm:text-lg">
            Z
          </span>
        </div>
      )

    case "vitest":
      return (
        <svg
          viewBox="0 0 24 24"
          className={cn("text-yellow-500", sizeClass)}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2L2 19.5h8.5L12 22l1.5-2.5H22L12 2zm0 4.5l5.5 10H6.5L12 6.5z" />
        </svg>
      )

    case "jest":
      return (
        <div
          className={cn(
            "flex items-center justify-center font-mono font-bold text-red-500",
            sizeClass
          )}
        >
          <span className="text-xs font-bold sm:text-sm">JEST</span>
        </div>
      )

    case "rtl":
      return (
        <div
          className={cn(
            "flex items-center justify-center font-mono font-bold text-red-400",
            sizeClass
          )}
        >
          <span className="text-xs font-bold sm:text-sm">RTL</span>
        </div>
      )

    case "web-security":
      return (
        <ShieldCheck
          className={cn("text-emerald-500", sizeClass)}
          aria-hidden="true"
        />
      )

    case "blazor":
      return (
        <div
          className={cn(
            "flex items-center justify-center font-mono font-bold text-purple-600 dark:text-purple-400",
            sizeClass
          )}
        >
          <span className="text-xs font-bold sm:text-sm">.NET</span>
        </div>
      )

    case "postman":
      return (
        <svg
          viewBox="0 0 24 24"
          className={cn("text-orange-500", sizeClass)}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon
            points="22 2 15 22 11 13 2 9 22 2"
            fill="currentColor"
            fillOpacity="0.2"
          />
        </svg>
      )

    case "aws":
      return (
        <div
          className={cn(
            "flex flex-col items-center justify-center font-mono font-black text-amber-500",
            sizeClass
          )}
        >
          <span className="text-xs leading-none font-bold sm:text-sm">AWS</span>
        </div>
      )

    default:
      return (
        <Wrench
          className={cn("text-muted-foreground", sizeClass)}
          aria-hidden="true"
        />
      )
  }
}
