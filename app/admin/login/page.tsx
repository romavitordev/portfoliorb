'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { KeyRound, Loader2, Lock, ShieldCheck } from 'lucide-react'

/**
 * Login em duas etapas: e-mail e senha e, para quem tem 2FA ativa, os
 * seis dígitos do app autenticador. A senha continua sendo enviada na
 * segunda chamada — o código sozinho nunca autentica.
 */
export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [codigo, setCodigo] = useState('')
  const [etapa, setEtapa] = useState<'credenciais' | 'codigo'>('credenciais')

  const [erro, setErro] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  async function entrar(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)
    setEnviando(true)

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          senha,
          codigo: etapa === 'codigo' ? codigo : undefined,
        }),
      })

      const corpo = await res.json().catch(() => null)

      if (res.ok && corpo?.precisa2fa) {
        setEtapa('codigo')
        return
      }

      if (res.ok) {
        router.replace('/admin')
        router.refresh()
        return
      }

      if (corpo?.precisa2fa) setEtapa('codigo')
      setErro(corpo?.erro ?? 'Não foi possível entrar.')
    } catch {
      setErro('Sem conexão com o servidor.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="relative flex min-h-[80vh] items-center">
      <div className="malha absolute inset-0 opacity-40" aria-hidden />

      <div className="container-page relative">
        <form onSubmit={entrar} className="surface mx-auto max-w-md p-8 md:p-10">
          {etapa === 'credenciais' ? (
            <>
              <Lock size={22} strokeWidth={1.5} className="text-clay" aria-hidden />
              <h1 className="t-h3 mt-5 font-display">Painel do estúdio</h1>
              <p className="mt-3 text-sm leading-relaxed text-creme/55">
                Área restrita. É aqui que os leads do site chegam.
              </p>

              <label htmlFor="email" className="kicker-poeira mt-8 block">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                autoFocus
                className="campo mt-3"
              />

              <label htmlFor="senha" className="kicker-poeira mt-6 block">
                Senha
              </label>
              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="current-password"
                className="campo mt-3"
              />
            </>
          ) : (
            <>
              <ShieldCheck size={22} strokeWidth={1.5} className="text-clay" aria-hidden />
              <h1 className="t-h3 mt-5 font-display">Verificação em dois passos</h1>
              <p className="mt-3 text-sm leading-relaxed text-creme/55">
                Digite os seis dígitos que aparecem no seu app autenticador para{' '}
                <strong className="text-creme/80">{email}</strong>.
              </p>

              <label htmlFor="codigo" className="kicker-poeira mt-8 block">
                Código
              </label>
              <input
                id="codigo"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
                autoFocus
                className="campo mt-3 text-center font-mono text-2xl tracking-[0.5em]"
              />

              <button
                type="button"
                onClick={() => {
                  setEtapa('credenciais')
                  setCodigo('')
                  setErro(null)
                }}
                className="btn-link mt-4 !text-[0.78rem]"
              >
                Voltar
              </button>
            </>
          )}

          {erro && <p className="mt-4 text-[0.8rem] text-clay">{erro}</p>}

          <button
            type="submit"
            disabled={
              enviando ||
              (etapa === 'credenciais' ? !email || !senha : codigo.length !== 6)
            }
            className="btn-primary mt-7 w-full"
          >
            {enviando ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Entrando
              </>
            ) : etapa === 'credenciais' ? (
              'Entrar'
            ) : (
              <>
                <KeyRound size={16} /> Confirmar
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
