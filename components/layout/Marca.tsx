/**
 * O logotipo escrito.
 *
 * O "&" em ciano não é enfeite: ele é o que diz "somos DOIS". Sem o
 * separador, "Roma Buganza" lê como o nome de uma pessoa só — foi o que
 * aconteceu quando o nome virou "Roma Buganza Estúdio" por um momento.
 *
 * A categoria ("estúdio") vive ao lado, em corpo pequeno, e não dentro
 * do nome: o logotipo fica curto e a palavra longa não compete com ele.
 *
 * Existia em duas cópias em JSX — header e rodapé —, cada uma com o nome
 * cravado na marcação. Virou componente porque na primeira troca de nome
 * as duas precisaram de conserto manual.
 */
export function Marca({ tamanho = 'md' }: { tamanho?: 'md' | 'lg' }) {
  return (
    <span
      className={`font-display tracking-tight ${
        tamanho === 'lg' ? 'text-2xl' : 'text-[1.35rem] md:text-2xl'
      }`}
    >
      Roma <span className="text-ciano">&amp;</span> Buganza
    </span>
  )
}
