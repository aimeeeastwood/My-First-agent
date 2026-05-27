export type Route = 'chat' | 'lore' | 'web' | 'safety'

export type ToolName = 'readFile' | 'fetchUrl' | 'calculator'

export type ToolSet = Record<string, unknown>

export type AgentContext = {
  route: Route
  tools: ToolSet
}
