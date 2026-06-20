import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      firstName, lastName, business, businessType,
      gst, email, phone, address, categories, notes,
    } = body

    const required: Record<string, string> = { firstName, lastName, business, businessType, email, phone, address }
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

    // ── EMAIL SENDING ─────────────────────────────────────────────────────
    // To enable real email delivery, configure Resend or nodemailer.
    // See /api/contact/route.ts for setup instructions.
    //
    // CONTACT_EMAIL=accounts@petware.co.nz in .env.local

    console.log('[Petware] Trade application received:', {
      firstName, lastName, business, businessType,
      gst, email, phone, address,
      categories: categories || [],
      notes,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Application received. Our accounts team will contact you within one business day.",
    })
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
