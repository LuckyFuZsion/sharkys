import Script from "next/script"
import { getStructuredDataGraph } from "@/lib/structured-data"

export default function StructuredData() {
  return (
    <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(getStructuredDataGraph())}
    </Script>
  )
}
