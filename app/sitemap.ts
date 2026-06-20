import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site-config"

const pages: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/menu", changeFrequency: "monthly", priority: 0.9 },
  { path: "/location", changeFrequency: "monthly", priority: 0.9 },
  { path: "/private-events", changeFrequency: "monthly", priority: 0.8 },
  { path: "/sports", changeFrequency: "weekly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
