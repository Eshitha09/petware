'use client'
/**
 * PillarsSection — animated four-pillar feature block.
 * Animations:
 *   1. Staggered entrance: each pillar rises on scroll entry
 *   2. Hover lift: card elevates with subtle shadow
 *   3. Number reveal: large watermark number fades up on hover
 *   4. Line draw: sage underline sweeps in from the left on hover
 *   5. Icon rise: icon wrapper floats up on hover
 */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    num: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 15c-3.31 0-6-2.69-6-6V4h12v5c0 3.31-2.69 6-6 6z" />
        <path d="M12 15v7" /><path d="M8 22h8" />
      </svg>
    ),
    title: 'Industry Leader',
    body: "Decades supplying NZ's pet retail, grooming, and veterinary industry with proven product lines.",
  },
  {
    num: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'World-Class Brands',
    body: "We represent internationally recognised brands your customers already know and trust.",
  },
  {
    num: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: 'NZ-Wide Delivery',
    body: "Efficient nationwide distribution keeping your stock levels exactly where they need to be.",
  },
  {
    num: '04',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Trade Partners',
    body: "Dedicated support for pet retailers, groomers, vets, and specialty stores across New Zealand.",
  },
]

export default function PillarsSection() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const pillarRefs  = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── STAGGERED ENTRANCE ──────────────────────────────────────────
      gsap.from(pillarRefs.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // ── PER-PILLAR HOVER ────────────────────────────────────────────
      pillarRefs.current.forEach((pillar) => {
        if (!pillar) return

        const num      = pillar.querySelector<HTMLElement>('.pillar-num')
        const line     = pillar.querySelector<HTMLElement>('.pillar-line')
        const iconWrap = pillar.querySelector<HTMLElement>('.pillar-icon-wrap')

        const onEnter = () => {
          gsap.to(pillar,   { y: -8, boxShadow: '0 16px 40px rgba(15,18,9,.08)', duration: 0.35, ease: 'power2.out' })
          gsap.to(iconWrap, { y: -5, duration: 0.35, ease: 'power2.out' })
          gsap.to(num,      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
          gsap.to(line,     { scaleX: 1, duration: 0.45, ease: 'power2.out' })
        }

        const onLeave = () => {
          gsap.to(pillar,   { y: 0, boxShadow: '0 0px 0px rgba(15,18,9,0)', duration: 0.5, ease: 'power3.out' })
          gsap.to(iconWrap, { y: 0, duration: 0.45, ease: 'power3.out' })
          gsap.to(num,      { opacity: 0, y: 10, duration: 0.3, ease: 'power2.in' })
          gsap.to(line,     { scaleX: 0, duration: 0.35, ease: 'power2.in' })
        }

        pillar.addEventListener('mouseenter', onEnter)
        pillar.addEventListener('mouseleave', onLeave)
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="pillars-section" ref={sectionRef}>
      <div className="pillars">
        {pillars.map((p, i) => (
          <div
            key={i}
            className="pillar"
            ref={(el) => { pillarRefs.current[i] = el }}
          >
            {/* Large number watermark — revealed on hover */}
            <span className="pillar-num" aria-hidden="true">{p.num}</span>

            <div className="pillar-icon-wrap">{p.icon}</div>
            <h3>{p.title}</h3>
            <p>{p.body}</p>

            {/* Sage underline — drawn in on hover */}
            <span className="pillar-line" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  )
}
