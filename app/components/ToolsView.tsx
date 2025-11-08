'use client'

import { Search, FileSearch, Terminal, Globe, Github, Package } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ToolsView() {
  const tools = [
    {
      id: 'search',
      name: 'Web Search',
      description: 'Search the web for information and documentation',
      icon: Search,
      color: '#3b82f6',
      enabled: true,
      config: { provider: 'Serper API', rateLimit: '100/day' }
    },
    {
      id: 'file-search',
      name: 'File Search',
      description: 'Search files in your project by name or pattern',
      icon: FileSearch,
      color: '#10b981',
      enabled: true,
      config: { extensions: ['.ts', '.tsx', '.js', '.jsx', '.py'], maxDepth: 10 }
    },
    {
      id: 'text-search',
      name: 'Text Search',
      description: 'Search for text content within files',
      icon: FileSearch,
      color: '#8b5cf6',
      enabled: true,
      config: { caseSensitive: false, regex: true }
    },
    {
      id: 'bash-run',
      name: 'Bash Command',
      description: 'Execute bash commands on the server',
      icon: Terminal,
      color: '#f59e0b',
      enabled: true,
      config: { timeout: '30s', workingDir: '/workspace' }
    },
    {
      id: 'docker-exec',
      name: 'Docker Execute',
      description: 'Run commands in Docker containers on remote VPS',
      icon: Package,
      color: '#06b6d4',
      enabled: true,
      config: { host: '192.168.1.100', port: 2375 }
    },
    {
      id: 'github-mcp',
      name: 'GitHub MCP',
      description: 'Interact with GitHub repositories and issues',
      icon: Github,
      color: '#6366f1',
      enabled: true,
      config: { auth: 'OAuth', scope: 'repo, issues' }
    }
  ]

  return (
    <div className="h-full overflow-y-auto scrollbar-thin p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Tool Configuration</h2>
          <p className="text-sm text-slate-400">Manage tools and capabilities for your agents</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-800 rounded-xl border border-slate-700 p-4 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: tool.color }}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">{tool.name}</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tool.enabled}
                          className="sr-only peer"
                          readOnly
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    <p className="text-xs text-slate-400">{tool.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {Object.entries(tool.config).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-slate-300 font-mono">
                        {typeof value === 'object' ? JSON.stringify(value) : value}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="mt-3 w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-sm font-medium touch-manipulation">
                  Configure
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
