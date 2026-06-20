"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { locales, localeNames } from "@/lib/i18n/config"
import { getLocaleFromPathname, localizeHref } from "@/lib/i18n/navigation"
import type { Locale } from "@/lib/i18n/types"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const currentLocale = getLocaleFromPathname(pathname)

  return (
    <div className="relative group">
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-md border border-blue-200 bg-white px-2.5 py-1.5 text-sm font-medium text-blue-900 hover:bg-blue-50 transition-colors"
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="uppercase">{currentLocale}</span>
      </button>
      <ul
        className="invisible absolute right-0 z-50 mt-1 min-w-[9rem] rounded-md border border-blue-100 bg-white py-1 shadow-lg opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
        role="listbox"
        aria-label="Languages"
      >
        {locales.map((locale) => (
          <li key={locale} role="option" aria-selected={locale === currentLocale}>
            <Link
              href={localizeHref(pathname, locale as Locale)}
              className={`block px-3 py-2 text-sm hover:bg-blue-50 ${
                locale === currentLocale ? "font-semibold text-blue-700 bg-blue-50/50" : "text-gray-700"
              }`}
            >
              {localeNames[locale as Locale]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
