import { stack } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Marquee infinito com a stack. A lista é duplicada e o container anda
 * -50%, então a emenda é invisível. Pausa no hover; parada em reduced-motion
 * pela regra global do globals.css.
 */
export function Stack() {
  const fita = [...stack, ...stack]

  return (
    <section className="relative section-y-tight overflow-hidden border-y border-linha bg-grafite/20">
      <div className="container-page">
        <Reveal>
          <p className="kicker-poeira text-center">Ferramentas de trabalho</p>
        </Reveal>
      </div>

      <div className="group relative mt-10 flex overflow-hidden" aria-hidden>
        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {fita.map((item, i) => (
            <span
              key={`${item.nome}-${i}`}
              className="inline-flex shrink-0 items-baseline gap-3 rounded-full border border-linha bg-grafite px-6 py-3"
            >
              <span className="font-display text-lg tracking-tight">{item.nome}</span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-creme/40">
                {item.nota}
              </span>
            </span>
          ))}
        </div>

        {/* Máscaras nas pontas, pra fita "entrar e sair" do nada */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-carvao to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-carvao to-transparent" />
      </div>

      {/* Versão acessível da mesma informação, para leitor de tela */}
      <ul className="sr-only">
        {stack.map((item) => (
          <li key={item.nome}>
            {item.nome} — {item.nota}
          </li>
        ))}
      </ul>
    </section>
  )
}
