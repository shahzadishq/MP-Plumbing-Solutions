import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Sets up all scroll-driven reveal animations and number counters.
 * Call once after the app has mounted (and loader finished).
 */
export function useScrollAnimations(ready) {
  useEffect(() => {
    if (!ready) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (!reduce) {
        // Generic reveals
        gsap.utils.toArray('.reveal').forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
        })

        // Staggered groups (children animate in sequence)
        gsap.utils.toArray('[data-stagger]').forEach((group) => {
          gsap.fromTo(
            group.children,
            { opacity: 0, y: 44 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.1,
              scrollTrigger: { trigger: group, start: 'top 82%' },
            }
          )
        })
      }

      // Number counters
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const end = parseFloat(el.dataset.count)
        const suffix = el.dataset.suffix || ''
        const obj = { v: 0 }
        gsap.to(obj, {
          v: end,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            const val = end >= 1000
              ? Math.round(obj.v).toLocaleString()
              : Math.round(obj.v)
            el.textContent = val + suffix
          },
        })
      })

      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [ready])
}
