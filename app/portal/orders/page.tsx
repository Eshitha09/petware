/**
 * /portal/orders
 *
 * Order history for logged-in trade accounts.
 * When Jiwa is connected: pulls real orders from jiwa.getSalesOrdersByDebtor().
 * When Jiwa is not connected: shows placeholder order history.
 *
 * Protected by middleware.ts (withAuth).
 */

import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import PortalLogout from '@/components/PortalLogout'
import { jiwa, type JiwaSalesOrderResult } from '@/lib/jiwa'

export const metadata: Metadata = {
  title: 'Order History — Petware Ltd Portal',
  robots: { index: false, follow: false },
}

const STATUS_COLOURS: Record<string, string> = {
  Delivered:  'delivered',
  Processing: 'processing',
  Shipped:    'shipped',
  'On Hold':  'on-hold',
  Cancelled:  'cancelled',
}

type DisplayOrder = {
  id: string
  date: string
  items: number | string
  total: string
  status: string
  lines: Array<{ sku: string; name: string; qty: number | string; unitPrice: string }>
}

async function fetchOrders(email: string): Promise<{ orders: DisplayOrder[]; source: string }> {
  if (!process.env.JIWA_API_URL) return { orders: [], source: 'placeholder' }

  try {
    const debtor = await jiwa.findDebtorByEmail(email)
    if (!debtor) return { orders: [], source: 'placeholder' }

    const raw: JiwaSalesOrderResult[] = await jiwa.getSalesOrdersByDebtor(debtor.DebtorID, 20)
    const orders: DisplayOrder[] = raw.map((o) => ({
      id:     o.OrderNumber ?? o.SalesOrderID,
      date:   o.SalesOrderID ?? '—',
      items:  o.Lines?.length ?? 0,
      total:  o.TotalAmount != null ? `$${o.TotalAmount.toFixed(2)}` : '—',
      status: o.Status ?? 'Unknown',
      lines: (o.Lines ?? []).map((l) => ({
        sku:       l.ItemCode,
        name:      l.ItemCode,
        qty:       l.Quantity,
        unitPrice: l.UnitPrice != null ? `$${l.UnitPrice.toFixed(2)}` : '—',
      })),
    }))
    return { orders, source: 'jiwa' }
  } catch (err) {
    console.error('[portal/orders] Jiwa fetch failed:', err)
    return { orders: [], source: 'placeholder' }
  }
}

export default async function PortalOrdersPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login?next=/portal/orders')

  const email = session.user?.email ?? ''
  const { orders, source } = await fetchOrders(email)
  const jiwaConnected = source === 'jiwa'

  return (
    <div className="portal-page">
      <header className="portal-header">
        <Link href="/" className="portal-logo">Petware</Link>
        <nav className="portal-subnav">
          <Link href="/portal">Dashboard</Link>
          <Link href="/portal/catalog">Catalogue</Link>
          <Link href="/portal/orders" className="active">Orders</Link>
        </nav>
        <div className="portal-header-right">
          <span className="portal-account-email">{email}</span>
          <PortalLogout />
        </div>
      </header>

      <main className="portal-main">
        <div className="portal-welcome">
          <div>
            <p className="portal-welcome-label">Order History</p>
            <h1 className="portal-welcome-hed">Your Orders</h1>
            <p className="portal-welcome-sub">
              {jiwaConnected
                ? `${orders.length} order${orders.length !== 1 ? 's' : ''} on your account.`
                : 'Connect your Jiwa account to see live order history. For invoice copies, email accounts@petware.co.nz'}
            </p>
          </div>
          <Link className="btn-fill" href="/portal/catalog">Place New Order →</Link>
        </div>

        <section className="portal-section">
          {orders.length === 0 ? (
            <div className="portal-empty">
              <p>{jiwaConnected ? 'No orders found on your account.' : 'Order history will appear here once your Jiwa account is linked.'}</p>
              <Link href="/contact">Contact us to get set up</Link>
            </div>
          ) : (
            <div className="portal-orders">
              <div className="portal-orders-head">
                <span>Order ID</span>
                <span>Date</span>
                <span>Items</span>
                <span>Total</span>
                <span>Status</span>
                <span></span>
              </div>
              {orders.map((o) => (
                <details key={o.id} className="portal-order-row portal-order-expandable">
                  <summary className="portal-order-summary">
                    <span className="portal-order-id">{o.id}</span>
                    <span>{o.date}</span>
                    <span>{typeof o.items === 'number' ? `${o.items} items` : o.items}</span>
                    <span className="portal-order-total">{o.total}</span>
                    <span className={`portal-order-status ${STATUS_COLOURS[o.status] ?? ''}`}>
                      {o.status}
                    </span>
                    <span className="portal-order-expand-icon">▸</span>
                  </summary>

                  <div className="portal-order-lines">
                    {o.lines.length > 0 ? (
                      <table className="portal-lines-table">
                        <thead>
                          <tr>
                            <th>SKU</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {o.lines.map((line, i) => (
                            <tr key={i}>
                              <td className="portal-line-sku">{line.sku}</td>
                              <td>{line.name}</td>
                              <td>{line.qty}</td>
                              <td>{line.unitPrice}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p style={{ padding: '1rem', opacity: 0.5 }}>No line items available.</p>
                    )}
                    <div className="portal-order-actions">
                      <a
                        href={`mailto:accounts@petware.co.nz?subject=Invoice Request — ${o.id}`}
                        className="btn-line"
                      >
                        Request Invoice
                      </a>
                      <a
                        href={`mailto:accounts@petware.co.nz?subject=Reorder — ${o.id}`}
                        className="btn-fill"
                      >
                        Reorder →
                      </a>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          )}
        </section>

        <section className="portal-section portal-account-info" style={{ marginTop: '2rem' }}>
          <h2 className="portal-section-hed">Need help with an order?</h2>
          <div className="portal-account-grid">
            <div className="portal-account-block">
              <p className="portal-account-label">Accounts &amp; Invoices</p>
              <p className="portal-account-value">accounts@petware.co.nz</p>
            </div>
            <div className="portal-account-block">
              <p className="portal-account-label">Sales Team</p>
              <p className="portal-account-value">0800 800 135</p>
            </div>
            <div className="portal-account-block">
              <p className="portal-account-label">General</p>
              <p className="portal-account-value">petware@petware.co.nz</p>
            </div>
            <div className="portal-account-block">
              <p className="portal-account-label">Hours</p>
              <p className="portal-account-value">Mon – Fri, 10am – 3pm NZST</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
