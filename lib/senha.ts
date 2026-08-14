import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify(scrypt) as (
  senha: string,
  sal: string,
  tamanho: number,
) => Promise<Buffer>

/**
 * Hash de senha com scrypt do próprio Node — sem dependência extra.
 * Formato guardado: "sal:hash", ambos em hex.
 */
export async function gerarHash(senha: string) {
  const sal = randomBytes(16).toString('hex')
  const hash = await scryptAsync(senha, sal, 64)
  return `${sal}:${hash.toString('hex')}`
}

/**
 * Confere a senha em tempo constante. Retorna false (em vez de lançar)
 * quando o hash está malformado ou ausente.
 */
export async function conferirSenha(senha: string, guardado: string | undefined) {
  if (!guardado) return false

  const [sal, hashHex] = guardado.split(':')
  if (!sal || !hashHex) return false

  try {
    const esperado = Buffer.from(hashHex, 'hex')
    const obtido = await scryptAsync(senha, sal, esperado.length)
    return esperado.length === obtido.length && timingSafeEqual(esperado, obtido)
  } catch {
    return false
  }
}
