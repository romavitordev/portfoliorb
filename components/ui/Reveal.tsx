'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

import { ease, reveal } from '@/lib/design'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/**
 * Fade + subida suave quando o elemento entra na viewport (uma vez).
 *
 * Além do fade, marca `data-visivel` ao entrar. É esse atributo que o
 * CSS usa pra desenhar a régua da `.prancha` — assim o traço acompanha
 * a chegada da seção sem que cada cabeçalho precise de código próprio.
 *
 * O atributo vai direto no DOM, não pelo estado: é uma marca única e
 * definitiva, e um `setState` aqui re-renderizaria a seção inteira à
 * toa.
 */
export function Reveal({ children, className, delay = 0, y = reveal.y }: Props) {
  const reduzir = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduzir ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={reveal.viewport}
      transition={{ duration: reveal.duration, delay, ease: ease.outExpo }}
      onViewportEnter={() => ref.current?.setAttribute('data-visivel', '')}
    >
      {children}
    </motion.div>
  )
}
