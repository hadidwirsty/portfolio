import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { isMaintenanceActive, isPageHidden } from "@/lib/maintenance"

export const config = {
  matcher: [
    "/about/:path*",
    "/portfolio/:path*",
    "/contact/:path*",
    "/stack/:path*",
  ],
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isMaintenanceActive() && isPageHidden(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = "/maintenance"

    const hasHeader = (name: string) =>
      request.headers.has(name.toLowerCase()) || request.headers.has(name)

    const isClientNav =
      hasHeader("rsc") ||
      hasHeader("next-router-prefetch") ||
      hasHeader("next-router-state-tree") ||
      request.nextUrl.searchParams.has("_rsc") ||
      (request.headers
        .get("accept")
        ?.toLowerCase()
        .includes("text/x-component") ??
        false)

    if (isClientNav) {
      return NextResponse.rewrite(url, { status: 200 })
    }

    const response = NextResponse.rewrite(url, { status: 503 })
    response.headers.set("Retry-After", "86400")
    response.headers.set("Cache-Control", "no-store")
    return response
  }

  return NextResponse.next()
}

export default proxy
