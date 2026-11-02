import { useEffect, useRef, lazy, Suspense } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { business } from '../config/siteConfig'
import { Icon } from './icons'
import SplitHeading from './SplitHeading'

gsap.registerPlugin(ScrollTrigger)
const Scene3D = lazy(() => import('./Scene3D'))

export default function Hero({ ready }) {
  const root = useRef(null)

  useEffect(() => {
    if (!ready) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      // entrance — starts while the intro curtain is lifting
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.75 })
      tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.7 })
        .from('.hero h1 .w-in', { yPercent: 115, rotate: 4, duration: 1.1, stagger: 0.06 }, '-=0.45')
        .from('.hero-sub', { y: 26, opacity: 0, duration: 0.8 }, '-=0.7')
        .from('.hero-actions > *', { y: 22, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.55')
        .from('.hero-badge', { y: 14, opacity: 0, duration: 0.5, stagger: 0.07 }, '-=0.45')
        .from('.hero-chip', { x: 50, opacity: 0, duration: 0.9, stagger: 0.15 }, '-=0.2')
        .from('.scroll-hint', { opacity: 0, duration: 0.8 }, '-=0.5')

      // scroll-out: copy drifts up and fades as you scroll away
      gsap.to('.hero-copy', {
        y: -90, opacity: 0.15, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-chips', {
        y: -160, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section className="hero sec-dark" id="top" ref={root}>
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      <div className="hero-overlay" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">24/7 Emergency Plumbers · Geelong VIC</span>
          <SplitHeading
            as="h1"
            className=""
            parts={['Plumbing you can ', { t: 'trust, around the clock.', grad: true }]}
          />
          <p className="hero-sub">{business.subheading}</p>

          <div className="hero-actions">
            <a href={business.phoneHref} className="btn btn-primary">
              <Icon.phone s={17} /> Call {business.phone}
            </a>
            <a href="#services" className="btn btn-ghost">
              Our services <Icon.arrow s={17} />
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
      </div>

      <div className="hero-chips" aria-hidden="true">
        <div className="hero-chip chip-a">
          <span className="chip-ic"><Icon.emergency /></span>
          <div><strong>24/7 call-outs</strong><small>Burst pipes &amp; leaks</small></div>
        </div>
        <div className="hero-chip chip-b">
          <span className="chip-ic"><Icon.shield s={22} /></span>
          <div><strong>Licensed in VIC</strong><small>Fully insured work</small></div>
        </div>
      </div>

      <div className="scroll-hint">
        <span className="scroll-mouse" />
        Scroll
      </div>
    </section>
  )
}
