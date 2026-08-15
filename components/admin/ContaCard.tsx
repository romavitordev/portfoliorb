'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Loader2, ShieldAlert, ShieldCheck } from 'lucide-react'

type Props = {
  ativo: boolean
  ativoDesde: string | null
}

/** Ativa, confirma e desativa a 2FA da conta logada. */
export function ContaCard({ ativo, ativoDesde }: Props) {
  const [estado, setEstado] = useState<'inicio' | 'qr' | 'pronto'>(ativo ? 'pronto' : 'inicio')
  const [qr, setQr] = useState<string | null>(null)
  const [segredo, setSegredo] = useState<string | null>(null)
  const [codigo, setCodigo] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [ocupado, setOcupado] = useState(false)

  async function gerar() {
    setOcupado(true)
    setErro(null)
    const res = await fetch('/api/admin/conta/2fa', { method: 'POST' })
    const corpo = await res.json().catch(() => null)
    if (res.ok) {
      setQr(corpo.qr)
      setSegredo(corpo.segredo)
      setEstado('qr')
    } else {
      setErro(corpo?.erro ?? 'Não foi possível gerar o QR.')
    }
    setOcupado(false)
  }

  async function confirmar() {
    setOcupado(true)
    setErro(null)
    const res = await fetch('/api/admin/conta/2fa', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo }),
    })
    const corpo = await res.json().catch(() => null)
    if (res.ok) {
      setEstado('pronto')
      setQr(null)
      setSegredo(null)
    } else {
      setErro(corpo?.erro ?? 'Código incorreto.')
    }
    setOcupado(false)
  }

  async function desativar() {
    setOcupado(true)
    setErro(null)
    const res = await fetch('/api/admin/conta/2fa', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senha }),
    })
    const corpo = await res.json().catch(() => null)
    if (res.ok) {
      setEstado('inicio')
      setSenha('')
    } else {
      setErro(corpo?.erro ?? 'Não foi possível desativar.')
    }
    setOcupado(false)
  }

  return (
    <div className="surface p-8">
      <div className="flex items-start gap-4">
        {estado === 'pronto' ? (
          <ShieldCheck size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-emerald-400" />
        ) : (
          <ShieldAlert size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-ciano" />
        )}
        <div>
          <h2 className="font-display text-xl tracking-tight">Verificação em dois passos</h2>
          <p className="mt-2 text-sm leading-relaxed text-luz/60">
            {estado === 'pronto'
              ? `Ativa${ativoDesde ? ` desde ${ativoDesde}` : ''}. O login pede um código do seu app autenticador além da senha.`
              : 'Sem ela, quem descobrir sua senha entra no painel. Com ela, ainda precisaria do seu celular.'}
          </p>
        </div>
      </div>

      {estado === 'inicio' && (
        <button type="button" onClick={gerar} disabled={ocupado} className="btn-primary mt-7">
          {ocupado ? <Loader2 size={16} className="animate-spin" /> : null} Ativar 2FA
        </button>
      )}

      {estado === 'qr' && qr && (
        <div className="mt-7">
          <ol className="space-y-2 text-sm text-luz/70">
            <li>1. Abra o Google Authenticator, Authy ou 1Password.</li>
            <li>2. Escaneie o QR abaixo.</li>
            <li>3. Digite o código de seis dígitos para confirmar.</li>
          </ol>

          <div className="mt-6 inline-block rounded-xl bg-luz p-3">
            <Image src={qr} alt="QR code para o app autenticador" width={220} height={220} unoptimized />
          </div>

          {segredo && (
            <p className="mt-4 text-[0.76rem] text-luz/45">
              Não consegue escanear? Digite este código no app:{' '}
              <code className="font-mono text-luz/75">{segredo}</code>
            </p>
          )}

          <label htmlFor="codigo-2fa" className="kicker-poeira mt-7 block">
            Código do app
          </label>
          <input
            id="codigo-2fa"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
            className="campo-form mt-3 max-w-[14rem] text-center font-mono text-xl tracking-[0.4em]"
          />

          <button
            type="button"
            onClick={confirmar}
            disabled={ocupado || codigo.length !== 6}
            className="btn-primary mt-5 block"
          >
            {ocupado ? <Loader2 size={16} className="animate-spin" /> : null} Confirmar e ativar
          </button>
        </div>
      )}

      {estado === 'pronto' && (
        <details className="mt-7">
          <summary className="cursor-pointer list-none font-mono text-[0.66rem] uppercase tracking-[0.2em] text-luz/40 hover:text-ciano [&::-webkit-details-marker]:hidden">
            Desativar
          </summary>
          <p className="mt-4 text-sm text-luz/55">
            Confirme sua senha — desligar o segundo fator é ação sensível, e uma sessão aberta
            sozinha não deveria bastar.
          </p>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="current-password"
            placeholder="Sua senha"
            className="campo-form mt-4 max-w-sm"
          />
          <button
            type="button"
            onClick={desativar}
            disabled={ocupado || !senha}
            className="btn-ghost mt-4 block !border-violeta/40 !text-ciano"
          >
            Desativar 2FA
          </button>
        </details>
      )}

      {erro && <p className="mt-4 text-[0.8rem] text-ciano">{erro}</p>}
    </div>
  )
}
