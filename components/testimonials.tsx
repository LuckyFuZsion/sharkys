"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Star, Quote, ChevronRight } from "lucide-react"
import Script from "next/script"
import { SITE_URL } from "@/lib/site-config"

type Testimonial = {
  id: string
  name: string
  position?: string
  content: string
  rating: number
  image?: string
  date: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "John Smith",
    position: "Regular Customer",
    content:
      "Sharky's Bar has become our go-to spot whenever we visit Albufeira. The atmosphere is fantastic, the staff are incredibly friendly, and the view of the marina is unbeatable. Their cocktails are some of the best I've had in Portugal!",
    rating: 5,
    image: "/diverse-group-city.png",
    date: "2023-05-15",
  },
  {
    id: "2",
    name: "Maria Rodriguez",
    position: "Tourist",
    content:
      "We stumbled upon Sharky's Bar during our holiday and ended up returning every evening. The sunset views from the deck are spectacular, and the Sunset Special cocktail offer is amazing value. The staff made us feel like locals!",
    rating: 5,
    image: "/contemplative-artist.png",
    date: "2023-06-22",
  },
  {
    id: "3",
    name: "David Wilson",
    position: "Local Resident",
    content:
      "As a local, I've been coming to Sharky's for years. It's consistently excellent - great food, perfect drinks, and always a good atmosphere whether you're watching sports or just enjoying the marina view. Highly recommended!",
    rating: 5,
    image: "/contemplative-man.png",
    date: "2023-04-10",
  },
]

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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
    <section id="testimonials" ref={sectionRef} className="py-16 bg-white relative overflow-hidden">
      <Script id="testimonials-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              ${testimonials
                .map(
                  (testimonial, index) => `
                {
                  "@type": "ListItem",
                  "position": ${index + 1},
                  "item": {
                    "@type": "Review",
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "${testimonial.rating}",
                      "bestRating": "5"
                    },
                    "author": {
                      "@type": "Person",
                      "name": "${testimonial.name}"
                    },
                    "datePublished": "${testimonial.date}",
                    "reviewBody": "${testimonial.content}",
                    "itemReviewed": {
                      "@type": "Restaurant",
                      "name": "Sharky's Bar",
                      "image": "${SITE_URL}/sharkys_logo.png",
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Marina de Albufeira, Lote 1, Loja 5",
                        "addressLocality": "Albufeira",
                        "addressRegion": "Faro",
                        "postalCode": "8200-394",
                        "addressCountry": "PT"
                      }
                    }
                  }
                }
              `,
                )
                .join(",")}
            ]
          }
        `}
      </Script>

      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-blue-50/50 rounded-full blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl" aria-hidden="true"></div>

      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900">What Our Customers Say</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Don't just take our word for it - hear from our valued customers about their experiences at Sharky's Bar
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-blue-50 rounded-lg p-6 shadow-md relative transition-all duration-500 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              itemScope
              itemType="https://schema.org/Review"
            >
              <meta itemProp="datePublished" content={testimonial.date} />

              <div className="absolute top-6 right-6 text-blue-200">
                <Quote className="h-16 w-16 opacity-20" aria-hidden="true" />
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                    aria-hidden="true"
                  />
                ))}
                <meta itemProp="reviewRating" content={testimonial.rating.toString()} />
              </div>

              <p className="text-gray-700 mb-6 relative z-10" itemProp="reviewBody">
                "{testimonial.content}"
              </p>

              <div className="flex items-center">
                {testimonial.image && (
                  <div className="mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                      itemProp="image"
                    />
                  </div>
                )}

                <div>
                  <h4 className="font-bold text-blue-900" itemProp="author">
                    {testimonial.name}
                  </h4>
                  {testimonial.position && <p className="text-sm text-gray-600">{testimonial.position}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.tripadvisor.co.uk/Attraction_Review-g189112-d10049522-Reviews-Sharky_s_Bar-Albufeira_Faro_District_Algarve.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <span className="mr-2">Read more reviews on TripAdvisor</span>
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
