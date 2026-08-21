/**
 * URL pública do site, sem barra final.
 *
 * Portado do Marcelo Imóveis. Vem do ambiente e não fixo no código
 * porque a URL muda conforme onde o site está: no GitHub Pages de
 * projeto ela tem subcaminho, e num domínio próprio não tem.
 *
 * É a mesma variável que o workflow define no deploy — trocar de
 * endereço não exige editar código.
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
