import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { validarLead } from '@/lib/lead-input'
import { avisarLeadNovo } from '@/lib/email'
import { ipDaRequisicao, permitir } from '@/lib/ratelimit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Recebe o formulário de orçamento. Pública, por isso as três travas. */
export async function POST(req: Request) {
  // 1. Rate limit por IP — 5 envios a cada 10 minutos.
  const ip = ipDaRequisicao(req)
  const limite = permitir(`lead:${ip}`)
  if (!limite.ok) {
    return NextResponse.json(
      { erro: 'Muitos envios seguidos. Tente de novo daqui a pouco.' },
      { status: 429, headers: { 'Retry-After': String(limite.esperarSegundos ?? 600) } },
    )
  }

  let corpo: unknown
  try {
    corpo = await req.json()
  } catch {
    return NextResponse.json({ erro: 'Requisição inválida.' }, { status: 400 })
  }

  // 2. Validação — o mesmo schema que o formulário usa.
  const v = validarLead(corpo)
  if (!v.ok) {
    return NextResponse.json({ erro: 'Confira os campos.', campos: v.erros }, { status: 422 })
  }

  // 3. Honeypot: bot preencheu o campo invisível. Responde 200 de
  //    propósito — quem está raspando não descobre que foi barrado.
  if (v.valor.site) {
    return NextResponse.json({ ok: true })
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        nome: v.valor.nome,
        contato: v.valor.contato,
        tipo: v.valor.tipo,
        prazo: v.valor.prazo,
        sobre: v.valor.sobre,
        origem: v.valor.origem ?? null,
      },
      select: { id: true },
    })

    // O aviso é secundário: se o Resend falhar, o lead já está salvo.
    await avisarLeadNovo({ ...v.valor, id: lead.id })

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 })
  } catch (erro) {
    console.error('falha ao gravar lead', erro)
    return NextResponse.json(
      { erro: 'Não conseguimos registrar agora. Fale com a gente pelo WhatsApp.' },
      { status: 500 },
    )
  }
}
