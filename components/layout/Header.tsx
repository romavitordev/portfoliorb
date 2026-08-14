'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { brand, nav } from '@/lib/site'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] border-b text-creme backdrop-blur-md transition-colors duration-500 ${
        scrolled ? 'border-linha bg-carvao/90 shadow-elev-2' : 'border-transparent bg-carvao/30'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="group flex items-baseline gap-2.5" aria-label={`${brand.nome} — página inicial`}>
          <span className="font-display text-[1.35rem] tracking-tight md:text-2xl">
            Roma <span className="text-clay">&amp;</span> Buganza
          </span>
          <span className="hidden font-mono text-[0.56rem] uppercase tracking-[0.28em] text-creme/50 transition-colors group-hover:text-clay lg:inline">
            estúdio
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {nav.map((item) => {
            const ativo = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={ativo ? 'page' : undefined}
                className={`text-[0.8rem] tracking-wide transition-opacity hover:opacity-100 ${
                  ativo ? 'opacity-100' : 'opacity-60'
                }`}
              >
                {item.label}
                {ativo && <span className="mt-1 block h-px w-full bg-clay" aria-hidden />}
              </Link>
            )
          })}
          <Link href="/contato" className="btn-primary !px-5 !py-2.5 text-[0.8rem]">
            Começar um projeto
          </Link>
        </nav>

        <Link href="/contato" className="btn-primary !px-4 !py-2 text-[0.75rem] md:hidden">
          Orçamento
        </Link>
      </div>
    </header>
  )
}
