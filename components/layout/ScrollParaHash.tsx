'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import { rolarPara } from '@/lib/lenis'

/**
 * Leva o scroll até a âncora quando a página abre já com hash na URL —
 * caso de quem clica em "Plano mensal" no rodapé, ou chega pelo menu
 * estando em outra rota.
 *
 * O salto nativo do navegador não serve aqui: ele acontece antes do
 * Lenis assumir e ignora a altura da navbar fixa. Um frame de espera
 * garante que a seção já existe no DOM.
 */
export function ScrollParaHash() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return

    const t = setTimeout(() => rolarPara(hash), 120)
    return () => clearTimeout(t)
  }, [pathname])

  return null
}
