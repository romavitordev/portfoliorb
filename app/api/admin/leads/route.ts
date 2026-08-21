import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { prisma } from '@/lib/prisma'
import { ehStatusValido } from '@/lib/lead-status'
import { COOKIE_SESSAO, lerSessao } from '@/lib/session'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Lista os leads do painel.
 *
 * A sessão é checada AQUI, e não só no `middleware.ts`, de propósito. O
 * middleware é uma linha de defesa frágil: vive num `matcher` de string.
 * Renomear uma pasta, editar o matcher sem perceber ou o framework mudar
 * de comportamento derruba a proteção sem quebrar nada visível — a rota
 * simplesmente passa a responder para qualquer um.
 *
 * E o que vaza aqui é o pior possível: nome, telefone e mensagem de todo
 * mundo que preencheu o formulário. Dado de terceiro, não nosso.
 */
export async function GET(req: Request) {
  const sessao = await lerSessao(cookies().get(COOKIE_SESSAO)?.value)
  if (!sessao) return NextResponse.json({ erro: 'Não autorizado.' }, { status: 401 })

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
