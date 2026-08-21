'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { rotulosCategoria, rotulosNatureza, type Projeto } from '@/lib/projetos'
import { BLUR_ESCURO } from '@/lib/blur'

/**
 * ÍNDICE DE PROJETOS — o catálogo como lista, não como grade.
 *
 * A grade de três colunas com card grande obrigava a rolar muito para
 * ver oito projetos e dava o mesmo peso visual a todos. Uma lista
 * tipográfica é varrida em segundos e deixa o NOME do projeto ser o
 * protagonista em vez da foto.
 *
 * A imagem não sumiu: vive numa coluna fixa à direita que troca conforme
 * o ponteiro percorre a lista.
 *
 * Por que a coluna fixa e não um painel seguindo o cursor: o painel
 * flutuante cobria justamente os nomes que a pessoa estava lendo. Um
 * preview que esconde o conteúdo que ele ilustra é pior que nenhum.
 *
 * Onde não existe cursor (celular, tablet) a coluna não faz sentido, e
 * cada linha ganha uma miniatura embutida. A decisão é por `hover: hover`
 * e não por largura de tela: existe notebook com tela pequena e tablet
 * grande com caneta.
 */
export function IndiceProjetos({ projetos }: { projetos: Projeto[] }) {
  const [ativo, setAtivo] = useState<number | null>(null)
  const [temCursor, setTemCursor] = useState(false)
  const listaRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setTemCursor(mq.matches)
    const aoMudar = (e: MediaQueryListEvent) => setTemCursor(e.matches)
    mq.addEventListener('change', aoMudar)
    return () => mq.removeEventListener('change', aoMudar)
  }, [])

  /*
    A linha ativa sai do `mousemove`, não de um `onMouseEnter` por linha.
    O `mouseenter` do React deriva do estado de :hover do navegador, que
    se perde em movimento rápido entre linhas vizinhas — passando o mouse
    depressa, dava pra ver o preview segurando o projeto errado. Lendo do
    ponteiro, a linha certa é sempre a que está debaixo dele.

    O índice só entra no estado quando MUDA de linha, então não há
    re-render por quadro.
  */
  useEffect(() => {
    const lista = listaRef.current
    if (!lista || !temCursor) return

    let ultimo = -1

    const mover = (e: MouseEvent) => {
      const linha = (e.target as HTMLElement).closest<HTMLElement>('li[data-indice]')
      const indice = linha ? Number(linha.dataset.indice) : -1
      if (indice !== ultimo) {
        ultimo = indice
        setAtivo(indice >= 0 ? indice : null)
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
    }
  }, [temCursor])

  const emDestaque = ativo === null ? null : projetos[ativo]

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
      <ul ref={listaRef} className="border-t border-linha">
        {projetos.map((projeto, i) => (
          // `data-indice` é o que o mousemove lê pra saber a linha ativa
          <li key={projeto.slug} data-indice={i}>
            <Link
              href={`/projetos/${projeto.slug}`}
              onFocus={() => setAtivo(i)}
              onBlur={() => setAtivo(null)}
              className="group flex items-center gap-4 border-b border-linha px-2 py-5 transition-colors duration-500 hover:bg-nevoa/50 md:gap-6 md:px-3"
            >
              <span className="w-10 shrink-0 font-mono text-[0.66rem] tracking-[0.16em] text-luz/35">
                {projeto.ano}
              </span>

              {/* Miniatura embutida — só onde não há cursor pra guiar */}
              {!temCursor && (
                <span className="relative hidden h-11 w-16 shrink-0 overflow-hidden rounded sm:block">
                  <Image
                    placeholder="blur"
                    blurDataURL={BLUR_ESCURO} src={projeto.imagem} alt="" fill sizes="64px" className="object-cover" />
                </span>
              )}

              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-xl leading-tight tracking-tight transition-colors duration-300 group-hover:text-ciano md:text-2xl">
                  {projeto.nome}
                </span>
                <span className="mt-1 flex flex-wrap items-center gap-x-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-luz/40">
                  <span className="text-ciano/70">{rotulosCategoria[projeto.categoria]}</span>
                  <span aria-hidden className="text-luz/20">
                    /
                  </span>
                  <span>{rotulosNatureza[projeto.natureza]}</span>
                </span>
              </span>

              <span
                aria-hidden
                className="shrink-0 text-luz/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ciano"
              >
                <ArrowUpRight size={19} strokeWidth={1.6} />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Coluna do preview — acompanha a rolagem sem cobrir a lista */}
      {temCursor && (
        <div aria-hidden className="hidden lg:block">
          <div className="sticky top-28">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-linha bg-nevoa">
              {projetos.map((projeto, i) => (
                <Image
                  placeholder="blur"
                  blurDataURL={BLUR_ESCURO}
                  key={projeto.slug}
                  src={projeto.imagem}
                  alt=""
                  fill
                  sizes="320px"
                  className={`object-cover transition-opacity duration-500 ease-saida ${
                    ativo === i ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}

              {/* Repouso: sem nada sob o ponteiro, a moldura fica vazia
                  com o campo do espectro, em vez de piscar uma foto. */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  emDestaque ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                  backgroundImage:
                    'linear-gradient(150deg, rgba(109,74,255,0.30), rgba(0,212,200,0.12) 55%, rgba(20,18,30,1))',
                }}
              />
            </div>

            <p className="mt-4 min-h-[2.5rem] font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.16em] text-luz/45">
              {emDestaque ? emDestaque.cliente : 'passe o mouse na lista'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
