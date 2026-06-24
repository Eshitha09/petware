import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-bg" />
      <div className="notfound-content">
        <p className="notfound-code">404</p>
        <h1 className="notfound-hed">
          Page not<br /><em>found.</em>
        </h1>
        <p className="notfound-sub">
          This page doesn&apos;t exist or may have moved.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <Link className="btn-fill" href="/">Back to Home</Link>
          <Link className="btn-line" href="/catalog">View Catalogue</Link>
        </div>
      </div>
    </div>
  )
}
