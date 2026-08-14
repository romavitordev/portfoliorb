import type { MetadataRoute } from 'next'

import { brand } from '@/lib/site'
import { projetos } from '@/lib/projetos'

/**
 * Rotas fixas + uma entrada por projeto do catálogo. Adicionar um
 * projeto em `lib/projetos.ts` já o coloca aqui.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date()

  const fixas: MetadataRoute.Sitemap = [
    { url: `${brand.url}/`, lastModified: agora, changeFrequency: 'monthly', priority: 1 },
    { url: `${brand.url}/projetos`, lastModified: agora, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${brand.url}/servicos`, lastModified: agora, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${brand.url}/estudio`, lastModified: agora, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${brand.url}/contato`, lastModified: agora, changeFrequency: 'yearly', priority: 0.7 },
  ]

  const cases: MetadataRoute.Sitemap = projetos.map((p) => ({
    url: `${brand.url}/projetos/${p.slug}`,
    lastModified: agora,
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  return [...fixas, ...cases]
}
