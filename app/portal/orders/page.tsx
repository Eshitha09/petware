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

export const metadata: Metadata = {
  title: 'Order History — Petware Ltd Portal',
  robots: { index: false, follow: false },
}

// Placeholder orders shown when Jiwa is not configured
const PLACEHOLDER_ORDERS = [
  {
    id: 'PW-8821',
    date: '14 Jun 2026',
    items: 24,
    total: '$3,480.00',
    status: 'Delivered',
    lines: [
      { sku: 'PW-RL-5M', name: 'Pawise Retractable Lead 5m', qty: 12, unitPrice: '$28.50' },
      { sku: 'PW-BED-90', name: 'Pawise Orthopaedic Dog Bed', qty: 4, unitPrice: '$89.00' },
      { sku: 'VC-FT-SD3', name: 'Vetcare Flea & Tick Spot-On 3-Pack', qty: 8, unitPrice: '$42.00' },
    ],
  },
  {
    id: 'PW-8794',
    date: '28 May 2026',
    items: 18,
    total: '$2,190.00',
    status: 'Delivered',
    lines: [
      { sku: 'JW-RIO-125', name: 'Juwel Rio 125 Aquarium Set', qty: 2, unitPrice: '$389.00' },
      { sku: 'AZ-HTR-25', name: 'Aqua Zonic Nano Heater 25W', qty: 12, unitPrice: '$24.50' },
      { sku: 'OM-SLT-25', name: 'Ocean Max Marine Salt 25kg', qty: 4, unitPrice: '$68.00' },
    ],
  },
  {
    id: 'PW-8760',
    date: '09 May 2026',
    items: 31,
    total: '$4,750.00',
    status: 'Delivered',
    lines: [
      { sku: 'FD-ADG-15', name: 'Premium Adult Dog Dry Food 15kg', qty: 8, unitPrice: '$88.00' },
      { sku: 'FD-GFL-12', name: 'Grain-Free Dog Food — Lamb 12kg', qty: 6, unitPrice: '$92.00' },
      { sku: 'LIT-CLM-10', name: 'Premium Clumping Litter 10kg', qty: 12, unitPrice: '$24.50' },
      { sku: 'PW-GRM-SLK', name: 'Pawise Slicker Brush — Large', qty: 5, unitPrice: '$18.00' },
    ],
  },
]

const STATUS_COLOURS: Record<string, string> = {
  Delivered: 'delivered',
  Processing: 'processing',
  Shipped: 'shipped',
  'On Hold': 'on-hold',
  Cancelled: 'cancelled',
}

export default async function PortalOrdersPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login?next=/portal/orders')

  const jiwaConnected = !!(
    process.env.JIWA_API_URL && process.env.JIWA_USERNAME && process.env.JIWA_PASSWORD
  )

  // When Jiwa is connected, orders would be fetched server-side here:
  // const debtor = await jiwa.findDebtorByEmail(session.user!.email!)
  // const orders = debtor ? await jiwa.getSalesOrdersByDebtor(debtor.DebtorID) : []

  const orders = PLACEHOLDER_ORDERS

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
          <span className="portal-account-email">{session.user?.email}</span>
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
                ? 'Live order data from Jiwa.'
                : 'Showing recent order history. For invoice copies, email accounts@petware.co.nz'}
            </p>
          </div>
          <Link className="btn-fill" href="/portal/catalog">Place New Order →</Link>
        </div>

        {/* Order list */}
        <section className="portal-section">
          {/* Summary table */}
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
                  <span>{o.items} items</span>
                  <span className="portal-order-total">{o.total}</span>
                  <span className={`portal-order-status ${STATUS_COLOURS[o.status] ?? ''}`}>
                    {o.status}
                  </span>
                  <span className="portal-order-expand-icon">▸</span>
                </summary>

                {/* Expanded order lines */}
                <div className="portal-order-lines">
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
        </section>

        {/* Need help */}
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
