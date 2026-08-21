'use client'

import { useEffect, useState } from 'react'

import { nav } from '@/lib/site'

/**
 * Qual seção da página única está sendo lida agora.
 *
 * Numa página só, `pathname` é sempre "/" — não dá pra marcar o menu por
 * rota. Quem responde é a posição na tela.
 *
 * O `rootMargin` de -45% em cima e embaixo reduz a área observada a uma
 * FAIXA CENTRAL da viewport. Sem isso, duas seções vizinhas ficam
 * visíveis ao mesmo tempo e o menu acende dois itens.
 *
 * Vivia dentro do Header. Virou hook quando a navbar do mobile passou a
 * precisar da mesma resposta — duas cópias divergem na primeira mudança.
 */
export function useSecaoAtiva(ativo = true) {
  const [ativa, setAtiva] = useState<string | null>(null)

  useEffect(() => {
    if (!ativo) {
      setAtiva(null)
      return
    }

    const alvos = nav
      .map((item) => document.getElementById(item.secao))
      .filter((el): el is HTMLElement => el !== null)

    if (alvos.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visivel = entries.filter((e) => e.isIntersecting)
        if (visivel.length > 0) setAtiva(visivel[0].target.id)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )

    alvos.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [ativo])

  return ativa
}
