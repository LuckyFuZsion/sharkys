import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Gallery from "@/components/gallery"
import Promotions from "@/components/promotions"
import Menu from "@/components/menu"
import PrivateEvents from "@/components/private-events"
import Sports from "@/components/sports"
import FAQSection from "@/components/faq-section"
import TripAdvisorRating from "@/components/tripadvisor-rating"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import SectionDivider from "@/components/section-divider"
import FloatingContact from "@/components/floating-contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <SectionDivider position="top" color="white" bgColor="white" />
      <About />
      <SectionDivider position="top" color="white" bgColor="blue-50" />
      <Gallery />
      <SectionDivider position="top" color="blue-50" bgColor="white" />
      <Promotions />
      <SectionDivider position="top" color="white" bgColor="white" />
      <Menu />
      <SectionDivider position="top" color="white" bgColor="white" />
      <PrivateEvents />
      <SectionDivider position="top" color="white" bgColor="blue-900" />
      <Sports />
      <SectionDivider position="top" color="blue-900" bgColor="blue-50" />
      <FAQSection />
      <SectionDivider position="top" color="blue-50" bgColor="white" />
      <TripAdvisorRating />
      <SectionDivider position="top" color="blue-50" bgColor="white" />
      <Footer />
      <ScrollToTop />
      <FloatingContact />
    </main>
  )
}
