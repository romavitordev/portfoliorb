/**
 * `npm run up` — sobe tudo de uma vez.
 *
 * O que ele faz, em ordem:
 *   1. cria o .env na primeira execução (com segredo gerado na hora);
 *   2. sincroniza o schema do banco e gera o Prisma Client;
 *   3. cria um usuário de desenvolvimento, se ainda não houver nenhum;
 *   4. sobe, em paralelo, o Next (front + API) e o Prisma Studio.
 *
 * No Next o back-end e o front-end são o MESMO processo — as rotas de
 * `app/api` rodam no mesmo servidor que serve as páginas. Por isso "os
 * três" aqui são: Next (3000), Prisma Studio (5555) e o banco, que em
 * dev é um arquivo SQLite e não precisa de servidor.
 *
 * Ctrl+C derruba os dois processos juntos.
 */
import { spawn } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { randomBytes, scrypt } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify(scrypt)

const NO_WINDOWS = process.platform === 'win32'

/**
 * Chama os binários pelo entrypoint JS, com o próprio Node.
 *
 * `npx` e os atalhos de node_modules/.bin são .cmd no Windows, e o Node
 * recente recusa executá-los sem `shell: true` (EINVAL). Ligar o shell
 * resolveria, mas dispara DeprecationWarning e concatena argumentos sem
 * escapar. Apontar direto para o .js evita os dois problemas e funciona
 * igual em Windows, Linux e macOS.
 */
const PRISMA = 'node_modules/prisma/build/index.js'
const NEXT = 'node_modules/next/dist/bin/next'
const cor = {
  clay: (s) => `\x1b[38;5;209m${s}\x1b[0m`,
  cinza: (s) => `\x1b[90m${s}\x1b[0m`,
  verde: (s) => `\x1b[32m${s}\x1b[0m`,
  vermelho: (s) => `\x1b[31m${s}\x1b[0m`,
  negrito: (s) => `\x1b[1m${s}\x1b[0m`,
}

function passo(texto) {
  console.log(`${cor.clay('▸')} ${texto}`)
}

/** Roda um comando até o fim. Rejeita se sair com código != 0. */
function rodar(comando, args, { silencioso = false } = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(comando, args, {
      stdio: silencioso ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    })
    let saida = ''
    if (silencioso) {
      p.stdout?.on('data', (d) => (saida += d))
      p.stderr?.on('data', (d) => (saida += d))
    }
    p.on('close', (codigo) =>
      codigo === 0 ? resolve(saida) : reject(new Error(saida || `${comando} saiu com ${codigo}`)),
    )
    p.on('error', reject)
  })
}

/* ------------------------------------------------------------------ */
/* 1. .env                                                             */
/* ------------------------------------------------------------------ */

function lerEnv() {
  if (!existsSync('.env')) return {}
  const texto = readFileSync('.env', 'utf8')
  const vars = {}
  for (const linha of texto.split('\n')) {
    const m = linha.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/)
    if (m) vars[m[1]] = m[2].trim().replace(/^["']|["']$/g, '')
  }
  return vars
}

function criarEnv() {
  const segredo = randomBytes(48).toString('base64url')
  const conteudo = `# Gerado por \`npm run up\` na primeira execução.
# Está no .gitignore — não vai para o repositório.

# SQLite: nenhuma instalação necessária. Em produção, troque por uma URL
# de Postgres (Neon) e rode \`npm run db:push\`.
DATABASE_URL="file:./dev.db"

# Assina a sessão do painel E cifra o segredo da 2FA no banco.
# Trocar depois que alguém ativou a 2FA obriga a reativar.
ADMIN_JWT_SECRET="${segredo}"

# Aviso de lead novo. Sem estes valores o lead é salvo e o aviso cai no log.
RESEND_API_KEY=""
EMAIL_DESTINO=""
`
  writeFileSync('.env', conteudo, 'utf8')
}

/* ------------------------------------------------------------------ */
/* 2. banco                                                            */
/* ------------------------------------------------------------------ */

async function prepararBanco(url) {
  const ehSqlite = url.startsWith('file:')

  const node = process.execPath

  if (ehSqlite) {
    passo(`banco ${cor.cinza('(SQLite, arquivo local)')}`)
    await rodar(node, ['scripts/schema-dev.mjs'], { silencioso: true })
    await rodar(
      node,
      [PRISMA, 'db', 'push', '--schema', 'prisma/schema.dev.prisma', '--skip-generate'],
      { silencioso: true },
    )
    await rodar(node, [PRISMA, 'generate', '--schema', 'prisma/schema.dev.prisma'], {
      silencioso: true,
    })
  } else {
    passo(`banco ${cor.cinza('(Postgres)')}`)
    await rodar(node, [PRISMA, 'db', 'push', '--skip-generate'], { silencioso: true })
    await rodar(node, [PRISMA, 'generate'], { silencioso: true })
  }

  return ehSqlite
}

/* ------------------------------------------------------------------ */
/* 3. usuário de desenvolvimento                                       */
/* ------------------------------------------------------------------ */

/**
 * Cria um acesso na primeira execução para o painel não ficar
 * inalcançável. Só em SQLite — nunca mexe num banco de produção.
 */
async function garantirUsuario(ehSqlite) {
  const { PrismaClient } = await import('@prisma/client')
  const prisma = new PrismaClient()

  try {
    const quantos = await prisma.usuario.count()
    if (quantos > 0) return null
    if (!ehSqlite) {
      return { aviso: 'Nenhum usuário no banco. Crie com: npm run usuario -- "email" "Nome" "senha"' }
    }

    const email = 'dev@local'
    const senha = 'dev-' + randomBytes(6).toString('hex')
    const sal = randomBytes(16).toString('hex')
    const hash = await scryptAsync(senha, sal, 64)

    await prisma.usuario.create({
      data: { email, nome: 'Dev Local', senhaHash: `${sal}:${hash.toString('hex')}` },
    })

    return { email, senha }
  } finally {
    await prisma.$disconnect()
  }
}

/* ------------------------------------------------------------------ */
/* 4. subir os processos                                               */
/* ------------------------------------------------------------------ */

function subir(nome, comando, args, pintar) {
  const p = spawn(comando, args, {
    stdio: ['ignore', 'pipe', 'pipe'],
    // Em Unix, o próprio grupo permite derrubar a árvore com um sinal só.
    detached: !NO_WINDOWS,
  })
  const prefixo = pintar(nome.padEnd(6))

  const escrever = (fluxo) => (dado) => {
    for (const linha of dado.toString().split('\n')) {
      if (linha.trim()) fluxo.write(`${prefixo} ${cor.cinza('│')} ${linha}\n`)
    }
  }

  p.stdout.on('data', escrever(process.stdout))
  p.stderr.on('data', escrever(process.stderr))
  return p
}

/* ------------------------------------------------------------------ */

console.log(`\n${cor.negrito('Roma & Buganza')} ${cor.cinza('— subindo o ambiente')}\n`)

let env = lerEnv()

if (!existsSync('.env')) {
  passo(`${cor.verde('.env criado')} ${cor.cinza('(segredo gerado agora)')}`)
  criarEnv()
  env = lerEnv()
} else if (!env.ADMIN_JWT_SECRET || env.ADMIN_JWT_SECRET.length < 32) {
  console.error(
    cor.vermelho('\nADMIN_JWT_SECRET ausente ou curto demais no .env (mínimo 32 caracteres).'),
  )
  console.error(
    cor.cinza('Gere com: node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'base64url\'))"\n'),
  )
  process.exit(1)
}

const url = env.DATABASE_URL
if (!url) {
  console.error(cor.vermelho('\nDATABASE_URL ausente no .env.\n'))
  process.exit(1)
}

let ehSqlite
try {
  ehSqlite = await prepararBanco(url)
} catch (e) {
  console.error(cor.vermelho('\nFalha ao preparar o banco:\n'))
  console.error(e.message)
  if (!url.startsWith('file:')) {
    console.error(
      cor.cinza('\nSem Postgres à mão? Troque DATABASE_URL para "file:./dev.db" no .env.\n'),
    )
  }
  process.exit(1)
}

const acesso = await garantirUsuario(ehSqlite)

passo('next  ' + cor.cinza('http://localhost:3000') + cor.cinza('  (front + API)'))
passo('studio' + cor.cinza(' http://localhost:5555') + cor.cinza('  (banco)'))

if (acesso?.email) {
  console.log(
    `\n${cor.clay('▸')} acesso ao painel criado ${cor.cinza('(só nesta primeira vez)')}\n` +
      `  ${cor.cinza('e-mail:')} ${acesso.email}\n` +
      `  ${cor.cinza('senha :')} ${cor.negrito(acesso.senha)}\n` +
      `  ${cor.cinza('anote — ela não será mostrada de novo. Troque em /admin/conta.')}`,
  )
} else if (acesso?.aviso) {
  console.log(`\n${cor.vermelho('▸')} ${acesso.aviso}`)
}

console.log(cor.cinza('\n  Ctrl+C derruba os dois.\n'))

const next = subir('next', process.execPath, [NEXT, 'dev'], cor.clay)
const studio = subir(
  'studio',
  process.execPath,
  ehSqlite
    ? [PRISMA, 'studio', '--schema', 'prisma/schema.dev.prisma', '--browser', 'none']
    : [PRISMA, 'studio', '--browser', 'none'],
  cor.cinza,
)

let encerrando = false

/**
 * Derruba a ÁRVORE de processos, não só o filho direto.
 *
 * `next dev` e o Prisma Studio abrem processos próprios. No Windows,
 * matar o filho deixa os netos vivos segurando as portas 3000 e 5555 —
 * e o próximo `npm run up` falha com "porta em uso". `taskkill /T` mata
 * a árvore inteira; em Unix o mesmo papel é do sinal no grupo.
 */
function matarArvore(p) {
  if (!p.pid || p.killed) return
  if (NO_WINDOWS) {
    spawn('taskkill', ['/pid', String(p.pid), '/T', '/F'], { stdio: 'ignore' })
  } else {
    try {
      process.kill(-p.pid, 'SIGTERM')
    } catch {
      p.kill('SIGTERM')
    }
  }
}

function encerrar() {
  if (encerrando) return
  encerrando = true
  console.log(cor.cinza('\n\n  encerrando…\n'))
  for (const p of [next, studio]) matarArvore(p)
  // Dá um instante pro taskkill agir antes de o processo pai sumir.
  setTimeout(() => process.exit(0), 600)
}

process.on('SIGINT', encerrar)
process.on('SIGTERM', encerrar)

// Se um cair, derruba o outro — ambiente pela metade só confunde.
next.on('close', encerrar)
studio.on('close', encerrar)
