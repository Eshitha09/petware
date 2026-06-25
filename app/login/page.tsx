import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import LoginForm from '@/components/LoginForm'

export const metadata: Metadata = {
  title: 'Trade Login — Petware Ltd Wholesale Portal',
  description: 'Sign in to the Petware Ltd wholesale trade portal.',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <div className="login-page">
      {/* Background image — very subtle, not distracting */}
      <div className="login-bg" />

      <div className="login-card">
        <div className="login-box">
          <h1 className="login-heading">Trade Login</h1>

          <Suspense fallback={<p style={{ color: 'rgba(247,245,240,.4)', textAlign: 'center' }}>Loading…</p>}>
            <LoginForm />
          </Suspense>
        </div>

      </div>
    </div>
  )
}
