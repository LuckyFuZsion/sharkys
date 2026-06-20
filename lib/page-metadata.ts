import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site-config"

const SITE_NAME = "Sharky's Bar"

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`

  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_GB",
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
