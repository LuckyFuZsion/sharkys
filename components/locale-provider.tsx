"use client"

import { createContext, useContext } from "react"
import type { Dictionary, Locale } from "@/lib/i18n/types"

type LocaleContextValue = {
  locale: Locale
  dictionary: Dictionary
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: LocaleContextValue & { children: React.ReactNode }) {
  return <LocaleContext.Provider value={{ locale, dictionary }}>{children}</LocaleContext.Provider>
}

export function useLocaleContext() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error("useLocaleContext must be used within LocaleProvider")
  }
  return context
}
