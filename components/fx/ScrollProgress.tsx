'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/**
 * Barra de progresso de scroll (clay) no topo + botão "voltar ao topo"
 * que aparece depois de 1 viewport.
 */
export function ScrollProgress() {
  const [prog, setProg] = useState(0)
  const [mostraTopo, setMostraTopo] = useState(false)

  useEffect(() => {
    let raf = 0
    const calc = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      const p = h > 0 ? window.scrollY / h : 0
      setProg(p)
      setMostraTopo(window.scrollY > window.innerHeight)
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc)
    }
    calc()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div aria-hidden className="fixed inset-x-0 top-0 z-[120] h-[2px] bg-transparent">
        <div
          className="h-full origin-left"
          style={{
            transform: `scaleX(${prog})`,
            backgroundImage: 'linear-gradient(90deg, #00D4C8, #6D4AFF)',
          }}
        />
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo"
        className={`fixed bottom-[5.5rem] right-5 z-[120] inline-flex h-11 w-11 items-center justify-center rounded-full border border-luz/20 bg-nevoa/80 text-luz backdrop-blur-sm transition-all duration-300 hover:border-violeta hover:text-ciano md:bottom-5 ${
          mostraTopo ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp size={18} />
      </button>
    </>
  )
}
