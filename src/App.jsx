import { useState, useEffect } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useScrollAnimations } from './hooks/useScrollAnimations'

import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Stats from './components/Stats'
import WhyUs from './components/WhyUs'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCall from './components/FloatingCall'

export default function App() {
  const [ready, setReady] = useState(false)

  useSmoothScroll()
  useScrollAnimations(ready)

  useEffect(() => {
    // brief intro so the loader + hero animation feel intentional
    const t = setTimeout(() => setReady(true), 1100)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Loader done={ready} />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Services />
        <Stats />
        <WhyUs />
        <Process />
        <Testimonials />
        <Faq />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <FloatingCall />
    </>
  )
}
