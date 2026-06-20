import type { Locale } from "./types"

export const locales: Locale[] = ["en", "pt", "es", "fr", "de"]

export const defaultLocale: Locale = "en"

export const localeNames: Record<Locale, string> = {
  en: "English",
  pt: "Português",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
}

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export const ogLocales: Record<Locale, string> = {
  en: "en_GB",
  pt: "pt_PT",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
}
