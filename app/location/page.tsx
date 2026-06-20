import type { Metadata } from "next"
import SiteChrome from "@/components/site-chrome"
import PageHeader from "@/components/page-header"
import PageStructuredData from "@/components/page-structured-data"
import LocationSection from "@/components/location-section"
import { createPageMetadata } from "@/lib/page-metadata"
import { getLocationPageStructuredData } from "@/lib/page-structured-data"

export const metadata: Metadata = createPageMetadata({
  title: "Location & Directions",
  description:
    "Find Sharky's Bar at Marina de Albufeira, Lote 1, Loja 5, Albufeira, Portugal. Directions, parking, opening hours, and contact details.",
  path: "/location",
})

export default function LocationPage() {
  return (
    <>
      <PageStructuredData id="location-structured-data" data={getLocationPageStructuredData()} />
      <SiteChrome>
        <PageHeader
          title="Location & Directions"
          description="Sharky's Bar is on the waterfront at Marina de Albufeira — a short walk from the marina with stunning harbour views."
        />
        <LocationSection />
      </SiteChrome>
    </>
  )
}
