'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'

import { brand } from '@/lib/site'
import { projetos } from '@/lib/projetos'
import { ease } from '@/lib/design'
import { SplitWords } from '@/components/ui/SplitWords'

/**
 * O painel ao lado do título é a promessa do site em miniatura: um
 * bloco que sai do rascunho e vira interface. Cada camada entra numa
 * batida, e a última acende em clay.
 */
const camadas = [
  { rotulo: '01 rabisco', ms: 900 },
  { rotulo: '02 grade', ms: 1250 },
  { rotulo: '03 conteúdo', ms: 1600 },
  { rotulo: '04 no ar', ms: 1950 },
]

/**
 * Uma camada da miniatura. Entra por cima da anterior no tempo marcado,
 * então o bloco parece ganhar fidelidade em vez de trocar de conteúdo.
 * Em reduced-motion todas já nascem visíveis — o resultado final é o
 * mesmo, sem a encenação.
 */
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
      className="absolute inset-5"
      initial={reduzir ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, delay: ms / 1000, ease: ease.outExpo }}
    >
      {children}
    </motion.div>
  )
}

export function Hero() {
  const reduzir = useReducedMotion()

  // `100svh` (small viewport height) em vez de `vh`: no mobile o `vh`
  // conta a barra do navegador que some ao rolar, e o hero nascia mais
  // alto que a tela. O padding superior livra a navbar fixa; o inferior,
  // a dica de rolagem.
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-[clamp(2rem,5vh,4rem)] pt-20 md:pt-24">
      <div className="malha absolute inset-0 opacity-60" aria-hidden />
      <div
        className="halo-clay -left-32 top-16 h-[34rem] w-[34rem] animate-respirar md:left-[-10rem]"
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-carvao to-transparent"
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
            <span className="texto-clay block">
              <SplitWords texto="e entra no ar" delay={0.46} />
            </span>
          </h1>

          <motion.p
            className="t-lead measure mt-[clamp(1.25rem,3vh,2rem)] text-creme/65"
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
            <Link href="/contato" className="btn-primary">
              Começar um projeto <ArrowRight size={16} />
            </Link>
            <Link href="/projetos" className="btn-ghost">
              Ver os {projetos.length} projetos
            </Link>
          </motion.div>
        </div>

        {/* Coluna que se monta — a tese do site em miniatura */}
        <motion.div
          className="cotas relative hidden aspect-[4/3] overflow-hidden rounded-xl border border-linha bg-carvao/60 shadow-elev-2 lg:block"
          initial={reduzir ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: ease.outExpo }}
          aria-hidden
        >
          <div className="flex items-center gap-2 border-b border-linha/60 px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-creme/15" />
            <span className="h-2 w-2 rounded-full bg-creme/15" />
            <span className="h-2 w-2 rounded-full bg-clay/70" />
          </div>

          <div className="relative h-full p-5">
            {/* rabisco */}
            <Camada reduzir={reduzir} ms={camadas[0].ms}>
              <div className="flex h-full flex-col gap-2">
                <div className="rascunho h-8 rounded" />
                <div className="rascunho h-16 rounded" />
                <div className="grid flex-1 grid-cols-3 gap-2">
                  <div className="rascunho rounded" />
                  <div className="rascunho rounded" />
                  <div className="rascunho rounded" />
                </div>
              </div>
            </Camada>

            {/* conteúdo cinza */}
            <Camada reduzir={reduzir} ms={camadas[2].ms}>
              <div className="flex h-full flex-col gap-2">
                <div className="flex items-center justify-between rounded bg-grafite px-3 py-2">
                  <div className="rascunho-bloco h-2.5 w-16" />
                  <div className="flex gap-1.5">
                    <div className="rascunho-bloco h-2 w-7" />
                    <div className="rascunho-bloco h-2 w-7" />
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2 rounded bg-grafite px-3 py-3">
                  <div className="rascunho-bloco h-3 w-3/5" />
                  <div className="rascunho-bloco h-2 w-4/5" />
                </div>
                <div className="grid flex-1 grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="rounded bg-grafite p-2">
                      <div className="rascunho-bloco h-full" />
                    </div>
                  ))}
                </div>
              </div>
            </Camada>

            {/* no ar */}
            <Camada reduzir={reduzir} ms={camadas[3].ms}>
              <div className="flex h-full flex-col gap-2">
                <div className="flex items-center justify-between rounded bg-grafite px-3 py-2">
                  <span className="font-display text-[0.78rem] tracking-tight">Seu negócio</span>
                  <span className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-clay">
                    orçamento
                  </span>
                </div>
                <div className="relative flex flex-col justify-center overflow-hidden rounded bg-grafite px-4 py-4">
                  <div className="halo-clay -left-4 top-0 h-24 w-24" />
                  <p className="relative font-display text-base leading-tight tracking-tight">
                    Sua ideia,
                    <br />
                    <span className="texto-clay">no ar.</span>
                  </p>
                </div>
                <div className="grid flex-1 grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="rounded"
                      style={{
                        background: `linear-gradient(${140 + i * 40}deg, rgba(217,119,87,0.32), rgba(240,238,230,0.05))`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </Camada>

            {/* etiqueta do estágio, canto inferior */}
            <motion.span
              className="absolute bottom-3 right-4 font-mono text-[0.56rem] uppercase tracking-[0.2em] text-creme/30"
              initial={reduzir ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.3, duration: 0.5 }}
            >
              no ar
            </motion.span>
          </div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-8 hidden justify-center md:flex"
        initial={reduzir ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <span className="inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-creme/35">
          <ArrowDown size={13} /> role
        </span>
      </motion.div>
    </section>
  )
}
