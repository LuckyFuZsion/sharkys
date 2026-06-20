import Script from "next/script"
import { getStructuredDataGraph } from "@/lib/structured-data"
import type { Dictionary, Locale } from "@/lib/i18n/types"

export default function StructuredData({
  dictionary,
  locale,
}: {
  dictionary: Dictionary
  locale: Locale
}) {
  return (
    <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(getStructuredDataGraph(dictionary, locale))}
    </Script>
  )
}
