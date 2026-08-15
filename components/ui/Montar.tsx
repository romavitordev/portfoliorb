'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Atraso antes de começar a montar, em segundos. */
  delay?: number
  /** Quantos blocos de rascunho desenhar antes do conteúdo aparecer. */
  linhas?: number
}

/**
 * Monta o conteúdo na frente do leitor.
 *
 * Ao entrar na viewport, o bloco aparece primeiro como RASCUNHO —
 * moldura tracejada e barras cinzas no lugar do texto — e só então o
 * conteúdo real assenta por cima. É a ideia do site inteiro aplicada no
 * menor pedaço possível.
 *
 * Por que não é só um fade: o rascunho ocupa exatamente o espaço do
 * conteúdo final, então nada pula quando ele troca. E em
 * `prefers-reduced-motion` o rascunho é pulado por completo — quem pediu
 * menos movimento recebe o conteúdo direto, sem etapa intermediária.
 */
export function Montar({ children, className, delay = 0, linhas = 3 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [fase, setFase] = useState<'espera' | 'rascunho' | 'pronto'>('espera')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFase('pronto')
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()

        const t1 = setTimeout(() => setFase('rascunho'), delay * 1000)
        const t2 = setTimeout(() => setFase('pronto'), delay * 1000 + 380)
        el.dataset.timers = `${t1},${t2}`
      },
      { threshold: 0.15, rootMargin: '-40px' },
    )

    obs.observe(el)
    return () => {
      obs.disconnect()
      el.dataset.timers?.split(',').forEach((t) => clearTimeout(Number(t)))
    }
  }, [delay])

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      {/* Camada de rascunho — ocupa o mesmo espaço, some quando o real chega */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
          fase === 'rascunho' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="rascunho h-full w-full rounded-lg p-4">
          <div className="flex h-full flex-col gap-3">
            {Array.from({ length: linhas }).map((_, i) => (
              <div
                key={i}
                className="rascunho-bloco h-3"
                style={{ width: `${[70, 92, 55, 80, 64][i % 5]}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo real */}
      <div
        className={`transition-all duration-500 ease-saida ${
          fase === 'pronto' ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
