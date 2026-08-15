/**
 * Cria (ou atualiza a senha de) um sócio com acesso ao painel.
 *
 *   npm run usuario -- "vitor@romabuganza.com.br" "Vitor Roma" "senha-forte"
 *
 * Rodar de novo com o mesmo e-mail troca a senha — é também o jeito de
 * recuperar acesso se alguém esquecer a dela.
 *
 * A senha vai para o banco em scrypt; em texto puro ela não fica em
 * lugar nenhum, nem aqui nem no .env.
 */
import { randomBytes, scrypt } from 'node:crypto'
import { promisify } from 'node:util'
import { PrismaClient } from '@prisma/client'

const scryptAsync = promisify(scrypt)
const prisma = new PrismaClient()

const args = process.argv.slice(2)

/**
 * Exige exatamente 3 argumentos.
 *
 * Sem isso, um nome com espaço que perca as aspas no caminho
 * (shell → npm → node) vira dois argumentos: o sobrenome escorrega para
 * a posição da senha e a conta nasce com nome e senha errados, sem
 * nenhum aviso. Melhor falhar alto.
 */
if (args.length !== 3) {
  console.error(
    `\nEsperava 3 argumentos, recebi ${args.length}: ${JSON.stringify(args)}\n\n` +
      'Uso: npm run usuario -- "email@dominio.com" "Nome Sobrenome" "senha-forte"\n\n' +
      'Se o nome tem espaço, mantenha as aspas.\n',
  )
  process.exit(1)
}

const [email, nome, senha] = args

if (!/\S+@\S+\.\S+/.test(email)) {
  console.error('E-mail inválido.')
  process.exit(1)
}

if (senha.length < 10) {
  console.error('Use pelo menos 10 caracteres — esta senha protege o painel inteiro.')
  process.exit(1)
}

const sal = randomBytes(16).toString('hex')
const hash = await scryptAsync(senha, sal, 64)
const senhaHash = `${sal}:${hash.toString('hex')}`

const emailNormalizado = email.trim().toLowerCase()

const existente = await prisma.usuario.findUnique({ where: { email: emailNormalizado } })

const usuario = await prisma.usuario.upsert({
  where: { email: emailNormalizado },
  update: { senhaHash, nome },
  create: { email: emailNormalizado, nome, senhaHash },
})

console.log(
  existente
    ? `\nSenha de ${usuario.nome} (${usuario.email}) atualizada.\n`
    : `\nUsuário criado: ${usuario.nome} — ${usuario.email}\n` +
        'Entre em /admin/login e ative a 2FA em /admin/conta.\n',
)

await prisma.$disconnect()
