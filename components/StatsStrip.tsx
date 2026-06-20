'use client'
import { useEffect, useRef } from 'react'
function countUp(el: HTMLElement, target: number) {
  let v = 0; const step = target / 70; const sup = el.querySelector('sup')?.textContent || ''
  const iv = setInterval(() => { v += step; if (v >= target) { v = target; clearInterval(iv) } el.innerHTML = Math.floor(v) + '<sup>' + sup + '</sup>' }, 18)
}
export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null); const done = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting && !done.current) { done.current = true; ref.current?.querySelectorAll<HTMLElement>('.stat-num[data-target]').forEach((el) => countUp(el, parseInt(el.dataset.target || '0'))) } })
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div className="stats-strip" ref={ref}>
      <div className="stat reveal"><div className="stat-num" data-target="8">0<sup>+</sup></div><div className="stat-lbl">Product Categories</div></div>
      <div className="stat reveal d1"><div className="stat-num" data-target="30">0<sup>+</sup></div><div className="stat-lbl">Years in Business</div></div>
      <div className="stat reveal d2"><div className="stat-num" data-target="100">0<sup>+</sup></div><div className="stat-lbl">Trusted Brands</div></div>
      <div className="stat reveal d3"><div className="stat-num">#1</div><div className="stat-lbl">NZ Wholesale Pet Supplier</div></div>
    </div>
  )
}
