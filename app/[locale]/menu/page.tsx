import type { Metadata } from "next"
import SiteChrome from "@/components/site-chrome"
import PageHeader from "@/components/page-header"
import PageStructuredData from "@/components/page-structured-data"
import Menu from "@/components/menu"
import { createPageMetadata } from "@/lib/page-metadata"
import { getMenuPageStructuredData } from "@/lib/page-structured-data"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/types"

type PageProps = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const dictionary = getDictionary(locale)
  return createPageMetadata({
    title: dictionary.meta.menu.title,
    description: dictionary.meta.menu.description,
    path: "/menu",
    locale,
  })
}

export default async function MenuPage({ params }: PageProps) {
  const { locale } = await params
  const dictionary = getDictionary(locale)

  return (
    <>
      <PageStructuredData id="menu-structured-data" data={getMenuPageStructuredData(locale, dictionary)} />
      <SiteChrome>
        <PageHeader title={dictionary.menu.title} description={dictionary.menu.description} />
        <Menu />
      </SiteChrome>
    </>
  )
}
