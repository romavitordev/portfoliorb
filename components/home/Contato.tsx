import { Github, Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react'

import { brand, contato, waLink, waMensagens } from '@/lib/site'
import { CampoDeLuz } from '@/components/fx/CampoDeLuz'
import { Reveal } from '@/components/ui/Reveal'
import { FormOrcamento } from '@/components/contato/FormOrcamento'
import { Copiar } from '@/components/ui/Copiar'

/**
 * Seção de contato — formulário e canais.
 *
 * Vivia em /contato. Numa página única ela é o destino final da rolagem,
 * então reúne as duas formas de falar com o estúdio: o formulário, que
 * organiza o pedido e abre o WhatsApp com ele pronto, e os canais
 * diretos, para quem prefere pular a etapa.
 */
const canais = [
  {
    label: 'WhatsApp',
    valor: 'Resposta no mesmo dia útil',
    href: '',
    Icone: MessageCircle,
    destaque: true,
    copiavel: brand.whatsapp,
  },
  {
    label: 'E-mail',
    valor: brand.email,
    href: `mailto:${brand.email}`,
    Icone: Mail,
    // Só e-mail e telefone ganham botão de copiar: são os que a pessoa
    // leva pra outro lugar. Copiar uma URL de perfil não ajuda ninguém.
    copiavel: brand.email,
  },
  { label: 'GitHub', valor: 'romavitordev', href: brand.github, Icone: Github },
  { label: 'LinkedIn', valor: 'romavitordev', href: brand.linkedin, Icone: Linkedin },
  { label: 'Instagram', valor: brand.instagram, href: brand.instagramUrl, Icone: Instagram },
]

export function Contato() {
  return (
    <div id="contato" className="relative">
      <div className="seam absolute inset-x-0 top-0" aria-hidden />
      <CampoDeLuz forca="discreta" variante="topo-direita" />

      <div className="container-page relative pt-[clamp(4rem,8vw,7rem)]">
        <Reveal>
          <p className="prancha">Contato</p>
          <h2 className="t-h2 mt-5 font-display">{contato.titulo}</h2>
          <p className="t-lead measure mt-6 text-luz/65">{contato.texto}</p>
        </Reveal>
      </div>

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
                  {canais.map(({ label, valor, href, Icone, destaque, copiavel }) => (
                    <li key={label} className="flex items-center gap-3">
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

                      {copiavel && <Copiar valor={copiavel} rotulo={label} />}
                    </li>
                  ))}
                </ul>
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

    </div>
  )
}
