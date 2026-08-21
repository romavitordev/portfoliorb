import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react'

import { brand, waLink, waMensagens } from '@/lib/site'
import {
  projetoPorSlug,
  projetos,
  rotulosCategoria,
  rotulosNatureza,
  vizinhos,
} from '@/lib/projetos'
import { CampoDeLuz } from '@/components/fx/CampoDeLuz'
import { Reveal } from '@/components/ui/Reveal'
import { BLUR_ESCURO } from '@/lib/blur'

type Params = { params: { slug: string } }

/** Uma rota estática por projeto do catálogo. */
export function generateStaticParams() {
  return projetos.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const projeto = projetoPorSlug(params.slug)
  if (!projeto) return { title: 'Projeto não encontrado' }

  return {
    title: projeto.nome,
    description: `${projeto.resumo}. ${projeto.intro}`,
    alternates: { canonical: `/projetos/${projeto.slug}` },
    openGraph: {
      type: 'article',
      title: `${projeto.nome} — ${brand.nome}`,
      description: projeto.resumo,
      images: [{ url: projeto.imagem, width: 1200, height: 630, alt: projeto.imagemAlt }],
    },
  }
}

export default function ProjetoPage({ params }: Params) {
  const projeto = projetoPorSlug(params.slug)
  if (!projeto) notFound()

  const { anterior, proximo } = vizinhos(projeto.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: projeto.nome,
    description: projeto.resumo,
    url: `${brand.url}/projetos/${projeto.slug}`,
    image: projeto.imagem,
    dateCreated: String(projeto.ano),
    creator: { '@type': 'Organization', name: brand.nome, url: brand.url },
    keywords: projeto.stack.join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Cabeçalho ------------------------------------------------- */}
      <section className="relative overflow-hidden pt-28 md:pt-36">
        <CampoDeLuz variante="topo-esquerda" forca="discreta" />

        <div className="container-page relative">
          <Link href="/#projetos" className="btn-link">
            <ArrowLeft size={15} /> Todos os projetos
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="chip border-violeta/50 text-ciano">
              {rotulosCategoria[projeto.categoria]}
            </span>
            <span className="chip border-luz/20 text-luz/55">
              {rotulosNatureza[projeto.natureza]}
            </span>
            <span className="chip border-luz/20 text-luz/55">{projeto.ano}</span>
          </div>

          <h1 className="t-h1 mt-6 font-display">{projeto.nome}</h1>
          <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-luz/45">
            {projeto.cliente}
          </p>
          <p className="t-lead measure mt-8 text-luz/70">{projeto.intro}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            {projeto.demo && (
              <a
                href={projeto.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-primary"
              >
                Ver no ar <ExternalLink size={15} />
              </a>
            )}
            {projeto.repo && (
              <a
                href={projeto.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost"
              >
                <Github size={16} /> Código
              </a>
            )}
            <a
              href={waLink(waMensagens.projeto(projeto.nome))}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost"
            >
              Quero algo assim
            </a>
          </div>
        </div>
      </section>

      {/* Imagem ---------------------------------------------------- */}
      <section className="section-y-tight">
        <div className="container-wide">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-linha">
              <Image
                placeholder="blur"
                blurDataURL={BLUR_ESCURO}
                src={projeto.imagem}
                alt={projeto.imagemAlt}
                fill
                sizes="(max-width: 1280px) 100vw, 80rem"
                priority
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-abismo/70 via-transparent to-transparent"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Desafio & solução ----------------------------------------- */}
      <section className="section-y-tight">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="prancha">O desafio</p>
            <p className="t-lead mt-5 leading-relaxed text-luz/70">{projeto.desafio}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="prancha">A solução</p>
            <p className="t-lead mt-5 leading-relaxed text-luz/70">{projeto.solucao}</p>
          </Reveal>
        </div>
      </section>

      {/* Resultados ------------------------------------------------ */}
      {projeto.resultados && (
        <section className="relative section-y-tight bg-nevoa/30">
          <div className="seam absolute inset-x-0 top-0" aria-hidden />
          <div className="container-page">
            <Reveal>
              <p className="prancha">Detalhes que importam</p>
            </Reveal>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {projeto.resultados.map((r, i) => (
                <Reveal key={r} delay={i * 0.06}>
                  <li className="flex gap-4 border-l-2 border-violeta/50 pl-5">
                    <p className="text-sm leading-relaxed text-luz/70">{r}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Destaques ------------------------------------------------- */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <p className="prancha">O que tem dentro</p>
            <h2 className="t-h2 mt-5 font-display">Funcionalidades</h2>
          </Reveal>

          <div className="grade-moldura grade-moldura-2 mt-12 md:grid-cols-2">
            {projeto.destaques.map((d, i) => (
              <Reveal key={d.titulo} className="h-full" delay={i * 0.05}>
                <div className="celula">
                  <span aria-hidden className="celula-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="relative font-mono text-[0.66rem] tracking-[0.2em] text-ciano">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="relative mt-4 font-display text-xl tracking-tight">{d.titulo}</h3>
                  <p className="relative mt-3 measure text-sm leading-relaxed text-luz/60">
                    {d.texto}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ficha técnica --------------------------------------------- */}
      <section className="relative section-y-tight bg-nevoa/30">
        <div className="seam absolute inset-x-0 top-0" aria-hidden />
        <div className="container-page grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="prancha">Stack</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {projeto.stack.map((t) => (
                <li key={t} className="chip border-luz/20 text-luz/70">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="prancha">Nosso papel</p>
            <ul className="mt-6 space-y-2.5">
              {projeto.papel.map((p) => (
                <li key={p} className="flex items-baseline gap-3 text-sm text-luz/70">
                  <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-violeta" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Navegação entre cases -------------------------------------- */}
      <nav className="container-page section-y-tight" aria-label="Outros projetos">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-linha bg-linha sm:grid-cols-2">
          {anterior && (
            <Link
              href={`/projetos/${anterior.slug}`}
              className="group bg-nevoa p-8 transition-colors duration-500 hover:bg-nevoa/55"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.2em] text-luz/40">
                <ArrowLeft size={13} /> Anterior
              </span>
              <p className="mt-3 font-display text-xl tracking-tight transition-colors group-hover:text-ciano">
                {anterior.nome}
              </p>
            </Link>
          )}

          {proximo && (
            <Link
              href={`/projetos/${proximo.slug}`}
              className="group bg-nevoa p-8 text-right transition-colors duration-500 hover:bg-nevoa/55"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.2em] text-luz/40">
                Próximo <ArrowRight size={13} />
              </span>
              <p className="mt-3 font-display text-xl tracking-tight transition-colors group-hover:text-ciano">
                {proximo.nome}
              </p>
            </Link>
          )}
        </div>
      </nav>
    </>
  )
}
