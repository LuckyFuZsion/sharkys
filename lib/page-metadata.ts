import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site-config"
import { locales, ogLocales } from "@/lib/i18n/config"
import { getLanguageAlternates } from "@/lib/i18n/metadata"
import { localizePath } from "@/lib/i18n/navigation"
import type { Locale } from "@/lib/i18n/types"

const SITE_NAME = "Sharky's Bar"

export function createPageMetadata({
  title,
  description,
  path,
  locale,
}: {
  title: string
  description: string
  path: string
  locale: Locale
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`
  const canonicalPath = localizePath(path, locale)
  const url = `${SITE_URL}${canonicalPath}`

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((item) => item !== locale).map((item) => ogLocales[item]),
      type: "website",
      images: [
        {
          url: "/sharkys_logo.png",
          width: 512,
          height: 512,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/sharkys_logo.png"],
    },
  }
}

export function createHomeMetadata(locale: Locale, meta: { title: string; description: string }): Metadata {
  const canonicalPath = localizePath("/", locale)
  const url = `${SITE_URL}${canonicalPath}`

  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalPath,
      languages: getLanguageAlternates("/"),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: SITE_NAME,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((item) => item !== locale).map((item) => ogLocales[item]),
      type: "website",
      images: [
        {
          url: "/sharkys_logo.png",
          width: 512,
          height: 512,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/sharkys_logo.png"],
      creator: "@sharkysbar",
      site: "@sharkysbar",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "tNu0fiUTumoBXDEtoB2U1BlcGkTdP7I5Gjk6P0avzko",
    },
  }
}
