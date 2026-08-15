import { NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { conferirSenha } from '@/lib/senha'
import { COOKIE_SESSAO, criarSessao, opcoesCookie } from '@/lib/session'
import { decifrarSegredo, verificarCodigoTotp } from '@/lib/totp'
import { ipDaRequisicao, permitir } from '@/lib/ratelimit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const schema = z.object({
  email: z.string().trim().toLowerCase().email(),
  senha: z.string().min(1),
  /** Só na segunda etapa, quando o usuário tem 2FA ativa. */
  codigo: z.string().trim().optional(),
})

/**
 * Login em duas etapas. A primeira chamada manda e-mail e senha; se o
 * usuário tiver 2FA ativa, a resposta é 200 com `precisa2fa: true` e o
 * formulário pede os 6 dígitos, reenviando tudo junto.
 *
 * A senha é conferida NAS DUAS etapas — se só o código fosse validado no
 * segundo passo, alguém com o código (ou com a tela aberta) entraria sem
 * saber a senha.
 */
export async function POST(req: Request) {
  const ip = ipDaRequisicao(req)
  const limite = permitir(`login:${ip}`, 8, 15 * 60 * 1000)
  if (!limite.ok) {
    return NextResponse.json({ erro: 'Muitas tentativas. Aguarde alguns minutos.' }, { status: 429 })
  }

  let corpo: unknown
  try {
    corpo = await req.json()
  } catch {
    return NextResponse.json({ erro: 'Requisição inválida.' }, { status: 400 })
  }

  const v = schema.safeParse(corpo)
  if (!v.success) {
    return NextResponse.json({ erro: 'Informe e-mail e senha.' }, { status: 400 })
  }

  const usuario = await prisma.usuario.findUnique({ where: { email: v.data.email } })

  // Mensagem idêntica para e-mail inexistente e senha errada — não
  // entregamos quais e-mails têm conta.
  const senhaOk = await conferirSenha(v.data.senha, usuario?.senhaHash)
  if (!usuario || !senhaOk) {
    return NextResponse.json({ erro: 'E-mail ou senha incorretos.' }, { status: 401 })
  }

  const exige2fa = Boolean(usuario.totpAtivoEm && usuario.totpSegredo)

  if (exige2fa) {
    if (!v.data.codigo) {
      return NextResponse.json({ precisa2fa: true })
    }

    const segredo = decifrarSegredo(usuario.totpSegredo!)
    // Segredo indecifrável (ADMIN_JWT_SECRET trocado) é "não confere",
    // nunca "pode entrar".
    if (!segredo || !verificarCodigoTotp(v.data.codigo, segredo)) {
      return NextResponse.json({ erro: 'Código inválido.', precisa2fa: true }, { status: 401 })
    }
  }

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { ultimoLogin: new Date() },
  })

  const token = await criarSessao({ id: usuario.id, nome: usuario.nome, email: usuario.email })
  const res = NextResponse.json({ ok: true, nome: usuario.nome })
  res.cookies.set(COOKIE_SESSAO, token, opcoesCookie)
  return res
}
