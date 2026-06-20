"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"
import { useLocaleContext } from "@/components/locale-provider"
import { localizeHref, stripLocaleFromPathname } from "@/lib/i18n/navigation"

const DEDICATED_PAGES = {
  menu: "/menu",
  location: "/location",
  "private-events": "/private-events",
  sports: "/sports",
} as const

const HOME_SECTIONS = {
  about: "/#about",
  gallery: "/#gallery",
  promotions: "/#promotions",
  faq: "/#faq",
  reviews: "/#reviews",
  contact: "/#contact",
} as const

export default function Navbar() {
  const { locale, dictionary } = useLocaleContext()
  const pathname = usePathname()
  const strippedPathname = stripLocaleFromPathname(pathname)
  const isHomePage = strippedPathname === "/"
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    if (!isHomePage) {
      setActiveSection("")
      return
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      const sections = [
        "hero",
        "about",
        "gallery",
        "promotions",
        "menu",
        "private-events",
        "sports",
        "faq",
        "reviews",
        "contact",
      ]

      const currentSection = sections.find((section) => {
        if (section === "hero") return window.scrollY < 100

        const element = document.getElementById(section)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isHomePage])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest("nav")) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const isActive = (key: string) => {
    if (strippedPathname === DEDICATED_PAGES[key as keyof typeof DEDICATED_PAGES]) return true
    return isHomePage && activeSection === key
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHomePage ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-sm shadow-sm py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href={localizeHref("/", locale)} className="flex items-center gap-2 group">
          <div className="relative overflow-hidden">
            <Image
              src="/sharkys_logo.png"
              alt="Sharky's Bar Logo"
              width={40}
              height={40}
              className={`object-contain transition-transform duration-300 ${
                scrolled || !isHomePage ? "scale-90" : "scale-100"
              } group-hover:scale-110`}
            />
          </div>
          <span
            className={`text-xl font-bold text-blue-900 transition-all duration-300 ${
              scrolled || !isHomePage ? "text-lg" : "text-xl"
            }`}
          >
            Sharky&apos;s Bar
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <NavLink href={localizeHref(HOME_SECTIONS.about, locale)} active={isActive("about")}>
            {dictionary.nav.about}
          </NavLink>
          <NavLink href={localizeHref(HOME_SECTIONS.gallery, locale)} active={isActive("gallery")}>
            {dictionary.nav.gallery}
          </NavLink>
          <NavLink href={localizeHref(HOME_SECTIONS.promotions, locale)} active={isActive("promotions")}>
            {dictionary.nav.promotions}
          </NavLink>
          <NavLink href={localizeHref(DEDICATED_PAGES.menu, locale)} active={isActive("menu")}>
            {dictionary.nav.menu}
          </NavLink>
          <NavLink href={localizeHref(DEDICATED_PAGES.location, locale)} active={isActive("location")}>
            {dictionary.nav.location}
          </NavLink>
          <NavLink href={localizeHref(DEDICATED_PAGES["private-events"], locale)} active={isActive("private-events")}>
            {dictionary.nav.privateEvents}
          </NavLink>
          <NavLink href={localizeHref(DEDICATED_PAGES.sports, locale)} active={isActive("sports")}>
            {dictionary.nav.sports}
          </NavLink>
          <NavLink href={localizeHref(HOME_SECTIONS.faq, locale)} active={isActive("faq")}>
            {dictionary.nav.faq}
          </NavLink>
          <NavLink href={localizeHref(HOME_SECTIONS.reviews, locale)} active={isActive("reviews")}>
            {dictionary.nav.reviews}
          </NavLink>
          <NavLink href={localizeHref(HOME_SECTIONS.contact, locale)} active={isActive("contact")}>
            {dictionary.nav.contact}
          </NavLink>
          <LanguageSwitcher />
        </div>

        <div className="lg:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            className="text-blue-900 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden bg-white shadow-lg transition-[max-height] duration-300 ease-in-out ${
          isOpen
            ? "max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-gray-100"
            : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col space-y-1 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <MobileNavLink href={localizeHref(HOME_SECTIONS.about, locale)} onClick={handleLinkClick} active={isActive("about")}>
            {dictionary.nav.about}
          </MobileNavLink>
          <MobileNavLink href={localizeHref(HOME_SECTIONS.gallery, locale)} onClick={handleLinkClick} active={isActive("gallery")}>
            {dictionary.nav.gallery}
          </MobileNavLink>
          <MobileNavLink href={localizeHref(HOME_SECTIONS.promotions, locale)} onClick={handleLinkClick} active={isActive("promotions")}>
            {dictionary.nav.promotions}
          </MobileNavLink>
          <MobileNavLink href={localizeHref(DEDICATED_PAGES.menu, locale)} onClick={handleLinkClick} active={isActive("menu")}>
            {dictionary.nav.menu}
          </MobileNavLink>
          <MobileNavLink href={localizeHref(DEDICATED_PAGES.location, locale)} onClick={handleLinkClick} active={isActive("location")}>
            {dictionary.nav.location}
          </MobileNavLink>
          <MobileNavLink
            href={localizeHref(DEDICATED_PAGES["private-events"], locale)}
            onClick={handleLinkClick}
            active={isActive("private-events")}
          >
            {dictionary.nav.privateEvents}
          </MobileNavLink>
          <MobileNavLink href={localizeHref(DEDICATED_PAGES.sports, locale)} onClick={handleLinkClick} active={isActive("sports")}>
            {dictionary.nav.sports}
          </MobileNavLink>
          <MobileNavLink href={localizeHref(HOME_SECTIONS.faq, locale)} onClick={handleLinkClick} active={isActive("faq")}>
            {dictionary.nav.faq}
          </MobileNavLink>
          <MobileNavLink href={localizeHref(HOME_SECTIONS.reviews, locale)} onClick={handleLinkClick} active={isActive("reviews")}>
            {dictionary.nav.reviews}
          </MobileNavLink>
          <MobileNavLink href={localizeHref(HOME_SECTIONS.contact, locale)} onClick={handleLinkClick} active={isActive("contact")}>
            {dictionary.nav.contact}
          </MobileNavLink>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`text-blue-900 font-medium transition-colors relative group ${
        active ? "text-blue-600" : "hover:text-blue-600"
      }`}
    >
      {children}
      <span
        className={`absolute bottom-[-4px] left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      ></span>
    </Link>
  )
}

function MobileNavLink({
  href,
  onClick,
  active,
  children,
}: {
  href: string
  onClick: () => void
  active?: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`text-blue-900 hover:text-blue-600 font-medium py-2.5 transition-colors flex items-center min-h-[44px] ${
        active ? "text-blue-600 bg-blue-50 rounded pl-2" : ""
      }`}
      onClick={onClick}
    >
      {active && <span className="w-1 h-4 bg-blue-600 rounded-full mr-2"></span>}
      {children}
    </Link>
  )
}
