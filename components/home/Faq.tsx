'use client'

import { useState } from 'react'

import { faq } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'

/**
 * FAQ em acordeão — uma pergunta aberta por vez.
 *
 * São doze perguntas. Com o `<details>` solto, dava pra abrir todas ao
 * mesmo tempo e a seção esticava a página inteira. Agora abrir uma
 * fecha a anterior, então a altura fica quase constante.
 *
 * Continua sendo `<details>` de verdade, e não uma div com clique:
 *  - sem JavaScript, o elemento nativo ainda abre e fecha sozinho
 *    (perde-se só o "uma por vez", que é melhoria, não requisito);
 *  - o Google indexa a resposta mesmo com o item fechado;
 *  - leitor de tela anuncia o estado sem precisar de ARIA na mão.
 *
 * O `preventDefault` no summary só roda com JS ativo — é ele que passa
 * o controle do estado nativo para o React.
 */
export function Faq() {
  const [aberta, setAberta] = useState<number | null>(null)

  return (
    <section id="faq" className="relative section-y">
      <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="prancha">Perguntas</p>
          <h2 className="t-h2 mt-5 font-display">O que sempre perguntam</h2>
          <p className="t-lead measure-sm mt-6 text-luz/65">
            Preço, prazo e propriedade do código — respondidos aqui, antes de você precisar
            perguntar.
          </p>
        </Reveal>

        <div className="border-t border-linha">
          {faq.map((item, i) => {
            const estaAberta = aberta === i
            return (
              <details
                key={item.q}
                open={estaAberta}
                className="group border-b border-linha"
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault()
                    setAberta(estaAberta ? null : i)
                  }}
                  className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left transition-colors hover:text-ciano [&::-webkit-details-marker]:hidden"
                >
                  <h3 className="text-[0.95rem] font-medium md:text-base">{item.q}</h3>

                  {/* Cruz que vira traço quando abre */}
                  <span aria-hidden className="relative mt-1.5 h-3 w-3 shrink-0 text-ciano">
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                    <span
                      className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-300 ${
                        estaAberta ? 'rotate-90 opacity-0' : ''
                      }`}
                    />
                  </span>
                </summary>

                <p className="measure pb-6 text-sm leading-relaxed text-luz/60">{item.a}</p>
              </details>
            )
          })}
        </div>
      </div>
    </section>
  )
}
