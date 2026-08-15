'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

import { processo } from '@/lib/site'

/**
 * A OFICINA — a seção que dá nome ao conceito do site.
 *
 * Enquanto a pessoa rola, uma janela de navegador ganha fidelidade em
 * seis estágios, um por etapa do processo: começa vazia (a conversa),
 * vira lista de escopo, vira wireframe tracejado, ganha grade e blocos,
 * ganha cor e imagem, e termina publicada. O site demonstra o serviço
 * que vende.
 *
 * Mecânica: a seção é alta (600vh) e o miolo é `sticky`. O progresso do
 * scroll DENTRO dela vira o índice do estágio. Isso dispensa o pin do
 * GSAP — menos código e nenhum conflito com o Lenis.
 *
 * No mobile e em reduced-motion o pin não existe: os seis estágios
 * viram uma lista comum, porque prender o scroll em tela pequena é
 * hostil e um estágio por vez em 100vh vira uma eternidade.
 */
/**
 * Progresso da seção pinada, calculado à mão.
 *
 * O `useScroll` do Framer não atualizava aqui — a medição dele não
 * acompanhou o scroll suave do Lenis e o progresso ficava preso em zero.
 * Uma conta direta com `getBoundingClientRect` é transparente, não
 * depende de medição interna de biblioteca e cabe em dez linhas.
 */
function useProgressoDaSecao(ref: React.RefObject<HTMLElement>, ativo: boolean) {
  const [progresso, setProgresso] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || !ativo) return

    let raf = 0
    const calcular = () => {
      const r = el.getBoundingClientRect()
      const percorrivel = r.height - window.innerHeight
      const p = percorrivel > 0 ? -r.top / percorrivel : 0
      setProgresso(Math.min(Math.max(p, 0), 1))
      raf = 0
    }
    const aoRolar = () => {
      if (!raf) raf = requestAnimationFrame(calcular)
    }

    calcular()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar, { passive: true })
    return () => {
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref, ativo])

  return progresso
}

export function Oficina() {
  const ref = useRef<HTMLElement>(null)
  const reduzir = useReducedMotion()

  const progresso = useProgressoDaSecao(ref, !reduzir)

  // Os seis estágios ocupam 92% do percurso; a folga final deixa o
  // último respirar antes da seção sair da tela.
  const estagio = Math.min(
    Math.round((progresso / 0.92) * (processo.length - 1)),
    processo.length - 1,
  )

  if (reduzir) {
    return (
      <div id="processo">
        <OficinaEmLista />
      </div>
    )
  }

  return (
    /*
      A âncora #processo mora no invólucro, não na seção pinada: no
      mobile aquela seção é `display:none`, e uma âncora apontando para
      elemento oculto rola para o lugar errado.
    */
    <div id="processo">
      {/* Versão pinada — só a partir de lg */}
      <section
        ref={ref}
        className="relative hidden lg:block"
        style={{ height: `${processo.length * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="malha absolute inset-0 opacity-40" aria-hidden />

          <div className="container-page relative grid w-full items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Coluna das etapas */}
            <div>
              <p className="prancha">Oficina</p>
              <h2 className="t-h2 mt-6 font-display">
                Você vê o site <span className="texto-clay">nascendo</span>
              </h2>
              <p className="t-lead measure-sm mt-6 text-creme/60">
                Do primeiro rabisco ao endereço no ar. Sem caixa-preta, sem sumiço de duas
                semanas.
              </p>

              <ol className="mt-10 space-y-1">
                {processo.map((etapa, i) => (
                  <ItemEtapa key={etapa.numero} etapa={etapa} ativa={estagio === i} />
                ))}
              </ol>
            </div>

            {/* A janela que se monta */}
            <JanelaMontando estagio={estagio} />
          </div>
        </div>
      </section>

      {/*
        Versão empilhada — mobile e tablet. Sem `id`: ele vive na versão
        pinada, senão haveria dois #processo no documento e a âncora do
        menu passaria a depender da ordem no DOM.
      */}
      <div className="lg:hidden">
        <OficinaEmLista />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Etapa da lista — acende conforme o estágio                          */
/* ------------------------------------------------------------------ */

/**
 * Etapa da lista.
 *
 * O texto só aparece na etapa ATIVA. Com os seis abertos ao mesmo tempo
 * a coluna passava de 100vh e o título da seção saía da tela — e, de
 * quebra, ler seis descrições de uma vez anula o efeito de acompanhar
 * uma de cada vez. `grid-rows` anima a altura sem precisar medir nada.
 */
function ItemEtapa({ etapa, ativa }: { etapa: (typeof processo)[number]; ativa: boolean }) {
  return (
    <li className="flex items-baseline gap-4 py-1.5">
      <span
        aria-hidden
        className={`mt-2 h-px shrink-0 transition-all duration-500 ease-saida ${
          ativa ? 'w-10 bg-clay' : 'w-3 bg-creme/20'
        }`}
      />
      <span
        className={`font-mono text-[0.68rem] tracking-[0.2em] transition-colors duration-500 ${
          ativa ? 'text-clay' : 'text-creme/30'
        }`}
      >
        {etapa.numero}
      </span>
      <span className="flex-1">
        <span
          className={`flex items-baseline gap-3 font-display text-xl tracking-tight transition-opacity duration-500 ${
            ativa ? 'opacity-100' : 'opacity-35'
          }`}
        >
          {etapa.titulo}
          <span
            className={`font-mono text-[0.6rem] uppercase tracking-[0.18em] text-creme/40 transition-opacity duration-500 ${
              ativa ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {etapa.duracao}
          </span>
        </span>

        <span
          className={`grid transition-all duration-500 ease-saida ${
            ativa ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <span className="overflow-hidden">
            <span className="mt-1.5 block max-w-sm text-[0.84rem] leading-relaxed text-creme/60">
              {etapa.texto}
            </span>
          </span>
        </span>
      </span>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* A janela                                                            */
/* ------------------------------------------------------------------ */

function JanelaMontando({ estagio }: { estagio: number }) {
  /**
   * Cada camada acende no seu estágio e PERMANECE acesa — a janela ganha
   * fidelidade em vez de trocar de tela. Por isso são comparações `>=`
   * e não igualdade.
   */
  const conversa = estagio >= 0 ? 1 : 0
  const escopo = estagio >= 1 ? 1 : 0
  const wireframe = estagio >= 2 ? 1 : 0
  const construcao = estagio >= 3 ? 1 : 0
  const publicado = estagio >= 4 ? 1 : 0
  const manutencao = estagio >= 5 ? 1 : 0

  // A moldura sai do tracejado e vira sólida quando o site fica pronto.
  const publicada = estagio >= 4

  return (
    <div
      className={`cotas relative aspect-[16/11] w-full overflow-hidden rounded-xl border bg-carvao/60 shadow-elev-2 transition-colors duration-700 ${
        publicada ? 'border-solid border-linha' : 'border-dashed border-creme/20'
      }`}
    >
      {/* Barra da janela */}
      <div className="flex items-center gap-2 border-b border-linha/60 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-creme/15" />
        <span className="h-2 w-2 rounded-full bg-creme/15" />
        <span style={{ opacity: publicado }} className="h-2 w-2 rounded-full bg-clay/70" />
        <span style={{ opacity: publicado }}
          className="ml-3 font-mono text-[0.6rem] tracking-wide text-creme/40"
        >
          seucliente.com.br
        </span>
      </div>

      <div className="relative h-full p-5">
        {/* 01 — conversa: um cursor piscando numa folha em branco */}
        <div data-camada="conversa" style={{ opacity: conversa }} className="absolute inset-5 flex items-center">
          <p className="rascunho-texto text-sm">
            o que você precisa?
            <span className="ml-1 inline-block h-4 w-[6px] translate-y-0.5 animate-caret bg-clay" />
          </p>
        </div>

        {/* 02 — escopo: itens sendo fechados */}
        <div data-camada="escopo" style={{ opacity: escopo }} className="absolute inset-5 space-y-2 pt-8">
          {['catálogo com filtros', 'painel do vendedor', 'contato no WhatsApp', 'domínio e deploy'].map(
            (item) => (
              <p key={item} className="rascunho-texto flex items-center gap-2 text-[0.72rem]">
                <span className="text-clay">✓</span> {item}
              </p>
            ),
          )}
        </div>

        {/* 03 — wireframe tracejado por cima do escopo */}
        <div data-camada="wireframe" style={{ opacity: wireframe }} className="absolute inset-5 flex flex-col gap-2">
          <div className="rascunho h-8 w-full rounded" />
          <div className="rascunho h-20 w-full rounded" />
          <div className="grid flex-1 grid-cols-3 gap-2">
            <div className="rascunho rounded" />
            <div className="rascunho rounded" />
            <div className="rascunho rounded" />
          </div>
        </div>

        {/* 04 — construção: os blocos ganham conteúdo cinza */}
        <div data-camada="construcao" style={{ opacity: construcao }} className="absolute inset-5 flex flex-col gap-2">
          <div className="flex items-center justify-between rounded bg-grafite px-3 py-2">
            <div className="rascunho-bloco h-2.5 w-20" />
            <div className="flex gap-1.5">
              <div className="rascunho-bloco h-2 w-8" />
              <div className="rascunho-bloco h-2 w-8" />
              <div className="rascunho-bloco h-2 w-8" />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 rounded bg-grafite px-3 py-4">
            <div className="rascunho-bloco h-3 w-3/5" />
            <div className="rascunho-bloco h-2 w-4/5" />
          </div>
          <div className="grid flex-1 grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-1.5 rounded bg-grafite p-2">
                <div className="rascunho-bloco flex-1" />
                <div className="rascunho-bloco h-1.5 w-3/4" />
              </div>
            ))}
          </div>
        </div>

        {/* 05 — no ar: tipografia e cor de verdade */}
        <div data-camada="publicado" style={{ opacity: publicado }}
          className="absolute inset-5 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between rounded bg-grafite px-3 py-2">
            <span className="font-display text-[0.8rem] tracking-tight">Peças Menezes</span>
            <span className="flex gap-2 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-creme/45">
              <span>catálogo</span>
              <span>sobre</span>
              <span className="text-clay">orçamento</span>
            </span>
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden rounded bg-grafite px-4 py-5">
            <div className="halo-clay -left-6 top-0 h-28 w-28" aria-hidden />
            <p className="relative font-display text-lg leading-tight tracking-tight">
              Peça hoje,
              <br />
              <span className="texto-clay">chega amanhã.</span>
            </p>
          </div>

          <div className="grid flex-1 grid-cols-3 gap-2">
            {['Freios', 'Suspensão', 'Motor'].map((nome, i) => (
              <div key={nome} className="flex flex-col gap-1.5 rounded bg-grafite p-2">
                <div
                  className="flex-1 rounded"
                  style={{
                    background: `linear-gradient(${140 + i * 40}deg, rgba(217,119,87,0.35), rgba(240,238,230,0.05))`,
                  }}
                />
                <span className="text-[0.6rem] text-creme/70">{nome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 06 — depois: o selo de cuidado contínuo */}
        <div data-camada="manutencao" style={{ opacity: manutencao }}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-clay/40 bg-carvao/90 px-3 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-clay" />
          </span>
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-creme/70">
            no ar e cuidado
          </span>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Versão sem pin — mobile e reduced-motion                            */
/* ------------------------------------------------------------------ */

function OficinaEmLista() {
  return (
    <section className="relative section-y">
      <div className="malha absolute inset-0 opacity-40" aria-hidden />

      <div className="container-page relative">
        <p className="prancha">Oficina</p>
        <h2 className="t-h2 measure mt-6 font-display">
          Você vê o site <span className="texto-clay">nascendo</span>
        </h2>
        <p className="t-lead measure mt-6 text-creme/60">
          Do primeiro rabisco ao endereço no ar. Sem caixa-preta, sem sumiço de duas semanas.
        </p>

        <ol className="mt-12 space-y-px overflow-hidden rounded-2xl border border-linha bg-linha">
          {processo.map((etapa) => (
            <li key={etapa.numero} className="bg-grafite p-7">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[0.68rem] tracking-[0.2em] text-clay">
                  {etapa.numero}
                </span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-creme/40">
                  {etapa.duracao}
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl tracking-tight">{etapa.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-creme/60">{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
