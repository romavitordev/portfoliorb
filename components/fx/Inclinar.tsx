'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

/**
 * Inclina o elemento conforme o cursor percorre a área ao redor.
 *
 * Usado na miniatura do hero: ela é a peça que promete "seu site fica
 * assim", e uma peça que não reage ao ponteiro contradiz a promessa.
 *
 * O ângulo é PEQUENO de propósito (4° no limite). Inclinação forte vira
 * truque de template e atrapalha a leitura do que está dentro — aqui a
 * miniatura tem texto e preço, que precisam continuar legíveis.
 *
 * A referência é o elemento PAI, não a janela: assim o eixo neutro fica
 * no centro da miniatura, e não no centro da tela.
 */
export function Inclinar({
  children,
  className = '',
  /** Ângulo máximo em graus. */
  grau = 4,
}: {
  children: ReactNode
  className?: string
  grau?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const podeMover =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!podeMover) return

    let raf = 0
    let rx = 0
    let ry = 0

    const mover = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      // -1 a 1 em cada eixo, a partir do centro da própria miniatura
      const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
      const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)

      const limitar = (v: number) => Math.max(-1.4, Math.min(1.4, v))
      ry = limitar(px) * grau
      rx = limitar(py) * -grau

      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`
          raf = 0
        })
      }
    }

    const repousar = () => {
      el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)'
    }

    window.addEventListener('mousemove', mover, { passive: true })
    window.addEventListener('mouseleave', repousar)
    return () => {
      window.removeEventListener('mousemove', mover)
      window.removeEventListener('mouseleave', repousar)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [grau])

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: 'transform 0.5s cubic-bezier(.16,1,.3,1)', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
