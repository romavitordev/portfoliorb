'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  para: number
  sufixo?: string
  duracao?: number
  className?: string
}

/**
 * Conta de 0 até `para` quando entra na viewport (uma vez só).
 * Em reduced-motion, mostra o valor final direto.
 */
export function Counter({ para, sufixo = '', duracao = 1600, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [valor, setValor] = useState(0)
  const rodou = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValor(para)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || rodou.current) return
        rodou.current = true

        const inicio = performance.now()
        const passo = (agora: number) => {
          const t = Math.min((agora - inicio) / duracao, 1)
          // easeOutExpo — chega rápido e assenta
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
          setValor(Math.round(eased * para))
          if (t < 1) requestAnimationFrame(passo)
        }
        requestAnimationFrame(passo)
      },
      { threshold: 0.4 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [para, duracao])

  return (
    <span ref={ref} className={className}>
      {valor}
      {sufixo}
    </span>
  )
}
