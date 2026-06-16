import type { UIMessage } from 'ai'

export type Route = 'chat' | 'lore' | 'web' | 'safety'

export type ToolMap = {
  chat: string[]
  lore: string[]
  web: string[]
  safety: string[]
}

export type AgentRun = (messages: UIMessage[]) => Promise<Response>

export type AgentContract<R extends Route = Route> = {
  route: R
  run: AgentRun
  tools: ToolMap[R]
}
