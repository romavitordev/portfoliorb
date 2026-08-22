'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

/**
 * O elemento é atraído levemente pelo cursor quando ele se aproxima.
 *
 * Usado SÓ nos CTAs principais. Se todo botão puxasse, a página inteira
 * ficaria trêmula e o efeito deixaria de significar "este aqui importa".
 *
 * A força cai com a distância, então o botão parece pesado: perto ele
 * responde, longe ele ignora. Um deslocamento fixo daria a sensação de
 * um ímã de brinquedo.
 *
 * `translate3d` e não `left/top`: transform não recalcula layout, então
 * o movimento roda na composição e não engasga a rolagem.
 */
export function Magnetico({
  children,
  className = '',
  /** Quanto o elemento anda, em fração da distância. */
  forca = 0.28,
  /** Raio de atração além da borda, em pixels. */
  alcance = 70,
}: {
  children: ReactNode
  className?: string
  forca?: number
  alcance?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const podeMover =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!podeMover) return

    let raf = 0
    let dx = 0
    let dy = 0

    const mover = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const distX = e.clientX - cx
      const distY = e.clientY - cy

      // Retângulo do botão dilatado pelo alcance
      const dentro =
        Math.abs(distX) < r.width / 2 + alcance && Math.abs(distY) < r.height / 2 + alcance

      dx = dentro ? distX * forca : 0
      dy = dentro ? distY * forca : 0

      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
          raf = 0
        })
      }
    }

    window.addEventListener('mousemove', mover, { passive: true })
    return () => {
      window.removeEventListener('mousemove', mover)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [forca, alcance])

  return (
    <span
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
      style={{ transition: 'transform 0.35s cubic-bezier(.16,1,.3,1)' }}
    >
      {children}
    </span>
  )
}
