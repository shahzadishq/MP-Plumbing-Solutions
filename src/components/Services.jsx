import { services } from '../config/siteConfig'
import { Icon } from './icons'

function Card({ s }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }
  const Glyph = Icon[s.icon] || Icon.install
  return (
    <article className={`service-card ${s.featured ? 'featured' : ''}`} onMouseMove={onMove}>
      {s.featured && <span className="featured-tag">Most requested</span>}
      <div className="service-icon">
        <Glyph />
      </div>
      <h3>{s.title}</h3>
      <p>{s.blurb}</p>
      <ul className="service-points">
        {s.points.map((p) => (
          <li key={p}>
            <Icon.check s={15} /> {p}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">What we do</span>
          <h2 className="section-title">
            Every job, done <span className="grad">properly.</span>
          </h2>
          <p className="section-lead">
            From urgent 2am call-outs to beautifully finished installations, our
            licensed plumbers cover it all — with upfront pricing and a guarantee
            on every visit.
          </p>
        </div>

        <div className="services-grid" data-stagger>
          {services.map((s) => (
            <Card key={s.title} s={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
