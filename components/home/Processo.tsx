import { processo } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'

export function Processo() {
  return (
    <section id="processo" className="relative section-y">
      <div className="container-page">
        <Reveal>
          <p className="kicker">Como funciona</p>
          <h2 className="t-h2 measure mt-5 font-display">Seis passos, nenhuma surpresa no fim</h2>
          <p className="t-lead measure mt-6 text-creme/65">
            Você sabe o que vem a seguir em cada etapa — e vê o projeto crescendo, em vez de esperar
            uma entrega às cegas.
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-linha bg-linha md:grid-cols-2 lg:grid-cols-3">
          {processo.map((etapa, i) => (
            <li key={etapa.numero}>
              <Reveal delay={i * 0.05}>
                <div className="group relative h-full bg-grafite p-8 transition-colors duration-500 hover:bg-grafite/55">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-6 top-4 font-display text-6xl text-creme/[0.06] transition-colors duration-500 group-hover:text-clay/15"
                  >
                    {etapa.numero}
                  </span>

                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-clay">
                    {etapa.duracao}
                  </p>
                  <h3 className="mt-4 font-display text-2xl tracking-tight">{etapa.titulo}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-creme/60">{etapa.texto}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
