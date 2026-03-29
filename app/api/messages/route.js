import Pusher from 'pusher'
import { NextResponse } from 'next/server'

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
})

export async function POST(request) {
  try {
    const { username, avatar, text, timestamp } = await request.json()

    if (!username || !text) {
      return NextResponse.json(
        { error: 'Username and text are required' },
        { status: 400 }
      )
    }

    // No message limit

    await pusher.trigger('github-chat', 'message', {
      username,
      avatar,
      text,
      timestamp,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
