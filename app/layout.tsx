import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import { LocalSEOBody } from "@/components/local-seo"
import { InternationalSEOHead, InternationalSEOBody } from "@/components/international-seo"
import { EATSignalsBody } from "@/components/eat-signals"
import { VoiceSearchOptimizationBody } from "@/components/voice-search-optimization"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Sharky's Bar | Marina de Albufeira | Sports, Food & Cocktails",
  description:
    "A friendly bar with a warm atmosphere overlooking Marina de Albufeira. Enjoy live sports, freshly made food, and cocktails in our beautiful waterfront location.",
  keywords:
    "Sharky's Bar, Albufeira, Marina de Albufeira, sports bar, cocktails, Portuguese bar, waterfront bar, marina view, live sports, food, drinks, private events, sunset special",
  authors: [{ name: "Sharky's Bar" }],
  creator: "Sharky's Bar",
  publisher: "Sharky's Bar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sharkysbar.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "https://sharkysbar.com",
      pt: "https://sharkysbar.com/pt",
      es: "https://sharkysbar.com/es",
      de: "https://sharkysbar.com/de",
      fr: "https://sharkysbar.com/fr",
    },
  },
  openGraph: {
    title: "Sharky's Bar | Marina de Albufeira | Sports, Food & Cocktails",
    description:
      "A friendly bar with a warm atmosphere overlooking Marina de Albufeira. Enjoy live sports, freshly made food, and cocktails!",
    url: "https://sharkysbar.com",
    siteName: "Sharky's Bar",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/sharkys-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sharky's Bar Marina de Albufeira",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sharky's Bar | Marina de Albufeira",
    description:
      "A friendly bar with a warm atmosphere overlooking Marina de Albufeira. Enjoy live sports, freshly made food, and cocktails!",
    images: ["/images/sharkys-og-image.jpg"],
    creator: "@sharkysbar",
    site: "@sharkysbar",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/sharkys_logo.png",
        href: "/sharkys_logo.png",
      },
    ],
    apple: {
      url: "/sharkys_logo.png",
      href: "/sharkys_logo.png",
    },
    shortcut: [
      {
        url: "/sharkys_logo.png",
        href: "/sharkys_logo.png",
      },
    ],
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
    bing: "bing-verification-code",
  },
  category: "Food & Drink",
  classification: "Bar, Restaurant, Sports Bar, Entertainment",
  referrer: "origin-when-cross-origin",
  other: {
    "revisit-after": "7 days",
    rating: "General",
    "geo.position": "37.0840;-8.2619",
    "geo.placename": "Albufeira",
    "geo.region": "PT-08",
    ICBM: "37.0840, -8.2619",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <InternationalSEOHead />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          {/* Temporarily disable analytics components that might cause circular references */}
          {/* <PerformanceOptimizations /> */}
          {/* <CoreWebVitals /> */}
          <LocalSEOBody />
          <InternationalSEOBody />
          <EATSignalsBody />
          <VoiceSearchOptimizationBody />
          {/* <AdvancedAnalytics /> */}
          {children}
        </Suspense>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
      <Script id="schema-script" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Sharky's Bar",
            "image": "https://sharkysbar.com/sharkys_logo.png",
            "url": "https://sharkysbar.com",
            "telephone": "+351914120017",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Marina de Albufeira, Lote 1, Loja 5",
              "addressLocality": "Albufeira",
              "addressRegion": "Faro",
              "postalCode": "8200-394",
              "addressCountry": "PT"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 37.0840,
              "longitude": -8.2619
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "10:00",
              "closes": "02:00"
            },
            "servesCuisine": ["Bar Food", "International", "British"],
            "priceRange": "$$",
            "menu": "https://sharkysbar.com/#menu",
            "acceptsReservations": "True"
          }
        `}
      </Script>
    </html>
  )
}
