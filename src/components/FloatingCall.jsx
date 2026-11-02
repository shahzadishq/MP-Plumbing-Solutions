import { useState, useEffect } from 'react'
import { business } from '../config/siteConfig'
import { Icon } from './icons'

export default function FloatingCall() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={business.phoneHref}
      className={`float-call ${show ? 'show' : ''}`}
      aria-label={`Call ${business.name}`}
    >
      <span className="ring" />
      <Icon.phone s={18} /> Call now
    </a>
  )
}
