/**
 * Deriva prisma/schema.dev.prisma (SQLite) do schema de produção.
 *
 * Existe para rodar o banco em dev sem instalar Postgres. A única coisa
 * que muda é o `provider` — o resto do schema é o mesmo arquivo, então
 * não há dois modelos para manter em sincronia.
 *
 * Chamado por `npm run db:dev`. O arquivo gerado é descartável e está no
 * .gitignore.
 */
import { readFile, writeFile } from 'node:fs/promises'

const ORIGEM = 'prisma/schema.prisma'
const DESTINO = 'prisma/schema.dev.prisma'

const original = await readFile(ORIGEM, 'utf8')

if (!original.includes('provider = "postgresql"')) {
  console.error(`Esperava provider = "postgresql" em ${ORIGEM}. Nada foi gerado.`)
  process.exit(1)
}

const dev =
  '// GERADO por scripts/schema-dev.mjs — não edite. Edite prisma/schema.prisma.\n' +
  original.replace('provider = "postgresql"', 'provider = "sqlite"')

await writeFile(DESTINO, dev, 'utf8')

console.log(`${DESTINO} gerado (SQLite).`)
