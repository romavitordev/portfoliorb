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

          {/*
            Antes cada card repetia o número DUAS vezes — um pequeno em
            ciano e um gigante fantasma atrás — e ainda empilhava tudo na
            vertical, o que deixava os blocos altíssimos.

            Agora o número vive numa coluna própria à esquerda do texto:
            uma ocorrência só, e a altura cai porque o título e o texto
            passam a dividir a linha com ele em vez de ficar embaixo.
          */}
          <div className="grade-moldura grade-moldura-2 sm:grid-cols-2">
            {manifesto.pontos.map((ponto, i) => (
              <Reveal key={ponto.titulo} className="h-full" delay={i * 0.06}>
                <div className="celula flex gap-4 !p-6">
                  <span
                    aria-hidden
                    className="mt-0.5 shrink-0 font-mono text-[0.66rem] tracking-[0.2em] text-ciano"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-lg leading-snug tracking-tight">
                      {ponto.titulo}
                    </h3>
                    <p className="mt-2 text-[0.82rem] leading-relaxed text-luz/55">
                      {ponto.texto}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
