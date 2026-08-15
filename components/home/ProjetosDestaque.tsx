import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { projetos, projetosDestaque, rotulosCategoria } from '@/lib/projetos'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Vitrine da home.
 *
 * Antes: um card gigante em largura total mais uma grade embaixo, o que
 * fazia a seção sozinha ocupar mais de uma tela e repetir o trabalho da
 * página /projetos.
 *
 * Agora são três destaques numa faixa só, com a imagem enquadrada em
 * 4:3 e o texto abaixo. A home dá o gostinho; o índice completo mora em
 * /projetos, e o link no cabeçalho leva pra lá.
 *
 * Três e não cinco de propósito: cabe numa linha em qualquer desktop,
 * sem sobra órfã na segunda fileira.
 */
export function ProjetosDestaque() {
  const destaques = projetosDestaque.slice(0, 3)

  return (
    <section id="projetos" className="relative section-y">
      <div className="seam absolute inset-x-0 top-0" aria-hidden />

      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="prancha">Catálogo</p>
              <h2 className="t-h2 mt-5 font-display">O que já construímos</h2>
              <p className="t-lead measure mt-6 text-luz/65">
                Sistemas de cliente no ar, produtos próprios em construção e projetos conceituais
                onde a gente solta a mão.
              </p>
            </div>

            <Link href="/projetos" className="btn-link shrink-0">
              Ver os {projetos.length} projetos <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((projeto, i) => (
            <Reveal key={projeto.slug} delay={i * 0.06}>
              <Link href={`/projetos/${projeto.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-linha">
                  {/* Campo do espectro atrás: aparece quando a foto recua */}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'linear-gradient(150deg, rgba(109,74,255,0.35), rgba(0,212,200,0.16) 55%, rgba(20,18,30,1))',
                    }}
                  />
                  <Image
                    src={projeto.imagem}
                    alt={projeto.imagemAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={i === 0}
                    className="object-cover transition-all duration-700 ease-saida group-hover:scale-[1.03] group-hover:opacity-75"
                  />
                </div>

                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl leading-tight tracking-tight transition-colors duration-300 group-hover:text-ciano">
                      {projeto.nome}
                    </h3>
                    <p className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-luz/40">
                      <span className="text-ciano/70">{rotulosCategoria[projeto.categoria]}</span>
                      <span aria-hidden className="mx-2 text-luz/20">
                        /
                      </span>
                      {projeto.ano}
                    </p>
                  </div>

                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-luz/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-ciano"
                  >
                    <ArrowUpRight size={17} strokeWidth={1.6} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
