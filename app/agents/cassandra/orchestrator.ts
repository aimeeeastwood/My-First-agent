import { streamText } from 'ai'

import { routeMessage } from './router'
import { selectModelForRoute } from './models'
import { getToolsForRoute } from './tools'
import { safetyCheck } from './policy/safetyCheck'

export async function cassandraOrchestrator(messages: any[]) {
  const last = messages[messages.length - 1]?.content ?? ''

  if (!safetyCheck(messages)) {
    return new Response('Blocked by safety layer', { status: 403 })
  }

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
