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
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
}

export default nextConfig
