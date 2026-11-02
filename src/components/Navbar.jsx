import { useState, useEffect } from 'react'
import { business } from '../config/siteConfig'
import { Icon } from './icons'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#why', label: 'Why Us' },
  { href: '#process', label: 'Process' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="brand" aria-label={business.name}>
          <span className="brand-mark">
            <Icon.drop s={22} />
          </span>
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
          <button
            className={`burger ${open ? 'open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
