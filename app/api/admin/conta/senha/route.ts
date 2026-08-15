import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { conferirSenha, gerarHash } from '@/lib/senha'
import { COOKIE_SESSAO, lerSessao } from '@/lib/session'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const schema = z.object({
  atual: z.string().min(1),
  nova: z.string().min(10, 'Use pelo menos 10 caracteres.'),
})

/** Troca a senha. Sempre exige a atual, mesmo com sessão aberta. */
export async function POST(req: Request) {
  const sessao = await lerSessao(cookies().get(COOKIE_SESSAO)?.value)
  if (!sessao) return NextResponse.json({ erro: 'Não autorizado.' }, { status: 401 })

  const v = schema.safeParse(await req.json().catch(() => null))
  if (!v.success) {
    return NextResponse.json(
      { erro: v.error.issues[0]?.message ?? 'Dados inválidos.' },
      { status: 422 },
    )
  }

  const usuario = await prisma.usuario.findUnique({ where: { id: sessao.id } })
  if (!usuario || !(await conferirSenha(v.data.atual, usuario.senhaHash))) {
    return NextResponse.json({ erro: 'Senha atual incorreta.' }, { status: 401 })
  }

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { senhaHash: await gerarHash(v.data.nova) },
  })

  return NextResponse.json({ ok: true })
}
