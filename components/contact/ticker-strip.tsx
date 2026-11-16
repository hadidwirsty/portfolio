"use client"

import {
  TickerStrip as GlobalTickerStrip,
  type TickerStripProps,
} from "@/components/ticker-strip"

export type { TickerStripProps }

export function TickerStrip(props: TickerStripProps) {
  return <GlobalTickerStrip {...props} />
}
