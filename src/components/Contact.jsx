import { useState } from 'react'
import { business, asset } from '../config/siteConfig'
import { Icon } from './icons'
import SplitHeading from './SplitHeading'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target).entries())
    // No backend yet — opens the visitor's email app with the enquiry prefilled.
    const subject = encodeURIComponent(`Website enquiry — ${data.service || 'General'}`)
    const body = encodeURIComponent(
      `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nSuburb: ${data.suburb}\nService: ${data.service}\n\n${data.message}`
    )
    window.location.href = `${business.emailHref}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="sec-dark sheet flat-bottom">
      <div className="container">
        {/* CTA banner */}
        <div className="cta-card" data-zoom>
          <img className="cta-logo" src={asset(business.logo)} alt="" />
          <div>
            <h2>Got a leak, a blockage or a project in mind?</h2>
            <p>Call any time — day, night or weekend. A friendly, licensed plumber will help you straight away.</p>
          </div>
          <div className="cta-actions">
            <a href={business.phoneHref} className="btn btn-white">
              <Icon.phone s={17} /> Call {business.phone}
            </a>
            <a href={business.whatsappHref} className="btn cta-ghost" target="_blank" rel="noreferrer">
              <Icon.whatsapp s={18} /> WhatsApp us
            </a>
          </div>
        </div>

        <div className="contact-grid">
          <div>
            <span className="eyebrow reveal">Get in touch</span>
            <SplitHeading parts={['Let’s get it ', { t: 'sorted.', grad: true }]} />
            <p className="section-lead reveal">
              Call, message or send an enquiry. For emergencies, calling is always fastest — we’re on call 24/7.
            </p>

            <div className="contact-cards" data-stagger="rise">
              <a href={business.phoneHref} className="contact-row">
                <span className="ci"><Icon.phone s={20} /></span>
                <div><div className="label">Call us</div><div className="val">{business.phone}</div></div>
              </a>
              <a href={business.emailHref} className="contact-row">
                <span className="ci"><Icon.mail s={20} /></span>
                <div><div className="label">Email</div><div className="val">{business.email}</div></div>
              </a>
              <div className="contact-row">
                <span className="ci"><Icon.pin s={20} /></span>
                <div><div className="label">Based in</div><div className="val">{business.address}</div></div>
              </div>
            </div>

            <div className="hours-box reveal">
              <h4><Icon.clock s={18} /> Opening hours</h4>
              {business.hours.map((h) => (
                <div className={`hours-row ${/emerg/i.test(h.day) ? 'emer' : ''}`} key={h.day}>
                  <span className="d">{h.day}</span>
                  <span className="t">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

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
                  <input id="phone" name="phone" required placeholder="04xx xxx xxx" />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@email.com" />
                </div>
                <div className="field">
                  <label htmlFor="suburb">Suburb</label>
                  <input id="suburb" name="suburb" placeholder="e.g. Lara" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="service">What do you need?</label>
                <select id="service" name="service" defaultValue="">
                  <option value="" disabled>Select a service…</option>
                  <option>Emergency plumbing</option>
                  <option>Blocked drain / sewer</option>
                  <option>Hot water system</option>
                  <option>Bathroom / kitchen plumbing</option>
                  <option>Taps, toilets or leaks</option>
                  <option>Commercial plumbing</option>
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
              {sent && <div className="form-success">Thanks! Your email app should now open with the enquiry ready to send.</div>}
              <p className="form-note">
                Prefer to talk? Call <a href={business.phoneHref}>{business.phone}</a> — 24/7 for emergencies.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
