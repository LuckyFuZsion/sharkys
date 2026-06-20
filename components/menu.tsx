"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Utensils, Coffee, Wine, Beer, Martini, Droplet, ChevronDown, ChevronUp } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import Script from "next/script"

type MenuItem = { name: string; description: string; price: string }

const formatPrice = (price: number) => `€${price.toFixed(2)}`

const breakfastItems: MenuItem[] = [
  {
    name: "The Classic Full English",
    description: "Sausage, bacon, egg, tomato, beans & toast",
    price: formatPrice(7.5),
  },
  {
    name: "The Shark Attack",
    description: "Double sausage, double bacon, double egg, tomato, mushrooms, beans & toast",
    price: formatPrice(10),
  },
  {
    name: "The Veggie Breakfast",
    description: "Vegan sausage, egg, tomato, mushrooms, beans & toast",
    price: formatPrice(8),
  },
  {
    name: "Breakfast Burrito",
    description: "Sausage, bacon, scrambled egg & cheese in a wrap",
    price: formatPrice(7.5),
  },
  {
    name: "Breakfast Butty",
    description: "Fresh roll with one filling (bacon, sausage, egg, or mushrooms)",
    price: formatPrice(4),
  },
  {
    name: "Scrambled Egg on Toast",
    description: "",
    price: formatPrice(6),
  },
  {
    name: "Mixed Toastie (Cheese & Ham)",
    description: "",
    price: formatPrice(4),
  },
]

const breakfastDrinks: MenuItem[] = [
  { name: "White Coffee", description: "", price: formatPrice(3) },
  { name: "Americano", description: "", price: formatPrice(3) },
  { name: "Cappuccino", description: "", price: formatPrice(3) },
  { name: "Tea", description: "", price: formatPrice(3) },
  { name: "Latte", description: "", price: formatPrice(3) },
  { name: "Hot Chocolate", description: "", price: formatPrice(4) },
  { name: "Iced Coffee", description: "", price: formatPrice(5.5) },
  { name: "Fresh Orange Juice", description: "", price: formatPrice(4.5) },
  { name: "Pineapple / Lemon / Apple Juice", description: "", price: formatPrice(3.5) },
  { name: "Water", description: "", price: formatPrice(2) },
  { name: "Sparkling Water", description: "", price: formatPrice(2.5) },
  { name: "Coke / Diet Coke / 7UP / Fanta / Ice Tea", description: "", price: formatPrice(2.5) },
]

const cocktails: MenuItem[] = [
  {
    name: "Sex on the Beach",
    description: "Vodka, peach schnapps, orange & grenadine",
    price: formatPrice(9),
  },
  {
    name: "Shark's Lagoon",
    description: "Vodka, blue curaçao, 7UP & lemon",
    price: formatPrice(9),
  },
  { name: "Piña Colada", description: "Rum, coconut cream & pineapple", price: formatPrice(9) },
  { name: "Tequila Sunrise", description: "Tequila, orange & grenadine", price: formatPrice(9) },
  { name: "Cosmopolitan", description: "Vodka, cranberry & lime", price: formatPrice(9) },
  {
    name: "Brandy Alexander",
    description: "Brandy, brown curaçao & fresh cream",
    price: formatPrice(9),
  },
  {
    name: "Bloody Mary",
    description: "Vodka, tomato juice, Worcester sauce & Tabasco",
    price: formatPrice(9),
  },
  { name: "Caipirinha", description: "Brown sugar, lime & cachaça", price: formatPrice(9) },
  { name: "Aperol Spritz", description: "Aperol, prosecco, soda & water", price: formatPrice(9) },
  { name: "Woo Woo", description: "Vodka, peach & cranberry", price: formatPrice(9) },
  { name: "Espresso Martini", description: "Vodka, coffee & liqueur", price: formatPrice(9) },
  {
    name: "Strawberry Daiquiri",
    description: "Rum, lemon & fresh strawberry",
    price: formatPrice(9.5),
  },
  {
    name: "Strawberry Mojito",
    description: "Rum, mint, lime & soda water",
    price: formatPrice(9.5),
  },
  {
    name: "Mojito",
    description: "Rum, brown sugar, mint, lime & soda water",
    price: formatPrice(9.5),
  },
  {
    name: "Long Island Iced Tea",
    description: "Vodka, rum, gin, tequila, triple sec, coke, lemon & lime",
    price: formatPrice(10),
  },
]

const kidsCocktails: MenuItem[] = [
  { name: "Bubble Blast", description: "Apple, blackcurrant & fizzy water", price: formatPrice(6) },
  { name: "Under the Sea", description: "Tropical mango, pineapple & lemon", price: formatPrice(6) },
  { name: "Sharky's Sunrise", description: "Orange, strawberry & 7UP", price: formatPrice(6) },
]

const shots: MenuItem[] = [
  { name: "Flavoured Sours", description: "", price: formatPrice(3.5) },
  { name: "Tequila", description: "", price: formatPrice(3.5) },
  { name: "Sambuca", description: "", price: formatPrice(3.5) },
  { name: "Baby Guinness", description: "", price: formatPrice(3.5) },
  { name: "Jager Bomb", description: "", price: formatPrice(4.5) },
]

const wineItems: MenuItem[] = [
  { name: "Glass of House Wine", description: "", price: formatPrice(3.8) },
  { name: "Bottle of Wine", description: "", price: formatPrice(18) },
  { name: "Glass of Sangria", description: "", price: formatPrice(4.5) },
  { name: "1L Jug of Sangria", description: "", price: formatPrice(17) },
  { name: "Bottle of Prosecco", description: "", price: formatPrice(20) },
  { name: "Bottle of Champagne", description: "", price: formatPrice(30) },
  { name: "Porto", description: "", price: formatPrice(4) },
]

const spirits: MenuItem[] = [
  { name: "Gordon's Gin", description: "", price: formatPrice(5.5) },
  { name: "Pink Gordon's Gin", description: "", price: formatPrice(6) },
  { name: "Beefeater Gin", description: "", price: formatPrice(6.5) },
  { name: "Tanqueray Gin", description: "", price: formatPrice(6.5) },
  { name: "Bombay Gin", description: "", price: formatPrice(6.5) },
  { name: "Smirnoff Vodka", description: "", price: formatPrice(5) },
  { name: "Bacardi", description: "", price: formatPrice(5.5) },
  { name: "Captain Morgan's / Spice", description: "", price: formatPrice(5.5) },
  { name: "Malibu", description: "", price: formatPrice(5) },
  { name: "Baileys", description: "", price: formatPrice(7) },
  { name: "Tia Maria", description: "", price: formatPrice(5.5) },
  { name: "Pimms", description: "", price: formatPrice(5.5) },
  { name: "Amaretto", description: "", price: formatPrice(5.5) },
  { name: "Cointreau", description: "", price: formatPrice(6.5) },
  { name: "Licor Beirão", description: "", price: formatPrice(5) },
  { name: "Martini", description: "", price: formatPrice(5) },
]

const whiskeys: MenuItem[] = [
  { name: "JB", description: "", price: formatPrice(5) },
  { name: "William Lawson", description: "", price: formatPrice(5.5) },
  { name: "Famous Grouse", description: "", price: formatPrice(5.5) },
  { name: "Jameson", description: "", price: formatPrice(5.5) },
  { name: "Jack Daniels", description: "", price: formatPrice(5.5) },
  { name: "Southern Comfort", description: "", price: formatPrice(5.5) },
  { name: "Canadian Club", description: "", price: formatPrice(5.5) },
  { name: "Glenfiddich", description: "", price: formatPrice(8) },
  { name: "Cardu", description: "", price: formatPrice(8) },
  { name: "Macieira", description: "", price: formatPrice(5) },
  { name: "Drambuie", description: "", price: formatPrice(7) },
  { name: "Hennessy", description: "", price: formatPrice(7) },
]

const draughtLager: MenuItem[] = [
  { name: "Large Super Bock", description: "", price: formatPrice(3.8) },
  { name: "Small Super Bock", description: "", price: formatPrice(2) },
  { name: "Large Carlsberg", description: "", price: formatPrice(4) },
  { name: "Small Carlsberg", description: "", price: formatPrice(2) },
]

const bottlesAndCans: MenuItem[] = [
  { name: "Non-Alcoholic", description: "", price: formatPrice(4) },
  { name: "Super Bock", description: "", price: formatPrice(3.5) },
  { name: "Sagres", description: "", price: formatPrice(3.5) },
  { name: "Peroni", description: "", price: formatPrice(5.5) },
  { name: "Coors", description: "", price: formatPrice(5) },
  { name: "Corona", description: "", price: formatPrice(5) },
  { name: "Somersby (Apple or Blackberry)", description: "", price: formatPrice(5) },
  { name: "Kopparberg", description: "", price: formatPrice(6) },
  { name: "Magners", description: "", price: formatPrice(7) },
  { name: "Strongbow", description: "", price: formatPrice(6) },
  { name: "Guinness", description: "", price: formatPrice(6) },
  { name: "Smirnoff Ice", description: "", price: formatPrice(5.5) },
  { name: "Blue WKD", description: "", price: formatPrice(5.5) },
]

const softDrinks: MenuItem[] = [
  { name: "Cola / Cola Zero / 7UP / Fanta / Ice Tea", description: "", price: formatPrice(2.5) },
  { name: "Red Bull", description: "", price: formatPrice(4) },
  {
    name: "Juices",
    description: "Orange, Lemon, Pineapple, Apple, Cranberry, Tomato",
    price: formatPrice(3.5),
  },
  { name: "Water", description: "", price: formatPrice(2) },
  { name: "Sparkling Water", description: "", price: formatPrice(2.5) },
  { name: "Tonic Water", description: "", price: formatPrice(2.5) },
  { name: "Ginger Ale", description: "", price: formatPrice(2.5) },
]

const hotDrinks: MenuItem[] = [
  { name: "Espresso", description: "", price: formatPrice(1.5) },
  { name: "Coffee with Milk", description: "", price: formatPrice(3) },
  { name: "Americano", description: "", price: formatPrice(3) },
  { name: "Cappuccino", description: "", price: formatPrice(3) },
  { name: "Café Latte", description: "", price: formatPrice(3) },
  { name: "Tea", description: "", price: formatPrice(3) },
  { name: "Hot Chocolate", description: "", price: formatPrice(4) },
  { name: "Irish Coffee", description: "", price: formatPrice(6) },
  { name: "Ice Coffee", description: "", price: formatPrice(4) },
]

export default function Menu() {
  const isMobile = useMobile()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null)
    } else {
      setOpenSection(section)
    }
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
        <p className="font-medium">🍳 BREAKFAST MENU</p>
        <p className="text-sm mt-1">Start your day the Sharky&apos;s way</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <MenuCategory title="Breakfast" items={breakfastItems} isVisible={isVisible} delay={100} direction="left" />
        <MenuCategory
          title="Breakfast Drinks"
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
        <h3 className="text-xl font-bold mb-2">Breakfast Special — Full Monty English Breakfast</h3>
        <p className="font-medium text-lg">{formatPrice(10)}</p>
        <p className="mt-2 text-blue-100">
          Includes: 2 eggs, 2 bacon, 2 sausages, hash browns, tomato, black pudding, beans & toast. Served with a mug
          of tea or cup of coffee.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div
          className={`bg-blue-50 p-3 rounded-md text-sm text-blue-800 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <p className="font-medium">Extras for Butty</p>
          <p>Bacon +€1.50 | Sausage +€1.50 | Egg +€1.50 | Mushrooms +€1.50</p>
        </div>
        <div
          className={`bg-blue-50 p-3 rounded-md text-sm text-blue-800 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          <p className="font-medium">Add-ons</p>
          <p>Hash browns +€2.00 | Black pudding +€2.00</p>
        </div>
      </div>

      <div
        className={`relative h-60 rounded-lg overflow-hidden mt-8 shadow-lg transition-all duration-700 delay-[1000ms] transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <Image
          src="/images/food7.jpg"
          alt="Breakfast at Sharky's Bar"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h4 className="font-bold text-lg">Freshly Prepared</h4>
            <p className="text-sm">Hearty breakfasts made to order every morning</p>
          </div>
        </div>
      </div>
    </div>
  )

  const cocktailsSection = (
    <div className="space-y-8">
      <div className="bg-blue-600 text-white p-4 rounded-lg mb-6 shadow-lg transform hover:scale-[1.01] transition-transform">
        <div className="flex items-center justify-center">
          <h3 className="text-xl font-bold">SUNSET SPECIAL</h3>
        </div>
        <p className="text-center font-medium text-lg mt-1">Half-price cocktails between 6pm and 8pm!</p>
        <div className="text-center mt-2">
          <a href="#promotions" className="text-sm text-blue-100 hover:text-white underline">
            See our Sunset Special promotion for details
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <MenuCategory title="Cocktails" items={cocktails} isVisible={isVisible} delay={100} direction="left" />

        <div className="space-y-8">
          <MenuCategory title="Kids Cocktails" items={kidsCocktails} isVisible={isVisible} delay={300} direction="right" />

          <MenuCategory
            title="Milkshakes | Batidos"
            items={[
              {
                name: "Chocolate, Vanilla, Banana or Strawberry",
                description: "",
                price: formatPrice(6),
              },
            ]}
            isVisible={isVisible}
            delay={400}
            direction="right"
          />

          <MenuCategory title="Shots" items={shots} isVisible={isVisible} delay={500} direction="right" />
        </div>
      </div>

      <div
        className={`relative h-60 rounded-lg overflow-hidden shadow-lg transition-all duration-700 delay-[1000ms] transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <Image
          src="/images/food10.jpg"
          alt="Our signature cocktails"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h4 className="font-bold text-lg">Expertly Crafted</h4>
            <p className="text-sm">Our cocktails are made with premium ingredients</p>
          </div>
        </div>
      </div>
    </div>
  )

  const beerSection = (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <MenuCategory
          title="Draught Lager | Cervejas"
          items={draughtLager}
          isVisible={isVisible}
          delay={100}
          direction="left"
        />

        <MenuCategory
          title="Bottles & Cans"
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
        <MenuCategory title="Wine | Vinho" items={wineItems} isVisible={isVisible} delay={100} direction="left" />

        <MenuCategory
          title="Spirits (Without Mix)"
          items={spirits}
          isVisible={isVisible}
          delay={300}
          direction="right"
        />

        <MenuCategory
          title="Whiskeys & Brandys"
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
          title="Soft Drinks | Refrigerantes"
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
          title="Hot Drinks | Cafés"
          items={hotDrinks}
          note="Add Vanilla or Caramel +€0.50"
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
        title="Breakfast"
        icon={<Utensils className="h-5 w-5" />}
        isOpen={openSection === "breakfast"}
        onClick={() => toggleSection("breakfast")}
        isVisible={isVisible}
        delay={100}
      >
        {breakfastSection}
      </MenuAccordionItem>

      <MenuAccordionItem
        title="Cocktails"
        icon={<Martini className="h-5 w-5" />}
        isOpen={openSection === "cocktails"}
        onClick={() => toggleSection("cocktails")}
        isVisible={isVisible}
        delay={200}
      >
        {cocktailsSection}
      </MenuAccordionItem>

      <MenuAccordionItem
        title="Beer & Cider"
        icon={<Beer className="h-5 w-5" />}
        isOpen={openSection === "beer"}
        onClick={() => toggleSection("beer")}
        isVisible={isVisible}
        delay={300}
      >
        {beerSection}
      </MenuAccordionItem>

      <MenuAccordionItem
        title="Wine & Spirits"
        icon={<Wine className="h-5 w-5" />}
        isOpen={openSection === "wine"}
        onClick={() => toggleSection("wine")}
        isVisible={isVisible}
        delay={400}
      >
        {wineSection}
      </MenuAccordionItem>

      <MenuAccordionItem
        title="Soft Drinks"
        icon={<Droplet className="h-5 w-5" />}
        isOpen={openSection === "nonalcoholic"}
        onClick={() => toggleSection("nonalcoholic")}
        isVisible={isVisible}
        delay={500}
      >
        {nonAlcoholicSection}
      </MenuAccordionItem>

      <MenuAccordionItem
        title="Hot Drinks"
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
          <span className="hidden sm:inline">Breakfast</span>
        </TabsTrigger>
        <TabsTrigger value="cocktails" className="flex items-center gap-2">
          <Martini className="h-4 w-4" />
          <span className="hidden sm:inline">Cocktails</span>
        </TabsTrigger>
        <TabsTrigger value="beer" className="flex items-center gap-2">
          <Beer className="h-4 w-4" />
          <span className="hidden sm:inline">Beer & Cider</span>
        </TabsTrigger>
        <TabsTrigger value="wine" className="flex items-center gap-2">
          <Wine className="h-4 w-4" />
          <span className="hidden sm:inline">Wine & Spirits</span>
        </TabsTrigger>
        <TabsTrigger value="nonalcoholic" className="flex items-center gap-2">
          <Droplet className="h-4 w-4" />
          <span className="hidden sm:inline">Soft Drinks</span>
        </TabsTrigger>
        <TabsTrigger value="hot" className="flex items-center gap-2">
          <Coffee className="h-4 w-4" />
          <span className="hidden sm:inline">Hot Drinks</span>
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
    name: "Sharky's Bar Menu",
    description: "Breakfast and drinks menu for Sharky's Bar in Marina de Albufeira",
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Breakfast",
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
        name: "Cocktails",
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
          Our Menu
        </h2>
        <p
          className={`text-center text-gray-600 mb-12 max-w-2xl mx-auto transition-all duration-500 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          From hearty breakfasts to expertly crafted cocktails, we have something for everyone at Sharky&apos;s Bar.
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
