"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function SunsetSpecial() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-8 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className={`flex justify-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative w-full max-w-3xl rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent z-10"></div>
            <h2 className="sr-only">Sharky's Sunset Special - Half Price on All Cocktails</h2>
            <div className="absolute top-0 left-0 w-full py-2 bg-blue-900/50 text-center text-white font-bold z-20">
              PROMOTIONS
            </div>
            <Image
              src="https://gxciioabwrkahdfe.public.blob.vercel-storage.com/logos/Untitled%20design%20%2816%29-pDiLkUZZIIEhOFv3STgQlZmSSN7AMK.png"
              alt="Sharky's Sunset Special - Half Price Cocktails 6PM-8PM Everyday"
              width={1000}
              height={600}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" fill="white" className="w-full h-6">
          <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48 Z"></path>
        </svg>
      </div>
    </section>
  )
}
