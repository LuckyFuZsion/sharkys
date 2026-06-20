import Head from "next/head"
import Script from "next/script"

interface SEOProps {
  title?: string
  description?: string
  canonicalUrl?: string
  ogType?: string
  ogImage?: string
  twitterCard?: string
}

export default function SEOHead({
  title = "Sharky's Bar | Marina de Albufeira | Sports, Food & Cocktails",
  description = "A friendly bar with a warm atmosphere overlooking Marina de Albufeira. Enjoy live sports, freshly made food, and cocktails in our beautiful waterfront location.",
  canonicalUrl = "https://sharkysbar.com",
  ogType = "website",
  ogImage = "/images/sharkys-og-image.jpg",
  twitterCard = "summary_large_image",
}: SEOProps) {
  return (
    <>
      <Head>
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Alternate languages - for international SEO */}
        <link rel="alternate" href="https://sharkysbar.com" hrefLang="en" />
        <link rel="alternate" href="https://sharkysbar.com/pt" hrefLang="pt" />
        <link rel="alternate" href="https://sharkysbar.com" hrefLang="x-default" />

        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href="/sharkys_logo.png" />

        {/* Theme color */}
        <meta name="theme-color" content="#1e40af" />

        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="PT-08" />
        <meta name="geo.placename" content="Albufeira" />
        <meta name="geo.position" content="37.0840;-8.2619" />
        <meta name="ICBM" content="37.0840, -8.2619" />

        {/* Mobile optimization */}
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </Head>

      {/* Breadcrumb structured data */}
      <Script id="breadcrumb-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://sharkysbar.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Menu",
                "item": "https://sharkysbar.com/#menu"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Contact",
                "item": "https://sharkysbar.com/#contact"
              }
            ]
          }
        `}
      </Script>

      {/* FAQ structured data */}
      <Script id="faq-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What are Sharky's Bar opening hours?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sharky's Bar is open every day from 10:00 AM until late."
                }
              },
              {
                "@type": "Question",
                "name": "Does Sharky's Bar show live sports?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we show all major sporting events on our multiple screens throughout the bar, including football, rugby, Formula 1, and UFC."
                }
              },
              {
                "@type": "Question",
                "name": "Can I book Sharky's Bar for private events?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Sharky's Bar is available for private hire for events such as birthday parties, wedding celebrations, and corporate events. We can accommodate groups of up to 100 people."
                }
              },
              {
                "@type": "Question",
                "name": "Does Sharky's Bar serve food?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we serve freshly made food daily until 19:00. Our menu includes burgers, hot dogs, sandwiches, and other bar favorites."
                }
              },
              {
                "@type": "Question",
                "name": "Where is Sharky's Bar located?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sharky's Bar is located at Marina de Albufeira, Lote 1, Loja 5, Albufeira, Portugal, overlooking the beautiful marina."
                }
              }
            ]
          }
        `}
      </Script>

      {/* Event structured data for promotions */}
      <Script id="event-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Sunset Special - Half Price Cocktails",
            "startDate": "2023-01-01T18:00",
            "endDate": "2023-12-31T20:00",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": {
              "@type": "Place",
              "name": "Sharky's Bar",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Marina de Albufeira, Lote 1, Loja 5",
                "addressLocality": "Albufeira",
                "addressRegion": "Faro",
                "postalCode": "8200-394",
                "addressCountry": "PT"
              }
            },
            "image": [
              "https://sharkysbar.com/images/sharkys-sunset-special.jpeg"
            ],
            "description": "Enjoy half price on all cocktails daily from 6PM to 8PM at Sharky's Bar.",
            "offers": {
              "@type": "Offer",
              "url": "https://sharkysbar.com/#promotions",
              "price": "4.25",
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock",
              "validFrom": "2023-01-01T18:00"
            },
            "organizer": {
              "@type": "Organization",
              "name": "Sharky's Bar",
              "url": "https://sharkysbar.com"
            }
          }
        `}
      </Script>
    </>
  )
}
