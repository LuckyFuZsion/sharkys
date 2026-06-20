import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { defaultLocale, isValidLocale } from "@/lib/i18n/config"
import { stripLocaleFromPathname } from "@/lib/i18n/navigation"

const PUBLIC_PATHS = new Set(["/", "/menu", "/location", "/private-events", "/sports", "/privacy"])

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.has(pathname)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  if (pathname.includes(".")) {
    return NextResponse.next()
  }

  const pathnameWithoutLocale = stripLocaleFromPathname(pathname)
  const firstSegment = pathname.split("/").filter(Boolean)[0]
  const hasLocalePrefix = isValidLocale(firstSegment)

  if (!isPublicPath(pathnameWithoutLocale)) {
    const home = hasLocalePrefix ? `/${firstSegment}` : "/"
    return NextResponse.redirect(new URL(home, request.url), 308)
  }

  if (hasLocalePrefix) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathnameWithoutLocale === "/" ? "" : pathnameWithoutLocale}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
}
