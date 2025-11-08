'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Code, Terminal, Search } from 'lucide-react'
import { useStore } from '../store'
import { motion } from 'framer-motion'

export default function ChatView() {
  const { messages, addMessage, agents, activeAgentId } = useStore()
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const activeAgent = agents.find(a => a.id === activeAgentId)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || !activeAgent) return

    const userMessage = {
      id: Date.now().toString(),
      agentId: 'user',
      content: input,
      timestamp: Date.now(),
      type: 'message' as const
    }

    addMessage(userMessage)
    setInput('')
    setIsProcessing(true)

    // Simulate agent processing
    setTimeout(() => {
      const agentMessage = {
        id: (Date.now() + 1).toString(),
        agentId: activeAgent.id,
        content: `I'll help you with that. Let me analyze the request and execute the necessary tools...`,
        timestamp: Date.now(),
        type: 'message' as const
      }
      addMessage(agentMessage)

      // Simulate tool call
      setTimeout(() => {
        const toolCall = {
          id: (Date.now() + 2).toString(),
          agentId: activeAgent.id,
          content: 'Searching files for matching patterns...',
          timestamp: Date.now(),
          type: 'tool-call' as const,
          toolName: 'file-search'
        }
        addMessage(toolCall)

        setTimeout(() => {
          const result = {
            id: (Date.now() + 3).toString(),
            agentId: activeAgent.id,
            content: '```javascript\n// Found 3 matching files\nconst results = [\n  "src/components/Header.tsx",\n  "src/components/Sidebar.tsx",\n  "src/lib/utils.ts"\n]\n```',
            timestamp: Date.now(),
            type: 'result' as const,
            language: 'javascript'
          }
          addMessage(result)
          setIsProcessing(false)
        }, 1500)
      }, 1000)
    }, 800)
  }

  const getToolIcon = (toolName?: string) => {
    switch (toolName) {
      case 'file-search': return <Search size={14} />
      case 'bash-run': return <Terminal size={14} />
      case 'docker-exec': return <Terminal size={14} />
      default: return <Code size={14} />
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Agent selector */}
      <div className="border-b border-slate-800 p-3 bg-slate-900/50">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-2">
          {agents.map(agent => (
            <button
              key={agent.id}
              onClick={() => useStore.getState().setActiveAgent(agent.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all touch-manipulation ${
                agent.id === activeAgentId
                  ? 'text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              style={agent.id === activeAgentId ? { backgroundColor: agent.color } : {}}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${agent.status === 'idle' ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`} />
                {agent.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center mb-4">
              <Code size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Ready to Code</h3>
            <p className="text-slate-400 max-w-md">
              Start a conversation with your AI agents. They can search files, execute commands,
              connect to GitHub, and manage your Docker containers.
            </p>
          </div>
        )}

        {messages.map((message, index) => {
          const agent = agents.find(a => a.id === message.agentId)
          const isUser = message.agentId === 'user'

          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  isUser ? 'bg-slate-700' : ''
                }`}
                style={!isUser && agent ? { backgroundColor: agent.color } : {}}
              >
                {isUser ? 'U' : agent?.name.charAt(0) || 'A'}
              </div>

              <div className={`flex-1 ${isUser ? 'flex justify-end' : ''}`}>
                {message.type === 'tool-call' && (
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-sm text-slate-300 mb-1">
                    {getToolIcon(message.toolName)}
                    <span>{message.toolName}</span>
                  </div>
                )}
                <div
                  className={`inline-block max-w-full px-4 py-3 rounded-2xl ${
                    isUser
                      ? 'bg-primary-600 text-white'
                      : message.type === 'code' || message.type === 'result'
                      ? 'bg-slate-800 text-slate-100'
                      : 'bg-slate-800 text-slate-100'
                  }`}
                >
                  {message.content.includes('```') ? (
                    <pre className="text-sm overflow-x-auto scrollbar-thin">
                      <code>{message.content.replace(/```\w*\n?|\n?```/g, '')}</code>
                    </pre>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  )}
                </div>
                <div className={`text-xs text-slate-500 mt-1 ${isUser ? 'text-right' : ''}`}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          )
        })}

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: activeAgent?.color }}
            >
              {activeAgent?.name.charAt(0)}
            </div>
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-800">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-sm text-slate-300">Thinking...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-800 p-4 bg-slate-900/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder={`Message ${activeAgent?.name || 'agent'}...`}
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            disabled={isProcessing}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-700 disabled:text-slate-500 rounded-xl transition-colors touch-manipulation flex items-center gap-2"
          >
            {isProcessing ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
