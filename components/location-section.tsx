"use client"

import Link from "next/link"
import { MapPin, Clock, Phone, Car, Navigation, Mail } from "lucide-react"
import { useLocaleContext } from "@/components/locale-provider"
import { businessInfo } from "@/lib/business-info"
import { localizeHref } from "@/lib/i18n/navigation"

const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(businessInfo.mapsQuery)}&z=16&output=embed`
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(businessInfo.mapsQuery)}`

export default function LocationSection() {
  const { locale, dictionary } = useLocaleContext()
  const location = dictionary.location

  return (
    <section id="location" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">{location.visitTitle}</h2>
              <p className="text-gray-700 leading-relaxed">
                {location.visitDesc}
              </p>
            </div>

            <address className="space-y-4 not-italic">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-blue-900">{location.address}</p>
                  <p className="text-gray-700">{businessInfo.address.formatted}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-blue-900">{location.openingHours}</p>
                  <p className="text-gray-700">{businessInfo.hours.summary}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-600 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-blue-900">{location.phone}</p>
                  <a href={`tel:${businessInfo.telephone}`} className="text-blue-700 hover:underline">
                    {businessInfo.telephoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-blue-900">{location.email}</p>
                  <a href={`mailto:${businessInfo.email}`} className="text-blue-700 hover:underline">
                    {businessInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Car className="h-5 w-5 text-blue-600 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-blue-900">{location.parking}</p>
                  <p className="text-gray-700">{location.parkingDesc}</p>
                </div>
              </div>
            </address>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                {location.getDirections}
              </a>
              <Link
                href={localizeHref("/#contact", locale)}
                className="inline-flex items-center justify-center rounded-md border border-blue-600 px-5 py-3 text-blue-700 font-medium hover:bg-blue-50 transition-colors"
              >
                {location.contactUs}
              </Link>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg border border-blue-100 min-h-[360px]">
            <iframe
              title={location.mapTitle}
              src={mapsEmbedUrl}
              className="w-full h-[360px] md:h-[480px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
