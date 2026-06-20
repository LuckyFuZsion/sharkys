import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import StructuredData from "@/components/structured-data"
import { Suspense } from "react"
import { SITE_URL } from "@/lib/site-config"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Sharky's Bar | Marina de Albufeira | Sports, Breakfast & Cocktails",
  description:
    "Waterfront sports bar at Marina de Albufeira. Breakfast, live sports on multiple screens, cocktails, and marina views in Albufeira, Algarve.",
  authors: [{ name: "Sharky's Bar" }],
  creator: "Sharky's Bar",
  publisher: "Sharky's Bar",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sharky's Bar | Marina de Albufeira | Sports, Breakfast & Cocktails",
    description:
      "Waterfront sports bar at Marina de Albufeira serving breakfast, cocktails, and live sports with marina views.",
    url: SITE_URL,
    siteName: "Sharky's Bar",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/sharkys-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sharky's Bar at Marina de Albufeira",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sharky's Bar | Marina de Albufeira",
    description:
      "Waterfront sports bar at Marina de Albufeira serving breakfast, cocktails, and live sports.",
    images: ["/images/sharkys-og-image.jpg"],
    creator: "@sharkysbar",
    site: "@sharkysbar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/sharkys_logo.png" }],
    apple: { url: "/sharkys_logo.png" },
    shortcut: [{ url: "/sharkys_logo.png" }],
  },
  category: "Food & Drink",
  verification: {
    google: "tNu0fiUTumoBXDEtoB2U1BlcGkTdP7I5Gjk6P0avzko",
  },
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
        <meta name="theme-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>
        <StructuredData />
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
