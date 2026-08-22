import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { socios } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'
import { Realce } from '@/components/fx/Realce'

/** Resumo dos dois sócios. As bios completas ficam em /estudio. */
export function Socios() {
  return (
    <section id="socios" className="relative section-y">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="prancha">Quem faz</p>
              <h2 className="t-h2 mt-5 font-display">Dois nomes na porta</h2>
            </div>
            <Link href="/#socios" className="btn-link">
              Conhecer o estúdio <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {socios.map((socio, i) => (
            <Reveal key={socio.id} delay={i * 0.08}>
              <Realce como="article" className="surface h-full p-8 md:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="t-h3 font-display">{socio.nome}</h3>
                    <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ciano">
                      {socio.papel}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-violeta"
                  />
                </div>

                <p className="mt-6 text-lg leading-relaxed text-luz/80">{socio.resumo}</p>
                <p className="mt-4 text-sm leading-relaxed text-luz/60">{socio.bio}</p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {socio.faz.slice(0, 4).map((item) => (
                    <li key={item} className="chip border-luz/15 text-luz/55">
                      {item}
                    </li>
                  ))}
                </ul>
              </Realce>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
