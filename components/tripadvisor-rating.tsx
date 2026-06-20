"use client"

import { useEffect, useRef, useState } from "react"
import { Star, ExternalLink, Facebook, Quote } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  FACEBOOK_REVIEWS_URL,
  GOOGLE_REVIEWS_URL,
  TRIPADVISOR_REVIEWS_URL,
  featuredReviews,
  getAuthorInitials,
  getReviewSourceBadgeClass,
  getReviewSourceLabel,
  getReviewStarClass,
  googleMeta,
  truncateReviewText,
  tripAdvisorMeta,
} from "@/lib/featured-reviews"
import type { ReviewType } from "@/lib/types"
import { useLocaleContext } from "@/components/locale-provider"

function StarRating({ rating, source }: { rating: number; source?: ReviewType["source"] }) {
  const starClass = getReviewStarClass(source)

  return (
    <div className="flex" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < rating ? starClass : "text-gray-300"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: ReviewType }) {
  const source = review.source ?? "tripadvisor"

  return (
    <article
      id={`review-${review.id}`}
      className="h-full rounded-2xl border border-blue-100 bg-white p-6 shadow-md flex flex-col"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <Quote className="h-8 w-8 text-blue-200 shrink-0" aria-hidden="true" />
        <StarRating rating={review.rating} source={source} />
      </div>

      <h3 className="text-lg font-semibold text-blue-900 mb-3 line-clamp-2">{review.title}</h3>
      <p className="text-gray-700 leading-relaxed flex-1 line-clamp-5">
        &ldquo;{truncateReviewText(review.content)}&rdquo;
      </p>

      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="h-10 w-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-semibold shrink-0"
            aria-hidden="true"
          >
            {getAuthorInitials(review.author)}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-gray-900 truncate">{review.author}</p>
            <p className="text-xs text-gray-500">{review.date}</p>
          </div>
        </div>
        <span
          className={`text-[10px] font-semibold uppercase tracking-wide shrink-0 ${getReviewSourceBadgeClass(source)}`}
        >
          {getReviewSourceLabel(source)}
        </span>
      </div>
    </article>
  )
}

function RatingSummary({
  label,
  rating,
  reviewCount,
  basedOnText,
  reviewLabel,
  starClass,
  labelClass,
}: {
  label: string
  rating: number
  reviewCount: number
  basedOnText: string
  reviewLabel: string
  starClass: string
  labelClass: string
}) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="rounded-2xl bg-white border border-blue-100 shadow-sm px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`font-bold text-xl tracking-tight ${labelClass}`}>{label}</span>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    index < fullStars
                      ? starClass
                      : index === fullStars && hasHalfStar
                        ? `${starClass} opacity-50`
                        : "text-gray-300"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-blue-900">{rating}</span>
            <span className="text-gray-500">/ 5</span>
          </div>
        </div>
        <p className="text-gray-700 text-sm sm:text-base">
          {basedOnText} <span className="font-semibold">{reviewCount}</span> {reviewLabel}
        </p>
      </div>
    </div>
  )
}

export default function TripAdvisorRating() {
  const { dictionary } = useLocaleContext()
  const reviews = dictionary.reviews
  const [isVisible, setIsVisible] = useState(false)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const facebookRecommendPercent = 98
  const facebookReviewCount = 39

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap())
    }

    onSelect()
    carouselApi.on("select", onSelect)

    return () => {
      carouselApi.off("select", onSelect)
    }
  }, [carouselApi])

  return (
    <section id="reviews" ref={sectionRef} className="py-16 bg-blue-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 translate-x-1/3 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full opacity-40 -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative">
        <div
          className={`text-center mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">{reviews.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{reviews.subtitle}</p>
        </div>

        <div
          className={`max-w-6xl mx-auto mb-10 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <RatingSummary
              label="TripAdvisor"
              rating={tripAdvisorMeta.rating}
              reviewCount={tripAdvisorMeta.reviewCount}
              basedOnText={reviews.basedOn}
              reviewLabel={reviews.reviewsLabel}
              starClass="text-[#00AA6C] fill-[#00AA6C]"
              labelClass="text-[#00AA6C]"
            />
            <RatingSummary
              label="Google"
              rating={googleMeta.rating}
              reviewCount={googleMeta.reviewCount}
              basedOnText={reviews.basedOn}
              reviewLabel={reviews.reviewsLabel}
              starClass="text-yellow-500 fill-yellow-500"
              labelClass="text-[#4285F4]"
            />
          </div>

          <div className="relative px-2 sm:px-12">
            <Carousel setApi={setCarouselApi} opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {featuredReviews.map((review) => (
                  <CarouselItem key={review.id} className="pl-4 basis-full md:basis-1/2 xl:basis-1/3">
                    <ReviewCard review={review} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 sm:-left-2 bg-white shadow-md border-blue-100 hover:bg-blue-50" />
              <CarouselNext className="right-0 sm:-right-2 bg-white shadow-md border-blue-100 hover:bg-blue-50" />
            </Carousel>

            <div className="flex justify-center gap-2 mt-6 flex-wrap">
              {featuredReviews.map((review, index) => (
                <button
                  key={review.id}
                  type="button"
                  onClick={() => carouselApi?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === index ? "w-8 bg-blue-600" : "w-2 bg-blue-300 hover:bg-blue-400"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <a
              href={TRIPADVISOR_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#00AA6C] text-white rounded-md hover:bg-[#00945d] transition-all transform hover:scale-105 hover:shadow-lg"
            >
              <span className="mr-2">{reviews.readOnTripAdvisor}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#4285F4] text-white rounded-md hover:bg-[#3367d6] transition-all transform hover:scale-105 hover:shadow-lg"
            >
              <span className="mr-2">{reviews.readOnGoogle}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div
          className={`max-w-3xl mx-auto grid md:grid-cols-2 gap-6 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Facebook className="h-7 w-7 text-[#1877F2] mr-2" aria-hidden="true" />
              <h3 className="text-lg font-bold text-blue-900">{reviews.facebookTitle}</h3>
            </div>
            <p className="text-3xl font-bold text-[#1877F2] mb-2">
              {facebookRecommendPercent}
              {reviews.facebookRecommend}
            </p>
            <p className="text-gray-600 mb-4">
              {reviews.facebookBasedOn} {facebookReviewCount} {reviews.reviewsLabel}
            </p>
            <a
              href={FACEBOOK_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-[#1877F2] hover:underline"
            >
              View on Facebook
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6 flex items-center">
            <p className="text-gray-700 text-center w-full">{reviews.appreciation}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
