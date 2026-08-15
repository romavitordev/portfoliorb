import type { MetadataRoute } from 'next'

import { brand } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.nomeCompleto,
    short_name: brand.nome,
    description: brand.descricao,
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0A12',
    theme_color: '#0B0A12',
    lang: 'pt-BR',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
