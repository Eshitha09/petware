'use client'
/**
 * SubpageHero — reusable premium animated hero for all sub-pages.
 *
 * GSAP animations:
 *   1. Image zoom entrance (scale 1.1 → 1)
 *   2. Eyebrow fade + rise
 *   3. Headline lines wipe up from clip wrapper (staggered)
 *   4. Sub-text fade + rise
 *   5. Scroll parallax on image
 *   6. Content fade on scroll exit
 *   7. Mouse parallax on outer wrapper
 */
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SubpageHeroProps {
  eyebrow: string
  line1: string
  line2: string        // rendered in <em>
  sub?: string
  img: string          // full URL
  breadcrumb: string   // e.g. "About"
  breadcrumbHref?: string
}

export default function SubpageHero({
  eyebrow, line1, line2, sub, img, breadcrumb, breadcrumbHref = '/',
}: SubpageHeroProps) {
  const sectionRef   = useRef<HTMLElement>(null)
  const outerRef     = useRef<HTMLDivElement>(null)
  const imgRef       = useRef<HTMLDivElement>(null)
  const eyebrowRef   = useRef<HTMLParagraphElement>(null)
  const line1Ref     = useRef<HTMLSpanElement>(null)
  const line2Ref     = useRef<HTMLSpanElement>(null)
  const subRef       = useRef<HTMLParagraphElement>(null)
  const scrollBarRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      tl.from(imgRef.current, { scale: 1.1, duration: 1.9, ease: 'power2.out' }, 0)
      tl.from(eyebrowRef.current, { y: 14, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.3)
      tl.from([line1Ref.current, line2Ref.current], {
        y: '110%', skewY: 2, duration: 1.05, ease: 'expo.out', stagger: 0.1,
      }, 0.46)
      if (sub) tl.from(subRef.current, { y: 18, opacity: 0, duration: 0.85, ease: 'power3.out' }, 0.78)
      tl.from(scrollBarRef.current, { scaleY: 0, opacity: 0, transformOrigin: 'top', duration: 0.75, ease: 'power2.out' }, 1.0)

      // Scroll parallax
      gsap.to(imgRef.current, {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.0 },
      })

      // Content fades on exit
      gsap.to('.sp-hero-content', {
        y: -55, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: '55% top', end: 'bottom top', scrub: 1 },
      })

      // Mouse parallax
      const quickX = gsap.quickTo(outerRef.current, 'x', { duration: 1.4, ease: 'power3.out' })
      const quickY = gsap.quickTo(outerRef.current, 'y', { duration: 1.4, ease: 'power3.out' })
      const onMove = (e: MouseEvent) => {
        quickX((e.clientX / window.innerWidth  - 0.5) * 30)
        quickY((e.clientY / window.innerHeight - 0.5) * 20)
      }
      window.addEventListener('mousemove', onMove)
      return () => window.removeEventListener('mousemove', onMove)
    }, sectionRef)

    return () => ctx.revert()
  }, [sub])

  return (
    <section ref={sectionRef} className="sp-hero">
      <div ref={outerRef} className="sp-hero-img-outer">
        <div ref={imgRef} className="sp-hero-img" style={{ backgroundImage: `url('${img}')` }} />
      </div>
      <div className="sp-hero-overlay" />

      <div className="sp-hero-breadcrumb">
        <Link href={breadcrumbHref}>Home</Link>
        <span>/</span>
        {breadcrumb}
      </div>

      <div className="sp-hero-content">
        <p ref={eyebrowRef} className="sp-hero-eyebrow">{eyebrow}</p>
        <h1 className="sp-hero-hed">
          <span className="hero-clip"><span ref={line1Ref} className="hero-line">{line1}</span></span>
          <span className="hero-clip"><span ref={line2Ref} className="hero-line"><em>{line2}</em></span></span>
        </h1>
        {sub && <p ref={subRef} className="sp-hero-sub">{sub}</p>}
      </div>

      <div className="sp-hero-scroll">
        <span ref={scrollBarRef} className="scroll-bar" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
