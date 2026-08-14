import { NextResponse } from 'next/server'

import { COOKIE_SESSAO, opcoesCookie } from '@/lib/session'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_SESSAO, '', { ...opcoesCookie, maxAge: 0 })
  return res
}
