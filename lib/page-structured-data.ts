import { SITE_URL } from "@/lib/site-config"

type PageSchemaOptions = {
  path: string
  name: string
  description: string
}

function breadcrumb(path: string, name: string) {
  return {
    "@type": "BreadcrumbList" as const,
    "@id": `${SITE_URL}${path}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem" as const,
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem" as const,
        position: 2,
        name,
        item: `${SITE_URL}${path}`,
      },
    ],
  }
}

function webPage({ path, name, description }: PageSchemaOptions) {
  return {
    "@type": "WebPage" as const,
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#bar` },
    breadcrumb: { "@id": `${SITE_URL}${path}#breadcrumb` },
  }
}

export function getPageStructuredData(options: PageSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@graph": [webPage(options), breadcrumb(options.path, options.name)],
  }
}

export function getMenuPageStructuredData() {
  const options = {
    path: "/menu",
    name: "Sharky's Bar Menu",
    description:
      "Breakfast, cocktails, beer, wine, spirits, and soft drinks at Sharky's Bar, Marina de Albufeira.",
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      webPage(options),
      breadcrumb(options.path, options.name),
      {
        "@type": "Menu",
        "@id": `${SITE_URL}/menu#menu`,
        name: "Sharky's Bar Menu",
        url: `${SITE_URL}/menu`,
        inLanguage: "en-GB",
        hasMenuSection: [
          { "@type": "MenuSection", name: "Breakfast" },
          { "@type": "MenuSection", name: "Cocktails" },
          { "@type": "MenuSection", name: "Beer & Cider" },
          { "@type": "MenuSection", name: "Wine & Spirits" },
          { "@type": "MenuSection", name: "Soft Drinks" },
          { "@type": "MenuSection", name: "Hot Drinks" },
        ],
      },
    ],
  }
}

export function getLocationPageStructuredData() {
  const options = {
    path: "/location",
    name: "Sharky's Bar Location",
    description:
      "Find Sharky's Bar at Marina de Albufeira, Lote 1, Loja 5, Albufeira, Portugal. Directions, parking, and contact details.",
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      webPage(options),
      breadcrumb(options.path, options.name),
      {
        "@type": "Place",
        "@id": `${SITE_URL}/location#place`,
        name: "Sharky's Bar",
        url: `${SITE_URL}/location`,
        hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Sharky's Bar Marina de Albufeira")}`,
      },
    ],
  }
}
