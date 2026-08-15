'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { rotulosCategoria, rotulosNatureza, type Projeto } from '@/lib/projetos'

/**
 * ÍNDICE DE PROJETOS — o catálogo como lista, não como grade.
 *
 * A grade de três colunas com card grande obrigava a rolar muito para
 * ver oito projetos e dava o mesmo peso visual a todos. Uma lista
 * tipográfica cabe inteira na tela, é varrida em segundos, e deixa o
 * NOME do projeto ser o protagonista em vez da foto.
 *
 * A imagem não sumiu: ela aparece num painel que segue o cursor. Assim o
 * visual continua disponível sem custar altura de página.
 *
 * Onde não existe cursor (celular, tablet), o painel flutuante seria
 * inútil — então cada linha ganha uma miniatura embutida. A decisão é
 * por `hover: hover`, não por largura de tela: existe notebook com tela
 * pequena e existe tablet grande com caneta.
 */
export function IndiceProjetos({ projetos }: { projetos: Projeto[] }) {
  const [ativo, setAtivo] = useState<number | null>(null)
  const [temCursor, setTemCursor] = useState(false)
  const painelRef = useRef<HTMLDivElement>(null)
  const listaRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setTemCursor(mq.matches && !semMovimento)

    const aoMudar = (e: MediaQueryListEvent) => setTemCursor(e.matches && !semMovimento)
    mq.addEventListener('change', aoMudar)
    return () => mq.removeEventListener('change', aoMudar)
  }, [])

  /*
    A posição do painel é escrita DIRETO no style, sem passar por estado.
    Um `setState` por mousemove re-renderizaria a lista dezenas de vezes
    por segundo à toa — aqui só o transform de um elemento muda.
  */
  useEffect(() => {
    const lista = listaRef.current
    if (!lista || !temCursor) return

    let raf = 0
    let x = 0
    let y = 0

    const mover = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (!raf) {
        raf = requestAnimationFrame(() => {
          const p = painelRef.current
          if (p) p.style.transform = `translate3d(${x + 24}px, ${y - 130}px, 0)`
          raf = 0
        })
      }
    }

    lista.addEventListener('mousemove', mover)
    return () => {
      lista.removeEventListener('mousemove', mover)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [temCursor])

  return (
    <div className="relative">
      <ul ref={listaRef} className="border-t border-linha" onMouseLeave={() => setAtivo(null)}>
        {projetos.map((projeto, i) => (
          <li key={projeto.slug}>
            <Link
              href={`/projetos/${projeto.slug}`}
              onMouseEnter={() => setAtivo(i)}
              onFocus={() => setAtivo(i)}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 border-b border-linha px-2 py-5 transition-colors duration-500 hover:bg-nevoa/50 md:grid-cols-[3.5rem_auto_1fr_auto] md:gap-x-8 md:px-4 md:py-6"
            >
              {/* Ano */}
              <span className="font-mono text-[0.66rem] tracking-[0.16em] text-luz/35">
                {projeto.ano}
              </span>

              {/* Miniatura — só onde não há cursor */}
              {!temCursor && (
                <span className="relative col-start-2 row-span-2 hidden h-12 w-16 shrink-0 overflow-hidden rounded md:block">
                  <Image
                    src={projeto.imagem}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
              )}

              {/* Nome */}
              <span
                className={`font-display text-xl leading-tight tracking-tight transition-colors duration-300 group-hover:text-ciano md:text-3xl ${
                  temCursor ? 'md:col-start-2' : ''
                }`}
              >
                {projeto.nome}
              </span>

              {/* Etiquetas */}
              <span className="col-span-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-luz/40 md:col-span-1 md:col-start-3 md:justify-end">
                <span className="text-ciano/70">{rotulosCategoria[projeto.categoria]}</span>
                <span aria-hidden className="text-luz/20">
                  /
                </span>
                <span>{rotulosNatureza[projeto.natureza]}</span>
              </span>

              <span
                aria-hidden
                className="justify-self-end text-luz/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ciano"
              >
                <ArrowUpRight size={20} strokeWidth={1.6} />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Painel que segue o cursor */}
      {temCursor && (
        <div
          ref={painelRef}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
        >
          <div
            className={`relative h-[16rem] w-[22rem] overflow-hidden rounded-xl border border-linha shadow-elev-2 transition-all duration-500 ease-saida ${
              ativo === null ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            {projetos.map((projeto, i) => (
              <Image
                key={projeto.slug}
                src={projeto.imagem}
                alt=""
                fill
                sizes="352px"
                className={`object-cover transition-opacity duration-300 ${
                  ativo === i ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(150deg, rgba(109,74,255,0.30), transparent 55%)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
