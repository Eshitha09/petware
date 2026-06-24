/**
 * /portal/catalog
 *
 * Trade portal product catalog — requires authentication.
 * Shows all products with "Trade Pricing" label where Jiwa is not connected,
 * and live Jiwa pricing when the API is configured.
 *
 * Protected by middleware.ts (withAuth).
 */

import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import PortalLogout from '@/components/PortalLogout'
import { PRODUCTS, CATEGORIES, type CategorySlug } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Trade Catalogue — Petware Ltd Portal',
  robots: { index: false, follow: false },
}

const CAT_SLUGS = Object.keys(CATEGORIES) as CategorySlug[]

export default async function PortalCatalogPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login?next=/portal/catalog')

  const activeCategory = (searchParams.category as CategorySlug) ?? null
  const query = searchParams.q?.toLowerCase() ?? ''

  let products = [...PRODUCTS]
  if (activeCategory) products = products.filter((p) => p.category === activeCategory)
  if (query) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query)
    )
  }

  const jiwaConnected = !!(
    process.env.JIWA_API_URL && process.env.JIWA_USERNAME && process.env.JIWA_PASSWORD
  )

  return (
    <div className="portal-page">
      {/* Portal header */}
      <header className="portal-header">
        <Link href="/" className="portal-logo">Petware</Link>
        <nav className="portal-subnav">
          <Link href="/portal">Dashboard</Link>
          <Link href="/portal/catalog" className="active">Catalogue</Link>
          <Link href="/portal/orders">Orders</Link>
        </nav>
        <div className="portal-header-right">
          <span className="portal-account-email">{session.user?.email}</span>
          <PortalLogout />
        </div>
      </header>

      <main className="portal-main">
        {/* Page header */}
        <div className="portal-welcome">
          <div>
            <p className="portal-welcome-label">Trade Catalogue</p>
            <h1 className="portal-welcome-hed">Browse &amp; Order</h1>
            <p className="portal-welcome-sub">
              {jiwaConnected
                ? 'Live pricing and stock levels from Jiwa.'
                : 'Trade pricing shown. Contact Petware to connect live Jiwa pricing.'}
            </p>
          </div>
          <Link className="btn-fill" href="/contact">Contact Sales →</Link>
        </div>

        {/* Search + filter bar */}
        <form method="GET" className="portal-catalog-bar">
          <input
            name="q"
            type="search"
            placeholder="Search products, SKU, or brand…"
            defaultValue={searchParams.q ?? ''}
            className="portal-search-input"
          />
          <div className="portal-cat-filters">
            <Link
              href="/portal/catalog"
              className={`cat-nav-pill${!activeCategory ? ' active' : ''}`}
            >
              All
            </Link>
            {CAT_SLUGS.map((slug) => (
              <Link
                key={slug}
                href={`/portal/catalog?category=${slug}`}
                className={`cat-nav-pill${activeCategory === slug ? ' active' : ''}`}
              >
                {CATEGORIES[slug].label}
              </Link>
            ))}
          </div>
        </form>

        {/* Product count */}
        <p className="portal-product-count">{products.length} products</p>

        {/* Product grid */}
        <div className="portal-product-grid">
          {products.map((product) => (
            <article key={product.id} className="portal-product-card">
              <div className="portal-product-img-wrap">
                <img
                  src={product.img}
                  alt={product.name}
                  className="portal-product-img"
                  loading="lazy"
                />
                <div className="cat-product-badges">
                  {product.new && <span className="badge-new">New</span>}
                  {product.featured && <span className="badge-feat">Best Seller</span>}
                </div>
              </div>
              <div className="portal-product-body">
                <p className="cat-product-brand">{product.brand}</p>
                <h3 className="portal-product-name">{product.name}</h3>
                <p className="cat-product-sku">SKU: {product.sku}</p>
                <p className="cat-product-desc">{product.description}</p>
                <ul className="cat-product-specs">
                  {product.specs.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
                <div className="portal-product-footer">
                  {jiwaConnected ? (
                    <span className="portal-price-live">Loading price…</span>
                  ) : (
                    <span className="portal-price-contact">Contact for pricing</span>
                  )}
                  <a
                    href={`mailto:accounts@petware.co.nz?subject=Order Enquiry — ${product.sku}`}
                    className="portal-order-btn"
                  >
                    Enquire →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {products.length === 0 && (
          <div className="portal-empty">
            <p>No products found{query ? ` for "${query}"` : ''}.</p>
            <Link href="/portal/catalog">Clear filters</Link>
          </div>
        )}
      </main>
    </div>
  )
}
