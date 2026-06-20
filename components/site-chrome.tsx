import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import FloatingContact from "@/components/floating-contact"

type SiteChromeProps = {
  children: React.ReactNode
}

export default function SiteChrome({ children }: SiteChromeProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ScrollToTop />
      <FloatingContact />
    </>
  )
}
