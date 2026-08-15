'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'

import { brand } from '@/lib/site'
import { projetos } from '@/lib/projetos'
import { ease } from '@/lib/design'
import { SplitWords } from '@/components/ui/SplitWords'

/** Linhas do "arquivo" que roda ao lado do título — assinatura de estúdio de código. */
const linhas = [
  { texto: 'const estudio = {', cor: 'text-creme/45' },
  { texto: "  socios: ['Vitor Roma', 'Marcelo Buganza'],", cor: 'text-creme/80' },
  { texto: "  faz: ['sites', 'sistemas', 'produtos'],", cor: 'text-creme/80' },
  { texto: '  base: "Sorocaba/SP",', cor: 'text-creme/80' },
  { texto: '  aceitandoProjetos: true,', cor: 'text-clay' },
  { texto: '}', cor: 'text-creme/45' },
]

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

        {/* Coluna do "arquivo" */}
        <motion.div
          className="surface hidden overflow-hidden lg:block"
          initial={reduzir ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: ease.outExpo }}
          aria-hidden
        >
          <div className="flex items-center gap-2 border-b border-linha px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-creme/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-creme/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-clay/70" />
            <span className="ml-3 font-mono text-[0.66rem] tracking-wide text-creme/40">
              estudio.ts
            </span>
          </div>

          <pre className="overflow-x-auto px-5 py-6 font-mono text-[0.78rem] leading-[1.9]">
            {linhas.map((linha, i) => (
              <motion.div
                key={linha.texto}
                className={linha.cor}
                initial={reduzir ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.09, ease: ease.outExpo }}
              >
                {linha.texto}
                {i === linhas.length - 1 && (
                  <span className="ml-1 inline-block h-4 w-[7px] translate-y-0.5 animate-caret bg-clay" />
                )}
              </motion.div>
            ))}
          </pre>
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
