"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Clock, Phone, RefreshCw } from "lucide-react"
import Image from "next/image"

export default function About() {
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // YouTube video ID - extracted from the shorts URL
  const videoId = "uHK2BiBjNKA"

  // Force reload with key change
  const [iframeKey, setIframeKey] = useState(0)
  const [iframeSrc, setIframeSrc] = useState<string | null>(null)

  // Reset error state if component remounts
  useEffect(() => {
    setVideoError(false)
    setVideoLoaded(false)
  }, [])

  useEffect(() => {
    setIframeSrc(
      `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&fs=0&disablekb=1&origin=${encodeURIComponent(window.location.origin)}`,
    )
  }, [iframeKey])

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

  const handleVideoError = () => {
    console.error("Video failed to load")
    setVideoError(true)
  }

  const handleVideoLoaded = () => {
    setVideoLoaded(true)
  }

  const reloadVideo = () => {
    setVideoLoaded(false)
    setVideoError(false)
    // Force iframe reload by changing its key
    setIframeKey((prev) => prev + 1)
  }

  return (
    <section id="about" ref={sectionRef} className="py-12 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div
        className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full opacity-40 translate-x-1/3 translate-y-1/3"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4 relative">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          About Sharky&apos;s Bar
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <p className="text-lg mb-6 text-gray-700">
              Sharky&apos;s Bar is a friendly sports bar and café on the Marina de Albufeira waterfront. We serve
              breakfast, drinks, and live sports in a welcoming setting for visitors and locals alike.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              Our welcoming bar offers the perfect setting to relax and enjoy stunning views of the harbour from our
              spacious decking area. Inside, you&apos;ll find a cosy, inviting space perfect for any occasion.
            </p>
            <p className="text-lg mb-8 text-gray-700">
              Whether you&apos;re here for a full English breakfast, to watch live sports on our screens, or for
              half-price cocktails during our Sunset Special, Sharky&apos;s is one of the best marina bars in
              Albufeira.
            </p>

            <address className="space-y-4 relative not-italic">
              <div
                className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-200 rounded-full"
                aria-hidden="true"
              ></div>
              <div className="flex items-center gap-3 card-hover p-2 rounded-md">
                <MapPin className="h-6 w-6 text-blue-600" aria-hidden="true" />
                <span className="text-gray-700">Marina de Albufeira, Lote 1, Loja 5, Albufeira, Portugal</span>
              </div>
              <div className="flex items-center gap-3 card-hover p-2 rounded-md">
                <Clock className="h-6 w-6 text-blue-600" aria-hidden="true" />
                <span className="text-gray-700">Open every day until late</span>
              </div>
              <div className="flex items-center gap-3 card-hover p-2 rounded-md">
                <Phone className="h-6 w-6 text-blue-600" aria-hidden="true" />
                <a href="tel:+351914120017" className="text-gray-700 hover:text-blue-600 transition-colors">
                  +351 914 120 017
                </a>
              </div>
            </address>
          </div>

          <div
            className={`relative h-[414px] md:h-[460px] rounded-lg overflow-hidden shadow-xl transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 translate-x-10 rotate-2"
            }`}
          >
            {/* Video container with 3D effect */}
            <div
              className="absolute inset-0 transform hover:scale-105 transition-transform duration-700 ease-in-out"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Show loading state until video loads or errors */}
              {!videoLoaded && !videoError && (
                <div
                  className="absolute inset-0 bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center overflow-hidden"
                  aria-label="Loading video"
                  role="status"
                >
                  {/* Wave animation */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
                    <div
                      className="absolute bottom-[-10px] left-0 right-0 h-24 w-[200%] animate-wave"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%231e40af' opacity='.25'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' fill='%231e40af' opacity='.5'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%231e40af' opacity='.75'%3E%3C/path%3E%3C/svg%3E\")",
                        backgroundSize: "cover",
                        backgroundRepeat: "repeat-x",
                      }}
                    ></div>
                  </div>

                  {/* Shark fin loader */}
                  <div className="relative mb-12">
                    <div className="w-16 h-16 relative">
                      <div className="absolute w-10 h-10 bg-blue-600 rounded-full left-3 top-3 animate-pulse"></div>
                      <svg viewBox="0 0 100 100" className="w-full h-full animate-rock">
                        <path
                          d="M50,20 C60,40 90,50 50,80 C10,50 40,40 50,20"
                          fill="#1e40af"
                          className="drop-shadow-lg"
                        />
                      </svg>
                    </div>
                    <p className="text-blue-800 font-medium mt-4 animate-pulse">Loading Sharky's Bar video...</p>
                  </div>
                </div>
              )}

              {/* Fallback image in case video fails */}
              {videoError && (
                <div className="relative w-full h-full">
                  <Image
                    src="/interior.jpg"
                    alt="Interior of Sharky's Bar showing the cozy seating area and bar"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white/90 p-4 rounded-lg max-w-xs text-center">
                      <p className="text-blue-900 font-medium">Video unavailable</p>
                      <p className="text-sm text-gray-600 mt-1">Please check back later or visit us in person!</p>
                    </div>
                  </div>
                </div>
              )}

              {/* YouTube embed with enhanced no-controls approach and zoomed in */}
              {!videoError && (
                <div
                  ref={containerRef}
                  className={`absolute inset-0 w-full h-full ${
                    videoLoaded ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-500 youtube-container`}
                >
                  {/* Overlay to prevent YouTube controls from appearing on click */}
                  <div className="absolute inset-0 z-10" onClick={(e) => e.preventDefault()}></div>

                  {iframeSrc && (
                    <iframe
                      key={iframeKey}
                      ref={iframeRef}
                      src={iframeSrc}
                      title="Sharky's Bar Tour - See our beautiful marina location and interior"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      className="absolute inset-0 w-full h-full object-cover"
                      onLoad={handleVideoLoaded}
                      onError={handleVideoError}
                      loading="lazy"
                      style={{ pointerEvents: "none" }}
                    ></iframe>
                  )}
                </div>
              )}

              {/* Reload button */}
              {(isHovering || videoError) && (
                <button
                  onClick={reloadVideo}
                  className="absolute z-20 bottom-4 right-4 bg-blue-600/80 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
                  aria-label="Reload video"
                  title="Reload video"
                >
                  <RefreshCw className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Decorative frame */}
            <div
              className="absolute inset-0 border-4 border-white/20 rounded-lg pointer-events-none"
              aria-hidden="true"
            ></div>

            {/* Corner accents */}
            <div
              className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-400 rounded-tl-lg"
              aria-hidden="true"
            ></div>
            <div
              className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-400 rounded-tr-lg"
              aria-hidden="true"
            ></div>
            <div
              className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400 rounded-bl-lg"
              aria-hidden="true"
            ></div>
            <div
              className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-400 rounded-br-lg"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Add animation styles for wave and rock animations
declare global {
  interface CSSStyleDeclaration {
    animationName: string
    animationDuration: string
    animationTimingFunction: string
    animationDelay: string
    animationIterationCount: string
    animationDirection: string
    animationFillMode: string
    animationPlayState: string
  }
}
