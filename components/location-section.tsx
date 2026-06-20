import Link from "next/link"
import { MapPin, Clock, Phone, Car, Navigation, Mail } from "lucide-react"
import { businessInfo } from "@/lib/business-info"

const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(businessInfo.mapsQuery)}&z=16&output=embed`
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(businessInfo.mapsQuery)}`

export default function LocationSection() {
  return (
    <section id="location" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Visit Sharky&apos;s Bar</h2>
              <p className="text-gray-700 leading-relaxed">
                Sharky&apos;s Bar sits on the waterfront at Marina de Albufeira, with outdoor decking overlooking the
                harbour. We are easy to find on foot from the marina promenade, and taxis can drop off directly at the
                marina.
              </p>
            </div>

            <address className="space-y-4 not-italic">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-blue-900">Address</p>
                  <p className="text-gray-700">{businessInfo.address.formatted}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-blue-900">Opening Hours</p>
                  <p className="text-gray-700">{businessInfo.hours.summary}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-600 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-blue-900">Phone</p>
                  <a href={`tel:${businessInfo.telephone}`} className="text-blue-700 hover:underline">
                    {businessInfo.telephoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-blue-900">Email</p>
                  <a href={`mailto:${businessInfo.email}`} className="text-blue-700 hover:underline">
                    {businessInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Car className="h-5 w-5 text-blue-600 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-blue-900">Parking</p>
                  <p className="text-gray-700">
                    Public parking is available in the Marina de Albufeira area, a short walk from our entrance.
                  </p>
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
                Get Directions
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-md border border-blue-600 px-5 py-3 text-blue-700 font-medium hover:bg-blue-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg border border-blue-100 min-h-[360px]">
            <iframe
              title="Sharky's Bar location on Google Maps"
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
