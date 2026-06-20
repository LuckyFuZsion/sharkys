// JSON-LD generator utility for structured data
export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: "Sharky's Bar",
    image: "https://sharkysbar.com/sharkys_logo.png",
    url: "https://sharkysbar.com",
    telephone: "+351914120017",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marina de Albufeira, Lote 1, Loja 5",
      addressLocality: "Albufeira",
      addressRegion: "Faro",
      postalCode: "8200-394",
      addressCountry: "PT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.084,
      longitude: -8.2619,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "10:00",
        closes: "02:00",
      },
    ],
    servesCuisine: ["Bar Food", "International", "British"],
    menu: "https://sharkysbar.com/#menu",
    acceptsReservations: "True",
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "tel:+351914120017",
        inLanguage: "en",
        actionPlatform: ["http://schema.org/MobileWebPlatform", "http://schema.org/DesktopWebPlatform"],
      },
      result: {
        "@type": "Reservation",
        name: "Table Reservation",
      },
    },
    hasMenu: {
      "@type": "Menu",
      name: "Sharky's Bar Menu",
      description: "Food and drinks menu for Sharky's Bar in Marina de Albufeira",
      url: "https://sharkysbar.com/#menu",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "247",
    },
  }
}

export const generateEventSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Sunset Special - Half Price Cocktails",
    startDate: "2023-01-01T18:00",
    endDate: "2023-12-31T20:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Sharky's Bar",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Marina de Albufeira, Lote 1, Loja 5",
        addressLocality: "Albufeira",
        addressRegion: "Faro",
        postalCode: "8200-394",
        addressCountry: "PT",
      },
    },
    image: ["https://sharkysbar.com/images/sharkys-sunset-special.jpeg"],
    description: "Enjoy half price on all cocktails daily from 6PM to 8PM at Sharky's Bar.",
    offers: {
      "@type": "Offer",
      url: "https://sharkysbar.com/#promotions",
      price: "4.25",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      validFrom: "2023-01-01T18:00",
    },
    organizer: {
      "@type": "Organization",
      name: "Sharky's Bar",
      url: "https://sharkysbar.com",
    },
  }
}

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export const generateVideoSchema = (video: {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  contentUrl: string
  embedUrl?: string
  duration?: string
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    contentUrl: video.contentUrl,
    ...(video.embedUrl && { embedUrl: video.embedUrl }),
    ...(video.duration && { duration: video.duration }),
    publisher: {
      "@type": "Organization",
      name: "Sharky's Bar",
      logo: {
        "@type": "ImageObject",
        url: "https://sharkysbar.com/sharkys_logo.png",
        width: "112",
        height: "112",
      },
    },
  }
}

export const generateSpeakableSchema = (cssSelectors: string[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
    url: "https://sharkysbar.com",
  }
}
