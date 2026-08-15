'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Mail, MessageCircle, Trash2 } from 'lucide-react'

import {
  STATUS_LEAD,
  coresStatus as cores,
  rotulosStatus as rotulos,
  type StatusLead as Status,
} from '@/lib/lead-status'

export type LeadSerializado = {
  id: string
  nome: string
  contato: string
  tipo: string
  prazo: string
  sobre: string
  status: Status
  nota: string | null
  origem: string | null
  criadoEm: string
  tratadoPor: string | null
}

const ordem = STATUS_LEAD

/** Monta o link de resposta a partir do que a pessoa deixou. */
function linkResposta(contato: string) {
  const digitos = contato.replace(/\D/g, '')
  if (digitos.length >= 10 && digitos.length <= 13) {
    return { href: `https://wa.me/${digitos.startsWith('55') ? digitos : `55${digitos}`}`, whats: true }
  }
  if (/\S+@\S+\.\S+/.test(contato)) return { href: `mailto:${contato}`, whats: false }
  return null
}

export function LeadsList({
  inicial,
  quemSou,
}: {
  inicial: LeadSerializado[]
  /** Nome do sócio logado — usado no otimismo do "último toque". */
  quemSou: string
}) {
  const router = useRouter()
  const [leads, setLeads] = useState(inicial)
  const [filtro, setFiltro] = useState<Status | 'todos'>('todos')
  const [salvando, setSalvando] = useState<string | null>(null)

  const visiveis = useMemo(
    () => (filtro === 'todos' ? leads : leads.filter((l) => l.status === filtro)),
    [leads, filtro],
  )

  async function mudarStatus(id: string, status: Status) {
    setSalvando(id)
    const anterior = leads
    setLeads((atual) =>
      atual.map((l) => (l.id === id ? { ...l, status, tratadoPor: quemSou } : l)),
    )

    const res = await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(() => null)

    if (!res?.ok) setLeads(anterior) // desfaz o otimismo se o servidor recusou
    setSalvando(null)
  }

  async function salvarNota(id: string, nota: string) {
    setSalvando(id)
    await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nota: nota || null }),
    }).catch(() => null)
    setLeads((atual) => atual.map((l) => (l.id === id ? { ...l, nota: nota || null } : l)))
    setSalvando(null)
  }

  async function apagar(id: string, nome: string) {
    if (!confirm(`Apagar o lead de ${nome}? Não dá pra desfazer.`)) return
    const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' }).catch(() => null)
    if (res?.ok) setLeads((atual) => atual.filter((l) => l.id !== id))
  }

  async function sair() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Filtro ativo={filtro === 'todos'} onClick={() => setFiltro('todos')}>
            Todos ({leads.length})
          </Filtro>
          {ordem.map((s) => {
            const n = leads.filter((l) => l.status === s).length
            if (n === 0) return null
            return (
              <Filtro key={s} ativo={filtro === s} onClick={() => setFiltro(s)}>
                {rotulos[s]} ({n})
              </Filtro>
            )
          })}
        </div>

        <button type="button" onClick={sair} className="btn-link">
          <LogOut size={15} /> Sair
        </button>
      </div>

      {visiveis.length === 0 && (
        <p className="measure py-16 text-creme/55">
          {leads.length === 0
            ? 'Nenhum lead ainda. Quando alguém preencher o formulário de contato, aparece aqui — e chega um e-mail avisando.'
            : 'Nenhum lead com esse status.'}
        </p>
      )}

      <ul className="mt-8 space-y-4">
        {visiveis.map((lead) => {
          const resposta = linkResposta(lead.contato)

          return (
            <li key={lead.id} className={`surface p-6 md:p-7 ${salvando === lead.id ? 'opacity-60' : ''}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl tracking-tight">{lead.nome}</h3>
                    <span className={`chip ${cores[lead.status]}`}>{rotulos[lead.status]}</span>
                  </div>
                  <p className="mt-1.5 font-mono text-[0.72rem] text-creme/50">
                    {lead.tipo} · {lead.prazo} ·{' '}
                    {new Date(lead.criadoEm).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    {lead.origem ? ` · veio de ${lead.origem}` : ''}
                  </p>
                  {lead.tratadoPor && (
                    <p className="mt-1 font-mono text-[0.68rem] text-clay/80">
                      último toque: {lead.tratadoPor}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {resposta && (
                    <a
                      href={resposta.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn-primary !px-4 !py-2 text-[0.76rem]"
                    >
                      {resposta.whats ? <MessageCircle size={14} /> : <Mail size={14} />}
                      Responder
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => apagar(lead.id, lead.nome)}
                    aria-label={`Apagar lead de ${lead.nome}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-creme/15 text-creme/45 transition-colors hover:border-clay hover:text-clay"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <p className="mt-4 whitespace-pre-wrap rounded-xl border border-linha bg-carvao/50 p-4 text-sm leading-relaxed text-creme/75">
                {lead.sobre}
              </p>

              <p className="mt-3 font-mono text-[0.74rem] text-creme/60">{lead.contato}</p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-creme/35">
                  Mover para
                </span>
                {ordem
                  .filter((s) => s !== lead.status)
                  .map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => mudarStatus(lead.id, s)}
                      className="rounded-full border border-linha px-3 py-1 text-[0.72rem] text-creme/60 transition-colors hover:border-clay hover:text-clay"
                    >
                      {rotulos[s]}
                    </button>
                  ))}
              </div>

              <details className="mt-4">
                <summary className="cursor-pointer list-none font-mono text-[0.66rem] uppercase tracking-[0.2em] text-creme/40 hover:text-clay [&::-webkit-details-marker]:hidden">
                  Anotação interna {lead.nota ? '•' : ''}
                </summary>
                <textarea
                  defaultValue={lead.nota ?? ''}
                  onBlur={(e) => salvarNota(lead.id, e.target.value.trim())}
                  rows={3}
                  placeholder="Só o estúdio vê. Salva ao sair do campo."
                  className="campo mt-3 resize-y text-sm"
                />
              </details>
            </li>
          )
        })}
      </ul>
    </>
  )
}

function Filtro({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={`rounded-full border px-4 py-1.5 text-[0.76rem] transition-all ${
        ativo ? 'border-clay bg-clay text-carvao' : 'border-linha text-creme/60 hover:border-creme/40'
      }`}
    >
      {children}
    </button>
  )
}
