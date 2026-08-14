import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { rotulosCategoria, rotulosNatureza, type Projeto } from '@/lib/projetos'

type Props = {
  projeto: Projeto
  /** Card largo, em destaque (ocupa 2 colunas na home). */
  grande?: boolean
  /** `priority` na imagem — use só nos primeiros cards visíveis. */
  prioridade?: boolean
}

/** Cor do selo de natureza — conceito não pode se passar por cliente. */
const corNatureza: Record<Projeto['natureza'], string> = {
  cliente: 'border-clay/50 text-clay',
  proprio: 'border-creme/35 text-creme/75',
  conceito: 'border-creme/20 text-creme/50',
}

export function ProjetoCard({ projeto, grande = false, prioridade = false }: Props) {
  return (
    <Link
      href={`/projetos/${projeto.slug}`}
      className="surface card-hover group relative flex flex-col overflow-hidden"
    >
      <div className={`relative overflow-hidden ${grande ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        <Image
          src={projeto.imagem}
          alt={projeto.imagemAlt}
          fill
          sizes={grande ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          priority={prioridade}
          className="object-cover transition-transform duration-[900ms] ease-saida group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-grafite via-grafite/25 to-transparent"
        />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="chip border-creme/25 bg-carvao/70 text-creme/80 backdrop-blur-sm">
            {rotulosCategoria[projeto.categoria]}
          </span>
          <span className={`chip bg-carvao/70 backdrop-blur-sm ${corNatureza[projeto.natureza]}`}>
            {rotulosNatureza[projeto.natureza]}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className={`font-display tracking-tight ${grande ? 't-h3' : 'text-xl'}`}>
            {projeto.nome}
          </h3>
          <span
            aria-hidden
            className="mt-1 shrink-0 text-creme/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-clay"
          >
            <ArrowUpRight size={20} strokeWidth={1.6} />
          </span>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-creme/60">{projeto.resumo}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-creme/40">
          <span>{projeto.ano}</span>
          <span aria-hidden>·</span>
          {projeto.stack.slice(0, grande ? 4 : 3).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
