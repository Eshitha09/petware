import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Petware Ltd',
  description: 'Petware Ltd privacy policy: how we collect, use, and protect your personal information.',
  alternates: { canonical: 'https://petware.co.nz/privacy' },
}

const sections = [
  {
    title: 'Information We Collect',
    body: `We collect personal information that you provide when applying for a trade account, placing orders, or contacting us. This includes business name, contact details, delivery address, GST number, and order history. We may also collect usage data when you visit our website.`,
  },
  {
    title: 'How We Use Your Information',
    body: `We use your information to process orders, manage your trade account, communicate with you about products and services, and improve our website and offerings. We do not sell or rent your personal information to third parties.`,
  },
  {
    title: 'Information Sharing',
    body: `We may share your information with logistics partners for the purpose of delivering your orders, and with our accounting systems for invoice processing. All third parties are contractually bound to protect your information in accordance with the New Zealand Privacy Act 2020.`,
  },
  {
    title: 'Data Security',
    body: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. Trade account passwords are stored using industry-standard encryption.`,
  },
  {
    title: 'Cookies',
    body: `Our website uses cookies to maintain your trade session and improve your browsing experience. Session cookies are deleted when you close your browser. You can control cookie settings through your browser, though disabling cookies may affect site functionality.`,
  },
  {
    title: 'Your Rights',
    body: `Under the New Zealand Privacy Act 2020, you have the right to access and correct personal information we hold about you. To exercise these rights, contact our accounts team. We will respond to requests within 20 working days.`,
  },
  {
    title: 'Contact',
    body: `For privacy-related enquiries, please contact our accounts team at accounts@petware.co.nz or call 0800 800 135 weekdays between 8am and 5pm NZST.`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <div className="legal-hero">
        <p className="page-eyebrow" style={{ justifyContent: 'flex-start' }}>Legal</p>
        <h1 className="page-hed">Privacy Policy</h1>
        <p className="page-sub">Last updated: June 2026</p>
      </div>

      <div className="legal-body">
        <div className="breadcrumb" style={{ padding: '0 0 2rem', position: 'static' }}>
          <Link href="/">Home</Link> / Privacy Policy
        </div>

        {sections.map((s, i) => (
          <div key={i} className="legal-section">
            <h2 className="legal-section-hed">{i + 1}. {s.title}</h2>
            <p className="legal-section-body">{s.body}</p>
          </div>
        ))}

        <div className="legal-contact">
          <p>Questions about your privacy? Contact us:</p>
          <a href="mailto:accounts@petware.co.nz">accounts@petware.co.nz</a>
          <span> · </span>
          <a href="tel:0800800135">0800 800 135</a>
        </div>
      </div>
    </div>
  )
}
