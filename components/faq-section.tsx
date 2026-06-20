"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

type FAQItem = {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What are Sharky's Bar opening hours?",
    answer:
      "Sharky's Bar is open every day from 10:00 AM until late, typically around 2:00 AM. Hours may vary during holidays or special events.",
  },
  {
    question: "Does Sharky's Bar show live sports?",
    answer:
      "Yes, we show all major sporting events on our multiple screens throughout the bar, including football, rugby, Formula 1, and UFC. Check our social media for upcoming matches and events.",
  },
  {
    question: "Can I book Sharky's Bar for private events?",
    answer:
      "Yes, Sharky's Bar is available for private hire for events such as birthday parties, wedding celebrations, and corporate events. We can accommodate groups of up to 100 people. Contact us at +351 914 120 017 or email Chris.whatley@hotmail.co.uk for details.",
  },
  {
    question: "Does Sharky's Bar serve food?",
    answer:
      "Yes, we serve freshly made food daily until 19:00. Our menu includes burgers, hot dogs, sandwiches, and other bar favorites. All our food is freshly made to eat in or takeaway.",
  },
  {
    question: "Where is Sharky's Bar located?",
    answer:
      "Sharky's Bar is located at Marina de Albufeira, Lote 1, Loja 5, Albufeira, Portugal, overlooking the beautiful marina. We're easily accessible from the main marina area.",
  },
  {
    question: "Is there a dress code at Sharky's Bar?",
    answer:
      "Sharky's Bar has a casual dress code. We welcome everyone in comfortable attire, though we ask that guests don't wear swimwear in the evening.",
  },
  {
    question: "Do you have any special promotions?",
    answer:
      "Yes, we offer a Sunset Special with half price on all cocktails daily from 6PM to 8PM. We also have various seasonal promotions throughout the year. Check our Promotions section or social media for current offers.",
  },
  {
    question: "Is Sharky's Bar family-friendly?",
    answer:
      "Yes, Sharky's Bar is family-friendly during the day and early evening. We welcome families with children and offer a kids' menu and non-alcoholic cocktails for younger guests.",
  },
  {
    question: "Do you have vegetarian or vegan options?",
    answer:
      "Yes, we offer vegetarian options including our Veggie Burger. Please ask our staff about vegan options or any dietary requirements you may have.",
  },
  {
    question: "Is there parking available near Sharky's Bar?",
    answer:
      "Yes, there is public parking available in the Marina de Albufeira area. The closest parking is just a short walk from our entrance.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" ref={sectionRef} className="py-16 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-blue-50/50 rounded-full blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl" aria-hidden="true"></div>

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-center mb-8">
          <HelpCircle className="h-8 w-8 mr-3 text-blue-600" aria-hidden="true" />
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-500 transform ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${openIndex === index ? "shadow-md" : "shadow-sm hover:shadow-md"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-blue-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-medium text-blue-900" itemProp="name">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  )}
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <div className="p-4 bg-blue-50/30" itemProp="text">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Don't see your question here? Feel free to{" "}
              <a href="#contact" className="text-blue-600 hover:text-blue-800 underline">
                contact us
              </a>{" "}
              directly and we'll be happy to help!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
