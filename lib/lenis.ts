import type Lenis from 'lenis'

/**
 * Referência única da instância do Lenis, publicada pelo LenisProvider.
 * Existe porque o scroll suave é sequestrado pelo Lenis: chamar
 * `scrollIntoView({ behavior: 'smooth' })` briga com ele e resulta num
 * salto seco. Quem quiser rolar programaticamente usa `rolarPara()`.
 */
let instancia: Lenis | null = null

export function registrarLenis(l: Lenis | null) {
  instancia = l
}

/** Altura da navbar fixa — o alvo para embaixo dela. */
const OFFSET_HEADER = -80

/**
 * Rola até um elemento por id. Cai no scroll nativo quando o Lenis não
 * está ativo (reduced-motion, ou antes da hidratação).
 */
export function rolarPara(id: string) {
  const alvo = document.getElementById(id)
  if (!alvo) return false

  if (instancia) {
    instancia.scrollTo(alvo, { offset: OFFSET_HEADER, duration: 1.1 })
  } else {
    const y = alvo.getBoundingClientRect().top + window.scrollY + OFFSET_HEADER
    window.scrollTo({
      top: y,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }
  return true
}
