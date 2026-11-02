import { useState } from 'react'
import { business } from '../config/siteConfig'
import { Icon } from './icons'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target).entries())
    // No backend yet — open the user's email client with the enquiry prefilled.
    const subject = encodeURIComponent(`Website enquiry — ${data.service || 'General'}`)
    const body = encodeURIComponent(
      `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nService: ${data.service}\n\n${data.message}`
    )
    window.location.href = `${business.emailHref}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact">
      <div className="container contact-grid">
        {/* Left: details */}
        <div className="reveal">
          <span className="eyebrow">Get in touch</span>
          <h2 className="section-title">
            Let’s get it <span className="grad">sorted.</span>
          </h2>
          <p className="section-lead">
            Call, message or send an enquiry. For emergencies, calling is always
            fastest — we’re on call 24/7.
          </p>

          <div className="contact-cards">
            <a href={business.phoneHref} className="contact-row">
              <span className="ci"><Icon.phone s={20} /></span>
              <div>
                <div className="label">Call us</div>
                <div className="val">{business.phone}</div>
              </div>
            </a>
            <a href={business.emailHref} className="contact-row">
              <span className="ci"><Icon.mail s={20} /></span>
              <div>
                <div className="label">Email</div>
                <div className="val">{business.email}</div>
              </div>
            </a>
            <div className="contact-row">
              <span className="ci"><Icon.pin s={20} /></span>
              <div>
                <div className="label">Based in</div>
                <div className="val">{business.address}</div>
              </div>
            </div>
          </div>

          <div className="hours-box">
            <h4><Icon.clock s={18} /> Opening hours</h4>
            {business.hours.map((h) => (
              <div className={`hours-row ${/emerg/i.test(h.day) ? 'emer' : ''}`} key={h.day}>
                <span className="d">{h.day}</span>
                <span className="t">{h.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="reveal">
          <form className="form" onSubmit={handleSubmit}>
            <h3>Request a call-back</h3>
            <p className="hint">Fill this in and we’ll get back to you fast.</p>

            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" required placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" required placeholder="Your phone" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="you@email.com" />
            </div>

            <div className="field">
              <label htmlFor="service">What do you need?</label>
              <select id="service" name="service" defaultValue="">
                <option value="" disabled>Select a service…</option>
                <option>Emergency plumbing</option>
                <option>Installation / fitting</option>
                <option>Blocked drain</option>
                <option>Heating / boiler</option>
                <option>Leak detection</option>
                <option>Something else</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Tell us a little about the job…" />
            </div>

            <button type="submit" className="btn btn-primary">
              Send enquiry <Icon.arrow s={17} />
            </button>
            {sent && (
              <div className="form-success">
                Thanks! Your email app should now open with the enquiry ready to send.
              </div>
            )}
            <p className="form-note">
              Prefer to talk? Call <a href={business.phoneHref} style={{ color: 'var(--aqua-400)' }}>{business.phone}</a> — 24/7 for emergencies.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
