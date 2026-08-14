/**
 * Rate limit em memória, por IP e por janela deslizante.
 *
 * Vale o que vale: em serverless cada instância tem o próprio mapa, então
 * isso segura enxurrada de um mesmo cliente, não um ataque distribuído.
 * Para o volume de um formulário de contato é suficiente — e não custa
 * nada nem adiciona dependência.
 */
type Registro = { contagem: number; expiraEm: number }

const balde = new Map<string, Registro>()

/** Remove entradas vencidas de vez em quando, pro mapa não crescer sem fim. */
function limpar(agora: number) {
  if (balde.size < 500) return
  for (const [chave, reg] of balde) {
    if (reg.expiraEm <= agora) balde.delete(chave)
  }
}

export function permitir(chave: string, limite = 5, janelaMs = 10 * 60 * 1000) {
  const agora = Date.now()
  limpar(agora)

  const reg = balde.get(chave)
  if (!reg || reg.expiraEm <= agora) {
    balde.set(chave, { contagem: 1, expiraEm: agora + janelaMs })
    return { ok: true, restante: limite - 1 }
  }

  if (reg.contagem >= limite) {
    return { ok: false, restante: 0, esperarSegundos: Math.ceil((reg.expiraEm - agora) / 1000) }
  }

  reg.contagem += 1
  return { ok: true, restante: limite - reg.contagem }
}

/** IP do visitante atrás do proxy da Vercel. */
export function ipDaRequisicao(req: Request) {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'desconhecido'
}
