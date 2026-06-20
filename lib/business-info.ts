export const businessInfo = {
  name: "Sharky's Bar",
  telephone: "+351914120017",
  telephoneDisplay: "+351 914 120 017",
  email: "Chris.whatley@hotmail.co.uk",
  address: {
    street: "Marina de Albufeira, Lote 1, Loja 5",
    locality: "Albufeira",
    region: "Faro",
    postalCode: "8200-394",
    country: "PT",
    formatted: "Marina de Albufeira, Lote 1, Loja 5, Albufeira, Portugal",
  },
  geo: {
    latitude: 37.084,
    longitude: -8.2619,
  },
  hours: {
    summary: "Open every day from 10:00 AM until late",
    opens: "10:00",
    closes: "02:00",
  },
  mapsQuery: "Sharky's Bar, Marina de Albufeira, Lote 1, Loja 5, Albufeira, Portugal",
} as const

export const schemaBusinessAddress = {
  "@type": "PostalAddress" as const,
  streetAddress: businessInfo.address.street,
  addressLocality: businessInfo.address.locality,
  addressRegion: businessInfo.address.region,
  postalCode: businessInfo.address.postalCode,
  addressCountry: businessInfo.address.country,
}
