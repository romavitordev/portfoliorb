import './globals.css'

import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { PageTransition } from '@/components/layout/PageTransition'
import { GrainOverlay } from '@/components/fx/GrainOverlay'
import { Preloader } from '@/components/fx/Preloader'
import { ScrollProgress } from '@/components/fx/ScrollProgress'
import { brand, imagens, servicos, socios } from '@/lib/site'

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument',
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.nome} — sites, sistemas e produtos digitais`,
    template: `%s | ${brand.nome}`,
  },
  description: brand.descricao,
  keywords: [
    'desenvolvimento web Sorocaba',
    'criação de sites Sorocaba',
    'landing page profissional',
    'sistema web sob medida',
    'catálogo de imóveis Next.js',
    'desenvolvedor Next.js Brasil',
    'criação de startup MVP',
    'modelagem 3D produto',
    'Roma & Buganza',
  ],
  authors: socios.map((s) => ({ name: s.nome })),
  creator: brand.nome,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: brand.url,
    siteName: brand.nome,
    title: brand.nomeCompleto,
    description: brand.tagline,
    images: [{ url: imagens.og, width: 1200, height: 630, alt: brand.nomeCompleto }],
  },
  twitter: {
    card: 'summary_large_image',
    title: brand.nomeCompleto,
    description: brand.tagline,
    images: [imagens.og],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#141311',
  colorScheme: 'dark',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${brand.url}/#estudio`,
  name: brand.nome,
  alternateName: brand.nomeCompleto,
  description: brand.descricao,
  url: brand.url,
  image: imagens.og,
  email: brand.email,
  foundingDate: String(brand.fundacao),
  areaServed: { '@type': 'Country', name: 'Brasil' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sorocaba',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  founder: socios.map((s) => ({
    '@type': 'Person',
    name: s.nome,
    jobTitle: s.papel,
    sameAs: s.links.map((l) => l.url),
  })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços',
    itemListElement: servicos.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.nome, description: s.resumo },
    })),
  },
  sameAs: [brand.github, brand.linkedin],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${instrument.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-clay focus:px-5 focus:py-2 focus:text-sm focus:text-carvao"
        >
          Pular para o conteúdo
        </a>

        <GrainOverlay />
        <Preloader />
        <ScrollProgress />
        <LenisProvider />
        <Header />
        <PageTransition>
          <main id="conteudo" className="overflow-x-clip">
            {children}
          </main>
        </PageTransition>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  )
}
