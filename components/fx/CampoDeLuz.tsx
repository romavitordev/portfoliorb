/**
 * Fundo do site — campos de luz, sem padrão nenhum.
 *
 * Substituiu a malha milimetrada. Grade de fundo é o papel de parede
 * padrão de portfólio de dev, e chapava o site inteiro num mesmo plano.
 *
 * Aqui a profundidade vem de dois campos desfocados de MATIZES
 * DIFERENTES do espectro se sobrepondo: a interseção cria uma terceira
 * cor que nenhum dos dois tem sozinho. É isso que separa "profundidade"
 * de "glow radial de template" — um único brilho centralizado é
 * exatamente o que todo mundo faz.
 *
 * Os dois derivam em contratempo (22s, atrasos diferentes) para nunca
 * repetirem a mesma composição.
 */
type Props = {
  /** Intensidade geral, para seções que não devem competir com o hero. */
  forca?: 'cheia' | 'media' | 'discreta'
  /** Onde o par de campos se ancora. */
  variante?: 'topo-esquerda' | 'topo-direita' | 'centro' | 'rodape'
}

const opacidade = {
  cheia: 'opacity-100',
  media: 'opacity-60',
  discreta: 'opacity-35',
}

export function CampoDeLuz({ forca = 'media', variante = 'topo-esquerda' }: Props) {
  const posicoes = {
    'topo-esquerda': {
      a: '-left-[18rem] -top-[14rem] h-[42rem] w-[42rem]',
      b: 'left-[14%] top-[38%] h-[30rem] w-[30rem]',
    },
    'topo-direita': {
      a: '-right-[16rem] -top-[12rem] h-[40rem] w-[40rem]',
      b: 'right-[12%] top-[42%] h-[28rem] w-[28rem]',
    },
    centro: {
      a: 'left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2',
      b: 'left-[62%] top-[38%] h-[26rem] w-[26rem]',
    },
    rodape: {
      a: '-bottom-[16rem] left-[8%] h-[36rem] w-[36rem]',
      b: 'bottom-[6%] right-[10%] h-[26rem] w-[26rem]',
    },
  }[variante]

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${opacidade[forca]}`}>
      <div className={`campo campo-violeta animate-derivar ${posicoes.a}`} />
      <div
        className={`campo campo-ciano animate-derivar ${posicoes.b}`}
        style={{ animationDelay: '-11s' }}
      />
    </div>
  )
}
