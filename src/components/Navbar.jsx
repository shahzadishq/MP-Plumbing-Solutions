import { useState, useEffect, useRef } from 'react'
import { business, asset } from '../config/siteConfig'
import { Icon } from './icons'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#jobs', label: 'Our Work' },
  { href: '#why', label: 'Why Us' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // hide on scroll down, reveal on scroll up
      setHidden(y > 500 && y > lastY.current + 4 ? true : y < lastY.current - 4 ? false : (h) => h)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const l = window.__lenis
    if (open) l?.stop()
    else l?.start()
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''} ${hidden && !open ? 'hide' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="brand" aria-label={business.name}>
          <img src={asset(business.logo)} alt={`${business.name} logo`} width="46" height="46" />
          <span>
            {business.name}
            <small>{business.serviceArea}</small>
          </span>
        </a>

        <nav className={`nav-links ${open ? 'mobile' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-cta">
          <a href={business.phoneHref} className="nav-phone">
            <Icon.phone s={16} /> {business.phone}
          </a>
          <a href="#contact" className="btn btn-primary" style={{ padding: '11px 22px' }}>
            Book now
          </a>
          <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
