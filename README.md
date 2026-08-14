# Roma & Buganza — estúdio de desenvolvimento

Landing page e catálogo de projetos do estúdio (Vitor Roma + Marcelo Buganza).
Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP/Lenis e Framer Motion.

## Rodando

```bash
npm install
```

```bash
npm run dev
```

Abre em `http://localhost:3000`.

| Comando | O que faz |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção |
| `npm start` | sobe o build |
| `npm run lint` | ESLint (config do Next) |

## Estrutura

```
app/
  layout.tsx              raiz: fontes, metadata, JSON-LD, Header/Footer, efeitos globais
  page.tsx                home — só compõe as seções de components/home
  projetos/
    page.tsx              catálogo filtrável
    [slug]/page.tsx       página de case (uma rota estática por projeto)
  servicos/page.tsx
  estudio/page.tsx
  contato/page.tsx
  robots.ts · sitemap.ts · manifest.ts · opengraph-image.tsx
  error.tsx · not-found.tsx · icon.svg

components/
  layout/    Header, Footer, MobileBottomNav, LenisProvider, PageTransition
  fx/        GrainOverlay, Preloader, ScrollProgress
  ui/        Reveal, Counter, SplitWords
  home/      seções da home (reaproveitadas em outras rotas)
  projetos/  ProjetoCard, CatalogoProjetos
  contato/   FormOrcamento

lib/
  site.ts      marca, sócios, serviços, processo, números, stack, FAQ, contato
  projetos.ts  catálogo de projetos + helpers de rota
  design.ts    tokens de motion (durações, easings, reveal)
```

## Editando o conteúdo

Nenhum componente tem texto escrito dentro dele. Tudo vive em dois arquivos:

- **`lib/site.ts`** — nome, tagline, WhatsApp, e-mail, sócios, serviços, processo, números, stack, FAQ.
- **`lib/projetos.ts`** — o catálogo. Acrescentar um objeto no array `projetos` já cria a rota
  `/projetos/<slug>`, o card no catálogo, a entrada no sitemap e o link no rodapé.

O campo `natureza` de cada projeto (`cliente` · `proprio` · `conceito`) é o que mantém o catálogo
honesto: o selo aparece no card e na página do case, então projeto conceitual nunca se passa por
trabalho contratado.

## Pendências antes de publicar

Procure por `PLACEHOLDER` em `lib/site.ts`:

- [ ] `brand.whatsapp` — número real, só dígitos, com DDI 55
- [ ] `brand.email`, `brand.instagram` / `instagramUrl`, `brand.url`
- [ ] Links do Marcelo em `socios[1].links`
- [ ] Foto real dos sócios (hoje `imagens.estudio` aponta pro Unsplash)
- [ ] Capturas reais dos projetos em `/public/projetos/<slug>.webp` — hoje os `imagem` de
      `lib/projetos.ts` são placeholders temáticos do Unsplash
- [ ] Conferir a faixa de preços do FAQ (`lib/site.ts` → `faq`)

## Design

Paleta Claude em modo escuro: carvão quente `#141311`, superfícies `#1D1B18`, texto creme
`#F0EEE6`, acento clay `#D97757`. Tipografia: Instrument Serif (display), Inter (texto),
JetBrains Mono (rótulos). Tokens em `tailwind.config.ts`; utilitários de seção, tipografia e
botão em `app/globals.css`.

Todo o movimento pesado é desligado em `prefers-reduced-motion`.
