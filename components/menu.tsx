"use client"

import type React from "react"

import { useState, useRef, useEffect, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Utensils, Coffee, Wine, Beer, Martini, Droplet, ChevronDown, ChevronUp } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import Script from "next/script"
import { useLocaleContext } from "@/components/locale-provider"
import type { MenuItemsMap } from "@/lib/i18n/menu-item-keys"
import {
  breakfastItemsData,
  breakfastDrinksData,
  cocktailsData,
  kidsCocktailsData,
  milkshakesData,
  shotsData,
  wineItemsData,
  spiritsData,
  whiskeysData,
  draughtLagerData,
  bottlesAndCansData,
  softDrinksData,
  hotDrinksData,
  type MenuDataEntry,
} from "@/lib/menu-data"

type MenuItem = { name: string; description: string; price: string }

const formatPrice = (price: number) => `€${price.toFixed(2)}`

function resolveMenuItems(data: MenuDataEntry[], items: MenuItemsMap): MenuItem[] {
  return data.map(({ key, price }) => ({
    name: items[key].name,
    description: items[key].description,
    price: formatPrice(price),
  }))
}

export default function Menu() {
  const { dictionary } = useLocaleContext()
  const menu = dictionary.menu
  const isMobile = useMobile()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [openSection, setOpenSection] = useState<string | null>(null)

  const breakfastItems = useMemo(
    () => resolveMenuItems(breakfastItemsData, menu.items),
    [menu.items],
  )
  const breakfastDrinks = useMemo(
    () => resolveMenuItems(breakfastDrinksData, menu.items),
    [menu.items],
  )
  const cocktails = useMemo(() => resolveMenuItems(cocktailsData, menu.items), [menu.items])
  const kidsCocktails = useMemo(() => resolveMenuItems(kidsCocktailsData, menu.items), [menu.items])
  const milkshakes = useMemo(() => resolveMenuItems(milkshakesData, menu.items), [menu.items])
  const shots = useMemo(() => resolveMenuItems(shotsData, menu.items), [menu.items])
  const wineItems = useMemo(() => resolveMenuItems(wineItemsData, menu.items), [menu.items])
  const spirits = useMemo(() => resolveMenuItems(spiritsData, menu.items), [menu.items])
  const whiskeys = useMemo(() => resolveMenuItems(whiskeysData, menu.items), [menu.items])
  const draughtLager = useMemo(() => resolveMenuItems(draughtLagerData, menu.items), [menu.items])
  const bottlesAndCans = useMemo(() => resolveMenuItems(bottlesAndCansData, menu.items), [menu.items])
  const softDrinks = useMemo(() => resolveMenuItems(softDrinksData, menu.items), [menu.items])
  const hotDrinks = useMemo(() => resolveMenuItems(hotDrinksData, menu.items), [menu.items])

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const breakfastSection = (
    <div className="space-y-8">
      <div
        className={`bg-blue-50 p-4 rounded-lg text-center text-blue-800 mb-8 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="font-medium">{menu.breakfastBanner}</p>
        <p className="text-sm mt-1">{menu.breakfastSubtext}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <MenuCategory
          title={menu.categories.breakfast}
          items={breakfastItems}
          isVisible={isVisible}
          delay={100}
          direction="left"
        />
        <MenuCategory
          title={menu.categories.breakfastDrinks}
          items={breakfastDrinks}
          isVisible={isVisible}
          delay={200}
          direction="right"
        />
      </div>

      <div
        className={`bg-blue-600 text-white p-4 rounded-lg shadow-lg transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ transitionDelay: "400ms" }}
      >
        <h3 className="text-xl font-bold mb-2">{menu.fullMonty.title}</h3>
        <p className="font-medium text-lg">{formatPrice(10)}</p>
        <p className="mt-2 text-blue-100">{menu.fullMonty.includes}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div
          className={`bg-blue-50 p-3 rounded-md text-sm text-blue-800 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <p className="font-medium">{menu.extras.buttyTitle}</p>
          <p>{menu.extras.buttyItems}</p>
        </div>
        <div
          className={`bg-blue-50 p-3 rounded-md text-sm text-blue-800 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          <p className="font-medium">{menu.extras.addOnsTitle}</p>
          <p>{menu.extras.addOnsItems}</p>
        </div>
      </div>

      <div
        className={`relative h-60 rounded-lg overflow-hidden mt-8 shadow-lg transition-all duration-700 delay-[1000ms] transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <Image
          src="/images/food7.jpg"
          alt={menu.imageAltBreakfast}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h4 className="font-bold text-lg">{menu.freshlyPrepared}</h4>
            <p className="text-sm">{menu.freshlyPreparedDesc}</p>
          </div>
        </div>
      </div>
    </div>
  )

  const cocktailsSection = (
    <div className="space-y-8">
      <div className="bg-blue-600 text-white p-4 rounded-lg mb-6 shadow-lg transform hover:scale-[1.01] transition-transform">
        <div className="flex items-center justify-center">
          <h3 className="text-xl font-bold">{menu.sunsetSpecial}</h3>
        </div>
        <p className="text-center font-medium text-lg mt-1">{menu.sunsetDesc}</p>
        <div className="text-center mt-2">
          <a href="#promotions" className="text-sm text-blue-100 hover:text-white underline">
            {menu.sunsetPromoLink}
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <MenuCategory
          title={menu.categories.cocktails}
          items={cocktails}
          isVisible={isVisible}
          delay={100}
          direction="left"
        />

        <div className="space-y-8">
          <MenuCategory
            title={menu.categories.kidsCocktails}
            items={kidsCocktails}
            isVisible={isVisible}
            delay={300}
            direction="right"
          />

          <MenuCategory
            title={menu.categories.milkshakes}
            items={milkshakes}
            isVisible={isVisible}
            delay={400}
            direction="right"
          />

          <MenuCategory
            title={menu.categories.shots}
            items={shots}
            isVisible={isVisible}
            delay={500}
            direction="right"
          />
        </div>
      </div>

      <div
        className={`relative h-60 rounded-lg overflow-hidden shadow-lg transition-all duration-700 delay-[1000ms] transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <Image
          src="/images/food10.jpg"
          alt={menu.imageAltCocktails}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h4 className="font-bold text-lg">{menu.expertlyCrafted}</h4>
            <p className="text-sm">{menu.expertlyCraftedDesc}</p>
          </div>
        </div>
      </div>
    </div>
  )

  const beerSection = (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <MenuCategory
          title={menu.categories.draughtLager}
          items={draughtLager}
          isVisible={isVisible}
          delay={100}
          direction="left"
        />

        <MenuCategory
          title={menu.categories.bottlesAndCans}
          items={bottlesAndCans}
          isVisible={isVisible}
          delay={300}
          direction="right"
        />
      </div>
    </div>
  )

  const wineSection = (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <MenuCategory
          title={menu.categories.wine}
          items={wineItems}
          isVisible={isVisible}
          delay={100}
          direction="left"
        />

        <MenuCategory
          title={menu.categories.spirits}
          items={spirits}
          isVisible={isVisible}
          delay={300}
          direction="right"
        />

        <MenuCategory
          title={menu.categories.whiskeysBrandys}
          items={whiskeys}
          isVisible={isVisible}
          delay={500}
          direction="left"
        />
      </div>
    </div>
  )

  const nonAlcoholicSection = (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <MenuCategory
          title={menu.categories.softDrinks}
          items={softDrinks}
          isVisible={isVisible}
          delay={100}
          direction="left"
        />
      </div>
    </div>
  )

  const hotDrinksSection = (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <MenuCategory
          title={menu.categories.hotDrinks}
          items={hotDrinks}
          note={menu.hotDrinksNote}
          isVisible={isVisible}
          delay={100}
          direction="left"
        />
      </div>
    </div>
  )

  const MobileMenu = () => (
    <div className="space-y-4">
      <MenuAccordionItem
        title={menu.tabs.breakfast}
        icon={<Utensils className="h-5 w-5" />}
        isOpen={openSection === "breakfast"}
        onClick={() => toggleSection("breakfast")}
        isVisible={isVisible}
        delay={100}
      >
        {breakfastSection}
      </MenuAccordionItem>

      <MenuAccordionItem
        title={menu.tabs.cocktails}
        icon={<Martini className="h-5 w-5" />}
        isOpen={openSection === "cocktails"}
        onClick={() => toggleSection("cocktails")}
        isVisible={isVisible}
        delay={200}
      >
        {cocktailsSection}
      </MenuAccordionItem>

      <MenuAccordionItem
        title={menu.tabs.beer}
        icon={<Beer className="h-5 w-5" />}
        isOpen={openSection === "beer"}
        onClick={() => toggleSection("beer")}
        isVisible={isVisible}
        delay={300}
      >
        {beerSection}
      </MenuAccordionItem>

      <MenuAccordionItem
        title={menu.tabs.wine}
        icon={<Wine className="h-5 w-5" />}
        isOpen={openSection === "wine"}
        onClick={() => toggleSection("wine")}
        isVisible={isVisible}
        delay={400}
      >
        {wineSection}
      </MenuAccordionItem>

      <MenuAccordionItem
        title={menu.tabs.nonAlcoholic}
        icon={<Droplet className="h-5 w-5" />}
        isOpen={openSection === "nonalcoholic"}
        onClick={() => toggleSection("nonalcoholic")}
        isVisible={isVisible}
        delay={500}
      >
        {nonAlcoholicSection}
      </MenuAccordionItem>

      <MenuAccordionItem
        title={menu.tabs.hotDrinks}
        icon={<Coffee className="h-5 w-5" />}
        isOpen={openSection === "hot"}
        onClick={() => toggleSection("hot")}
        isVisible={isVisible}
        delay={600}
      >
        {hotDrinksSection}
      </MenuAccordionItem>
    </div>
  )

  const DesktopMenu = () => (
    <Tabs defaultValue="breakfast" className="w-full max-w-4xl mx-auto">
      <TabsList
        className={`grid grid-cols-6 mb-8 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <TabsTrigger value="breakfast" className="flex items-center gap-2">
          <Utensils className="h-4 w-4" />
          <span className="hidden sm:inline">{menu.tabs.breakfast}</span>
        </TabsTrigger>
        <TabsTrigger value="cocktails" className="flex items-center gap-2">
          <Martini className="h-4 w-4" />
          <span className="hidden sm:inline">{menu.tabs.cocktails}</span>
        </TabsTrigger>
        <TabsTrigger value="beer" className="flex items-center gap-2">
          <Beer className="h-4 w-4" />
          <span className="hidden sm:inline">{menu.tabs.beer}</span>
        </TabsTrigger>
        <TabsTrigger value="wine" className="flex items-center gap-2">
          <Wine className="h-4 w-4" />
          <span className="hidden sm:inline">{menu.tabs.wine}</span>
        </TabsTrigger>
        <TabsTrigger value="nonalcoholic" className="flex items-center gap-2">
          <Droplet className="h-4 w-4" />
          <span className="hidden sm:inline">{menu.tabs.nonAlcoholic}</span>
        </TabsTrigger>
        <TabsTrigger value="hot" className="flex items-center gap-2">
          <Coffee className="h-4 w-4" />
          <span className="hidden sm:inline">{menu.tabs.hotDrinks}</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="breakfast">{breakfastSection}</TabsContent>
      <TabsContent value="cocktails">{cocktailsSection}</TabsContent>
      <TabsContent value="beer">{beerSection}</TabsContent>
      <TabsContent value="wine">{wineSection}</TabsContent>
      <TabsContent value="nonalcoholic">{nonAlcoholicSection}</TabsContent>
      <TabsContent value="hot">{hotDrinksSection}</TabsContent>
    </Tabs>
  )

  const menuStructuredData = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: menu.ourMenu,
    description: menu.schemaDescription,
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: menu.categories.breakfast,
        hasMenuItem: breakfastItems.slice(0, 3).map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.description,
          offers: {
            "@type": "Offer",
            price: item.price.replace("€", ""),
            priceCurrency: "EUR",
          },
        })),
      },
      {
        "@type": "MenuSection",
        name: menu.categories.cocktails,
        hasMenuItem: cocktails.slice(0, 2).map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.description,
          offers: {
            "@type": "Offer",
            price: item.price.replace("€", ""),
            priceCurrency: "EUR",
          },
        })),
      },
    ],
  }

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="py-20 bg-white relative overflow-hidden"
      aria-labelledby="menu-heading"
    >
      <Script id="menu-schema" type="application/ld+json">
        {JSON.stringify(menuStructuredData)}
      </Script>

      <div className="absolute top-40 right-0 w-72 h-72 bg-blue-50/50 rounded-full blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl" aria-hidden="true"></div>

      <div className="container mx-auto px-4 relative">
        <h2
          id="menu-heading"
          className={`text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {menu.title}
        </h2>
        <p
          className={`text-center text-gray-600 mb-12 max-w-2xl mx-auto transition-all duration-500 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {menu.description}
        </p>

        {isMobile ? <MobileMenu /> : <DesktopMenu />}
      </div>
    </section>
  )
}

function MenuAccordionItem({
  title,
  icon,
  children,
  isOpen,
  onClick,
  isVisible,
  delay,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  isOpen: boolean
  onClick: () => void
  isVisible: boolean
  delay: number
}) {
  return (
    <div
      className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 transition-colors"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

function MenuCategory({
  title,
  items,
  note,
  isVisible,
  delay,
  direction = "left",
}: {
  title: string
  items: MenuItem[]
  note?: string
  isVisible: boolean
  delay: number
  direction?: "left" | "right"
}) {
  const translateX = direction === "left" ? "-translate-x-10" : "translate-x-10"

  return (
    <div
      className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${translateX}`}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="text-xl font-semibold mb-4 text-blue-800">{title}</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between pb-2 border-b border-gray-200 hover:bg-blue-50 p-2 rounded-md transition-colors"
            style={{
              transitionDelay: `${delay + index * 50}ms`,
              animation: isVisible ? `fade-in-up 0.5s ease-out forwards ${delay + index * 50}ms` : "none",
            }}
          >
            <div>
              <h4 className="font-medium">{item.name}</h4>
              {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
            </div>
            <span className="font-medium text-blue-900">{item.price}</span>
          </div>
        ))}
      </div>
      {note && (
        <div
          className="mt-4 bg-blue-50 p-2 rounded-md text-sm text-blue-800 font-medium transition-all duration-500"
          style={{ transitionDelay: `${delay + items.length * 50}ms` }}
        >
          {note}
        </div>
      )}
    </div>
  )
}
