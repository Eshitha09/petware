import type { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

// Demo trade accounts — emails and bcrypt hashes loaded from env vars.
// To generate a new hash: node -e "console.log(require('bcryptjs').hashSync('yourpassword', 12))"
// Store hashes in .env.local (never commit plaintext passwords).
const DEMO_ACCOUNTS: Record<string, string> = {
  [process.env.DEMO_EMAIL_1 ?? '']: process.env.DEMO_HASH_1 ?? '',
  [process.env.DEMO_EMAIL_2 ?? '']: process.env.DEMO_HASH_2 ?? '',
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'select_account',
          // Restrict to Google Workspace (company) accounts only.
          // Remove this line to allow personal Gmail accounts as well.
          hd: process.env.GOOGLE_ALLOWED_DOMAIN ?? '*',
        },
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const email = credentials.email.trim().toLowerCase()
        const hash  = DEMO_ACCOUNTS[email]
        if (!hash) return null
        const valid = await bcrypt.compare(credentials.password, hash)
        if (!valid) return null
        return { id: email, email, name: email }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    error:  '/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      // Persist email into the token on first sign-in
      if (user?.email) token.email = user.email
      return token
    },
    async session({ session, token }) {
      // Expose email from JWT to the session object
      if (token.email && session.user) {
        session.user.email = token.email as string
      }
      return session
    },
    async signIn({ account, profile }) {
      // For Google sign-ins: optionally check the hosted domain
      if (account?.provider === 'google') {
        const allowedDomain = process.env.GOOGLE_ALLOWED_DOMAIN
        // If GOOGLE_ALLOWED_DOMAIN is set, restrict to that domain only
        if (allowedDomain && allowedDomain !== '*') {
          const email = profile?.email ?? ''
          return email.endsWith(`@${allowedDomain}`)
        }
      }
      return true
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  secret: process.env.NEXTAUTH_SECRET,
}
