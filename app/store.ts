import { create } from 'zustand'

export type LLMProvider = 'claude-3.5-sonnet' | 'gpt-4' | 'gemini-pro' | 'llama-3' | 'mistral-large'

export interface Agent {
  id: string
  name: string
  llm: LLMProvider
  isActive: boolean
  color: string
  tools: string[]
  status: 'idle' | 'thinking' | 'executing'
}

export interface Message {
  id: string
  agentId: string
  content: string
  timestamp: number
  type: 'message' | 'code' | 'tool-call' | 'result'
  toolName?: string
  language?: string
}

export interface MCPConnection {
  id: string
  name: string
  type: 'github' | 'docker' | 'search' | 'file-system'
  status: 'connected' | 'disconnected' | 'error'
  config: any
}

interface AppState {
  agents: Agent[]
  messages: Message[]
  mcpConnections: MCPConnection[]
  activeAgentId: string | null
  sidebarOpen: boolean
  activeView: 'chat' | 'agents' | 'tools' | 'mcp'

  addAgent: (agent: Agent) => void
  updateAgent: (id: string, updates: Partial<Agent>) => void
  removeAgent: (id: string) => void
  setActiveAgent: (id: string | null) => void

  addMessage: (message: Message) => void
  clearMessages: () => void

  addMCPConnection: (connection: MCPConnection) => void
  updateMCPConnection: (id: string, updates: Partial<MCPConnection>) => void
  removeMCPConnection: (id: string) => void

  toggleSidebar: () => void
  setActiveView: (view: 'chat' | 'agents' | 'tools' | 'mcp') => void
}

const defaultAgents: Agent[] = [
  {
    id: '1',
    name: 'Code Architect',
    llm: 'claude-3.5-sonnet',
    isActive: true,
    color: '#8b5cf6',
    tools: ['file-search', 'text-search', 'github-mcp', 'docker-exec'],
    status: 'idle'
  },
  {
    id: '2',
    name: 'DevOps Agent',
    llm: 'gpt-4',
    isActive: false,
    color: '#3b82f6',
    tools: ['docker-exec', 'bash-run', 'file-system'],
    status: 'idle'
  },
  {
    id: '3',
    name: 'Research Assistant',
    llm: 'gemini-pro',
    isActive: false,
    color: '#10b981',
    tools: ['search', 'github-mcp'],
    status: 'idle'
  }
]

const defaultMCPConnections: MCPConnection[] = [
  {
    id: '1',
    name: 'GitHub',
    type: 'github',
    status: 'connected',
    config: { token: '***' }
  },
  {
    id: '2',
    name: 'Remote VPS',
    type: 'docker',
    status: 'connected',
    config: { host: '192.168.1.100', port: 2375 }
  },
  {
    id: '3',
    name: 'Web Search',
    type: 'search',
    status: 'connected',
    config: { provider: 'serper' }
  }
]

export const useStore = create<AppState>((set) => ({
  agents: defaultAgents,
  messages: [],
  mcpConnections: defaultMCPConnections,
  activeAgentId: '1',
  sidebarOpen: false,
  activeView: 'chat',

  addAgent: (agent) => set((state) => ({ agents: [...state.agents, agent] })),

  updateAgent: (id, updates) => set((state) => ({
    agents: state.agents.map(a => a.id === id ? { ...a, ...updates } : a)
  })),

  removeAgent: (id) => set((state) => ({
    agents: state.agents.filter(a => a.id !== id),
    activeAgentId: state.activeAgentId === id ? null : state.activeAgentId
  })),

  setActiveAgent: (id) => set({ activeAgentId: id }),

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),

  clearMessages: () => set({ messages: [] }),

  addMCPConnection: (connection) => set((state) => ({
    mcpConnections: [...state.mcpConnections, connection]
  })),

  updateMCPConnection: (id, updates) => set((state) => ({
    mcpConnections: state.mcpConnections.map(c => c.id === id ? { ...c, ...updates } : c)
  })),

  removeMCPConnection: (id) => set((state) => ({
    mcpConnections: state.mcpConnections.filter(c => c.id !== id)
  })),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setActiveView: (view) => set({ activeView: view })
}))
