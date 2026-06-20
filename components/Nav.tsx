'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <Link className="logo-wrap" href="/">
        <span className="logo">Petware</span>
        <span className="logo-sub">Wholesale Pet Supplies · NZ</span>
      </Link>
      <ul className="nav-links">
        <li><Link href="/catalog" className={pathname === '/catalog' ? 'active' : ''}>Catalog</Link></li>
        <li><Link href="/about" className={pathname === '/about' ? 'active' : ''}>About</Link></li>
        <li><Link href="/trade-account" className={pathname === '/trade-account' ? 'active' : ''}>Apply for an Account</Link></li>
        <li><Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
      </ul>
      <div className="nav-right">
        <a className="nav-phone" href="tel:0800800135">0800 800 135</a>
        <Link className="nav-cta" href="/login">Trade Login</Link>
      </div>
    </nav>
  )
}
