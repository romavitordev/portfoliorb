/**
 * Gera o cartão social (Open Graph) a partir de scripts/og/cartao.html.
 *
 * Por que não uma foto: o cartão é o que aparece quando alguém compartilha
 * o link no WhatsApp ou LinkedIn. Uma foto de banco ali diz "genérico"
 * justo no momento em que a marca está sendo passada adiante.
 *
 * Por que não o `opengraph-image.tsx` do Next: ele exige edge runtime, que
 * o export estático não suporta — foi removido quando o site virou
 * estático. Renderizar HTML com o Chrome dá o mesmo resultado e roda no
 * mesmo lugar que o script dos prints.
 *
 * Uso:  npm run og
 */
import { mkdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import puppeteer from 'puppeteer-core'

const CHROMES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
]

// Tamanho canônico do Open Graph. Facebook, WhatsApp, LinkedIn e X
// recortam a partir de 1200x630 — sair disso vira corte imprevisível.
const LARGURA = 1200
const ALTURA = 630

const chrome = CHROMES.find((p) => existsSync(p))
if (!chrome) throw new Error('Chrome não encontrado. Ajuste CHROMES.')

const navegador = await puppeteer.launch({
  executablePath: chrome,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
})

const pagina = await navegador.newPage()
await pagina.setViewport({ width: LARGURA, height: ALTURA, deviceScaleFactor: 1 })

const modelo = pathToFileURL(path.resolve('scripts/og/cartao.html')).href
await pagina.goto(modelo, { waitUntil: 'networkidle0', timeout: 60_000 })

// As fontes vêm do Google e chegam depois do networkidle em alguns casos.
// Sem esperar, o cartão sai renderizado na fonte de fallback.
await pagina.evaluate(() => document.fonts.ready)
await new Promise((r) => setTimeout(r, 600))

mkdirSync('public', { recursive: true })
await pagina.screenshot({ path: path.join('public', 'og.png') })

await navegador.close()
console.log('  gerado: public/og.png')
