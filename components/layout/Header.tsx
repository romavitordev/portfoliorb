'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { brand, nav } from '@/lib/site'
import { rolarPara } from '@/lib/lenis'
import { Marca } from '@/components/layout/Marca'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [ativa, setAtiva] = useState<string | null>(null)
  const naHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /**
   * Marca no menu a seção que está na tela. Um IntersectionObserver com
   * a faixa central da viewport evita o efeito de "duas ativas ao mesmo
   * tempo" que acontece quando se observa a viewport inteira.
   */
  useEffect(() => {
    if (!naHome) {
      setAtiva(null)
      return
    }

    const alvos = nav
      .map((item) => document.getElementById(item.secao))
      .filter((el): el is HTMLElement => el !== null)

    if (alvos.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visivel = entries.filter((e) => e.isIntersecting)
        if (visivel.length > 0) setAtiva(visivel[0].target.id)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )

    alvos.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [naHome])

  /** Na home, rola. Fora dela, deixa o Link navegar. */
  function aoClicar(e: React.MouseEvent, secao: string) {
    if (!naHome) return
    e.preventDefault()
    if (rolarPara(secao)) {
      history.replaceState(null, '', `#${secao}`)
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] border-b text-luz backdrop-blur-md transition-colors duration-500 ${
        scrolled ? 'border-linha bg-abismo/90 shadow-elev-2' : 'border-transparent bg-abismo/30'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="group flex items-baseline gap-2.5"
          aria-label={`${brand.nome} — página inicial`}
        >
          <Marca />
          <span className="hidden font-mono text-[0.56rem] uppercase tracking-[0.28em] text-luz/50 transition-colors group-hover:text-ciano lg:inline">
            estúdio
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          {nav.map((item) => {
            const destaca = naHome
              ? ativa === item.secao
              : pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.secao}
                href={naHome ? `#${item.secao}` : item.href}
                onClick={(e) => aoClicar(e, item.secao)}
                aria-current={destaca ? 'true' : undefined}
                className={`relative text-[0.8rem] tracking-wide transition-opacity hover:opacity-100 ${
                  destaca ? 'opacity-100' : 'opacity-60'
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-1.5 left-0 h-px bg-violeta transition-all duration-500 ease-saida ${
                    destaca ? 'w-full' : 'w-0'
                  }`}
                />
              </Link>
            )
          })}

            <Link href="/#contato" className="btn-primary !px-5 !py-2.5 text-[0.8rem]">
              Começar um projeto
            </Link>
        </nav>

        <Link href="/#contato" className="btn-primary !px-4 !py-2 text-[0.75rem] md:hidden">
          Orçamento
        </Link>
      </div>
    </header>
  )
}
