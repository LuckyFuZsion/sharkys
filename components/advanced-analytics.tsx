"use client"

import { useEffect } from "react"
import Script from "next/script"

export default function AdvancedAnalytics() {
  useEffect(() => {
    // Track user engagement
    const trackEngagement = () => {
      let scrollDepth = 0
      let timeOnPage = 0
      let timer: NodeJS.Timeout

      // Track scroll depth
      const handleScroll = () => {
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const scrollTop = window.scrollY

        const currentScrollDepth = Math.floor(((scrollTop + windowHeight) / documentHeight) * 100)

        if (currentScrollDepth > scrollDepth) {
          scrollDepth = currentScrollDepth

          // Send scroll depth to analytics at 25%, 50%, 75%, and 100%
          if (scrollDepth === 25 || scrollDepth === 50 || scrollDepth === 75 || scrollDepth === 100) {
            console.log(`Scroll depth: ${scrollDepth}%`)
            // In a real implementation, you would send this to your analytics service
          }
        }
      }

      // Track time on page
      const startTimer = () => {
        timer = setInterval(() => {
          timeOnPage += 1

          // Send time on page to analytics every 30 seconds
          if (timeOnPage % 30 === 0) {
            console.log(`Time on page: ${timeOnPage} seconds`)
            // In a real implementation, you would send this to your analytics service
          }
        }, 1000)
      }

      // Track clicks on important elements - fixed to avoid circular references
      const trackClicks = () => {
        const importantElements = document.querySelectorAll("[data-track]")

        importantElements.forEach((element) => {
          element.addEventListener("click", (e) => {
            const target = e.currentTarget as HTMLElement
            const trackData = target.dataset.track || "unknown"

            // Avoid passing DOM elements directly
            console.log(`Clicked: ${trackData}`)

            // Safe way to send click data to analytics
            const clickData = {
              element: trackData,
              timestamp: new Date().toISOString(),
              path: window.location.pathname,
            }

            // In a real implementation, you would send this to your analytics service
            // Example: sendToAnalytics('click', clickData)
          })
        })
      }

      // Initialize tracking
      window.addEventListener("scroll", handleScroll)
      startTimer()
      trackClicks()

      // Clean up
      return () => {
        window.removeEventListener("scroll", handleScroll)
        clearInterval(timer)
      }
    }

    // Execute tracking
    const cleanup = trackEngagement()

    return cleanup
  }, [])

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />

      {/* Google Tag Manager */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `,
        }}
      />

      {/* Custom event tracking - fixed to avoid circular references */}
      <Script
        id="custom-events"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Track form submissions
            document.addEventListener('submit', function(e) {
              const form = e.target;
              if (form && form.id) {
                // Only pass the form ID, not the entire form element
                gtag('event', 'form_submission', {
                  'form_id': form.id
                });
              }
            });
            
            // Track outbound links
            document.addEventListener('click', function(e) {
              const target = e.target.closest('a');
              if (target && target.hostname && target.hostname !== window.location.hostname) {
                // Only pass the URL as a string, not the entire anchor element
                gtag('event', 'outbound_link', {
                  'url': target.href
                });
              }
            });
          `,
        }}
      />
    </>
  )
}
