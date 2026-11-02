import { useEffect, useRef, lazy, Suspense } from 'react'
import { gsap } from 'gsap'
import { business } from '../config/siteConfig'
import { Icon } from './icons'

const Scene3D = lazy(() => import('./Scene3D'))

export default function Hero({ ready }) {
  const root = useRef(null)

  useEffect(() => {
    if (!ready) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.6 })
        .from('.hero-line', { y: 60, opacity: 0, duration: 0.9, stagger: 0.12 }, '-=0.3')
        .from('.hero-sub', { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('.hero-actions > *', { y: 24, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
        .from('.hero-badge', { y: 18, opacity: 0, duration: 0.5, stagger: 0.07 }, '-=0.3')
        .from('.scroll-hint', { opacity: 0, duration: 0.8 }, '-=0.2')
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section className="hero" id="top" ref={root}>
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      <div className="hero-overlay" />

      <div className="container hero-inner">
        <span className="eyebrow hero-eyebrow">24/7 Emergency Plumbers · {business.serviceArea}</span>
        <h1>
          <span className="hero-line">Plumbing you can</span>{' '}
          <span className="hero-line grad">trust, around the clock.</span>
        </h1>
        <p className="hero-sub">{business.subheading}</p>

        <div className="hero-actions">
          <a href={business.phoneHref} className="btn btn-primary">
            <Icon.phone s={17} /> Call {business.phone}
          </a>
          <a href="#services" className="btn btn-ghost">
            Explore services <Icon.arrow s={17} />
          </a>
        </div>

        <div className="hero-badges">
          {business.badges.map((b) => (
            <span className="hero-badge" key={b}>
              <Icon.check s={15} /> {b}
            </span>
          ))}
        </div>
      </div>

      <div className="scroll-hint">
        <span className="scroll-mouse" />
        Scroll
      </div>
    </section>
  )
}
