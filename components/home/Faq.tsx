import { faq } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'

/**
 * FAQ em <details> nativo — abre sem JavaScript, é acessível de graça
 * e o Google lê o conteúdo mesmo fechado.
 */
export function Faq() {
  return (
    <section id="faq" className="relative section-y">
      <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="kicker">Perguntas</p>
          <h2 className="t-h2 mt-5 font-display">O que sempre perguntam</h2>
          <p className="t-lead measure-sm mt-6 text-creme/65">
            Preço, prazo e propriedade do código — respondidos aqui, antes de você precisar
            perguntar.
          </p>
        </Reveal>

        <div className="border-t border-linha">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.03}>
              <details className="group border-b border-linha">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left transition-colors hover:text-clay [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-medium md:text-lg">{item.q}</h3>
                  <span
                    aria-hidden
                    className="relative mt-2 h-3 w-3 shrink-0 text-clay"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                    <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="measure pb-7 text-sm leading-relaxed text-creme/60">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
