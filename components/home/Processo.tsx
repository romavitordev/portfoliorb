import { processo } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'

export function Processo() {
  return (
    <section id="processo" className="relative section-y">
      <div className="container-page">
        <Reveal>
          <p className="kicker">Como funciona</p>
          <h2 className="t-h2 measure mt-5 font-display">Seis passos, nenhuma surpresa no fim</h2>
          <p className="t-lead measure mt-6 text-luz/65">
            Você sabe o que vem a seguir em cada etapa — e vê o projeto crescendo, em vez de esperar
            uma entrega às cegas.
          </p>
        </Reveal>

        <ol className="grade-moldura grade-moldura-2 grade-moldura-3 mt-16 md:grid-cols-2 lg:grid-cols-3">
          {processo.map((etapa, i) => (
            <li key={etapa.numero} className="h-full">
              <Reveal className="h-full" delay={i * 0.05}>
                <div className="celula">
                  <span aria-hidden className="celula-num">
                    {etapa.numero}
                  </span>

                  <p className="relative font-mono text-[0.66rem] uppercase tracking-[0.2em] text-ciano">
                    {etapa.duracao}
                  </p>
                  <h3 className="relative mt-4 font-display text-2xl tracking-tight">
                    {etapa.titulo}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-luz/60">
                    {etapa.texto}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
