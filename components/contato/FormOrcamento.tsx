'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'

import { contato, waLink, waMensagens } from '@/lib/site'

/**
 * Formulário de orçamento sem back-end: monta a mensagem e abre o
 * WhatsApp já preenchido. Zero servidor, zero LGPD a gerenciar — o dado
 * do visitante nunca passa por nós.
 */
export function FormOrcamento() {
  const [tipo, setTipo] = useState(contato.tipos[0])
  const [prazo, setPrazo] = useState(contato.prazos[0])
  const [sobre, setSobre] = useState('')

  const valido = sobre.trim().length >= 10

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (!valido) return
    window.open(waLink(waMensagens.orcamento(tipo, prazo, sobre.trim())), '_blank', 'noopener')
  }

  return (
    <form onSubmit={enviar} className="surface p-8 md:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="tipo" className="kicker-poeira block">
            O que você precisa
          </label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="campo mt-3"
          >
            {contato.tipos.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="prazo" className="kicker-poeira block">
            Para quando
          </label>
          <select
            id="prazo"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
            className="campo mt-3"
          >
            {contato.prazos.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="sobre" className="kicker-poeira block">
          Conta em duas linhas
        </label>
        <textarea
          id="sobre"
          rows={5}
          value={sobre}
          onChange={(e) => setSobre(e.target.value)}
          placeholder="Ex.: tenho uma loja de peças e quero um catálogo online que o meu vendedor consiga atualizar sozinho."
          className="campo mt-3 resize-y"
          aria-describedby="sobre-ajuda"
        />
        <p id="sobre-ajuda" className="mt-2 text-[0.72rem] text-creme/40">
          Mínimo de 10 caracteres. Nada é enviado para um servidor nosso — o botão abre o WhatsApp
          com a mensagem já escrita, e você revisa antes de mandar.
        </p>
      </div>

      <button type="submit" disabled={!valido} className="btn-primary mt-8 w-full sm:w-auto">
        <MessageCircle size={16} /> Abrir no WhatsApp
      </button>
    </form>
  )
}
