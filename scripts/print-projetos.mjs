/**
 * Captura a tela inicial de cada projeto do catálogo e grava em
 * public/projetos/<slug>.png.
 *
 * Por que não `chrome --headless --screenshot`: vários projetos têm
 * preloader (Sereno, Baltazar), e o `--virtual-time-budget` não avança
 * essas animações — o print saía na tela de carregamento, com o contador
 * em 086. Aqui a espera é em tempo real, depois da rede sossegar.
 *
 * Usa puppeteer-core apontando pro Chrome já instalado, então não baixa
 * um Chromium de 150MB só pra isso.
 *
 * Uso:  npm run print:projetos
 */
import { readFileSync, mkdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

const CHROMES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
]

/**
 * Exceções por projeto.
 *
 * `url`     — quando o `demo` do catálogo não aponta pra tela certa (por
 *             exemplo, um GitHub Pages que abre o README em vez do app).
 * `rolar`   — pixels a rolar antes do print, pra fugir de uma dobra ruim.
 * `ocultar` — seletores a esconder antes de capturar. Existe pra tirar
 *             sobreposição que serve ao VISITANTE da demo mas atrapalha
 *             no catálogo: aviso de vitrine, banner de cookie, faixa de
 *             ambiente. A imagem deve mostrar o produto, não o recado.
 */
const EXCECOES = {
  'motor-de-reservas': {
    // A vitrine avisa no rodapé que não há backend. Correto lá; no print
    // do catálogo só rouba espaço do que interessa.
    ocultar: ['[role="note"]'],
  },
}

const LARGURA = 1440
const ALTURA = 1080 // 4:3 — proporção mais usada nos cards do portfólio
const ESPERA_EXTRA = 4500 // preloader + animação de entrada

/*
  WebP em vez de PNG: os prints saíam com 4,9 MB somados, e o site usa
  `images: { unoptimized: true }` (o otimizador do Next precisa de
  servidor) — o arquivo cru é exatamente o que o visitante baixa.
*/
const FORMATO = 'webp'
const QUALIDADE = 82

function acharChrome() {
  const achado = CHROMES.find((p) => existsSync(p))
  if (!achado) throw new Error('Chrome não encontrado. Ajuste CHROMES.')
  return achado
}

/**
 * Lê slug + demo direto do catálogo, pra lista nunca sair de sincronia.
 *
 * O par é montado DENTRO do bloco de cada projeto, não por índice entre
 * duas listas. A versão anterior fazia `slugs[i]` com `demos[i]`, o que
 * só funciona enquanto TODO projeto tem demo — o primeiro projeto sem
 * demo desloca todos os seguintes, e o script grava o print de um
 * projeto no arquivo de outro. Sem erro, sem aviso.
 */
function alvos() {
  const src = readFileSync('lib/projetos.ts', 'utf-8')

  // Cada bloco vai de um `slug:` até o próximo (ou até o fim do arquivo).
  const blocos = src.split(/(?=\n\s*slug:\s*')/).slice(1)

  return blocos
    .map((bloco) => {
      const slug = bloco.match(/slug:\s*'([^']+)'/)?.[1]
      const demo = bloco.match(/demo:\s*'([^']+)'/)?.[1]
      if (!slug) return null
      const excecao = EXCECOES[slug] ?? {}
      return {
        slug,
        url: excecao.url ?? demo,
        rolar: excecao.rolar ?? 0,
        ocultar: excecao.ocultar ?? [],
      }
    })
    .filter((a) => a && a.url)
}

/**
 * Filtro por slug: `npm run print:projetos -- motor-de-reservas`.
 *
 * Sem ele, corrigir UM print re-captura os oito — e como os sites sao vivos,
 * os outros sete voltam levemente diferentes (banner novo, foto trocada,
 * preco atualizado). Isso vira ruido no diff e mexe em imagem que ninguem
 * pediu pra mexer.
 */
const filtro = process.argv.slice(2).filter((a) => !a.startsWith('-'))

const destino = path.join('public', 'projetos')
mkdirSync(destino, { recursive: true })

const navegador = await puppeteer.launch({
  executablePath: acharChrome(),
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
})

const escolhidos = alvos().filter((a) => filtro.length === 0 || filtro.includes(a.slug))

if (filtro.length && !escolhidos.length) {
  console.log(`Nenhum projeto com demo bate com: ${filtro.join(', ')}`)
}

for (const { slug, url, rolar, ocultar } of escolhidos) {
  const pagina = await navegador.newPage()
  await pagina.setViewport({ width: LARGURA, height: ALTURA, deviceScaleFactor: 1 })

  try {
    await pagina.goto(url, { waitUntil: 'networkidle2', timeout: 60_000 })
    await new Promise((r) => setTimeout(r, ESPERA_EXTRA))

    // Alguns projetos travam o scroll durante o preloader; se sobrou
    // trava, o print sai correto mesmo assim, mas a rolagem é liberada
    // pra garantir que animações de entrada já dispararam.
    await pagina.evaluate(
      (y, seletores) => {
        document.documentElement.classList.remove('trava-scroll')
        document.body.style.overflow = 'auto'
        window.scrollTo(0, 1)
        window.scrollTo(0, y)
        for (const sel of seletores) {
          document.querySelectorAll(sel).forEach((el) => el.remove())
        }
      },
      rolar,
      ocultar,
    )
    await new Promise((r) => setTimeout(r, 900))

    const arquivo = path.join(destino, `${slug}.${FORMATO}`)
    await pagina.screenshot({ path: arquivo, type: FORMATO, quality: QUALIDADE })
    console.log(`  ok    ${slug}`)
  } catch (e) {
    console.log(`  FALHA ${slug}: ${e.message}`)
  } finally {
    await pagina.close()
  }
}

await navegador.close()
