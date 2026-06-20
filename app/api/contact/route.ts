import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, company, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // ── EMAIL SENDING ─────────────────────────────────────────────────────
    // To enable real email delivery, install nodemailer or Resend:
    //   npm install resend
    // Then add your API key to .env.local:
    //   RESEND_API_KEY=re_xxxxxxxxxxxx
    //   CONTACT_EMAIL=accounts@petware.co.nz
    //
    // Example with Resend:
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'website@petware.co.nz',
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `Contact: ${subject}`,
    //   html: `<p>From: ${name} (${email})<br>Company: ${company}<br><br>${message}</p>`,
    // })

    console.log('[Petware] Contact form submission:', {
      name, email, company, subject, message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Thanks for your message. We'll be in touch within one business day.",
    })
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
