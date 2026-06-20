'use client'
/**
 * AboutFeature — animated left-side image panel for the About section.
 *
 * Animations:
 *   1. Clip-path wipe: sweeps in from the right as it enters the viewport
 *   2. Zoom entrance: image starts slightly zoomed-in and eases to natural scale
 *   3. Warm colour grade: saturation + brightness lift on reveal — makes the
 *      smiling couple and their dog feel immediately warm and joyful
 *   4. Scroll parallax: image drifts upward slower than the page scroll
 *   5. Mouse parallax: image shifts subtly with cursor movement
 *   6. Hover brightness lift: reinforces the interactive feel
 */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutFeature() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef  = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── ENTRANCE ──────────────────────────────────────────────────────
      // 1. Set image to desaturated + zoomed before reveal
      gsap.set(imgRef.current, {
        scale: 1.1,
        filter: 'brightness(0.7) saturate(0.4)',
      })

      // 2. Clip-path panel sweeps in from the right
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })

      tl
        // Wipe in the container
        .from(wrapRef.current, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 1.5,
          ease: 'expo.inOut',
        })
        // Simultaneously: zoom out + wash in warm, full colour
        .to(imgRef.current, {
          scale: 1,
          filter: 'brightness(0.88) saturate(1.15)',
          duration: 1.8,
          ease: 'power2.out',
        }, '-=1.2')

      // ── SCROLL PARALLAX ────────────────────────────────────────────────
      // Image drifts upward as you scroll — creates depth vs. the text panel
      gsap.to(imgRef.current, {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8,
        },
      })

      // ── MOUSE PARALLAX ─────────────────────────────────────────────────
      const quickX = gsap.quickTo(imgRef.current, 'x', { duration: 1.2, ease: 'power3.out' })
      const quickY = gsap.quickTo(imgRef.current, 'y', { duration: 1.2, ease: 'power3.out' })

      const onMove = (e: MouseEvent) => {
        const { width, height, left, top } = wrapRef.current!.getBoundingClientRect()
        const nx = (e.clientX - left) / width  - 0.5
        const ny = (e.clientY - top)  / height - 0.5
        quickX(nx * 22)
        quickY(ny * 16)
      }

      // ── HOVER: warm colour lift ─────────────────────────────────────────
      // Simulates sunlight falling on the couple — feels warm and alive
      const onEnter = () => {
        gsap.to(imgRef.current, {
          filter: 'brightness(0.96) saturate(1.3)',
          duration: 0.7,
          ease: 'power2.out',
        })
      }

      const onLeave = () => {
        gsap.to(imgRef.current, { x: 0, y: 0, duration: 1.5, ease: 'power3.out' })
        gsap.to(imgRef.current, {
          filter: 'brightness(0.88) saturate(1.15)',
          duration: 0.8,
          ease: 'power2.out',
        })
      }

      const el = wrapRef.current!
      el.addEventListener('mousemove',  onMove)
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)

      return () => {
        el.removeEventListener('mousemove',  onMove)
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      }

    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="about-feature-img" ref={wrapRef}>
      {/*
        Joyful couple smiling with their dog — warm, interactive energy.
        Crop=faces ensures the smiling expressions stay centred in frame.
      */}
      <img
        ref={imgRef}
        src="https://nationalcanineresearchcouncil.com/wp-content/uploads/2025/07/young-happy-couple-with-dog.jpg"
        alt="Young happy couple with their dog"
        loading="lazy"
      />
      <div className="about-feature-img-caption">Nationwide wholesale distribution</div>
    </div>
  )
}
