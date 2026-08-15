'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import {
  categoriasDisponiveis,
  projetos,
  rotulosCategoria,
  rotulosNatureza,
  type Categoria,
  type Natureza,
} from '@/lib/projetos'
import { IndiceProjetos } from '@/components/projetos/IndiceProjetos'

type FiltroCategoria = Categoria | 'todos'
type FiltroNatureza = Natureza | 'todos'

const naturezasDisponiveis = (['cliente', 'proprio', 'conceito'] as Natureza[]).filter((n) =>
  projetos.some((p) => p.natureza === n),
)

/** Catálogo filtrável. Os filtros são combináveis (categoria E natureza). */
export function CatalogoProjetos() {
  const [categoria, setCategoria] = useState<FiltroCategoria>('todos')
  const [natureza, setNatureza] = useState<FiltroNatureza>('todos')

  const visiveis = useMemo(
    () =>
      projetos.filter(
        (p) =>
          (categoria === 'todos' || p.categoria === categoria) &&
          (natureza === 'todos' || p.natureza === natureza),
      ),
    [categoria, natureza],
  )

  return (
    <>
      <div className="flex flex-col gap-6 border-y border-linha py-7">
        <Grupo
          rotulo="Tipo"
          valor={categoria}
          onChange={(v) => setCategoria(v as FiltroCategoria)}
          opcoes={[
            { valor: 'todos', label: `Todos (${projetos.length})` },
            ...categoriasDisponiveis.map((c) => ({
              valor: c,
              label: `${rotulosCategoria[c]} (${projetos.filter((p) => p.categoria === c).length})`,
            })),
          ]}
        />

        <Grupo
          rotulo="Natureza"
          valor={natureza}
          onChange={(v) => setNatureza(v as FiltroNatureza)}
          opcoes={[
            { valor: 'todos', label: 'Todas' },
            ...naturezasDisponiveis.map((n) => ({
              valor: n,
              label: `${rotulosNatureza[n]} (${projetos.filter((p) => p.natureza === n).length})`,
            })),
          ]}
        />
      </div>

      <p aria-live="polite" className="mt-8 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-luz/40">
        {visiveis.length} {visiveis.length === 1 ? 'projeto' : 'projetos'}
      </p>

      {/*
        Índice em lista no lugar da grade de três colunas: oito projetos
        cabem na tela de uma vez, e o nome do projeto vira o protagonista
        em vez da foto. A imagem aparece no painel que segue o cursor.
      */}
      <motion.div layout className="mt-6">
        <IndiceProjetos projetos={visiveis} />
      </motion.div>

      {visiveis.length === 0 && (
        <p className="measure py-16 text-luz/55">
          Nenhum projeto com essa combinação de filtros. Limpe um dos dois para ver o catálogo
          inteiro.
        </p>
      )}
    </>
  )
}

/* ------------------------------------------------------------------ */

type GrupoProps = {
  rotulo: string
  valor: string
  onChange: (valor: string) => void
  opcoes: { valor: string; label: string }[]
}

function Grupo({ rotulo, valor, onChange, opcoes }: GrupoProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <span className="font-mono text-[0.64rem] uppercase tracking-[0.24em] text-luz/35">
        {rotulo}
      </span>

      <div role="group" aria-label={rotulo} className="flex flex-wrap gap-2">
        {opcoes.map((opcao) => {
          const ativo = valor === opcao.valor
          return (
            <button
              key={opcao.valor}
              type="button"
              aria-pressed={ativo}
              onClick={() => onChange(opcao.valor)}
              className={`rounded-full border px-4 py-1.5 text-[0.76rem] transition-all duration-300 ${
                ativo
                  ? 'border-violeta bg-violeta text-abismo'
                  : 'border-linha text-luz/60 hover:border-luz/40 hover:text-luz'
              }`}
            >
              {opcao.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
