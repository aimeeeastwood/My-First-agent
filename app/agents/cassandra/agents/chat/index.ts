import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function run(messages: any[]) {
  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages,
  })

  return result.toUIMessageStreamResponse()
}
