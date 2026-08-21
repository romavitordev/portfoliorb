/**
 * URL pública do site, sem barra final.
 *
 * Portado do Marcelo Imóveis, e aqui resolve uma dor concreta: o espelho
 * estático (GitHub Pages) precisa de uma URL diferente da do site
 * principal, e até agora isso era feito REESCREVENDO `lib/site.ts` na
 * hora de sincronizar — uma substituição de string frágil, que quebra
 * silenciosamente se a linha mudar de formato.
 *
 * Com a URL vindo do ambiente, o espelho só declara a variável no
 * `next.config.mjs` e os dois repositórios passam a ter o mesmo arquivo.
 *
 * Ordem: variável explícita > URL da Vercel > localhost.
 */
export function siteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
    'http://localhost:3000'
  return url.replace(/\/$/, '')
}

/** Só o domínio — para exibir endereço na tela sem o protocolo. */
export function dominioDoSite(): string {
  return siteUrl().replace(/^https?:\/\//, '')
}

/**
 * Prefixa um caminho de `/public` com o basePath.
 *
 * Necessário porque `images.unoptimized` faz o next/image usar o `src`
 * cru, sem passar pelo loader que aplica o basePath. O resultado é um
 * HTML pedindo /projetos/x.webp enquanto o arquivo mora em
 * /portfoliorb/projetos/x.webp — 404 em produção, e a home fica sem
 * nenhuma imagem de projeto.
 *
 * Isso passou despercebido porque em `npm run dev` não há basePath, e o
 * problema só aparece no site publicado.
 *
 * URL absoluta passa direto: só caminho interno precisa do prefixo.
 */
export function comBase(caminho: string): string {
  if (/^https?:\/\//.test(caminho)) return caminho
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  return `${base}${caminho.startsWith('/') ? '' : '/'}${caminho}`
}
