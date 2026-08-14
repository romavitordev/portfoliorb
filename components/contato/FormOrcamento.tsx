'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CheckCircle2, Loader2, MessageCircle, Send } from 'lucide-react'

import { brand, contato, waLink, waMensagens } from '@/lib/site'
import { validarLead, type ErrosCampo } from '@/lib/lead-input'

/**
 * Formulário de orçamento.
 *
 * Grava o lead em /api/leads e dispara o aviso por e-mail. No espelho
 * estático do GitHub Pages não existe API — lá `NEXT_PUBLIC_LEADS=off`
 * faz o botão cair direto no WhatsApp, que é o comportamento honesto
 * para uma demo sem servidor.
 *
 * Se a API existir mas falhar, o WhatsApp também aparece como saída:
 * lead perdido por erro de servidor é o pior desfecho possível.
 */
const CAPTURA_ATIVA = process.env.NEXT_PUBLIC_LEADS !== 'off'

type Estado = 'parado' | 'enviando' | 'enviado' | 'falhou'

export function FormOrcamento() {
  const pathname = usePathname()

  const [nome, setNome] = useState('')
  const [contatoInfo, setContatoInfo] = useState('')
  const [tipo, setTipo] = useState(contato.tipos[0])
  const [prazo, setPrazo] = useState(contato.prazos[0])
  const [sobre, setSobre] = useState('')
  const [site, setSite] = useState('') // honeypot

  const [estado, setEstado] = useState<Estado>('parado')
  const [erros, setErros] = useState<ErrosCampo>({})
  const [erroGeral, setErroGeral] = useState<string | null>(null)

  const mensagemWa = waMensagens.orcamento(tipo, prazo, sobre.trim() || '(sem detalhes)')

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    setErroGeral(null)

    const dados = { nome, contato: contatoInfo, tipo, prazo, sobre, origem: pathname, site }

    const v = validarLead(dados)
    if (!v.ok) {
      setErros(v.erros)
      return
    }
    setErros({})

    // Sem API (espelho estático): vai direto pro WhatsApp.
    if (!CAPTURA_ATIVA) {
      window.open(waLink(mensagemWa), '_blank', 'noopener')
      return
    }

    setEstado('enviando')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(v.valor),
      })

      if (res.ok) {
        setEstado('enviado')
        return
      }

      const corpo = await res.json().catch(() => null)
      if (res.status === 422 && corpo?.campos) {
        setErros(corpo.campos)
        setEstado('parado')
        return
      }
      setErroGeral(corpo?.erro ?? 'Não conseguimos enviar agora.')
      setEstado('falhou')
    } catch {
      setErroGeral('Sem conexão com o servidor.')
      setEstado('falhou')
    }
  }

  if (estado === 'enviado') {
    return (
      <div className="surface p-8 text-center md:p-12">
        <CheckCircle2 size={40} strokeWidth={1.4} className="mx-auto text-clay" aria-hidden />
        <h2 className="t-h3 mt-6 font-display">Recebido, {nome.split(' ')[0]}.</h2>
        <p className="measure mx-auto mt-4 text-sm leading-relaxed text-creme/65">
          {contato.sucesso}
        </p>
        <a
          href={waLink(waMensagens.geral)}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-ghost mt-8"
        >
          <MessageCircle size={16} /> Falar agora no WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} noValidate className="surface p-8 md:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <Campo
          id="nome"
          rotulo="Seu nome"
          erro={erros.nome}
          valor={nome}
          onChange={setNome}
          placeholder="Como podemos te chamar"
          autoComplete="name"
        />
        <Campo
          id="contato"
          rotulo="WhatsApp ou e-mail"
          erro={erros.contato}
          valor={contatoInfo}
          onChange={setContatoInfo}
          placeholder="(15) 99999-9999"
          autoComplete="tel"
        />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
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
          aria-invalid={!!erros.sobre}
          aria-describedby={erros.sobre ? 'sobre-erro' : undefined}
        />
        {erros.sobre && (
          <p id="sobre-erro" className="mt-2 text-[0.76rem] text-clay">
            {erros.sobre}
          </p>
        )}
      </div>

      {/* Honeypot — invisível para gente, irresistível para bot. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="site">Não preencha este campo</label>
        <input
          id="site"
          name="site"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
      </div>

      {erroGeral && (
        <div className="mt-6 rounded-xl border border-clay/40 bg-clay/10 p-4">
          <p className="text-sm text-creme/85">{erroGeral}</p>
          <a
            href={waLink(mensagemWa)}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-link mt-2 !text-clay"
          >
            <MessageCircle size={15} /> Enviar pelo WhatsApp
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={estado === 'enviando'}
        className="btn-primary mt-8 w-full sm:w-auto"
      >
        {estado === 'enviando' ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Enviando
          </>
        ) : CAPTURA_ATIVA ? (
          <>
            <Send size={16} /> Enviar pedido de orçamento
          </>
        ) : (
          <>
            <MessageCircle size={16} /> Abrir no WhatsApp
          </>
        )}
      </button>

      <p className="mt-5 text-[0.72rem] leading-relaxed text-creme/40">
        {CAPTURA_ATIVA
          ? `Seus dados ficam só com a gente, usados para responder este pedido — nada de lista de disparo. Prefere conversar direto? Chame no WhatsApp ou escreva para ${brand.email}.`
          : 'Esta é a versão de demonstração do site: o botão abre o WhatsApp com a mensagem pronta e você revisa antes de mandar.'}
      </p>
    </form>
  )
}

/* ------------------------------------------------------------------ */

type CampoProps = {
  id: string
  rotulo: string
  valor: string
  onChange: (v: string) => void
  erro?: string
  placeholder?: string
  autoComplete?: string
}

function Campo({ id, rotulo, valor, onChange, erro, placeholder, autoComplete }: CampoProps) {
  return (
    <div>
      <label htmlFor={id} className="kicker-poeira block">
        {rotulo}
      </label>
      <input
        id={id}
        type="text"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="campo mt-3"
        aria-invalid={!!erro}
        aria-describedby={erro ? `${id}-erro` : undefined}
      />
      {erro && (
        <p id={`${id}-erro`} className="mt-2 text-[0.76rem] text-clay">
          {erro}
        </p>
      )}
    </div>
  )
}
