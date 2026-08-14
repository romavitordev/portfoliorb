import type { Metadata } from 'next'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

import { brand, imagens, manifesto, socios, stack } from '@/lib/site'
import { projetos } from '@/lib/projetos'
import { Reveal } from '@/components/ui/Reveal'
import { Numeros } from '@/components/home/Numeros'
import { CtaFinal } from '@/components/home/CtaFinal'

export const metadata: Metadata = {
  title: 'Estúdio',
  description:
    'Roma & Buganza é um estúdio de desenvolvimento de dois sócios em Sorocaba/SP: Vitor Roma no código e no produto, Marcelo Buganza no negócio e no 3D.',
  alternates: { canonical: '/estudio' },
}

export default function EstudioPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-4 pt-32 md:pt-40">
        <div className="malha absolute inset-0 opacity-50" aria-hidden />
        <div className="halo-clay -left-20 top-4 h-[26rem] w-[26rem]" aria-hidden />

        <div className="container-page relative">
          <Reveal>
            <p className="kicker">O estúdio</p>
            <h1 className="t-h1 mt-6 font-display">
              Duas pessoas, <span className="texto-clay">{projetos.length} projetos</span> e nenhuma
              camada de gerência
            </h1>
            <p className="t-lead measure mt-7 text-creme/65">{manifesto.texto}</p>
          </Reveal>
        </div>
      </section>

      {/* Foto do estúdio ------------------------------------------- */}
      <section className="section-y-tight">
        <div className="container-wide">
          <Reveal>
            <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-linha">
              {/* PLACEHOLDER — troque por uma foto real de vocês dois. */}
              <Image
                src={imagens.estudio.src}
                alt={imagens.estudio.alt}
                fill
                sizes="(max-width: 1280px) 100vw, 80rem"
                priority
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-carvao via-carvao/25 to-transparent"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sócios ---------------------------------------------------- */}
      <section className="section-y">
        <div className="container-page space-y-6">
          {socios.map((socio, i) => (
            <Reveal key={socio.id} delay={i * 0.06}>
              <article className="surface grid gap-10 p-8 md:p-12 lg:grid-cols-[1fr_1fr]">
                <div>
                  <h2 className="t-h2 font-display">{socio.nome}</h2>
                  <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-clay">
                    {socio.papel}
                  </p>
                  <p className="mt-7 text-lg leading-relaxed text-creme/80">{socio.resumo}</p>
                  <p className="mt-4 text-sm leading-relaxed text-creme/60">{socio.bio}</p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {socio.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="btn-ghost !px-5 !py-2.5 text-[0.78rem]"
                      >
                        {link.label} <ExternalLink size={14} />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-linha bg-carvao/50 p-7">
                  <p className="kicker-poeira">No dia a dia</p>
                  <ul className="mt-5 space-y-3.5">
                    {socio.faz.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-creme/70">
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Numeros />

      {/* Princípios ------------------------------------------------- */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <p className="kicker">Como trabalhamos</p>
            <h2 className="t-h2 measure mt-5 font-display">Quatro combinados que a gente cumpre</h2>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-linha bg-linha md:grid-cols-2">
            {manifesto.pontos.map((ponto, i) => (
              <Reveal key={ponto.titulo} delay={i * 0.05}>
                <div className="h-full bg-grafite p-8 md:p-10">
                  <span className="font-mono text-[0.66rem] tracking-[0.2em] text-clay">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-2xl tracking-tight">{ponto.titulo}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-creme/60">{ponto.texto}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stack completa --------------------------------------------- */}
      <section className="relative section-y-tight bg-grafite/30">
        <div className="seam absolute inset-x-0 top-0" aria-hidden />
        <div className="container-page">
          <Reveal>
            <p className="kicker">Stack</p>
            <h2 className="t-h3 mt-5 font-display">O que roda debaixo do capô</h2>
          </Reveal>

          <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((item, i) => (
              <Reveal key={item.nome} delay={i * 0.03}>
                <div className="border-l border-linha pl-5">
                  <dt className="font-display text-lg tracking-tight">{item.nome}</dt>
                  <dd className="mt-1 text-sm text-creme/55">{item.nota}</dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal>
            <p className="mt-12 text-sm text-creme/45">
              Todo o código do estúdio é público em{' '}
              <a
                href={brand.github}
                target="_blank"
                rel="noreferrer noopener"
                className="text-clay underline underline-offset-4"
              >
                github.com/romavitordev
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CtaFinal />
    </>
  )
}
