import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const VALID_PAGE_PATHS = new Set(["/", "/admin"])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next()
  }

  if (pathname.includes(".")) {
    return NextResponse.next()
  }

  if (VALID_PAGE_PATHS.has(pathname)) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL("/", request.url), 308)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
}
