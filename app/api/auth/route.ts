import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// Demo credentials — replace with a real database lookup in production
const TRADE_ACCOUNTS: Record<string, string> = {
  'trade@petware.co.nz': '***REMOVED***',
  'demo@petware.co.nz': '***REMOVED***',
}

const SESSION_COOKIE = 'pw_trade_session'
const SESSION_DAYS   = 7

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    const normalised = email.trim().toLowerCase()
    const stored     = TRADE_ACCOUNTS[normalised]

    if (!stored || stored !== password) {
      // Deliberate vague message — don't reveal whether the email exists
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 })
    }

    // Set an httpOnly session cookie
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, normalised, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * SESSION_DAYS,
      path: '/',
    })

    return NextResponse.json({ success: true, redirect: '/portal' })
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

// Logout
export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  return NextResponse.json({ success: true })
}
