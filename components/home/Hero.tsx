'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Search, TrendingUp } from 'lucide-react'

import { brand } from '@/lib/site'
import { projetos } from '@/lib/projetos'
import { ease } from '@/lib/design'
import { CampoDeLuz } from '@/components/fx/CampoDeLuz'
import { SplitWords } from '@/components/ui/SplitWords'
import { Magnetico } from '@/components/fx/Magnetico'
import { Inclinar } from '@/components/fx/Inclinar'

/**
 * A miniatura ao lado do título é a tese do site em pequeno: um bloco
 * que sai do rascunho e vira PRODUTO.
 *
 * A versão anterior mostrava retângulos cinzas, e retângulo cinza não
 * convence ninguém — parece placeholder de template. Aqui a última
 * camada é uma interface de verdade, com nome de produto, preço, métrica
 * e um gráfico cujas barras percorrem o espectro. Um mock só funciona
 * quando parece uma tela que alguém usaria.
 */
const produtos = [
  { nome: 'Pastilha de freio', preco: 'R$ 189', estoque: 12, selo: '-15%' },
  { nome: 'Amortecedor', preco: 'R$ 340', estoque: 4, selo: null },
  { nome: 'Correia dentada', preco: 'R$ 96', estoque: 27, selo: null },
]

/** As barras usam a escala inteira: o gráfico É a evolução. */
const barras = [
  { h: '34%', cor: 'bg-violeta' },
  { h: '48%', cor: 'bg-violeta' },
  { h: '42%', cor: 'bg-azul' },
  { h: '66%', cor: 'bg-azul' },
  { h: '80%', cor: 'bg-ciano' },
  { h: '100%', cor: 'bg-lima' },
]

function Camada({
  children,
  ms,
  reduzir,
}: {
  children: React.ReactNode
  ms: number
  reduzir: boolean | null
}) {
  return (
    <motion.div
      className="absolute inset-4"
      initial={reduzir ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: ms / 1000, ease: ease.outExpo }}
    >
      {children}
    </motion.div>
  )
}

export function Hero() {
  const reduzir = useReducedMotion()

  // `100svh` em vez de `vh`: no mobile o `vh` conta a barra do navegador
  // que some ao rolar, e o hero nascia mais alto que a tela.
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-[clamp(2rem,5vh,4rem)] pt-20 md:pt-24">
      <CampoDeLuz forca="cheia" variante="topo-esquerda" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-abismo to-transparent"
      />

      <div className="container-page relative grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        {/* Coluna do título */}
        <div>
          <motion.p
            className="kicker"
            initial={reduzir ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: ease.outExpo }}
          >
            {brand.sufixo} · desde {brand.fundacao}
          </motion.p>

          <h1 className="t-display mt-[clamp(1rem,2.5vh,1.5rem)] font-display">
            <span className="block">
              <SplitWords texto="Software que sai" delay={0.12} />
            </span>
            <span className="block">
              <SplitWords texto="do ar de ideia" delay={0.3} />
            </span>
            <span className="texto-espectro block">
              <SplitWords texto="e entra no ar" delay={0.46} />
            </span>
          </h1>

          <motion.p
            className="t-lead measure mt-[clamp(1.25rem,3vh,2rem)] text-luz/65"
            initial={reduzir ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: ease.outExpo }}
          >
            {brand.promessa}
          </motion.p>

          <motion.div
            className="mt-[clamp(1.5rem,4vh,2.5rem)] flex flex-wrap items-center gap-3"
            initial={reduzir ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72, ease: ease.outExpo }}
          >
            <Magnetico>
              <Link href="/#contato" className="btn-primary">
                Começar um projeto <ArrowRight size={16} />
              </Link>
            </Magnetico>
            <Magnetico>
              <Link href="/#projetos" className="btn-ghost">
                Ver os {projetos.length} projetos
              </Link>
            </Magnetico>
          </motion.div>
        </div>

        {/* A miniatura que se monta — e que reage ao cursor */}
        <Inclinar className="hidden lg:block">
        <motion.div
          className="cotas relative aspect-[4/3] overflow-hidden rounded-2xl border border-linha bg-nevoa/80 shadow-elev-2 backdrop-blur-sm"
          initial={reduzir ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: ease.outExpo }}
          aria-hidden
        >
          <div className="relative h-full">
            {/* 01 — rascunho */}
            <Camada reduzir={reduzir} ms={800}>
              <div className="flex h-full flex-col gap-2.5">
                <div className="rascunho h-9 rounded-lg" />
                <div className="rascunho h-[4.5rem] rounded-lg" />
                <div className="grid flex-1 grid-cols-3 gap-2.5">
                  <div className="rascunho rounded-lg" />
                  <div className="rascunho rounded-lg" />
                  <div className="rascunho rounded-lg" />
                </div>
              </div>
            </Camada>

            {/* 02 — estrutura ganha corpo */}
            <Camada reduzir={reduzir} ms={1350}>
              <div className="flex h-full flex-col gap-2.5">
                <div className="flex items-center justify-between rounded-lg bg-abismo/70 px-3 py-2.5">
                  <div className="rascunho-bloco h-2.5 w-20" />
                  <div className="rascunho-bloco h-2.5 w-14" />
                </div>
                <div className="flex flex-col justify-center gap-2 rounded-lg bg-abismo/70 px-3 py-4">
                  <div className="rascunho-bloco h-3 w-2/5" />
                  <div className="rascunho-bloco h-2 w-3/5" />
                </div>
                <div className="grid flex-1 grid-cols-3 gap-2.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="rounded-lg bg-abismo/70 p-2">
                      <div className="rascunho-bloco h-full" />
                    </div>
                  ))}
                </div>
              </div>
            </Camada>

            {/* 03 — no ar: produto de verdade */}
            <Camada reduzir={reduzir} ms={1900}>
              <div className="flex h-full flex-col gap-2.5">
                {/* barra de navegação */}
                <div className="flex items-center justify-between rounded-lg bg-abismo/80 px-3 py-2.5">
                  <span className="font-display text-[0.82rem] tracking-tight text-luz">
                    Peças Menezes
                  </span>
                  <span className="flex items-center gap-2.5">
                    <Search size={11} className="text-luz/40" />
                    <span className="rounded-full bg-violeta px-2.5 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.1em] text-luz">
                      Orçamento
                    </span>
                  </span>
                </div>

                {/* métrica + gráfico */}
                <div className="flex items-end justify-between gap-3 rounded-lg bg-abismo/80 px-3 py-3">
                  <span>
                    <span className="flex items-center gap-1.5 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-luz/45">
                      <TrendingUp size={9} className="text-lima" /> pedidos no mês
                    </span>
                    <span className="mt-1 block font-display text-2xl leading-none text-lima">
                      +38%
                    </span>
                  </span>

                  <span className="flex h-9 flex-1 items-end gap-[3px]">
                    {barras.map((b, i) => (
                      <span
                        key={i}
                        className={`flex-1 rounded-[2px] ${b.cor}`}
                        style={{ height: b.h }}
                      />
                    ))}
                  </span>
                </div>

                {/*
                  Catálogo. Antes cada card era um retângulo com degradê e
                  duas palavras no rodapé — voltava a parecer placeholder.
                  Agora carrega o que um card de loja carrega de verdade:
                  selo na foto, nome, preço, estoque e o botão de somar ao
                  carrinho. Densidade é o que faz um mock parecer usável.
                */}
                <div className="grid flex-1 grid-cols-3 gap-2.5">
                  {produtos.map((p, i) => (
                    <div
                      key={p.nome}
                      className="flex flex-col overflow-hidden rounded-lg bg-abismo/80"
                    >
                      {/* área da foto */}
                      <div
                        className="relative flex-1"
                        style={{
                          backgroundImage: `linear-gradient(${160 + i * 30}deg, rgba(109,74,255,0.32), rgba(0,212,200,0.14) 60%, rgba(11,10,18,0.9))`,
                        }}
                      >
                        {p.selo && (
                          <span className="absolute left-1.5 top-1.5 rounded bg-lima px-1 py-px font-mono text-[0.42rem] font-bold tracking-wide text-abismo">
                            {p.selo}
                          </span>
                        )}
                      </div>

                      {/* informação */}
                      <div className="space-y-1 p-1.5">
                        <span className="block truncate text-[0.55rem] leading-tight text-luz/80">
                          {p.nome}
                        </span>
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[0.58rem] font-semibold text-luz">
                            {p.preco}
                          </span>
                          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-violeta font-mono text-[0.5rem] leading-none text-luz">
                            +
                          </span>
                        </div>
                        <span className="flex items-center gap-1 font-mono text-[0.42rem] uppercase tracking-wide text-luz/40">
                          <span className="h-1 w-1 rounded-full bg-lima" />
                          {p.estoque} em estoque
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Camada>
          </div>
        </motion.div>
        </Inclinar>
      </div>

    </section>
  )
}
