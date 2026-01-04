
import { useEffect, useRef, useState } from "react"

type Message = {
  id: number
  text: string
  isMine: boolean
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const wsRef = useRef<WebSocket | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket")
      setIsConnected(true)
      
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red"
          }
        })
      )
      console.log("📤 Joined room: red")
    }

    ws.onmessage = (event) => {
      console.log("💬 Message received from others:", event.data)
      setIsTyping(false)
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + Math.random(),
          text: event.data,
          isMine: false
        }
      ])
    }

    ws.onerror = (error) => {
      console.error("❌ WebSocket error:", error)
    }

    ws.onclose = () => {
      console.log("❌ Disconnected from WebSocket")
      setIsConnected(false)
    }

    wsRef.current = ws

    return () => {
      console.log("🔌 Closing WebSocket connection")
      ws.close()
    }
  }, [])

  const sendMessage = () => {
    const message = inputRef.current?.value
    if (!message || !wsRef.current) return

    console.log("📤 Sending my message:", message)

    setMessages((m) => [
      ...m,
      {
        id: Date.now() + Math.random(),
        text: message,
        isMine: true
      }
    ])

    wsRef.current.send(
      JSON.stringify({
        type: "chat",
        payload: { message }
      })
    )
   //@ts-ignore
    inputRef.current.value = ""
    setIsTyping(true)
    setTimeout(() => setIsTyping(false), 3000)
  }

 return (
    <div className="h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-full mix-blend-screen filter blur-[120px] animate-float"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-full mix-blend-screen filter blur-[120px] animate-float-delayed"></div>
        <div className="absolute bottom-0 left-1/3 w-[550px] h-[550px] bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 rounded-full mix-blend-screen filter blur-[120px] animate-float-slow"></div>
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
      }}></div>

      {/* Header - Premium Glassmorphism */}
      <div className="relative z-10">
        <div className="backdrop-blur-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="max-w-5xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                {/* Logo with 3D effect */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-[20px] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-[20px] shadow-[0_20px_50px_rgba(139,92,246,0.4)] flex items-center justify-center transform hover:scale-110 hover:rotate-3 transition-all duration-500" style={{
                    boxShadow: '0 20px 50px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}>
                    <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h1 className="text-white text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent animate-shimmer" style={{
                    backgroundSize: '200% 100%',
                    textShadow: '0 0 40px rgba(139, 92, 246, 0.5)'
                  }}>
                    Quantum Chat
                  </h1>
                  <p className="text-purple-300/70 text-sm font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></span>
                    End-to-end encrypted messaging
                  </p>
                </div>
              </div>

              {/* Connection Status - Advanced */}
              <div className="flex items-center gap-4 backdrop-blur-xl bg-white/[0.05] px-6 py-3 rounded-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                <div className="relative flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-red-400'} shadow-lg`}></div>
                    {isConnected && (
                      <>
                        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping"></span>
                        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse"></span>
                      </>
                    )}
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-semibold leading-none">
                      {isConnected ? 'Online' : 'Offline'}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {isConnected ? 'Secure connection' : 'Reconnecting...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6 relative z-10 scroll-smooth">
        {messages.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
            <div className="text-center space-y-6">
              {/* Animated Icon */}
              <div className="relative mx-auto w-32 h-32">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-[32px] blur-2xl animate-pulse"></div>
                <div className="relative w-full h-full backdrop-blur-xl bg-white/[0.03] rounded-[32px] border border-white/[0.08] flex items-center justify-center shadow-[0_20px_60px_rgba(139,92,246,0.3)] transform hover:scale-105 transition-transform duration-500">
                  <svg className="w-16 h-16 text-purple-300/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-white/60 text-xl font-semibold">No messages yet</p>
                <p className="text-white/30 text-sm max-w-xs mx-auto leading-relaxed">
                  Start a conversation and watch the magic happen in real-time
                </p>
              </div>
            </div>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div 
            key={message.id} 
            className={`flex ${message.isMine ? 'justify-end' : 'justify-start'} animate-message-slide`}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Avatar for received messages */}
            {!message.isMine && (
              <div className="flex-shrink-0 mr-3 mt-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_8px_24px_rgba(34,211,238,0.4)] flex items-center justify-center font-bold text-white text-sm">
                  U
                </div>
              </div>
            )}

            <div className={`group relative max-w-[70%] ${message.isMine ? '' : ''}`}>
              {/* Message Bubble with 3D depth */}
              <div className="relative">
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-[28px] ${message.isMine ? 'rounded-br-md' : 'rounded-bl-md'} blur-xl transition-opacity duration-500 ${
                  message.isMine 
                    ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-40 group-hover:opacity-60' 
                    : 'bg-white/10 opacity-20 group-hover:opacity-40'
                }`}></div>
                
                <div
                  className={`
                    relative px-6 py-4 rounded-[28px] backdrop-blur-xl
                    transform transition-all duration-500 hover:scale-[1.02]
                    ${message.isMine 
                      ? 'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 text-white rounded-br-md shadow-[0_20px_60px_rgba(139,92,246,0.5)] border border-white/10' 
                      : 'bg-white/[0.06] text-white border border-white/[0.08] rounded-bl-md shadow-[0_20px_60px_rgba(0,0,0,0.3)]'
                    }
                  `}
                  style={{
                    boxShadow: message.isMine 
                      ? '0 20px 60px rgba(139, 92, 246, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 0 rgba(0, 0, 0, 0.1)'
                      : '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <p className="text-[15px] leading-relaxed break-words font-medium">
                    {message.text}
                  </p>
                  
                  {/* Shine overlay on hover */}
                  <div className={`absolute inset-0 rounded-[28px] ${message.isMine ? 'rounded-br-md' : 'rounded-bl-md'} bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                  
                  {/* Animated border glow */}
                  <div className={`absolute inset-0 rounded-[28px] ${message.isMine ? 'rounded-br-md' : 'rounded-bl-md'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} style={{
                    background: message.isMine 
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.3) 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'shimmer 2s linear infinite'
                  }}></div>
                </div>
              </div>
              
              {/* Timestamp */}
              <div className={`text-xs text-white/30 mt-2 px-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ${message.isMine ? 'text-right' : 'text-left'}`}>
                <span className="backdrop-blur-sm bg-white/[0.02] px-2 py-1 rounded-full">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Avatar for sent messages */}
            {message.isMine && (
              <div className="flex-shrink-0 ml-3 mt-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_8px_24px_rgba(139,92,246,0.5)] flex items-center justify-center font-bold text-white text-sm">
                  M
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex-shrink-0 mr-3 mt-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_8px_24px_rgba(34,211,238,0.4)] flex items-center justify-center font-bold text-white text-sm">
                U
              </div>
            </div>
            <div className="backdrop-blur-xl bg-white/[0.06] px-6 py-4 rounded-[28px] rounded-bl-md border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section - Premium Design */}
      <div className="relative z-10 backdrop-blur-2xl bg-gradient-to-t from-black/40 to-black/20 border-t border-white/[0.08]">
        <div className="max-w-5xl mx-auto p-8">
          <div className="flex gap-4 items-end">
            {/* Text Input */}
            <div className="flex-1 relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-[28px] blur-2xl opacity-0 group-focus-within:opacity-30 transition-opacity duration-500"></div>
              
              <div className="relative backdrop-blur-2xl bg-white/[0.06] rounded-[28px] border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500 group-focus-within:border-purple-500/50 group-focus-within:shadow-[0_20px_60px_rgba(139,92,246,0.4)]" style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              }}>
                <input
                  ref={inputRef}
                  placeholder="Type your message..."
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="w-full bg-transparent text-white placeholder-white/30 px-7 py-5 rounded-[28px] outline-none text-[15px] font-medium"
                />
              </div>
            </div>

            {/* Send Button - 3D Elevated */}
            <button
              onClick={sendMessage}
              disabled={!isConnected}
              className="relative group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Button glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-[24px] blur-2xl opacity-60 group-hover:opacity-100 group-active:opacity-80 transition-opacity duration-300"></div>
              
              <div className="relative bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 px-10 py-5 rounded-[24px] font-bold text-white shadow-[0_20px_60px_rgba(139,92,246,0.6)] transform transition-all duration-300 group-hover:scale-105 group-active:scale-95 border border-white/20 overflow-hidden" style={{
                boxShadow: '0 20px 60px rgba(139, 92, 246, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)'
              }}>
                <span className="relative z-10 flex items-center gap-3 text-[15px]">
                  <span>Send</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-30px, 30px) rotate(-5deg); }
          66% { transform: translate(20px, -20px) rotate(5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -40px) scale(1.1); }
        }
        
        @keyframes message-slide {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
        
        .animate-message-slide {
          animation: message-slide 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(139, 92, 246, 0.6), rgba(217, 70, 239, 0.6));
          border-radius: 10px;
          border: 2px solid rgba(0, 0, 0, 0.2);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(139, 92, 246, 0.8), rgba(217, 70, 239, 0.8));
        }
      `}</style>
    </div>
  )
}

export default App