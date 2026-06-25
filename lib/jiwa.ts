/**
 * lib/jiwa.ts
 *
 * Jiwa 8 REST API client for Next.js (server-side only).
 *
 * Jiwa's REST API is built on ServiceStack and runs as a self-hosted Windows
 * service (JiwaAPISelfHostedService.exe). It must be reachable from the
 * internet — either directly via port forwarding or via a secure tunnel
 * (Cloudflare Tunnel, Tailscale, etc.).
 *
 * ALL credentials are read from environment variables — never hard-coded.
 * This file must NEVER be imported in a 'use client' component.
 *
 * Environment variables required:
 *   JIWA_API_URL      — e.g. https://jiwa.petware.co.nz:8080
 *   JIWA_USERNAME     — Jiwa API service account username
 *   JIWA_PASSWORD     — Jiwa API service account password
 *
 * Usage:
 *   import { jiwa } from '@/lib/jiwa'
 *   const products = await jiwa.getInventoryItems()
 */

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type JiwaInventoryItem = {
  InventoryItemID: string
  ItemCode: string          // SKU
  Description: string       // Product name
  SalesDescription: string  // Longer product description
  UnitPrice: number
  QuantityOnHand: number
  ReorderPoint: number
  CategoryID: string
  CategoryDescription: string
  ImageURL?: string
  IsActive: boolean
  IsWebVisible: boolean
  Weight?: number
  UnitOfMeasure: string
}

export type JiwaDebtor = {
  DebtorID: string
  AccountCode: string
  CompanyName: string
  EmailAddress: string
  Phone: string
  PriceLevelID: string
  CreditLimit: number
  Balance: number
  IsOnStop: boolean
}

export type JiwaSalesOrderLine = {
  InventoryItemID: string
  ItemCode: string
  Quantity: number
  UnitPrice: number
}

export type JiwaSalesOrder = {
  SalesOrderID?: string
  DebtorID: string
  Lines: JiwaSalesOrderLine[]
  DeliveryAddress?: string
  Notes?: string
}

export type JiwaSalesOrderResult = {
  SalesOrderID: string
  OrderNumber: string
  Status: string
  TotalAmount: number
  Lines: Array<JiwaSalesOrderLine & { LineTotal: number }>
}

type JiwaSession = {
  token: string
  expires: number
}

// ─── SESSION CACHE (server-side in-memory, cleared on cold start) ──────────

let _session: JiwaSession | null = null

async function getAuthToken(): Promise<string> {
  const base = process.env.JIWA_API_URL
  const user = process.env.JIWA_USERNAME
  const pass = process.env.JIWA_PASSWORD

  if (!base || !user || !pass) {
    throw new Error(
      'Jiwa API is not configured. Set JIWA_API_URL, JIWA_USERNAME, and JIWA_PASSWORD in your environment.'
    )
  }

  // Return cached token if still valid (with 60-second buffer)
  if (_session && Date.now() < _session.expires - 60_000) {
    return _session.token
  }

  const res = await fetch(`${base}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      UserName: user,
      Password: pass,
      // ServiceStack auth request
      provider: 'credentials',
      RememberMe: true,
    }),
    // 10 second timeout
    signal: AbortSignal.timeout(10_000),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Jiwa authentication failed (${res.status}): ${body}`)
  }

  const data = await res.json()
  const token: string = data.SessionId ?? data.BearerToken ?? data.ss_id

  if (!token) throw new Error('Jiwa auth response missing token')

  _session = {
    token,
    // Session valid for 55 minutes (Jiwa default session = 60 min)
    expires: Date.now() + 55 * 60 * 1000,
  }

  return token
}

// ─── BASE REQUEST HELPER ──────────────────────────────────────────────────────

async function jiwaFetch<T>(
  path: string,
  options: RequestInit = {},
  retried = false
): Promise<T> {
  const base = process.env.JIWA_API_URL
  if (!base) throw new Error('JIWA_API_URL is not set')

  const token = await getAuthToken()

  const res = await fetch(`${base}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // ServiceStack accepts both cookie-based sessions and bearer tokens
      Authorization: `Bearer ${token}`,
      'X-ss-id': token,
      ...options.headers,
    },
    signal: AbortSignal.timeout(30_000),
  })

  // Session expired — invalidate cache and retry once
  if (res.status === 401 && !retried) {
    _session = null
    return jiwaFetch<T>(path, options, true)
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Jiwa API error ${res.status} at ${path}: ${body}`)
  }

  return res.json() as Promise<T>
}

// ─── PUBLIC API ───────────────────────────────────────────────────────────────

/**
 * Returns all active, web-visible inventory items from Jiwa.
 * Results are cached by Next.js fetch for 5 minutes.
 */
async function getInventoryItems(): Promise<JiwaInventoryItem[]> {
  const data = await jiwaFetch<{ Results: JiwaInventoryItem[] }>(
    '/api/InventoryItems?IsActive=true&IsWebVisible=true&Fields=InventoryItemID,ItemCode,Description,SalesDescription,UnitPrice,QuantityOnHand,ReorderPoint,CategoryID,CategoryDescription,ImageURL,Weight,UnitOfMeasure',
    { next: { revalidate: 300, tags: ['jiwa-inventory'] } } as RequestInit
  )
  return data.Results ?? []
}

/**
 * Returns a single inventory item by Jiwa InventoryItemID.
 */
async function getInventoryItem(id: string): Promise<JiwaInventoryItem> {
  return jiwaFetch<JiwaInventoryItem>(`/api/InventoryItem/${encodeURIComponent(id)}`)
}

/**
 * Returns a debtor account by Jiwa DebtorID.
 * Used after login to load customer-specific pricing level.
 */
async function getDebtor(id: string): Promise<JiwaDebtor> {
  return jiwaFetch<JiwaDebtor>(`/api/Debtor/${encodeURIComponent(id)}`)
}

/**
 * Finds a debtor by their email address.
 * Used to link a website login (NextAuth email) to their Jiwa account.
 */
async function findDebtorByEmail(email: string): Promise<JiwaDebtor | null> {
  const data = await jiwaFetch<{ Results: JiwaDebtor[] }>(
    `/api/Debtors?EmailAddress=${encodeURIComponent(email)}&Fields=DebtorID,AccountCode,CompanyName,EmailAddress,PriceLevelID,CreditLimit,Balance,IsOnStop`
  )
  return data.Results?.[0] ?? null
}

/**
 * Creates a new sales order in Jiwa.
 * Called when a trade customer places an order through the portal.
 */
async function createSalesOrder(order: JiwaSalesOrder): Promise<JiwaSalesOrderResult> {
  return jiwaFetch<JiwaSalesOrderResult>('/api/SalesOrders', {
    method: 'POST',
    body: JSON.stringify(order),
  })
}

/**
 * Returns sales order history for a debtor.
 */
async function getSalesOrdersByDebtor(debtorId: string, limit = 20): Promise<JiwaSalesOrderResult[]> {
  const data = await jiwaFetch<{ Results: JiwaSalesOrderResult[] }>(
    `/api/SalesOrders?DebtorID=${encodeURIComponent(debtorId)}&Rows=${limit}&OrderBy=SalesOrderID DESC`
  )
  return data.Results ?? []
}

/**
 * Checks current stock level for a given item.
 */
async function getStockLevel(inventoryItemId: string): Promise<number> {
  const item = await getInventoryItem(inventoryItemId)
  return item.QuantityOnHand ?? 0
}

/**
 * Returns whether the Jiwa API is reachable.
 * Used by the /api/health route.
 */
async function ping(): Promise<boolean> {
  try {
    await getAuthToken()
    return true
  } catch {
    return false
  }
}

// ─── EXPORTED CLIENT ─────────────────────────────────────────────────────────

export const jiwa = {
  getInventoryItems,
  getInventoryItem,
  getDebtor,
  findDebtorByEmail,
  createSalesOrder,
  getSalesOrdersByDebtor,
  getStockLevel,
  ping,
}
