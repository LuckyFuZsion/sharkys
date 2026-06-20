"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Tv, Calendar, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DEFAULT_SPORTS_PROMO_URL } from "@/lib/sports-promo-constants"

function seededUnit(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

const SPORTS_FLOATING_BUBBLES = Array.from({ length: 20 }, (_, index) => ({
  width: seededUnit(index, 1) * 10 + 5,
  height: seededUnit(index, 2) * 10 + 5,
  top: seededUnit(index, 3) * 100,
  left: seededUnit(index, 4) * 100,
  duration: seededUnit(index, 5) * 10 + 10,
  delay: seededUnit(index, 6) * 5,
}))

export default function Sports() {
  const [isVisible, setIsVisible] = useState(false)
  const [promoImageUrl, setPromoImageUrl] = useState(DEFAULT_SPORTS_PROMO_URL)
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

  useEffect(() => {
    fetch("/api/sports-promo")
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          setPromoImageUrl(data.url)
        }
      })
      .catch(() => {
        setPromoImageUrl(DEFAULT_SPORTS_PROMO_URL)
      })
  }, [])

  // This would typically come from your CMS or database
  const upcomingEvents = [
    { id: 1, title: "Monaco F1 Grand Prix", date: "Sunday", time: "15:00", featured: true },
    { id: 2, title: "Liverpool vs Crystal Palace", date: "Sunday", time: "16:00", featured: true },
    { id: 3, title: "Chelsea vs Nottingham Forest", date: "Sunday", time: "16:00", featured: true },
    { id: 4, title: "Newcastle vs Everton", date: "Sunday", time: "16:00", featured: true },
    { id: 5, title: "Arsenal vs Brighton", date: "Monday", time: "20:00" },
    { id: 6, title: "Man City vs West Ham", date: "Tuesday", time: "19:45" },
    { id: 7, title: "Tottenham vs Fulham", date: "Wednesday", time: "20:15" },
    { id: 8, title: "Man Utd vs Wolves", date: "Thursday", time: "20:00" },
  ]

  // Weekend sports promo display
  const WeekendSportsPromo = () => (
    <div className="mb-8 transform hover:scale-[1.02] transition-transform duration-500">
      <div className="relative rounded-lg overflow-hidden shadow-xl">
        <Image
          src={promoImageUrl}
          alt="This Sunday at Sharky's Bar - Monaco F1 Grand Prix and Premier League matches"
          width={600}
          height={600}
          className="w-full object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-black/70 px-4 py-2 rounded-full text-white font-bold flex items-center">
            <Trophy className="w-4 h-4 mr-2" />
            <span>Big Sunday!</span>
          </div>
        </div>
      </div>
    </div>
  )

  // Add the weekend sports promo image
  const showWeekendPromo = true

  return (
    <section
      id="sports"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-blue-900 to-blue-800 text-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {SPORTS_FLOATING_BUBBLES.map((bubble, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  width: `${bubble.width}px`,
                  height: `${bubble.height}px`,
                  top: `${bubble.top}%`,
                  left: `${bubble.left}%`,
                  animation: `float ${bubble.duration}s infinite ease-in-out`,
                  animationDelay: `${bubble.delay}s`,
                }}
              ></div>
            ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div
          className={`flex items-center justify-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-lg animate-pulse"></div>
            <Tv className="h-8 w-8 mr-3 relative" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Live Sports</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <p className="text-lg mb-6">
              At Sharky&apos;s Bar, we&apos;re passionate about sports! Catch all the major sporting events live on our
              multiple screens throughout the bar.
            </p>
            <p className="text-lg mb-8">
              From football and rugby to Formula 1 and UFC, we show it all. Enjoy the game with great food, cold drinks,
              and a fantastic atmosphere.
            </p>

            {showWeekendPromo ? (
              <WeekendSportsPromo />
            ) : (
              <div className="bg-blue-800/50 rounded-lg p-6 mb-8 backdrop-blur-sm border border-white/10 transform hover:scale-[1.01] transition-transform">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 mr-2" />
                  <h3 className="text-xl font-semibold">Upcoming Events</h3>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className={`flex justify-between pb-2 border-b border-blue-700 transition-all hover:border-blue-500 ${
                        event.featured ? "bg-blue-700/30 p-2 rounded-md -mx-2" : ""
                      }`}
                      style={{
                        transitionDelay: `${index * 100}ms`,
                        transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                        opacity: isVisible ? 1 : 0,
                        transition: "all 0.5s ease-out",
                      }}
                    >
                      <div>
                        <p className={`font-medium ${event.featured ? "text-yellow-300" : ""}`}>{event.title}</p>
                        <p className="text-sm text-blue-200">{event.date}</p>
                      </div>
                      <span className="font-medium">{event.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              className="bg-white text-blue-900 hover:bg-blue-100 transform hover:scale-105 transition-all shadow-lg hover:shadow-white/20"
              onClick={() => (window.location.href = "#menu")}
            >
              View Food & Drinks
            </Button>
          </div>

          <div
            className={`relative transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 translate-x-10 rotate-2"
            }`}
          >
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-700">
              <Image
                src="/images/sports-crowd.jpg"
                alt="Crowd watching live sports at Sharky's Bar"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Overlay with TV screen effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

              {/* TV scan lines effect */}
              <div
                className="absolute inset-0 bg-repeat-y opacity-10"
                style={{
                  backgroundImage: "linear-gradient(transparent 50%, rgba(255,255,255,0.05) 50%)",
                  backgroundSize: "100% 4px",
                }}
              ></div>

              {/* Glowing edge */}
              <div className="absolute inset-0 border border-blue-400/30 rounded-lg"></div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/40 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/40 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/40 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/40 rounded-br-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
