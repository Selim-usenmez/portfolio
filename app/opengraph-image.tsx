import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Selim Usenmez — Portfolio BTS SIO SLAM'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#030303',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow top-left */}
        <div style={{
          position: 'absolute', top: -100, left: -100,
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        {/* Glow bottom-right */}
        <div style={{
          position: 'absolute', bottom: -80, right: -80,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,132,252,0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, zIndex: 1 }}>

          {/* Name */}
          <div style={{
            display: 'flex', gap: 0,
            fontFamily: 'sans-serif', fontWeight: 900,
            fontSize: 96, letterSpacing: -3, lineHeight: 1,
          }}>
            <span style={{ color: '#f1f5f9' }}>Selim</span>
            <span style={{ marginLeft: 24, background: 'linear-gradient(135deg, #818cf8, #c084fc, #22d3ee)', backgroundClip: 'text', color: 'transparent' }}>
              Usenmez
            </span>
          </div>

          {/* Separator */}
          <div style={{
            width: 80, height: 2, borderRadius: 2,
            background: 'linear-gradient(90deg, #818cf8, #c084fc)',
            marginTop: 8, marginBottom: 8,
          }} />

          {/* Role */}
          <div style={{
            fontFamily: 'monospace', fontSize: 22,
            color: 'rgba(100,116,139,0.8)', letterSpacing: 6,
            textTransform: 'uppercase',
          }}>
            Développeur Web & Mobile · BTS SIO SLAM
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            {['PHP', 'Next.js', 'Swift', 'Docker', 'Lyon'].map((tag) => (
              <div key={tag} style={{
                padding: '6px 16px', borderRadius: 999,
                background: 'rgba(129,140,248,0.1)',
                border: '1px solid rgba(129,140,248,0.25)',
                color: '#818cf8', fontFamily: 'monospace',
                fontSize: 16, letterSpacing: 2,
              }}>
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom url */}
        <div style={{
          position: 'absolute', bottom: 36,
          fontFamily: 'monospace', fontSize: 16,
          color: 'rgba(100,116,139,0.35)', letterSpacing: 3,
        }}>
          portfolio.likeus.dev
        </div>
      </div>
    ),
    { ...size }
  )
}
