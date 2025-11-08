'use client'

import { useStore } from './store'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChatView from './components/ChatView'
import AgentsView from './components/AgentsView'
import ToolsView from './components/ToolsView'
import MCPView from './components/MCPView'

export default function Home() {
  const { activeView } = useStore()

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header />
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        {activeView === 'chat' && <ChatView />}
        {activeView === 'agents' && <AgentsView />}
        {activeView === 'tools' && <ToolsView />}
        {activeView === 'mcp' && <MCPView />}
      </main>
    </div>
  )
}
