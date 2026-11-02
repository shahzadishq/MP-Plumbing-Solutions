import { business, asset } from '../config/siteConfig'
import { Icon } from './icons'
import SplitHeading from './SplitHeading'

const reasons = [
  { icon: 'emergency', title: 'Fast when it matters', text: 'Real emergencies get a real response — any hour, any day.' },
  { icon: 'check', title: 'Upfront pricing', text: 'A clear quote before we start. No call-out fee, no surprises.' },
  { icon: 'shield', title: 'Licensed & insured', text: 'Victorian-licensed, fully insured and compliant work.' },
  { icon: 'install', title: 'Tidy & respectful', text: 'We protect your home and clean up before we leave.' },
]

export default function WhyUs() {
  return (
    <section id="why" className="sec-light sheet">
      <div className="container split">
        <div className="media-stack">
          <div className="media-frame" data-clip>
            <img src={asset('media/photos/plumber-tap-install.webp')} alt="MP Plumbing Solutions plumber installing tapware" loading="lazy" data-parallax="10" />
          </div>
          <div className="media-float" data-float>
            <img src={asset('media/photos/brass-bath-filler.webp')} alt="Brushed brass bath filler installed by MP Plumbing" loading="lazy" />
          </div>
          <div className="media-badge" data-float>
            <img src={asset(business.logo)} alt="" />
            <div>
              <div className="big">Local &amp; trusted</div>
              <small>Based in Lovely Banks, VIC</small>
            </div>
          </div>
        </div>

        <div>
          <span className="eyebrow reveal">Why MP Plumbing</span>
          <SplitHeading parts={['Local plumbers who ', { t: 'actually turn up.', grad: true }]} />
          <p className="section-lead reveal">
            {business.name} is built on doing the simple things brilliantly: answering
            the phone, arriving on time and fixing it right the first time.
          </p>
          <div className="why-list" data-stagger="rise">
            {reasons.map((r) => {
              const I = Icon[r.icon]
              return (
                <div className="why-item" key={r.title}>
                  <span className="n"><I s={20} /></span>
                  <h4>{r.title}</h4>
                  <p>{r.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
