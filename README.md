# Roma & Buganza — estúdio de desenvolvimento

Landing page e catálogo de projetos do estúdio (Vitor Roma + Marcelo Buganza).
Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP/Lenis e Framer Motion.

**Demonstração:** https://romavitordev.github.io/layout_portfoliorb/

> Este é o repositório **completo**, feito para rodar em servidor (Vercel): imagens
> otimizadas pelo Next e cartão social gerado em runtime. O espelho estático que
> alimenta a demonstração vive em
> [layout_portfoliorb](https://github.com/romavitordev/layout_portfoliorb) —
> mesmo código, exportado como HTML puro para o GitHub Pages.

## Rodando

```bash
npm install
```

Copie `.env.example` para `.env` e preencha (veja [Captação de leads](#captação-de-leads)).
Sem `.env`, o site sobe normalmente — só o formulário e o painel ficam fora do ar.

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

## Captação de leads

O formulário de `/contato` grava em banco, dispara aviso por e-mail e alimenta o painel
em `/admin`. Três travas protegem a rota pública: **rate limit** (5 envios por IP a cada
10 min), **honeypot** (campo invisível — quando preenchido a rota responde `200` como se
tivesse dado certo, para o bot não aprender que foi barrado) e **validação por schema Zod
compartilhado** entre formulário e API.

O aviso por e-mail é secundário de propósito: se o Resend falhar, o lead já está salvo.
E se a API inteira falhar, o formulário oferece o WhatsApp — lead perdido por erro de
servidor é o pior desfecho possível.

### Configurar

1. **Banco** — crie um projeto em [neon.tech](https://neon.tech), copie a connection
   string para `DATABASE_URL` e rode:

   ```bash
   npm run db:push
   ```

2. **Senha do painel** — gere o hash (a senha em texto puro não fica em lugar nenhum):

   ```bash
   npm run senha "sua-senha-forte"
   ```

3. **Segredo da sessão** — 32+ caracteres em `ADMIN_JWT_SECRET`:

   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
   ```

4. **E-mail** (opcional) — chave do [Resend](https://resend.com) em `RESEND_API_KEY` e os
   destinatários em `EMAIL_DESTINO`. Sem isso o lead é salvo e o aviso vai só para o log.

### Painel

`/admin` — protegido por `middleware.ts`, que valida o JWT no Edge sem tocar no banco.
Lista os leads, muda status (novo → em conversa → proposta → fechado), guarda anotação
interna e responde em um clique (WhatsApp se a pessoa deixou telefone, e-mail se deixou
e-mail). A anotação nunca sai em rota pública.

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
