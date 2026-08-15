import { ArrowRight } from 'lucide-react'

import { manifesto } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'

/**
 * "Por que a gente" — os combinados do estúdio.
 *
 * Duas versões anteriores não funcionaram, e o motivo só ficou claro
 * relendo o CONTEÚDO: todos os seis pontos já são um contraste contra a
 * praxe do mercado. Está escrito neles — "não temos tabela fixa", "sem
 * refém de plataforma", "não são extra", "nem cobrança de três
 * fornecedores".
 *
 * As duas versões anteriores trataram isso como seis blocos de texto
 * iguais, o que jogava fora a retórica que já existia e deixava a seção
 * monótona. Agora o contraste é o próprio desenho: o jeito comum à
 * esquerda, apagado, e a seta do espectro apontando pro que muda aqui.
 *
 * A cor de cada item caminha pela escala (violeta → lima), a mesma dos
 * estágios da Oficina e das barras do gráfico. Era a única seção da home
 * que não usava o sistema de cor do site.
 */

/** A escala em seis passos — mesma progressão do resto do site. */
const cores = [
  'text-violeta',
  'text-violeta',
  'text-azul',
  'text-azul',
  'text-ciano',
  'text-lima',
]

export function Manifesto() {
  return (
    <section id="manifesto" className="relative section-y">
      <div className="container-page">
        <Reveal>
          <p className="prancha">Por que a gente</p>
          <div className="mt-5 grid gap-x-16 gap-y-6 lg:grid-cols-[1fr_1fr]">
            <h2 className="t-h2 font-display">{manifesto.titulo}</h2>
            <p className="t-lead mt-1 text-luz/60">{manifesto.texto}</p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-x-16 md:grid-cols-2">
          {manifesto.pontos.map((ponto, i) => (
            <Reveal key={ponto.titulo} delay={i * 0.05}>
              <article className="border-t border-linha py-7">
                {/* A troca: o jeito comum, a seta, o nosso */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {/*
                    `luz/50` e não algo mais apagado: esse texto CARREGA
                    significado (é metade do contraste), então precisa
                    passar de 4.5:1. A 30% dava 2.5:1 e sumia — o riscado
                    já basta pra marcar que é o lado descartado.
                  */}
                  <span className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-luz/50 line-through decoration-luz/40">
                    {ponto.comum}
                  </span>
                  <ArrowRight
                    size={13}
                    aria-hidden
                    className={`shrink-0 ${cores[i % cores.length]}`}
                  />
                </div>

                <h3 className="mt-2 flex items-baseline gap-3 font-display text-xl leading-snug tracking-tight">
                  <span
                    aria-hidden
                    className={`font-mono text-[0.62rem] tracking-[0.2em] ${cores[i % cores.length]}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {ponto.titulo}
                </h3>

                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-luz/60">{ponto.texto}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
