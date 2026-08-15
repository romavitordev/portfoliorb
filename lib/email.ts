import { Resend } from 'resend'

import { brand } from '@/lib/site'
import type { LeadInput } from '@/lib/lead-input'

/**
 * Aviso de lead novo por e-mail (Resend).
 *
 * Falha aqui NUNCA derruba o cadastro: o lead já está salvo quando esta
 * função roda. Sem chave configurada, só registra no log — assim dá pra
 * rodar em dev sem conta no Resend.
 */
const chave = process.env.RESEND_API_KEY
const remetente = process.env.EMAIL_REMETENTE ?? 'Site Roma & Buganza <onboarding@resend.dev>'
const destino = process.env.EMAIL_DESTINO

const resend = chave ? new Resend(chave) : null

/** Escapa texto do visitante antes de entrar no HTML do e-mail. */
function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Se o contato for um telefone, monta o link de resposta no WhatsApp. */
function linkResposta(contatoInformado: string) {
  const digitos = contatoInformado.replace(/\D/g, '')
  if (digitos.length >= 10 && digitos.length <= 13) {
    const comDdi = digitos.startsWith('55') ? digitos : `55${digitos}`
    return `https://wa.me/${comDdi}`
  }
  if (/\S+@\S+\.\S+/.test(contatoInformado)) return `mailto:${contatoInformado}`
  return null
}

export async function avisarLeadNovo(lead: LeadInput & { id: string }) {
  if (!resend || !destino) {
    console.info(
      `[lead ${lead.id}] ${lead.nome} — ${lead.contato} — ${lead.tipo}. ` +
        'E-mail não enviado: RESEND_API_KEY ou EMAIL_DESTINO ausente.',
    )
    return { enviado: false as const }
  }

  const responder = linkResposta(lead.contato)

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;color:#0B0A12">
      <p style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#5638E0;margin:0 0 4px">
        Lead novo pelo site
      </p>
      <h1 style="font-size:22px;margin:0 0 20px">${esc(lead.nome)}</h1>

      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;color:#6b6459;width:110px">Contato</td><td style="padding:8px 0"><strong>${esc(lead.contato)}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#6b6459">Precisa de</td><td style="padding:8px 0">${esc(lead.tipo)}</td></tr>
        <tr><td style="padding:8px 0;color:#6b6459">Prazo</td><td style="padding:8px 0">${esc(lead.prazo)}</td></tr>
        ${lead.origem ? `<tr><td style="padding:8px 0;color:#6b6459">Origem</td><td style="padding:8px 0">${esc(lead.origem)}</td></tr>` : ''}
      </table>

      <p style="margin:20px 0 6px;color:#6b6459;font-size:14px">Mensagem</p>
      <blockquote style="margin:0;padding:14px 16px;background:#ECEAF5;border-left:3px solid #6D4AFF;white-space:pre-wrap;font-size:14px">${esc(lead.sobre)}</blockquote>

      ${
        responder
          ? `<p style="margin:24px 0"><a href="${responder}" style="background:#6D4AFF;color:#FFFFFF;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:600;font-size:14px;display:inline-block">Responder agora</a></p>`
          : ''
      }

      <p style="font-size:12px;color:#8a8378;margin-top:28px">
        Também aparece no painel: ${brand.url}/admin
      </p>
    </div>
  `

  try {
    await resend.emails.send({
      from: remetente,
      to: destino.split(',').map((e) => e.trim()),
      replyTo: /\S+@\S+\.\S+/.test(lead.contato) ? lead.contato : undefined,
      subject: `Lead: ${lead.nome} — ${lead.tipo}`,
      html,
    })
    return { enviado: true as const }
  } catch (erro) {
    console.error(`[lead ${lead.id}] falha ao enviar e-mail`, erro)
    return { enviado: false as const }
  }
}
