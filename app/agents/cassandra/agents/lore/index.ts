import { streamText } from 'ai'
import { google } from '@ai-sdk/google'

export async function run(messages: any[]) {
  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: 'You are the Kairos lore system. Stay in-universe.',
    messages,
  })

  return result.toUIMessageStreamResponse()
}
