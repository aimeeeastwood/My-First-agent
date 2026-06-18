import { searchKnowledgeTool } from '@/app/api/chat/tools/searchKnowledge'
import { readFileTool } from '@/app/api/chat/tools/readFile'
import { fetchUrlTool } from '@/app/api/chat/tools/fetchUrl'
import { calculatorTool } from '@/app/api/chat/tools/calculator'
import type { Route } from './types'

export function getToolsForRoute(route: Route) {
  switch (route) {
    case 'web':
      return {
        fetchUrl: fetchUrlTool,
      }

    case 'lore':
      return {} // NO TOOLS AT ALL

    case 'chat':
      return {
        calculator: calculatorTool,
      }

    case 'safety':
      return {}

    default:
      return {}
  }
}
