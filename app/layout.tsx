import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import SmoothScroll from '@/components/SmoothScroll'

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
  description: "New Zealand's full-line wholesale pet supplier. Trusted brands across dogs, cats, birds, fish, reptiles, and small animals — delivered nationwide.",
  keywords: ['wholesale pet supplies NZ','pet trade account New Zealand','NZ pet wholesale supplier','Petware Ltd'],
  metadataBase: new URL('https://petware.co.nz'),
  openGraph: { type: 'website', locale: 'en_NZ', siteName: 'Petware Ltd' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll />
        <Cursor />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
