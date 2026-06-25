/**
 * POST /api/webhooks
 *
 * Receives stock and price change notifications from Jiwa WMS.
 * Jiwa sends a POST with a shared secret header when inventory changes.
 *
 * Setup in Jiwa:
 *   Settings → eCommerce → Webhooks
 *   URL: https://petware.co.nz/api/webhooks
 *   Secret header: X-Jiwa-Secret → (value of JIWA_WEBHOOK_SECRET in .env)
 *
 * On valid webhook: revalidates the Next.js cache tag 'jiwa-inventory'
 * so the next request to /api/products fetches fresh data from Jiwa.
 */

import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  // ── 1. Verify shared secret ───────────────────────────────────────────────
  const secret = process.env.JIWA_WEBHOOK_SECRET
  if (!secret) {
    console.error('[/api/webhooks] JIWA_WEBHOOK_SECRET is not set — rejecting all webhooks')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const incoming = req.headers.get('x-jiwa-secret')
  if (!incoming || incoming !== secret) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  // ── 2. Parse payload ──────────────────────────────────────────────────────
  let payload: Record<string, unknown> = {}
  try {
    payload = await req.json()
  } catch {
    // Jiwa may send empty body on some event types — that's fine
  }

  const event = (payload.event as string) ?? 'unknown'
  console.log(`[/api/webhooks] Jiwa webhook received: ${event}`, payload)

  // ── 3. Revalidate product cache ───────────────────────────────────────────
  // This clears the 5-minute cache set in lib/jiwa.ts getInventoryItems()
  // so the next /api/products request fetches fresh data immediately.
  revalidateTag('jiwa-inventory')

  return NextResponse.json({ received: true, event })
}
