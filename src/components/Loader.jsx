import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { business, asset } from '../config/siteConfig'

/* Intro: logo spins in while a ring draws around it, then the whole panel
   lifts away like a curtain to reveal the hero. */
export default function Loader({ ready }) {
  const root = useRef(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (!ready || !root.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true)
      return
    }
    const tl = gsap.timeline({ onComplete: () => setGone(true) })
    tl.to(root.current.querySelector('.loader-inner'), {
      scale: 0.82, opacity: 0, duration: 0.45, ease: 'power2.in',
    }).to(root.current, { yPercent: -100, duration: 1, ease: 'power4.inOut' }, '-=0.12')
    return () => tl.kill()
  }, [ready])

  useEffect(() => {
    document.documentElement.style.overflow = gone ? '' : 'hidden'
    if (gone) window.__lenis?.start()
    else window.__lenis?.stop()
  }, [gone])

  if (gone) return null
  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader-inner">
        <div className="loader-logo">
          <svg className="loader-ring" viewBox="0 0 132 132">
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8eaaff" />
                <stop offset="1" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
            <circle className="track" cx="66" cy="66" r="62" />
            <circle className="bar" cx="66" cy="66" r="62" />
          </svg>
          <img src={asset(business.logo)} alt="" />
        </div>
        <div className="loader-text">{business.name}</div>
      </div>
    </div>
  )
}
