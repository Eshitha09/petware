import type { Metadata } from 'next'
import Link from 'next/link'
import RevealWrapper from '@/components/RevealWrapper'
import SubpageHero from '@/components/SubpageHero'
import TradeApplicationForm from '@/components/TradeApplicationForm'

export const metadata: Metadata = {
  title: 'Apply for a Wholesale Trade Account | Petware Ltd',
  description:
    'Register your NZ pet business for a Petware Ltd wholesale trade account. Access full pricing, bulk ordering, and dedicated account support.',
  alternates: { canonical: 'https://petware.co.nz/trade-account' },
}

const BENEFITS = [
  'Wholesale pricing across 8 categories',
  '100+ internationally recognised brands',
  'NZ-wide delivery, fast turnaround',
  'Dedicated sales account manager',
  'Online trade portal access',
  'Flexible minimum order quantities',
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',                   item: 'https://petware.co.nz' },
    { '@type': 'ListItem', position: 2, name: 'Apply for Trade Account', item: 'https://petware.co.nz/trade-account' },
  ],
}

export default function TradeAccountPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <RevealWrapper />

      <SubpageHero
        eyebrow="Trade Accounts"
        line1="Open a wholesale"
        line2="account today."
        sub="Available to registered pet businesses in New Zealand. Apply online and our team will be in touch within one business day."
        img="https://images.unsplash.com/photo-1552053831-71594a27632d?w=1800&q=85&fit=crop&crop=top"
        breadcrumb="Trade Account"
      />

      <section className="ta-section">
        <div className="ta-grid">

          {/* Left — benefits */}
          <div className="ta-benefits">
            <p className="section-lbl reveal" style={{ color: 'var(--accent)' }}>What You Get</p>
            <h2 className="about-hed reveal d1" style={{ fontSize: 'clamp(2rem,3vw,3.2rem)' }}>
              Everything your<br /><em>business needs.</em>
            </h2>
            <p className="about-body reveal d2" style={{ marginTop: '1.5rem' }}>
              Trade accounts give you access to wholesale pricing across our full catalogue,
              dedicated account management, and flexible ordering built for NZ pet businesses.
            </p>

            <ul className="ta-benefit-list reveal d3">
              {BENEFITS.map((item, i) => (
                <li key={i} className="ta-benefit-item">
                  <span className="ta-check">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="about-contacts reveal d4" style={{ marginTop: '2.5rem' }}>
              <p style={{ fontSize: '.82rem', color: 'rgba(15,18,9,.45)', marginBottom: '.6rem' }}>Prefer to call or email?</p>
              <a href="tel:0800800135">0800 800 135</a>
              <a href="mailto:accounts@petware.co.nz">accounts@petware.co.nz</a>
            </div>

            <div className="ta-login-cta reveal d4">
              <p>Already have an account?</p>
              <Link href="/login" className="btn-line" style={{ marginTop: '.75rem', display: 'inline-block' }}>
                Trade Login →
              </Link>
            </div>
          </div>

          {/* Right — form */}
          <div className="ta-form-wrap reveal d2">
            <TradeApplicationForm />
          </div>

        </div>
      </section>
    </>
  )
}
