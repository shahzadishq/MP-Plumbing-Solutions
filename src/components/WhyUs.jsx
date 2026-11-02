import { business } from '../config/siteConfig'
import { Icon } from './icons'

const reasons = [
  {
    title: 'Fast when it matters',
    text: 'Real emergencies get a real response. We aim to be on-site quickly, any hour of the day.',
  },
  {
    title: 'Upfront, honest pricing',
    text: 'A clear quote before we start. No call-out fees, no surprises added at the end.',
  },
  {
    title: 'Licensed & insured',
    text: 'Fully qualified, Victorian-licensed and insured — so the work is safe, compliant and covered.',
  },
  {
    title: 'Tidy, respectful work',
    text: 'We treat your home like our own, protect your space and clean up before we leave.',
  },
]

export default function WhyUs() {
  return (
    <section id="why">
      <div className="container split">
        <div className="reveal">
          <span className="eyebrow">Why MP Plumbing</span>
          <h2 className="section-title">
            Local plumbers who <span className="grad">actually turn up.</span>
          </h2>
          <p className="section-lead">
            {business.name} is built on doing the simple things brilliantly:
            answering the phone, arriving on time and fixing it right the first time.
          </p>

          <div className="why-list">
            {reasons.map((r, i) => (
              <div className="why-item" key={r.title}>
                <span className="n">
                  <Icon.check s={18} />
                </span>
                <div>
                  <h4>{r.title}</h4>
                  <p>{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MEDIA SLOT — drop a client photo or video here.
            Replace the placeholder below with:
            <img src="/media/your-photo.jpg" alt="..."/>  OR
            <video src="/media/your-video.mp4" autoPlay muted loop playsInline /> */}
        <div className="reveal">
          <div className="media-frame">
            <div className="placeholder">
              <Icon.play s={48} />
              <span>Your photo or video goes here — add a file to <code>/public/media/</code> and swap the placeholder in <code>WhyUs.jsx</code>.</span>
            </div>
            <div className="media-badge">
              <div>
                <div className="big">100%</div>
                <small>Satisfaction guarantee</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
