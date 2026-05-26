import { readFileTool } from '@/app/api/chat/tools/readFile'
import { fetchUrlTool } from '@/app/api/chat/tools/fetchUrl'
import { calculatorTool } from '@/app/api/chat/tools/calculator'

export function getToolsForRoute(route: string) {
  switch (route) {
    case 'web':
      return {
        fetchUrl: fetchUrlTool,
        calculator: calculatorTool,
      }

    case 'lore':
      return {
        readFile: readFileTool,
      }

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
