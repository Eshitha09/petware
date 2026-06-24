'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '/catalog',       label: 'Catalog' },
  { href: '/about',         label: 'About' },
  { href: '/trade-account', label: 'Apply for an Account' },
  { href: '/contact',       label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <Link className="logo-wrap" href="/">
          <span className="logo">Petware</span>
          <span className="logo-sub">Wholesale Pet Supplies · NZ</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="nav-links">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={pathname === href ? 'active' : ''}>{label}</Link>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <a className="nav-phone" href="tel:0800800135">0800 800 135</a>
          <Link className="nav-cta" href="/login">Trade Login</Link>
          {/* Hamburger — mobile only */}
          <button
            className={`nav-burger${open ? ' open' : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={`nav-overlay${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div className={`nav-drawer${open ? ' open' : ''}`} aria-hidden={!open}>
        <div className="nav-drawer-top">
          <span className="logo" style={{ fontSize: '1.1rem' }}>Petware</span>
          <button
            className="nav-drawer-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >✕</button>
        </div>
        <ul className="nav-drawer-links">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={pathname === href ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-drawer-footer">
          <Link className="btn-fill" href="/login" style={{ width: '100%', textAlign: 'center' }}>
            Trade Login
          </Link>
          <a href="tel:0800800135" className="nav-drawer-phone">0800 800 135</a>
        </div>
      </div>
    </>
  )
}
