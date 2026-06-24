import { MetadataRoute } from 'next'

const CATEGORY_SLUGS = [
  'dogs-cats',
  'food',
  'birds',
  'aquatic',
  'reptile',
  'small-animals',
  'grooming',
  'cat-litter',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://petware.co.nz'
  const now  = new Date()

  const categoryUrls: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) => ({
    url: `${base}/catalog/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  return [
    { url: base,                        lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/catalog`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    ...categoryUrls,
    { url: `${base}/trade-account`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${base}/contact`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${base}/terms`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/privacy`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]
}
