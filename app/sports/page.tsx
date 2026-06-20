import type { Metadata } from "next"
import SiteChrome from "@/components/site-chrome"
import PageHeader from "@/components/page-header"
import PageStructuredData from "@/components/page-structured-data"
import Sports from "@/components/sports"
import { createPageMetadata } from "@/lib/page-metadata"
import { getPageStructuredData } from "@/lib/page-structured-data"

export const metadata: Metadata = createPageMetadata({
  title: "Live Sports",
  description:
    "Watch football, rugby, Formula 1, and UFC live at Sharky's Bar, Marina de Albufeira. Multiple screens, great atmosphere, food and drinks.",
  path: "/sports",
})

export default function SportsPage() {
  return (
    <>
      <PageStructuredData
        id="sports-structured-data"
        data={getPageStructuredData({
          path: "/sports",
          name: "Live Sports at Sharky's Bar",
          description:
            "Catch major sporting events live on multiple screens at Sharky's Bar overlooking Marina de Albufeira.",
        })}
      />
      <SiteChrome>
        <PageHeader
          title="Live Sports"
          description="Catch all the major sporting events live on our multiple screens — football, rugby, Formula 1, UFC, and more."
        />
        <Sports />
      </SiteChrome>
    </>
  )
}
