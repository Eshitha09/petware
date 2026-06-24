'use client'
/**
 * CatalogGrid — editorial 3-column category grid for /catalog.
 *
 * Layout (3-col CSS grid):
 *   Row 1: [Dogs & Cats — 2col wide] [Food Range — 1col]
 *   Row 2: [Fish & Aquatic] [Reptile Supplies] [Bird Supplies]
 *   Row 3: [Commercial Grooming] [Cat Litter Range] [Small Animals]
 *
 * Animations (GSAP):
 *   1. Clip-path wipe-up on scroll entry — staggered by column position
 *   2. Image scroll parallax (yPercent on each card independently)
 *   3. Hover: image brighten + zoom, arrow rotate 45°, content lift
 */
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    tag: 'Most Popular',
    title: 'Dogs & Cats',
    sub: 'Essentials',
    desc: 'Food, accessories, health treatments, leads, collars, beds: your complete dog and cat range in one wholesale order.',
    img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=1400&q=90&fit=crop',
    href: '/catalog/dogs-cats',
    wide: true,
  },
  {
    tag: 'High Volume',
    title: 'Food Range',
    sub: 'Cat & Dog',
    desc: 'Premium nutritionally-complete formulas at wholesale pricing. Bulk quantities for high-volume retailers.',
    img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=1400&q=90&fit=crop',
    href: '/catalog/food',
    wide: false,
  },
  {
    tag: 'Aquatic',
    title: 'Fish & Aquatic',
    sub: 'Tanks & More',
    desc: 'Juwel, Aqua Zonic, Red Sea Reefer, and Ocean Max. Tanks, filters, food, and marine salts.',
    img: 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=1400&q=90&fit=crop',
    href: '/catalog/aquatic',
    wide: false,
  },
  {
    tag: 'Specialist',
    title: 'Reptile',
    sub: 'Supplies',
    desc: 'UVB lamps, heat projectors, complete habitat kits, and supplements for exotic pet retailers.',
    img: 'https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?w=1400&q=90&fit=crop',
    href: '/catalog/reptile',
    wide: false,
  },
  {
    tag: 'Popular',
    title: 'Bird',
    sub: 'Supplies',
    desc: 'Seed mixes, cages, perches, toys, and health products for parrots, canaries, and all bird varieties.',
    img: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=1400&q=90&fit=crop',
    href: '/catalog/birds',
    wide: false,
  },
  {
    tag: 'Grooming',
    title: 'Commercial',
    sub: 'Grooming',
    desc: 'Professional shampoos, conditioners, brushes, and salon equipment for grooming businesses.',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1400&q=90&fit=crop',
    href: '/catalog/grooming',
    wide: false,
  },
  {
    tag: 'Cat Litter',
    title: 'Cat Litter',
    sub: 'Range',
    desc: 'Clumping, crystal, natural, and eco litters in bulk cases for high-turnover pet stores.',
    img: 'https://images.unsplash.com/photo-1574144113084-b6f450cc5e30?w=1400&q=90&fit=crop',
    href: '/catalog/cat-litter',
    wide: false,
  },
  {
    tag: 'Small Animals',
    title: 'Small',
    sub: 'Animals',
    desc: 'Rabbits, guinea pigs, hamsters: hutches, bedding, food, wheels, and health treatments.',
    img: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=1400&q=90&fit=crop',
    href: '/catalog/small-animals',
    wide: false,
  },
]

export default function CatalogGrid() {
  const gridRef  = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      cardRefs.current.forEach((card, i) => {
        if (!card) return

        // ── CLIP-PATH WIPE-UP ENTRANCE ─────────────────────────────────
        // Stagger delay by column index (i % 3) so cards enter in waves
        const colDelay = (i % 3) * 0.1

        gsap.fromTo(card,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.25,
            ease: 'expo.inOut',
            delay: colDelay,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )

        // ── PER-CARD SCROLL PARALLAX ───────────────────────────────────
        const img = card.querySelector<HTMLImageElement>('.cg-img')
        if (img) {
          gsap.to(img, {
            yPercent: -12, ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.6,
            },
          })
        }

        // ── HOVER ANIMATIONS ───────────────────────────────────────────
        const arr  = card.querySelector<HTMLDivElement>('.cg-arr')
        const body = card.querySelector<HTMLDivElement>('.cg-content')

        const onEnter = () => {
          if (img) gsap.to(img, { scale: 1.08, filter: 'brightness(0.7) saturate(1.1)', duration: 0.75, ease: 'power2.out' })
          if (arr) gsap.to(arr, { rotate: 45, scale: 1.12, duration: 0.4, ease: 'power2.out' })
          if (body) gsap.to(body, { y: -10, duration: 0.5, ease: 'power2.out' })
        }

        const onLeave = () => {
          if (img) gsap.to(img, { scale: 1, filter: 'brightness(0.48) saturate(0.9)', duration: 0.9, ease: 'power3.out' })
          if (arr) gsap.to(arr, { rotate: 0, scale: 1, duration: 0.45, ease: 'power3.out' })
          if (body) gsap.to(body, { y: 0, duration: 0.55, ease: 'power3.out' })
        }

        card.addEventListener('mouseenter', onEnter)
        card.addEventListener('mouseleave', onLeave)
      })

    }, gridRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="catalog-grid-section">
      {/* Section header */}
      <div className="cg-header">
        <div>
          <p className="section-lbl" style={{ color: 'var(--sage-light)' }}>All Categories</p>
          <h2 className="cg-header-hed">Full product range</h2>
        </div>
        <Link className="btn-line" href="/trade-account">Apply for Trade Account →</Link>
      </div>

      {/* Editorial card grid */}
      <div className="cg-grid" ref={gridRef}>
        {categories.map((cat, i) => (
          <div
            key={i}
            ref={el => { cardRefs.current[i] = el }}
            className={`cg-card${cat.wide ? ' cg-wide' : ''}`}
            onClick={() => window.location.href = cat.href}
            style={{ cursor: 'pointer' }}
          >
            {/* Background image — GSAP drives parallax + filter */}
            <img
              className="cg-img"
              src={cat.img}
              alt={`${cat.title} ${cat.sub}`}
              loading="lazy"
            />

            {/* Bottom gradient overlay */}
            <div className="cg-overlay" />

            {/* Card content */}
            <div className="cg-content">
              <span className="cg-tag">{cat.tag}</span>
              <h3 className="cg-title">
                {cat.title}
                <em>{cat.sub}</em>
              </h3>
              <p className="cg-desc">{cat.desc}</p>
            </div>

            {/* Arrow badge — top right, rotates on hover */}
            <div className="cg-arr">↗</div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="catalog-cta">
        <p className="section-lbl reveal" style={{ color: 'var(--accent)', justifyContent: 'center' }}>Trade Accounts</p>
        <h2 className="catalog-cta-hed reveal d1">
          Open a trade account to access<br /><em>wholesale pricing.</em>
        </h2>
        <p className="reveal d2">
          Available to registered pet retailers, groomers, veterinary clinics, and specialty stores across New Zealand.
        </p>
        <div className="cta-btns reveal d3">
          <Link className="btn-fill" href="/trade-account">Apply for a Trade Account</Link>
          <Link className="btn-line" href="/contact">Talk to Our Team</Link>
        </div>
      </div>
    </section>
  )
}
