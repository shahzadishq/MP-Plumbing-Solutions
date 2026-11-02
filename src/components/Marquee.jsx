import { business } from '../config/siteConfig'

const items = [
  '24/7 Emergency Call-Out',
  'No Hidden Fees',
  'Licensed & Insured',
  'Same-Day Service',
  'Workmanship Guarantee',
  'Upfront Fixed Pricing',
  'Local & Trusted',
]

export default function Marquee() {
  const loop = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((t, i) => (
          <span className="marquee-item" key={i}>
            <span className="dot" /> {t}
          </span>
        ))}
      </div>
    </div>
  )
}
