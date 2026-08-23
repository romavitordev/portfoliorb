import type { Config } from 'tailwindcss'

/**
 * SISTEMA DE COR — espectro de evolução
 *
 * A cor não é decoração aqui: ela carrega significado. Existe uma escala
 * que vai do frio-não-formado ao vivo-crescendo, e todo elemento que tem
 * noção de PROGRESSO (etapas do processo, barras de gráfico, estágios de
 * um projeto) pega o ponto da escala que corresponde ao seu estágio.
 *
 *   violeta  ideia, inovação, o que ainda não existe
 *   azul     desenho, especificação
 *   ciano    tecnologia, o sistema funcionando
 *   lima     crescimento, resultado, dinheiro entrando
 *
 * CONTRASTE (sobre o fundo #0B0A12), medido e não estimado:
 *   luz     #ECEAF5 → 17.8:1  qualquer tamanho
 *   bruma   #9490AB →  6.3:1  texto de apoio
 *   lima    #A6FF4D → 15.1:1  qualquer tamanho
 *   ciano   #00D4C8 → 10.2:1  qualquer tamanho
 *   violeta #6D4AFF →  3.1:1  SÓ preenchimento, borda e texto grande.
 *                             Nunca rótulo pequeno — por isso os kickers
 *                             do site usam ciano, não violeta.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      /*
        Nenhuma cor mora aqui. Todas vêm do bloco ESPECTRO DE CORES em
        `app/globals.css` — trocar a paleta é editar aquele `:root`.

        `<alpha-value>` é o marcador que o Tailwind substitui pela
        opacidade da classe, e é o que mantém `bg-violeta/30` funcionando
        com a cor vinda de variável.

        Os nomes das classes seguem a COR (violeta, ciano) e as variáveis
        seguem o PAPEL (primária, terciária). Se um dia a primária deixar
        de ser violeta, é aqui que os dois se reconciliam — e o resto do
        código não muda.
      */
      colors: {
        abismo: 'rgb(var(--fundo) / <alpha-value>)',
        nevoa: 'rgb(var(--superficie) / <alpha-value>)',
        linha: 'rgb(var(--linha) / <alpha-value>)',
        luz: 'rgb(var(--texto) / <alpha-value>)',
        bruma: 'rgb(var(--texto-suave) / <alpha-value>)',
        violeta: 'rgb(var(--primaria) / <alpha-value>)',
        azul: 'rgb(var(--secundaria) / <alpha-value>)',
        ciano: 'rgb(var(--terciaria) / <alpha-value>)',
        lima: 'rgb(var(--quaternaria) / <alpha-value>)',
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
        // Elevação: hairline interna + profundidade difusa, sem sombra preta chapada
        'elev-1': '0 1px 0 0 rgb(var(--texto) / 0.05) inset, 0 8px 24px -16px rgba(0,0,0,0.8)',
        'elev-2': '0 1px 0 0 rgb(var(--texto) / 0.06) inset, 0 18px 50px -28px rgba(0,0,0,0.9)',
        violeta: '0 14px 40px -12px rgb(var(--primaria) / 0.5)',
        ciano: '0 14px 40px -12px rgb(var(--terciaria) / 0.4)',
        lima: '0 14px 40px -14px rgb(var(--quaternaria) / 0.35)',
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
        caret: {
          '0%, 45%': { opacity: '1' },
          '55%, 100%': { opacity: '0' },
        },
        // Respiro dos campos de luz do fundo
        respirar: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        // Deriva lenta — dois campos em contratempo evitam a sensação
        // de "gradiente parado de template"
        derivar: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(4%, -3%, 0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        // A régua da .prancha sendo puxada quando a seção entra
        'desenhar-regua': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        descer: 'descer 1.8s ease-in-out infinite',
        marquee: 'marquee 55s linear infinite',
        caret: 'caret 1.1s step-end infinite',
        respirar: 'respirar 7s ease-in-out infinite',
        derivar: 'derivar 22s ease-in-out infinite',
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
  plugins: [],
}

export default config
