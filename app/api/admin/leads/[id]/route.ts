import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { STATUS_LEAD } from '@/lib/lead-status'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * `status` é String no banco, então a integridade vem daqui: o Zod só
 * aceita os valores de STATUS_LEAD.
 */
const patchSchema = z.object({
  status: z.enum(STATUS_LEAD).optional(),
  nota: z.string().max(4000).nullable().optional(),
})

type Params = { params: { id: string } }

/** Muda status ou anotação interna de um lead. */
export async function PATCH(req: Request, { params }: Params) {
  let corpo: unknown
  try {
    corpo = await req.json()
  } catch {
    return NextResponse.json({ erro: 'Requisição inválida.' }, { status: 400 })
  }

  const v = patchSchema.safeParse(corpo)
  if (!v.success) {
    return NextResponse.json({ erro: 'Dados inválidos.' }, { status: 422 })
  }

  try {
    const lead = await prisma.lead.update({
      where: { id: params.id },
      data: v.data,
    })
    return NextResponse.json({ ok: true, lead })
  } catch {
    return NextResponse.json({ erro: 'Lead não encontrado.' }, { status: 404 })
  }
}

/** Apaga um lead de vez. Sem lixeira — o painel confirma antes. */
export async function DELETE(_req: Request, { params }: Params) {
  try {
    await prisma.lead.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ erro: 'Lead não encontrado.' }, { status: 404 })
  }
}
