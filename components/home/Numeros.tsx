import { numeros } from '@/lib/site'
import { Counter } from '@/components/ui/Counter'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Os quatro números do estúdio.
 *
 * A cor NÃO é uma progressão aqui — esses quatro não formam uma
 * sequência, e pintá-los de violeta a lima seria decoração disfarçada de
 * sistema. Cada um recebe a cor da categoria que ele representa, usando
 * o significado que a paleta já tem:
 *
 *   projetos entregues  → lima     (resultado)
 *   sócios              → violeta  (quem começa, a origem)
 *   código é seu        → ciano    (tecnologia, propriedade)
 *   dias de ajuste      → azul     (compromisso escrito)
 *
 * Se a lista de números mudar, a cor precisa ser reavaliada junto — por
 * isso ela mora aqui, ao lado do raciocínio, e não no `lib/site.ts`.
 */
const cores = ['text-lima', 'text-violeta', 'text-ciano', 'text-azul']

/** Mesma cor da linha, em transparência — pra régua não competir. */
const regua = [
  'from-lima/60',
  'from-violeta/60',
  'from-ciano/60',
  'from-azul/60',
]

export function Numeros() {
  return (
    <section className="relative section-y-tight bg-nevoa/30">
      <div className="seam absolute inset-x-0 top-0" aria-hidden />
      <div className="seam absolute inset-x-0 bottom-0" aria-hidden />

      <div className="container-page">
        <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {numeros.map((n, i) => (
            <Reveal key={n.label} delay={i * 0.07}>
              <div className="group">
                <dd className={`t-num font-display ${cores[i % cores.length]}`}>
                  <Counter para={n.valor} sufixo={n.sufixo} />
                </dd>

                {/* Régua sob o número, no mesmo gesto do cabeçalho de seção */}
                <span
                  aria-hidden
                  className={`mt-4 block h-px w-full bg-gradient-to-r to-transparent ${
                    regua[i % regua.length]
                  }`}
                />

                <dt className="mt-4 text-sm leading-relaxed text-luz/55">{n.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
