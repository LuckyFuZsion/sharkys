"use client"

import { useEffect } from "react"
import Script from "next/script"

export default function PerformanceOptimizations() {
  // Preload critical resources
  useEffect(() => {
    // Preload important images
    const preloadLinks = [
      { href: "/decking.jpg", as: "image" },
      { href: "/sharkys_logo.png", as: "image" },
      { href: "/images/sharkys-sunset-special.jpeg", as: "image" },
    ]

    preloadLinks.forEach((link) => {
      const linkEl = document.createElement("link")
      linkEl.rel = "preload"
      linkEl.href = link.href
      linkEl.as = link.as
      document.head.appendChild(linkEl)
    })

    // Lazy load non-critical resources
    const lazyLoadObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLImageElement
          if (target.dataset.src) {
            target.src = target.dataset.src
            lazyLoadObserver.unobserve(target)
          }
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      lazyLoadObserver.observe(img)
    })

    return () => {
      lazyLoadObserver.disconnect()
    }
  }, [])

  return (
    <>
      {/* Inline critical CSS */}
      <style jsx global>{`
        /* Critical CSS for above-the-fold content */
        body {
          display: block;
          opacity: 1;
        }
        .hero-visible {
          opacity: 1;
          transition: opacity 0.5s ease-in;
        }
      `}</style>

      {/* Defer non-critical JavaScript */}
      <Script
        id="analytics-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            // Analytics code would go here
            console.log('Analytics loaded');
          `,
        }}
      />
    </>
  )
}
