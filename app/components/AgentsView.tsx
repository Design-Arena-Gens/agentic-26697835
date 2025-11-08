'use client'

import { Plus, Trash2, Power, Edit3 } from 'lucide-react'
import { useStore, LLMProvider } from '../store'
import { motion } from 'framer-motion'

export default function AgentsView() {
  const { agents, updateAgent, removeAgent, setActiveAgent } = useStore()

  const llmOptions: LLMProvider[] = ['claude-3.5-sonnet', 'gpt-4', 'gemini-pro', 'llama-3', 'mistral-large']

  const toggleAgent = (id: string, currentActive: boolean) => {
    updateAgent(id, { isActive: !currentActive })
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-thin p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Agent Management</h2>
            <p className="text-sm text-slate-400">Configure your AI agents and their capabilities</p>
          </div>
          <button className="p-3 bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors touch-manipulation">
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: agent.color }}
                    >
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{agent.name}</h3>
                      <p className="text-sm text-slate-400">{agent.llm}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAgent(agent.id, agent.isActive)}
                      className={`p-2 rounded-lg transition-colors touch-manipulation ${
                        agent.isActive
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                      aria-label="Toggle agent"
                    >
                      <Power size={16} />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors touch-manipulation"
                      aria-label="Edit agent"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => removeAgent(agent.id)}
                      className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors touch-manipulation"
                      aria-label="Delete agent"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                      LLM Provider
                    </label>
                    <select
                      value={agent.llm}
                      onChange={(e) => updateAgent(agent.id, { llm: e.target.value as LLMProvider })}
                      className="mt-1 w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    >
                      {llmOptions.map(llm => (
                        <option key={llm} value={llm}>{llm}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                      Status
                    </label>
                    <div className="mt-1 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        agent.status === 'idle' ? 'bg-green-400' :
                        agent.status === 'thinking' ? 'bg-yellow-400 animate-pulse' :
                        'bg-blue-400 animate-pulse'
                      }`} />
                      <span className="text-sm capitalize">{agent.status}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2 block">
                      Enabled Tools ({agent.tools.length})
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {agent.tools.map(tool => (
                        <span
                          key={tool}
                          className="px-3 py-1 bg-slate-900 border border-slate-600 rounded-full text-xs"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveAgent(agent.id)}
                  className="mt-4 w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-sm font-medium touch-manipulation"
                >
                  Set as Active
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
