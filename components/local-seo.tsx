import Script from "next/script"

// Component for head elements only
export function LocalSEOHead() {
  return null // No head elements in this component
}

// Component for body elements
export function LocalSEOBody() {
  return (
    <>
      {/* Local Business Schema with enhanced details */}
      <Script id="local-business-enhanced" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BarOrPub",
            "name": "Sharky's Bar",
            "image": "https://sharkysbar.com/sharkys_logo.png",
            "url": "https://sharkysbar.com",
            "telephone": "+351914120017",
            "priceRange": "$$",
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
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "10:00",
                "closes": "02:00"
              }
            ],
            "servesCuisine": ["Bar Food", "International", "British"],
            "menu": "https://sharkysbar.com/#menu",
            "acceptsReservations": "True",
            "paymentAccepted": "Cash, Credit Card",
            "currenciesAccepted": "EUR",
            "areaServed": ["Albufeira", "Marina de Albufeira", "Algarve"],
            "amenityFeature": [
              {
                "@type": "LocationFeatureSpecification",
                "name": "Live Sports",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Outdoor Seating",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Marina View",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Cocktails",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Private Events",
                "value": true
              }
            ],
            "hasMap": "https://www.google.com/maps?cid=123456789",
            "publicAccess": true,
            "smokingAllowed": true,
            "tourBookingPage": "https://sharkysbar.com/#private-events",
            "slogan": "A friendly bar with a warm atmosphere overlooking Marina de Albufeira"
          }
        `}
      </Script>

      {/* Hidden content for local search terms */}
      <div className="hidden">
        <h2>Bar near Marina de Albufeira</h2>
        <h2>Sports bar in Albufeira</h2>
        <h2>Best cocktails in Albufeira</h2>
        <h2>Restaurant with marina view in Albufeira</h2>
        <h2>British bar in Algarve</h2>
        <h2>Watch football in Albufeira</h2>
        <h2>Private event venue in Albufeira</h2>
      </div>
    </>
  )
}

// Default export for backward compatibility
export default function LocalSEO() {
  return null
}
