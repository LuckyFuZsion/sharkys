"use client"

import { useEffect } from "react"
import Script from "next/script"
import { Facebook, Twitter, Instagram } from "lucide-react"
import { SITE_URL } from "@/lib/site-config"

export default function SocialIntegration() {
  useEffect(() => {
    // Add Open Graph meta tags dynamically
    const addOpenGraphTags = () => {
      const metaTags = [
        { property: "og:type", content: "website" },
        { property: "og:url", content: SITE_URL },
        { property: "og:title", content: "Sharky's Bar | Marina de Albufeira | Sports, Food & Cocktails" },
        {
          property: "og:description",
          content:
            "A friendly bar with a warm atmosphere overlooking Marina de Albufeira. Enjoy live sports, freshly made food, and cocktails!",
        },
        { property: "og:image", content: `${SITE_URL}/images/sharkys-og-image.jpg` },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:locale", content: "en_GB" },
        { property: "og:site_name", content: "Sharky's Bar" },

        // Twitter Card tags
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Sharky's Bar | Marina de Albufeira" },
        {
          name: "twitter:description",
          content:
            "A friendly bar with a warm atmosphere overlooking Marina de Albufeira. Enjoy live sports, freshly made food, and cocktails!",
        },
        { name: "twitter:image", content: `${SITE_URL}/images/sharkys-og-image.jpg` },
      ]

      metaTags.forEach((tag) => {
        const meta = document.createElement("meta")
        const key = Object.keys(tag)[0]
        const value = Object.values(tag)[0]
        meta.setAttribute(key, value as string)
        document.head.appendChild(meta)
      })
    }

    addOpenGraphTags()
  }, [])

  return (
    <>
      {/* Social sharing buttons */}
      <div className="flex space-x-4 my-6">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1877F2] text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-5 w-5" />
        </a>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent("Check out Sharky's Bar in Marina de Albufeira!")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1DA1F2] text-white p-2 rounded-full hover:bg-blue-400 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-5 w-5" />
        </a>

        <a
          href="https://www.instagram.com/sharkysbaralbufeira/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#E4405F] text-white p-2 rounded-full hover:bg-pink-600 transition-colors"
          aria-label="Follow on Instagram"
        >
          <Instagram className="h-5 w-5" />
        </a>
      </div>

      {/* Facebook comments integration */}
      <div className="my-8">
        <h3 className="text-xl font-bold mb-4">Leave a Comment</h3>
        <div
          id="fb-comments"
          className="fb-comments"
          data-href={SITE_URL}
          data-width="100%"
          data-numposts="5"
        ></div>
      </div>

      {/* Facebook SDK */}
      <Script
        id="facebook-jssdk"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.fbAsyncInit = function() {
              FB.init({
                appId: '123456789',
                xfbml: true,
                version: 'v12.0'
              });
            };
            
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "https://connect.facebook.net/en_US/sdk.js";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          `,
        }}
      />
    </>
  )
}
