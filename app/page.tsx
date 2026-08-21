import type { Metadata } from 'next'

import { brand } from '@/lib/site'
import { Hero } from '@/components/home/Hero'
import { Manifesto } from '@/components/home/Manifesto'
import { CatalogoNaHome } from '@/components/home/CatalogoNaHome'
import { ServicosDetalhe } from '@/components/home/ServicosDetalhe'
import { Oficina } from '@/components/home/Oficina'
import { Manutencao } from '@/components/home/Manutencao'
import { Numeros } from '@/components/home/Numeros'
import { Socios } from '@/components/home/Socios'
import { Stack } from '@/components/home/Stack'
import { Faq } from '@/components/home/Faq'
import { Contato } from '@/components/home/Contato'

/**
 * PÁGINA ÚNICA.
 *
 * O site inteiro mora aqui, em rolagem com âncoras: /servicos, /estudio,
 * /contato e /projetos viraram seções. Sobrou uma rota além desta — os
 * cases em /projetos/[slug] —, porque é onde está a profundidade que
 * convence quem já se interessou, e enfiar sete cases nesta página a
 * transformaria num monstro.
 *
 * A ordem segue a pergunta que a pessoa faz em cada momento:
 * quem são vocês → o que já fizeram → o que fazem → como trabalham →
 * quanto custa manter → com quem eu falo → dúvidas → como contratar.
 */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
  description: brand.descricao,
}

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <CatalogoNaHome />
      <ServicosDetalhe />
      <Oficina />
      <Manutencao />
      <Numeros />
      <Socios />
      <Stack />
      <Faq />
      <Contato />
    </>
  )
}
