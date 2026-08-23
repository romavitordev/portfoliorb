'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Escreve o texto letra a letra quando `ativo` vira verdadeiro.
 *
 * Usado no endereço da janela da Oficina: o site acabou de ficar pronto,
 * e ver o domínio SENDO DIGITADO é o gesto que fecha a história — é o
 * momento em que alguém abre o navegador e vai ver o resultado.
 *
 * Escreve uma vez só. Repetir em loop transformaria um marco numa
 * animação de fundo, e marco que se repete deixa de ser marco.
 *
 * O texto completo fica no DOM desde o começo, num nó só pra leitor de
 * tela; o que anima é uma cópia visual. Assim ninguém ouve "s", "se",
 * "seu"... letra por letra.
 */
export function Digitando({
  texto,
  ativo,
  velocidade = 55,
}: {
  texto: string
  ativo: boolean
  /** Milissegundos por caractere. */
  velocidade?: number
}) {
  const [escrito, setEscrito] = useState('')
  const jaEscreveu = useRef(false)

  useEffect(() => {
    if (!ativo || jaEscreveu.current) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEscrito(texto)
      jaEscreveu.current = true
      return
    }

    jaEscreveu.current = true
    let i = 0
    const id = setInterval(() => {
      i += 1
      setEscrito(texto.slice(0, i))
      if (i >= texto.length) clearInterval(id)
    }, velocidade)

    return () => clearInterval(id)
  }, [ativo, texto, velocidade])

  return (
    <>
      <span className="sr-only">{texto}</span>
      <span aria-hidden>
        {escrito}
        {/* Cursor só enquanto escreve — depois some, como um campo já preenchido */}
        {ativo && escrito.length < texto.length && (
          <span className="ml-px inline-block h-[0.85em] w-[2px] translate-y-[0.12em] animate-caret bg-ciano align-middle" />
        )}
      </span>
    </>
  )
}
