'use client'
import { useState, FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl  = searchParams.get('next') || '/portal'

  const [status, setStatus] = useState<'idle' | 'loading' | 'google' | 'error'>('idle')
  const [errMsg, setErrMsg]  = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')
    const fd  = new FormData(e.currentTarget)
    const res = await signIn('credentials', {
      email:       fd.get('email'),
      password:    fd.get('password'),
      redirect:    false,
      callbackUrl,
    })
    if (res?.error) {
      setStatus('error')
      setErrMsg('Incorrect email or password.')
    } else if (res?.url) {
      window.location.href = res.url
    }
  }

  function handleGoogle() {
    setStatus('google')
    signIn('google', { callbackUrl })
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(247,245,240,.06)',
    border: '1px solid rgba(247,245,240,.12)',
    color: 'var(--paper)',
    borderRadius: '4px',
    padding: '.85rem 1rem',
    width: '100%',
    fontFamily: 'inherit',
    fontSize: '.95rem',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* ── Google SSO ── */}
      <button
        type="button"
        onClick={handleGoogle}
        disabled={status === 'google' || status === 'loading'}
        className="google-sso-btn"
      >
        {status === 'google' ? (
          <span style={{ opacity: 0.6 }}>Redirecting to Google…</span>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </>
        )}
      </button>

      <div className="login-divider">
        <span>or sign in with email</span>
      </div>

      {/* ── Credentials form ── */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div className="field" style={{ marginBottom: '1.2rem' }}>
          <label htmlFor="lemail" style={{ color: 'rgba(247,245,240,.5)', display: 'block', marginBottom: '.4rem', fontSize: '.84rem', letterSpacing: '.04em', textTransform: 'uppercase' }}>
            Email Address
          </label>
          <input type="email" id="lemail" name="email" required style={inputStyle} />
        </div>

        <div className="field" style={{ marginBottom: '1.75rem' }}>
          <label htmlFor="lpass" style={{ color: 'rgba(247,245,240,.5)', display: 'block', marginBottom: '.4rem', fontSize: '.84rem', letterSpacing: '.04em', textTransform: 'uppercase' }}>
            Password
          </label>
          <input type="password" id="lpass" name="password" required style={inputStyle} />
        </div>

        {status === 'error' && (
          <p style={{ color: '#e05040', fontSize: '.84rem', marginBottom: '1.2rem', textAlign: 'center' }}>{errMsg}</p>
        )}

        <button
          type="submit"
          className="btn-fill"
          disabled={status === 'loading' || status === 'google'}
          style={{ width: '100%', textAlign: 'center', cursor: status === 'loading' ? 'wait' : 'pointer', borderRadius: '4px' }}
        >
          {status === 'loading' ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '.82rem', color: 'rgba(247,245,240,.35)' }}>
        <p>Don&apos;t have an account?{' '}
          <Link href="/trade-account" style={{ color: 'var(--sage-light)', textDecoration: 'none' }}>Apply here</Link>
        </p>
        <p style={{ marginTop: '.5rem' }}>
          <Link href="/contact" style={{ color: 'rgba(247,245,240,.35)', textDecoration: 'none' }}>Forgot password? Contact us</Link>
        </p>
      </div>
    </div>
  )
}
