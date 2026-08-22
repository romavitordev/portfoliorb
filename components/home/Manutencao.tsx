import { Check, X } from 'lucide-react'

import { manutencao, waLink, waMensagens } from '@/lib/site'
import { CampoDeLuz } from '@/components/fx/CampoDeLuz'
import { Reveal } from '@/components/ui/Reveal'
import { Realce } from '@/components/fx/Realce'

/**
 * Plano mensal. Opcional de verdade — e por isso o comparativo
 * "sem plano / com plano" faz o trabalho de convencer, em vez de
 * fingir que é obrigatório.
 */
export function Manutencao() {
  return (
    <section id="plano-mensal" className="relative section-y bg-nevoa/30">
      <div className="seam absolute inset-x-0 top-0" aria-hidden />
      <CampoDeLuz forca="discreta" variante="topo-direita" />

      <div className="container-page relative">
        <Reveal>
          <p className="prancha">{manutencao.kicker}</p>
          <h2 className="t-h2 measure mt-5 font-display">{manutencao.titulo}</h2>
          <p className="t-lead measure mt-7 text-luz/65">{manutencao.texto}</p>
        </Reveal>

        {/* Comparativo ------------------------------------------------ */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-linha bg-abismo/40 p-8">
              <p className="label-mono text-luz/40">Sem plano</p>
              <ul className="mt-6 space-y-4">
                {manutencao.semPlano.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-luz/55">
                    <X size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-luz/30" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface h-full border-violeta/30 p-8 shadow-violeta">
              <p className="label-mono text-ciano">Com plano mensal</p>
              <ul className="mt-6 space-y-4">
                {manutencao.comPlano.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-luz/80">
                    <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-ciano" aria-hidden />
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
              <Realce como="div" className="celula">
                <span aria-hidden className="celula-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="relative font-display text-xl tracking-tight">{item.titulo}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-luz/60">{item.texto}</p>
              </Realce>
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
              <Realce como="article" className="surface h-full p-8">
                <h3 className="t-h3 font-display">{nivel.nome}</h3>
                <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ciano">
                  {nivel.para}
                </p>
                <ul className="mt-6 space-y-3">
                  {nivel.itens.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-luz/70">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violeta" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Realce>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col gap-6 border-t border-linha pt-9 sm:flex-row sm:items-center sm:justify-between">
            <p className="measure text-sm leading-relaxed text-luz/55">{manutencao.argumento}</p>
            <a
              href={waLink(waMensagens.servico('o plano mensal de manutenção'))}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary shrink-0"
            >
              Falar sobre o plano
            </a>
          </div>
          <p className="mt-6 text-[0.78rem] leading-relaxed text-luz/40">{manutencao.nota}</p>
        </Reveal>
      </div>
    </section>
  )
}
