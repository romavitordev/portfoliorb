'use client'

import { useEffect, useRef } from 'react'

import { stackFlat, stackNota } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Fita infinita com a stack.
 *
 * POR QUE NÃO É MAIS UMA ANIMAÇÃO CSS
 * Antes a fita usava `animation: marquee` e o hover aplicava
 * `animation-play-state: paused`. Esse estado não é transicionável: a
 * fita travava de estalo e voltava de estalo, o que num movimento
 * contínuo lê como engasgo.
 *
 * Agora um `requestAnimationFrame` desloca a fita e a velocidade é
 * interpolada até o alvo (1 andando, 0 parada). Ela DESACELERA até
 * parar e volta a acelerar ao sair — que é o que o olho espera de algo
 * com massa.
 *
 * A lista é duplicada e o deslocamento reinicia em -50%, então a emenda
 * é invisível.
 */
export function Stack() {
  const fita = [...stackFlat, ...stackFlat]
  const trilhoRef = useRef<HTMLDivElement>(null)
  const alvoRef = useRef(1)

  useEffect(() => {
    const trilho = trilhoRef.current
    if (!trilho) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const VELOCIDADE = 0.035 // % da largura por quadro, a 60fps
    const SUAVIDADE = 0.045 // quanto a velocidade se aproxima do alvo por quadro

    let x = 0
    let atual = 1
    let raf = 0

    const passo = () => {
      // Aproximação exponencial: rápida no começo, macia no fim.
      atual += (alvoRef.current - atual) * SUAVIDADE
      x -= VELOCIDADE * atual
      if (x <= -50) x += 50 // a emenda cai exatamente na cópia
      trilho.style.transform = `translate3d(${x}%, 0, 0)`
      raf = requestAnimationFrame(passo)
    }

    raf = requestAnimationFrame(passo)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className="relative section-y-tight overflow-hidden border-y border-linha bg-nevoa/20">
      <div className="container-page">
        <Reveal>
          <p className="kicker-poeira text-center">Ferramentas de trabalho</p>
        </Reveal>
      </div>

      {/*
        `aria-hidden` na fita: ela é decorativa e duplicada, então um
        leitor de tela anunciaria a stack inteira duas vezes. A lista
        legível fica na nota abaixo.
      */}
      <div
        className="relative mt-10 flex overflow-hidden"
        aria-hidden
        onMouseEnter={() => (alvoRef.current = 0)}
        onMouseLeave={() => (alvoRef.current = 1)}
      >
        <div ref={trilhoRef} className="flex w-max gap-4 will-change-transform">
          {fita.map((item, i) => (
            <span
              key={`${item.nome}-${i}`}
              className="group/chip inline-flex shrink-0 items-baseline gap-3 rounded-full border border-linha bg-nevoa px-6 py-3 transition-colors duration-300 hover:border-ciano/50"
            >
              <span className="font-display text-lg tracking-tight transition-colors duration-300 group-hover/chip:text-ciano">
                {item.nome}
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-luz/40">
                {item.nota}
              </span>
            </span>
          ))}
        </div>

        {/* Máscaras nas pontas, pra fita "entrar e sair" do nada */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-abismo to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-abismo to-transparent" />
      </div>

      <div className="container-page">
        <Reveal>
          <p className="measure mx-auto mt-10 text-center text-sm leading-relaxed text-luz/50">
            {stackNota}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
