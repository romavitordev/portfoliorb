/**
 * O logotipo escrito.
 *
 * Existia em duas cópias idênticas em JSX — header e rodapé — cada uma
 * com o nome cravado na marcação. Quando o nome mudou de "Roma &
 * Buganza" para "Roma Buganza Estúdio", as duas precisaram de conserto
 * manual; a terceira cópia teria ficado para trás.
 *
 * O acento em ciano estava no "&". Sem ele, passou para "Estúdio" — a
 * palavra que agora distingue o nome.
 */
export function Marca({ tamanho = 'md' }: { tamanho?: 'md' | 'lg' }) {
  return (
    <span
      className={`font-display tracking-tight ${
        tamanho === 'lg' ? 'text-2xl' : 'text-[1.35rem] md:text-2xl'
      }`}
    >
      Roma Buganza <span className="text-ciano">Estúdio</span>
    </span>
  )
}
