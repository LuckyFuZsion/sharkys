"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Update active section based on scroll position
      const sections = [
        "hero",
        "about",
        "gallery",
        "promotions",
        "menu",
        "private-events",
        "sports",
        "reviews",
        "contact",
      ]

      // Find the current section
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

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close menu when clicking outside or pressing escape
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

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false)
  }

  // Toggle menu open/closed
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-sm shadow-sm py-3"
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
                scrolled ? "scale-90" : "scale-100"
              } group-hover:scale-110`}
            />
          </div>
          <span
            className={`text-xl font-bold text-blue-900 transition-all duration-300 ${
              scrolled ? "text-lg" : "text-xl"
            }`}
          >
            Sharky&apos;s Bar
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <NavLink href="#about" active={activeSection === "about"}>
            About
          </NavLink>
          <NavLink href="#gallery" active={activeSection === "gallery"}>
            Gallery
          </NavLink>
          <NavLink href="#promotions" active={activeSection === "promotions"}>
            Promotions
          </NavLink>
          <NavLink href="#menu" active={activeSection === "menu"}>
            Menu
          </NavLink>
          <NavLink href="#private-events" active={activeSection === "private-events"}>
            Private Events
          </NavLink>
          <NavLink href="#sports" active={activeSection === "sports"}>
            Sports
          </NavLink>
          <NavLink href="#reviews" active={activeSection === "reviews"}>
            Reviews
          </NavLink>
          <NavLink href="#contact" active={activeSection === "contact"}>
            Contact
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-blue-900 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - Slide down animation */}
      <div
        className={`md:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col space-y-2 px-4 py-4">
          <MobileNavLink href="#about" onClick={handleLinkClick} active={activeSection === "about"}>
            About
          </MobileNavLink>
          <MobileNavLink href="#gallery" onClick={handleLinkClick} active={activeSection === "gallery"}>
            Gallery
          </MobileNavLink>
          <MobileNavLink href="#promotions" onClick={handleLinkClick} active={activeSection === "promotions"}>
            Promotions
          </MobileNavLink>
          <MobileNavLink href="#menu" onClick={handleLinkClick} active={activeSection === "menu"}>
            Menu
          </MobileNavLink>
          <MobileNavLink href="#private-events" onClick={handleLinkClick} active={activeSection === "private-events"}>
            Private Events
          </MobileNavLink>
          <MobileNavLink href="#sports" onClick={handleLinkClick} active={activeSection === "sports"}>
            Sports
          </MobileNavLink>
          <MobileNavLink href="#reviews" onClick={handleLinkClick} active={activeSection === "reviews"}>
            Reviews
          </MobileNavLink>
          <MobileNavLink href="#contact" onClick={handleLinkClick} active={activeSection === "contact"}>
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
