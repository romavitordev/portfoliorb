# O que falta para o site ir ao ar

Formato emprestado do `INFORMACOES-PENDENTES.md` do Marcelo Imóveis: cada
item diz **onde está hoje**, **o que está no lugar** e **o risco de
publicar assim**.

**Legenda de risco**
🔴 trava o lançamento · 🟠 publica, mas prejudica · 🟢 melhoria

---

## 1. Contato 🔴

| | |
|---|---|
| **Onde** | `lib/site.ts` → `brand.whatsapp`, `brand.email`, `brand.instagram` |
| **Hoje** | `5515991234567` (inventado), `contato@romabuganza.com.br` (não existe), Instagram apontando pra home do site |
| **Risco** | **Todo** CTA do site cai num número que não é de vocês. Orçamento, "falar sobre o plano" e "quero algo assim" — todos. Um site que não consegue receber contato não deveria estar no ar. |

**Respostas:**
- WhatsApp real (só dígitos, com 55): `_______________`
- E-mail: `_______________`
- Instagram: `_______________`

---

## 2. Nome e domínio 🔴

| | |
|---|---|
| **Onde** | `lib/site.ts` → `brand.nome` · `NEXT_PUBLIC_SITE_URL` |
| **Hoje** | "Roma & Buganza", declarado provisório |
| **Risco** | Nome trava domínio, e-mail e logo — os três de uma vez. Trocar depois de indexado custa SEO. |

**Decisão:** manter · mudar para `_______________`

---

## 3. Imagens dos projetos 🟠

| | |
|---|---|
| **Onde** | `lib/projetos.ts` → campo `imagem` dos 8 projetos |
| **Hoje** | 8 de 8 são banco de imagens (Unsplash). Uma **floresta** ilustra o Fisgou. |
| **Risco** | O catálogo agora mostra a imagem em destaque no hover, então a foto genérica ficou mais visível que antes. Um estúdio que mostra foto de banco no próprio portfólio contradiz o que vende. |

**O ideal:** screenshot real de cada projeto (1200×900 ou maior).

---

## 4. Foto do estúdio 🟠

| | |
|---|---|
| **Onde** | `lib/site.ts` → `imagens.estudio` · usada em `/estudio` |
| **Hoje** | Dupla genérica de banco de imagens |
| **Risco** | A página inteira fala em "quem atende é quem faz" — com foto de gente que não é vocês. |

---

## 5. Perfis do Marcelo 🟠

| | |
|---|---|
| **Onde** | `lib/site.ts` → `socios[1].links` |
| **Hoje** | LinkedIn genérico (`linkedin.com`), cai na home do LinkedIn |
| **Risco** | Link quebrado em página de apresentação pessoal. |

**Respostas:** LinkedIn `_______________` · GitHub `_______________`

---

## 6. Números da home 🟠

| | |
|---|---|
| **Onde** | `lib/site.ts` → `numeros` |
| **Hoje** | Conferir se cada número é verificável |
| **Risco** | Número inflado em site de serviço é problema de CDC, não só de imagem. |

---

## 7. Melhorias 🟢

- **Analytics** — não existe nenhum. Sem isso não dá pra saber qual projeto atrai interesse nem de onde vem o tráfego. O Marcelo Imóveis tem `lib/analytics.ts` com dedupe por hash e sem gravar IP (LGPD), adaptável aqui.
- **Testes** — hoje só `tests/admin-guard.test.ts`. `lib/ratelimit.ts` e `lib/totp.ts` não têm cobertura.
- **Docs de deploy** — o Marcelo Imóveis tem `DEPLOY.md` e `CHECKLIST-DEPLOY.md`; aqui não há.

---

## Resumo: o que trava o lançamento

1. **WhatsApp real** (item 1) — sozinho já torna o site utilizável
2. **Decisão do nome** (item 2) — destrava domínio, e-mail e logo

O resto publica e melhora depois.
