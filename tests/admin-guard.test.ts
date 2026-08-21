import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

/**
 * Toda rota de API do painel tem que checar a sessão NO PRÓPRIO handler.
 *
 * O `middleware.ts` já barra /api/admin, mas ele é uma linha de defesa só,
 * e frágil: vive num `matcher` de string. Renomear uma pasta, editar o
 * matcher sem perceber ou o framework mudar de comportamento derruba a
 * proteção sem erro nenhum aparecer — a rota simplesmente passa a
 * responder para qualquer um.
 *
 * Este teste existe porque isso JÁ ACONTECEU aqui: `leads/route.ts` servia
 * a lista inteira de leads (nome, telefone e mensagem de quem preencheu o
 * formulário) confiando só no middleware, e o DELETE de `leads/[id]` não
 * checava nada. Ideia emprestada do mesmo teste no Marcelo Imóveis.
 */

const RAIZ = path.join(process.cwd(), 'app', 'api', 'admin')

/** Rotas de autenticação ficam de fora — sem elas não há como entrar. */
const LIBERADAS = [path.join('auth', 'login'), path.join('auth', 'logout')]

function rotas(dir: string): string[] {
  return readdirSync(dir).flatMap((nome) => {
    const completo = path.join(dir, nome)
    if (statSync(completo).isDirectory()) return rotas(completo)
    return nome === 'route.ts' ? [completo] : []
  })
}

describe('guarda das rotas do painel', () => {
  const encontradas = rotas(RAIZ).filter(
    (r) => !LIBERADAS.some((l) => r.includes(l)),
  )

  it('acha as rotas protegidas', () => {
    expect(encontradas.length).toBeGreaterThan(0)
  })

  it.each(encontradas)('%s lê a sessão no handler', (arquivo) => {
    const src = readFileSync(arquivo, 'utf-8')
    expect(src).toMatch(/lerSessao\s*\(/)
  })

  it.each(encontradas)('%s responde 401 sem sessão', (arquivo) => {
    const src = readFileSync(arquivo, 'utf-8')
    expect(src).toMatch(/status:\s*401/)
  })

  /*
    O invariante que importa é a ORDEM: estabelecer identidade antes de
    encostar no banco.

    A primeira versão deste teste exigia o literal `status: 401` antes do
    primeiro `prisma.`, e acusou a rota da 2FA de errado. Era falso
    positivo — ela usa um helper `usuarioDaSessao()` declarado no topo,
    que lê a sessão, devolve null se não houver e só então consulta pelo
    id. Padrão melhor que o inline, reprovado por uma asserção ruim.
  */
  it.each(encontradas)('%s lê a sessão antes de tocar o banco', (arquivo) => {
    const src = readFileSync(arquivo, 'utf-8')
    const banco = src.search(/prisma\.\w+\.\w+/)
    if (banco === -1) return
    const sessao = src.search(/lerSessao\s*\(/)
    expect(sessao).toBeGreaterThan(-1)
    expect(sessao).toBeLessThan(banco)
  })
})
