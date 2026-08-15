import { manifesto } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'

export function Manifesto() {
  return (
    <section id="manifesto" className="relative section-y">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="prancha">Por que a gente</p>
            <h2 className="t-h2 mt-5 font-display">{manifesto.titulo}</h2>
            <p className="t-lead measure mt-7 text-luz/65">{manifesto.texto}</p>
          </Reveal>

          <div className="grade-moldura grade-moldura-2 sm:grid-cols-2">
            {manifesto.pontos.map((ponto, i) => (
              <Reveal key={ponto.titulo} className="h-full" delay={i * 0.06}>
                <div className="celula">
                  <span aria-hidden className="celula-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="relative font-mono text-[0.66rem] tracking-[0.2em] text-ciano">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="relative mt-4 font-display text-xl tracking-tight">
                    {ponto.titulo}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-luz/60">
                    {ponto.texto}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
