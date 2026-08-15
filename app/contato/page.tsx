import type { Metadata } from 'next'
import { Github, Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react'

import { brand, contato, processo, waLink, waMensagens } from '@/lib/site'
import { CampoDeLuz } from '@/components/fx/CampoDeLuz'
import { Reveal } from '@/components/ui/Reveal'
import { FormOrcamento } from '@/components/contato/FormOrcamento'
import { Faq } from '@/components/home/Faq'

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Peça um orçamento para site, landing page, sistema sob medida, produto digital, automação ou modelagem 3D. Resposta no mesmo dia útil.',
  alternates: { canonical: '/contato' },
}

const canais = [
  {
    label: 'WhatsApp',
    valor: 'Resposta no mesmo dia útil',
    href: '',
    Icone: MessageCircle,
    destaque: true,
  },
  { label: 'E-mail', valor: brand.email, href: `mailto:${brand.email}`, Icone: Mail },
  { label: 'GitHub', valor: 'romavitordev', href: brand.github, Icone: Github },
  { label: 'LinkedIn', valor: 'romavitordev', href: brand.linkedin, Icone: Linkedin },
  { label: 'Instagram', valor: brand.instagram, href: brand.instagramUrl, Icone: Instagram },
]

export default function ContatoPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-4 pt-32 md:pt-40">
        <CampoDeLuz variante="topo-direita" />

        <div className="container-page relative">
          <Reveal>
            <p className="prancha">Contato</p>
            <h1 className="t-h1 mt-6 font-display">{contato.titulo}</h1>
            <p className="t-lead measure mt-7 text-luz/65">{contato.texto}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <FormOrcamento />
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.08}>
              <div className="surface p-8">
                <p className="kicker-poeira">Ou direto</p>
                <ul className="mt-6 space-y-4">
                  {canais.map(({ label, valor, href, Icone, destaque }) => (
                    <li key={label}>
                      <a
                        href={destaque ? waLink(waMensagens.geral) : href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex items-center gap-4"
                      >
                        <span
                          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            destaque
                              ? 'border-violeta/50 text-ciano'
                              : 'border-luz/15 text-luz/60 group-hover:border-violeta group-hover:text-ciano'
                          }`}
                        >
                          <Icone size={17} strokeWidth={1.6} />
                        </span>
                        <span>
                          <span className="block text-sm text-luz transition-colors group-hover:text-ciano">
                            {label}
                          </span>
                          <span className="block text-[0.75rem] text-luz/45">{valor}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="surface p-8">
                <p className="kicker-poeira">O que acontece depois</p>
                <ol className="mt-6 space-y-5">
                  {processo.slice(0, 3).map((etapa) => (
                    <li key={etapa.numero} className="flex gap-4">
                      <span className="font-mono text-[0.7rem] tracking-[0.2em] text-ciano">
                        {etapa.numero}
                      </span>
                      <span>
                        <span className="block text-sm font-medium">{etapa.titulo}</span>
                        <span className="mt-1 block text-[0.8rem] leading-relaxed text-luz/55">
                          {etapa.texto}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="px-2 text-[0.78rem] leading-relaxed text-luz/40">
                {brand.base}. Reunião presencial na região de Sorocaba, o resto por chamada de
                vídeo.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Faq />
    </>
  )
}
