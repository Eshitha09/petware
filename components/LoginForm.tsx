'use client'
import { useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function LoginForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const next         = searchParams.get('next') || '/portal'

  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')

    const fd = new FormData(e.currentTarget)
    try {
      const res  = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: fd.get('email'), password: fd.get('password') }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed.')
      router.push(next)
    } catch (err: unknown) {
      setStatus('error')
      setErrMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div className="field" style={{ marginBottom: '1.2rem' }}>
        <label htmlFor="lemail" style={{ color: 'rgba(247,245,240,.5)' }}>Email Address</label>
        <input
          type="email" id="lemail" name="email" required
          style={{ background: 'rgba(247,245,240,.06)', border: '1px solid rgba(247,245,240,.12)', color: 'var(--paper)', borderRadius: '4px', padding: '.85rem 1rem', width: '100%', fontFamily: 'inherit', fontSize: '.95rem' }}
        />
      </div>

      <div className="field" style={{ marginBottom: '1.75rem' }}>
        <label htmlFor="lpass" style={{ color: 'rgba(247,245,240,.5)' }}>Password</label>
        <input
          type="password" id="lpass" name="password" required
          style={{ background: 'rgba(247,245,240,.06)', border: '1px solid rgba(247,245,240,.12)', color: 'var(--paper)', borderRadius: '4px', padding: '.85rem 1rem', width: '100%', fontFamily: 'inherit', fontSize: '.95rem' }}
        />
      </div>

      {status === 'error' && (
        <p style={{ color: '#e05040', fontSize: '.84rem', marginBottom: '1.2rem', textAlign: 'center' }}>{errMsg}</p>
      )}

      <button
        type="submit"
        className="btn-fill"
        disabled={status === 'loading'}
        style={{ width: '100%', textAlign: 'center', cursor: status === 'loading' ? 'wait' : 'pointer', borderRadius: '4px' }}
      >
        {status === 'loading' ? 'Signing in…' : 'Sign In'}
      </button>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '.82rem', color: 'rgba(247,245,240,.35)' }}>
        <p>Don&apos;t have an account?{' '}
          <Link href="/trade-account" style={{ color: 'var(--sage-light)', textDecoration: 'none' }}>Apply here</Link>
        </p>
        <p style={{ marginTop: '.5rem' }}>
          <Link href="/contact" style={{ color: 'rgba(247,245,240,.35)', textDecoration: 'none' }}>Forgot password? Contact us</Link>
        </p>
      </div>
    </form>
  )
}
