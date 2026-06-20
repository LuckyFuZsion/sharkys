import type { Metadata } from "next"
import SiteChrome from "@/components/site-chrome"
import PageHeader from "@/components/page-header"
import PageStructuredData from "@/components/page-structured-data"
import Sports from "@/components/sports"
import { createPageMetadata } from "@/lib/page-metadata"
import { getPageStructuredData } from "@/lib/page-structured-data"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/types"

type PageProps = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const dictionary = getDictionary(locale)
  return createPageMetadata({
    title: dictionary.meta.sports.title,
    description: dictionary.meta.sports.description,
    path: "/sports",
    locale,
  })
}

export default async function SportsPage({ params }: PageProps) {
  const { locale } = await params
  const dictionary = getDictionary(locale)

  return (
    <>
      <PageStructuredData
        id="sports-structured-data"
        data={getPageStructuredData({
          path: "/sports",
          name: dictionary.sportsPage.pageTitle,
          description: dictionary.sportsPage.pageDesc,
          locale,
          homeLabel: dictionary.common.home,
        })}
      />
      <SiteChrome>
        <PageHeader title={dictionary.sportsPage.pageTitle} description={dictionary.sportsPage.pageDesc} />
        <Sports />
      </SiteChrome>
    </>
  )
}
