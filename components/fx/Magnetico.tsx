'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

/**
 * O elemento é atraído levemente pelo cursor quando ele se aproxima.
 *
 * Usado SÓ nos CTAs principais. Se todo botão puxasse, a página inteira
 * ficaria trêmula e o efeito deixaria de significar "este aqui importa".
 *
 * DUAS CORREÇÕES sobre a primeira versão, que deslocava o botão em 46px
 * e saltava de estalo:
 *
 * 1. A força agora CAI com a distância de verdade. Antes era
 *    `distancia * forca` cortado por um limite — ou seja, crescia até a
 *    borda da zona e sumia de uma vez. O deslocamento subia até 46px e
 *    desaparecia num pixel de diferença.
 *
 *    Agora vale `forca * dist * (1 - dist/raio)`: zero no centro (não há
 *    direção), pico no meio do caminho, zero de novo na borda. Some
 *    suave dos dois lados, então não há salto em lugar nenhum.
 *
 * 2. O centro é o de REPOUSO, não o atual. Como o botão se move, o
 *    retângulo medido já vinha deslocado e o cálculo realimentava a si
 *    mesmo — por isso perto do cursor ele travava em zero. Subtrair o
 *    deslocamento aplicado devolve a posição real.
 */
export function Magnetico({
  children,
  className = '',
  /** Fator de atração. O pico fica em `forca * raio / 4`. */
  forca = 0.3,
  /** Quanto a zona de atração passa da borda do elemento, em pixels. */
  alcance = 60,
  /** Teto absoluto, pra nenhuma combinação de tamanho estourar. */
  teto = 14,
}: {
  children: ReactNode
  className?: string
  forca?: number
  alcance?: number
  teto?: number
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

      // Centro de REPOUSO: tira o deslocamento que já está aplicado.
      const cx = r.left + r.width / 2 - dx
      const cy = r.top + r.height / 2 - dy

      const px = e.clientX - cx
      const py = e.clientY - cy
      const dist = Math.hypot(px, py)

      const raio = Math.max(r.width, r.height) / 2 + alcance

      if (dist >= raio || dist === 0) {
        dx = 0
        dy = 0
      } else {
        // Sobe do centro até o meio do raio e volta a zero na borda.
        const intensidade = Math.min(forca * dist * (1 - dist / raio), teto)
        dx = (px / dist) * intensidade
        dy = (py / dist) * intensidade
      }

      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`
          raf = 0
        })
      }
    }

    window.addEventListener('mousemove', mover, { passive: true })
    return () => {
      window.removeEventListener('mousemove', mover)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [forca, alcance, teto])

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
