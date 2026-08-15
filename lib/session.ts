import { SignJWT, jwtVerify } from 'jose'

/**
 * Sessão do painel: JWT assinado dentro de cookie httpOnly, 8h de
 * validade — mesmo arranjo do painel do Marcelo Imóveis.
 *
 * `jose` roda no Edge, então o middleware valida a sessão sem tocar no
 * banco. Por isso o nome do sócio viaja dentro do token: assim o painel
 * mostra quem está logado sem uma consulta a cada request.
 */
export const COOKIE_SESSAO = 'rb_admin'
const VALIDADE = '8h'

export type Sessao = {
  id: string
  nome: string
  email: string
}

function segredo() {
  const s = process.env.ADMIN_JWT_SECRET
  if (!s || s.length < 32) {
    throw new Error('ADMIN_JWT_SECRET ausente ou com menos de 32 caracteres.')
  }
  return new TextEncoder().encode(s)
}

export async function criarSessao(usuario: Sessao) {
  return new SignJWT({ ...usuario, papel: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(VALIDADE)
    .sign(segredo())
}

/** Devolve a sessão, ou null quando o token é inválido/expirado. */
export async function lerSessao(token: string | undefined): Promise<Sessao | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, segredo())
    if (payload.papel !== 'admin') return null
    return {
      id: String(payload.id),
      nome: String(payload.nome),
      email: String(payload.email),
    }
  } catch {
    return null
  }
}

export async function sessaoValida(token: string | undefined) {
  return (await lerSessao(token)) !== null
}

/** Opções do cookie — `secure` só em produção, senão quebra em localhost. */
export const opcoesCookie = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 8 * 60 * 60,
}
