'use client'
import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')

    const fd = new FormData(e.currentTarget)
    const body = {
      name:    fd.get('name'),
      email:   fd.get('email'),
      company: fd.get('company'),
      subject: fd.get('subject'),
      message: fd.get('message'),
    }

    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed.')
      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3>Message Sent</h3>
        <p>Thanks for getting in touch. We&apos;ll reply within one business day.</p>
        <p style={{ marginTop: '.5rem', fontSize: '.85rem', color: 'rgba(15,18,9,.45)' }}>
          Urgent? Call us on <a href="tel:0800800135" style={{ color: 'var(--sage)', fontWeight: 600 }}>0800 800 135</a>.
        </p>
      </div>
    )
  }

  return (
    <form className="trade-form" onSubmit={handleSubmit}>
      <h3 className="form-heading">Send a Message</h3>

      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Your Name *</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email Address *</label>
          <input type="email" id="email" name="email" required />
        </div>
      </div>

      <div className="field">
        <label htmlFor="company">Business Name</label>
        <input type="text" id="company" name="company" />
      </div>

      <div className="field">
        <label htmlFor="subject">Subject *</label>
        <select id="subject" name="subject" required defaultValue="">
          <option value="" disabled>Select…</option>
          <option>New Trade Account Enquiry</option>
          <option>Product Question</option>
          <option>Order or Delivery</option>
          <option>Account / Invoice</option>
          <option>Other</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="message">Message *</label>
        <textarea id="message" name="message" required style={{ minHeight: '140px' }} />
      </div>

      {status === 'error' && (
        <p className="form-error">{errMsg}</p>
      )}

      <button
        type="submit"
        className="btn-fill"
        disabled={status === 'loading'}
        style={{ width: '100%', marginTop: '.5rem', textAlign: 'center', cursor: status === 'loading' ? 'wait' : 'pointer' }}
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
