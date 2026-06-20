"use client"

import { useEffect } from "react"
import Script from "next/script"

export default function CoreWebVitals() {
  useEffect(() => {
    // Optimize Largest Contentful Paint (LCP)
    const preloadLCP = () => {
      // Preload hero image
      const linkEl = document.createElement("link")
      linkEl.rel = "preload"
      linkEl.as = "image"
      linkEl.href = "/decking.jpg"
      document.head.appendChild(linkEl)
    }

    // Optimize Cumulative Layout Shift (CLS)
    const preventCLS = () => {
      // Reserve space for dynamic content
      document.querySelectorAll("[data-height]").forEach((el) => {
        const element = el as HTMLElement
        if (element.dataset.height) {
          element.style.minHeight = `${element.dataset.height}px`
        }
      })
    }

    // Optimize First Input Delay (FID)
    const optimizeFID = () => {
      // Use requestIdleCallback to defer non-critical work
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => {
          // Load non-critical resources
          const nonCriticalCSS = document.createElement("link")
          nonCriticalCSS.rel = "stylesheet"
          nonCriticalCSS.href = "/non-critical.css"
          document.head.appendChild(nonCriticalCSS)
        })
      }
    }

    // Execute optimizations
    preloadLCP()
    preventCLS()
    optimizeFID()

    // Clean up function
    return () => {
      // Any cleanup if needed
    }
  }, [])

  return (
    <>
      {/* Inline critical CSS */}
      <style jsx global>{`
        /* Critical CSS for above-the-fold content */
        .hero {
          min-height: 100vh;
          position: relative;
        }
        .hero-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          width: 100%;
          max-width: 1200px;
          padding: 0 1rem;
        }
      `}</style>

      {/* Web Vitals monitoring - fixed to avoid circular references */}
      <Script
        id="web-vitals"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Simple Web Vitals monitoring
            function sendToAnalytics(metric) {
              // Create a safe copy of the metric without circular references
              const safeMetric = {
                name: metric.name,
                value: metric.value,
                // Only include primitive values and avoid DOM elements
                id: typeof metric.id === 'string' ? metric.id : 'unknown'
              };
              
              const body = JSON.stringify(safeMetric);
              
              // Use Navigator.sendBeacon() when available
              if (navigator.sendBeacon) {
                navigator.sendBeacon('/api/vitals', body);
              } else {
                // Fall back to fetch()
                fetch('/api/vitals', {
                  body,
                  method: 'POST',
                  keepalive: true,
                });
              }
            }
            
            // Basic LCP measurement
            let lcpDone = false;
            try {
              new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                if (lastEntry && !lcpDone) {
                  lcpDone = true;
                  const metric = {
                    name: 'LCP',
                    value: lastEntry.startTime,
                    id: 'lcp-' + Date.now()
                  };
                  sendToAnalytics(metric);
                }
              }).observe({type: 'largest-contentful-paint', buffered: true});
            } catch (e) {
              console.error('LCP monitoring error:', e);
            }
            
            // Basic CLS measurement
            let clsValue = 0;
            try {
              new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                  if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                  }
                }
                const metric = {
                  name: 'CLS',
                  value: clsValue,
                  id: 'cls-' + Date.now()
                };
                sendToAnalytics(metric);
              }).observe({type: 'layout-shift', buffered: true});
            } catch (e) {
              console.error('CLS monitoring error:', e);
            }
            
            // Basic FID measurement
            try {
              new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                  // Avoid passing DOM elements directly
                  const targetInfo = entry.target ? 'interactive-element' : 'unknown';
                  const metric = {
                    name: 'FID',
                    value: entry.processingStart - entry.startTime,
                    id: 'fid-' + Date.now()
                  };
                  sendToAnalytics(metric);
                }
              }).observe({type: 'first-input', buffered: true});
            } catch (e) {
              console.error('FID monitoring error:', e);
            }
          `,
        }}
      />
    </>
  )
}
