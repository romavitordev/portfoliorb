import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ShieldAlert, UserRound } from 'lucide-react'

import { prisma } from '@/lib/prisma'
import { ehStatusValido } from '@/lib/lead-status'
import { COOKIE_SESSAO, lerSessao } from '@/lib/session'
import { LeadsList } from '@/components/admin/LeadsList'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Painel',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const sessao = await lerSessao(cookies().get(COOKIE_SESSAO)?.value)
  if (!sessao) redirect('/admin/login')

  const [leads, usuario] = await Promise.all([
    prisma.lead.findMany({ orderBy: { criadoEm: 'desc' }, take: 200 }),
    prisma.usuario.findUnique({ where: { id: sessao.id }, select: { totpAtivoEm: true } }),
  ])

  const novos = leads.filter((l) => l.status === 'NOVO').length
  const emConversa = leads.filter((l) => l.status === 'EM_CONVERSA').length
  const fechados = leads.filter((l) => l.status === 'FECHADO').length

  return (
    <section className="pb-24 pt-28 md:pt-32">
      <div className="container-page">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="kicker">Painel</p>
            <h1 className="t-h2 mt-4 font-display">Leads</h1>
          </div>

          <Link href="/admin/conta" className="btn-link">
            <UserRound size={15} /> {sessao.nome}
          </Link>
        </div>

        {/* Cobrança gentil: sem 2FA, a senha é o único obstáculo. */}
        {!usuario?.totpAtivoEm && (
          <Link
            href="/admin/conta"
            className="surface mt-8 flex items-start gap-4 border-clay/40 p-6 transition-colors hover:border-clay"
          >
            <ShieldAlert size={20} strokeWidth={1.6} className="mt-0.5 shrink-0 text-clay" />
            <span>
              <span className="block text-sm font-medium">Ative a verificação em dois passos</span>
              <span className="mt-1 block text-[0.82rem] leading-relaxed text-creme/60">
                Hoje sua senha é a única coisa entre o painel e quem descobrir ela. Leva um minuto.
              </span>
            </span>
          </Link>
        )}

        <dl className="mt-10 grid gap-6 sm:grid-cols-3">
          <Metrica rotulo="Novos, sem resposta" valor={novos} destaque />
          <Metrica rotulo="Em conversa" valor={emConversa} />
          <Metrica rotulo="Fechados" valor={fechados} />
        </dl>

        <div className="mt-14">
          {/*
            Serializa as datas (Date não atravessa a fronteira server → client)
            e estreita `status`, que vem do banco como String.
          */}
          <LeadsList
            quemSou={sessao.nome}
            inicial={leads.map((l) => ({
              ...l,
              criadoEm: l.criadoEm.toISOString(),
              status: ehStatusValido(l.status) ? l.status : 'NOVO',
            }))}
          />
        </div>
      </div>
    </section>
  )
}

function Metrica({ rotulo, valor, destaque }: { rotulo: string; valor: number; destaque?: boolean }) {
  return (
    <div className={`surface p-7 ${destaque && valor > 0 ? 'border-clay/40' : ''}`}>
      <dd className={`font-display text-5xl ${destaque && valor > 0 ? 'text-clay' : 'text-creme'}`}>
        {valor}
      </dd>
      <dt className="mt-2 text-sm text-creme/55">{rotulo}</dt>
    </div>
  )
}
