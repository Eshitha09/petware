import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  // Rate limit: 3 applications per IP per hour
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const { limited } = rateLimit(`trade-app:${ip}`, { limit: 3, windowMs: 60 * 60_000 })
  if (limited) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  try {
    const body = await req.json()
    const {
      firstName, lastName, business, businessType,
      gst, email, phone, address, categories, notes,
    } = body

    const required: Record<string, string> = {
      firstName, lastName, business, businessType, email, phone, address,
    }
    const missing = Object.entries(required)
      .filter(([, v]) => !v?.trim())
      .map(([k]) => k)

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Please complete: ${missing.join(', ')}.` },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const categoryList = Array.isArray(categories) && categories.length > 0
      ? categories.join(', ')
      : 'None selected'

    // ── Email sending ─────────────────────────────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL        ?? 'noreply@petware.co.nz',
        to:   process.env.TRADE_APPLICATION_EMAIL  ?? 'accounts@petware.co.nz',
        replyTo: email,
        subject: `[Petware] New Trade Account Application — ${business}`,
        html: `
          <h2>New Trade Account Application</h2>
          <table cellpadding="8" style="border-collapse:collapse">
            <tr><td><strong>Name</strong></td><td>${firstName} ${lastName}</td></tr>
            <tr><td><strong>Business</strong></td><td>${business}</td></tr>
            <tr><td><strong>Business Type</strong></td><td>${businessType}</td></tr>
            <tr><td><strong>GST Number</strong></td><td>${gst || 'Not provided'}</td></tr>
            <tr><td><strong>Email</strong></td><td>${email}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
            <tr><td><strong>Delivery Address</strong></td><td>${address}</td></tr>
            <tr><td><strong>Categories</strong></td><td>${categoryList}</td></tr>
            ${notes ? `<tr><td><strong>Notes</strong></td><td style="white-space:pre-wrap">${notes}</td></tr>` : ''}
            <tr><td><strong>Submitted at</strong></td><td>${new Date().toISOString()}</td></tr>
          </table>
        `,
      })

      if (error) {
        console.error('[/api/trade-application] Resend error:', error)
        return NextResponse.json({ error: 'Failed to submit application. Please try again.' }, { status: 500 })
      }
    } else {
      // Local dev fallback — log to console when Resend is not configured
      console.log('[Petware] Trade application received (no RESEND_API_KEY set):', {
        firstName, lastName, business, businessType,
        gst, email, phone, address,
        categories: categories || [],
        notes,
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Application received. Our accounts team will contact you within one business day.',
    })
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
