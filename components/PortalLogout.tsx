'use client'
import { signOut } from 'next-auth/react'

export default function PortalLogout() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="portal-logout-btn"
    >
      Sign Out
    </button>
  )
}
