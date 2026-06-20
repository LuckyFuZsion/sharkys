import { SITE_URL } from "@/lib/site-config"
import { siteFaqs } from "@/lib/faq-content"
import { tripAdvisorMeta } from "@/lib/data"

const businessAddress = {
  "@type": "PostalAddress" as const,
  streetAddress: "Marina de Albufeira, Lote 1, Loja 5",
  addressLocality: "Albufeira",
  addressRegion: "Faro",
  postalCode: "8200-394",
  addressCountry: "PT",
}

export function getStructuredDataGraph() {
  const barOrPub = {
    "@type": "BarOrPub",
    "@id": `${SITE_URL}/#bar`,
    name: "Sharky's Bar",
    description:
      "Sports bar and waterfront café at Marina de Albufeira serving breakfast, cocktails, and live sports with marina views.",
    image: `${SITE_URL}/sharkys_logo.png`,
    url: SITE_URL,
    telephone: "+351914120017",
    email: "Chris.whatley@hotmail.co.uk",
    priceRange: "€€",
    servesCuisine: ["Breakfast", "Bar Food", "International", "British"],
    menu: `${SITE_URL}/#menu`,
    hasMenu: {
      "@type": "Menu",
      name: "Sharky's Bar Menu",
      url: `${SITE_URL}/#menu`,
    },
    acceptsReservations: true,
    address: businessAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.084,
      longitude: -8.2619,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "10:00",
        closes: "02:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(tripAdvisorMeta.rating),
      reviewCount: String(tripAdvisorMeta.reviewCount),
      bestRating: "5",
    },
    sameAs: [
      "https://www.facebook.com/share/18zhz9ogBu/?mibextid=wwXIfr",
      "https://www.instagram.com/sharkysbaralbufeira/",
      "https://www.tripadvisor.co.uk/Attraction_Review-g189112-d10049522-Reviews-Sharky_s_Bar-Albufeira_Faro_District_Algarve.html",
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Live Sports", value: true },
      { "@type": "LocationFeatureSpecification", name: "Outdoor Seating", value: true },
      { "@type": "LocationFeatureSpecification", name: "Marina View", value: true },
      { "@type": "LocationFeatureSpecification", name: "Breakfast", value: true },
    ],
  }

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: siteFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  const sunsetOffer = {
    "@type": "Offer",
    "@id": `${SITE_URL}/#sunset-special`,
    name: "Sunset Special — Half Price Cocktails",
    description: "Half-price cocktails daily from 6 PM to 8 PM at Sharky's Bar.",
    url: `${SITE_URL}/#promotions`,
    priceCurrency: "EUR",
    price: "4.50",
    eligibleRegion: {
      "@type": "Country",
      name: "Portugal",
    },
    offeredBy: { "@id": `${SITE_URL}/#bar` },
    availability: "https://schema.org/InStock",
  }

  const webPage = {
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "Sharky's Bar | Marina de Albufeira | Sports, Food & Cocktails",
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: "Sharky's Bar" },
    about: { "@id": `${SITE_URL}/#bar` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#hero h1", "#about p", ".faq-question", ".faq-answer"],
    },
  }

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, barOrPub, faqPage, sunsetOffer],
  }
}
