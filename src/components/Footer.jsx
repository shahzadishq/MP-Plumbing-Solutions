import { business, services, asset } from '../config/siteConfig'
import { Icon } from './icons'

export default function Footer() {
  const year = new Date().getFullYear()
  const socials = [
    business.social.instagram && { href: business.social.instagram, icon: Icon.instagram, label: 'Instagram' },
    business.social.facebook && { href: business.social.facebook, icon: Icon.facebook, label: 'Facebook' },
    business.social.google && { href: business.social.google, icon: Icon.google, label: 'Google' },
  ].filter(Boolean)

  return (
    <footer className="footer sec-dark sec-darker">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="brand">
              <img src={asset(business.logo)} alt={`${business.name} logo`} width="46" height="46" />
              <span>{business.name}</span>
            </div>
            <p>{business.subheading}</p>
            {socials.length > 0 && (
              <div className="footer-socials">
                {socials.map((s) => {
                  const I = s.icon
                  return (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                      <I s={20} />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          <div>
            <h5>Services</h5>
            <div className="footer-links">
              {services.map((s) => (
                <a key={s.title} href="#services">{s.title}</a>
              ))}
            </div>
          </div>

          <div>
            <h5>Contact</h5>
            <div className="footer-links">
              <a href={business.phoneHref}>{business.phone}</a>
              <a href={business.emailHref}>{business.email}</a>
              <span>{business.address}</span>
              <span>{business.serviceArea}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} {business.name}. All rights reserved.</span>
          <span>Licensed &amp; insured · {business.serviceArea}</span>
        </div>
      </div>
    </footer>
  )
}
