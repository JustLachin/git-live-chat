'use client'

import { useState, useEffect, useRef } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Pusher from 'pusher-js'

export default function Home() {
  const { data: session, status } = useSession()
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState(0)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!session) return

    // Send auth success to parent window (for SVG widget)
    if (window.opener) {
      window.opener.postMessage({
        type: 'auth-success',
        user: {
          username: session.user.username,
          image: session.user.image
        }
      }, 'https://github.com');
    }

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    })

    const channel = pusher.subscribe('github-chat')
    
    channel.bind('message', (data) => {
      setMessages((prev) => [...prev, data])
    })

    channel.bind('user-count', (data) => {
      setOnlineUsers(data.count)
    })

    fetch('/api/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username: session.user.username,
        avatar: session.user.image 
      }),
    })

    return () => {
      pusher.unsubscribe('github-chat')
    }
  }, [session])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const message = {
      username: session.user.username,
      avatar: session.user.image,
      text: inputMessage,
      timestamp: new Date().toISOString(),
    }

    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    })

    setInputMessage('')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#238636] mx-auto"></div>
          <p className="mt-4 text-gray-400 text-xl font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#0d1117]">
        <div className="bg-[#161b22] rounded-3xl shadow-2xl p-12 max-w-md w-full text-center border-2 border-[#30363d]">
          <div className="mb-8">
            <div className="text-7xl mb-4">💬</div>
            <h1 className="text-5xl font-black text-white mb-3">
              LIVE CHAT
            </h1>
            <p className="text-gray-400 text-lg">GitHub Powered Real-Time Messaging</p>
          </div>
          
          <button
            onClick={() => signIn('github')}
            className="group relative inline-flex items-center justify-center gap-3 bg-[#238636] hover:bg-[#2ea043] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 w-full"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="text-lg">Sign in with GitHub</span>
          </button>

          <p className="mt-6 text-sm text-gray-500">
            🔒 Secure OAuth • No password required
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 bg-[#0d1117]">
      <div className="max-w-5xl mx-auto h-screen flex flex-col py-4">
        <div className="bg-[#161b22] rounded-t-3xl shadow-xl p-6 flex justify-between items-center border-b-2 border-[#30363d]">
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-2">
              💬 <span className="text-white">LIVE CHAT</span>
            </h1>
            <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="font-semibold">{onlineUsers}</span> users online
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-[#21262d] rounded-full px-4 py-2">
              <a 
                href={`https://github.com/${session.user.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:opacity-80 transition"
              >
                <img 
                  src={session.user.image} 
                  alt={session.user.username}
                  className="w-10 h-10 rounded-full border-2 border-[#238636]"
                />
                <span className="font-bold text-white">@{session.user.username}</span>
              </a>
            </div>
            <button
              onClick={() => signOut()}
              className="text-sm bg-[#da3633] hover:bg-[#b62324] text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="flex-1 bg-[#0d1117] overflow-y-auto p-6 space-y-4 scrollbar-hide border-l-2 border-r-2 border-[#30363d]">
          {messages.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">👋</div>
              <p className="text-gray-500 text-lg">No messages yet. Start the conversation!</p>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.username === session.user.username ? 'flex-row-reverse' : ''}`}
            >
              <a 
                href={`https://github.com/${msg.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <img 
                  src={msg.avatar} 
                  alt={msg.username}
                  className="w-10 h-10 rounded-full border-2 border-[#30363d] hover:border-[#238636] transition cursor-pointer"
                />
              </a>
              <div className={`flex flex-col ${msg.username === session.user.username ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <a 
                    href={`https://github.com/${msg.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-gray-400 hover:text-[#238636] transition"
                  >
                    @{msg.username}
                  </a>
                  <span className="text-xs text-gray-600">
                    {new Date(msg.timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div
                  className={`max-w-md px-5 py-3 rounded-2xl shadow-md ${
                    msg.username === session.user.username
                      ? 'bg-[#1f6feb] text-white'
                      : 'bg-[#21262d] text-[#c9d1d9]'
                  }`}
                >
                  <p className="break-words">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="bg-[#161b22] rounded-b-3xl shadow-xl p-6 border-t-2 border-[#30363d]">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-6 py-4 border-2 border-[#30363d] bg-[#0d1117] rounded-xl focus:outline-none focus:border-[#1f6feb] text-white font-medium text-lg placeholder-gray-500"
              maxLength={5000}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg"
            >
              Send 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
