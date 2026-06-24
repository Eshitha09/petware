import type { Metadata } from 'next'
import RevealWrapper from '@/components/RevealWrapper'
import SubpageHero from '@/components/SubpageHero'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us — Petware Ltd Wholesale',
  description:
    "Get in touch with the Petware Ltd sales team. Call 0800 800 135, email accounts@petware.co.nz, or send us a message online.",
  alternates: { canonical: 'https://petware.co.nz/contact' },
}

const CONTACTS = [
  { label: 'Phone', value: '0800 800 135', href: 'tel:0800800135', note: 'Weekdays 10am – 3pm NZST' },
  { label: 'Sales', value: 'accounts@petware.co.nz', href: 'mailto:accounts@petware.co.nz', note: 'New accounts and product enquiries' },
  { label: 'General', value: 'petware@petware.co.nz', href: 'mailto:petware@petware.co.nz', note: 'General enquiries and invoices' },
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',    item: 'https://petware.co.nz' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://petware.co.nz/contact' },
  ],
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <RevealWrapper />

      <SubpageHero
        eyebrow="Get In Touch"
        line1="We're here"
        line2="to help you."
        sub="Our NZ-based sales team is available weekdays to answer product questions, help with orders, and set up new accounts."
        img="https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=1800&q=85&fit=crop"
        breadcrumb="Contact"
      />

      <section className="ta-section">
        <div className="ta-grid">

          {/* Left — contact details */}
          <div className="ta-benefits">
            <p className="section-lbl reveal" style={{ color: 'var(--accent)' }}>Contact Details</p>
            <h2 className="about-hed reveal d1" style={{ fontSize: 'clamp(2rem,3vw,3.2rem)' }}>
              Talk to our<br /><em>sales team.</em>
            </h2>

            <div className="contact-details reveal d2">
              {CONTACTS.map((c, i) => (
                <div key={i} className="contact-detail-item">
                  <p className="contact-detail-label">{c.label}</p>
                  <a href={c.href} className="contact-detail-value">{c.value}</a>
                  <p className="contact-detail-note">{c.note}</p>
                </div>
              ))}
            </div>

            <div className="contact-office reveal d3">
              <p className="contact-detail-label">Office</p>
              <p style={{ color: 'rgba(15,18,9,.6)', fontSize: '.95rem', lineHeight: 1.7 }}>
                Petware Ltd<br />
                Auckland, New Zealand<br />
                (warehouse address available to trade accounts)
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="ta-form-wrap reveal d2">
            <ContactForm />
          </div>

        </div>
      </section>
    </>
  )
}
