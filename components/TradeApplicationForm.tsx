'use client'
import { useState, FormEvent } from 'react'
import Link from 'next/link'

const CATEGORIES = [
  'Dog & Cat', 'Food Range', 'Bird Supplies', 'Aquatic',
  'Reptile', 'Commercial Grooming', 'Cat Litter', 'Small Animals',
]

export default function TradeApplicationForm() {
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errMsg, setErrMsg]   = useState('')
  const [cats, setCats]       = useState<string[]>([])

  const toggleCat = (c: string) =>
    setCats(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')

    const fd = new FormData(e.currentTarget)
    const body = {
      firstName:    fd.get('firstName'),
      lastName:     fd.get('lastName'),
      business:     fd.get('business'),
      businessType: fd.get('businessType'),
      gst:          fd.get('gst'),
      email:        fd.get('email'),
      phone:        fd.get('phone'),
      address:      fd.get('address'),
      categories:   cats,
      notes:        fd.get('notes'),
    }

    try {
      const res  = await fetch('/api/trade-application', {
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
        <h3>Application Received</h3>
        <p>Our accounts team will contact you within one business day to complete your setup.</p>
        <p style={{ marginTop: '.5rem', fontSize: '.85rem', color: 'rgba(15,18,9,.45)' }}>
          In the meantime, call us on <a href="tel:0800800135" style={{ color: 'var(--sage)', fontWeight: 600 }}>0800 800 135</a>.
        </p>
      </div>
    )
  }

  return (
    <form className="trade-form" onSubmit={handleSubmit}>
      <h3 className="form-heading">Business Details</h3>

      <div className="field-row">
        <div className="field">
          <label htmlFor="firstName">First Name *</label>
          <input type="text" id="firstName" name="firstName" required />
        </div>
        <div className="field">
          <label htmlFor="lastName">Last Name *</label>
          <input type="text" id="lastName" name="lastName" required />
        </div>
      </div>

      <div className="field">
        <label htmlFor="business">Business Name *</label>
        <input type="text" id="business" name="business" required />
      </div>

      <div className="field">
        <label htmlFor="businessType">Business Type *</label>
        <select id="businessType" name="businessType" required defaultValue="">
          <option value="" disabled>Select type…</option>
          <option>Pet Retail Store</option>
          <option>Grooming Salon</option>
          <option>Veterinary Practice</option>
          <option>Aquarium Specialist</option>
          <option>Online Retailer</option>
          <option>Other</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="gst">GST Number <span style={{ opacity: .5 }}>(optional)</span></label>
        <input type="text" id="gst" name="gst" placeholder="NZ GST number" />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="email">Email Address *</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone Number *</label>
          <input type="tel" id="phone" name="phone" required />
        </div>
      </div>

      <div className="field">
        <label htmlFor="address">Delivery Address *</label>
        <input type="text" id="address" name="address" required placeholder="Street address, city" />
      </div>

      <div className="field">
        <label>Categories of Interest</label>
        <div className="checkbox-grid">
          {CATEGORIES.map(c => (
            <label key={c} className="checkbox-item">
              <input
                type="checkbox"
                checked={cats.includes(c)}
                onChange={() => toggleCat(c)}
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="notes">Anything else?</label>
        <textarea id="notes" name="notes" />
      </div>

      {status === 'error' && (
        <p className="form-error">{errMsg}</p>
      )}

      <p className="form-note">
        By submitting you confirm you are a registered NZ business.
        View our <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <button
        type="submit"
        className="btn-fill"
        disabled={status === 'loading'}
        style={{ width: '100%', marginTop: '1.5rem', textAlign: 'center', cursor: status === 'loading' ? 'wait' : 'pointer' }}
      >
        {status === 'loading' ? 'Submitting…' : 'Submit Application'}
      </button>
    </form>
  )
}
