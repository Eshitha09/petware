'use client'
import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById('cur')
    if (!cur) return
    const move = (e: MouseEvent) => { cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px' }
    const grow = () => { cur.style.width = '28px'; cur.style.height = '28px' }
    const shrink = () => { cur.style.width = '12px'; cur.style.height = '12px' }
    document.addEventListener('mousemove', move)
    const targets = document.querySelectorAll('a,button,.bc,.pillar,.review-card,.photo-cell')
    targets.forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink) })
    return () => {
      document.removeEventListener('mousemove', move)
      targets.forEach(el => { el.removeEventListener('mouseenter', grow); el.removeEventListener('mouseleave', shrink) })
    }
  }, [])
  return <div id="cur" aria-hidden="true" />
}
