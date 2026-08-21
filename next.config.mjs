/**
 * O site é ESTÁTICO e mora no GitHub Pages.
 *
 * Não há servidor: o formulário de orçamento monta a mensagem e abre o
 * WhatsApp, e o painel de leads foi removido (fica na branch
 * `com-painel`, caso um dia volte a fazer sentido).
 *
 * `images.unoptimized` porque o otimizador do Next precisa de servidor —
 * por isso os prints dos projetos já são gravados em webp comprimido
 * pelo `npm run print:projetos`.
 */
/*
  O Pages de PROJETO serve em subcaminho (…github.io/portfoliorb), então
  sem basePath o HTML pede /_next/... na raiz e o CSS dá 404 — o site
  sobe sem estilo nenhum. Aconteceu exatamente isso no primeiro deploy.

  Vem do ambiente e não fixo no código porque no dia do domínio próprio
  ele tem que ficar VAZIO: em domínio raiz não existe subcaminho.
*/
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
}

export default nextConfig
