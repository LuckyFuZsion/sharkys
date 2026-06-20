import { defaultLocale, locales } from "./config"
import type { Locale } from "./types"

function normalizePath(pathname: string): string {
  if (!pathname) return "/"
  if (!pathname.startsWith("/")) return `/${pathname}`
  return pathname
}

export function stripLocaleFromPathname(pathname: string): string {
  const normalized = normalizePath(pathname)
  const segments = normalized.split("/").filter(Boolean)

  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    const rest = segments.slice(1).join("/")
    return rest ? `/${rest}` : "/"
  }

  return normalized
}

export function removeLocalePrefix(pathname: string): string {
  return stripLocaleFromPathname(pathname)
}

export function getLocaleFromPathname(pathname: string): Locale {
  const normalized = normalizePath(pathname)
  const first = normalized.split("/").filter(Boolean)[0]
  return locales.includes(first as Locale) ? (first as Locale) : defaultLocale
}

export function localizePath(pathname: string, locale: Locale): string {
  const clean = stripLocaleFromPathname(pathname)
  if (locale === defaultLocale) return clean
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`
}

export function localizeHref(href: string, locale: Locale): string {
  const hashIndex = href.indexOf("#")
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex)
  const hash = hashIndex === -1 ? "" : href.slice(hashIndex)
  return `${localizePath(path || "/", locale)}${hash}`
}
