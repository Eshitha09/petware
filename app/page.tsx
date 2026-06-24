import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import Ticker from '@/components/Ticker'
import StatsStrip from '@/components/StatsStrip'
import RevealWrapper from '@/components/RevealWrapper'
import CatScroll from '@/components/CatScroll'
import AboutFeature from '@/components/AboutFeature'
import PillarsSection from '@/components/PillarsSection'

export const metadata: Metadata = {
  title: "Petware Ltd — NZ's Leading Wholesale Pet Supplies",
  description:
    "New Zealand's full-line wholesale pet supplier. Trusted brands across dogs, cats, birds, fish, reptiles, and small animals, delivered nationwide.",
  alternates: { canonical: 'https://petware.co.nz' },
  openGraph: {
    title: "Petware Ltd — NZ's Leading Wholesale Pet Supplies",
    description: "New Zealand's full-line wholesale pet supplier.",
    url: 'https://petware.co.nz',
    images: [{ url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80', width: 1200, height: 630, alt: 'Petware Ltd' }],
  },
}

export default function HomePage() {
  return (
    <>
      <RevealWrapper />
      <HeroSection />
      <Ticker />

      {/* ── ABOUT ── */}
      <section id="about">
        {/* Feature split */}
        <div className="about-feature">
          <AboutFeature />
          <div className="about-feature-body" style={{ position: 'relative', background: 'var(--paper)' }}>
            <div className="about-num" aria-hidden="true">30</div>
            <p className="section-lbl reveal" style={{ color: 'var(--accent)' }}>Who We Are</p>
            <h2 className="about-hed reveal d1">
              New Zealand&apos;s<br /><em>full-line</em><br />pet trade partner.
            </h2>
            <p className="about-body reveal d2">
              Petware Ltd is NZ&apos;s leading wholesale supplier of pet products. We represent
              the most trusted brands in the global pet industry, supplying registered pet
              businesses nationwide with everything they need to keep shelves stocked and
              customers happy.
            </p>
            <p className="about-body reveal d3" style={{ marginTop: '1rem' }}>
              Trade accounts are available to registered businesses in the NZ pet industry.
              Apply online or give our sales team a call.
            </p>
            <div className="about-contacts reveal d4">
              <a href="tel:0800800135">0800 800 135</a>
              <a href="mailto:accounts@petware.co.nz">accounts@petware.co.nz</a>
            </div>
          </div>
        </div>

        <PillarsSection />
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery">
        <div className="gallery-header">
          <h2 className="gallery-hed reveal">
            Pets that depend<br />on what you <em>stock.</em>
          </h2>
          <Link className="btn-line reveal d2" href="/catalog">
            View all categories →
          </Link>
        </div>
        <div className="photo-grid">
          <div className="photo-cell tall reveal">
            {/* Eye-catching Siberian Husky portrait */}
            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=85&fit=crop&crop=top" alt="Siberian Husky dog" loading="lazy" />
            <div className="photo-label"><span>Dogs</span></div>
            <span className="photo-tag">Dogs</span>
          </div>
          <div className="photo-cell reveal d1">
            {/* Actual cat — close-up portrait */}
            <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=85&fit=crop&crop=face" alt="Cat portrait" loading="lazy" />
            <div className="photo-label"><span>Cats</span></div>
            <span className="photo-tag">Cat Essentials</span>
          </div>
          <div className="photo-cell reveal d2">
            {/* Colourful macaw parrot */}
            <img src="https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=800&q=85&fit=crop" alt="Colourful macaw parrot" loading="lazy" />
            <div className="photo-label"><span>Birds</span></div>
            <span className="photo-tag">Bird Supplies</span>
          </div>
          <div className="photo-cell reveal d1">
            <img src="https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=800&q=85&fit=crop" alt="Aquarium" loading="lazy" />
            <div className="photo-label"><span>Aquatic</span></div>
            <span className="photo-tag">Fish &amp; Aquatic</span>
          </div>
          <div className="photo-cell reveal d2">
            <img src="https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&q=85&fit=crop" alt="Rabbit" loading="lazy" />
            <div className="photo-label"><span>Small Animals</span></div>
            <span className="photo-tag">Small Animals</span>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES HORIZONTAL SCROLL ── */}
      <section id="categories">
        <div className="cat-header">
          <div>
            <p className="section-lbl reveal" style={{ color: 'var(--sage-light)' }}>Product Range</p>
            <h2 className="cat-hed reveal d1">
              Eight categories.<br /><em>One trusted source.</em>
            </h2>
          </div>
          <Link className="btn-line reveal d2" href="/catalog">View Full Catalog →</Link>
        </div>
        <CatScroll />
      </section>

      <StatsStrip />

      {/* ── REVIEWS ── */}
      <section id="reviews">
        <h2 className="reviews-hed reveal">
          What our <em>trade partners</em> say
        </h2>
        <div className="review-grid">
          <div className="review-card reveal">
            <div className="stars">★★★★★</div>
            <blockquote>We&apos;ve stocked Petware products for over a decade. Reliable delivery, a great range, and the team always picks up the phone. Hard to beat for wholesale in NZ.</blockquote>
            <div className="reviewer">
              <div className="rev-avatar"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop&crop=face" alt="Jason R." loading="lazy" /></div>
              <div><div className="rev-name">Jason R.</div><div className="rev-role">Pet Store Owner · Christchurch</div></div>
            </div>
          </div>
          <div className="review-card reveal d1">
            <div className="stars">★★★★★</div>
            <blockquote>The grooming range is exactly what our salon needs. Consistent quality, bulk pricing that works, and easy ordering through their trade portal.</blockquote>
            <div className="reviewer">
              <div className="rev-avatar"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&fit=crop&crop=face" alt="Michelle T." loading="lazy" /></div>
              <div><div className="rev-name">Michelle T.</div><div className="rev-role">Dog Grooming Salon · Wellington</div></div>
            </div>
          </div>
          <div className="review-card reveal d2">
            <div className="stars">★★★★★</div>
            <blockquote>Setting up our trade account was simple. The sales manager walked us through everything and stock arrived faster than expected. Great first impression.</blockquote>
            <div className="reviewer">
              <div className="rev-avatar"><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&fit=crop&crop=face" alt="Aroha W." loading="lazy" /></div>
              <div><div className="rev-name">Aroha W.</div><div className="rev-role">New Pet Retailer · Hamilton</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta">
        <img className="cta-img" src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1800&q=80&fit=crop&crop=center" alt="Pets" loading="lazy" />
        <div className="cta-content">
          <h2 className="cta-hed reveal">Ready to open<br />a <em>trade account?</em></h2>
          <p className="cta-sub reveal d1">
            If you&apos;re a registered business in the NZ pet industry, getting set up is straightforward.
            Apply online or call our sales team weekdays.
          </p>
          <div className="cta-btns reveal d2">
            <Link className="btn-fill" href="/trade-account">Apply for a Trade Account</Link>
            <Link className="btn-line" href="/contact">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
