import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * All shared scroll-driven animations. Runs once the intro has finished.
 *   [data-split]   heading words rise out of a mask
 *   .reveal        fade + rise
 *   [data-stagger] children animate in sequence (cards | rise | slide)
 *   [data-parallax]image drifts inside its frame while scrolling
 *   [data-clip]    frame wipes open from the bottom
 *   [data-zoom]    scales up into place
 *   [data-float]   gentle counter-scroll drift
 *   [data-count]   number counters
 */
export function useScrollAnimations(ready) {
  useEffect(() => {
    if (!ready) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.utils.toArray('[data-split]').forEach((h) => {
          if (h.closest('.hero')) return
          gsap.from(h.querySelectorAll('.w-in'), {
            yPercent: 115, rotate: 3, duration: 1, ease: 'power4.out', stagger: 0.05,
            scrollTrigger: { trigger: h, start: 'top 88%' },
          })
        })

        gsap.utils.toArray('.reveal').forEach((el) => {
          gsap.to(el, {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          })
        })

        const variants = {
          cards: { from: { opacity: 0, y: 80, rotateX: -14, transformOrigin: '50% 100%' }, stagger: 0.12 },
          rise: { from: { opacity: 0, y: 60 }, stagger: 0.1 },
          slide: { from: { opacity: 0, x: 70 }, stagger: 0.14 },
        }
        gsap.utils.toArray('[data-stagger]').forEach((group) => {
          const v = variants[group.dataset.stagger] || variants.rise
          gsap.fromTo(group.children, v.from, {
            opacity: 1, x: 0, y: 0, rotateX: 0, duration: 1, ease: 'power3.out', stagger: v.stagger,
            scrollTrigger: { trigger: group, start: 'top 85%' },
          })
        })

        gsap.utils.toArray('[data-parallax]').forEach((el) => {
          const amt = parseFloat(el.dataset.parallax) || 10
          gsap.fromTo(el, { yPercent: -amt }, {
            yPercent: amt, ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        })

        gsap.utils.toArray('[data-clip]').forEach((el) => {
          gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0% round 28px)' }, {
            clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.4, ease: 'power4.inOut',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          })
        })

        gsap.utils.toArray('[data-zoom]').forEach((el) => {
          gsap.fromTo(el, { scale: 0.86, opacity: 0, y: 60 }, {
            scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          })
        })

        gsap.utils.toArray('[data-float]').forEach((el, i) => {
          gsap.fromTo(el, { y: 50 + i * 20 }, {
            y: -40 - i * 20, ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        })

      }

      gsap.utils.toArray('[data-count]').forEach((el) => {
        const end = parseFloat(el.dataset.count)
        const suffix = el.dataset.suffix || ''
        const obj = { v: 0 }
        gsap.to(obj, {
          v: end, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            const val = end >= 1000 ? Math.round(obj.v).toLocaleString() : Math.round(obj.v)
            el.textContent = val + suffix
          },
        })
      })
    })

    // images change layout heights as they load — recalc trigger positions
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = setTimeout(refresh, 600)

    return () => {
      clearTimeout(t)
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [ready])
}
