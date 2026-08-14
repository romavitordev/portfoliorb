import type { Metadata } from 'next'

import { prisma } from '@/lib/prisma'
import { LeadsList } from '@/components/admin/LeadsList'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Painel',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { criadoEm: 'desc' },
    take: 200,
  })

  const novos = leads.filter((l) => l.status === 'NOVO').length
  const emConversa = leads.filter((l) => l.status === 'EM_CONVERSA').length
  const fechados = leads.filter((l) => l.status === 'FECHADO').length

  return (
    <section className="pb-24 pt-28 md:pt-32">
      <div className="container-page">
        <p className="kicker">Painel</p>
        <h1 className="t-h2 mt-4 font-display">Leads</h1>

        <dl className="mt-10 grid gap-6 sm:grid-cols-3">
          <Metrica rotulo="Novos, sem resposta" valor={novos} destaque />
          <Metrica rotulo="Em conversa" valor={emConversa} />
          <Metrica rotulo="Fechados" valor={fechados} />
        </dl>

        <div className="mt-14">
          {/* Serializa as datas: Date não atravessa a fronteira server → client. */}
          <LeadsList
            inicial={leads.map((l) => ({ ...l, criadoEm: l.criadoEm.toISOString() }))}
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
