"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { MapPin, Clock, Phone, Play, RefreshCw } from "lucide-react"
import Image from "next/image"
import { ABOUT_VIDEO_POSTER, ABOUT_VIDEO_URL } from "@/lib/about-video"
import { useLocaleContext } from "@/components/locale-provider"

export default function About() {
  const { dictionary } = useLocaleContext()
  const about = dictionary.about
  const [videoError, setVideoError] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [userRequestedPlay, setUserRequestedPlay] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const readyHandled = useRef(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)")
    const update = () => setIsMobile(mediaQuery.matches)
    update()
    mediaQuery.addEventListener("change", update)
    return () => mediaQuery.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2, rootMargin: "100px" },
    )

    const section = sectionRef.current
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  useEffect(() => {
    if (isVisible && !isMobile) {
      setShouldLoadVideo(true)
    }
  }, [isVisible, isMobile])

  const tryPlay = useCallback(async () => {
    const video = videoRef.current
    if (!video) return

    try {
      await video.play()
      setVideoPlaying(true)
      setVideoError(false)
    } catch {
      // Autoplay can be blocked; poster and play button stay available.
    }
  }, [])

  const handleVideoReady = useCallback(async () => {
    if (readyHandled.current) return
    readyHandled.current = true
    setVideoReady(true)
    await tryPlay()
  }, [tryPlay])

  const handleVideoError = () => {
    setVideoError(true)
    setVideoPlaying(false)
  }

  const startPlayback = useCallback(async () => {
    setVideoError(false)
    setVideoReady(false)
    setVideoPlaying(false)
    setUserRequestedPlay(true)
    readyHandled.current = false
    setShouldLoadVideo(true)

    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

    const video = videoRef.current
    if (!video) return

    if (video.error) {
      video.load()
    }

    await tryPlay()
  }, [tryPlay])

  const showPlayButton =
    isVisible && !videoPlaying && ((isMobile && !userRequestedPlay) || videoError)
  const isLoading =
    shouldLoadVideo && !videoReady && !videoError && (!isMobile || userRequestedPlay)

  return (
    <section id="about" ref={sectionRef} className="py-12 bg-white relative overflow-hidden">
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
          {about.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <p className="text-lg mb-6 text-gray-700">
              {about.paragraph1}
            </p>
            <p className="text-lg mb-6 text-gray-700">
              {about.paragraph2}
            </p>
            <p className="text-lg mb-8 text-gray-700">
              {about.paragraph3}
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
                <span className="text-gray-700">{about.openDaily}</span>
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
            <div
              className="absolute inset-0 transform hover:scale-105 transition-transform duration-700 ease-in-out"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Image
                src={ABOUT_VIDEO_POSTER}
                alt="Interior of Sharky's Bar showing the cozy seating area and bar"
                fill
                className={`object-cover transition-opacity duration-500 ${
                  videoReady ? "opacity-0" : "opacity-100"
                }`}
                priority={isVisible}
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {shouldLoadVideo && (
                <div
                  className={`absolute inset-0 w-full h-full about-video-container transition-opacity duration-500 ${
                    videoReady ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <video
                    ref={videoRef}
                    src={ABOUT_VIDEO_URL}
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay={!isMobile}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onLoadedData={handleVideoReady}
                    onPlaying={() => setVideoPlaying(true)}
                    onPause={() => setVideoPlaying(false)}
                    onError={handleVideoError}
                  />
                </div>
              )}

              {isLoading && (
                <div
                  className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none"
                  aria-label="Loading video"
                  role="status"
                >
                  <p className="rounded-full bg-black/50 px-4 py-2 text-sm font-medium text-white">
                    {about.videoLoading}
                  </p>
                </div>
              )}

              {showPlayButton && (
                <button
                  type="button"
                  onClick={startPlayback}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/30 transition-colors hover:bg-black/40"
                  aria-label="Play Sharky's Bar tour video"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
                    <Play className="h-8 w-8 translate-x-0.5 fill-current" aria-hidden="true" />
                  </span>
                  <span className="mt-3 text-sm font-medium text-white drop-shadow">
                    {videoError ? "Tap to retry video" : "Play tour video"}
                  </span>
                </button>
              )}

              {(isHovering || videoError) && !showPlayButton && (
                <button
                  type="button"
                  onClick={startPlayback}
                  className="absolute z-20 bottom-4 right-4 bg-blue-600/80 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
                  aria-label="Reload video"
                  title="Reload video"
                >
                  <RefreshCw className="w-6 h-6" />
                </button>
              )}
            </div>

            <div
              className="absolute inset-0 border-4 border-white/20 rounded-lg pointer-events-none"
              aria-hidden="true"
            ></div>

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
