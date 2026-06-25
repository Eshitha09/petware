/**
 * lib/rateLimit.ts
 *
 * Simple in-memory rate limiter for API routes.
 * Works in development and single-instance deployments.
 * For multi-instance/serverless at scale, swap the Map for Redis/Vercel KV.
 *
 * Usage:
 *   const { limited } = rateLimit(ip, { limit: 5, windowMs: 60_000 })
 *   if (limited) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
 */

type Entry = { count: number; resetAt: number }

const store = new Map<string, Entry>()

// Clean up expired entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key)
  }
}, 5 * 60 * 1000)

export function rateLimit(
  key: string,
  { limit = 10, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {}
): { limited: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { limited: false, remaining: limit - 1 }
  }

  entry.count++
  const remaining = Math.max(0, limit - entry.count)
  return { limited: entry.count > limit, remaining }
}
