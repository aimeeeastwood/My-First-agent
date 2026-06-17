import { streamText } from 'ai'
import { routeMessage } from './router'
import { selectModelForRoute } from './models'
import { getToolsForRoute } from './tools'
import { safetyCheck } from './policy/safetyCheck'

function toModelMessages(messages: any[]) {
  return messages
    .filter((m) => m.role !== 'tool')
    .map((m) => {
      const text =
        typeof m.content === 'string'
          ? m.content
          : (m.parts?.find((p: any) => p.type === 'text')?.text ?? '')

      return {
        id: m.id ?? crypto.randomUUID(), // ✅ FIX GOES HERE
        role: m.role,
        content: text,
      }
    })
}

export async function cassandraOrchestrator(messages: any[]) {
  console.log('🔥 ORCHESTRATOR HIT')

  const last = messages[messages.length - 1]?.content ?? ''

  if (!safetyCheck(messages)) {
    return new Response('Blocked by safety layer', { status: 403 })
  }

  const { route } = routeMessage(last)

  const model = selectModelForRoute(route)
  const tools = getToolsForRoute(route)

  const result = streamText({
    model,
    messages: toModelMessages(messages), // 👈 HERE
    tools,
  })

  return result.toUIMessageStreamResponse()
}
