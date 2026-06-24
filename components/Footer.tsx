import Link from 'next/link'
export default function Footer() {
  return (
    <footer>
      <div>
        <Link className="ft-logo" href="/">Petware</Link>
        <span className="ft-sub">Quality Wholesale Pet Supplies</span>
        <p className="ft-body">New Zealand&apos;s full-line wholesale pet supplier. Trusted by pet retailers, groomers, aquarium specialists, and veterinary practices nationwide.</p>
        <div className="ft-contacts">
          <a href="tel:0800800135">0800 800 135</a>
          <a href="mailto:petware@petware.co.nz">petware@petware.co.nz</a>
        </div>
        <p style={{ fontSize: '.72rem', color: 'rgba(247,245,240,.2)', marginTop: '.75rem' }}>Mon – Fri, 10am – 3pm NZST · Auckland, NZ</p>
      </div>
      <div className="ft-col">
        <h4>Categories</h4>
        <ul>
          <li><Link href="/catalog">Dog &amp; Cat</Link></li>
          <li><Link href="/catalog">Food Range</Link></li>
          <li><Link href="/catalog">Bird Supplies</Link></li>
          <li><Link href="/catalog">Aquatic</Link></li>
          <li><Link href="/catalog">Reptile</Link></li>
          <li><Link href="/catalog">Small Animals</Link></li>
        </ul>
      </div>
      <div className="ft-col">
        <h4>Trade</h4>
        <ul>
          <li><Link href="/login">Trade Login</Link></li>
          <li><Link href="/trade-account">Apply for Trade Account</Link></li>
          <li><Link href="/catalog">New Products</Link></li>
          <li><Link href="/catalog">Specials</Link></li>
        </ul>
      </div>
      <div className="ft-col">
        <h4>Company</h4>
        <ul>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/trade-account">Apply for Account</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/terms">Terms &amp; Conditions</Link></li>
          <li><Link href="/privacy">Privacy Policy</Link></li>
        </ul>
      </div>
      <div className="ft-bottom">
        <span>© {new Date().getFullYear()} Petware Ltd. All rights reserved.</span>
        <span>Made for NZ&apos;s pet industry</span>
      </div>
    </footer>
  )
}
