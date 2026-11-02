import { useState, useRef } from 'react'
import { faqs } from '../config/siteConfig'
import { Icon } from './icons'

function Item({ q, a }) {
  const [open, setOpen] = useState(false)
  const body = useRef(null)
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {q}
        <span className="plus">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        className="faq-a"
        ref={body}
        style={{ maxHeight: open ? `${body.current?.scrollHeight || 200}px` : '0px' }}
      >
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="faq">
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">Good to know</span>
          <h2 className="section-title">
            Questions? <span className="grad">Answered.</span>
          </h2>
        </div>
        <div className="faq-list reveal">
          {faqs.map((f) => (
            <Item key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
