import { NextResponse, type NextRequest } from 'next/server'

import { COOKIE_SESSAO, sessaoValida } from '@/lib/session'

/**
 * Barra /admin e /api/admin sem sessão. Roda no Edge, então valida o JWT
 * sem consultar o banco.
 *
 * A página de login e a rota de login ficam de fora — senão não há como
 * entrar.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const liberado =
    pathname === '/admin/login' ||
    pathname.startsWith('/api/admin/auth/login') ||
    pathname.startsWith('/api/admin/auth/logout')

  if (liberado) return NextResponse.next()

  const ok = await sessaoValida(req.cookies.get(COOKIE_SESSAO)?.value)
  if (ok) return NextResponse.next()

  // API responde 401; página redireciona pro login.
  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ erro: 'Não autorizado.' }, { status: 401 })
  }

  const url = req.nextUrl.clone()
  url.pathname = '/admin/login'
  url.search = ''
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
