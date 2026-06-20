import { SITE_URL } from "@/lib/site-config"
import {
  featuredReviews,
  googleMeta,
  tripAdvisorMeta,
  TRIPADVISOR_REVIEWS_URL,
  GOOGLE_REVIEWS_URL,
} from "@/lib/featured-reviews"
import type { ReviewType } from "@/lib/types"

const MONTH_TO_ISO: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
}

function reviewDatePublished(dateLabel: string) {
  const match = dateLabel.match(/^(\w+)\s+(\d{4})$/i)
  if (!match) {
    return undefined
  }

  const month = MONTH_TO_ISO[match[1].toLowerCase()]
  if (!month) {
    return undefined
  }

  return `${match[2]}-${month}-01`
}

function reviewPublisher(source: ReviewType["source"]) {
  if (source === "google") {
    return {
      "@type": "Organization" as const,
      name: "Google",
      url: GOOGLE_REVIEWS_URL,
    }
  }

  return {
    "@type": "Organization" as const,
    name: "TripAdvisor",
    url: TRIPADVISOR_REVIEWS_URL,
  }
}

export function buildReviewSchemaNode(review: ReviewType) {
  const source = review.source ?? "tripadvisor"
  const datePublished = reviewDatePublished(review.date)

  return {
    "@type": "Review" as const,
    "@id": `${SITE_URL}/#review-${review.id}`,
    name: review.title,
    reviewBody: review.content,
    author: {
      "@type": "Person" as const,
      name: review.author,
    },
    reviewRating: {
      "@type": "Rating" as const,
      ratingValue: String(review.rating),
      bestRating: "5",
    },
    itemReviewed: {
      "@id": `${SITE_URL}/#bar`,
    },
    publisher: reviewPublisher(source),
    ...(datePublished ? { datePublished } : {}),
  }
}

export function getReviewSchemaNodes() {
  return featuredReviews.map(buildReviewSchemaNode)
}

export function getReviewItemListSchema() {
  return {
    "@type": "ItemList" as const,
    "@id": `${SITE_URL}/#review-list`,
    name: "Customer Reviews",
    numberOfItems: featuredReviews.length,
    itemListElement: featuredReviews.map((review, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      item: {
        "@id": `${SITE_URL}/#review-${review.id}`,
      },
    })),
  }
}

/** Visible on-page rating summaries — TripAdvisor aggregate on the business entity. */
export function getTripAdvisorAggregateRatingSchema() {
  return {
    "@type": "AggregateRating" as const,
    "@id": `${SITE_URL}/#tripadvisor-aggregate-rating`,
    ratingValue: String(tripAdvisorMeta.rating),
    reviewCount: String(tripAdvisorMeta.reviewCount),
    bestRating: "5",
    author: {
      "@type": "Organization" as const,
      name: "TripAdvisor",
      url: TRIPADVISOR_REVIEWS_URL,
    },
  }
}

/** Google rating summary shown on the reviews section. */
export function getGoogleAggregateRatingSchema() {
  return {
    "@type": "AggregateRating" as const,
    "@id": `${SITE_URL}/#google-aggregate-rating`,
    ratingValue: String(googleMeta.rating),
    reviewCount: String(googleMeta.reviewCount),
    bestRating: "5",
    author: {
      "@type": "Organization" as const,
      name: "Google",
      url: GOOGLE_REVIEWS_URL,
    },
  }
}

export function getBarOrPubReviewReferences() {
  return featuredReviews.map((review) => ({
    "@id": `${SITE_URL}/#review-${review.id}`,
  }))
}
