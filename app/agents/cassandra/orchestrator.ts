import { streamText } from 'ai'
import { routeMessage } from './router'
import { selectModelForRoute } from './models'
import { getToolsForRoute } from './tools'
import { safetyCheck } from './policy/safetyCheck'
import { runLore } from './agents/lore/run'

function toModelMessages(messages: any[]) {
  return messages
    .filter((m) => m.role !== 'tool')
    .map((m) => {
      const text =
        typeof m.content === 'string'
          ? m.content
          : (m.parts?.find((p: any) => p.type === 'text')?.text ?? '')

      return {
        id: m.id ?? crypto.randomUUID(),
        role: m.role,
        content: text,
      }
    })
}

export async function cassandraOrchestrator(messages: any[]) {
  console.log('🔥 ORCHESTRATOR HIT')

  const last = messages[messages.length - 1]?.content ?? ''

  const { route } = routeMessage(last)

  console.log('🧭 ROUTE SELECTED:', route)
  console.log('🧠 INPUT:', last)

  if (!safetyCheck(messages)) {
    return new Response('Blocked by safety layer', { status: 403 })
  }

  // 🔒 FORCE LORE PIPELINE
  if (route === 'lore') {
    const model = selectModelForRoute(route)
    return runLore(messages, model)
  }

  const model = selectModelForRoute(route)
  const tools = getToolsForRoute(route)

  const result = streamText({
    model,
    messages: toModelMessages(messages),
    tools,
  })

  return result.toUIMessageStreamResponse()
}
