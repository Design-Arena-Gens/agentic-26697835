'use client'

import { Menu, Plus, Settings } from 'lucide-react'
import { useStore } from '../store'

export default function Header() {
  const { toggleSidebar, activeView } = useStore()

  const viewTitles = {
    chat: 'Multi-Agent Studio',
    agents: 'Agent Management',
    tools: 'Tool Configuration',
    mcp: 'MCP Connections'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-slate-800 active:bg-slate-700 transition-colors touch-manipulation"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-semibold truncate">
            {viewTitles[activeView]}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg hover:bg-slate-800 active:bg-slate-700 transition-colors touch-manipulation"
            aria-label="New agent"
          >
            <Plus size={20} />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-slate-800 active:bg-slate-700 transition-colors touch-manipulation"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
