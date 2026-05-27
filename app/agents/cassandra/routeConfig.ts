import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import type { Route } from './contracts'

export const routeToModel: Record<Route, any> = {
  chat: openai('gpt-4o-mini'),
  lore: openai('gpt-4o-mini'),
  safety: openai('gpt-4o-mini'),
  web: google('gemini-2.5-flash'),
}
