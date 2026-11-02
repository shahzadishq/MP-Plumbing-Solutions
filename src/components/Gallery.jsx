import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gallery, business, asset } from '../config/siteConfig'
import { Icon } from './icons'
import SplitHeading from './SplitHeading'

gsap.registerPlugin(ScrollTrigger)

/* Desktop: the section pins and the photo strip scrolls sideways as you
   scroll down. Mobile: a native swipeable strip. */
export default function Gallery() {
  const pin = useRef(null)
  const track = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 761px)', () => {
      const distance = () => track.current.scrollWidth - window.innerWidth
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
      // cards tilt slightly while moving
      gsap.utils.toArray('.g-card img').forEach((img) => {
        gsap.fromTo(img, { scale: 1.18, xPercent: -6 }, {
          scale: 1.05, xPercent: 6, ease: 'none',
          scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="gallery" className="sec-dark sheet gallery">
      <div ref={pin} className="gallery-pin">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow reveal">Project gallery</span>
              <SplitHeading parts={['Finished work we’re ', { t: 'proud of.', grad: true }]} />
            </div>
            <p className="section-lead reveal">
              Bathrooms, kitchens, hot water and drains — a look at recent jobs across the region.
            </p>
          </div>
        </div>
        <div className="gallery-viewport">
          <div className="gallery-track" ref={track}>
            {gallery.map((g) => (
              <figure className="g-card" key={g.src}>
                <img src={asset(g.src)} alt={g.title} loading="lazy" />
                <figcaption className="g-cap">
                  <small>{g.tag}</small>
                  <div>{g.title}</div>
                </figcaption>
              </figure>
            ))}
            <div className="gallery-cta">
              <h3>Your project could be next.</h3>
              <p>Tell us what you need — free, no-obligation quote.</p>
              <a href="#contact" className="btn btn-white">Get a quote <Icon.arrow s={17} /></a>
              {business.social.instagram && (
                <a href={business.social.instagram} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', gap: 8, alignItems: 'center', fontWeight: 600 }}>
                  <Icon.instagram s={18} /> More on Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
