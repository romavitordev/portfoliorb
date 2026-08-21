'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutGrid, Layers, MessageCircle, Users } from 'lucide-react'

import { useSecaoAtiva } from '@/lib/use-secao-ativa'

/**
 * Navbar inferior do mobile.
 *
 * Os destinos são âncoras da página única, não rotas. Por isso o item
 * ativo não pode sair do `pathname` — ele é sempre "/" aqui. Quem
 * responde é o `useSecaoAtiva`, o mesmo observador que o header usa.
 *
 * Nas páginas de case (/projetos/[slug]) nenhuma seção está na tela;
 * ali "Projetos" fica aceso, que é de onde a pessoa veio.
 */
const itens = [
  { secao: 'inicio', href: '/', label: 'Início', Icone: Home },
  { secao: 'projetos', href: '/#projetos', label: 'Projetos', Icone: LayoutGrid },
  { secao: 'servicos', href: '/#servicos', label: 'Serviços', Icone: Layers },
  { secao: 'socios', href: '/#socios', label: 'Estúdio', Icone: Users },
  { secao: 'contato', href: '/#contato', label: 'Contato', Icone: MessageCircle },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const naHome = pathname === '/'
  const secaoAtiva = useSecaoAtiva(naHome)

  // Fora da home (um case), o contexto é o catálogo.
  const ativa = naHome ? (secaoAtiva ?? 'inicio') : 'projetos'

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-linha bg-abismo/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="flex items-stretch justify-around">
        {itens.map(({ secao, href, label, Icone }) => {
          const aceso = ativa === secao
          return (
            <li key={secao} className="flex-1">
              <Link
                href={href}
                aria-current={aceso ? 'page' : undefined}
                className={`flex flex-col items-center gap-1 py-2.5 text-[0.6rem] tracking-wide transition-colors ${
                  aceso ? 'text-ciano' : 'text-luz/45'
                }`}
              >
                <Icone size={19} strokeWidth={1.6} aria-hidden />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
