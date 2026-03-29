import Pusher from 'pusher'
import { NextResponse } from 'next/server'

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
})

let userCount = 0

export async function POST(request) {
  try {
    const { username, avatar } = await request.json()

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }

    userCount++

    await pusher.trigger('github-chat', 'user-count', {
      count: userCount,
    })

    await pusher.trigger('github-chat', 'message', {
      username: 'System',
      avatar: 'https://github.com/github.png',
      text: `@${username} joined the chat! 🎉`,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, userCount })
  } catch (error) {
    console.error('Error joining chat:', error)
    return NextResponse.json(
      { error: 'Failed to join chat' },
      { status: 500 }
    )
  }
}
