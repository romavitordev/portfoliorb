import type { MetadataRoute } from 'next'

import { brand } from '@/lib/site'
import { projetos } from '@/lib/projetos'

/**
 * O site tem DUAS rotas reais: a página única e cada case.
 *
 * A lista antiga trazia /projetos, /servicos, /estudio e /contato, que
 * viraram âncoras da home — sitemap apontando pra 404 é pedido explícito
 * pro Google rastrear o que não existe. Âncora não entra em sitemap: a
 * página é a mesma.
 *
 * Adicionar um projeto em `lib/projetos.ts` já o coloca aqui.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date()

  const fixas: MetadataRoute.Sitemap = [
    { url: `${brand.url}/`, lastModified: agora, changeFrequency: 'monthly', priority: 1 },
  ]

  const cases: MetadataRoute.Sitemap = projetos.map((p) => ({
    url: `${brand.url}/projetos/${p.slug}`,
    lastModified: agora,
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  return [...fixas, ...cases]
}
