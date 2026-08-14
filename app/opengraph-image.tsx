import { ImageResponse } from 'next/og'

import { brand } from '@/lib/site'

export const runtime = 'edge'
export const alt = brand.nomeCompleto
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Cartão social gerado no build — carvão, malha técnica e um ponto clay. */
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
          background: '#141311',
          backgroundImage:
            'linear-gradient(to right, rgba(240,238,230,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(240,238,230,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          padding: '72px',
          color: '#F0EEE6',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: '#D97757' }} />
          <div style={{ fontSize: 22, letterSpacing: 6, color: '#A8A096', textTransform: 'uppercase' }}>
            estúdio de desenvolvimento
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 86, lineHeight: 1.02, letterSpacing: -2 }}>
            Roma <span style={{ color: '#D97757' }}>&amp;</span> Buganza
          </div>
          <div style={{ fontSize: 32, color: '#A8A096', maxWidth: 900, lineHeight: 1.4 }}>
            {brand.tagline}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 24, color: '#A8A096', letterSpacing: 2 }}>
          Sites · Landing pages · Sistemas · Produtos digitais
        </div>
      </div>
    ),
    size,
  )
}
