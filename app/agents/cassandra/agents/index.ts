import { run as chatRun } from './chat'
import { run as loreRun } from './lore'
import { run as safetyRun } from './safety'

export type AgentName = 'chat' | 'lore' | 'safety'

type AgentFn = (messages: any[]) => Promise<Response>

export function getAgent(name: AgentName): AgentFn {
  switch (name) {
    case 'chat':
      return chatRun
    case 'lore':
      return loreRun
    case 'safety':
      return safetyRun
    default:
      throw new Error(`Unknown agent: ${name}`)
  }
}
