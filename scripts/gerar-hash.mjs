/**
 * Gera o hash scrypt da senha do painel.
 *
 *   node scripts/gerar-hash.mjs "sua-senha-forte"
 *
 * Copie a saída para ADMIN_SENHA_HASH no .env (e nas variáveis de
 * ambiente da Vercel). A senha em texto puro não fica em lugar nenhum.
 */
import { randomBytes, scrypt } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify(scrypt)

const senha = process.argv[2]

if (!senha) {
  console.error('Uso: node scripts/gerar-hash.mjs "sua-senha-forte"')
  process.exit(1)
}

if (senha.length < 10) {
  console.error('Use pelo menos 10 caracteres — este hash protege o painel inteiro.')
  process.exit(1)
}

const sal = randomBytes(16).toString('hex')
const hash = await scryptAsync(senha, sal, 64)

console.log(`\nADMIN_SENHA_HASH="${sal}:${hash.toString('hex')}"\n`)
