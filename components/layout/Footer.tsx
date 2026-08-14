import Link from 'next/link'
import { Github, Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react'

import { brand, nav, servicos, waLink, waMensagens } from '@/lib/site'
import { projetos } from '@/lib/projetos'

const redes = [
  { label: 'GitHub', href: brand.github, Icone: Github },
  { label: 'LinkedIn', href: brand.linkedin, Icone: Linkedin },
  { label: 'Instagram', href: brand.instagramUrl, Icone: Instagram },
]

export function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer className="relative border-t border-linha bg-grafite/40">
      <div className="seam absolute inset-x-0 top-0" aria-hidden />

      <div className="container-page section-y-tight">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <p className="font-display text-2xl tracking-tight">
              Roma <span className="text-clay">&amp;</span> Buganza
            </p>
            <p className="mt-3 measure-sm text-sm leading-relaxed text-creme/60">{brand.promessa}</p>
            <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-creme/45">
              {brand.base}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {redes.map(({ label, href, Icone }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-creme/15 text-creme/70 transition-colors hover:border-clay hover:text-clay"
                >
                  <Icone size={17} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé — páginas">
            <p className="kicker-poeira">Navegar</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-creme/70 transition-colors hover:text-clay">
                  Início
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-creme/70 transition-colors hover:text-clay">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Serviços */}
          <nav aria-label="Rodapé — serviços">
            <p className="kicker-poeira">Serviços</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {servicos.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/servicos#${s.id}`}
                    className="text-creme/70 transition-colors hover:text-clay"
                  >
                    {s.nome}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/servicos#plano-mensal"
                  className="text-creme/70 transition-colors hover:text-clay"
                >
                  Plano mensal
                </Link>
              </li>
            </ul>
          </nav>

          {/* Projetos + contato direto */}
          <div>
            <p className="kicker-poeira">Projetos</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {projetos.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projetos/${p.slug}`}
                    className="text-creme/70 transition-colors hover:text-clay"
                  >
                    {p.nome}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="kicker-poeira mt-8">Falar agora</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={waLink(waMensagens.geral)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-creme/70 transition-colors hover:text-clay"
                >
                  <MessageCircle size={15} strokeWidth={1.6} /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="inline-flex items-center gap-2 text-creme/70 transition-colors hover:text-clay"
                >
                  <Mail size={15} strokeWidth={1.6} /> {brand.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-linha pt-7 text-[0.72rem] text-creme/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {brand.nome}. Feito em Sorocaba, no braço.
          </p>
          <p className="font-mono uppercase tracking-[0.2em]">Next.js · TypeScript · Tailwind</p>
        </div>
      </div>
    </footer>
  )
}
