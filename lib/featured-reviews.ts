import type { ReviewType } from "@/lib/types"

export const tripAdvisorMeta = {
  rating: 4.7,
  reviewCount: 158,
}

export const googleMeta = {
  rating: 4.4,
  reviewCount: 187,
}

export const TRIPADVISOR_REVIEWS_URL =
  "https://www.tripadvisor.co.uk/Attraction_Review-g189112-d10049522-Reviews-Sharky_s_Bar-Albufeira_Faro_District_Algarve.html"

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Sharky's+Bar,+Marina+de+Albufeira,+Albufeira,+Portugal"

export const FACEBOOK_REVIEWS_URL = "https://www.facebook.com/share/18zhz9ogBu/?mibextid=wwXIfr"

/** Real TripAdvisor reviews selected for the homepage carousel (scraped 2026-06-20). */
const tripAdvisorReviews: ReviewType[] = [
  {
    id: 1,
    source: "tripadvisor",
    author: "Victor R",
    rating: 5,
    title: "Well chuffed!",
    content:
      "Lovely marina based bar, very clean and comfortable with excellent food and fantastic staff, good prices too for being located in a more up-market area!",
    date: "September 2025",
  },
  {
    id: 2,
    source: "tripadvisor",
    author: "Gavin H",
    rating: 5,
    title: "Chilled drinks",
    content:
      "Nice chilled unpressurized drinks comfortable seating, friendly staff, great location. Didn't have food but looked good for others.",
    date: "September 2025",
  },
  {
    id: 3,
    source: "tripadvisor",
    author: "Lisa M",
    rating: 5,
    title: "Home from home",
    content:
      "The location was wonderful, and the owners were very courteous. The pricing was reasonable and provided great value for our experience. We definitely plan to return.",
    date: "September 2025",
  },
  {
    id: 8,
    source: "tripadvisor",
    author: "Michelleneil1983",
    rating: 5,
    title: "The best cocktails",
    content:
      "Stopped here for cocktails and they were the best we have tried in 12 days in Portugal. Strawberry daiquiri was to die for — and half price during happy hour 6pm to 8pm.",
    date: "July 2025",
  },
  {
    id: 9,
    source: "tripadvisor",
    author: "Debbie H",
    rating: 5,
    title: "Perfect for drinks and relaxed vibes",
    content:
      "Sharky's Bar is a regular place we visit every time we travel to Portugal. Friendly, chatty service and top-notch cocktails — every drink is made with care.",
    date: "July 2025",
  },
  {
    id: 6,
    source: "tripadvisor",
    author: "Jason and Karen",
    rating: 5,
    title: "Sharkeys is the one",
    content:
      "Absolutely fantastic — always service with a smile. The food is exceptional and Chris, Ed and the team know how to look after their customers.",
    date: "September 2025",
  },
]

/** Real Google Maps reviews (public Google review excerpts). */
const googleReviews: ReviewType[] = [
  {
    id: 1001,
    source: "google",
    author: "Matt B",
    rating: 5,
    title: "Fantastic baguettes",
    content:
      "Friendly team and fantastic baguettes. The chicken salad baguette was amazing — the portion is huge and can be split between two.",
    date: "Google review",
  },
  {
    id: 1002,
    source: "google",
    author: "James T",
    rating: 5,
    title: "Beautiful location",
    content:
      "Beautiful location and delicious food. Lovely friendly staff. Prices are good and the beer is tasty.",
    date: "Google review",
  },
  {
    id: 1003,
    source: "google",
    author: "Michael J",
    rating: 5,
    title: "Amazing breakfast",
    content:
      "Amazing breakfast and service. We always feel welcome when we come back to Sharkys. Highly recommend.",
    date: "Google review",
  },
  {
    id: 1004,
    source: "google",
    author: "Deirdre M",
    rating: 5,
    title: "Fantastic marina atmosphere",
    content:
      "Fantastic atmosphere on the marina! Kaleigh and Chris don't miss a step with service. Beers are a good deal, burgers are tasty and the couches are ridiculously comfy.",
    date: "Google review",
  },
  {
    id: 1005,
    source: "google",
    author: "Mr R",
    rating: 5,
    title: "Great marina spot",
    content:
      "Came here today on the marina — you can sit by the water and look at the boats. The food was reasonably priced and amazing. I would definitely come here again!",
    date: "Google review",
  },
  {
    id: 1006,
    source: "google",
    author: "Sue W",
    rating: 5,
    title: "Great service from Eddie",
    content:
      "We arrived after the kitchen had closed and Eddie accommodated us with baguettes, toasties and chips. Lovely bar, great service — call here if you are at the marina.",
    date: "Google review",
  },
  {
    id: 1007,
    source: "google",
    author: "Sam B",
    rating: 5,
    title: "Helpful staff, good food",
    content:
      "Nice atmosphere, staff were helpful, food was good too. Decent prices — they will definitely see me again.",
    date: "Google review",
  },
  {
    id: 1008,
    source: "google",
    author: "Sports fan",
    rating: 5,
    title: "Best sports bar on the marina",
    content:
      "Best sports bar on the marina. Great atmosphere for Premier League and big football games. Big portions — I recommend the Great White Sharky Burger.",
    date: "Google review",
  },
]

function interleaveReviews(primary: ReviewType[], secondary: ReviewType[]) {
  const merged: ReviewType[] = []
  const maxLength = Math.max(primary.length, secondary.length)

  for (let index = 0; index < maxLength; index++) {
    if (index < primary.length) {
      merged.push(primary[index])
    }
    if (index < secondary.length) {
      merged.push(secondary[index])
    }
  }

  return merged
}

/** Mixed carousel: TripAdvisor and Google reviews alternating. */
export const featuredReviews = interleaveReviews(tripAdvisorReviews, googleReviews)

export function truncateReviewText(text: string, maxLength = 240) {
  const normalized = text.replace(/\s+/g, " ").trim()
  if (normalized.length <= maxLength) {
    return normalized
  }

  return `${normalized.slice(0, maxLength).trim()}…`
}

export function getAuthorInitials(author: string) {
  return author
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function getReviewSourceLabel(source: ReviewType["source"] = "tripadvisor") {
  switch (source) {
    case "google":
      return "Google"
    case "facebook":
      return "Facebook"
    default:
      return "TripAdvisor"
  }
}

export function getReviewSourceBadgeClass(source: ReviewType["source"] = "tripadvisor") {
  switch (source) {
    case "google":
      return "text-[#4285F4]"
    case "facebook":
      return "text-[#1877F2]"
    default:
      return "text-[#00AA6C]"
  }
}

export function getReviewStarClass(source: ReviewType["source"] = "tripadvisor") {
  switch (source) {
    case "google":
      return "text-yellow-500 fill-yellow-500"
    default:
      return "text-[#00AA6C] fill-[#00AA6C]"
  }
}
