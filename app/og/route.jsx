import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0d1117',
          backgroundImage: 'linear-gradient(to bottom right, #0d1117, #161b22)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <div style={{ fontSize: 120, marginBottom: 20 }}>💬</div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: 'white',
              marginBottom: 20,
            }}
          >
            LIVE CHAT
          </div>
          <div
            style={{
              fontSize: 40,
              color: '#8b949e',
              marginBottom: 40,
            }}
          >
            Real-time GitHub-powered messaging
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 15,
              backgroundColor: '#238636',
              padding: '20px 40px',
              borderRadius: 12,
            }}
          >
            <div style={{ fontSize: 40, color: 'white', fontWeight: 700 }}>
              🚀 CLICK TO JOIN CHAT
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginTop: 30,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#3fb950',
              }}
            />
            <div style={{ fontSize: 24, color: '#8b949e' }}>
              Sign in with GitHub • Start chatting instantly
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
