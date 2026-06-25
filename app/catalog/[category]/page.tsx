/**
 * /catalog/[category]
 *
 * Individual category product listing page.
 * Renders all products in the category with high-quality images,
 * specs, and brand. Prices are hidden — only shown to logged-in trade accounts.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  CATEGORIES,
  getProductsByCategory,
  type CategorySlug,
} from '@/lib/products'

type Props = { params: { category: string } }

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = CATEGORIES[params.category as CategorySlug]
  if (!cat) return { title: 'Not Found' }

  return {
    title: `${cat.label} — Wholesale Pet Supplies NZ | Petware Ltd`,
    description: `Wholesale ${cat.label.toLowerCase()} products from Petware Ltd. ${cat.desc} Available to registered NZ trade accounts.`,
    alternates: { canonical: `https://petware.co.nz/catalog/${params.category}` },
  }
}

export default function CategoryPage({ params }: Props) {
  const slug = params.category as CategorySlug
  const cat = CATEGORIES[slug]
  if (!cat) notFound()

  const products = getProductsByCategory(slug)
  const catKeys = Object.keys(CATEGORIES) as CategorySlug[]

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://petware.co.nz' },
      { '@type': 'ListItem', position: 2, name: 'Catalogue', item: 'https://petware.co.nz/catalog' },
      { '@type': 'ListItem', position: 3, name: cat.label, item: `https://petware.co.nz/catalog/${slug}` },
    ],
  }

  // Group products by subcategory
  const subcategories = Array.from(new Set(products.map((p) => p.subcategory)))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="cat-hero">
        <div
          className="cat-hero-img"
          style={{ backgroundImage: `url(${cat.img})` }}
          aria-hidden="true"
        />
        <div className="cat-hero-overlay" aria-hidden="true" />
        <div className="cat-hero-content">
          <div className="breadcrumb" style={{ marginBottom: '1.5rem' }}>
            <Link href="/">Home</Link>
            {' / '}
            <Link href="/catalog">Catalogue</Link>
            {' / '}
            <span style={{ color: 'rgba(247,245,240,.5)' }}>{cat.label}</span>
          </div>
          <p className="page-eyebrow" style={{ color: 'var(--gold)' }}>{cat.sub}</p>
          <h1 className="cat-hero-hed">{cat.label}</h1>
          <p className="cat-hero-sub">{cat.desc}</p>
          <Link className="btn-fill" href="/trade-account" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
            Apply for Trade Pricing →
          </Link>
        </div>
      </section>

      {/* ── Category nav strip ── */}
      <nav className="cat-nav-strip" aria-label="Product categories">
        <div className="cat-nav-inner">
          {catKeys.map((key) => (
            <Link
              key={key}
              href={`/catalog/${key}`}
              className={`cat-nav-pill${key === slug ? ' active' : ''}`}
            >
              {CATEGORIES[key].label}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── Product listing ── */}
      <section className="cat-products-section">
        <div className="cat-products-header">
          <p className="section-lbl" style={{ color: 'var(--sage-light)' }}>
            {products.length} products
          </p>
          <p className="cat-price-note">
            Prices visible to <Link href="/login">registered trade accounts</Link>
          </p>
        </div>

        {subcategories.map((subcat) => {
          const group = products.filter((p) => p.subcategory === subcat)
          return (
            <div key={subcat} className="cat-subcat-group">
              <h2 className="cat-subcat-hed">{subcat}</h2>
              <div className="cat-product-grid">
                {group.map((product) => (
                  <article key={product.id} className="cat-product-card">
                    <div className="cat-product-img-wrap">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="cat-product-img"
                        loading="lazy"
                      />
                      <div className="cat-product-badges">
                        {product.new && <span className="badge-new">New</span>}
                        {product.featured && <span className="badge-feat">Best Seller</span>}
                      </div>
                    </div>
                    <div className="cat-product-body">
                      <p className="cat-product-brand">{product.brand}</p>
                      <h3 className="cat-product-name">{product.name}</h3>
                      <p className="cat-product-sku">SKU: {product.sku}</p>
                      <p className="cat-product-desc">{product.description}</p>
                      <ul className="cat-product-specs">
                        {product.specs.map((spec, i) => (
                          <li key={i}>{spec}</li>
                        ))}
                      </ul>
                      <div className="cat-product-footer">
                        <span className="cat-product-price-label">Trade pricing</span>
                        <Link href="/login" className="cat-product-login-btn">
                          Login to see price →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )
        })}

        {/* Bottom CTA */}
        <div className="cat-bottom-cta">
          <h2 className="cat-cta-hed">Want trade pricing on all products?</h2>
          <p>Apply for a Petware wholesale account and get access to full pricing and ordering.</p>
          <div className="cta-btns" style={{ marginTop: '1.5rem' }}>
            <Link className="btn-fill" href="/trade-account">Apply for Trade Account</Link>
            <Link className="btn-line" href="/contact">Talk to Our Team</Link>
          </div>
        </div>
      </section>
    </>
  )
}
