'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

import { brand } from '@/lib/site'
import { ease } from '@/lib/design'

/**
 * Cortina de transição entre rotas: um painel carvão com a marca sobe
 * revelando a página. Entrada apenas (App Router), ~0.7s. Pulada no
 * primeiro load (o preloader cobre) e em reduced-motion.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const primeira = useRef(true)
  const [cobrir, setCobrir] = useState(false)

  useEffect(() => {
    if (primeira.current) {
      primeira.current = false
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setCobrir(true)
    const t = setTimeout(() => setCobrir(false), 760)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {cobrir && (
          <motion.div
            key="cortina"
            aria-hidden
            className="fixed inset-0 z-[140] flex items-center justify-center bg-carvao"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: ease.cortina }}
          >
            <motion.span
              className="font-display text-3xl tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {brand.nomeCurto}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: ease.outExpo }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  )
}
