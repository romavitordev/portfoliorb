import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'

import { brand, waLink, waMensagens } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'

export function CtaFinal() {
  return (
    <section id="contato" className="relative overflow-hidden section-y">
      <div className="malha absolute inset-0 opacity-50" aria-hidden />
      <div
        className="halo-clay left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 animate-respirar"
        aria-hidden
      />

      <div className="container-page relative text-center">
        <Reveal>
          <p className="prancha">Próximo passo</p>
          <h2 className="t-h1 measure mx-auto mt-6 font-display">
            Sua ideia merece sair da <span className="texto-clay">aba de rascunhos</span>
          </h2>
          <p className="t-lead measure mx-auto mt-7 text-creme/65">
            Conta em duas linhas o que você quer construir. A gente responde no mesmo dia útil com
            uma primeira leitura — de graça, e sem enrolação comercial.
          </p>

          <div className="mt-11 flex flex-wrap justify-center gap-3">
            <Link href="/contato" className="btn-primary">
              Pedir orçamento <ArrowRight size={16} />
            </Link>
            <a
              href={waLink(waMensagens.geral)}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost"
            >
              <MessageCircle size={16} /> Chamar no WhatsApp
            </a>
          </div>

          <p className="mt-8 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-creme/40">
            {brand.base}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
