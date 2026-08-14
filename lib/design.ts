/**
 * Tokens de MOTION compartilhados — consumidos por Framer Motion, GSAP e CSS.
 * Fonte única de verdade pra durações, easings e parâmetros de reveal/stagger,
 * pra que toda animação do site tenha o mesmo "ritmo".
 */

/** Curvas de easing (formato cubic-bezier — Framer aceita o array direto). */
export const ease = {
  /** Saída suave e cinematográfica — padrão de reveals. */
  outExpo: [0.16, 1, 0.3, 1] as const,
  /** Cortinas / transições de rota. */
  cortina: [0.76, 0, 0.24, 1] as const,
  /** Suave nos dois lados. */
  inOut: [0.65, 0, 0.35, 1] as const,
}

/** Versões string das curvas (pra usar em CSS inline / style). */
export const easeCss = {
  outExpo: 'cubic-bezier(0.16,1,0.3,1)',
  cortina: 'cubic-bezier(0.76,0,0.24,1)',
} as const

/** Durações (segundos) — escala única. */
export const dur = {
  fast: 0.15,
  base: 0.25,
  slow: 0.5,
  cine: 0.8,
} as const

/** Parâmetros padrão de reveal/stagger (entrada na viewport). */
export const reveal = {
  y: 28,
  duration: 0.8,
  stagger: 0.08,
  ease: ease.outExpo,
  viewport: { once: true, margin: '-60px' as const },
}
