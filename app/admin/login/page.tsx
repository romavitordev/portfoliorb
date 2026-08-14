'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Lock } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [senha, setSenha] = useState('')
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
        body: JSON.stringify({ senha }),
      })

      if (res.ok) {
        router.replace('/admin')
        router.refresh()
        return
      }

      const corpo = await res.json().catch(() => null)
      setErro(corpo?.erro ?? 'Não foi possível entrar.')
    } catch {
      setErro('Sem conexão com o servidor.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="flex min-h-[80vh] items-center">
      <div className="malha absolute inset-0 opacity-40" aria-hidden />

      <div className="container-page relative">
        <form onSubmit={entrar} className="surface mx-auto max-w-md p-8 md:p-10">
          <Lock size={22} strokeWidth={1.5} className="text-clay" aria-hidden />
          <h1 className="t-h3 mt-5 font-display">Painel do estúdio</h1>
          <p className="mt-3 text-sm leading-relaxed text-creme/55">
            Área restrita. É aqui que os leads do site chegam.
          </p>

          <label htmlFor="senha" className="kicker-poeira mt-8 block">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="current-password"
            autoFocus
            className="campo mt-3"
          />

          {erro && <p className="mt-3 text-[0.8rem] text-clay">{erro}</p>}

          <button type="submit" disabled={enviando || !senha} className="btn-primary mt-7 w-full">
            {enviando ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Entrando
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
