import { Check, X } from 'lucide-react'

import { manutencao, waLink, waMensagens } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Plano mensal. Opcional de verdade — e por isso o comparativo
 * "sem plano / com plano" faz o trabalho de convencer, em vez de
 * fingir que é obrigatório.
 */
export function Manutencao() {
  return (
    <section id="plano-mensal" className="relative section-y bg-grafite/30">
      <div className="seam absolute inset-x-0 top-0" aria-hidden />
      <div className="halo-clay -right-32 top-24 h-[26rem] w-[26rem]" aria-hidden />

      <div className="container-page relative">
        <Reveal>
          <p className="kicker">{manutencao.kicker}</p>
          <h2 className="t-h2 measure mt-5 font-display">{manutencao.titulo}</h2>
          <p className="t-lead measure mt-7 text-creme/65">{manutencao.texto}</p>
        </Reveal>

        {/* Comparativo ------------------------------------------------ */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-linha bg-carvao/40 p-8">
              <p className="label-mono text-creme/40">Sem plano</p>
              <ul className="mt-6 space-y-4">
                {manutencao.semPlano.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-creme/55">
                    <X size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-creme/30" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface h-full border-clay/30 p-8 shadow-clay">
              <p className="label-mono text-clay">Com plano mensal</p>
              <ul className="mt-6 space-y-4">
                {manutencao.comPlano.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-creme/80">
                    <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-clay" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* O que inclui ----------------------------------------------- */}
        <Reveal>
          <p className="kicker-poeira mt-20">O que está incluso</p>
        </Reveal>

        <div className="grade-moldura grade-moldura-2 grade-moldura-3 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {manutencao.inclui.map((item, i) => (
            <Reveal key={item.titulo} className="h-full" delay={i * 0.05}>
              <div className="celula">
                <span aria-hidden className="celula-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="relative font-display text-xl tracking-tight">{item.titulo}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-creme/60">{item.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Níveis ------------------------------------------------------ */}
        <Reveal>
          <p className="kicker-poeira mt-20">Três níveis</p>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {manutencao.niveis.map((nivel, i) => (
            <Reveal key={nivel.nome} delay={i * 0.07}>
              <article className="surface h-full p-8">
                <h3 className="t-h3 font-display">{nivel.nome}</h3>
                <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-clay">
                  {nivel.para}
                </p>
                <ul className="mt-6 space-y-3">
                  {nivel.itens.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-creme/70">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col gap-6 border-t border-linha pt-9 sm:flex-row sm:items-center sm:justify-between">
            <p className="measure text-sm leading-relaxed text-creme/55">{manutencao.argumento}</p>
            <a
              href={waLink(waMensagens.servico('o plano mensal de manutenção'))}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary shrink-0"
            >
              Falar sobre o plano
            </a>
          </div>
          <p className="mt-6 text-[0.78rem] leading-relaxed text-creme/40">{manutencao.nota}</p>
        </Reveal>
      </div>
    </section>
  )
}
