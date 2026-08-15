import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { servicos } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'

/** Índice dos serviços — a lista completa e detalhada vive em /servicos. */
export function ServicosResumo() {
  return (
    <section id="servicos" className="relative section-y bg-nevoa/30">
      <div className="seam absolute inset-x-0 top-0" aria-hidden />

      <div className="container-page">
        <Reveal>
          <p className="prancha">O que fazemos</p>
          <h2 className="t-h2 measure mt-5 font-display">
            Do site de uma página ao sistema com banco de dados
          </h2>
        </Reveal>

        <ul className="mt-14 border-t border-linha">
          {servicos.map((servico, i) => (
            <li key={servico.id}>
              <Reveal delay={i * 0.04}>
                <Link
                  href={`/servicos#${servico.id}`}
                  /*
                    Padding lateral pro conteúdo não encostar na borda
                    quando o hover pinta o fundo. As linhas divisórias
                    continuam na largura da página; o texto é que recua.
                  */
                  className="group grid items-baseline gap-x-8 gap-y-3 border-b border-linha px-5 py-8 transition-colors duration-500 hover:bg-nevoa/60 md:grid-cols-[4rem_1fr_1.1fr_2rem] md:px-7 md:py-9"
                >
                  <span className="font-mono text-[0.7rem] tracking-[0.2em] text-ciano">
                    {servico.numero}
                  </span>

                  <h3 className="t-h3 font-display transition-colors duration-300 group-hover:text-ciano">
                    {servico.nome}
                  </h3>

                  <p className="text-sm leading-relaxed text-luz/60">{servico.resumo}</p>

                  <span
                    aria-hidden
                    className="hidden justify-self-end text-luz/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ciano md:block"
                  >
                    <ArrowRight size={19} strokeWidth={1.6} />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
