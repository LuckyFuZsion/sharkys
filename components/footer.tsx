"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import type React from "react"
import Link from "next/link"
import { Facebook, Phone, Mail, MapPin, Clock } from "lucide-react"

// Custom WhatsApp icon component
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="white"
    stroke="white"
    strokeWidth="0"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.2,
      },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  return (
    <footer id="contact" ref={footerRef} className="bg-blue-900 text-white relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-64 h-64 bg-blue-800 rounded-full opacity-30 translate-x-1/3 -translate-y-1/2"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800 rounded-full opacity-20 -translate-x-1/3 translate-y-1/3"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid md:grid-cols-3 gap-8">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-bold mb-4">Sharky&apos;s Bar</h3>
            <p className="mb-4">
              A friendly sports bar overlooking Marina de Albufeira. Breakfast, cocktails, live sports, and marina
              views — the perfect spot to relax in the Algarve.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://facebook.com" icon={<Facebook className="h-5 w-5" />} />
              <SocialLink href="tel:+351914120017" icon={<Phone className="h-5 w-5" />} />
              <SocialLink href="mailto:Chris.whatley@hotmail.co.uk" icon={<Mail className="h-5 w-5" />} />
              <SocialLink
                href="https://wa.me/351914120017"
                icon={<WhatsAppIcon />}
                ariaLabel="Contact us on WhatsApp"
              />
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="space-y-3 not-italic">
              <div className="flex items-start group">
                <MapPin
                  className="h-5 w-5 mr-3 mt-1 flex-shrink-0 group-hover:text-blue-300 transition-colors"
                  aria-hidden="true"
                />
                <p className="group-hover:text-blue-200 transition-colors">
                  Marina de Albufeira, Lote 1, Loja 5, Albufeira, Portugal
                </p>
              </div>
              <div className="flex items-center group">
                <Phone
                  className="h-5 w-5 mr-3 flex-shrink-0 group-hover:text-blue-300 transition-colors"
                  aria-hidden="true"
                />
                <a
                  href="tel:+351914120017"
                  className="hover:text-blue-300 transition-colors group-hover:translate-x-1 transform transition-transform"
                >
                  +351 914 120 017
                </a>
              </div>
              <div className="flex items-center group">
                <Mail
                  className="h-5 w-5 mr-3 flex-shrink-0 group-hover:text-blue-300 transition-colors"
                  aria-hidden="true"
                />
                <a
                  href="mailto:Chris.whatley@hotmail.co.uk"
                  className="hover:text-blue-300 transition-colors group-hover:translate-x-1 transform transition-transform"
                >
                  Chris.whatley@hotmail.co.uk
                </a>
              </div>
              <div className="flex items-start group">
                <Clock
                  className="h-5 w-5 mr-3 mt-1 flex-shrink-0 group-hover:text-blue-300 transition-colors"
                  aria-hidden="true"
                />
                <div className="group-hover:text-blue-200 transition-colors">
                  <p>Every day until late</p>
                </div>
              </div>
              <div className="flex items-center group">
                <div
                  className="h-5 w-5 mr-3 flex-shrink-0 flex items-center justify-center group-hover:text-blue-300 transition-colors"
                  aria-hidden="true"
                >
                  <WhatsAppIcon />
                </div>
                <a
                  href="https://wa.me/351914120017"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300 transition-colors group-hover:translate-x-1 transform transition-transform"
                >
                  WhatsApp Us
                </a>
              </div>
            </address>
          </div>

          <div
            className={`transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="hover:text-blue-300 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-blue-300 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all"></span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="#promotions" className="hover:text-blue-300 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all"></span>
                  Promotions
                </Link>
              </li>
              <li>
                <Link href="#menu" className="hover:text-blue-300 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all"></span>
                  Menu
                </Link>
              </li>
              <li>
                <Link href="#private-events" className="hover:text-blue-300 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all"></span>
                  Private Events
                </Link>
              </li>
              <li>
                <Link href="#sports" className="hover:text-blue-300 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all"></span>
                  Live Sports
                </Link>
              </li>
              <li>
                <Link href="#reviews" className="hover:text-blue-300 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all"></span>
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-blue-300 transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-blue-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t border-blue-800 mt-12 pt-6 text-center text-sm text-blue-300 transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-center">
            <p className="mb-4">&copy; {new Date().getFullYear()} Sharky&apos;s Bar. All rights reserved.</p>

            {/* WebFuzsion Logo */}
            <a
              href="https://webfuzsion.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80 mt-3"
              aria-label="WebFuzsion - Web Design Studio"
            >
              <Image
                src="/webfuzsion-icon.png"
                alt="WebFuzsion Web Design Studio"
                width={160}
                height={160}
                className="object-contain"
                priority
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon, ariaLabel }: { href: string; icon: React.ReactNode; ariaLabel?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-all transform hover:scale-110 hover:shadow-lg hover:shadow-black/20"
      aria-label={ariaLabel}
    >
      {icon}
    </a>
  )
}
