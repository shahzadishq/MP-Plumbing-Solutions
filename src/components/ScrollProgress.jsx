import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const bar = useRef(null)
  useEffect(() => {
    const t = gsap.to(bar.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })
    return () => {
      t.scrollTrigger?.kill()
      t.kill()
    }
  }, [])
  return <div className="scroll-progress" ref={bar} aria-hidden="true" />
}
