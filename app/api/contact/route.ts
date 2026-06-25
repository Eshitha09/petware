import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  // Rate limit: 5 submissions per IP per 10 minutes
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const { limited } = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60_000 })
  if (limited) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  try {
    const body = await req.json()
    const { name, email, company, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // ── Email sending ─────────────────────────────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? 'noreply@petware.co.nz',
        to:   process.env.CONTACT_EMAIL    ?? 'petware@petware.co.nz',
        replyTo: email,
        subject: `[Petware Contact] ${subject}`,
        html: `
          <h2>New contact form submission</h2>
          <table cellpadding="8" style="border-collapse:collapse">
            <tr><td><strong>Name</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email</strong></td><td>${email}</td></tr>
            ${company ? `<tr><td><strong>Company</strong></td><td>${company}</td></tr>` : ''}
            <tr><td><strong>Subject</strong></td><td>${subject}</td></tr>
            <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
            <tr><td><strong>Sent at</strong></td><td>${new Date().toISOString()}</td></tr>
          </table>
        `,
      })

      if (error) {
        console.error('[/api/contact] Resend error:', error)
        return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
      }
    } else {
      // Local dev fallback — log to console when Resend is not configured
      console.log('[Petware] Contact form submission (no RESEND_API_KEY set):', {
        name, email, company, subject, message,
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      success: true,
      message: "Thanks for your message. We'll be in touch within one business day.",
    })
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
