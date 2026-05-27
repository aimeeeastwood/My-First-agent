import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import type { Route } from './contracts'

export function selectModelForRoute(route: Route) {
  switch (route) {
    case 'web':
      return google('gemini-2.5-flash')
    case 'lore':
      return openai('gpt-4o-mini')
    case 'safety':
      return openai('gpt-4o-mini')
    default:
      return openai('gpt-4o-mini')
  }
}
