type ToolUsage = {
  route: string
  tool: string
  timestamp: number
}

const toolUsageLog: ToolUsage[] = []

export function logToolUsage(route: string, tool: string) {
  toolUsageLog.push({
    route,
    tool,
    timestamp: Date.now(),
  })
}

export function getToolUsage() {
  return toolUsageLog
}

export function clearToolUsage() {
  toolUsageLog.length = 0
}
