import { manifesto } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'

/**
 * "Por que a gente" — os combinados do estúdio.
 *
 * Duas versões anteriores falharam pelo mesmo motivo: os seis pontos
 * moravam numa grade emoldurada espremida em metade da página. Sobravam
 * ~35 caracteres por linha, o texto virava uma coluna alta e fina, e o
 * conjunto lia como tabela de caixas — o que o Vitor chamou de feio, com
 * razão.
 *
 * Agora o cabeçalho ocupa o topo e os pontos correm na largura inteira,
 * em duas colunas de ~500px. Sem moldura, sem caixa: cada ponto é
 * separado por um filete e pelo número, que é o que já ordenava a
 * leitura. Menos desenho, mais legível.
 */
export function Manifesto() {
  return (
    <section id="manifesto" className="relative section-y">
      <div className="container-page">
        <Reveal>
          <p className="prancha">Por que a gente</p>
          <div className="mt-5 grid gap-x-16 gap-y-6 lg:grid-cols-[1fr_1fr]">
            <h2 className="t-h2 font-display">{manifesto.titulo}</h2>
            <p className="t-lead mt-1 text-luz/60">{manifesto.texto}</p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-x-16 md:grid-cols-2">
          {manifesto.pontos.map((ponto, i) => (
            <Reveal key={ponto.titulo} delay={i * 0.05}>
              <article className="flex gap-5 border-t border-linha py-7">
                <span
                  aria-hidden
                  className="mt-1 shrink-0 font-mono text-[0.66rem] tracking-[0.2em] text-ciano"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-xl leading-snug tracking-tight">
                    {ponto.titulo}
                  </h3>
                  <p className="mt-2.5 text-[0.88rem] leading-relaxed text-luz/60">{ponto.texto}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
