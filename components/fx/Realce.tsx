'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

/**
 * O campo de luz responde ao cursor.
 *
 * O fundo do site já é feito de campos de luz desfocados — este
 * componente traz o mesmo motivo para dentro dos cards, só que reagindo
 * ao ponteiro. É extensão do que a marca já faz, não um efeito
 * emprestado de outro lugar.
 *
 * A posição vai para VARIÁVEIS CSS, não para o estado do React. Um
 * `setState` por mousemove re-renderizaria a árvore dezenas de vezes por
 * segundo à toa; aqui só duas custom properties mudam, e o navegador
 * repinta um gradiente — sem tocar no DOM.
 *
 * Não faz nada onde não há cursor nem para quem pediu menos movimento:
 * o brilho é resposta a um ponteiro, e sem ponteiro ele não tem sentido.
 */
type Props = {
  children: ReactNode
  className?: string
  /** Intensidade do brilho. `forte` para superfícies grandes. */
  forca?: 'sutil' | 'forte'
  /** Elemento a renderizar. Cards costumam ser `article`. */
  como?: 'div' | 'article' | 'li'
  /** Âncora do card — usada pra linkar direto pra um serviço. */
  id?: string
}

export function Realce({ children, className = '', forca = 'sutil', como = 'div', id }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const podeMover =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!podeMover) return

    let raf = 0
    let x = 0
    let y = 0

    const mover = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      x = e.clientX - r.left
      y = e.clientY - r.top
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.setProperty('--mx', `${x}px`)
          el.style.setProperty('--my', `${y}px`)
          raf = 0
        })
      }
    }

    const entrar = () => el.style.setProperty('--realce', '1')
    const sair = () => el.style.setProperty('--realce', '0')

    el.addEventListener('mousemove', mover)
    el.addEventListener('mouseenter', entrar)
    el.addEventListener('mouseleave', sair)
    return () => {
      el.removeEventListener('mousemove', mover)
      el.removeEventListener('mouseenter', entrar)
      el.removeEventListener('mouseleave', sair)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const Tag = como as 'div'

  return (
    <Tag
      id={id}
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`realce ${forca === 'forte' ? 'realce-forte' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
