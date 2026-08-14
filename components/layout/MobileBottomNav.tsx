'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutGrid, Layers, Users, MessageCircle } from 'lucide-react'

const itens = [
  { href: '/', label: 'Início', Icone: Home },
  { href: '/projetos', label: 'Projetos', Icone: LayoutGrid },
  { href: '/servicos', label: 'Serviços', Icone: Layers },
  { href: '/estudio', label: 'Estúdio', Icone: Users },
  { href: '/contato', label: 'Contato', Icone: MessageCircle },
]

/** Barra de navegação fixa no rodapé — só no mobile. */
export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Navegação rápida"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-linha bg-carvao/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid grid-cols-5">
        {itens.map(({ href, label, Icone }) => {
          const ativo = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={ativo ? 'page' : undefined}
                className={`flex h-16 flex-col items-center justify-center gap-1 text-[0.6rem] tracking-wide transition-colors ${
                  ativo ? 'text-clay' : 'text-creme/55'
                }`}
              >
                <Icone size={19} strokeWidth={1.6} />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
