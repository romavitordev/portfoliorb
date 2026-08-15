import 'server-only'
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'
import { generateSecret, generateURI, verifySync } from 'otplib'
import { toDataURL } from 'qrcode'

import { brand } from '@/lib/site'

/**
 * 2FA por TOTP (Google Authenticator, Authy, 1Password) para o painel.
 *
 * Fluxo: gerar segredo → mostrar QR → o sócio confirma o primeiro código
 * → `totpAtivoEm` é gravado e o login passa a exigir os 6 dígitos além
 * da senha. Só depois da confirmação a 2FA é exigida, senão alguém que
 * escaneasse o QR e desistisse ficaria trancado para fora.
 */

/* ---------------- segredo cifrado em repouso ----------------------- */

/**
 * A senha vai para o banco em scrypt (irreversível), mas o segredo do
 * TOTP NÃO pode ser hasheado: o servidor precisa dele em claro para
 * calcular o código esperado. Guardar em texto puro significa que uma
 * cópia do banco (backup vazado, réplica, leitura por injection) gera
 * códigos válidos para sempre.
 *
 * Por isso ele é cifrado com AES-256-GCM, e a chave deriva do
 * ADMIN_JWT_SECRET — que mora nas variáveis de ambiente, FORA do banco.
 * Um dump sozinho não basta: precisaria do banco E do segredo do servidor.
 *
 * Formato: "v1:<iv>:<tag>:<dados>", tudo em base64.
 */
const PREFIXO = 'v1:'

function chaveDeCifra() {
  const segredo = process.env.ADMIN_JWT_SECRET
  if (!segredo) throw new Error('ADMIN_JWT_SECRET ausente — necessário para cifrar a 2FA.')
  return createHash('sha256').update(segredo).digest()
}

export function cifrarSegredo(claro: string) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', chaveDeCifra(), iv)
  const dados = Buffer.concat([cipher.update(claro, 'utf8'), cipher.final()])
  return [
    PREFIXO + iv.toString('base64'),
    cipher.getAuthTag().toString('base64'),
    dados.toString('base64'),
  ].join(':')
}

/**
 * Devolve o segredo em claro, ou null quando a decifragem falha — o que
 * acontece se o ADMIN_JWT_SECRET mudou depois da ativação. O chamador
 * trata null como "não confere", NUNCA como "pode entrar".
 */
export function decifrarSegredo(guardado: string): string | null {
  if (!guardado.startsWith(PREFIXO)) return null
  try {
    const [ivB64, tagB64, dadosB64] = guardado.slice(PREFIXO.length).split(':')
    const decipher = createDecipheriv('aes-256-gcm', chaveDeCifra(), Buffer.from(ivB64, 'base64'))
    decipher.setAuthTag(Buffer.from(tagB64, 'base64'))
    return (
      decipher.update(Buffer.from(dadosB64, 'base64')).toString('utf8') + decipher.final('utf8')
    )
  } catch (e) {
    console.error('[totp] não foi possível decifrar o segredo:', e)
    return null
  }
}

/* ---------------- geração e verificação ---------------------------- */

export function gerarSegredoTotp() {
  return generateSecret()
}

/**
 * Valida 6 dígitos contra o segredo em claro. Tolera o período vizinho
 * (±30s) para relógio levemente fora de hora — celular dessincronizado é
 * a causa mais comum de "meu código não funciona". Nunca lança.
 */
export function verificarCodigoTotp(codigo: string, segredoClaro: string) {
  const token = codigo.replace(/\D/g, '')
  if (token.length !== 6) return false

  const agora = Math.floor(Date.now() / 1000)
  for (const epoch of [agora, agora - 30, agora + 30]) {
    try {
      if (verifySync({ secret: segredoClaro, token, epoch }).valid) return true
    } catch {
      // segredo malformado etc. — segue para o próximo, ou false no fim
    }
  }
  return false
}

/** QR code (data URL PNG) do otpauth:// para o app autenticador. */
export async function qrCodeTotp(email: string, segredoClaro: string) {
  const otpauth = generateURI({ issuer: brand.nome, label: email, secret: segredoClaro })
  return toDataURL(otpauth, { margin: 1, width: 220 })
}
