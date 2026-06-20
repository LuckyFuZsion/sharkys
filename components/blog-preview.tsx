"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Calendar, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type BlogPost = {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  image: string
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Best Cocktails to Try This Summer at Sharky's Bar",
    excerpt:
      "Summer is here, and there's no better way to cool down than with a refreshing cocktail. At Sharky's Bar, we've crafted a selection of delicious summer cocktails that are perfect for enjoying on our marina-view deck.",
    date: "June 15, 2023",
    readTime: "3 min read",
    image: "/images/food10.jpg",
    slug: "best-summer-cocktails",
  },
  {
    id: "2",
    title: "Upcoming Sports Events You Can Watch at Sharky's Bar",
    excerpt:
      "Looking for the perfect spot to watch the big game? Sharky's Bar has you covered with our multiple screens showing all the major sporting events. Check out what's coming up this month.",
    date: "May 28, 2023",
    readTime: "4 min read",
    image: "/images/sports-crowd.jpg",
    slug: "upcoming-sports-events",
  },
  {
    id: "3",
    title: "Planning Your Private Event at Sharky's Bar: A Complete Guide",
    excerpt:
      "From birthday celebrations to wedding parties, Sharky's Bar is the perfect venue for your special occasion. Learn everything you need to know about hosting your private event with us.",
    date: "April 10, 2023",
    readTime: "5 min read",
    image: "/images/wedding-promo.jpg",
    slug: "private-event-guide",
  },
]

export default function BlogPreview() {
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

  return (
    <section id="blog" ref={sectionRef} className="py-16 bg-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" aria-hidden="true"></div>
      <div
        className="absolute bottom-20 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-900">Latest from Our Blog</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Stay updated with the latest news, events, and special offers from Sharky's Bar
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              <meta itemProp="datePublished" content={post.date} />
              <meta itemProp="author" content="Sharky's Bar" />

              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  itemProp="image"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span className="mr-4" itemProp="datePublished">
                    {post.date}
                  </span>
                  <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-blue-900" itemProp="headline">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4" itemProp="abstract">
                  {post.excerpt}
                </p>

                <a
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  itemProp="url"
                >
                  <span className="mr-2">Read more</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/30"
            onClick={() => (window.location.href = "/blog")}
          >
            View All Blog Posts
          </Button>
        </div>
      </div>
    </section>
  )
}
