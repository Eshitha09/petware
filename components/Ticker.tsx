export default function Ticker() {
  const items = ['Wholesale Trade Accounts','New Zealand Wide Delivery','Full-Line Pet Supplier','Trusted Brands Worldwide','Dogs · Cats · Birds · Fish · Reptiles · Small Animals','Commercial Grooming','0800 800 135']
  const doubled = [...items, ...items]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">{item}<span className="ticker-dot" /></span>
        ))}
      </div>
    </div>
  )
}
