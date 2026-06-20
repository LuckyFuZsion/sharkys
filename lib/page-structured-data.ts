import { SITE_URL } from "@/lib/site-config"
import { schemaInLanguage } from "@/lib/i18n/metadata"
import { localizePath } from "@/lib/i18n/navigation"
import type { Dictionary, Locale } from "@/lib/i18n/types"

type PageSchemaOptions = {
  path: string
  name: string
  description: string
  locale: Locale
  homeLabel: string
}

function breadcrumb(path: string, name: string, locale: Locale, homeLabel: string) {
  const localizedPath = localizePath(path, locale)
  const homePath = localizePath("/", locale)

  return {
    "@type": "BreadcrumbList" as const,
    "@id": `${SITE_URL}${localizedPath}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem" as const,
        position: 1,
        name: homeLabel,
        item: `${SITE_URL}${homePath}`,
      },
      {
        "@type": "ListItem" as const,
        position: 2,
        name,
        item: `${SITE_URL}${localizedPath}`,
      },
    ],
  }
}

function webPage({ path, name, description, locale }: PageSchemaOptions) {
  const localizedPath = localizePath(path, locale)

  return {
    "@type": "WebPage" as const,
    "@id": `${SITE_URL}${localizedPath}#webpage`,
    url: `${SITE_URL}${localizedPath}`,
    name,
    description,
    inLanguage: schemaInLanguage(locale),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#bar` },
    breadcrumb: { "@id": `${SITE_URL}${localizedPath}#breadcrumb` },
  }
}

export function getPageStructuredData(options: PageSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      webPage(options),
      breadcrumb(options.path, options.name, options.locale, options.homeLabel),
    ],
  }
}

export function getMenuPageStructuredData(locale: Locale, dictionary: Dictionary) {
  const path = localizePath("/menu", locale)
  const options: PageSchemaOptions = {
    path: "/menu",
    name: dictionary.meta.menu.title,
    description: dictionary.meta.menu.description,
    locale,
    homeLabel: dictionary.common.home,
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      webPage(options),
      breadcrumb("/menu", options.name, locale, dictionary.common.home),
      {
        "@type": "Menu",
        "@id": `${SITE_URL}${path}#menu`,
        name: dictionary.menu.ourMenu,
        url: `${SITE_URL}${path}`,
        inLanguage: schemaInLanguage(locale),
        hasMenuSection: [
          { "@type": "MenuSection", name: dictionary.menu.tabs.breakfast },
          { "@type": "MenuSection", name: dictionary.menu.tabs.cocktails },
          { "@type": "MenuSection", name: dictionary.menu.tabs.beer },
          { "@type": "MenuSection", name: dictionary.menu.tabs.wine },
          { "@type": "MenuSection", name: dictionary.menu.tabs.nonAlcoholic },
          { "@type": "MenuSection", name: dictionary.menu.tabs.hotDrinks },
        ],
      },
    ],
  }
}

export function getLocationPageStructuredData(locale: Locale, dictionary: Dictionary) {
  const path = localizePath("/location", locale)
  const options: PageSchemaOptions = {
    path: "/location",
    name: dictionary.meta.location.title,
    description: dictionary.meta.location.description,
    locale,
    homeLabel: dictionary.common.home,
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      webPage(options),
      breadcrumb("/location", options.name, locale, dictionary.common.home),
      {
        "@type": "Place",
        "@id": `${SITE_URL}${path}#place`,
        name: dictionary.common.siteName,
        url: `${SITE_URL}${path}`,
        hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Sharky's Bar Marina de Albufeira")}`,
      },
    ],
  }
}
