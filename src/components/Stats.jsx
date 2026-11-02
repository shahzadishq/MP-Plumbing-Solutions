import { stats } from '../config/siteConfig'

export default function Stats() {
  return (
    <div className="stats-grid reveal">
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <div className="num" data-count={s.value} data-suffix={s.suffix}>
            0{s.suffix}
          </div>
          <div className="label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
