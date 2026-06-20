"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

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
  const pathname = usePathname()
  const isHomePage = pathname === "/"
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
    if (pathname === DEDICATED_PAGES[key as keyof typeof DEDICATED_PAGES]) return true
    return isHomePage && activeSection === key
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHomePage ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-sm shadow-sm py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
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

        <div className="hidden lg:flex space-x-6">
          <NavLink href={HOME_SECTIONS.about} active={isActive("about")}>
            About
          </NavLink>
          <NavLink href={HOME_SECTIONS.gallery} active={isActive("gallery")}>
            Gallery
          </NavLink>
          <NavLink href={HOME_SECTIONS.promotions} active={isActive("promotions")}>
            Promotions
          </NavLink>
          <NavLink href={DEDICATED_PAGES.menu} active={isActive("menu")}>
            Menu
          </NavLink>
          <NavLink href={DEDICATED_PAGES.location} active={isActive("location")}>
            Location
          </NavLink>
          <NavLink href={DEDICATED_PAGES["private-events"]} active={isActive("private-events")}>
            Private Events
          </NavLink>
          <NavLink href={DEDICATED_PAGES.sports} active={isActive("sports")}>
            Sports
          </NavLink>
          <NavLink href={HOME_SECTIONS.faq} active={isActive("faq")}>
            FAQ
          </NavLink>
          <NavLink href={HOME_SECTIONS.reviews} active={isActive("reviews")}>
            Reviews
          </NavLink>
          <NavLink href={HOME_SECTIONS.contact} active={isActive("contact")}>
            Contact
          </NavLink>
        </div>

        <button
          className="lg:hidden text-blue-900 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`lg:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[32rem]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col space-y-2 px-4 py-4">
          <MobileNavLink href={HOME_SECTIONS.about} onClick={handleLinkClick} active={isActive("about")}>
            About
          </MobileNavLink>
          <MobileNavLink href={HOME_SECTIONS.gallery} onClick={handleLinkClick} active={isActive("gallery")}>
            Gallery
          </MobileNavLink>
          <MobileNavLink href={HOME_SECTIONS.promotions} onClick={handleLinkClick} active={isActive("promotions")}>
            Promotions
          </MobileNavLink>
          <MobileNavLink href={DEDICATED_PAGES.menu} onClick={handleLinkClick} active={isActive("menu")}>
            Menu
          </MobileNavLink>
          <MobileNavLink href={DEDICATED_PAGES.location} onClick={handleLinkClick} active={isActive("location")}>
            Location
          </MobileNavLink>
          <MobileNavLink
            href={DEDICATED_PAGES["private-events"]}
            onClick={handleLinkClick}
            active={isActive("private-events")}
          >
            Private Events
          </MobileNavLink>
          <MobileNavLink href={DEDICATED_PAGES.sports} onClick={handleLinkClick} active={isActive("sports")}>
            Sports
          </MobileNavLink>
          <MobileNavLink href={HOME_SECTIONS.faq} onClick={handleLinkClick} active={isActive("faq")}>
            FAQ
          </MobileNavLink>
          <MobileNavLink href={HOME_SECTIONS.reviews} onClick={handleLinkClick} active={isActive("reviews")}>
            Reviews
          </MobileNavLink>
          <MobileNavLink href={HOME_SECTIONS.contact} onClick={handleLinkClick} active={isActive("contact")}>
            Contact
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
      className={`text-blue-900 hover:text-blue-600 font-medium py-1.5 transition-colors flex items-center ${
        active ? "text-blue-600 bg-blue-50 rounded pl-2" : ""
      }`}
      onClick={onClick}
    >
      {active && <span className="w-1 h-4 bg-blue-600 rounded-full mr-2"></span>}
      {children}
    </Link>
  )
}
