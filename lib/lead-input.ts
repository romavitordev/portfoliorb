import { z } from 'zod'

import { contato } from '@/lib/site'

/**
 * Contrato do formulário de orçamento — o mesmo schema valida no
 * navegador e na API, então o que o formulário aceita é exatamente o que
 * a rota aceita. Mesma ideia usada no TriAmici.
 */
export const leadSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, 'Diga como podemos te chamar.')
    .max(80, 'Nome muito longo.'),

  contato: z
    .string()
    .trim()
    .min(8, 'Precisamos de um WhatsApp ou e-mail para responder.')
    .max(120, 'Contato muito longo.')
    .refine(
      (v) => /\S+@\S+\.\S+/.test(v) || (v.replace(/\D/g, '').length >= 10 && v.replace(/\D/g, '').length <= 13),
      'Informe um e-mail válido ou um WhatsApp com DDD.',
    ),

  tipo: z.enum(contato.tipos as [string, ...string[]]),
  prazo: z.enum(contato.prazos as [string, ...string[]]),

  sobre: z
    .string()
    .trim()
    .min(10, 'Conta um pouco mais — pelo menos 10 caracteres.')
    .max(2000, 'Texto muito longo. Resuma e a gente conversa no detalhe depois.'),

  origem: z.string().trim().max(200).optional(),

  /**
   * Honeypot: campo invisível para gente. Bot preenche tudo que encontra.
   *
   * De propósito o schema ACEITA qualquer valor aqui — quem decide é a
   * rota, que responde 200 como se tivesse dado certo. Se a validação
   * reprovasse, a resposta de erro contaria ao bot que ele foi pego e
   * ele voltaria sabendo qual campo deixar em branco.
   */
  site: z.string().max(200).optional(),
})

export type LeadInput = z.infer<typeof leadSchema>

/** Erros por campo, no formato que o formulário consome. */
export type ErrosCampo = Partial<Record<keyof LeadInput, string>>

export function validarLead(dados: unknown):
  | { ok: true; valor: LeadInput }
  | { ok: false; erros: ErrosCampo } {
  const r = leadSchema.safeParse(dados)
  if (r.success) return { ok: true, valor: r.data }

  const erros: ErrosCampo = {}
  for (const issue of r.error.issues) {
    const campo = issue.path[0] as keyof LeadInput
    if (campo && !erros[campo]) erros[campo] = issue.message
  }
  return { ok: false, erros }
}
