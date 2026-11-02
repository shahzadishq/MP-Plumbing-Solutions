import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { process } from '../config/siteConfig'
import SplitHeading from './SplitHeading'

gsap.registerPlugin(ScrollTrigger)

/* A line "fills with water" across the steps as you scroll; each step lights
   up when reached. */
export default function Process() {
  const wrap = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.process-line i', {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: wrap.current, start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
      })
      gsap.utils.toArray('.process-card').forEach((card, i) => {
        ScrollTrigger.create({
          trigger: wrap.current,
          start: () => `top+=${(i / process.length) * wrap.current.offsetHeight} 72%`,
          onEnter: () => card.classList.add('on'),
          onLeaveBack: () => card.classList.remove('on'),
        })
      })
    }, wrap)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" className="sec-light sec-mist sheet">
      <div className="container">
        <span className="eyebrow reveal">How it works</span>
        <SplitHeading parts={['Simple, from call to ', { t: 'clean finish.', grad: true }]} />
        <p className="section-lead reveal">No jargon, no stress. Here’s exactly what happens when you book with us.</p>

        <div className="process-wrap" ref={wrap}>
          <div className="process-line"><i /></div>
          <div className="process-grid" data-stagger="rise">
            {process.map((p) => (
              <div className="process-card" key={p.step}>
                <div className="dot">{p.step}</div>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
