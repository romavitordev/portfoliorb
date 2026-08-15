import { numeros } from '@/lib/site'
import { Counter } from '@/components/ui/Counter'
import { Reveal } from '@/components/ui/Reveal'

export function Numeros() {
  return (
    <section className="relative section-y-tight bg-nevoa/30">
      <div className="seam absolute inset-x-0 top-0" aria-hidden />
      <div className="seam absolute inset-x-0 bottom-0" aria-hidden />

      <div className="container-page">
        <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {numeros.map((n, i) => (
            <Reveal key={n.label} delay={i * 0.07}>
              <div>
                <dd className="t-num font-display text-ciano">
                  <Counter para={n.valor} sufixo={n.sufixo} />
                </dd>
                <dt className="mt-3 text-sm leading-relaxed text-luz/55">{n.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
