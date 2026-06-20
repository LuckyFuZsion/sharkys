"use client"

import { useRef, useEffect, useState } from "react"
import { Star, ExternalLink, Facebook } from "lucide-react"

export default function TripAdvisorRating() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // TripAdvisor data (reverted to original)
  const tripAdvisorRating = 4.5
  const tripAdvisorReviewCount = 247

  // Facebook data (new)
  const facebookRecommendPercent = 98
  const facebookReviewCount = 39

  // Generate full and half stars based on rating
  const fullStars = Math.floor(tripAdvisorRating)
  const hasHalfStar = tripAdvisorRating % 1 >= 0.5

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.2,
      },
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

  return (
    <section id="reviews" ref={sectionRef} className="py-16 bg-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 translate-x-1/3 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full opacity-40 -translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 text-blue-900 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Customer Reviews
          </h2>

          {/* TripAdvisor Reviews */}
          <div
            className={`bg-white rounded-lg shadow-xl p-8 mb-8 transition-all duration-700 delay-200 transform ${
              isVisible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-10 rotate-1"
            } hover:shadow-2xl hover:-translate-y-1`}
          >
            <div className="flex items-center justify-center mb-2">
              <img src="/tripadvisor-logo-display.png" alt="TripAdvisor" className="h-8 mr-2" />
              <h3 className="text-xl font-bold text-blue-900">TripAdvisor Reviews</h3>
            </div>

            <div className="flex items-center justify-center mb-4">
              <div className="flex mr-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-8 w-8 ${
                      i < fullStars
                        ? "text-yellow-400 fill-yellow-400"
                        : i === fullStars && hasHalfStar
                          ? "text-yellow-400 fill-gradient-to-r from-yellow-400 to-gray-300"
                          : "text-gray-300"
                    }`}
                    style={i < fullStars ? { animation: `pulse 3s infinite`, animationDelay: `${i * 0.2}s` } : {}}
                  />
                ))}
              </div>
              <span className="text-3xl font-bold text-blue-900">{tripAdvisorRating}</span>
              <span className="text-gray-500 ml-2">/ 5</span>
            </div>

            <p className="text-lg text-gray-700 mb-6">
              Based on <span className="font-semibold">{tripAdvisorReviewCount}</span> reviews on TripAdvisor
            </p>

            <a
              href="https://www.tripadvisor.co.uk/Attraction_Review-g189112-d10049522-Reviews-Sharky_s_Bar-Albufeira_Faro_District_Algarve.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all transform hover:scale-105 hover:shadow-lg"
            >
              <span className="mr-2">Read Reviews on TripAdvisor</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Facebook Reviews */}
          <div
            className={`bg-white rounded-lg shadow-xl p-8 mb-8 transition-all duration-700 delay-400 transform ${
              isVisible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-10 rotate-1"
            } hover:shadow-2xl hover:-translate-y-1`}
          >
            <div className="flex items-center justify-center mb-2">
              <Facebook className="h-8 w-8 text-blue-600 mr-2" />
              <h3 className="text-xl font-bold text-blue-900">Facebook Reviews</h3>
            </div>

            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-600 text-white text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center transform hover:scale-110 transition-transform shadow-lg">
                {facebookRecommendPercent}%
              </div>
            </div>

            <p className="text-lg text-gray-700 mb-6">
              <span className="font-semibold">{facebookRecommendPercent}%</span> of people recommend Sharky's Bar
              <br />
              Based on <span className="font-semibold">{facebookReviewCount}</span> reviews
            </p>

            <a
              href="https://www.facebook.com/share/18zhz9ogBu/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#1877F2] text-white rounded-md hover:bg-[#0e6edf] transition-all transform hover:scale-105 hover:shadow-lg"
            >
              <span className="mr-2">Read Reviews on Facebook</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <p
            className={`text-gray-600 transition-all duration-700 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            We appreciate all feedback from our customers. If you&apos;ve visited us recently, please consider leaving a
            review on TripAdvisor or Facebook.
          </p>
        </div>
      </div>
    </section>
  )
}
