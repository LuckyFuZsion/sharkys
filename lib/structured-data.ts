import { SITE_URL } from "@/lib/site-config"
import { businessInfo, schemaBusinessAddress } from "@/lib/business-info"
import { schemaInLanguage } from "@/lib/i18n/metadata"
import { localizePath } from "@/lib/i18n/navigation"
import type { Dictionary, Locale } from "@/lib/i18n/types"
import {
  getBarOrPubReviewReferences,
  getGoogleAggregateRatingSchema,
  getReviewItemListSchema,
  getReviewSchemaNodes,
  getTripAdvisorAggregateRatingSchema,
} from "@/lib/review-schema"

export function getStructuredDataGraph(dictionary: Dictionary, locale: Locale) {
  const reviewNodes = getReviewSchemaNodes()
  const reviewList = getReviewItemListSchema()
  const tripAdvisorAggregateRating = getTripAdvisorAggregateRatingSchema()
  const googleAggregateRating = getGoogleAggregateRatingSchema()

  const homePath = localizePath("/", locale)
  const menuPath = localizePath("/menu", locale)
  const homeUrl = `${SITE_URL}${homePath}`
  const menuUrl = `${SITE_URL}${menuPath}`

  const barOrPub = {
    "@type": "BarOrPub",
    "@id": `${SITE_URL}/#bar`,
    name: businessInfo.name,
    description: dictionary.hero.tagline,
    image: `${SITE_URL}/sharkys_logo.png`,
    url: homeUrl,
    telephone: businessInfo.telephone,
    email: businessInfo.email,
    priceRange: "€€",
    servesCuisine: ["Breakfast", "Bar Food", "International", "British"],
    menu: menuUrl,
    hasMenu: {
      "@type": "Menu",
      name: dictionary.menu.ourMenu,
      url: menuUrl,
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
      { "@type": "LocationFeatureSpecification", name: dictionary.schema.amenities.liveSports, value: true },
      { "@type": "LocationFeatureSpecification", name: dictionary.schema.amenities.outdoorSeating, value: true },
      { "@type": "LocationFeatureSpecification", name: dictionary.schema.amenities.marinaView, value: true },
      { "@type": "LocationFeatureSpecification", name: dictionary.schema.amenities.breakfast, value: true },
    ],
  }

  const reviewsWebPage = {
    "@type": "WebPage",
    "@id": `${SITE_URL}/#reviews`,
    url: `${homeUrl}#reviews`,
    name: dictionary.reviews.title,
    inLanguage: schemaInLanguage(locale),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#bar` },
    mainEntity: { "@id": `${SITE_URL}/#review-list` },
    aggregateRating: { "@id": `${SITE_URL}/#google-aggregate-rating` },
  }

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: dictionary.faq.items.map((faq) => ({
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
    name: dictionary.menu.sunsetSpecial,
    description: dictionary.menu.sunsetDesc,
    url: `${homeUrl}#promotions`,
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
    url: homeUrl,
    name: dictionary.meta.home.title,
    inLanguage: schemaInLanguage(locale),
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: dictionary.common.siteName },
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
