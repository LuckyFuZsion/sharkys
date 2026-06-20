import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import StructuredData from "@/components/structured-data"
import { LocaleProvider } from "@/components/locale-provider"
import { locales } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { createHomeMetadata } from "@/lib/page-metadata"
import type { Locale } from "@/lib/i18n/types"

const inter = Inter({ subsets: ["latin"], display: "swap" })

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params
  const dictionary = getDictionary(locale)
  return {
    ...createHomeMetadata(locale, dictionary.meta.home),
    authors: [{ name: "Sharky's Bar" }],
    creator: "Sharky's Bar",
    publisher: "Sharky's Bar",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      shortcut: ["/favicon.ico"],
    },
    category: "Food & Drink",
  }
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  const dictionary = getDictionary(locale)

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>
        <LocaleProvider locale={locale} dictionary={dictionary}>
          <StructuredData dictionary={dictionary} locale={locale} />
          <Suspense fallback={null}>{children}</Suspense>
        </LocaleProvider>
      </body>
    </html>
  )
}
