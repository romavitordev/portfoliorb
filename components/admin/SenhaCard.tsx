'use client'

import { useState } from 'react'
import { Check, KeyRound, Loader2 } from 'lucide-react'

export function SenhaCard() {
  const [atual, setAtual] = useState('')
  const [nova, setNova] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [ok, setOk] = useState(false)
  const [ocupado, setOcupado] = useState(false)

  async function trocar(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)
    setOk(false)
    setOcupado(true)

    const res = await fetch('/api/admin/conta/senha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ atual, nova }),
    })
    const corpo = await res.json().catch(() => null)

    if (res.ok) {
      setOk(true)
      setAtual('')
      setNova('')
    } else {
      setErro(corpo?.erro ?? 'Não foi possível trocar a senha.')
    }
    setOcupado(false)
  }

  return (
    <form onSubmit={trocar} className="surface p-8">
      <KeyRound size={22} strokeWidth={1.5} className="text-clay" aria-hidden />
      <h2 className="mt-4 font-display text-xl tracking-tight">Trocar senha</h2>
      <p className="mt-2 text-sm leading-relaxed text-creme/60">
        A senha atual é sempre exigida, mesmo com a sessão aberta.
      </p>

      <label htmlFor="atual" className="kicker-poeira mt-7 block">
        Senha atual
      </label>
      <input
        id="atual"
        type="password"
        value={atual}
        onChange={(e) => setAtual(e.target.value)}
        autoComplete="current-password"
        className="campo mt-3 max-w-sm"
      />

      <label htmlFor="nova" className="kicker-poeira mt-6 block">
        Senha nova
      </label>
      <input
        id="nova"
        type="password"
        value={nova}
        onChange={(e) => setNova(e.target.value)}
        autoComplete="new-password"
        className="campo mt-3 max-w-sm"
      />
      <p className="mt-2 text-[0.72rem] text-creme/40">Pelo menos 10 caracteres.</p>

      {erro && <p className="mt-4 text-[0.8rem] text-clay">{erro}</p>}
      {ok && (
        <p className="mt-4 inline-flex items-center gap-2 text-[0.8rem] text-emerald-400">
          <Check size={14} /> Senha trocada.
        </p>
      )}

      <button
        type="submit"
        disabled={ocupado || !atual || nova.length < 10}
        className="btn-primary mt-6 block"
      >
        {ocupado ? <Loader2 size={16} className="animate-spin" /> : null} Salvar
      </button>
    </form>
  )
}
