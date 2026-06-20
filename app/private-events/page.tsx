import type { Metadata } from "next"
import SiteChrome from "@/components/site-chrome"
import PageHeader from "@/components/page-header"
import PageStructuredData from "@/components/page-structured-data"
import PrivateEvents from "@/components/private-events"
import { createPageMetadata } from "@/lib/page-metadata"
import { getPageStructuredData } from "@/lib/page-structured-data"

export const metadata: Metadata = createPageMetadata({
  title: "Private Events & Celebrations",
  description:
    "Host weddings, birthdays, and corporate events at Sharky's Bar, Marina de Albufeira. Marina views, food packages, and space for up to 100 guests.",
  path: "/private-events",
})

export default function PrivateEventsPage() {
  return (
    <>
      <PageStructuredData
        id="private-events-structured-data"
        data={getPageStructuredData({
          path: "/private-events",
          name: "Private Events at Sharky's Bar",
          description:
            "Private hire for weddings, birthdays, and corporate events at Sharky's Bar with marina views and catering options.",
        })}
      />
      <SiteChrome>
        <PageHeader
          title="Private Events & Celebrations"
          description="Make your special day unforgettable at Sharky's Bar with stunning marina views, delicious food, and friendly service for groups of up to 100."
        />
        <PrivateEvents />
      </SiteChrome>
    </>
  )
}
