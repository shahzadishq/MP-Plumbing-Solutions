import { testimonials } from '../config/siteConfig'
import { Icon } from './icons'

export default function Testimonials() {
  return (
    <section id="reviews">
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">Loved by locals</span>
          <h2 className="section-title">
            Rated <span className="grad">5 stars</span> by our customers.
          </h2>
          <p className="section-lead">
            Don’t just take our word for it — here’s what people across the region
            say after we’ve been out.
          </p>
        </div>

        <div className="testi-grid" data-stagger>
          {testimonials.map((t) => (
            <figure className="testi-card" key={t.name}>
              <div className="testi-stars">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Icon.star key={i} s={18} />
                ))}
              </div>
              <blockquote>“{t.quote}”</blockquote>
              <figcaption className="testi-meta">
                <span className="testi-avatar">{t.name.charAt(0)}</span>
                <div>
                  <div className="name">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
