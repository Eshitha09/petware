'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const outerRef     = useRef<HTMLDivElement>(null)  // mouse-parallax layer
  const imgRef       = useRef<HTMLDivElement>(null)  // scroll parallax + breathing
  const eyebrowRef   = useRef<HTMLDivElement>(null)
  const line1Ref     = useRef<HTMLSpanElement>(null)
  const line2Ref     = useRef<HTMLElement>(null)
  const line3Ref     = useRef<HTMLSpanElement>(null)
  const subRef       = useRef<HTMLParagraphElement>(null)
  const actionsRef   = useRef<HTMLDivElement>(null)
  const metaRef      = useRef<HTMLDivElement>(null)
  const scrollIndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── ENTRANCE TIMELINE ──────────────────────────────────────────────
      const tl = gsap.timeline({ delay: 0.15 })

      // Dog image: starts zoomed in, eases out to natural scale
      tl.from(imgRef.current, {
        scale: 1.14,
        duration: 2.2,
        ease: 'power2.out',
      }, 0)

      // Eyebrow: gentle rise + fade
      tl.from(eyebrowRef.current, {
        y: 14, opacity: 0,
        duration: 0.75, ease: 'power2.out',
      }, 0.4)

      // H1 lines: dramatic slide-up from inside clip containers, slight skew releases on arrival
      tl.from(
        [line1Ref.current, line2Ref.current, line3Ref.current],
        {
          y: '110%', skewY: 2,
          duration: 1.15, ease: 'expo.out', stagger: 0.12,
        },
        '-=0.4'
      )

      // Sub-text and CTA buttons
      tl.from(
        [subRef.current, actionsRef.current],
        { y: 22, opacity: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1 },
        '-=0.6'
      )

      // Peripheral elements
      tl.from(
        [metaRef.current, scrollIndRef.current],
        { opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 },
        '-=0.45'
      )

      // ── BREATHING ANIMATION ────────────────────────────────────────────
      // Slow, subtle scale oscillation — makes the dog feel alive.
      // Starts after the entrance zoom-out settles (2.4 s delay).
      gsap.to(imgRef.current, {
        scale: 1.06,
        duration: 9,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.4,
      })

      // ── SCROLL PARALLAX ────────────────────────────────────────────────
      // Dog image drifts down at 28 % of scroll speed, content moves faster,
      // creating a natural sense of depth.
      gsap.to(imgRef.current, {
        yPercent: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      // Hero text fades + rises slightly as the user scrolls away
      gsap.to('.hero-content', {
        y: -60, opacity: 0, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '35% top',
          scrub: true,
        },
      })

      // ── MOUSE PARALLAX ─────────────────────────────────────────────────
      // The outerRef wrapper (6 % oversized on each side) shifts opposite to the
      // cursor position — creates an illusion that the dog has real depth.
      const quickX = gsap.quickTo(outerRef.current, 'x', {
        duration: 1.4, ease: 'power3.out',
      })
      const quickY = gsap.quickTo(outerRef.current, 'y', {
        duration: 1.4, ease: 'power3.out',
      })

      const handleMouseMove = (e: MouseEvent) => {
        const { width, height, left, top } =
          sectionRef.current!.getBoundingClientRect()
        // Normalise cursor position to −0.5 → +0.5
        const nx = (e.clientX - left) / width  - 0.5
        const ny = (e.clientY - top)  / height - 0.5
        // Shift opposite to cursor: ±20 px horizontally, ±14 px vertically
        quickX(nx * -40)
        quickY(ny * -28)
      }

      const handleMouseLeave = () => {
        // Smoothly return to centre on cursor exit
        gsap.to(outerRef.current, { x: 0, y: 0, duration: 1.6, ease: 'power3.out' })
      }

      const section = sectionRef.current!
      section.addEventListener('mousemove', handleMouseMove)
      section.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        section.removeEventListener('mousemove', handleMouseMove)
        section.removeEventListener('mouseleave', handleMouseLeave)
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToCats = () =>
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" ref={sectionRef}>

      {/* Oversized wrapper absorbs mouse-parallax movement without exposing edges */}
      <div className="hero-img-outer" ref={outerRef}>
        <div
          className="hero-img"
          ref={imgRef}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1800&q=80&fit=crop')",
          }}
        />
      </div>

      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-eyebrow" ref={eyebrowRef}>
          NZ&apos;s Leading Wholesale Supplier
        </div>
        <h1 className="hero-hed">
          <span className="hero-clip">
            <span className="hero-line" ref={line1Ref}>Every pet.</span>
          </span>
          <span className="hero-clip">
            <em className="hero-line" ref={line2Ref}>Every category.</em>
          </span>
          <span className="hero-clip">
            <span className="hero-line" ref={line3Ref}>One supplier.</span>
          </span>
        </h1>
        <p className="hero-sub" ref={subRef}>
          Petware Ltd has been stocking New Zealand&apos;s pet industry with trusted wholesale
          brands across dogs, cats, birds, fish, reptiles, and small animals —
          delivered nationwide.
        </p>
        <div className="hero-actions" ref={actionsRef}>
          <Link className="btn-fill" href="/trade-account">Apply for a Trade Account</Link>
          <button className="btn-line" onClick={scrollToCats}>Browse Categories</button>
        </div>
      </div>

      <div className="hero-meta" ref={metaRef}>
        <span>Est. 1994</span>
        <span>·</span>
        <span>Auckland, NZ</span>
      </div>

      <div className="hero-scroll" ref={scrollIndRef}>
        Scroll
        <div className="scroll-bar" />
      </div>

    </section>
  )
}
