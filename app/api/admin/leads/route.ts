import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { ehStatusValido } from '@/lib/lead-status'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Lista os leads do painel. Protegida pelo middleware — se chegou aqui,
 * a sessão já foi validada.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  const leads = await prisma.lead.findMany({
    where: status && status !== 'todos' && ehStatusValido(status) ? { status } : undefined,
    orderBy: { criadoEm: 'desc' },
    take: 200,
  })

  const contagem = await prisma.lead.groupBy({
    by: ['status'],
    _count: { _all: true },
  })

  return NextResponse.json({
    leads,
    contagem: Object.fromEntries(contagem.map((c) => [c.status, c._count._all])),
    total: leads.length,
  })
}
