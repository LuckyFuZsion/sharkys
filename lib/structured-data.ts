import { SITE_URL } from "@/lib/site-config"
import { siteFaqs } from "@/lib/faq-content"
import { businessInfo, schemaBusinessAddress } from "@/lib/business-info"
import {
  getBarOrPubReviewReferences,
  getGoogleAggregateRatingSchema,
  getReviewItemListSchema,
  getReviewSchemaNodes,
  getTripAdvisorAggregateRatingSchema,
} from "@/lib/review-schema"

export function getStructuredDataGraph() {
  const reviewNodes = getReviewSchemaNodes()
  const reviewList = getReviewItemListSchema()
  const tripAdvisorAggregateRating = getTripAdvisorAggregateRatingSchema()
  const googleAggregateRating = getGoogleAggregateRatingSchema()

  const barOrPub = {
    "@type": "BarOrPub",
    "@id": `${SITE_URL}/#bar`,
    name: businessInfo.name,
    description:
      "Sports bar and waterfront café at Marina de Albufeira serving breakfast, cocktails, and live sports with marina views.",
    image: `${SITE_URL}/sharkys_logo.png`,
    url: SITE_URL,
    telephone: businessInfo.telephone,
    email: businessInfo.email,
    priceRange: "€€",
    servesCuisine: ["Breakfast", "Bar Food", "International", "British"],
    menu: `${SITE_URL}/menu`,
    hasMenu: {
      "@type": "Menu",
      name: "Sharky's Bar Menu",
      url: `${SITE_URL}/menu`,
    },
    acceptsReservations: true,
    address: schemaBusinessAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: businessInfo.hours.opens,
        closes: businessInfo.hours.closes,
      },
    ],
    aggregateRating: { "@id": `${SITE_URL}/#tripadvisor-aggregate-rating` },
    review: getBarOrPubReviewReferences(),
    sameAs: [
      "https://www.facebook.com/share/18zhz9ogBu/?mibextid=wwXIfr",
      "https://www.instagram.com/sharkysbaralbufeira/",
      "https://www.tripadvisor.co.uk/Attraction_Review-g189112-d10049522-Reviews-Sharky_s_Bar-Albufeira_Faro_District_Algarve.html",
      "https://www.google.com/maps/search/?api=1&query=Sharky's+Bar,+Marina+de+Albufeira,+Albufeira,+Portugal",
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Live Sports", value: true },
      { "@type": "LocationFeatureSpecification", name: "Outdoor Seating", value: true },
      { "@type": "LocationFeatureSpecification", name: "Marina View", value: true },
      { "@type": "LocationFeatureSpecification", name: "Breakfast", value: true },
    ],
  }

  const reviewsWebPage = {
    "@type": "WebPage",
    "@id": `${SITE_URL}/#reviews`,
    url: `${SITE_URL}/#reviews`,
    name: "Customer Reviews",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#bar` },
    mainEntity: { "@id": `${SITE_URL}/#review-list` },
    aggregateRating: { "@id": `${SITE_URL}/#google-aggregate-rating` },
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
    hasPart: [{ "@id": `${SITE_URL}/#reviews` }, { "@id": `${SITE_URL}/#review-list` }],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#hero h1", "#about p", ".faq-question", ".faq-answer", "#reviews h2"],
    },
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      webPage,
      barOrPub,
      reviewsWebPage,
      reviewList,
      tripAdvisorAggregateRating,
      googleAggregateRating,
      ...reviewNodes,
      faqPage,
      sunsetOffer,
    ],
  }
}
