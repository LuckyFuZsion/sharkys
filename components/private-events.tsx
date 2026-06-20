"use client"

import { useState, useRef, useEffect } from "react"
import { PartyPopper, Users, Calendar, Mail, Phone, ChevronDown, ChevronUp, Music, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function PrivateEvents() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
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
        threshold: 0.2,
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

  return (
    <section id="private-events" ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 w-64 h-64 bg-blue-50 rounded-full opacity-70 translate-x-1/2"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-50 rounded-full opacity-50 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative">
        <div
          className={`flex items-center justify-center mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-blue-100 rounded-full blur-md animate-pulse"></div>
            <PartyPopper className="h-8 w-8 mr-3 text-blue-600 relative" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Private Events & Celebrations</h2>
        </div>

        {/* Preview Section - Always Visible */}
        <div
          className={`grid md:grid-cols-2 gap-12 items-center mb-8 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Make Your Special Day Unforgettable</h3>
            <p className="text-lg mb-6 text-gray-700">
              Sharky&apos;s Bar is the perfect location for your private events and celebrations. With our stunning
              marina views, delicious food, and friendly service, we can help make your special occasion truly
              memorable.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              With a beautiful large decking space overlooking the harbour and our nautical themed bar, we have a
              capacity of up to 100 people for your event.
            </p>
            <Button
              onClick={toggleExpand}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/30"
            >
              {isExpanded ? "Show Less" : "Find Out More"}
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
          <div>
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
              <Image
                src="/images/private-event-celebration.jpeg"
                alt="Lively celebration at a private event at Sharky's Bar"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2 animate-pulse">
                    Available for Private Hire
                  </span>
                  <h3 className="text-white text-xl font-bold">Create Unforgettable Memories</h3>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/40 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/40 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/40 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/40 rounded-br-lg"></div>
            </div>
          </div>
        </div>

        {/* Expanded Content - Only Visible When Expanded */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-12 items-start pt-4 border-t border-gray-200">
            <div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start p-3 rounded-lg hover:bg-blue-50 transition-colors">
                  <Users className="h-6 w-6 mr-3 mt-1 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Wedding Parties</h4>
                    <p className="text-gray-700">
                      Celebrate your special day with us. We offer customized packages to suit your needs and budget.
                      Perfect for 2nd day wedding celebrations!
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-3 rounded-lg hover:bg-blue-50 transition-colors">
                  <Calendar className="h-6 w-6 mr-3 mt-1 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Private Bookings</h4>
                    <p className="text-gray-700">
                      From birthday parties to corporate events, we can accommodate groups of various sizes. You can
                      privately hire out Sharky&apos;s for drinks and food.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-3 rounded-lg hover:bg-blue-50 transition-colors">
                  <PartyPopper className="h-6 w-6 mr-3 mt-1 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Special Occasions</h4>
                    <p className="text-gray-700">
                      Anniversaries, retirement parties, or any celebration - let us help you create lasting memories.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg shadow-inner border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
                  <Utensils className="h-5 w-5 mr-2" />
                  Food Options
                </h4>
                <div className="space-y-4">
                  <div className="p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="font-medium text-blue-800">Option 1 - €12.50 per head</h5>
                    <p className="text-gray-700">Food platters of burgers, pizzas, hot dogs, and chips</p>
                  </div>
                  <div className="p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="font-medium text-blue-800">Option 2 - €7 per head</h5>
                    <p className="text-gray-700">Variety of pizzas and chips</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-blue-50 p-6 rounded-lg mb-6 shadow-inner border border-blue-100 transform hover:scale-[1.01] transition-transform">
                <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
                  <Music className="h-5 w-5 mr-2" />
                  Entertainment
                </h4>
                <div className="p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow mb-4">
                  <h5 className="font-medium text-blue-800">Live Music</h5>
                  <p className="text-gray-700">Irish guitarist available for €250 for 3 hours</p>
                </div>
                <p className="text-sm text-gray-600 italic">
                  The Sharky&apos;s team always wants you and your guests to have the best day, so please feel free to
                  ask us anything that we can do to meet your needs!
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg mb-6 shadow-inner border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-2">Contact Us for Bookings</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-blue-600" />
                    <a href="tel:+351914120017" className="text-blue-700 hover:text-blue-900">
                      +351 914 120 017
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-blue-600" />
                    <a href="mailto:Chris.whatley@hotmail.co.uk" className="text-blue-700 hover:text-blue-900">
                      Chris.whatley@hotmail.co.uk
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:Chris.whatley@hotmail.co.uk?subject=Private Event Enquiry">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/30"
                  >
                    Enquire Now
                  </Button>
                </a>
                <a href="https://wa.me/351914120017?text=I'm interested in booking a private event at Sharky's Bar">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all"
                  >
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
