import { NextResponse } from 'next/server'

import { conferirSenha } from '@/lib/senha'
import { COOKIE_SESSAO, criarSessao, opcoesCookie } from '@/lib/session'
import { ipDaRequisicao, permitir } from '@/lib/ratelimit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  // Rate limit apertado: 5 tentativas a cada 15 min por IP.
  const ip = ipDaRequisicao(req)
  const limite = permitir(`login:${ip}`, 5, 15 * 60 * 1000)
  if (!limite.ok) {
    return NextResponse.json(
      { erro: 'Muitas tentativas. Aguarde alguns minutos.' },
      { status: 429 },
    )
  }

  let senha: unknown
  try {
    senha = (await req.json())?.senha
  } catch {
    return NextResponse.json({ erro: 'Requisição inválida.' }, { status: 400 })
  }

  if (typeof senha !== 'string' || senha.length === 0) {
    return NextResponse.json({ erro: 'Informe a senha.' }, { status: 400 })
  }

  const ok = await conferirSenha(senha, process.env.ADMIN_SENHA_HASH)
  if (!ok) {
    // Mensagem genérica de propósito — não confirma nada a quem tenta.
    return NextResponse.json({ erro: 'Senha incorreta.' }, { status: 401 })
  }

  const token = await criarSessao()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_SESSAO, token, opcoesCookie)
  return res
}
