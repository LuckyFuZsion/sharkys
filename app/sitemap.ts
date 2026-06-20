import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site-config"
import { locales } from "@/lib/i18n/config"
import { getLanguageAlternates } from "@/lib/i18n/metadata"
import { localizePath } from "@/lib/i18n/navigation"

const pages: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/menu", changeFrequency: "monthly", priority: 0.9 },
  { path: "/location", changeFrequency: "monthly", priority: 0.9 },
  { path: "/private-events", changeFrequency: "monthly", priority: 0.8 },
  { path: "/sports", changeFrequency: "weekly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return pages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${localizePath(path, locale)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: getLanguageAlternates(path),
      },
    })),
  )
}
