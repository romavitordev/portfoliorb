import { SignJWT, jwtVerify } from 'jose'

/**
 * Sessão do admin: JWT assinado dentro de cookie httpOnly, 8h de validade
 * — mesmo arranjo do painel do Marcelo Imóveis.
 *
 * `jose` funciona no runtime Edge, então o middleware consegue validar a
 * sessão sem tocar no banco.
 */
export const COOKIE_SESSAO = 'rb_admin'
const VALIDADE = '8h'

function segredo() {
  const s = process.env.ADMIN_JWT_SECRET
  if (!s || s.length < 32) {
    throw new Error('ADMIN_JWT_SECRET ausente ou com menos de 32 caracteres.')
  }
  return new TextEncoder().encode(s)
}

export async function criarSessao() {
  return new SignJWT({ papel: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(VALIDADE)
    .sign(segredo())
}

export async function sessaoValida(token: string | undefined) {
  if (!token) return false
  try {
    const { payload } = await jwtVerify(token, segredo())
    return payload.papel === 'admin'
  } catch {
    return false
  }
}

/** Opções do cookie — `secure` só em produção, senão quebra em localhost. */
export const opcoesCookie = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 8 * 60 * 60,
}
