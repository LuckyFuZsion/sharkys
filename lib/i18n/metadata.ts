import { SITE_URL } from "@/lib/site-config"
import { defaultLocale, locales, ogLocales } from "./config"
import { localizePath } from "./navigation"
import type { Locale } from "./types"

export function getLanguageAlternates(path: string): Record<string, string> {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${SITE_URL}${localizePath(path, locale)}`]),
  )
  languages["x-default"] = `${SITE_URL}${localizePath(path, defaultLocale)}`
  return languages
}

export function schemaInLanguage(locale: Locale): string {
  return ogLocales[locale].replace("_", "-")
}
