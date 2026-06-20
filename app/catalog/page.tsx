import type { Metadata } from 'next'
import RevealWrapper from '@/components/RevealWrapper'
import CatalogHero from '@/components/CatalogHero'
import CatalogGrid from '@/components/CatalogGrid'

export const metadata: Metadata = {
  title: 'Product Catalogue — Wholesale Pet Supplies NZ | Petware Ltd',
  description:
    "Browse Petware Ltd's full wholesale catalogue across eight categories — dogs, cats, fish, reptiles, birds, grooming and more. Available to registered NZ trade accounts.",
  alternates: { canonical: 'https://petware.co.nz/catalog' },
  openGraph: {
    title: 'Product Catalogue — Petware Ltd',
    description: "NZ's most complete wholesale pet supply catalogue.",
    url: 'https://petware.co.nz/catalog',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Petware Ltd Product Catalogue',
      },
    ],
  },
}

export default function CatalogPage() {
  return (
    <>
      <RevealWrapper />
      <CatalogHero />
      <CatalogGrid />
    </>
  )
}
