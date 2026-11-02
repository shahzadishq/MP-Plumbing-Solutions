import { process } from '../config/siteConfig'

export default function Process() {
  return (
    <section id="process">
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">How it works</span>
          <h2 className="section-title">
            Simple, from call to <span className="grad">clean finish.</span>
          </h2>
          <p className="section-lead">
            No jargon, no stress. Here’s exactly what happens when you book with us.
          </p>
        </div>

        <div className="process-grid" data-stagger>
          {process.map((p) => (
            <div className="process-card" key={p.step}>
              <div className="step">{p.step}</div>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
