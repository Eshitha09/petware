import type { Metadata } from 'next'
import Link from 'next/link'
import StatsStrip from '@/components/StatsStrip'
import RevealWrapper from '@/components/RevealWrapper'
import SubpageHero from '@/components/SubpageHero'
import PillarsSection from '@/components/PillarsSection'

export const metadata: Metadata = {
  title: 'About Us — NZ Pet Wholesale Supplier | Petware Ltd',
  description:
    "Petware Ltd has been New Zealand's most trusted wholesale pet supplier for over 30 years. Learn about our story, brands, and nationwide distribution.",
  alternates: { canonical: 'https://petware.co.nz/about' },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://petware.co.nz' },
    { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://petware.co.nz/about' },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <RevealWrapper />

      <SubpageHero
        eyebrow="Who We Are"
        line1="NZ's full-line"
        line2="pet trade partner."
        sub="Supplying New Zealand's pet industry with world-class wholesale brands for over 30 years."
        img="https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=1800&q=85&fit=crop&crop=center"
        breadcrumb="About"
      />

      {/* ── STORY SECTION ── */}
      <section className="about-story-section">
        <div className="about-story-grid">
          <div className="about-story-text">
            <p className="section-lbl reveal" style={{ color: 'var(--accent)' }}>Our Story</p>
            <h2 className="about-hed reveal d1">
              Built on trust,<br /><em>run for the trade.</em>
            </h2>
            <p className="about-body reveal d2">
              Petware Ltd was founded with a single purpose: give New Zealand&apos;s pet businesses access
              to the best products in the world at wholesale prices that make commercial sense.
              Over three decades, that mission hasn&apos;t changed.
            </p>
            <p className="about-body reveal d2" style={{ marginTop: '1rem' }}>
              Today we represent trusted international and domestic brands across every
              pet category, serving pet retailers, grooming salons, veterinary practices, and
              aquarium specialists throughout New Zealand. Our range includes Pawise, Vetcare,
              Juwel, Aqua Zonic, Red Sea Reefer, Ocean Max, Pet Corrector, and many more.
            </p>
            <div className="about-contacts reveal d3">
              <a href="tel:0800800135">0800 800 135</a>
              <a href="mailto:petware@petware.co.nz">petware@petware.co.nz</a>
            </div>
          </div>

          {/* Stat blocks */}
          <div className="about-story-stats">
            {[
              { num: '30+', label: 'Years in business' },
              { num: '100+', label: 'Trusted brands' },
              { num: '8', label: 'Product categories' },
              { num: 'NZ‑wide', label: 'Nationwide delivery' },
            ].map((s, i) => (
              <div key={i} className={`about-stat-block reveal${i % 2 === 1 ? ' d1' : ''}`}>
                <div className="about-stat-num">{s.num}</div>
                <div className="about-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="about-brands-section">
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <p className="section-lbl reveal" style={{ color: 'var(--sage-light)', justifyContent: 'center' }}>What We Carry</p>
          <h2 className="reveal d1" style={{
            fontFamily: "var(--font-playfair,'Playfair Display'),serif",
            fontSize: 'clamp(2.2rem,3.8vw,4rem)', fontWeight: 700,
            letterSpacing: '-.025em', color: 'var(--paper)', lineHeight: 1, marginBottom: '1.5rem',
          }}>
            Internationally recognised brands,<br /><em style={{ fontWeight: 400, color: 'rgba(247,245,240,.45)' }}>trusted by NZ pet owners.</em>
          </h2>
          <p className="reveal d2" style={{ fontSize: '1rem', color: 'rgba(247,245,240,.42)', lineHeight: 1.9, maxWidth: '600px', margin: '0 auto 3rem' }}>
            We partner directly with manufacturers across the US, Europe, and Asia-Pacific
            to bring premium ranges to NZ at wholesale pricing. Our buyers attend global trade
            shows to continuously add the best new products to our catalogue.
          </p>
          <div className="reveal d3" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="btn-fill" href="/catalog">View Full Catalogue</Link>
            <Link className="btn-line" href="/trade-account">Apply for Trade Account</Link>
          </div>
        </div>
      </section>

      <PillarsSection />
      <StatsStrip />

      {/* ── CTA ── */}
      <section id="cta">
        <img
          className="cta-img"
          src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1800&q=80&fit=crop"
          alt="Pets"
          loading="lazy"
        />
        <div className="cta-content">
          <h2 className="cta-hed reveal">Want to work<br />with <em>us?</em></h2>
          <p className="cta-sub reveal d1">Open a trade account and get access to our full range at wholesale pricing.</p>
          <div className="cta-btns reveal d2">
            <Link className="btn-fill" href="/trade-account">Apply for a Trade Account</Link>
            <Link className="btn-line" href="/contact">Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  )
}
