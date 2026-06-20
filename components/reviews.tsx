"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ReviewType } from "@/lib/types"

export default function Reviews({ reviews }: { reviews: ReviewType[] }) {
  const [currentPage, setCurrentPage] = useState(0)
  const reviewsPerPage = 3
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)

  const displayedReviews = reviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage)

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))
  }

  return (
    <section id="reviews" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900">Customer Reviews</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          See what our customers have to say about their experience at Sharky&apos;s Bar.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {displayedReviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">{review.date}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{review.title}</h3>
              <p className="text-gray-700 mb-4">{review.content}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-200">
                  {review.avatar ? (
                    <Image
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.author}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold">
                      {review.author.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="font-medium">{review.author}</span>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <Button variant="outline" size="icon" onClick={goToPrevPage} disabled={currentPage === 0}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center px-4">
              <span className="text-sm text-gray-600">
                Page {currentPage + 1} of {totalPages}
              </span>
            </div>
            <Button variant="outline" size="icon" onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="https://www.tripadvisor.co.uk/Attraction_Review-g189112-d10049522-Reviews-Sharky_s_Bar-Albufeira_Faro_District_Algarve.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <span className="mr-2">See all reviews on TripAdvisor</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
