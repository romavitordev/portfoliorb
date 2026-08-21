# O que falta para o site ir ao ar

Cada item diz **onde está hoje**, **o que está no lugar** e **o risco de
publicar assim**. Formato emprestado do `INFORMACOES-PENDENTES.md` do
Marcelo Imóveis.

**Legenda de risco**
🔴 trava o lançamento · 🟠 publica, mas prejudica · 🟢 melhoria

---

## 1. Contato 🟠

| | |
|---|---|
| **Onde** | `lib/site.ts` → `brand.whatsapp`, `brand.email`, `brand.instagram` |
| **Hoje** | WhatsApp ✅ `5515991023998` · e-mail `contato@romabuganza.com.br` (não existe) · Instagram apontando pra home do site |
| **Risco** | O WhatsApp está resolvido, e como todo caminho do site leva a ele, **o site já recebe contato**. Faltam e-mail e Instagram, que aparecem na seção de contato e no rodapé com destino errado. |

**Respostas:**
- ~~WhatsApp~~ ✅ resolvido
- E-mail: `_______________`
- Instagram: `_______________`

---

## 2. Nome e domínio 🔴

| | |
|---|---|
| **Onde** | `lib/site.ts` → `brand.nome` · variável `NEXT_PUBLIC_SITE_URL` |
| **Hoje** | "Roma & Buganza", declarado provisório |
| **Risco** | Nome trava domínio, e-mail e logo de uma vez. Trocar depois de indexado custa SEO. |

**Decisão:** manter · mudar para `_______________`

---

## 3. Demo do Rafael Pedroso com placeholders 🟠

| | |
|---|---|
| **Onde** | print em `public/projetos/rafael-pedroso-advocacia.webp` |
| **Hoje** | A demo mostra `[CIDADE]/SP`, `([DDD]) 9 [NUMERO]`, `[EMAIL]`, `OAB/SP [NUMERO_OAB]` e uma moldura de foto vazia |
| **Risco** | O print veio da demo publicada, então o portfólio exibe trabalho inacabado. Preencher a demo e rodar `npm run print:projetos` resolve. |

---

## 4. Foto do estúdio 🟠

| | |
|---|---|
| **Onde** | `lib/site.ts` → `imagens.estudio` |
| **Hoje** | Dupla genérica de banco de imagens |
| **Risco** | A seção diz "quem atende é quem faz" — com foto de gente que não é vocês. |

---

## 5. Perfis do Marcelo 🟠

| | |
|---|---|
| **Onde** | `lib/site.ts` → `socios[1].links` |
| **Hoje** | LinkedIn genérico, cai na home do LinkedIn |
| **Risco** | Link quebrado na apresentação pessoal. |

**Respostas:** LinkedIn `_______________` · GitHub `_______________`

---

## 6. Números da home 🟠

| | |
|---|---|
| **Onde** | `lib/site.ts` → `numeros` |
| **Risco** | Número inflado em site de serviço é questão de CDC, não só de imagem. Conferir se cada um é verificável. |

---

## 7. Melhorias 🟢

- **Analytics** — não existe. Sem servidor, a saída é algo client-side e leve (Plausible, Umami ou GoatCounter). Sem isso não dá pra saber qual projeto atrai interesse.
- **Domínio próprio no Pages** — GitHub Pages aceita domínio customizado. Depende do item 2.

---

## Resumo: o que trava o lançamento

Sobrou **um**: a **decisão do nome** (item 2), que destrava domínio,
e-mail e logo de uma vez.

O WhatsApp já está no ar, então o site é utilizável hoje — alguém pode
entrar, ver os projetos e chamar vocês.

---

## Como o site está montado hoje

- **Estático**, sem servidor nem banco. Publica no GitHub Pages pelo
  workflow em `.github/workflows/deploy.yml`.
- **Uma página** (`/`) com tudo em rolagem e âncoras, mais **7 páginas de
  case** em `/projetos/[slug]`.
- **Formulário** não envia nada: valida, monta a mensagem e abre o
  WhatsApp. O campo `site` é honeypot anti-spam e deve ficar vazio.
- **Prints dos projetos** são gerados por `npm run print:projetos`.
- O painel de leads, a API e o Prisma foram removidos e estão preservados
  na branch **`com-painel`**.
