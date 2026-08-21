import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

import { servicos, waLink, waMensagens } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Detalhe dos serviços — o que entra, prazo típico e para quem serve.
 *
 * Vivia em /servicos. Com o site numa página só, virou seção: é o
 * conteúdo que responde "quanto tempo" e "o que está incluso" antes da
 * pessoa perguntar, e some se ficar escondido atrás de um clique.
 */
export function ServicosDetalhe() {
  return (
    <section id="servicos" className="relative section-y">
      <div className="seam absolute inset-x-0 top-0" aria-hidden />

      <div className="container-page">
        <Reveal>
          <p className="prancha">Serviços</p>
          <h2 className="t-h2 mt-5 font-display">
            Seis frentes, <span className="texto-espectro">um escopo escrito</span>
          </h2>
          <p className="t-lead measure mt-6 text-luz/65">
            Cada serviço vem com o que está incluso, o prazo típico e para quem funciona. Se o
            seu caso não se encaixa em nenhum, é sinal de que vale conversar antes de orçar.
          </p>
        </Reveal>
      </div>

    <div className="container-page space-y-6">
      {servicos.map((servico, i) => (
        <Reveal key={servico.id} delay={i * 0.04}>
          <article
            id={servico.id}
            className="surface scroll-mt-28 p-8 md:p-12"
          >
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <span className="font-mono text-[0.7rem] tracking-[0.2em] text-ciano">
                  {servico.numero}
                </span>
                <h2 className="t-h2 mt-4 font-display">{servico.nome}</h2>
                <p className="mt-4 text-lg leading-relaxed text-luz/80">{servico.resumo}</p>
                <p className="mt-5 text-sm leading-relaxed text-luz/60">{servico.descricao}</p>

                <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                  <div>
                    <dt className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-luz/40">
                      Prazo típico
                    </dt>
                    <dd className="mt-1.5 text-sm text-luz/80">{servico.prazo}</dd>
                  </div>
                  <div className="max-w-xs">
                    <dt className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-luz/40">
                      Costuma servir a
                    </dt>
                    <dd className="mt-1.5 text-sm text-luz/80">{servico.paraQuem}</dd>
                  </div>
                </dl>

                <a
                  href={waLink(waMensagens.servico(servico.nome))}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-link mt-8"
                >
                  Falar sobre isso <ArrowRight size={15} />
                </a>
              </div>

              <div className="rounded-xl border border-linha bg-abismo/50 p-7">
                <p className="kicker-poeira">O que entra</p>
                <ul className="mt-5 space-y-3.5">
                  {servico.entrega.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-luz/70">
                      <Check
                        size={16}
                        strokeWidth={2}
                        className="mt-0.5 shrink-0 text-ciano"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>

    <div className="container-page mt-12">
      <Reveal>
        <p className="measure text-sm leading-relaxed text-luz/50">
          Não sabe qual serviço é o seu caso? Comece pelo{' '}
          <Link href="/#projetos" className="text-ciano underline underline-offset-4">
            catálogo de projetos
          </Link>{' '}
          — é mais fácil apontar para algo parecido do que descrever do zero.
        </p>
      </Reveal>
    </div>
    </section>
  )
}
