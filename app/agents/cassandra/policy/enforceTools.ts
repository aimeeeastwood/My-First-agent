import type { Route } from '../contracts'
import { toolMap } from './tools'

export function assertToolAccess(route: Route, tools: string[]) {
  const allowed = toolMap[route]

  const invalid = tools.filter((t) => !allowed.includes(t))

  if (invalid.length > 0) {
    throw new Error(
      `[BLOCKED TOOL] route="${route}" attempted unauthorized tools: ${invalid.join(', ')}`,
    )
  }
}
