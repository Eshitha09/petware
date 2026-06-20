import { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/login', '/api/'] }],
    sitemap: 'https://petware.co.nz/sitemap.xml',
    host: 'https://petware.co.nz',
  }
}
