/**
 * /api/orders
 *
 * GET  — Returns order history for the authenticated trade account.
 *         Pulls from Jiwa if configured, otherwise returns placeholder data.
 *
 * POST — Places a new order. Validates the session, resolves the Jiwa DebtorID
 *         from the user's email, and creates a Jiwa SalesOrder.
 *
 * Both endpoints require a valid NextAuth session (JWT). Unauthenticated
 * requests receive 401.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { jiwa, type JiwaSalesOrderLine } from '@/lib/jiwa'

export const runtime = 'nodejs'

// ─── GET — order history ─────────────────────────────────────────────────────

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  if (!process.env.JIWA_API_URL) {
    // Jiwa not connected — return placeholder orders
    return NextResponse.json({
      source: 'placeholder',
      orders: [
        { id: 'PW-8821', date: '2026-06-14', items: 24, total: 3480.0, status: 'Delivered' },
        { id: 'PW-8794', date: '2026-05-28', items: 18, total: 2190.0, status: 'Delivered' },
        { id: 'PW-8760', date: '2026-05-09', items: 31, total: 4750.0, status: 'Delivered' },
      ],
    })
  }

  try {
    const debtor = await jiwa.findDebtorByEmail(session.user.email)
    if (!debtor) {
      return NextResponse.json({ error: 'No Jiwa account linked to this email' }, { status: 404 })
    }
    const orders = await jiwa.getSalesOrdersByDebtor(debtor.DebtorID)
    return NextResponse.json({ source: 'jiwa', orders, debtor })
  } catch (err) {
    console.error('[/api/orders GET] Jiwa error:', err)
    return NextResponse.json({ error: 'Failed to fetch orders from Jiwa' }, { status: 502 })
  }
}

// ─── POST — place order ───────────────────────────────────────────────────────

type OrderPayload = {
  lines: Array<{
    inventoryItemId: string
    itemCode: string
    quantity: number
    unitPrice: number
  }>
  deliveryAddress?: string
  notes?: string
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  let body: OrderPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!body.lines || body.lines.length === 0) {
    return NextResponse.json({ error: 'Order must contain at least one line' }, { status: 400 })
  }

  if (!process.env.JIWA_API_URL) {
    return NextResponse.json(
      { error: 'Order submission unavailable: Jiwa is not configured on this server.' },
      { status: 503 }
    )
  }

  try {
    const debtor = await jiwa.findDebtorByEmail(session.user.email)
    if (!debtor) {
      return NextResponse.json(
        { error: 'Your email address is not linked to a Jiwa trade account. Contact Petware to link your account.' },
        { status: 404 }
      )
    }

    if (debtor.IsOnStop) {
      return NextResponse.json(
        { error: 'Your account is currently on credit stop. Please contact accounts@petware.co.nz.' },
        { status: 403 }
      )
    }

    const lines: JiwaSalesOrderLine[] = body.lines.map((l) => ({
      InventoryItemID: l.inventoryItemId,
      ItemCode: l.itemCode,
      Quantity: l.quantity,
      UnitPrice: l.unitPrice,
    }))

    const result = await jiwa.createSalesOrder({
      DebtorID: debtor.DebtorID,
      Lines: lines,
      DeliveryAddress: body.deliveryAddress,
      Notes: body.notes,
    })

    return NextResponse.json({ source: 'jiwa', order: result }, { status: 201 })
  } catch (err) {
    console.error('[/api/orders POST] Jiwa error:', err)
    return NextResponse.json({ error: 'Failed to submit order to Jiwa' }, { status: 502 })
  }
}
