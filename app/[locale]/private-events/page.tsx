import type { Metadata } from "next"
import SiteChrome from "@/components/site-chrome"
import PageHeader from "@/components/page-header"
import PageStructuredData from "@/components/page-structured-data"
import PrivateEvents from "@/components/private-events"
import { createPageMetadata } from "@/lib/page-metadata"
import { getPageStructuredData } from "@/lib/page-structured-data"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/types"

type PageProps = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const dictionary = getDictionary(locale)
  return createPageMetadata({
    title: dictionary.meta.privateEvents.title,
    description: dictionary.meta.privateEvents.description,
    path: "/private-events",
    locale,
  })
}

export default async function PrivateEventsPage({ params }: PageProps) {
  const { locale } = await params
  const dictionary = getDictionary(locale)

  return (
    <>
      <PageStructuredData
        id="private-events-structured-data"
        data={getPageStructuredData({
          path: "/private-events",
          name: dictionary.privateEventsPage.pageTitle,
          description: dictionary.privateEventsPage.pageDesc,
          locale,
          homeLabel: dictionary.common.home,
        })}
      />
      <SiteChrome>
        <PageHeader
          title={dictionary.privateEventsPage.pageTitle}
          description={dictionary.privateEventsPage.pageDesc}
        />
        <PrivateEvents />
      </SiteChrome>
    </>
  )
}
