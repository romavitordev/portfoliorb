import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

import { brand, servicos, waLink, waMensagens } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'
import { Oficina } from '@/components/home/Oficina'
import { Manutencao } from '@/components/home/Manutencao'
import { Faq } from '@/components/home/Faq'
import { CtaFinal } from '@/components/home/CtaFinal'

export const metadata: Metadata = {
  title: 'Serviços',
  description:
    'Landing pages de conversão, sites e experiências, sistemas sob medida com painel administrativo, criação de startups, automações e modelagem 3D. Prazos e escopo claros.',
  alternates: { canonical: '/servicos' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Serviços — Roma & Buganza',
  itemListElement: servicos.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: s.nome,
      description: s.descricao,
      provider: { '@type': 'Organization', name: brand.nome, url: brand.url },
      url: `${brand.url}/servicos#${s.id}`,
    },
  })),
}

export default function ServicosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden pb-4 pt-32 md:pt-40">
        <div className="malha absolute inset-0 opacity-50" aria-hidden />
        <div className="halo-clay -right-24 top-0 h-[26rem] w-[26rem]" aria-hidden />

        <div className="container-page relative">
          <Reveal>
            <p className="prancha">Serviços</p>
            <h1 className="t-h1 mt-6 font-display">
              Seis frentes, <span className="texto-clay">um escopo escrito</span>
            </h1>
            <p className="t-lead measure mt-7 text-creme/65">
              Cada serviço abaixo vem com o que está incluso, o prazo típico e para quem funciona.
              Se o seu caso não se encaixa em nenhum, é sinal de que vale conversar antes de
              orçar.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page space-y-6">
          {servicos.map((servico, i) => (
            <Reveal key={servico.id} delay={i * 0.04}>
              <article
                id={servico.id}
                className="surface scroll-mt-28 p-8 md:p-12"
              >
                <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
                  <div>
                    <span className="font-mono text-[0.7rem] tracking-[0.2em] text-clay">
                      {servico.numero}
                    </span>
                    <h2 className="t-h2 mt-4 font-display">{servico.nome}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-creme/80">{servico.resumo}</p>
                    <p className="mt-5 text-sm leading-relaxed text-creme/60">{servico.descricao}</p>

                    <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                      <div>
                        <dt className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-creme/40">
                          Prazo típico
                        </dt>
                        <dd className="mt-1.5 text-sm text-creme/80">{servico.prazo}</dd>
                      </div>
                      <div className="max-w-xs">
                        <dt className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-creme/40">
                          Costuma servir a
                        </dt>
                        <dd className="mt-1.5 text-sm text-creme/80">{servico.paraQuem}</dd>
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

                  <div className="rounded-xl border border-linha bg-carvao/50 p-7">
                    <p className="kicker-poeira">O que entra</p>
                    <ul className="mt-5 space-y-3.5">
                      {servico.entrega.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-creme/70">
                          <Check
                            size={16}
                            strokeWidth={2}
                            className="mt-0.5 shrink-0 text-clay"
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
            <p className="measure text-sm leading-relaxed text-creme/50">
              Não sabe qual serviço é o seu caso? Comece pelo{' '}
              <Link href="/projetos" className="text-clay underline underline-offset-4">
                catálogo de projetos
              </Link>{' '}
              — é mais fácil apontar para algo parecido do que descrever do zero.
            </p>
          </Reveal>
        </div>
      </section>

      <Oficina />
      <Manutencao />
      <Faq />
      <CtaFinal />
    </>
  )
}
