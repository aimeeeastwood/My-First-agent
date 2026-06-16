import { agentRegistry } from './registry'
import type { Route } from './contracts'
import { assertToolAccess } from './policy/enforceTools'

export async function executeAgent(route: Route, messages: any[]) {
  const agent = agentRegistry[route]

  if (!agent) {
    return new Response(`Unknown route: ${route}`, { status: 400 })
  }

  // 🔐 no tools yet → empty list is correct
  assertToolAccess(route, [])

  return agent(messages)
}
