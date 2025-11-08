'use client'

import { MessageSquare, Users, Wrench, Plug, X } from 'lucide-react'
import { useStore } from '../store'
import { motion, AnimatePresence } from 'framer-motion'

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar, activeView, setActiveView, agents, mcpConnections } = useStore()

  const menuItems = [
    { id: 'chat' as const, icon: MessageSquare, label: 'Chat', badge: null },
    { id: 'agents' as const, icon: Users, label: 'Agents', badge: agents.length },
    { id: 'tools' as const, icon: Wrench, label: 'Tools', badge: null },
    { id: 'mcp' as const, icon: Plug, label: 'MCP', badge: mcpConnections.filter(c => c.status === 'connected').length }
  ]

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-slate-900 border-r border-slate-800 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold">Code Studio</h2>
                <p className="text-xs text-slate-400">Multi-Agent IDE</p>
              </div>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-slate-800 active:bg-slate-700 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeView === item.id

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id)
                      toggleSidebar()
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors touch-manipulation ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'hover:bg-slate-800 active:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge !== null && (
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        isActive
                          ? 'bg-white/20'
                          : 'bg-slate-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>

            <div className="p-4 border-t border-slate-800">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center font-bold">
                  U
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">User Account</p>
                  <p className="text-xs text-slate-400 truncate">user@example.com</p>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
