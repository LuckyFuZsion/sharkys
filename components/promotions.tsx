"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function Promotions() {
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
    <section id="promotions" ref={sectionRef} className="py-8 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" aria-hidden="true"></div>
      <div
        className="absolute bottom-10 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4 relative">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-2 text-blue-900 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Special Offers
        </h2>
        <p
          className={`text-center text-gray-600 mb-6 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Take advantage of our amazing promotions and special offers at Sharky&apos;s Bar
        </p>

        <div
          className={`flex justify-center transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <div className="relative w-full max-w-3xl rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
            <Image
              src="https://gxciioabwrkahdfe.public.blob.vercel-storage.com/logos/Untitled%20design%20%2816%29-pDiLkUZZIIEhOFv3STgQlZmSSN7AMK.png"
              alt="Sharky's Sunset Special - Half Price Cocktails 6PM-8PM Everyday with marina view and cocktail selection"
              width={1000}
              height={600}
              className="w-full"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
