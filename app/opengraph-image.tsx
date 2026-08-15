import { ImageResponse } from 'next/og'

import { brand } from '@/lib/site'

export const runtime = 'edge'
export const alt = brand.nomeCompleto
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Cartão social gerado no build — abismo e o espectro de evolução. */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0B0A12',
          // Dois campos do espectro se sobrepondo, como no site — sem
          // grade. `radial-gradient` é o que o Satori suporta aqui.
          backgroundImage:
            'radial-gradient(circle at 12% 8%, rgba(109,74,255,0.45), transparent 45%), radial-gradient(circle at 88% 92%, rgba(0,212,200,0.30), transparent 45%)',
          padding: '72px',
          color: '#ECEAF5',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: '#6D4AFF' }} />
          <div style={{ fontSize: 22, letterSpacing: 6, color: '#9490AB', textTransform: 'uppercase' }}>
            estúdio de desenvolvimento
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 86, lineHeight: 1.02, letterSpacing: -2 }}>
            Roma <span style={{ color: '#6D4AFF' }}>&amp;</span> Buganza
          </div>
          <div style={{ fontSize: 32, color: '#9490AB', maxWidth: 900, lineHeight: 1.4 }}>
            {brand.tagline}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 24, color: '#9490AB', letterSpacing: 2 }}>
          Sites · Landing pages · Sistemas · Produtos digitais
        </div>
      </div>
    ),
    size,
  )
}
