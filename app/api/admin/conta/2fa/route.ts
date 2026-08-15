import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { conferirSenha } from '@/lib/senha'
import { COOKIE_SESSAO, lerSessao } from '@/lib/session'
import { cifrarSegredo, decifrarSegredo, gerarSegredoTotp, qrCodeTotp, verificarCodigoTotp } from '@/lib/totp'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function usuarioDaSessao() {
  const sessao = await lerSessao(cookies().get(COOKIE_SESSAO)?.value)
  if (!sessao) return null
  return prisma.usuario.findUnique({ where: { id: sessao.id } })
}

/**
 * Etapa 1 — gera um segredo novo e devolve o QR.
 *
 * O segredo já é gravado CIFRADO, mas `totpAtivoEm` continua nulo: a 2FA
 * só passa a ser exigida depois que o dono confirmar o primeiro código.
 * Sem isso, quem escaneasse o QR e desistisse ficaria trancado para fora.
 */
export async function POST() {
  const usuario = await usuarioDaSessao()
  if (!usuario) return NextResponse.json({ erro: 'Não autorizado.' }, { status: 401 })

  if (usuario.totpAtivoEm) {
    return NextResponse.json({ erro: 'A 2FA já está ativa nesta conta.' }, { status: 409 })
  }

  const segredo = gerarSegredoTotp()
  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { totpSegredo: cifrarSegredo(segredo) },
  })

  return NextResponse.json({
    qr: await qrCodeTotp(usuario.email, segredo),
    // Para quem não consegue escanear e vai digitar à mão no app.
    segredo,
  })
}

/** Etapa 2 — confirma o primeiro código e ATIVA a exigência. */
export async function PUT(req: Request) {
  const usuario = await usuarioDaSessao()
  if (!usuario) return NextResponse.json({ erro: 'Não autorizado.' }, { status: 401 })

  const v = z.object({ codigo: z.string() }).safeParse(await req.json().catch(() => null))
  if (!v.success) return NextResponse.json({ erro: 'Informe o código.' }, { status: 400 })

  if (!usuario.totpSegredo) {
    return NextResponse.json({ erro: 'Gere o QR code primeiro.' }, { status: 400 })
  }

  const segredo = decifrarSegredo(usuario.totpSegredo)
  if (!segredo || !verificarCodigoTotp(v.data.codigo, segredo)) {
    return NextResponse.json({ erro: 'Código incorreto. Tente o próximo.' }, { status: 401 })
  }

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { totpAtivoEm: new Date() },
  })

  return NextResponse.json({ ok: true })
}

/**
 * Desativa a 2FA. Exige a SENHA de novo — desligar segundo fator é ação
 * sensível, e a sessão aberta sozinha não deveria bastar (cenário do
 * notebook destravado).
 */
export async function DELETE(req: Request) {
  const usuario = await usuarioDaSessao()
  if (!usuario) return NextResponse.json({ erro: 'Não autorizado.' }, { status: 401 })

  const v = z.object({ senha: z.string() }).safeParse(await req.json().catch(() => null))
  if (!v.success) return NextResponse.json({ erro: 'Informe a senha.' }, { status: 400 })

  if (!(await conferirSenha(v.data.senha, usuario.senhaHash))) {
    return NextResponse.json({ erro: 'Senha incorreta.' }, { status: 401 })
  }

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { totpSegredo: null, totpAtivoEm: null },
  })

  return NextResponse.json({ ok: true })
}
