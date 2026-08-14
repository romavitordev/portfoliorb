import type { Metadata } from 'next'

import { brand } from '@/lib/site'
import { projetos } from '@/lib/projetos'
import { Reveal } from '@/components/ui/Reveal'
import { CatalogoProjetos } from '@/components/projetos/CatalogoProjetos'
import { CtaFinal } from '@/components/home/CtaFinal'

export const metadata: Metadata = {
  title: 'Projetos',
  description:
    'Catálogo de projetos da Roma & Buganza: sistemas com painel administrativo, sites institucionais, landing pages de conversão, produtos digitais e automações.',
  alternates: { canonical: '/projetos' },
}

/** Lista de itens — ajuda o Google a entender que a página é um catálogo. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Projetos — Roma & Buganza',
  url: `${brand.url}/projetos`,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: projetos.length,
    itemListElement: projetos.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.nome,
      url: `${brand.url}/projetos/${p.slug}`,
    })),
  },
}

export default function ProjetosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden pb-4 pt-32 md:pt-40">
        <div className="malha absolute inset-0 opacity-50" aria-hidden />
        <div className="halo-clay -left-24 top-0 h-[26rem] w-[26rem]" aria-hidden />

        <div className="container-page relative">
          <Reveal>
            <p className="kicker">Catálogo</p>
            <h1 className="t-h1 mt-6 font-display">
              {projetos.length} projetos, <span className="texto-clay">nenhum maquiado</span>
            </h1>
            <p className="t-lead measure mt-7 text-creme/65">
              Sistemas de cliente rodando em produção, produtos próprios em construção e projetos
              conceituais onde a direção de arte anda solta. Cada card marca o que é o quê — e
              todos têm código aberto e demonstração no ar.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y-tight">
        <div className="container-page">
          <CatalogoProjetos />
        </div>
      </section>

      <CtaFinal />
    </>
  )
}
