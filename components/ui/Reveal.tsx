'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

import { ease, reveal } from '@/lib/design'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Fade + subida suave quando o elemento entra na viewport (uma vez). */
export function Reveal({ children, className, delay = 0, y = reveal.y }: Props) {
  const reduzir = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduzir ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={reveal.viewport}
      transition={{ duration: reveal.duration, delay, ease: ease.outExpo }}
    >
      {children}
    </motion.div>
  )
}
