import { testimonials, asset } from '../config/siteConfig'
import { Icon } from './icons'
import SplitHeading from './SplitHeading'

export default function Testimonials() {
  return (
    <section id="reviews" className="sec-dark sheet">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">Loved by locals</span>
            <SplitHeading parts={['Homes & businesses ', { t: 'trust us.', grad: true }]} />
          </div>
          <p className="section-lead reveal">
            From family homes to busy commercial kitchens — here’s what customers say.
          </p>
        </div>

        <div className="testi-layout">
          <div className="testi-photo" data-clip>
            <img src={asset('media/photos/commercial-kitchen-client.webp')} alt="Happy commercial kitchen client" loading="lazy" data-parallax="8" />
            <div className="testi-photo-cap">
              <strong>Commercial kitchens</strong>
              <span>Restaurants, cafés &amp; takeaways kept running</span>
            </div>
          </div>

          <div className="testi-list" data-stagger="slide">
            {testimonials.map((t) => (
              <figure className="testi-card" key={t.name}>
                <div className="testi-stars">
                  {Array.from({ length: t.rating }).map((_, i) => <Icon.star key={i} s={17} />)}
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
      </div>
    </section>
  )
}
