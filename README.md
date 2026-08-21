# Roma & Buganza — estúdio de desenvolvimento

Landing page e catálogo de projetos do estúdio (Vitor Roma + Marcelo Buganza).
Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP/Lenis e Framer Motion.

**No ar:** https://romavitordev.github.io/portfoliorb/

> Site **estático**, publicado no GitHub Pages pelo workflow em
> `.github/workflows/deploy.yml`. Não há servidor nem banco: o formulário de
> orçamento valida, monta a mensagem e abre o WhatsApp.
>
> Uma página (`/`) com tudo em rolagem e âncoras, mais uma página por case em
> `/projetos/[slug]`.
>
> O painel de leads, a API e o Prisma existiram e foram removidos quando o site
> passou a ser estático — estão preservados na branch
> [`com-painel`](https://github.com/romavitordev/portfoliorb/tree/com-painel).

## Rodando

```bash
npm install
```

```bash
npm run up
```

`up` é o comando único de desenvolvimento. Ele cria o `.env` na primeira execução (com
segredo gerado na hora), sincroniza o banco, cria um acesso ao painel se ainda não houver
nenhum e sobe dois processos em paralelo:

| | onde | o que é |
| --- | --- | --- |
| `next` | http://localhost:3000 | site **e** API — no App Router é o mesmo processo |
| `studio` | http://localhost:5555 | Prisma Studio, para ver e editar o banco |

O banco em desenvolvimento é um arquivo SQLite: não há servidor para subir. A saída dos
dois processos vem com prefixo, e `Ctrl+C` derruba a árvore inteira — sem deixar processo
órfão segurando a porta.

Na primeira execução o script imprime um e-mail e uma senha de acesso ao painel. Anote:
ela não é mostrada de novo. Troque em `/admin/conta`.

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

2. **Segredo da sessão** — 32+ caracteres em `ADMIN_JWT_SECRET`:

   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
   ```

   > Este mesmo segredo cifra o segredo da 2FA no banco. Trocá-lo depois que alguém
   > ativou a verificação em dois passos torna os códigos indecifráveis, e a pessoa
   > precisa reativar.

3. **Contas dos sócios** — não há senha em variável de ambiente; cada um tem a própria:

   ```bash
   npm run usuario -- "vitor@romabuganza.com.br" "Vitor Roma" "senha-forte"
   ```

   Rodar de novo com o mesmo e-mail troca a senha — é assim que se recupera acesso.

4. **E-mail** (opcional) — chave do [Resend](https://resend.com) em `RESEND_API_KEY` e os
   destinatários em `EMAIL_DESTINO`. Sem isso o lead é salvo e o aviso vai só para o log.

### Painel

`/admin` — protegido por `middleware.ts`, que valida o JWT no Edge sem tocar no banco.
Lista os leads, muda status (novo → em conversa → proposta → fechado), guarda anotação
interna e responde em um clique (WhatsApp se a pessoa deixou telefone, e-mail se deixou
e-mail). A anotação nunca sai em rota pública, e cada mudança registra qual sócio a fez.

### Login e 2FA

Login em duas etapas: e-mail e senha e, para quem ativou, seis dígitos do app
autenticador. A senha é conferida **nas duas etapas** — o código sozinho nunca autentica.
E-mail inexistente e senha errada devolvem a mesma mensagem, para não revelar quais
e-mails têm conta.

Cada sócio ativa a 2FA em `/admin/conta`. A exigência só passa a valer depois que o
primeiro código é confirmado — quem escaneia o QR e desiste não fica trancado para fora.
Desativar exige a senha de novo, mesmo com sessão aberta.

O segredo do TOTP é o único dado que **não pode** ser hasheado: o servidor precisa dele em
claro para calcular o código esperado. Por isso vai para o banco cifrado em AES-256-GCM,
com chave derivada do `ADMIN_JWT_SECRET`, que mora fora do banco — um dump vazado sozinho
não gera códigos válidos.

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
