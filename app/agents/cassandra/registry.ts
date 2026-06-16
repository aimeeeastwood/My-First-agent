import type { Route } from './contracts'
import { toolMap } from './policy/tools'

import { run as chatRun } from './agents/chat'
import { run as loreRun } from './agents/lore'
import { run as webRun } from './agents/web'
import { run as safetyRun } from './agents/safety'

export const agentRegistry = {
  chat: chatRun,
  lore: loreRun,
  web: webRun,
  safety: safetyRun,
} satisfies Record<Route, (messages: any[]) => Promise<Response>>
