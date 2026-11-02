import { useState, useEffect } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useScrollAnimations } from './hooks/useScrollAnimations'

import Loader from './components/Loader'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import VideoJobs from './components/VideoJobs'
import WhyUs from './components/WhyUs'
import Gallery from './components/Gallery'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCall from './components/FloatingCall'

/* Section rhythm: dark hero → brand band → light → dark → light → dark → … */
export default function App() {
  const [ready, setReady] = useState(false)

  useSmoothScroll()
  useScrollAnimations(ready)

  useEffect(() => {
    // let the logo intro play before revealing the site
    const t = setTimeout(() => setReady(true), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Loader ready={ready} />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Services />
        <VideoJobs />
        <WhyUs />
        <Gallery />
        <Process />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingCall />
    </>
  )
}
