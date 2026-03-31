import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

// In-memory message store (replace with database in production)
let messages = [
  {
    username: 'github',
    avatar: 'https://github.com/github.png',
    text: 'Welcome to Git Live Chat! 🚀',
    timestamp: new Date().toISOString()
  }
]

export async function GET() {
  const recentMessages = messages.slice(-5)
  
  const svg = `
    <svg width="1200" height="700" viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0d1117;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#161b22;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <rect width="1200" height="700" rx="16" fill="url(#bg)" stroke="#30363d" stroke-width="3"/>
      
      <!-- Header -->
      <rect y="0" width="1200" height="100" rx="16" fill="#161b22"/>
      <line x1="0" y1="100" x2="1200" y2="100" stroke="#30363d" stroke-width="3"/>
      
      <text x="40" y="55" font-family="Arial, sans-serif" font-size="36" font-weight="900" fill="white">💬 LIVE CHAT</text>
      
      <circle cx="40" cy="80" r="6" fill="#3fb950">
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
      </circle>
      <text x="60" y="87" font-family="Arial, sans-serif" font-size="16" fill="#8b949e">${messages.length} messages • Click to join</text>
      
      <!-- Messages -->
      ${recentMessages.map((msg, i) => {
        const y = 150 + (i * 110)
        const time = new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        return `
          <g transform="translate(40, ${y})">
            <circle cx="25" cy="25" r="25" fill="#238636"/>
            <text x="25" y="35" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle">${msg.username[0].toUpperCase()}</text>
            <rect x="70" y="5" width="1000" height="80" rx="20" fill="#21262d"/>
            <text x="90" y="35" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#8b949e">@${msg.username}</text>
            <text x="90" y="60" font-family="Arial, sans-serif" font-size="16" fill="#c9d1d9">${escapeXml(msg.text.substring(0, 80))}${msg.text.length > 80 ? '...' : ''}</text>
            <text x="1050" y="35" font-family="Arial, sans-serif" font-size="12" fill="#6e7681" text-anchor="end">${time}</text>
          </g>
        `
      }).join('')}
      
      <!-- CTA -->
      <rect x="350" y="600" width="500" height="70" rx="12" fill="#238636"/>
      <text x="600" y="645" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="white" text-anchor="middle">🚀 CLICK TO JOIN CHAT</text>
      
      <a href="https://git-live-chat.vercel.app" target="_blank">
        <rect width="1200" height="700" fill="transparent" cursor="pointer"/>
      </a>
    </svg>
  `
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}

export async function POST(request) {
  try {
    const { username, text } = await request.json()
    
    if (!username || !text) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    
    messages.push({
      username,
      avatar: `https://github.com/${username}.png`,
      text,
      timestamp: new Date().toISOString()
    })
    
    // Keep only last 50 messages
    if (messages.length > 50) {
      messages = messages.slice(-50)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add message' }, { status: 500 })
  }
}

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
