import { Hero } from '@/components/home/Hero'
import { Manifesto } from '@/components/home/Manifesto'
import { ProjetosDestaque } from '@/components/home/ProjetosDestaque'
import { ServicosResumo } from '@/components/home/ServicosResumo'
import { Numeros } from '@/components/home/Numeros'
import { Oficina } from '@/components/home/Oficina'
import { Manutencao } from '@/components/home/Manutencao'
import { Socios } from '@/components/home/Socios'
import { Stack } from '@/components/home/Stack'
import { Faq } from '@/components/home/Faq'
import { CtaFinal } from '@/components/home/CtaFinal'

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <ProjetosDestaque />
      <ServicosResumo />
      <Numeros />
      <Oficina />
      <Manutencao />
      <Socios />
      <Stack />
      <Faq />
      <CtaFinal />
    </>
  )
}
