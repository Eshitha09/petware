import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import SmoothScroll from '@/components/SmoothScroll'
import Providers from '@/components/Providers'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: "Petware Ltd — NZ's Leading Wholesale Pet Supplies", template: '%s | Petware Ltd' },
  description: "New Zealand's full-line wholesale pet supplier. Trusted brands across dogs, cats, birds, fish, reptiles, and small animals, delivered nationwide.",
  keywords: [
    'wholesale pet supplies NZ',
    'pet trade account New Zealand',
    'NZ pet wholesale supplier',
    'Petware Ltd',
    'pet wholesale distributor NZ',
    'dog cat bird fish reptile wholesale NZ',
  ],
  metadataBase: new URL('https://petware.co.nz'),
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    siteName: 'Petware Ltd',
    url: 'https://petware.co.nz',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=1200&q=80&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Petware Ltd — NZ Wholesale Pet Supplies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Petware Ltd — NZ's Leading Wholesale Pet Supplies",
    description: "New Zealand's full-line wholesale pet supplier. Trusted brands across dogs, cats, birds, fish, reptiles, and small animals.",
    images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=1200&q=80&fit=crop'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://petware.co.nz' },
}

// JSON-LD: Organization + LocalBusiness structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': 'https://petware.co.nz/#organization',
      name: 'Petware Ltd',
      url: 'https://petware.co.nz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://petware.co.nz/logo.png',
        width: 200,
        height: 60,
      },
      description: "New Zealand's full-line wholesale pet supplier, trusted by pet retailers, groomers, aquarium specialists, and veterinary practices since 1994.",
      telephone: '0800800135',
      email: 'petware@petware.co.nz',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NZ',
        addressRegion: 'New Zealand',
      },
      areaServed: {
        '@type': 'Country',
        name: 'New Zealand',
      },
      sameAs: [],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '0800800135',
          contactType: 'sales',
          areaServed: 'NZ',
          availableLanguage: 'English',
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '10:00',
            closes: '15:00',
          },
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://petware.co.nz/#website',
      url: 'https://petware.co.nz',
      name: 'Petware Ltd',
      publisher: { '@id': 'https://petware.co.nz/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://petware.co.nz/catalog?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <SmoothScroll />
          <Cursor />
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
