'use client'
/**
 * CatalogHero — cinematic full-viewport hero for the /catalog page.
 *
 * Animations (all GSAP):
 *   1. Image zoom entrance: scale 1.12 → 1.0 over 2s
 *   2. Eyebrow fade+rise
 *   3. Headline lines wipe up from clip wrapper (expo.out, staggered)
 *   4. Sub-text fade+rise
 *   5. Scroll bar reveal (scaleY from top)
 *   6. Scroll-driven parallax: image drifts down as page scrolls
 *   7. Content fades + lifts as you scroll past hero
 *   8. Mouse parallax: outer wrapper drifts ±36px X, ±24px Y
 */
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HERO_IMG = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1800&q=85&fit=crop&crop=center'

export default function CatalogHero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const outerRef    = useRef<HTMLDivElement>(null)
  const imgRef      = useRef<HTMLDivElement>(null)
  const eyebrowRef  = useRef<HTMLParagraphElement>(null)
  const line1Ref    = useRef<HTMLSpanElement>(null)
  const line2Ref    = useRef<HTMLSpanElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const scrollBarRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── ENTRANCE TIMELINE ─────────────────────────────────────────────
      const tl = gsap.timeline({ delay: 0.1 })

      tl.from(imgRef.current, {
        scale: 1.12, duration: 2.0, ease: 'power2.out',
      }, 0)

      tl.from(eyebrowRef.current, {
        y: 14, opacity: 0, duration: 0.75, ease: 'power3.out',
      }, 0.35)

      tl.from([line1Ref.current, line2Ref.current], {
        y: '110%', skewY: 2.5, duration: 1.1,
        ease: 'expo.out', stagger: 0.1,
      }, 0.5)

      tl.from(subRef.current, {
        y: 20, opacity: 0, duration: 0.9, ease: 'power3.out',
      }, 0.82)

      tl.from(scrollBarRef.current, {
        scaleY: 0, opacity: 0, transformOrigin: 'top',
        duration: 0.8, ease: 'power2.out',
      }, 1.1)

      // ── SCROLL PARALLAX ───────────────────────────────────────────────
      gsap.to(imgRef.current, {
        yPercent: 22, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.0,
        },
      })

      // Content drifts + fades as hero exits
      gsap.to('.cat-hero-content', {
        y: -60, opacity: 0, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '55% top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // ── MOUSE PARALLAX ─────────────────────────────────────────────────
      const quickX = gsap.quickTo(outerRef.current, 'x', { duration: 1.4, ease: 'power3.out' })
      const quickY = gsap.quickTo(outerRef.current, 'y', { duration: 1.4, ease: 'power3.out' })

      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth  - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        quickX(nx * 36)
        quickY(ny * 24)
      }

      window.addEventListener('mousemove', onMove)
      return () => window.removeEventListener('mousemove', onMove)

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="cat-hero">

      {/* ── PARALLAX IMAGE STACK ── */}
      <div ref={outerRef} className="cat-hero-img-outer">
        <div
          ref={imgRef}
          className="cat-hero-img"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
      </div>

      {/* Dark cinematic gradient */}
      <div className="cat-hero-overlay" />

      {/* Breadcrumb — top left, below nav */}
      <div className="cat-hero-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        Catalog
      </div>

      {/* Main content — bottom left */}
      <div className="cat-hero-content">
        <p ref={eyebrowRef} className="cat-hero-eyebrow">Product Range</p>

        <h1 className="cat-hero-hed">
          <span className="hero-clip">
            <span ref={line1Ref} className="hero-line">Eight categories.</span>
          </span>
          <span className="hero-clip">
            <span ref={line2Ref} className="hero-line"><em>One trusted source.</em></span>
          </span>
        </h1>

        <p ref={subRef} className="cat-hero-sub">
          Everything your pet business needs, from internationally recognised brands,
          available to registered NZ trade accounts.
        </p>
      </div>

      {/* Scroll indicator — bottom right */}
      <div className="cat-hero-scroll">
        <span ref={scrollBarRef} className="scroll-bar" />
        <span>Scroll</span>
      </div>

    </section>
  )
}
