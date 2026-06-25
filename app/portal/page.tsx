import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import PortalLogout from '@/components/PortalLogout'
import { jiwa } from '@/lib/jiwa'

export const metadata: Metadata = {
  title: 'Trade Portal — Petware Ltd',
  description: 'Petware Ltd wholesale trade portal.',
  robots: { index: false, follow: false },
}

const QUICK_ORDER = [
  { cat: 'Dog & Cat',     img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80&fit=crop',  href: '/catalog' },
  { cat: 'Food Range',    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80&fit=crop', href: '/catalog' },
  { cat: 'Bird Supplies', img: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=400&q=80&fit=crop', href: '/catalog' },
  { cat: 'Aquatic',       img: 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=400&q=80&fit=crop', href: '/catalog' },
  { cat: 'Reptile',       img: 'https://images.unsplash.com/OVxfmbKtzaA?w=400&q=80&fit=crop',                     href: '/catalog' },
  { cat: 'Small Animals', img: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&q=80&fit=crop', href: '/catalog' },
]

// Placeholder orders shown when Jiwa is not connected
const PLACEHOLDER_ORDERS = [
  { id: 'PW-0001', date: '—', items: '—', total: '—', status: 'Connect Jiwa to view orders' },
]

type Order = {
  id: string
  date: string
  items: string | number
  total: string
  status: string
}

async function fetchOrders(email: string): Promise<{ orders: Order[]; source: string }> {
  if (!process.env.JIWA_API_URL) {
    return { orders: PLACEHOLDER_ORDERS, source: 'placeholder' }
  }

  try {
    const debtor = await jiwa.findDebtorByEmail(email)
    if (!debtor) return { orders: PLACEHOLDER_ORDERS, source: 'placeholder' }

    const raw = await jiwa.getSalesOrdersByDebtor(debtor.DebtorID, 5)
    const orders: Order[] = raw.map((o) => ({
      id:     o.OrderNumber ?? o.SalesOrderID,
      date:   o.SalesOrderID ?? '—',
      items:  o.Lines?.length ?? '—',
      total:  o.TotalAmount != null ? `$${o.TotalAmount.toFixed(2)}` : '—',
      status: o.Status ?? '—',
    }))
    return { orders, source: 'jiwa' }
  } catch (err) {
    console.error('[portal] Failed to fetch orders from Jiwa:', err)
    return { orders: PLACEHOLDER_ORDERS, source: 'placeholder' }
  }
}

export default async function PortalPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login?next=/portal')

  const email = session.user?.email ?? ''
  const { orders, source } = await fetchOrders(email)

  return (
    <div className="portal-page">

      {/* ── PORTAL NAV ── */}
      <header className="portal-header">
        <Link href="/" className="portal-logo">Petware</Link>
        <div className="portal-header-right">
          <span className="portal-account-email">{email}</span>
          <PortalLogout />
        </div>
      </header>

      <main className="portal-main">

        {/* Welcome */}
        <div className="portal-welcome">
          <div>
            <p className="portal-welcome-label">Trade Portal</p>
            <h1 className="portal-welcome-hed">Welcome back.</h1>
            <p className="portal-welcome-sub">Your Petware wholesale account is active. Browse the catalogue or place a new order.</p>
          </div>
          <Link className="btn-fill" href="/catalog">Browse Full Catalogue →</Link>
        </div>

        {/* Quick order by category */}
        <section className="portal-section">
          <h2 className="portal-section-hed">Quick Order by Category</h2>
          <div className="portal-cat-grid">
            {QUICK_ORDER.map((c, i) => (
              <Link key={i} href={c.href} className="portal-cat-card">
                <img src={c.img} alt={c.cat} loading="lazy" />
                <div className="portal-cat-overlay" />
                <span className="portal-cat-name">{c.cat}</span>
                <span className="portal-cat-arr">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent orders */}
        <section className="portal-section">
          <div className="portal-section-header">
            <h2 className="portal-section-hed">Recent Orders</h2>
            <Link href="/contact" className="portal-link">Need help with an order?</Link>
          </div>
          {source === 'placeholder' && (
            <p style={{ fontSize: '.85rem', color: 'rgba(15,18,9,.45)', marginBottom: '1rem' }}>
              Live order data will appear here once your Jiwa account is linked.
            </p>
          )}
          <div className="portal-orders">
            <div className="portal-orders-head">
              <span>Order ID</span>
              <span>Date</span>
              <span>Items</span>
              <span>Total</span>
              <span>Status</span>
            </div>
            {orders.map((o, i) => (
              <div key={i} className="portal-order-row">
                <span className="portal-order-id">{o.id}</span>
                <span>{o.date}</span>
                <span>{typeof o.items === 'number' ? `${o.items} items` : o.items}</span>
                <span className="portal-order-total">{o.total}</span>
                <span className={`portal-order-status ${o.status === 'Delivered' ? 'delivered' : ''}`}>
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Account info */}
        <section className="portal-section portal-account-info">
          <h2 className="portal-section-hed">Account Details</h2>
          <div className="portal-account-grid">
            <div className="portal-account-block">
              <p className="portal-account-label">Account Email</p>
              <p className="portal-account-value">{email}</p>
            </div>
            <div className="portal-account-block">
              <p className="portal-account-label">Account Type</p>
              <p className="portal-account-value">Wholesale Trade</p>
            </div>
            <div className="portal-account-block">
              <p className="portal-account-label">Sales Contact</p>
              <p className="portal-account-value">accounts@petware.co.nz</p>
            </div>
            <div className="portal-account-block">
              <p className="portal-account-label">Support Line</p>
              <p className="portal-account-value">0800 800 135</p>
            </div>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link className="btn-fill" href="/catalog">View Catalogue</Link>
            <Link className="btn-line" href="/contact">Contact Sales</Link>
          </div>
        </section>

      </main>
    </div>
  )
}
