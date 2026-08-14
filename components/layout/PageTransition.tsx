'use client'

import { MotionConfig, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

import { ease } from '@/lib/design'

/**
 * Transição entre rotas. Antes havia uma cortina opaca cobrindo a tela
 * inteira por ~0.7s — lia como tela de carregamento e travava a
 * navegação. Agora é só um fade curto com uma subida mínima: a página
 * nova aparece de imediato e o movimento serve de continuidade, não de
 * espera.
 *
 * A navegação por seções da home nem passa por aqui — o header rola em
 * vez de trocar de rota.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: ease.outExpo }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  )
}
