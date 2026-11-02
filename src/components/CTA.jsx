import { business } from '../config/siteConfig'
import { Icon } from './icons'

export default function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-card reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            Need a plumber now?
          </span>
          <h2>
            Got a leak, a blockage,<br />or a project in mind?
          </h2>
          <p>
            Call us any time — day, night or weekend. A friendly, licensed plumber
            will help you straight away.
          </p>
          <div className="cta-actions">
            <a href={business.phoneHref} className="btn btn-primary">
              <Icon.phone s={17} /> Call {business.phone}
            </a>
            <a href={business.whatsappHref} className="btn btn-ghost" target="_blank" rel="noreferrer">
              <Icon.whatsapp s={18} /> WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
