/**
 * GET /api/products
 *
 * Returns the product catalogue.
 *
 * Strategy:
 *   1. Attempt to fetch live data from Jiwa REST API
 *   2. On failure (Jiwa offline / not configured), fall back to static catalogue
 *
 * Query params:
 *   ?category=dogs-cats    — filter by category slug
 *   ?q=pawise              — search by name/brand/sku
 *   ?featured=true         — only featured products
 *
 * Response is cached for 5 minutes at the CDN edge (Vercel).
 * Jiwa webhooks invalidate the cache when stock changes (see /api/webhooks/jiwa).
 */

import { NextRequest, NextResponse } from 'next/server'
import { jiwa } from '@/lib/jiwa'
import { PRODUCTS, CATEGORIES, type CategorySlug } from '@/lib/products'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const category  = searchParams.get('category') as CategorySlug | null
  const query     = searchParams.get('q')?.toLowerCase()
  const featured  = searchParams.get('featured') === 'true'

  // ── 1. Attempt Jiwa ──────────────────────────────────────────────────────

  let jiwaEnabled = false

  if (process.env.JIWA_API_URL && process.env.JIWA_USERNAME && process.env.JIWA_PASSWORD) {
    try {
      const items = await jiwa.getInventoryItems()

      if (items.length > 0) {
        jiwaEnabled = true

        // Map Jiwa inventory items to our product shape
        let results = items.map((item) => ({
          id: item.InventoryItemID,
          sku: item.ItemCode,
          name: item.Description,
          brand: '', // Jiwa may not have a separate brand field — use custom field if set up
          category: (item.CategoryDescription?.toLowerCase().replace(/\s+/g, '-') ?? 'uncategorised') as CategorySlug,
          subcategory: '',
          description: item.SalesDescription ?? item.Description,
          specs: [`QOH: ${item.QuantityOnHand}`, `UOM: ${item.UnitOfMeasure}`],
          img: item.ImageURL ?? '',
          sku_raw: item.ItemCode,
          quantityOnHand: item.QuantityOnHand,
          // unitPrice is only returned for authenticated trade users — strip here
          // (price is served separately via /api/portal/pricing for logged-in users)
        }))

        if (category) results = results.filter((p) => p.category === category)
        if (query)    results = results.filter((p) =>
          p.name.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
        )

        return NextResponse.json(
          { source: 'jiwa', products: results, categories: CATEGORIES },
          { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' } }
        )
      }
    } catch (err) {
      // Log error server-side, fall through to static catalogue
      console.error('[/api/products] Jiwa fetch failed, using static fallback:', err)
    }
  }

  // ── 2. Static fallback ───────────────────────────────────────────────────

  let results = [...PRODUCTS]

  if (category)  results = results.filter((p) => p.category === category)
  if (featured)  results = results.filter((p) => p.featured)
  if (query)     results = results.filter((p) =>
    p.name.toLowerCase().includes(query) ||
    p.brand.toLowerCase().includes(query) ||
    p.sku.toLowerCase().includes(query)
  )

  return NextResponse.json(
    {
      source: jiwaEnabled ? 'jiwa' : 'static',
      products: results,
      categories: CATEGORIES,
      total: results.length,
    },
    { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' } }
  )
}
