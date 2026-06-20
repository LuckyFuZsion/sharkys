"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

// Gallery items with real images from Sharky's Bar
const galleryItems = [
  {
    id: 1,
    type: "image",
    src: "/images/outdoor-deck.jpg",
    alt: "Sharky's Bar outdoor deck with marina view",
    thumbnail: "/images/outdoor-deck.jpg",
  },
  {
    id: 2,
    type: "image",
    src: "/images/interior-tables.jpg",
    alt: "Interior of Sharky's Bar with barrel tables",
    thumbnail: "/images/interior-tables.jpg",
  },
  {
    id: 3,
    type: "image",
    src: "/images/bar-night.jpg",
    alt: "Bar area at night with blue lighting",
    thumbnail: "/images/bar-night.jpg",
  },
  {
    id: 4,
    type: "image",
    src: "/images/marina-view.jpg",
    alt: "Beautiful view of Marina de Albufeira",
    thumbnail: "/images/marina-view.jpg",
  },
  {
    id: 5,
    type: "image",
    src: "/images/gourmet-burgers.jpg",
    alt: "Gourmet burgers with all the trimmings",
    thumbnail: "/images/gourmet-burgers.jpg",
  },
  {
    id: 6,
    type: "image",
    src: "/images/mushroom-burger.jpg",
    alt: "Mushroom and cheese burger",
    thumbnail: "/images/mushroom-burger.jpg",
  },
  {
    id: 7,
    type: "image",
    src: "/images/fish-finger-sandwich.jpg",
    alt: "Fish finger sandwich with tartar sauce",
    thumbnail: "/images/fish-finger-sandwich.jpg",
  },
  {
    id: 8,
    type: "image",
    src: "/images/club-sandwich.jpg",
    alt: "Club sandwich with chips",
    thumbnail: "/images/club-sandwich.jpg",
  },
  {
    id: 9,
    type: "image",
    src: "/images/grilled-cheese.jpg",
    alt: "Grilled cheese and ham sandwich",
    thumbnail: "/images/grilled-cheese.jpg",
  },
  {
    id: 10,
    type: "image",
    src: "/images/chicken-wrap.jpg",
    alt: "Chicken wrap with fries",
    thumbnail: "/images/chicken-wrap.jpg",
  },
  {
    id: 11,
    type: "image",
    src: "/images/chicken-salad.jpg",
    alt: "Fresh chicken salad bowl",
    thumbnail: "/images/chicken-salad.jpg",
  },
  {
    id: 12,
    type: "image",
    src: "/images/cheese-sandwich.jpg",
    alt: "Cheese sandwich with chips",
    thumbnail: "/images/cheese-sandwich.jpg",
  },
  {
    id: 13,
    type: "image",
    src: "/images/garlic-bread.jpg",
    alt: "Freshly made garlic bread",
    thumbnail: "/images/garlic-bread.jpg",
  },
  {
    id: 14,
    type: "image",
    src: "/images/loaded-nachos.jpg",
    alt: "Loaded nachos with melted cheese",
    thumbnail: "/images/loaded-nachos.jpg",
  },
  {
    id: 15,
    type: "image",
    src: "/images/spicy-prawns.jpg",
    alt: "Spicy prawns in a skillet",
    thumbnail: "/images/spicy-prawns.jpg",
  },
  {
    id: 16,
    type: "image",
    src: "/images/hot-dogs.jpg",
    alt: "Hot dogs with toppings",
    thumbnail: "/images/hot-dogs.jpg",
  },
  {
    id: 17,
    type: "image",
    src: "/images/wedding-promo.jpg",
    alt: "Wedding events at Sharky's Bar",
    thumbnail: "/images/wedding-promo.jpg",
  },
  {
    id: 18,
    type: "video",
    src: "https://gxciioabwrkahdfe.public.blob.vercel-storage.com/sharkys/vidtour_lodef1-9MiJlAuJ6cJ9am0TrFqbxcFGEMasmX.mp4",
    thumbnail: "/interior.jpg",
    alt: "Video tour of Sharky's Bar",
  },
]

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isMobile = useMobile()

  // Calculate items per page - 8 items on desktop (2 rows of 4), 4 items on mobile (2 rows of 2)
  const itemsPerPage = isMobile ? 4 : 8
  const totalPages = Math.ceil(galleryItems.length / itemsPerPage)

  // Reset to first page when switching between mobile and desktop to avoid empty pages
  useEffect(() => {
    setCurrentPage(0)
  }, [isMobile])

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

  const openLightbox = (index: number) => {
    setSelectedItem(index)
  }

  const closeLightbox = () => {
    setSelectedItem(null)
  }

  const goToPrevious = () => {
    if (selectedItem !== null) {
      setSelectedItem((selectedItem - 1 + galleryItems.length) % galleryItems.length)
    }
  }

  const goToNext = () => {
    if (selectedItem !== null) {
      setSelectedItem((selectedItem + 1) % galleryItems.length)
    }
  }

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      })
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1)
    } else {
      goToPage(0) // Loop back to first page
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1)
    } else {
      goToPage(totalPages - 1) // Loop to last page
    }
  }

  // Get current items to display
  const currentItems = galleryItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <section id="gallery" ref={sectionRef} className="py-20 bg-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Gallery
        </h2>
        <p
          className={`text-center text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Take a visual tour of Sharky&apos;s Bar. Explore our welcoming interior, harbour views, delicious food, and
          vibrant atmosphere.
        </p>

        <div
          className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          {/* Gallery Navigation Buttons */}
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transform hover:scale-110 transition-transform"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-6 w-6 text-blue-900" />
          </button>

          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transform hover:scale-110 transition-transform"
            aria-label="Next page"
          >
            <ChevronRight className="h-6 w-6 text-blue-900" />
          </button>

          {/* Gallery Grid */}
          <div ref={scrollContainerRef} className="overflow-hidden px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-500 ease-in-out">
              {currentItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-all duration-300 shadow-md transform hover:scale-[1.03] hover:shadow-xl hover:z-10"
                  onClick={() => openLightbox(currentPage * itemsPerPage + index)}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    transform: isVisible ? "translateY(0) rotate(0)" : "translateY(50px) rotate(2deg)",
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  <Image src={item.thumbnail || "/placeholder.svg"} alt={item.alt} fill className="object-cover" />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-blue-600 border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  )}

                  {/* Hover overlay - removed caption text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                    {/* Caption text removed */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentPage === index ? "bg-blue-600 w-6" : "bg-blue-300 hover:bg-blue-400"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={nextPage}
            className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/30"
          >
            View More Photos
          </Button>
        </div>
      </div>

      {/* Lightbox - No Captions */}
      <Dialog open={selectedItem !== null} onOpenChange={() => selectedItem !== null && closeLightbox()}>
        <DialogContent className="max-w-5xl p-0 bg-black/90 border-none">
          <div className="relative h-[80vh] w-full">
            {selectedItem !== null && galleryItems[selectedItem].type === "image" ? (
              <Image
                src={galleryItems[selectedItem].src || "/placeholder.svg"}
                alt={galleryItems[selectedItem].alt}
                fill
                className="object-contain"
              />
            ) : selectedItem !== null && galleryItems[selectedItem].type === "video" ? (
              <video src={galleryItems[selectedItem].src} controls className="w-full h-full object-contain" />
            ) : null}

            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transform hover:scale-110 transition-all"
            >
              <X size={24} />
            </button>

            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transform hover:scale-110 transition-all"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transform hover:scale-110 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
