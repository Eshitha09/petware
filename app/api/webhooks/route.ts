// Jiwa webhook events are handled at /api/webhooks/jiwa/route.ts
// This file exists only to return a helpful error for misconfigured webhook URLs.
import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { error: 'Wrong endpoint. Jiwa webhooks should point to /api/webhooks/jiwa' },
    { status: 404 }
  )
}
