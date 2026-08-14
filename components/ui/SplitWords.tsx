'use client'

import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { ease } from '@/lib/design'

type Props = {
  texto: string
  className?: string
  delay?: number
  stagger?: number
}

/**
 * Revela um título palavra por palavra, cada uma subindo de dentro
 * de uma máscara. Usado só nos títulos grandes — em excesso vira ruído.
 *
 * A máscara é `inline-block` (não `block`) para o título continuar
 * quebrando linha normalmente, e o espaço entre palavras fica FORA
 * dela: espaço dentro de inline-block colapsa e as palavras grudam.
 * O padding/margin de 0.16em dá folga pros descendentes (g, q, p) não
 * serem cortados — `t-display` usa line-height 0.92.
 */
export function SplitWords({ texto, className, delay = 0, stagger = 0.055 }: Props) {
  const reduzir = useReducedMotion()
  const palavras = texto.split(' ')

  if (reduzir) return <span className={className}>{texto}</span>

  return (
    <span className={className}>
      {palavras.map((palavra, i) => (
        <Fragment key={`${palavra}-${i}`}>
          <span className="inline-block -mb-[0.16em] overflow-hidden pb-[0.16em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: delay + i * stagger, ease: ease.outExpo }}
            >
              {palavra}
            </motion.span>
          </span>
          {i < palavras.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </span>
  )
}
