"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Parallax Hero Background Image */}
      <div className="absolute inset-0 z-0" style={{ transform: `translateY(${scrollY * 0.15}px)` }}>
        <Image
          src="/decking.jpg"
          alt="Sharky's Bar Decking with beautiful marina view"
          fill
          priority
          className="object-cover scale-110"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-10"></div>
      </div>

      {/* Floating Elements */}
      <div
        className="absolute top-1/4 left-[10%] w-24 h-24 rounded-full bg-blue-400/20 blur-xl animate-pulse"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-1/3 right-[15%] w-32 h-32 rounded-full bg-blue-600/10 blur-xl animate-pulse"
        style={{ animationDelay: "1s" }}
        aria-hidden="true"
      ></div>

      {/* Hero Content */}
      <div
        className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start text-white pt-16"
        style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow animate-fade-in-up">
          Welcome to{" "}
          <span className="text-blue-400 relative inline-block">
            Sharky&apos;s Bar
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-6 max-w-2xl text-shadow animate-fade-in-up animation-delay-200">
          Waterfront sports bar at Marina de Albufeira. Breakfast, live sports on multiple screens, and handcrafted
          cocktails with stunning marina views.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
          <a href="#menu" aria-label="View our food and drinks menu">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/50"
            >
              View Our Menu
            </Button>
          </a>
          <a href="#contact" aria-label="Find our location and contact information">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-blue-400 hover:bg-white/10 transform hover:scale-105 transition-all backdrop-blur-sm"
            >
              Find Us
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce" aria-hidden="true">
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-1">
          <div className="w-1 h-3 bg-white/80 rounded-full animate-scroll-down"></div>
        </div>
      </div>
    </section>
  )
}
