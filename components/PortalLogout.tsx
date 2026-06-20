'use client'
import { useRouter } from 'next/navigation'

export default function PortalLogout() {
  const router = useRouter()

  async function logout() {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/')
  }

  return (
    <button onClick={logout} className="portal-logout-btn">
      Sign Out
    </button>
  )
}
