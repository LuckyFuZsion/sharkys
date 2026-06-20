"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { siteFaqs } from "@/lib/faq-content"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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
      <div className="absolute top-20 right-0 w-72 h-72 bg-blue-50/50 rounded-full blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl" aria-hidden="true"></div>

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-center mb-8">
          <HelpCircle className="h-8 w-8 mr-3 text-blue-600" aria-hidden="true" />
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {siteFaqs.map((faq, index) => (
              <div
                key={faq.question}
                className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-500 transform ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${openIndex === index ? "shadow-md" : "shadow-sm hover:shadow-md"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-blue-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-medium text-blue-900 faq-question">{faq.question}</h3>
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
                >
                  <div className="p-4 bg-blue-50/30 faq-answer">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Don&apos;t see your question here? Feel free to{" "}
              <a href="#contact" className="text-blue-600 hover:text-blue-800 underline">
                contact us
              </a>{" "}
              directly and we&apos;ll be happy to help!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
