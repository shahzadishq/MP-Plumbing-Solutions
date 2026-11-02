import { services, asset } from '../config/siteConfig'
import { Icon } from './icons'
import SplitHeading from './SplitHeading'

function Card({ s }) {
  const Glyph = Icon[s.icon] || Icon.install
  return (
    <article className={`service-card ${s.featured ? 'featured' : ''}`}>
      <div className="service-media">
        <img src={asset(s.image)} alt={s.title} loading="lazy" />
        {s.featured && <span className="featured-tag">24/7 · Most requested</span>}
      </div>
      <div className="service-body">
        <div className="service-icon"><Glyph /></div>
        <h3>{s.title}</h3>
        <p>{s.blurb}</p>
        <ul className="service-points">
          {s.points.map((p) => (
            <li key={p}><Icon.check s={15} /> {p}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function Services() {
  return (
    <section id="services" className="sec-light sheet">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">What we do</span>
            <SplitHeading parts={['Every job, done ', { t: 'properly.', grad: true }]} />
          </div>
          <p className="section-lead reveal">
            From urgent 2am call-outs to beautifully finished renovations, our licensed
            plumbers cover it all — with upfront pricing on every visit.
          </p>
        </div>

        <div className="services-grid" data-stagger="cards">
          {services.map((s) => (
            <Card key={s.title} s={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
