import { NextRequest, NextResponse } from 'next/server'

const SESSION_COOKIE = 'pw_trade_session'

// Routes that require an active trade session
const PROTECTED = ['/portal']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isProtected = PROTECTED.some(p => pathname.startsWith(p))

  if (isProtected) {
    const session = req.cookies.get(SESSION_COOKIE)
    if (!session?.value) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/portal/:path*'],
}
