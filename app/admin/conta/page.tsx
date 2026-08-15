import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { prisma } from '@/lib/prisma'
import { COOKIE_SESSAO, lerSessao } from '@/lib/session'
import { ContaCard } from '@/components/admin/ContaCard'
import { SenhaCard } from '@/components/admin/SenhaCard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Conta',
  robots: { index: false, follow: false },
}

export default async function ContaPage() {
  const sessao = await lerSessao(cookies().get(COOKIE_SESSAO)?.value)
  if (!sessao) redirect('/admin/login')

  const usuario = await prisma.usuario.findUnique({ where: { id: sessao.id } })
  if (!usuario) redirect('/admin/login')

  return (
    <section className="pb-24 pt-28 md:pt-32">
      <div className="container-page">
        <Link href="/admin" className="btn-link">
          <ArrowLeft size={15} /> Leads
        </Link>

        <p className="kicker mt-8">Conta</p>
        <h1 className="t-h2 mt-4 font-display">{usuario.nome}</h1>
        <p className="mt-3 font-mono text-[0.74rem] text-luz/50">{usuario.email}</p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <ContaCard
            ativo={Boolean(usuario.totpAtivoEm)}
            ativoDesde={
              usuario.totpAtivoEm
                ? usuario.totpAtivoEm.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })
                : null
            }
          />
          <SenhaCard />
        </div>
      </div>
    </section>
  )
}
