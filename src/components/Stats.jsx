import { stats } from '../config/siteConfig'

export default function Stats() {
  return (
    <section className="stats-band">
      <div className="container">
        <div className="stats-grid" data-stagger>
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="num" data-count={s.value} data-suffix={s.suffix}>
                0{s.suffix}
              </div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
