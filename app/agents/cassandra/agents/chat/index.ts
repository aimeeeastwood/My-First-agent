import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { prompt } from './prompt'

export async function run(messages: any[]) {
  return streamText({
    model: openai('gpt-4o-mini'),
    messages: [{ role: 'system', content: prompt }, ...messages],
  }).toUIMessageStreamResponse()
}
