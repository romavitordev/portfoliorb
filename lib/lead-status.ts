/**
 * Estados de um lead. Ficam aqui — e não como enum do banco — para que o
 * mesmo schema rode em Postgres (produção) e SQLite (dev local), e para
 * que acrescentar um estado seja editar uma linha em vez de migrar tipo
 * no Postgres.
 *
 * A garantia de integridade vem do Zod na fronteira da API.
 */
export const STATUS_LEAD = [
  'NOVO',
  'EM_CONVERSA',
  'PROPOSTA',
  'FECHADO',
  'DESCARTADO',
] as const

export type StatusLead = (typeof STATUS_LEAD)[number]

export const rotulosStatus: Record<StatusLead, string> = {
  NOVO: 'Novo',
  EM_CONVERSA: 'Em conversa',
  PROPOSTA: 'Proposta enviada',
  FECHADO: 'Fechado',
  DESCARTADO: 'Descartado',
}

/** Classe de cor do selo, por status. */
export const coresStatus: Record<StatusLead, string> = {
  NOVO: 'border-violeta text-ciano',
  EM_CONVERSA: 'border-luz/40 text-luz/80',
  PROPOSTA: 'border-luz/40 text-luz/80',
  FECHADO: 'border-emerald-500/50 text-emerald-400',
  DESCARTADO: 'border-luz/15 text-luz/40',
}

export function ehStatusValido(v: unknown): v is StatusLead {
  return typeof v === 'string' && (STATUS_LEAD as readonly string[]).includes(v)
}
