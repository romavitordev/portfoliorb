import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NaoEncontrado() {
  return (
    <section className="relative flex min-h-[80vh] items-center">
      <div className="malha absolute inset-0 opacity-50" aria-hidden />
      <div className="halo-clay left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2" aria-hidden />

      <div className="container-page relative text-center">
        <p className="kicker">Erro 404</p>
        <h1 className="t-h1 mt-5 font-display">Essa rota não existe.</h1>
        <p className="t-lead measure mx-auto mt-6 text-creme/65">
          O link pode ter mudado de lugar. Volte para o início ou dê uma olhada no catálogo de
          projetos — provavelmente é o que você procurava.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Voltar ao início
          </Link>
          <Link href="/projetos" className="btn-ghost">
            Ver projetos <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
