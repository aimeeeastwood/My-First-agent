import { google } from '@ai-sdk/google'
import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'
import { createOpenAI } from '@ai-sdk/openai'

export type Route = 'lore' | 'web' | 'chat' | 'safety'

const local = createOpenAI({
  baseURL: 'http://172.24.240.1:1234/v1',
  apiKey: 'lm-studio',
})

export function selectModelForRoute(route: Route) {
  switch (route) {
    case 'lore':
      return anthropic('claude-3-5-sonnet-latest')

    case 'web':
      return google('gemini-2.5-flash')

    case 'chat':
      return openai('gpt-4o-mini')

    case 'safety':
      return google('gemini-2.5-flash')

    default:
      return google('gemini-2.5-flash')
  }
}
