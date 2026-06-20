'use client'
/**
 * SmoothScroll — initialises Lenis momentum scrolling and syncs it
 * with GSAP's ticker so ScrollTrigger stays in lockstep.
 *
 * Place this once in the root layout, before {children}.
 */
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      // Exponential ease — silky deceleration
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    })

    // Drive Lenis via GSAP's ticker so both share the same clock
    const tickerFn = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerFn)

    // Prevent GSAP from compensating for dropped frames (keeps scrub smooth)
    gsap.ticker.lagSmoothing(0)

    // Keep ScrollTrigger scroll positions accurate under Lenis
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerFn)
    }
  }, [])

  return null
}
