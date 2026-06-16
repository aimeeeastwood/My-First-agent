import { createOpenAI } from '@ai-sdk/openai'
import type { Route } from './contracts'

const lmstudio = createOpenAI({
  baseURL: 'http://100.104.170.104:1234/v1',
  apiKey: 'lm-studio',
})

const MODEL = 'qwen/qwen3.5-9b'

export function selectModelForRoute(route: Route) {
  return lmstudio(MODEL)
}
