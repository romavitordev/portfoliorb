/**
 * Grão de filme — overlay fixo de ruído sobre o site todo.
 * SVG fractalNoise embutido (sem asset externo, funciona em static export),
 * tile pequeno pra ser barato, mix-blend soft-light em opacidade baixa.
 * Decorativo e estático — não precisa desligar em reduced-motion.
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.06] mix-blend-soft-light"
      style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: '140px 140px' }}
    />
  )
}
