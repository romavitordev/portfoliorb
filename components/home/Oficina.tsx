'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Search, TrendingUp } from 'lucide-react'

import { processo } from '@/lib/site'
import { CampoDeLuz } from '@/components/fx/CampoDeLuz'
import { Digitando } from '@/components/ui/Digitando'

/** O catálogo que a janela mostra quando o site fica pronto. */
const catalogo = [
  { nome: 'Pastilha de freio', preco: 'R$ 189', estoque: 12, selo: '-15%' },
  { nome: 'Amortecedor', preco: 'R$ 340', estoque: 4, selo: null },
  { nome: 'Correia dentada', preco: 'R$ 96', estoque: 27, selo: null },
]

/** As barras percorrem a escala: o gráfico é a própria evolução. */
const barrasVenda = [
  { h: '32%', cor: 'bg-violeta' },
  { h: '46%', cor: 'bg-violeta' },
  { h: '40%', cor: 'bg-azul' },
  { h: '64%', cor: 'bg-azul' },
  { h: '82%', cor: 'bg-ciano' },
  { h: '100%', cor: 'bg-lima' },
]

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
 * Progresso da seção pinada, medido quadro a quadro.
 *
 * Duas tentativas anteriores falharam e vale registrar por quê:
 *
 *  1. `useScroll` do Framer com `target` ficava preso em zero.
 *  2. Um listener de `scroll` no window também ficava preso — e a
 *     medição mostrou o motivo: o Lenis move a página SEM emitir evento
 *     de scroll nativo. Zero eventos capturados com o `scrollY` mudando
 *     de 9775 para 8905.
 *
 * Então aqui não se escuta evento nenhum. Um `requestAnimationFrame` lê
 * a posição direto do layout, o que funciona com qualquer implementação
 * de scroll — nativa, Lenis, ou transform. O laço só roda enquanto a
 * seção está na tela, então não custa nada no resto da página.
 *
 * `setProgresso` com valor idêntico não re-renderiza: o React descarta
 * pelo Object.is, e parado o valor não muda.
 */
function useProgressoDaSecao(ref: React.RefObject<HTMLElement>, ativo: boolean) {
  const [progresso, setProgresso] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || !ativo) return

    let raf = 0
    let naTela = false

    const ler = () => {
      const r = el.getBoundingClientRect()
      const percorrivel = r.height - window.innerHeight
      const p = percorrivel > 0 ? -r.top / percorrivel : 0
      setProgresso(Math.min(Math.max(p, 0), 1))
    }

    const laco = () => {
      ler()
      raf = naTela ? requestAnimationFrame(laco) : 0
    }

    const obs = new IntersectionObserver(([entrada]) => {
      naTela = entrada.isIntersecting
      if (naTela && !raf) raf = requestAnimationFrame(laco)
      if (!naTela && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })

    obs.observe(el)

    /*
      Cinto e suspensório: o rAF cobre scroll por transform (Lenis) mas
      congela quando a aba perde visibilidade; o listener de scroll cobre
      o caso nativo e continua vivo com a aba oculta. Os dois chamam a
      mesma leitura, e valor repetido não re-renderiza.
    */
    window.addEventListener('scroll', ler, { passive: true })
    window.addEventListener('resize', ler, { passive: true })

    ler()
    return () => {
      obs.disconnect()
      window.removeEventListener('scroll', ler)
      window.removeEventListener('resize', ler)
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
          <CampoDeLuz forca="media" variante="topo-direita" />

          <div className="container-page relative grid w-full items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Coluna das etapas */}
            <div>
              <p className="prancha">Oficina</p>
              <h2 className="t-h2 mt-6 font-display">
                Você vê o site <span className="texto-espectro">nascendo</span>
              </h2>
              <p className="t-lead measure-sm mt-6 text-luz/60">
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
          ativa ? 'w-10 bg-violeta' : 'w-3 bg-luz/20'
        }`}
      />
      <span
        className={`font-mono text-[0.68rem] tracking-[0.2em] transition-colors duration-500 ${
          ativa ? 'text-ciano' : 'text-luz/30'
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
            className={`font-mono text-[0.6rem] uppercase tracking-[0.18em] text-luz/40 transition-opacity duration-500 ${
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
            <span className="mt-1.5 block max-w-sm text-[0.84rem] leading-relaxed text-luz/60">
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
   * Uma camada por estágio, e SÓ a do estágio atual.
   *
   * A versão anterior acumulava (`>=`) na ideia de "ganhar fidelidade",
   * mas na prática o texto do escopo atravessava o wireframe e os cards:
   * camada de texto não é bloco de construção, é um momento que passou.
   *
   * A sensação de progressão continua, porque cada estágio é uma versão
   * mais acabada do MESMO layout — não precisa empilhar para isso.
   *
   * Exceção: `publicado` fica aceso também no estágio 6, porque "Depois"
   * é o mesmo site no ar com o selo de manutenção por cima.
   */
  const conversa = estagio === 0 ? 1 : 0
  const escopo = estagio === 1 ? 1 : 0
  const wireframe = estagio === 2 ? 1 : 0
  const construcao = estagio === 3 ? 1 : 0
  const publicado = estagio >= 4 ? 1 : 0
  const manutencao = estagio >= 5 ? 1 : 0

  // A moldura sai do tracejado e vira sólida quando o site fica pronto.
  const publicada = estagio >= 4

  return (
    <div
      className={`cotas relative aspect-[16/11] w-full overflow-hidden rounded-xl border bg-abismo/60 shadow-elev-2 transition-colors duration-700 ${
        publicada ? 'border-solid border-linha' : 'border-dashed border-luz/20'
      }`}
    >
      {/* Barra da janela */}
      <div className="flex items-center gap-2 border-b border-linha/60 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-luz/15" />
        <span className="h-2 w-2 rounded-full bg-luz/15" />
        <span style={{ opacity: publicado }} className="h-2 w-2 rounded-full bg-violeta/70" />
        {/*
          O endereço é DIGITADO quando o site fica no ar, em vez de
          aparecer pronto. É o gesto que fecha a história da seção:
          alguém abre o navegador pra ver o que acabou de nascer.
        */}
        <span
          style={{ opacity: publicado }}
          className="ml-3 font-mono text-[0.6rem] tracking-wide text-luz/55"
        >
          <Digitando texto="seucliente.com.br" ativo={estagio >= 4} />
        </span>
      </div>

      <div className="relative h-full p-5">
        {/* 01 — conversa: um cursor piscando numa folha em branco */}
        <div data-camada="conversa" style={{ opacity: conversa }} className="absolute inset-5 transition-opacity duration-700 ease-saida transition-opacity duration-700 ease-saida flex items-center">
          <p className="rascunho-texto text-sm">
            o que você precisa?
            <span className="ml-1 inline-block h-4 w-[6px] translate-y-0.5 animate-caret bg-violeta" />
          </p>
        </div>

        {/* 02 — escopo: itens sendo fechados */}
        <div data-camada="escopo" style={{ opacity: escopo }} className="absolute inset-5 transition-opacity duration-700 ease-saida transition-opacity duration-700 ease-saida space-y-2 pt-8">
          {['catálogo com filtros', 'painel do vendedor', 'contato no WhatsApp', 'domínio e deploy'].map(
            (item) => (
              <p key={item} className="rascunho-texto flex items-center gap-2 text-[0.72rem]">
                <span className="text-ciano">✓</span> {item}
              </p>
            ),
          )}
        </div>

        {/* 03 — wireframe tracejado por cima do escopo */}
        <div data-camada="wireframe" style={{ opacity: wireframe }} className="absolute inset-5 transition-opacity duration-700 ease-saida transition-opacity duration-700 ease-saida flex flex-col gap-2">
          <div className="rascunho h-8 w-full rounded" />
          <div className="rascunho h-20 w-full rounded" />
          <div className="grid flex-1 grid-cols-3 gap-2">
            <div className="rascunho rounded" />
            <div className="rascunho rounded" />
            <div className="rascunho rounded" />
          </div>
        </div>

        {/* 04 — construção: os blocos ganham conteúdo cinza */}
        <div data-camada="construcao" style={{ opacity: construcao }} className="absolute inset-5 transition-opacity duration-700 ease-saida transition-opacity duration-700 ease-saida flex flex-col gap-2">
          <div className="flex items-center justify-between rounded bg-nevoa px-3 py-2">
            <div className="rascunho-bloco h-2.5 w-20" />
            <div className="flex gap-1.5">
              <div className="rascunho-bloco h-2 w-8" />
              <div className="rascunho-bloco h-2 w-8" />
              <div className="rascunho-bloco h-2 w-8" />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 rounded bg-nevoa px-3 py-4">
            <div className="rascunho-bloco h-3 w-3/5" />
            <div className="rascunho-bloco h-2 w-4/5" />
          </div>
          <div className="grid flex-1 grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-1.5 rounded bg-nevoa p-2">
                <div className="rascunho-bloco flex-1" />
                <div className="rascunho-bloco h-1.5 w-3/4" />
              </div>
            ))}
          </div>
        </div>

        {/*
          05 — no ar. Nada de bloco cinza aqui: é uma loja com nome,
          busca, preço e um painel de vendas. As barras do gráfico
          percorrem o espectro, então o dado e o conceito são a mesma
          coisa.
        */}
        <div
          data-camada="publicado"
          style={{ opacity: publicado }}
          className="absolute inset-5 transition-opacity duration-700 ease-saida flex flex-col gap-2"
        >
          <div className="flex items-center justify-between rounded-lg bg-nevoa px-3 py-2.5">
            <span className="font-display text-[0.85rem] tracking-tight">Peças Menezes</span>
            <span className="flex items-center gap-3 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-luz/45">
              <span>catálogo</span>
              <Search size={10} className="text-luz/40" />
              <span className="rounded-full bg-violeta px-2.5 py-1 font-semibold text-luz">
                orçamento
              </span>
            </span>
          </div>

          <div className="flex items-end justify-between gap-4 rounded-lg bg-nevoa px-3 py-3">
            <span>
              <span className="flex items-center gap-1.5 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-luz/45">
                <TrendingUp size={9} className="text-lima" /> pedidos no mês
              </span>
              <span className="mt-1 block font-display text-2xl leading-none text-lima">+38%</span>
            </span>
            <span className="flex h-10 flex-1 items-end gap-[3px]">
              {barrasVenda.map((b, i) => (
                <span key={i} className={`flex-1 rounded-[2px] ${b.cor}`} style={{ height: b.h }} />
              ))}
            </span>
          </div>

          <div className="grid flex-1 grid-cols-3 gap-2">
            {catalogo.map((item, i) => (
              <div key={item.nome} className="flex flex-col overflow-hidden rounded-lg bg-nevoa">
                <div
                  className="relative flex-1"
                  style={{
                    backgroundImage: `linear-gradient(${160 + i * 30}deg, rgba(109,74,255,0.32), rgba(0,212,200,0.14) 60%, rgba(11,10,18,0.9))`,
                  }}
                >
                  {item.selo && (
                    <span className="absolute left-1.5 top-1.5 rounded bg-lima px-1 py-px font-mono text-[0.45rem] font-bold tracking-wide text-abismo">
                      {item.selo}
                    </span>
                  )}
                </div>

                <div className="space-y-1 p-1.5">
                  <span className="block truncate text-[0.58rem] leading-tight text-luz/80">
                    {item.nome}
                  </span>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[0.6rem] font-semibold text-luz">
                      {item.preco}
                    </span>
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violeta font-mono text-[0.55rem] leading-none text-luz">
                      +
                    </span>
                  </div>
                  <span className="flex items-center gap-1 font-mono text-[0.45rem] uppercase tracking-wide text-luz/40">
                    <span className="h-1 w-1 rounded-full bg-lima" />
                    {item.estoque} em estoque
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 06 — depois: o selo de cuidado contínuo */}
        <div
          data-camada="manutencao"
          style={{ opacity: manutencao }}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-lima/40 bg-abismo/90 px-3 py-1.5 backdrop-blur-sm transition-opacity duration-700 ease-saida"
        >
          {/* Lima: é o selo de "crescendo", a ponta do espectro */}
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lima opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lima" />
          </span>
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-luz/70">
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

      <div className="container-page relative">
        <p className="prancha">Oficina</p>
        <h2 className="t-h2 measure mt-6 font-display">
          Você vê o site <span className="texto-espectro">nascendo</span>
        </h2>
        <p className="t-lead measure mt-6 text-luz/60">
          Do primeiro rabisco ao endereço no ar. Sem caixa-preta, sem sumiço de duas semanas.
        </p>

        <ol className="mt-12 space-y-px overflow-hidden rounded-2xl border border-linha bg-linha">
          {processo.map((etapa) => (
            <li key={etapa.numero} className="bg-nevoa p-7">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[0.68rem] tracking-[0.2em] text-ciano">
                  {etapa.numero}
                </span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-luz/40">
                  {etapa.duracao}
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl tracking-tight">{etapa.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-luz/60">{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
