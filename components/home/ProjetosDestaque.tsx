import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { projetos, projetosDestaque } from '@/lib/projetos'
import { Reveal } from '@/components/ui/Reveal'
import { ProjetoCard } from '@/components/projetos/ProjetoCard'

/**
 * Vitrine da home: o primeiro destaque ocupa a largura toda, os demais
 * entram na grade. A lista completa vive em /projetos.
 */
export function ProjetosDestaque() {
  const [primeiro, ...resto] = projetosDestaque

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
                onde a gente solta a mão. Cada card diz qual é qual.
              </p>
            </div>

            <Link href="/projetos" className="btn-link">
              Ver os {projetos.length} projetos <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {primeiro && (
            <Reveal className="md:col-span-2">
              <ProjetoCard projeto={primeiro} grande prioridade />
            </Reveal>
          )}

          {resto.map((projeto, i) => (
            <Reveal key={projeto.slug} delay={0.06 * (i + 1)}>
              <ProjetoCard projeto={projeto} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
