import Script from "next/script"

type PageStructuredDataProps = {
  data: Record<string, unknown>
  id?: string
}

export default function PageStructuredData({ data, id = "page-structured-data" }: PageStructuredDataProps) {
  return (
    <Script id={id} type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(data)}
    </Script>
  )
}
