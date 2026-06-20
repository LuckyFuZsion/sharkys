import Script from "next/script"

// Component for head elements only
export function VoiceSearchOptimizationHead() {
  return null // No head elements in this component
}

// Component for body elements
export function VoiceSearchOptimizationBody() {
  return (
    <>
      {/* This component adds structured data specifically for voice search */}
      <Script id="speakable-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": ["#hero h1", "#about p", ".faq-question", ".faq-answer"]
            },
            "url": "https://sharkysbar.com"
          }
        `}
      </Script>

      {/* Add natural language phrases that match voice queries */}
      <div className="hidden">
        <p>Where is Sharky's Bar located?</p>
        <p>Sharky's Bar is located at Marina de Albufeira, Lote 1, Loja 5, Albufeira, Portugal.</p>

        <p>What time does Sharky's Bar open?</p>
        <p>Sharky's Bar opens at 10:00 AM every day.</p>

        <p>Does Sharky's Bar serve food?</p>
        <p>Yes, Sharky's Bar serves freshly made food daily until 7:00 PM.</p>

        <p>What sports can I watch at Sharky's Bar?</p>
        <p>At Sharky's Bar, you can watch football, rugby, Formula 1, UFC, and other major sporting events.</p>

        <p>How to get to Sharky's Bar?</p>
        <p>
          Sharky's Bar is located at Marina de Albufeira. You can reach us by walking along the marina or taking a taxi
          to Marina de Albufeira.
        </p>
      </div>
    </>
  )
}

// Default export for backward compatibility
export default function VoiceSearchOptimization() {
  return null
}
