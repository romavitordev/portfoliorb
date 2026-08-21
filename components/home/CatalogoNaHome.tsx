import { projetos } from '@/lib/projetos'
import { Reveal } from '@/components/ui/Reveal'
import { CatalogoProjetos } from '@/components/projetos/CatalogoProjetos'

/**
 * Catálogo completo, com filtros, direto na página.
 *
 * Antes a home mostrava três destaques e mandava pra /projetos. Com o
 * site numa página só, mandar pra outra rota derrota o propósito — e o
 * índice em lista é compacto o bastante pra caber aqui inteiro.
 */
export function CatalogoNaHome() {
  return (
    <section id="projetos" className="relative section-y">
      <div className="seam absolute inset-x-0 top-0" aria-hidden />

      <div className="container-page">
        <Reveal>
          <p className="prancha">Catálogo</p>
          <h2 className="t-h2 mt-5 font-display">
            {projetos.length} projetos, <span className="texto-espectro">nenhum maquiado</span>
          </h2>
          <p className="t-lead measure mt-6 text-luz/65">
            Sistemas de cliente rodando em produção, produtos próprios em construção e projetos
            conceituais onde a direção de arte anda solta. Cada linha marca o que é o quê — e
            todos têm código aberto e demonstração no ar.
          </p>
        </Reveal>

        <div className="mt-12">
          <CatalogoProjetos />
        </div>
      </div>
    </section>
  )
}
