'use client'

import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'

/**
 * Copia um valor e confirma que copiou.
 *
 * Não é enfeite: e-mail e telefone existem pra serem levados pra outro
 * lugar, e selecionar texto com o mouse num site escuro é chato. O botão
 * resolve, e a troca do ícone é a única forma de a pessoa saber que deu
 * certo — cópia silenciosa deixa dúvida e leva a copiar de novo.
 *
 * Volta ao normal em 2s: confirmação que fica pra sempre vira ruído, e
 * a pessoa perde a referência de qual foi a última ação.
 */
export function Copiar({ valor, rotulo }: { valor: string; rotulo: string }) {
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    if (!copiado) return
    const t = setTimeout(() => setCopiado(false), 2000)
    return () => clearTimeout(t)
  }, [copiado])

  async function copiar() {
    try {
      await navigator.clipboard.writeText(valor)
      setCopiado(true)
    } catch {
      // Clipboard bloqueado (http, permissão negada): não finge sucesso.
      setCopiado(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copiar}
      // O aria-label muda junto, senão quem usa leitor de tela não é
      // avisado de nada — a troca do ícone é informação só pra quem vê.
      aria-label={copiado ? `${rotulo} copiado` : `Copiar ${rotulo}`}
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-linha text-luz/40 transition-colors duration-300 hover:border-ciano/50 hover:text-ciano"
    >
      {copiado ? (
        <Check size={13} strokeWidth={2} className="text-lima" aria-hidden />
      ) : (
        <Copy size={13} strokeWidth={1.8} aria-hidden />
      )}
    </button>
  )
}
