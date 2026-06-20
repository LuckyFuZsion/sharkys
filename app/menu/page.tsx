import type { Metadata } from "next"
import SiteChrome from "@/components/site-chrome"
import PageHeader from "@/components/page-header"
import PageStructuredData from "@/components/page-structured-data"
import Menu from "@/components/menu"
import { createPageMetadata } from "@/lib/page-metadata"
import { getMenuPageStructuredData } from "@/lib/page-structured-data"

export const metadata: Metadata = createPageMetadata({
  title: "Menu",
  description:
    "Breakfast, cocktails, beer, wine, spirits, and soft drinks at Sharky's Bar, Marina de Albufeira. Freshly made food and drinks with marina views.",
  path: "/menu",
})

export default function MenuPage() {
  return (
    <>
      <PageStructuredData id="menu-structured-data" data={getMenuPageStructuredData()} />
      <SiteChrome>
        <PageHeader
          title="Our Menu"
          description="From full English breakfasts to handcrafted cocktails, beer, and wine — freshly made at Sharky's Bar overlooking Marina de Albufeira."
        />
        <Menu />
      </SiteChrome>
    </>
  )
}
