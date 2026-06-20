import Script from "next/script"

// Component for head elements only
export function InternationalSEOHead() {
  return (
    <>
      {/* Hreflang tags for international SEO */}
      <link rel="alternate" href="https://sharkysbar.com" hrefLang="en" />
      <link rel="alternate" href="https://sharkysbar.com/pt" hrefLang="pt" />
      <link rel="alternate" href="https://sharkysbar.com/es" hrefLang="es" />
      <link rel="alternate" href="https://sharkysbar.com/de" hrefLang="de" />
      <link rel="alternate" href="https://sharkysbar.com/fr" hrefLang="fr" />
      <link rel="alternate" href="https://sharkysbar.com" hrefLang="x-default" />
    </>
  )
}

// Component for body elements
export function InternationalSEOBody() {
  return (
    <>
      {/* International business schema */}
      <Script id="international-business" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            "name": "Sharky's Bar",
            "description": {
              "en": "A friendly bar with a warm atmosphere overlooking Marina de Albufeira.",
              "pt": "Um bar acolhedor com uma atmosfera calorosa com vista para a Marina de Albufeira.",
              "es": "Un bar acogedor con un ambiente cálido con vistas a la Marina de Albufeira.",
              "de": "Eine freundliche Bar mit warmer Atmosphäre mit Blick auf die Marina de Albufeira.",
              "fr": "Un bar convivial avec une atmosphère chaleureuse surplombant la Marina de Albufeira."
            },
            "touristType": ["Tourists", "Locals", "Expats"],
            "availableLanguage": ["English", "Portuguese"]
          }
        `}
      </Script>

      {/* Hidden content for international search terms */}
      <div className="hidden">
        <h2 lang="pt">Bar na Marina de Albufeira</h2>
        <h2 lang="es">Bar en Marina de Albufeira</h2>
        <h2 lang="de">Bar in Marina de Albufeira</h2>
        <h2 lang="fr">Bar à Marina de Albufeira</h2>
      </div>
    </>
  )
}

// Default export for backward compatibility
export default function InternationalSEO() {
  return null
}
