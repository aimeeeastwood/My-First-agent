import { streamText } from 'ai'
import { routeMessage } from './router'
import type { Route } from './types'

function selectModelForRoute(route: Route) {
  switch (route) {
    case 'web':
      return 'gpt-4o-mini'
    case 'lore':
      return 'gpt-4o-mini'
    case 'safety':
      return 'gpt-4o-mini'
    default:
      return 'gpt-4o-mini'
  }
}

function getToolsForRoute(route: Route) {
  switch (route) {
    case 'web':
      return {}
    case 'lore':
      return {}
    case 'safety':
      return {}
    default:
      return {}
  }
}

export async function cassandraOrchestrator(messages: any[]) {
  const last = messages[messages.length - 1]?.content ?? ''

  const { route } = routeMessage(last)

  const model = selectModelForRoute(route)
  const tools = getToolsForRoute(route)

  const result = streamText({
    model,
    messages,
    tools,
  })

  return result.toUIMessageStreamResponse()
}
