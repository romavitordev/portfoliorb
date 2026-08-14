'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { brand } from '@/lib/site'
import { ease } from '@/lib/design'

/**
 * Cortina de abertura — só no primeiro load. Trava o scroll por ~1.1s,
 * revela o nome do estúdio e sobe. Pulada em reduced-motion e quando
 * a página já foi visitada nesta sessão.
 */
export function Preloader() {
  const [mostrar, setMostrar] = useState(false)

  useEffect(() => {
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const jaViu = sessionStorage.getItem('rb-preloader') === '1'
    if (reduzido || jaViu) return

    setMostrar(true)
    document.documentElement.classList.add('trava-scroll')

    const t = setTimeout(() => {
      setMostrar(false)
      sessionStorage.setItem('rb-preloader', '1')
      document.documentElement.classList.remove('trava-scroll')
    }, 1150)

    return () => {
      clearTimeout(t)
      document.documentElement.classList.remove('trava-scroll')
    }
  }, [])

  return (
    <AnimatePresence>
      {mostrar && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[200] flex items-center justify-center bg-carvao"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: ease.cortina }}
        >
          <div className="malha absolute inset-0 opacity-40" />
          <motion.span
            className="relative font-display text-4xl tracking-tight text-creme md:text-6xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: ease.outExpo }}
          >
            {brand.nome.split(' & ')[0]} <span className="text-clay">&amp;</span>{' '}
            {brand.nome.split(' & ')[1]}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
