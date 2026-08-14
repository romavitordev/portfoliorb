import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Tela — carvão quente (base do Claude design em modo escuro)
        carvao: '#141311',
        grafite: '#1D1B18', // superfícies/cards elevados
        linha: '#2C2823', // hairlines
        // Texto
        creme: '#F0EEE6',
        poeira: '#A8A096', // muted — ~5.4:1 sobre carvão
        // Acento — clay. Só em acento.
        clay: '#D97757',
        terra: '#B85C38', // clay profundo (gradientes/hover)
        argila: '#E9A48A', // clay claro (realce, halos)
      },
      fontFamily: {
        display: ['var(--font-instrument)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '72rem',
        wide: '80rem',
      },
      transitionTimingFunction: {
        saida: 'cubic-bezier(.16,1,.3,1)',
        expo: 'cubic-bezier(.16,1,.3,1)',
        cortina: 'cubic-bezier(.76,0,.24,1)',
      },
      boxShadow: {
        // Elevação pra UI escura: hairline interna + profundidade difusa.
        'elev-1': '0 1px 0 0 rgba(240,238,230,0.04) inset, 0 8px 24px -16px rgba(0,0,0,0.7)',
        'elev-2': '0 1px 0 0 rgba(240,238,230,0.05) inset, 0 18px 50px -28px rgba(0,0,0,0.8)',
        clay: '0 14px 40px -12px rgba(217,119,87,0.45)',
        'clay-lg': '0 22px 60px -22px rgba(233,164,138,0.45)',
      },
      keyframes: {
        descer: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(220%)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        // Pulso do cursor/caret nos blocos de código do hero
        caret: {
          '0%, 45%': { opacity: '1' },
          '55%, 100%': { opacity: '0' },
        },
        // Respiro do halo clay atrás dos títulos
        respirar: {
          '0%, 100%': { opacity: '0.75', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        descer: 'descer 1.8s ease-in-out infinite',
        marquee: 'marquee 55s linear infinite',
        caret: 'caret 1.1s step-end infinite',
        respirar: 'respirar 5s ease-in-out infinite',
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
  plugins: [],
}

export default config
