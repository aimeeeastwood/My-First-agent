import { readFileTool } from '@/app/api/chat/tools/readFile'
import { fetchUrlTool } from '@/app/api/chat/tools/fetchUrl'
import { calculatorTool } from '@/app/api/chat/tools/calculator'

export function getToolsForRoute(route: string) {
  switch (route) {
    case 'lore':
      return {
        readFile: readFileTool,
      }

    case 'web':
      return {
        fetchUrl: fetchUrlTool,
      }

    case 'chat':
      return {}

    case 'safety':
      return {}

    default:
      return {}
  }
}
