'use client'

import { Plug, Circle, Plus, Settings, Trash2 } from 'lucide-react'
import { useStore } from '../store'
import { motion } from 'framer-motion'

export default function MCPView() {
  const { mcpConnections, updateMCPConnection, removeMCPConnection } = useStore()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-400'
      case 'disconnected': return 'bg-slate-400'
      case 'error': return 'bg-red-400'
      default: return 'bg-slate-400'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'github': return 'GitHub'
      case 'docker': return 'Docker Remote'
      case 'search': return 'Web Search'
      case 'file-system': return 'File System'
      default: return type
    }
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-thin p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">MCP Connections</h2>
            <p className="text-sm text-slate-400">Manage Model Context Protocol integrations</p>
          </div>
          <button className="p-3 bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors touch-manipulation">
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {mcpConnections.map((connection, index) => (
            <motion.div
              key={connection.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 rounded-xl border border-slate-700 p-4"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                    <Plug size={24} className="text-primary-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{connection.name}</h3>
                      <div className="flex items-center gap-1">
                        <Circle
                          size={8}
                          className={`${getStatusColor(connection.status)} fill-current`}
                        />
                        <span className="text-xs text-slate-400 capitalize">
                          {connection.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400">{getTypeLabel(connection.type)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors touch-manipulation"
                    aria-label="Settings"
                  >
                    <Settings size={16} />
                  </button>
                  <button
                    onClick={() => removeMCPConnection(connection.id)}
                    className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors touch-manipulation"
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                  Configuration
                </div>
                <div className="bg-slate-900 rounded-lg p-3 space-y-1">
                  {Object.entries(connection.config).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-slate-300 font-mono">
                        {typeof value === 'string' && value.includes('*') ? value :
                         typeof value === 'object' ? JSON.stringify(value) : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    const newStatus = connection.status === 'connected' ? 'disconnected' : 'connected'
                    updateMCPConnection(connection.id, { status: newStatus })
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors text-sm font-medium touch-manipulation ${
                    connection.status === 'connected'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {connection.status === 'connected' ? 'Disconnect' : 'Connect'}
                </button>
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-sm font-medium touch-manipulation">
                  Test
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mt-6">
          <h3 className="font-semibold mb-2">About MCP</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Model Context Protocol (MCP) enables your agents to connect with external services
            and tools. Add connections to GitHub for repository management, Docker for container
            orchestration, web search for real-time information, and more.
          </p>
        </div>
      </div>
    </div>
  )
}
