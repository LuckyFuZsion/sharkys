import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sharkysbar.com"

  // Main pages
  const routes = ["", "/blog", "/menu", "/contact", "/private-events"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Blog posts - in a real app, these would come from your CMS or database
  const blogPosts = [
    { slug: "best-summer-cocktails", date: "2023-06-15" },
    { slug: "upcoming-sports-events", date: "2023-05-28" },
    { slug: "private-event-guide", date: "2023-04-10" },
  ].map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...routes, ...blogPosts]
}
