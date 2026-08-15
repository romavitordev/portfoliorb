'use client'

import { useEffect } from 'react'
import { RotateCcw } from 'lucide-react'

export default function Erro({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="flex min-h-[80vh] items-center">
      <div className="container-page text-center">
        <p className="kicker">Algo quebrou</p>
        <h1 className="t-h2 mt-5 font-display">Deu ruim do nosso lado.</h1>
        <p className="t-lead measure mx-auto mt-6 text-luz/65">
          Um erro inesperado interrompeu o carregamento desta página. Tente de novo — se insistir,
          é bug nosso e a gente quer saber.
        </p>

        <button type="button" onClick={reset} className="btn-primary mt-10">
          <RotateCcw size={16} /> Tentar de novo
        </button>
      </div>
    </section>
  )
}
