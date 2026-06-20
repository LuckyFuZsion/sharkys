export type Locale = "en" | "pt" | "es" | "fr" | "de"

export type FAQItem = {
  question: string
  answer: string
}

export type Dictionary = {
  meta: {
    home: { title: string; description: string }
    menu: { title: string; description: string }
    location: { title: string; description: string }
    sports: { title: string; description: string }
    privateEvents: { title: string; description: string }
    privacy: { title: string; description: string }
  }
  nav: {
    about: string
    gallery: string
    promotions: string
    menu: string
    location: string
    privateEvents: string
    sports: string
    faq: string
    reviews: string
    contact: string
  }
  languages: Record<Locale, string>
  hero: {
    welcome: string
    tagline: string
    viewMenu: string
    findUs: string
    alt: string
  }
  about: {
    title: string
    paragraph1: string
    paragraph2: string
    paragraph3: string
    openDaily: string
    videoLoading: string
    videoUnavailableTitle: string
    videoUnavailableMessage: string
  }
  gallery: {
    title: string
    description: string
    viewMore: string
  }
  promotions: {
    title: string
    description: string
  }
import type { MenuItemsMap } from "./menu-item-keys"

  menu: {
    title: string
    description: string
    tabs: {
      breakfast: string
      cocktails: string
      beer: string
      wine: string
      nonAlcoholic: string
      hotDrinks: string
    }
    ourMenu: string
    sunsetSpecial: string
    sunsetDesc: string
    freshlyPrepared: string
    freshlyPreparedDesc: string
    breakfastBanner: string
    breakfastSubtext: string
    categories: {
      breakfast: string
      breakfastDrinks: string
      cocktails: string
      kidsCocktails: string
      milkshakes: string
      shots: string
      draughtLager: string
      bottlesAndCans: string
      wine: string
      spirits: string
      whiskeysBrandys: string
      softDrinks: string
      hotDrinks: string
    }
    fullMonty: {
      title: string
      includes: string
    }
    extras: {
      buttyTitle: string
      buttyItems: string
      addOnsTitle: string
      addOnsItems: string
    }
    expertlyCrafted: string
    expertlyCraftedDesc: string
    sunsetPromoLink: string
    hotDrinksNote: string
    imageAltBreakfast: string
    imageAltCocktails: string
    schemaDescription: string
    items: MenuItemsMap
  }
  faq: {
    title: string
    footerText: string
    contactLink: string
    items: FAQItem[]
  }
  reviews: {
    title: string
    subtitle: string
    basedOn: string
    reviewsLabel: string
    readOnTripAdvisor: string
    readOnGoogle: string
    facebookTitle: string
    facebookRecommend: string
    facebookBasedOn: string
    appreciation: string
  }
  footer: {
    tagline: string
    contactUs: string
    quickLinks: string
    aboutUs: string
    gallery: string
    promotions: string
    menu: string
    location: string
    privateEvents: string
    sports: string
    faq: string
    reviews: string
    privacy: string
    hours: string
    whatsapp: string
    copyright: string
    designedBy: string
  }
  location: {
    pageTitle: string
    pageDesc: string
    visitTitle: string
    visitDesc: string
    address: string
    openingHours: string
    phone: string
    email: string
    parking: string
    parkingDesc: string
    getDirections: string
    contactUs: string
    mapTitle: string
  }
  sportsPage: {
    pageTitle: string
    pageDesc: string
  }
  privateEventsPage: {
    pageTitle: string
    pageDesc: string
  }
  privacy: {
    pageTitle: string
    pageDesc: string
    lastUpdated: string
    sections: {
      whoWeAre: {
        title: string
        paragraph: string
        addressLabel: string
        emailLabel: string
        phoneLabel: string
      }
      whatDataWeCollect: {
        title: string
        intro: string
        items: string[]
        outro: string
      }
      howWeUseYourData: {
        title: string
        items: string[]
      }
      legalBasis: {
        title: string
        intro: string
        items: string[]
      }
      cookies: {
        title: string
        paragraphs: string[]
      }
      thirdPartyServices: {
        title: string
        intro: string
        items: string[]
      }
      howLongWeKeepData: {
        title: string
        paragraph: string
      }
      yourRights: {
        title: string
        intro: string
        items: string[]
        outro: string
      }
      changesToPolicy: {
        title: string
        paragraph: string
      }
    }
  }
  common: {
    siteName: string
    home: string
  }
  schema: {
    amenities: {
      liveSports: string
      outdoorSeating: string
      marinaView: string
      breakfast: string
    }
  }
}

export type StaticDictionary = Omit<Dictionary, "menu"> & {
  menu: Omit<Dictionary["menu"], "items">
}
