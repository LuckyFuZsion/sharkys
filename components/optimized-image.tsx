"use client"

import { useState, useEffect, useRef } from "react"
import Image, { type ImageProps } from "next/image"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  lowQualitySrc?: string
  lazyLoad?: boolean
  fadeIn?: boolean
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  lowQualitySrc,
  lazyLoad = true,
  fadeIn = true,
  priority = false,
  className = "",
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Use Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazyLoad || priority) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "200px" }, // Start loading when image is 200px from viewport
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [lazyLoad, priority])

  const handleLoad = () => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }

  const handleError = () => {
    setError(true)
    if (onError) onError()
  }

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (typeof src !== "string") return undefined

    // This is a simplified example - in a real app, you'd generate multiple sizes
    return `${src} 1x, ${src} 2x`
  }

  return (
    <div className="relative overflow-hidden" ref={imgRef}>
      {lowQualitySrc && !isLoaded && !error && (
        <Image
          src={lowQualitySrc || "/placeholder.svg"}
          alt={alt}
          className={`${className} absolute inset-0 blur-md`}
          {...props}
        />
      )}

      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        className={`${className} ${fadeIn ? "transition-opacity duration-500" : ""} ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        {...props}
      />

      {/* Fallback for error */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <span className="text-gray-500">Image not available</span>
        </div>
      )}
    </div>
  )
}
