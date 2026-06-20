import Script from "next/script"

// Component for head elements only
export function EATSignalsHead() {
  return null // No head elements in this component
}

// Component for body elements
export function EATSignalsBody() {
  return (
    <>
      {/* Organization Schema with enhanced E-A-T signals */}
      <Script id="organization-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sharky's Bar",
            "url": "https://sharkysbar.com",
            "logo": "https://sharkysbar.com/sharkys_logo.png",
            "foundingDate": "2010",
            "founders": [
              {
                "@type": "Person",
                "name": "Chris Whatley",
                "jobTitle": "Owner"
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Marina de Albufeira, Lote 1, Loja 5",
              "addressLocality": "Albufeira",
              "addressRegion": "Faro",
              "postalCode": "8200-394",
              "addressCountry": "PT"
            },
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+351914120017",
                "contactType": "customer service",
                "availableLanguage": ["English", "Portuguese"]
              }
            ],
            "sameAs": [
              "https://www.facebook.com/share/18zhz9ogBu/?mibextid=wwXIfr",
              "https://www.tripadvisor.co.uk/Attraction_Review-g189112-d10049522-Reviews-Sharky_s_Bar-Albufeira_Faro_District_Algarve.html",
              "https://www.instagram.com/sharkysbaralbufeira/"
            ],
            "award": [
              "TripAdvisor Certificate of Excellence 2022",
              "Best Bar in Albufeira 2021"
            ],
            "knowsAbout": [
              "Cocktails",
              "Sports Bar",
              "Marina de Albufeira",
              "Algarve Tourism",
              "Portuguese Hospitality"
            ]
          }
        `}
      </Script>

      {/* About the team section for E-A-T */}
      <div className="hidden">
        <h2>About the Sharky's Bar Team</h2>
        <p>
          Sharky's Bar was founded in 2010 by Chris Whatley, who has over 20 years of experience in the hospitality
          industry. Our team consists of professional bartenders and chefs who are passionate about providing excellent
          service and quality food and drinks.
        </p>
        <p>
          Our head bartender has been crafting cocktails for over 15 years and has won several local competitions. Our
          chef trained at a culinary school in Lisbon and specializes in both traditional Portuguese dishes and
          international bar favorites.
        </p>
        <p>
          We pride ourselves on our knowledge of sports, cocktails, and local attractions, making us the perfect hosts
          for your visit to Albufeira.
        </p>
      </div>
    </>
  )
}

// Default export for backward compatibility
export default function EATSignals() {
  return null
}
