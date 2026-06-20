"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Utensils, Coffee, Wine, Beer, Martini, Droplet, ChevronDown, ChevronUp } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import Script from "next/script"

export default function Menu() {
  const isMobile = useMobile()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // For mobile accordion view
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null)
    } else {
      setOpenSection(section)
    }
  }

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

  // Menu section components
  const foodSection = (
    <div className="space-y-8">
      <div
        className={`bg-blue-50 p-4 rounded-lg text-center text-blue-800 mb-8 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="font-medium">ALL OUR FOOD IS FRESHLY MADE TO EAT IN OR TAKEAWAY</p>
        <p className="text-sm mt-1">SERVING FOOD DAILY UNTIL 19:00</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3
            className={`text-xl font-semibold mb-4 text-blue-800 transition-all duration-500 delay-100 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            Our Famous Burgers
          </h3>
          <p
            className={`text-sm text-gray-600 mb-4 transition-all duration-500 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            ALL GARNISHED WITH SALAD
          </p>
          <div className="space-y-4">
            {[
              {
                name: "Sharky Burger",
                description: "This classic burger topped w/cheese & bacon is a Sharky favourite",
                price: "€8.50",
              },
              {
                name: "Texas Hammerhead",
                description: "A burger loaded w/cheese, bacon & mushrooms & finished w/BBQ sauce",
                price: "€9.50",
              },
              {
                name: "Jawsome Burger",
                description:
                  "Hungry? Try to get your jaws round this, double burger, double cheese, double bacon & double mushrooms",
                price: "€11.00",
              },
              {
                name: "Piri Piri Burger",
                description: "Like it hot? Then this spicy chicken breast burger is for you",
                price: "€8.50",
              },
              {
                name: "The Great White",
                description: "Chicken breast combined w/cheese & bacon",
                price: "€9.00",
              },
              {
                name: "Tikka Tikka",
                description: "Marinated chicken tikka partnered w/mint yogurt sauce",
                price: "€8.50",
              },
              {
                name: "Veggie Burger",
                description: "Double vegetable burger",
                price: "€9.00",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex justify-between pb-2 border-b border-gray-200 transition-all duration-500 hover:bg-blue-50 hover:shadow-md p-2 rounded-md ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <span className="font-medium text-blue-900">{item.price}</span>
              </div>
            ))}
          </div>
          <div
            className={`mt-4 bg-blue-50 p-2 rounded-md text-sm text-blue-800 transition-all duration-500 delay-[1000ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="font-medium">ADD EXTRA TOPPINGS:</p>
            <p>Cheese: €1 | Bacon: €1 | Mushrooms: €1</p>
          </div>
        </div>

        <div>
          <h3
            className={`text-xl font-semibold mb-4 text-blue-800 transition-all duration-500 delay-[200ms] ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            Hot Dogs
          </h3>
          <div className="space-y-4">
            {[
              {
                name: "American Hot Dog",
                description: "Double frankfurters loaded with fried onions",
                price: "€9.00",
              },
              {
                name: "Cheese Dog",
                description: "Double frankfurters topped with melted cheese",
                price: "€9.00",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex justify-between pb-2 border-b border-gray-200 transition-all duration-500 hover:bg-blue-50 hover:shadow-md p-2 rounded-md ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <span className="font-medium text-blue-900">{item.price}</span>
              </div>
            ))}
          </div>

          <h3
            className={`text-xl font-semibold mb-4 mt-8 text-blue-800 transition-all duration-500 delay-[500ms] ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            Sharky Specials
          </h3>
          <div className="space-y-4">
            {[
              {
                name: "The Posh Butty",
                description: "Fish finger sandwich with lettuce & tartar sauce",
                price: "€5.50",
              },
              {
                name: "Club Sandwich",
                description: "Chicken, bacon, cheese & salad in a toasted sandwich",
                price: "€9.00",
              },
              {
                name: "Garlic Chicken & Mushroom Burger",
                description: "Garlic chicken breast burger topped with mushrooms",
                price: "€8.50",
              },
              {
                name: "Chili Cheese Hot Dog",
                description: "Double spicy hot dog and melted cheese",
                price: "€9.00",
              },
              {
                name: "Tikka Tikka Baguette",
                description: "Chicken tikka chunks drizzled with yogurt sauce",
                price: "€9.00",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex justify-between pb-2 border-b border-gray-200 transition-all duration-500 hover:bg-blue-50 hover:shadow-md p-2 rounded-md ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <span className="font-medium text-blue-900">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`relative h-60 rounded-lg overflow-hidden mt-8 shadow-lg transition-all duration-700 delay-[1000ms] transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <Image src="/images/food7.jpg" alt="Delicious food from Sharky's Bar menu" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h4 className="font-bold text-lg">Freshly Prepared</h4>
            <p className="text-sm">All our dishes are made fresh to order</p>
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
        <p className="text-center font-medium text-lg mt-1">
          Check out our Sunset Special: Half Price on ALL Cocktails from 6PM to 8PM Daily
        </p>
        <div className="text-center mt-2">
          <a href="#promotions" className="text-sm text-blue-100 hover:text-white underline">
            See our Sunset Special promotion for details
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <MenuCategory
          title="Classic Cocktails"
          items={[
            {
              name: "Sex on the Beach",
              description: "Vodka, Peach Schnapps, Orange and Grenadine",
              price: "€8.50",
            },
            { name: "Sharks Lagoon", description: "Vodka, Blue Curaçao, 7UP and Lemon", price: "€8.50" },
            { name: "Piña Colada", description: "Rum, Batida da Coco and Pineapple", price: "€8.50" },
            { name: "Tequila Sunrise", description: "Tequila, Orange and Grenadine", price: "€8.50" },
            { name: "Cosmopolitan", description: "Vodka, Cranberry and Lime", price: "€8.50" },
            { name: "Brandy Alexander", description: "Brandy, Brown Curaçao and Fresh Cream", price: "€8.50" },
            {
              name: "Bloody Mary",
              description: "Vodka, Tomato Juice, Worcester Sauce and Tobacco",
              price: "€8.50",
            },
            { name: "Caipirinha", description: "Brown Sugar, Lime and Cachaça", price: "€8.50" },
            { name: "Woo Woo", description: "Vodka, Peach and Cranberry", price: "€8.50" },
            { name: "Aperol Spritz", description: "Aperol, Prosecco, Soda and Water", price: "€8.50" },
            { name: "Margarita", description: "Tequila, Triple Seco and Lemon", price: "€8.50" },
          ]}
          isVisible={isVisible}
          delay={100}
          direction="left"
        />

        <MenuCategory
          title="Premium Cocktails"
          items={[
            { name: "Espresso Martini", description: "Vodka, Coffee and Liqueur", price: "€9.00" },
            { name: "Strawberry Daiquiri", description: "Rum, Lemon and Fresh Strawberries", price: "€9.00" },
            { name: "Mojito", description: "Rum, Brown Sugar, Fresh Mint, Lime and Soda Water", price: "€9.00" },
            {
              name: "Strawberry Mojito",
              description: "Rum, Fresh Mint, Lime, Fresh Strawberries and Soda Water",
              price: "€9.50",
            },
            {
              name: "Long Island Ice Tea",
              description: "Vodka, Rum, Gin, Tequila, Triple Seco, Coke, Lemon and Lime",
              price: "€9.50",
            },
          ]}
          isVisible={isVisible}
          delay={300}
          direction="right"
        />

        <MenuCategory
          title="Kids Cocktails"
          items={[
            { name: "Bubble Blast", description: "Apple, Black Currant & Fizzy Water", price: "€5.00" },
            { name: "Under The Sea", description: "Tropical Mango, Pineapple and Lemon", price: "€5.00" },
            { name: "Sharky Sunrise", description: "Orange, Strawberry and 7UP", price: "€5.00" },
            { name: "Milkshakes", description: "Chocolate, Vanilla, Banana or Strawberry", price: "€5.50" },
          ]}
          isVisible={isVisible}
          delay={500}
          direction="left"
        />

        <MenuCategory
          title="Shots"
          items={[
            { name: "Flavoured Sours", description: "", price: "€2.50" },
            { name: "Tequila", description: "", price: "€2.50" },
            { name: "Tequila Rose", description: "", price: "€2.50" },
            { name: "Sambuca", description: "", price: "€2.50" },
            { name: "Baby Guinness", description: "", price: "€2.50" },
            { name: "Jager Bomb", description: "", price: "€3.50" },
          ]}
          isVisible={isVisible}
          delay={700}
          direction="right"
        />
      </div>

      <div
        className={`relative h-60 rounded-lg overflow-hidden shadow-lg transition-all duration-700 delay-[1000ms] transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <Image src="/images/food10.jpg" alt="Our signature cocktails" fill className="object-cover" />
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
          title="Draught Lager / Cervejas"
          items={[
            { name: "Large Superbock / Caneca", description: "", price: "€3.50" },
            { name: "Small Superbock / Imperial", description: "", price: "€2.00" },
            { name: "Large Carlsberg / Caneca", description: "", price: "€4.00" },
            { name: "Small Carlsberg / Imperial", description: "", price: "€2.00" },
          ]}
          isVisible={isVisible}
          delay={100}
          direction="left"
        />

        <MenuCategory
          title="Bottles (Garrafas) / Cans (Latas)"
          items={[
            { name: "Superbock", description: "", price: "€3.00" },
            { name: "Sagres", description: "", price: "€3.00" },
            { name: "Non Alcoholic Beer", description: "", price: "€3.00" },
            { name: "Peroni", description: "", price: "€5.00" },
            { name: "Coors", description: "", price: "€5.00" },
            { name: "Corona", description: "", price: "€5.00" },
            { name: "Somersby", description: "Apple or Blackberry", price: "€5.00" },
            { name: "Kopperberg", description: "", price: "€6.00" },
            { name: "Magners", description: "", price: "€6.50" },
            { name: "Strongbow", description: "", price: "€5.50" },
            { name: "Guinness", description: "", price: "€5.50" },
            { name: "Smirnoff Ice", description: "", price: "€5.00" },
            { name: "Blue WKD", description: "", price: "€5.00" },
          ]}
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
          title="Wine / Vinho"
          items={[
            { name: "Glass of House Wine", description: "White, Red, Green or Rosé", price: "€3.50" },
            { name: "Bottle of House Wine", description: "White, Red, Green or Rosé", price: "€16.50" },
            { name: "Glass of Sangria", description: "", price: "€4.00" },
            { name: "1L Jug of Sangria", description: "", price: "€16.50" },
            { name: "Bottle of Prosecco", description: "", price: "€20.00" },
            { name: "Bottle of Champagne", description: "", price: "€30.00" },
            { name: "Porto", description: "", price: "€3.50" },
          ]}
          isVisible={isVisible}
          delay={100}
          direction="left"
        />

        <MenuCategory
          title="Spirits (without / with mixer)"
          items={[
            { name: "Gordons Gin", description: "", price: "€5.00" },
            { name: "Pink Gordons Gin", description: "", price: "€5.50" },
            { name: "Beefeater Gin", description: "", price: "€6.00" },
            { name: "Tanqueray Gin", description: "", price: "€6.00" },
            { name: "Bombay Gin", description: "", price: "€6.00" },
            { name: "Smirnoff Vodka", description: "", price: "€4.50" },
            { name: "Bacardi", description: "", price: "€4.50" },
            { name: "Captains Morgans/Spice", description: "", price: "€5.50" },
            { name: "Malibu", description: "", price: "€4.50" },
            { name: "Baileys", description: "", price: "€6.50" },
            { name: "Tia Maria", description: "", price: "€4.50" },
            { name: "Pimms", description: "", price: "€5.00" },
            { name: "Amaretto", description: "", price: "€5.00" },
            { name: "Cointreau", description: "", price: "€6.00" },
            { name: "Licor Beirão", description: "", price: "€4.00" },
            { name: "Martini", description: "", price: "€4.50" },
          ]}
          isVisible={isVisible}
          delay={300}
          direction="right"
        />

        <MenuCategory
          title="Whiskeys & Brandys"
          items={[
            { name: "JB", description: "", price: "€4.50" },
            { name: "William Lawsons", description: "", price: "€4.50" },
            { name: "Jameson", description: "", price: "€5.00" },
            { name: "Jack Daniels", description: "", price: "€5.00" },
            { name: "Southern Comfort", description: "", price: "€5.00" },
            { name: "Canadian Club", description: "", price: "€5.00" },
            { name: "Glenfidditch", description: "", price: "€7.00" },
            { name: "Cardhu", description: "", price: "€7.00" },
            { name: "Macieira", description: "", price: "€4.50" },
            { name: "Drambuie", description: "", price: "€7.00" },
            { name: "Hennessy", description: "", price: "€7.00" },
          ]}
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
          title="Soft Drinks / Refrigerantes"
          items={[
            { name: "Cola, Cola Light, 7UP, Fanta, Ice Tea", description: "", price: "€2.50" },
            { name: "Redbull", description: "", price: "€4.00" },
            {
              name: "Juice / Sumos",
              description: "Orange, Lemon, Pineapple, Apple, Cranberry, Tomato",
              price: "€3.00",
            },
            { name: "Water / Água", description: "", price: "€1.50" },
            { name: "Sparkling Water / Água com Gás", description: "(Castelo)", price: "€2.00" },
            { name: "Tonic / Água Tónica", description: "", price: "€2.50" },
            { name: "Ginger Ale", description: "", price: "€2.50" },
          ]}
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
          title="Hot Drinks / Cafés"
          items={[
            { name: "Espresso / Bica", description: "", price: "€1.00" },
            { name: "Coffee with Milk / Café com Leite", description: "", price: "€2.00" },
            { name: "Americano", description: "", price: "€2.00" },
            { name: "Cappuccino", description: "", price: "€2.00" },
            { name: "Café Latte / Galão", description: "", price: "€2.00" },
            { name: "Tea / Chá", description: "", price: "€2.00" },
            { name: "Hot Chocolate / Chocolate Quente", description: "", price: "€3.50" },
            { name: "Irish Coffee", description: "", price: "€5.00" },
            { name: "Iced Coffee", description: "", price: "€4.50" },
          ]}
          isVisible={isVisible}
          delay={100}
          direction="left"
        />
      </div>
    </div>
  )

  // Mobile accordion menu
  const MobileMenu = () => (
    <div className="space-y-4">
      <MenuAccordionItem
        title="Food"
        icon={<Utensils className="h-5 w-5" />}
        isOpen={openSection === "food"}
        onClick={() => toggleSection("food")}
        isVisible={isVisible}
        delay={100}
      >
        {foodSection}
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

  // Desktop tabs menu
  const DesktopMenu = () => (
    <Tabs defaultValue="food" className="w-full max-w-4xl mx-auto">
      <TabsList
        className={`grid grid-cols-6 mb-8 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <TabsTrigger value="food" className="flex items-center gap-2">
          <Utensils className="h-4 w-4" />
          <span className="hidden sm:inline">Food</span>
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

      <TabsContent value="food">{foodSection}</TabsContent>
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
    description: "Food and drinks menu for Sharky's Bar in Marina de Albufeira",
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Burgers",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Sharky Burger",
            description: "This classic burger topped w/cheese & bacon is a Sharky favourite",
            offers: {
              "@type": "Offer",
              price: "8.50",
              priceCurrency: "EUR",
            },
          },
          {
            "@type": "MenuItem",
            name: "Texas Hammerhead",
            description: "A burger loaded w/cheese, bacon & mushrooms & finished w/BBQ sauce",
            offers: {
              "@type": "Offer",
              price: "9.50",
              priceCurrency: "EUR",
            },
          },
        ],
      },
      {
        "@type": "MenuSection",
        name: "Cocktails",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Sex on the Beach",
            description: "Vodka, Peach Schnapps, Orange and Grenadine",
            offers: {
              "@type": "Offer",
              price: "8.50",
              priceCurrency: "EUR",
            },
          },
        ],
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

      {/* Decorative elements */}
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
          From freshly made food to expertly crafted cocktails, we have something for everyone at Sharky&apos;s Bar.
        </p>

        {isMobile ? <MobileMenu /> : <DesktopMenu />}
      </div>
    </section>
  )
}

// Accordion item component for mobile view
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
  items: { name: string; description: string; price: string }[]
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
