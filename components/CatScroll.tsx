'use client'
import { useRef } from 'react'

const cats = [
  { tag: 'Most Popular', title: 'Dog & Cat Essentials', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=700&q=80&fit=crop' },
  { tag: 'High Volume', title: 'Food Range', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=700&q=80&fit=crop' },
  { tag: 'Aquatic', title: 'Fish & Aquatic', img: 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=700&q=80&fit=crop' },
  { tag: 'Specialist', title: 'Reptile Supplies', img: 'https://www.terrariumquest.com/wp-content/uploads/2022/09/29867804_leopard-gecko-in-closeup-popular-tropical-reptile-specie-from-asia-e1664585163502-768x512.jpg' },
  { tag: 'Popular', title: 'Bird Supplies', img: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=700&q=80&fit=crop' },
  { tag: 'Grooming', title: 'Commercial Grooming', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=700&q=80&fit=crop&crop=left' },
  { tag: 'Cat Litter', title: 'Cat Litter Range', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=700&q=80&fit=crop&crop=face' },
  { tag: 'Small Animals', title: 'Small Animals', img: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=700&q=80&fit=crop' },
]

export default function CatScroll() {
  const scrollRef = useRef<HTMLDivElement>(null)
  let isDown = false
  let startX = 0
  let scrollLeft = 0

  const onMouseDown = (e: React.MouseEvent) => {
    isDown = true
    startX = e.pageX - (scrollRef.current?.offsetLeft || 0)
    scrollLeft = scrollRef.current?.scrollLeft || 0
  }
  const onMouseLeave = () => { isDown = false }
  const onMouseUp = () => { isDown = false }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div className="cat-scroll-outer">
      <div
        className="cat-scroll"
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {cats.map((cat, i) => (
          <div key={i} className="cat-card reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
            <img src={cat.img} alt={cat.title} loading="lazy" draggable={false} />
            <div className="cat-card-body">
              <span className="bc-tag">{cat.tag}</span>
              <div className="cat-card-title">{cat.title}</div>
            </div>
            <div className="cat-card-arr">↗</div>
          </div>
        ))}
      </div>
      <div className="cat-scroll-hint">
        <span>Drag to explore</span>
      </div>
    </div>
  )
}
