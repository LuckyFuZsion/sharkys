import type { Metadata } from "next"
import SiteChrome from "@/components/site-chrome"
import PrivacyContent from "@/components/privacy-content"
import { createPageMetadata } from "@/lib/page-metadata"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/types"

type PageProps = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const dictionary = getDictionary(locale)
  return createPageMetadata({
    title: dictionary.meta.privacy.title,
    description: dictionary.meta.privacy.description,
    path: "/privacy",
    locale,
  })
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params
  const dictionary = getDictionary(locale)

  return (
    <SiteChrome>
      <PrivacyContent dictionary={dictionary} locale={locale} />
    </SiteChrome>
  )
}
