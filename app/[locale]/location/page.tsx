import type { Metadata } from "next"
import SiteChrome from "@/components/site-chrome"
import PageHeader from "@/components/page-header"
import PageStructuredData from "@/components/page-structured-data"
import LocationSection from "@/components/location-section"
import { createPageMetadata } from "@/lib/page-metadata"
import { getLocationPageStructuredData } from "@/lib/page-structured-data"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/types"

type PageProps = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const dictionary = getDictionary(locale)
  return createPageMetadata({
    title: dictionary.meta.location.title,
    description: dictionary.meta.location.description,
    path: "/location",
    locale,
  })
}

export default async function LocationPage({ params }: PageProps) {
  const { locale } = await params
  const dictionary = getDictionary(locale)

  return (
    <>
      <PageStructuredData id="location-structured-data" data={getLocationPageStructuredData(locale, dictionary)} />
      <SiteChrome>
        <PageHeader title={dictionary.location.pageTitle} description={dictionary.location.pageDesc} />
        <LocationSection />
      </SiteChrome>
    </>
  )
}
