/**
 * POST /api/webhooks/jiwa
 *
 * Receives real-time webhook events from Jiwa 8.
 *
 * Jiwa can be configured to POST webhook payloads to this URL when:
 *   - Stock levels change (InventoryAdjustment, SalesOrder confirmed, PO received)
 *   - Price lists update
 *   - A new debtor account is created / updated
 *
 * To configure in Jiwa:
 *   Go to Settings → eCommerce → Webhooks and add this URL:
 *   https://petware.co.nz/api/webhooks/jiwa
 *
 * Security:
 *   Requests are validated against JIWA_WEBHOOK_SECRET. Any request with a
 *   missing or wrong secret returns 401 — never process it.
 *
 * Environment variables required:
 *   JIWA_WEBHOOK_SECRET   — shared secret set in Jiwa webhook config
 */

import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export const runtime = 'nodejs'

// Jiwa sends JSON webhooks with this shape
type JiwaWebhookPayload = {
  EventType: string    // e.g. 'InventoryItem.StockLevel', 'PriceList.Updated', 'Debtor.Created'
  EntityID?: string    // The ID of the changed entity
  EntityCode?: string  // Human-readable code (e.g. SKU)
  ChangedFields?: string[]
  Timestamp: string
  // Raw data from the changed record (varies by event type)
  Data?: Record<string, unknown>
}

export async function POST(req: NextRequest) {
  // ── Authentication ────────────────────────────────────────────────────────

  const secret = process.env.JIWA_WEBHOOK_SECRET
  if (!secret) {
    console.error('[webhook/jiwa] JIWA_WEBHOOK_SECRET is not configured')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const incomingSecret =
    req.headers.get('x-jiwa-secret') ??
    req.headers.get('authorization')?.replace('Bearer ', '')

  if (!incomingSecret || incomingSecret !== secret) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  // ── Parse payload ─────────────────────────────────────────────────────────

  let payload: JiwaWebhookPayload
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  console.log(`[webhook/jiwa] ${payload.EventType} — entity: ${payload.EntityID ?? 'n/a'}`)

  // ── Handle events ─────────────────────────────────────────────────────────

  try {
    switch (true) {
      // Stock level changed — bust the products cache
      case payload.EventType.startsWith('InventoryItem'):
        revalidateTag('products')
        revalidateTag(`product-${payload.EntityID}`)
        break

      // Price list changed — bust products (prices embedded in response)
      case payload.EventType.startsWith('PriceList'):
        revalidateTag('products')
        break

      // New / updated debtor account — no cache action needed
      case payload.EventType.startsWith('Debtor'):
        console.log(`[webhook/jiwa] Debtor ${payload.EventType}: ${payload.EntityCode}`)
        break

      default:
        console.log(`[webhook/jiwa] Unhandled event type: ${payload.EventType}`)
    }
  } catch (err) {
    console.error('[webhook/jiwa] Error handling event:', err)
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true, event: payload.EventType })
}
