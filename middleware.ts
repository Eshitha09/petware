import { withAuth } from 'next-auth/middleware'

// NextAuth's withAuth middleware automatically checks for a valid JWT session.
// If no session exists it redirects to the signIn page defined in authOptions (pages.signIn = '/login').
export default withAuth({
  pages: { signIn: '/login' },
})

export const config = {
  matcher: ['/portal/:path*'],
}
