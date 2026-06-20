import type { Dictionary, Locale, StaticDictionary } from "./types"
import { defaultLocale } from "./config"
import { dictionary as en } from "./dictionaries/en"
import { dictionary as pt } from "./dictionaries/pt"
import { dictionary as es } from "./dictionaries/es"
import { dictionary as fr } from "./dictionaries/fr"
import { dictionary as de } from "./dictionaries/de"
import { menuItems as enMenuItems } from "./menu-items/en"
import { menuItems as ptMenuItems } from "./menu-items/pt"
import { menuItems as esMenuItems } from "./menu-items/es"
import { menuItems as frMenuItems } from "./menu-items/fr"
import { menuItems as deMenuItems } from "./menu-items/de"

const dictionaries: Record<Locale, StaticDictionary> = {
  en,
  pt,
  es,
  fr,
  de,
}

const menuItemsByLocale = {
  en: enMenuItems,
  pt: ptMenuItems,
  es: esMenuItems,
  fr: frMenuItems,
  de: deMenuItems,
}

export function getDictionary(locale: Locale): Dictionary {
  const source = dictionaries[locale] ?? dictionaries[defaultLocale]
  const items = menuItemsByLocale[locale] ?? menuItemsByLocale[defaultLocale]

  return {
    ...source,
    menu: {
      ...source.menu,
      items,
    },
  }
}
