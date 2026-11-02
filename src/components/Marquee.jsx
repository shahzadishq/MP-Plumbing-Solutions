import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { business, asset } from '../config/siteConfig'

gsap.registerPlugin(ScrollTrigger)

const items = [
  '24/7 Emergency Call-Outs',
  'Blocked Drains & Sewer',
  'Hot Water Systems',
  'Bathroom & Kitchen Plumbing',
  'Licensed & Insured',
  'No Call-Out Fee',
]

/* Brand-blue ticker. Speeds up with scroll velocity and reverses direction
   when you scroll back up. */
export default function Marquee() {
  const track = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tween = gsap.to(track.current, { xPercent: -50, repeat: -1, duration: 34, ease: 'none' })
    tween.totalTime(tween.duration() * 50) // room to run backwards
    let dir = 1
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        dir = self.direction
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 350, 5)
        gsap.to(tween, { timeScale: dir * boost, duration: 0.25, overwrite: true })
        gsap.to(tween, { timeScale: dir, duration: 1.2, delay: 0.3 })
      },
    })
    return () => {
      st.kill()
      tween.kill()
    }
  }, [])

  const loop = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" ref={track}>
        {loop.map((t, i) => (
          <span className="marquee-item" key={i}>
            <img src={asset(business.logo)} alt="" width="26" height="26" /> {t}
          </span>
        ))}
      </div>
    </div>
  )
}
