import { useState, useRef } from 'react'
import { faqs, business } from '../config/siteConfig'
import { Icon } from './icons'
import SplitHeading from './SplitHeading'

function Item({ q, a }) {
  const [open, setOpen] = useState(false)
  const body = useRef(null)
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {q}
        <span className="plus">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div className="faq-a" ref={body} style={{ maxHeight: open ? `${body.current?.scrollHeight || 240}px` : '0px' }}>
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="faq" className="sec-light sheet">
      <div className="container faq-layout">
        <div className="faq-aside">
          <span className="eyebrow reveal">Good to know</span>
          <SplitHeading parts={['Questions? ', { t: 'Answered.', grad: true }]} />
          <p className="section-lead reveal">Can’t find what you’re looking for? Give us a call — happy to help.</p>
          <a href={business.phoneHref} className="btn btn-primary reveal">
            <Icon.phone s={17} /> {business.phone}
          </a>
        </div>
        <div className="faq-list" data-stagger="rise">
          {faqs.map((f) => <Item key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  )
}
