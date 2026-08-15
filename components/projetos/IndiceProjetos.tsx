'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { rotulosCategoria, rotulosNatureza, type Projeto } from '@/lib/projetos'

/** Casadas com as classes `w-[22rem]` / `h-[16rem]` do painel. */
const LARGURA_PAINEL = 352
const ALTURA_PAINEL = 256

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
    Um único `mousemove` resolve as duas coisas: onde o painel fica e
    QUAL projeto ele mostra.

    A linha ativa sai daqui em vez de `onMouseEnter` por linha porque o
    `mouseenter` do React depende do estado de :hover do navegador, que
    se perde em movimento rápido entre linhas vizinhas — passando o mouse
    depressa, dava pra ver o painel segurando o projeto errado. Lendo do
    ponteiro, a linha certa é sempre a que está debaixo dele.

    A posição vai direto no `style`, sem estado: um `setState` por
    mousemove re-renderizaria a lista dezenas de vezes por segundo. Já o
    índice só entra no estado quando MUDA de linha.
  */
  useEffect(() => {
    const lista = listaRef.current
    if (!lista || !temCursor) return

    let raf = 0
    let x = 0
    let y = 0
    let ultimo = -1

    const mover = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY

      const linha = (e.target as HTMLElement).closest<HTMLElement>('li[data-indice]')
      const indice = linha ? Number(linha.dataset.indice) : -1
      if (indice !== ultimo) {
        ultimo = indice
        setAtivo(indice >= 0 ? indice : null)
      }

      if (!raf) {
        raf = requestAnimationFrame(() => {
          const p = painelRef.current
          if (!p) {
            raf = 0
            return
          }

          /*
            Preso dentro da viewport. Sem isso o painel vaza pela direita
            e por baixo quando o cursor chega perto da borda — com 352x256
            e o deslocamento do cursor, as últimas linhas da lista jogavam
            metade dele pra fora da tela.
          */
          const margem = 16
          const limite = (v: number, max: number) => Math.max(margem, Math.min(v, max - margem))

          const px = limite(x + 24, window.innerWidth - LARGURA_PAINEL)
          const py = limite(y - LARGURA_PAINEL / 2.75, window.innerHeight - ALTURA_PAINEL)

          p.style.transform = `translate3d(${px}px, ${py}px, 0)`
          raf = 0
        })
      }
    }

    const sair = () => {
      ultimo = -1
      setAtivo(null)
    }

    lista.addEventListener('mousemove', mover)
    lista.addEventListener('mouseleave', sair)
    return () => {
      lista.removeEventListener('mousemove', mover)
      lista.removeEventListener('mouseleave', sair)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [temCursor])

  return (
    <div className="relative">
      <ul ref={listaRef} className="border-t border-linha">
        {projetos.map((projeto, i) => (
          // `data-indice` é o que o mousemove lê pra saber a linha ativa
          <li key={projeto.slug} data-indice={i}>
            <Link
              href={`/projetos/${projeto.slug}`}
              // Teclado: quem navega por Tab também vê o painel
              onFocus={() => setAtivo(i)}
              onBlur={() => setAtivo(null)}
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
