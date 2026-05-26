import { run as chatRun } from './chat'
import { run as loreRun } from './lore'
import { run as safetyRun } from './safety'

export type AgentName = 'chat' | 'lore' | 'safety'

export function getAgent(name: AgentName) {
  switch (name) {
    case 'chat':
      return chatRun
    case 'lore':
      return loreRun
    case 'safety':
      return safetyRun
  }
}
